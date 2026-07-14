import {createRequire} from 'module';
import { Subscription } from '../models/subscriptions.model.js';
import dayjs from 'dayjs';
import { sendReminderEmail } from '../utils/send-email.js';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express')

const REMINDERS = [7,5,2,1];


export const sendReminders = serve(async(context) => {
const {subscriptionId} = context.requestPayload;
const subscription = await fetchSubscription(context , subscriptionId);


if(!subscription || subscription.status !== "active"){
    return;
}

const renewalDate = dayjs(subscription.renewalDate);


if(renewalDate.isBefore(dayjs())){
    console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`);
    return;
}


for (const daysBefore of REMINDERS) {
    const reminderDate = renewalDate.subtract(daysBefore, 'day');

    if (reminderDate.isAfter(dayjs())) {
        await sleepUntilReminder(
            context,
            `Reminder ${daysBefore} days before`,
            reminderDate
        );

        await triggerReminder(
            context,
            `${daysBefore} days before reminder`,
            subscription
        );
    }
}

});

const fetchSubscription = async (context , subscriptionId) =>{
return await context.run('get subscription' , async() => {
    return Subscription.findById(subscriptionId).populate('user' , 'name email')
})
}


const sleepUntilReminder = async(context , label , date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label , date.toDate());
}

const triggerReminder = async (context, label, subscriptionId) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label}`);

    const subscription = await Subscription.findById(subscriptionId).populate(
      "user",
      "name email"
    );

    if (!subscription || subscription.status !== "active") {
      console.log("Subscription no longer active.");
      return;
    }

    if (!subscription.user) {
    console.log("User not found.");
    return;
}

    await sendReminderEmail({
      to: subscription.user.email,
      type: label,
      subscription,
    });
  });
};
/*
Flow:

Workflow Starts
        │
        ▼
Read request body
        │
        ▼
Extract subscriptionId
        │
        ▼
Run durable step
(get subscription)
        │
        ▼
Fetch subscription
        │
        ▼
Store result

Interview Explanation
Reminder Workflow Controller
Purpose

The purpose of this controller is to automatically send reminder emails before a subscription renews.

Instead of using cron jobs, this project uses Upstash Workflow, which provides durable execution.

The workflow can sleep for days or months without keeping the Node.js server running.

Imports
import { createRequire } from "module";

Since the project uses ES Modules,

"type":"module"

some packages exported in CommonJS format cannot be imported normally.

Therefore

createRequire()

creates a CommonJS require function.

const { serve } = require("@upstash/workflow/express");

serve() converts our function into an Upstash Workflow endpoint.

Instead of Express handling the request, Upstash manages the execution.

import dayjs from "dayjs";

Day.js is used for date calculations.

Example

Renewal Date
15 August

Reminder
8 August
10 August
13 August
14 August

without manually calculating dates.

Reminder Array
const REMINDERS = [7,5,2,1];

This array determines how many reminders should be sent.

Meaning

7 days before

5 days before

2 days before

1 day before

Whenever a new reminder needs to be added,

simply modify this array.

Workflow Entry Point
export const sendReminders = serve(async(context)=>{

This creates the Workflow.

Whenever Upstash triggers this endpoint,

this function executes.

Unlike Express,

it supports sleeping and resuming automatically.

Reading Request Data
const { subscriptionId } = context.requestPayload;

This is equivalent to

req.body.subscriptionId

in Express.

The workflow receives

{
subscriptionId: "687abc..."
}
Fetch Subscription
const subscription =
await fetchSubscription(
context,
subscriptionId
);

Instead of querying MongoDB directly,

the query is wrapped inside

context.run()

Why?

Because every

context.run()

becomes a durable workflow step.

If the server crashes,

completed steps are never executed again.

Checking Status
if (
!subscription ||
subscription.status !== "active"
)
return;

This prevents

deleted subscriptions
expired subscriptions
inactive subscriptions

from receiving reminder emails.

Renewal Date
const renewalDate =
dayjs(subscription.renewalDate);

Converts MongoDB Date

into a Day.js object,

which provides methods like

subtract()

add()

format()

isBefore()

isAfter()
Past Date Check
if(
renewalDate.isBefore(dayjs())
){
return;
}

If today's date has already crossed the renewal date,

there is no reason to send reminders.

The workflow simply exits.

Loop
for(
const daysBefore of REMINDERS
)

This loops over

7

5

2

1

one by one.

Reminder Date
const reminderDate =
renewalDate.subtract(
daysBefore,
"day"
);

Suppose

Renewal

30 July

Then

7 -> 23 July

5 -> 25 July

2 -> 28 July

1 -> 29 July
Future Check
if(
reminderDate.isAfter(dayjs())
)

Suppose today is

27 July

Then

23 July ❌

25 July ❌

28 July ✔

29 July ✔

Only future reminders should wait.

Past reminders are skipped.

Sleeping
await context.sleepUntil(
label,
date.toDate()
);

This is the most powerful feature.

Normally,

Node.js cannot pause for

7 days

30 days

1 year

But Upstash stores the workflow state,

shuts everything down,

and automatically wakes it up at the specified date.

No cron jobs.

No timers.

No server running.

Trigger Step
await context.run(label,()=>{

Again,

this creates another durable step.

Inside this step,

we send the reminder email.

If email sending fails,

Upstash can retry only this step,

instead of restarting the entire workflow.

fetchSubscription()
context.run(
"get subscription",
()=>{
...
}
)

This creates a workflow step named

get subscription

Upstash stores

✓ Step completed

If the server crashes later,

this query isn't executed again.

Complete Workflow
Workflow Starts
        │
        ▼
Receive subscriptionId
        │
        ▼
Fetch Subscription
        │
        ▼
Subscription Active?
        │
       No
        │
      Stop
        │
       Yes
        ▼
Renewal Passed?
        │
       Yes
        │
      Stop
        │
       No
        ▼
Loop 7,5,2,1
        │
        ▼
Calculate Reminder Date
        │
        ▼
Sleep Until Date
        │
        ▼
Wake Automatically
        │
        ▼
Run Email Step
        │
        ▼
Next Reminder
        │
        ▼
Workflow Complete
Interview questions you might get

Q. Why did you use Upstash Workflow instead of a cron job?

Because cron jobs run on fixed schedules and require a server to stay online. Upstash Workflow supports durable execution—it can pause until a future date, resume automatically, and retry only failed steps without rerunning the entire workflow.

Q. Why use context.run()?

context.run() creates durable, checkpointed steps. If the workflow fails after a completed step, Upstash resumes from the next step instead of starting over.

Q. Why use Day.js?

Day.js simplifies date arithmetic and comparisons, making it easy to calculate reminder dates (subtract), compare dates (isBefore, isAfter), and format dates.

Q. What is the advantage of the REMINDERS array?

It makes the reminder schedule configurable. Adding or removing reminder intervals only requires changing the array, not the workflow logic.
*/
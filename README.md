# 🚀 Subscription Tracker & AI Financial Advisor

A modern full-stack MERN application that helps users manage recurring subscriptions, visualize spending patterns, receive automated renewal reminders, and get personalized financial recommendations powered by AI.

---

## 📌 Features

### 🔐 Authentication
- Secure JWT Authentication
- User Registration & Login
- Protected Routes
- Authorization Middleware

### 📊 Dashboard
- Monthly Subscription Spending
- Active Subscription Count
- Category-wise Analytics
- Spending Trends
- Interactive Charts

### 💳 Subscription Management
- Create Subscription
- Update Subscription
- Delete Subscription
- View Subscription Details
- Automatic Renewal Date Calculation
- Subscription Status Tracking

### 🤖 AI Financial Advisor
- AI-powered financial insights using Groq LLM
- Monthly spending analysis
- Savings recommendations
- Subscription optimization suggestions
- Renewal reminders
- Personalized budgeting advice

### 📧 Automated Email Reminders
- Renewal reminder emails
- Scheduled using Upstash Workflows
- Reliable background processing

### 👤 User Profile
- View account information
- Secure profile management

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Material UI (MUI)
- Axios
- React Markdown
- Recharts

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Arcjet Security
- Upstash Workflows
- Groq AI API

---

# 📂 Project Structure

```
Subscription-Tracker/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   └── theme/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── database/
│   └── config/
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/bhonglesrishti03-sudo/SUBSCRIPTION-API-AND-AI-FINANCIAL-ADVISOR.git
```

```bash
cd YOUR_REPOSITORY
```

---

## Backend Setup

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create

```
.env.development.local
```

Example

```env
PORT=

NODE_ENV=development

DB_URI=

JWT_SECRET=

JWT_EXPIRES_IN=

SERVER_URL=

EMAIL_PASSWORD=

ARCJET_KEY=

ARCJET_ENV=

QSTASH_TOKEN=

QSTASH_URL=

GROQ_API_KEY=
```

Run backend

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
```

Install packages

```bash
npm install
```

Create

```
.env
```

Example

```env
VITE_API_URL=http://localhost:4000/api/v1
```

Run frontend

```bash
npm run dev
```

---

# 🤖 AI Financial Advisor

The application integrates the **Groq API** to generate intelligent financial recommendations based on the user's subscriptions.

The AI analyzes:

- Monthly spending
- Subscription categories
- Active subscriptions
- Renewal dates
- Budget optimization
- Savings opportunities

---

# 📧 Email Automation

Renewal reminder emails are automatically scheduled using **Upstash Workflows**, ensuring users never miss upcoming subscription payments.

---

# 📊 Dashboard Analytics

The dashboard provides insights including:

- Total Monthly Spending
- Active Subscriptions
- Spending by Category
- Recent Subscriptions
- Spending Trends

---

# 🔒 Security

- JWT Authentication
- Protected API Routes
- Authorization Middleware
- Arcjet Request Protection
- Password Hashing using bcrypt

---

# 🚀 Future Improvements

- Payment Tracking
- Expense Export (CSV/PDF)
- Subscription Sharing
- Mobile App
- Multi-language Support
- AI Spending Forecast
- Smart Budget Planner

---




# 👩‍💻 Author

**Srishti Bhongle**
- GitHub: https://github.com/bhonglesrishti03-sudo

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

It motivates me to build more projects and continuously improve.

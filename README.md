# 💳 Subscription Tracker & AI Financial Advisor

A modern **full-stack MERN application** designed to help users manage recurring subscriptions, monitor spending patterns, receive automated renewal reminders, and get personalized financial insights using AI.

The application combines **subscription management, analytics, automated workflows, email notifications, and AI-powered financial recommendations** into a single dashboard.

---

## ✨ Overview

Managing multiple subscriptions can make it difficult to track recurring expenses, upcoming renewals, and unnecessary spending.

**Subscription Tracker & AI Financial Advisor** provides a centralized platform where users can:

* 📊 Monitor monthly subscription spending
* 💳 Manage recurring subscriptions
* 📈 Visualize spending trends and categories
* ⏰ Track upcoming renewal dates
* 📧 Receive automated renewal reminders
* 🤖 Get AI-powered financial recommendations
* 🔐 Secure their data using JWT-based authentication

---

## 🚀 Key Features

### 🔐 Authentication & Authorization

* User registration and login
* JWT-based authentication
* Protected API routes
* Authorization middleware
* Password hashing using bcrypt
* User-specific subscription access

### 📊 Interactive Dashboard

The dashboard provides an overview of the user's subscription activity.

**Includes:**

* Total monthly spending
* Active subscription count
* Category-wise spending
* Spending trends
* Recent subscriptions
* Upcoming renewals
* Interactive charts

### 💳 Subscription Management

Users can manage their recurring subscriptions through a complete CRUD workflow.

* Create subscriptions
* View subscription details
* Update subscriptions
* Delete subscriptions
* Track subscription status
* Automatic renewal date calculation
* Categorize subscriptions
* Track payment methods and billing frequency

### 🤖 AI Financial Advisor

The application integrates the **Groq API** to generate personalized financial insights.

The AI analyzes subscription-related spending and provides recommendations such as:

* Spending analysis
* Savings opportunities
* Subscription optimization
* Budgeting suggestions
* High-spending category identification
* Personalized financial recommendations

### 📧 Automated Renewal Reminders

Subscription renewal reminders are handled through **Upstash Workflows**.

The workflow allows the application to:

1. Create a subscription
2. Calculate the upcoming renewal
3. Schedule a background workflow
4. Wait until the appropriate reminder period
5. Send a renewal notification email

This keeps reminder processing separate from the main API request.

### 👤 User Profile

Users can view and manage their account information through the application.

---

# 🏗️ Application Architecture

```text
                    ┌──────────────────────┐
                    │      React Client    │
                    │   MUI + Recharts     │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Express.js API     │
                    │                      │
                    │ Routes → Middleware  │
                    │ → Controllers        │
                    │ → Services           │
                    └───────┬───────┬──────┘
                            │       │
              ┌─────────────┘       └──────────────┐
              ▼                                    ▼
     ┌─────────────────┐                  ┌─────────────────┐
     │    MongoDB      │                  │   Groq LLM API  │
     │   + Mongoose    │                  │ AI Financial    │
     │                 │                  │ Advisor         │
     └─────────────────┘                  └─────────────────┘
              │
              │
              ▼
     ┌─────────────────────┐
     │  Upstash Workflows  │
     │                     │
     │ Renewal Reminders   │
     └──────────┬──────────┘
                │
                ▼
        ┌───────────────┐
        │ Email Service │
        └───────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

| Technology       | Purpose               |
| ---------------- | --------------------- |
| React.js         | User interface        |
| React Router DOM | Client-side routing   |
| Material UI      | UI components         |
| Axios            | API communication     |
| Recharts         | Data visualization    |
| React Markdown   | AI response rendering |

## Backend

| Technology        | Purpose              |
| ----------------- | -------------------- |
| Node.js           | Runtime environment  |
| Express.js        | REST API framework   |
| MongoDB           | Database             |
| Mongoose          | MongoDB ODM          |
| JWT               | Authentication       |
| bcrypt            | Password hashing     |
| Arcjet            | API security         |
| Upstash Workflows | Background workflows |
| Groq API          | AI financial advisor |

---

# 📂 Project Structure

```text
SUBSCRIPTION-API-AND-AI-FINANCIAL-ADVISOR/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── theme/
│   │
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── database/
│   ├── config/
│   ├── workflows/
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* MongoDB Atlas account
* Groq API key
* Upstash account
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/bhonglesrishti03-sudo/SUBSCRIPTION-API-AND-AI-FINANCIAL-ADVISOR.git
```

```bash
cd SUBSCRIPTION-API-AND-AI-FINANCIAL-ADVISOR
```

---

# 🔧 Backend Setup

Navigate to the backend:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env.development.local
```

Add the required environment variables:

```env
PORT=4000

NODE_ENV=development

DB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

SERVER_URL=http://localhost:4000

EMAIL_PASSWORD=your_email_password

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development

QSTASH_TOKEN=your_qstash_token
QSTASH_URL=your_qstash_url

GROQ_API_KEY=your_groq_api_key
```

> ⚠️ Never commit `.env` files or API keys to GitHub.

Start the backend:

```bash
npm run dev
```

The API should be available at:

```text
http://localhost:4000
```

---

# 🎨 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create:

```text
.env
```

Add:

```env
VITE_API_URL=http://localhost:4000/api/v1
```

Start the frontend:

```bash
npm run dev
```

The frontend will be available through the Vite development server.

---

# 🔄 Core Application Flow

### Authentication

```text
User
  ↓
Registration / Login
  ↓
Express API
  ↓
Password Verification
  ↓
JWT Generation
  ↓
Authenticated Client
```

### Subscription Creation

```text
User creates subscription
          ↓
      React Client
          ↓
      REST API
          ↓
 Authentication Middleware
          ↓
 Subscription Controller
          ↓
       MongoDB
          ↓
 Renewal Date Calculation
          ↓
   Upstash Workflow
          ↓
 Scheduled Reminder
          ↓
      Email Alert
```

### AI Financial Analysis

```text
User Subscription Data
          ↓
      Backend API
          ↓
 Spending Analysis
          ↓
      Groq LLM
          ↓
 AI Financial Recommendations
          ↓
      React Dashboard
```

---

# 🧠 AI Financial Advisor

The AI advisor uses the **Groq API** to analyze subscription-related financial data.

The system can consider:

* Monthly spending
* Subscription categories
* Billing frequency
* Active subscriptions
* Renewal dates
* Spending patterns

Based on this information, the advisor can provide recommendations such as:

> Identify expensive recurring subscriptions, highlight potential savings, and suggest ways to optimize monthly spending.

AI responses are displayed in the dashboard using Markdown rendering.

---

# ⏰ Automated Workflow System

Renewal reminders are powered by **Upstash Workflows**.

Instead of keeping reminder logic inside a continuously running server process, the application creates a workflow when a subscription is created.

The workflow can then wait until the appropriate time before sending a reminder.

This provides a more reliable approach to handling delayed background tasks.

---

# 🔒 Security

The application implements multiple security mechanisms:

* JWT authentication
* Protected routes
* User authorization
* Password hashing with bcrypt
* Arcjet request protection
* Environment variables for secrets
* User-specific database queries

Each authenticated user's subscriptions are associated with their user account, preventing users from accessing subscriptions belonging to other users.

---

# 📊 Dashboard Analytics

The dashboard provides visual insights into subscription spending.

### Analytics include:

* 💰 Monthly spending
* 📦 Active subscription count
* 📊 Category distribution
* 📈 Monthly spending trends
* 🔄 Upcoming renewals
* 🧾 Recent subscriptions

Charts are implemented using **Recharts**.

---

# 🧪 API Capabilities

The backend provides RESTful endpoints for:

### Authentication

```text
POST   /api/v1/auth/sign-up
POST   /api/v1/auth/sign-in
```

### Subscriptions

```text
GET    /api/v1/subscriptions
GET    /api/v1/subscriptions/:id
POST   /api/v1/subscriptions
PUT    /api/v1/subscriptions/:id
DELETE /api/v1/subscriptions/:id
```

### User Subscriptions

```text
GET    /api/v1/subscriptions/user
```

### Subscription Operations

```text
PATCH  /api/v1/subscriptions/:id/cancel
GET    /api/v1/subscriptions/upcoming
```

> Endpoint names may vary depending on the current route configuration.

---

# 📌 Engineering Highlights

This project demonstrates practical implementation of:

* REST API development
* MVC-style backend organization
* JWT authentication and authorization
* MongoDB schema design
* Mongoose middleware
* CRUD operations
* Protected resources
* Background workflow processing
* Automated email notifications
* Third-party API integration
* AI-assisted financial analysis
* Data visualization
* React state management
* Responsive UI development

---

# 🔮 Future Improvements

Planned improvements include:

* 📱 Mobile application
* 📤 CSV/PDF expense export
* 💰 Expense and income tracking
* 📈 AI spending forecasts
* 🎯 Smart budget planner
* 👥 Subscription sharing
* 🔔 More customizable notification preferences
* 🌍 Multi-language support
* 📊 Advanced financial analytics

---

# 👩‍💻 Author

### Srishti Bhongle

GitHub:

https://github.com/bhonglesrishti03-sudo

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐.

It helps support continued development and encourages building more projects.






<img width="1917" height="901" alt="Screenshot 2026-10-06 233844" src="https://github.com/user-attachments/assets/37985145-3a5d-4d20-9b46-7195d3b68885" />


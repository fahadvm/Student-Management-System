# 🎓 Student Management System

[](https://nodejs.org/)
[](https://expressjs.com/)
[](https://www.mongodb.com/)
[](https://handlebarsjs.com/)
[](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Student Management System** is a full-stack web application designed to simplify the process of managing student data and attendance in an organized and efficient way. Built with a clean MVC architecture and secure Google OAuth integration, it provides a centralized, secure admin interface for seamless record-keeping.

-----

## ✨ Key Features

  - **🔐 Secure Authentication**: One-click secure login using Google OAuth 2.0. No manual signup required, and admin routes are strictly protected.
  - **👨‍💼 Admin Dashboard**: A centralized control panel providing exclusive access to student and attendance management for authenticated users.
  - **📚 Student Management (CRUD)**: Complete functionality to seamlessly **➕ Add** new students, **📖 View** details, **✏️ Update** information, and **❌ Delete** obsolete records.
  - **📝 Attendance Tracking**: Easily mark attendance for students, maintain a detailed attendance history, and store all records reliably in the database.
  - **🧱 MVC Architecture**: Clean separation of concerns ensuring highly maintainable code:
      - **Model**: Database schema and data logic.
      - **View**: User Interface (HBS templates).
      - **Controller**: Core business logic and routing operations.
  - **🎨 Server-Side Rendering**: Dynamic rendering of HTML pages using Handlebars (HBS) for significantly faster initial load times and SEO-friendly structural content.

-----

## 🛠️ Technologies Used

### Backend

  - **Node.js**: Robust JavaScript runtime environment.
  - **Express.js**: Fast, unopinionated web framework for routing and middleware.
  - **MongoDB**: NoSQL database for flexible data storage.
  - **Mongoose**: Elegant MongoDB object modeling for Node.js.

### Frontend

  - **Handlebars (HBS)**: Powerful semantic templating engine for server-side rendering.
  - **HTML5 & CSS3**: Semantic markup and responsive styling.
  - **JavaScript**: Client-side interactivity.

### Security & Authentication

  - **Google OAuth 2.0**: Industry-standard protocol for secure delegated access.

-----

## 📁 Folder Structure

```text
project-root/
│── models/         # Database schemas (Mongoose models)
│── controllers/    # Business logic and request handling
│── routes/         # Application route definitions
│── views/          # HBS templates for dynamic rendering
│── public/         # Static assets (CSS, client-side JS, images)
│── config/         # Database connection & Auth configurations
└── app.js          # Application entry point and server setup
```

-----

## 🔌 Core Routes Overview

### Authentication

  - `GET /auth/google` - Initiate Google OAuth 2.0 login.
  - `GET /auth/google/callback` - Handle OAuth callback and session creation.
  - `GET /auth/logout` - Terminate session and log out.

### Student Management

  - `GET /students` - Render dashboard with all student records.
  - `POST /students/add` - Create a new student profile.
  - `POST /students/edit/:id` - Update an existing student's data.
  - `POST /students/delete/:id` - Remove a student from the system.

### Attendance

  - `GET /attendance` - View attendance sheets and history.
  - `POST /attendance/mark` - Submit daily attendance data.

-----



## 💡 Key Learnings

  - **OAuth Integration**: Implementing secure third-party authentication flows using Google OAuth 2.0 to protect application routes.
  - **MVC Design Pattern**: Structuring a Node.js application using Models, Views, and Controllers to ensure code scalability and readability.
  - **Server-Side Rendering**: Utilizing Handlebars to inject dynamic database content directly into HTML structures before serving them to the client.
  - **Data Modeling**: Designing effective MongoDB schemas with Mongoose to handle relationships between student profiles and their daily attendance logs.

-----

Developed by Fahad VM

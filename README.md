# Task Manager MVC Demo

A comprehensive MVC (Model-View-Controller) demonstration built with Express.js, EJS templating, Tailwind CSS, PostgreSQL, and Prisma ORM.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, Delete tasks
- **MVC Architecture**: Clean separation of concerns
- **Modern UI**: Responsive design with Tailwind CSS
- **Database Integration**: PostgreSQL with Prisma ORM
- **Form Validation**: Client and server-side validation
- **Status Management**: Mark tasks as completed or pending

## 📸 Screenshots

### Home Page

![Home Page](screenshots/home.png)
_Clean, modern interface showing all tasks with filtering options_

### Create Task

![Create Task](screenshots/addNew.png)
_Simple form to add new tasks with validation_

### Task Details

![Task Details](screenshots/details.png)
_Detailed view of individual tasks with edit/delete options_

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **View Engine**: EJS
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: express-validator

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- PostgreSQL installed and running
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Abhishek-Gaire/EAD_LAB3.git
cd EAD_LAB3
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://mvc_demo:mvc_demo@localhost:5432/MVC_DEMO?schema=public"
PORT=4000
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init
```

### 5. Start the Application

```bash
# Development mode
npm run dev
```

Visit `http://localhost:4000` to see the application.

## 📁 Project Structure

```
EAD_LAB3/
├── controllers/
│   └── taskController.js     # Task business logic
├── models/
│   └── (Prisma handles models)
├── views/
│   ├── layouts/
│   │   └── main.ejs         # Main layout template
│   ├── tasks/
│   │   ├── index.ejs        # Tasks list
│   │   ├── create.ejs       # Create task form
│   │   ├── edit.ejs         # Edit task form
│   │   └── show.ejs         # Task details
│   └── partials/
│       ├── createForm.ejs    # Create task form partial
│       ├── edit.ejs          # Edit task form partial
│       ├── indexPartials.ejs # Index page partials
│       ├── show.ejs          # Task details partial
│       ├── header.ejs       # Navigation header
│       └── footer.ejs       # Footer component
├── public/
│   ├── css/
│   │   └── style.css        # Additional styles
│   └── js/
│       └── main.js          # Client-side JavaScript
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── routes/
│   ├── index.js            # Main routes
│   └── tasks.js            # Task routes
├── middleware/
│   └── validation.js        # Input validation
├── screenshots/             # Application screenshots
├── .env                    # Environment variables template
├── app.js                  # Express application setup
├── server.js               # Server entry point
└── package.json            # Dependencies and scripts
```

## 🏗 MVC Architecture Explanation

### Model (Prisma + PostgreSQL)

- **Location**: `prisma/schema.prisma`
- **Purpose**: Defines data structure and database relationships
- **Technology**: Prisma ORM with PostgreSQL

### View (EJS Templates)

- **Location**: `views/` directory
- **Purpose**: Renders HTML pages with dynamic content
- **Technology**: EJS templating engine with Tailwind CSS

### Controller (Express Route Handlers)

- **Location**: `controllers/` directory
- **Purpose**: Handles business logic and coordinates between Model and View
- **Technology**: Express.js route handlers

## 🔍 API Endpoints

| Method | Endpoint            | Description              |
| ------ | ------------------- | ------------------------ |
| GET    | `/`                 | Home page with task list |
| GET    | `/tasks`            | List all tasks           |
| GET    | `/tasks/create`     | Show create task form    |
| POST   | `/tasks`            | Create new task          |
| GET    | `/tasks/:id`        | Show specific task       |
| GET    | `/tasks/:id/edit`   | Show edit task form      |
| PUT    | `/tasks/:id`        | Update specific task     |
| DELETE | `/tasks/:id`        | Delete specific task     |
| PATCH  | `/tasks/:id/toggle` | Toggle task completion   |

## 🗄 Database Schema

```prisma
model Task {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean  @default(false)
  priority    Priority @default(MEDIUM)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

## 🧪 Testing the Application

### Manual Testing Checklist

- [ ] Create a new task
- [ ] View task list
- [ ] Edit existing task
- [ ] Mark task as completed
- [ ] Delete a task
- [ ] Filter tasks by status
- [ ] Responsive design on mobile

### Sample Test Data

```javascript
// Sample tasks for testing
const sampleTasks = [
  {
    title: "Complete MVC Demo",
    description: "Build a full-stack application using MVC pattern",
    priority: "HIGH",
  },
  {
    title: "Write Documentation",
    description: "Create comprehensive README with examples",
    priority: "MEDIUM",
  },
];
```

## 🔧 Customization

### Adding New Fields

1. Update `prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Update forms in `views/tasks/`
4. Modify controller logic

## 📚 Learning Objectives

This demo teaches:

1. **MVC Pattern**: Separation of concerns in web applications
2. **Database Integration**: Using ORM with PostgreSQL
3. **Template Engines**: Server-side rendering with EJS
4. **Modern CSS**: Utility-first styling with Tailwind
5. **Form Handling**: Processing user input and validation
6. **CRUD Operations**: Complete data manipulation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 Common Issues & Solutions

### Database Connection Error

```bash
# Check PostgreSQL service
sudo service postgresql status

# Verify connection string in .env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

### Prisma Client Error

```bash
# Regenerate Prisma client
npx prisma generate

# Reset database if needed
npx prisma migrate reset
```

### Tailwind Styles Not Loading

- Check if Tailwind CSS CDN is included in layout
- Verify class names are correct
- Clear browser cache

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [EJS Documentation](https://ejs.co/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

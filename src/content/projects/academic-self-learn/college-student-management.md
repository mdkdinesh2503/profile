---
name: "Student Management System"
summary: "Academic management platform supporting attendance, examinations, fee management, and student administration workflows."
category: "academic"
year: "2024"
role: "Full-Stack Software Developer"
stackNote: "Angular, TypeScript, Java (OOP), Node.js, MySQL, Rest-API"
demoStack: "HTML, CSS, JS"
originalStack: "Angular, Java, Node.js, MySQL, Rest-API"
tags: ["Frontend", "Backend", "Angular", "Node.js", "JSON-Server", "MySQL", "Java", "Rest-API"]
demoUrl: "https://mdkdinesh2503.github.io/SMS-V1/"
repoUrl: "https://github.com/mdkdinesh2503/SMS-V2"
---

## ⚡ Overview & Motivation

Engineered a multi-role academic administration suite designed to automate daily college operations—including attendance tracking, fee clearance, exam scheduling, and student records. The platform was built across **three distinct architectural generations** to explore different frontend and backend paradigms:

```
[ Version 1 (V1) ]         ───►   [ Version 2 (V2) ]       ───►   [ Version 3 (V3) ]
Static Prototype                  Angular SPA Web App             Java Backend Core
HTML5 / CSS3 / JS                 Angular + JSON Server (REST)    Java (OOP) + MySQL
• Layout validation               • Dynamic RBAC portals          • Relational Data Models
• Flow prototyping                • RESTful CRUD Services         • Parameterized SQL Queries
```

---

## 🏗️ Multi-Role System Architecture

```
+-------------------------------------------------------------+
|                 Role-Based Frontend Layer                   |
|   +---------------------------+ +-------------------------+ |
|   |       Student Portal      | |  Admin / Faculty Portal | |
|   | • Attendance Tracking     | | • Daily Roll-Call Entry | |
|   | • Exam Hall Allocations   | | • Student Record CRUD   | |
|   | • Fee Breakdown & Receipt | | • Fee Clearance Audits  | |
|   +-------------+-------------+ +------------+------------+ |
+-----------------┼────────────────────────────┼──────────────+
                  │ (Angular HttpClient & Services)
                  ▼
+-------------------------------------------------------------+
|               Data Persistence & Backend Layers             |
|  • Version 2 (SPA): JSON Server Mock REST Backend           |
|    - Fast CRUD prototyping, JSON document persistence       |
|  • Version 3 (Core): Java OOP Engine + Relational MySQL     |
|    - Normalized student records, ACID relational safety     |
+-------------------------------------------------------------+
```

---

## 🎯 Core Features & Role-Based Workflows

| Portal | Key Features & Responsibilities |
| :--- | :--- |
| **Student Portal** | View personal profile, monitor daily attendance with percentage alerts, view exam hall allocations, and review fee statements. |
| **Admin & Faculty Portal** | Comprehensive student record management (CRUD), daily attendance roll-call, timetable scheduling, fee auditing, and exam marks processing. |

---

## 💡 What Makes This Project Interesting

```
+-----------------------------------------------------------------------------------------+
|                                    INNOVATION & CRAFT                                   |
+-----------------------------------------------------------------------------------------+
| [1] 3-Tier Multi-Role RBAC    -> Isolated student and admin capabilities with distinct  |
|                                  access permissions and dashboards.                     |
| [2] Algorithmic Seating Logic -> Automated exam hall allocations based on student roll  |
|                                  numbers and hall capacities.                           |
| [3] 3-Generation Progression  -> Prototyped in HTML/JS, scaled in Angular with JSON     |
|                                  Server REST APIs, and backed with Java & MySQL core.   |
| [4] Real-World Academic Flows -> Accurately reflects actual university operations       |
|                                  (attendance cutoffs, fee clearance, exam eligibility). |
+-----------------------------------------------------------------------------------------+
```

---

## 🧠 Why I Used This Tech Stack

- **Why Angular for the Web App?** Angular's strong typing, modular architecture, and powerful dependency injection made it easy to maintain separate student and administrative dashboards cleanly.
- **Why JSON Server for V2?** Allowed rapid prototyping of RESTful HTTP endpoints (`GET`, `POST`, `PUT`, `DELETE`) and client-side data binding with Angular `HttpClient`.
- **Why Java & Relational MySQL for V3?** Academic records (students, classes, grades, fee invoices) inherently possess strict relational dependencies requiring ACID guarantees, object-oriented domain models, and foreign key constraints.

---

## 🚀 Impact & What I Learned

- **Multi-Tenant / Multi-Role Thinking**: Gained crucial experience designing systems with role-based visibility and permissions.
- **End-to-End Workflow Architecture**: Bridged UI design, form state validation, RESTful API integration, and relational database schemas.
- **Iterative Engineering**: Demonstrated how complex applications can be conceptualized as lightweight prototypes and methodically rebuilt into robust full-stack platforms.

---

## 🔗 Demos & Source Code

| Version | Description | Links |
| :--- | :--- | :--- |
| **SMS-V1** | Static layout & interactive prototype | [Live Demo](https://mdkdinesh2503.github.io/SMS-V1/) · [Source Code](https://github.com/mdkdinesh2503/SMS-V1) |
| **SMS-V2** | Full-stack Angular SPA with JSON Server REST backend | [Source Code](https://github.com/mdkdinesh2503/SMS-V2) |
| **SMS-V3** | Java backend-focused console & MySQL edition | [Source Code](https://github.com/mdkdinesh2503/SMS-V3) |

> **Demo Login Credentials (V1):**  
> - **Student Portal**: Username `mdk` / Password `mdk`  
> - **Admin Portal**: Username `admin` / Password `admin`

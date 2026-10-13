# Dental Time

Full-stack web application for managing patients and dental appointments.

Dental Time is a dental clinic management application developed with React, Node.js, Express and PostgreSQL. The application allows managing patient information and creating, viewing, editing and deleting dental appointments through a REST API.

## Technologies

### Frontend
- React
- Vite
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express
- PostgreSQL
- pg
- dotenv

## Features

### Patients
- List all patients
- Search patients by DNI
- Create new patients
- Edit patient information
- Delete patients
- PostgreSQL validation for unique DNI
- Validation requiring at least a phone number or email

### Appointments
- List all appointments
- View appointment details
- Create appointments
- Edit appointments
- Delete appointments
- Associate appointments with patients
- Appointment status management
- Confirmation modals for creating, editing and deleting appointments

## Architecture

The application follows a client-server architecture:

React → Axios → Express → PostgreSQL

The frontend communicates with the backend through HTTP requests using Axios.

The Express backend exposes a REST API that handles the application logic and communicates with PostgreSQL using the `pg` library.

PostgreSQL stores the application data and manages the relationship between patients and appointments through a foreign key.

## Database

The database contains two main tables:

### `pacientes`

Stores patient information:

- `id`
- `dni`
- `nombre`
- `apellidos`
- `edad`
- `telefono`
- `email`

The DNI is unique and required.

A database constraint also ensures that every patient has at least a phone number or an email address.

### `citas`

Stores appointment information:

- `id`
- `paciente_id`
- `fecha`
- `hora`
- `motivo`
- `observaciones`
- `estado`

The `paciente_id` field references the `pacientes` table, establishing a relationship between patients and their appointments.

## API

### Patients

| Method | Endpoint | Description |
|---|---|---|
| GET | `/pacientes` | Get all patients |
| GET | `/pacientes/:dni` | Get a patient by DNI |
| POST | `/pacientes` | Create a patient |
| PUT | `/pacientes/:dni` | Update a patient |
| DELETE | `/pacientes/:dni` | Delete a patient |

### Appointments

| Method | Endpoint | Description |
|---|---|---|
| GET | `/citas` | Get all appointments |
| GET | `/citas/:id` | Get an appointment by ID |
| POST | `/citas` | Create an appointment |
| PUT | `/citas/:id` | Update an appointment |
| DELETE | `/citas/:id` | Delete an appointment |

## Installation

### 1. Clone the repository

git clone https://github.com/Chris6393/Dental-Time.git
cd Dental-Time

### 2. Install backend dependencies
Navigate to the backend folder:

cd backend
npm install

### 3. Configure environment variables
Create a .env file inside the backend folder using .env.example as a reference:

DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=dental_time
DB_PASSWORD=your_password
DB_PORT=5432

### 4. Configure PostgreSQL
Create a PostgreSQL database named:

dental_time

The database must contain the pacientes and citas tables required by the application.
The citas table uses a foreign key to establish the relationship with the pacientes table.

### 5. Start the backend
From the backend folder:
node app.js

The API will be available at:
http://localhost:3000

### 6. Install frontend dependencies
Open another terminal and navigate to the frontend folder:
cd frontend
npm install

### 7. Start the frontend
npm run dev

Vite will provide the local URL where the application can be accessed.

## Security

Sensitive configuration is managed through environment variables.
The real .env file is excluded from Git through .gitignore, while .env.example is included to show the required configuration without exposing credentials.

## Development

Dental Time was developed as a portfolio project to practice full-stack web development, REST APIs, relational databases and frontend-backend communication.
The project focuses on understanding the complete flow of a full-stack application:
React
  ↓
Axios
  ↓
Express
  ↓
PostgreSQL

The application demonstrates CRUD operations, database relationships, API communication, environment variable management and frontend state management with React.

## License
This project is intended as a personal portfolio project.

## Project Structuref 

```text
Dental-Time/
│
├── backend/
│   ├── routes/
│   │   ├── citas.js
│   │   └── pacientes.js
│   │
│   ├── .env.example
│   ├── app.js
│   ├── db.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmModal.jsx
│   │   │   ├── CrearCita.jsx
│   │   │   ├── CrearPaciente.jsx
│   │   │   ├── EditarCita.jsx
│   │   │   ├── EditarPaciente.jsx
│   │   │   ├── ListaCitas.jsx
│   │   │   └── ListaPacientes.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── citasService.js
│   │   │   └── pacientesService.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
└── .gitignore


# 📋 Gestión de Clientes

Bienvenidos al repositorio de **Gestión de Clientes**, una aplicación web full stack diseñada para administrar clientes de forma simple, segura y eficiente.  
Este proyecto fue desarrollado como **portfolio personal**, orientado a un perfil **Junior con enfoque profesional**.

## ¿Qué es Gestión de Clientes?

**Gestión de Clientes** es una plataforma web que permite a usuarios registrados administrar su propia cartera de clientes, con control de acceso por roles.

El sistema resuelve problemas comunes como:

- Falta de organización de clientes.
- Duplicación de información.
- Escaso control de acceso.
- Interfaces poco adaptadas a móviles.

Con esta aplicación se busca:

- Centralizar la información de clientes.
- Separar responsabilidades por roles.
- Automatizar validaciones.
- Ofrecer una experiencia responsive y clara.

---

## 🚀 Características principales

- Autenticación con JWT  
- Sistema de roles: admin / user  
- CRUD completo de clientes  
- Gestión de usuarios desde panel admin  
- Validación para evitar clientes duplicados  
- Confirmaciones mediante modales  
- Diseño responsive (desktop → mobile)  
- Protección de rutas por rol  
- Backend con Express y MySQL  
- Frontend con React + Vite  

---

## 🛠 Tecnologías utilizadas

### Frontend
- React 19  
- Vite  
- Axios  
- CSS Modules  
- Responsive Design  

### Backend
- Node.js  
- Express  
- MySQL  
- JWT (jsonwebtoken)  
- Bcrypt / BcryptJS  
- Dotenv  
- CORS  

---

## 🧱 Estructura del proyecto

```bash
GESTION-CLIENTES
│
├── gestion-clientes-backend
│   ├── routes
│   ├── middleware
│   ├── config
│   ├── .env
│   └── index.js
│
├── gestion-clientes-frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── pages
│   │   ├── styles
│   │   └── App.jsx
│   ├── .env
│   └── vite.config.js
│
├── README.md
└── MANUAL.md
```

## Base de datos

El proyecto utiliza MySQL.
Cada persona que clone el repositorio debe crear su propia base de datos.

Script de ejemplo:

```sql
CREATE DATABASE gestion_clientes;
USE gestion_clientes;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user','admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE clients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(50),
  company VARCHAR(100),
  status ENUM('lead','active','inactive') DEFAULT 'lead',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (user_id, email)
);

```

## Instalación y ejecución

**Requisitos previos**

- Node.js
- MySQL
- Git

### Clonar el repositorio

```bash
git clone git clone https://github.com/MartinSG9504/gestion-clientes.git
```

### Backend

```bash
cd gestion-clientes-backend
npm install
```

Crear archivo .env:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=gestion_clientes
JWT_SECRET=clave_secreta
PORT=3000
```

**Ejecutar:**

```bash
node index.js
```

Servidor:
http://localhost:3000

### Frontend

```bash
cd gestion-clientes-frontend
npm install
```

Crear .env:

```bash
VITE_API_URL=http://localhost:3000
```

**Ejecutar:**

```bash
npm run dev
```

Frontend:
http://localhost:5173

---

## 👨‍💻 Autor

**Martin**  
Desarrollador de Software  
Proyecto personal para portfolio 🚀

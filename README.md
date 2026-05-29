mi-proyecto-asistencia/
│
├── .env
├── .env.example
├── docker-compose.yml
├── Makefile
├── README.md
│
├── backend/                            # API (Node.js + Express o Nest)
│   ├── src/
│   │   ├── 1-core/                     # Reglas de negocio puras
│   │   │   ├── domain-entities/
│   │   │   │   ├── employee.entity.ts
│   │   │   │   ├── attendance.entity.ts
│   │   │   │   ├── leave.entity.ts
│   │   │   │   └── user.entity.ts      # Usuario con rol (admin / employee)
│   │   │   ├── domain-value-objects/
│   │   │   │   ├── employee-email.vo.ts
│   │   │   │   ├── attendance-date.vo.ts
│   │   │   │   └── work-hours.vo.ts
│   │   │   ├── domain-events/
│   │   │   │   ├── employee-registered.event.ts
│   │   │   │   ├── attendance-marked.event.ts
│   │   │   │   └── leave-approved.event.ts
│   │   │   ├── domain-exceptions/
│   │   │   │   ├── employee-not-found.exception.ts
│   │   │   │   ├── duplicate-attendance.exception.ts
│   │   │   │   └── leave-conflict.exception.ts
│   │   │   ├── use-cases-commands/
│   │   │   │   ├── register-employee/
│   │   │   │   ├── mark-attendance/
│   │   │   │   └── request-leave/
│   │   │   ├── use-cases-queries/
│   │   │   │   ├── get-daily-attendance/
│   │   │   │   ├── get-monthly-report/
│   │   │   │   └── get-employee-leaves/
│   │   │   └── use-cases-ports/
│   │   │       ├── employee-repository.interface.ts
│   │   │       ├── attendance-repository.interface.ts
│   │   │       ├── leave-repository.interface.ts
│   │   │       ├── user-repository.interface.ts    # Para autenticación y roles
│   │   │       └── notification-service.interface.ts
│   │   │
│   │   ├── 2-infrastructure/           # Implementaciones reales
│   │   │   ├── database/
│   │   │   │   ├── postgres-connection.ts
│   │   │   │   ├── migrations/
│   │   │   │   │   ├── 001_create_users_table.sql           # id, email, password_hash, rol
│   │   │   │   │   ├── 002_create_employees_table.sql       # vincula user_id
│   │   │   │   │   ├── 003_create_attendance_table.sql
│   │   │   │   │   └── 004_create_leaves_table.sql
│   │   │   │   └── repositories/
│   │   │   │       ├── postgres-employee.repository.ts
│   │   │   │       ├── postgres-attendance.repository.ts
│   │   │   │       ├── postgres-leave.repository.ts
│   │   │   │       └── postgres-user.repository.ts
│   │   │   └── external-services/
│   │   │       ├── slack-notification.service.ts
│   │   │       └── email-notification.service.ts
│   │   │
│   │   ├── 3-interfaces/               # Puntos de entrada (API REST)
│   │   │   ├── web/
│   │   │   │   ├── controllers/
│   │   │   │   │   ├── auth.controller.ts           # login, registro (solo admin puede crear admins)
│   │   │   │   │   ├── admin-attendance.controller.ts
│   │   │   │   │   ├── admin-employees.controller.ts
│   │   │   │   │   ├── admin-leaves.controller.ts
│   │   │   │   │   ├── employee-attendance.controller.ts
│   │   │   │   │   └── employee-leaves.controller.ts
│   │   │   │   ├── middlewares/
│   │   │   │   │   ├── auth.middleware.ts           # verifica JWT
│   │   │   │   │   ├── role-admin.middleware.ts
│   │   │   │   │   ├── role-employee.middleware.ts
│   │   │   │   │   └── validation.middleware.ts
│   │   │   │   └── routes/
│   │   │   │       ├── auth.routes.ts
│   │   │   │       ├── admin.routes.ts
│   │   │   │       └── employee.routes.ts
│   │   │   └── api/                    # (opcional) versión pública para móviles
│   │   │       └── v1/
│   │   │
│   │   └── 5-shared/                   # Utilidades
│   │       ├── config/
│   │       │   ├── app.config.ts
│   │       │   └── jwt.config.ts
│   │       ├── errors/
│   │       ├── logging/
│   │       └── utils/
│   │
│   └── package.json
│
├── frontend/                           # Aplicación React
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── assets/
│   │   │   ├── styles/
│   │   │   │   ├── 1-settings/
│   │   │   │   ├── 2-tools/
│   │   │   │   ├── 3-generic/
│   │   │   │   ├── 4-elements/
│   │   │   │   ├── 5-components/
│   │   │   │   ├── 6-layouts/
│   │   │   │   ├── 7-pages/
│   │   │   │   ├── admin.css
│   │   │   │   └── employee.css
│   │   │   └── images/
│   │   │
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   │   ├── AdminSidebar.jsx
│   │   │   │   ├── AttendanceTable.jsx
│   │   │   │   └── EmployeeCard.jsx
│   │   │   ├── employee/
│   │   │   │   ├── ClockInButton.jsx
│   │   │   │   └── LeaveRequestForm.jsx
│   │   │   └── shared/
│   │   │       ├── Button.jsx
│   │   │       ├── DatePicker.jsx
│   │   │       ├── Modal.jsx
│   │   │       └── Navbar.jsx
│   │   │
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx          # Sidebar + header para RRHH
│   │   │   ├── EmployeeLayout.jsx       # Barra simple para empleados
│   │   │   └── AuthLayout.jsx           # Para páginas de login
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.page.jsx
│   │   │   │   └── ForgotPassword.page.jsx
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.page.jsx           # Resumen, tardanzas hoy
│   │   │   │   ├── EmployeesList.page.jsx
│   │   │   │   ├── EmployeesCreate.page.jsx
│   │   │   │   ├── AttendanceDaily.page.jsx
│   │   │   │   ├── AttendanceMonthly.page.jsx
│   │   │   │   ├── LeavesPending.page.jsx
│   │   │   │   └── Reports.page.jsx
│   │   │   └── employee/
│   │   │       ├── Dashboard.page.jsx           # Mi asistencia resumen
│   │   │       ├── ClockIn.page.jsx             # Botón entrada
│   │   │       ├── ClockOut.page.jsx            # Botón salida
│   │   │       ├── LeaveRequest.page.jsx
│   │   │       └── MyHistory.page.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js               # useContext + localStorage
│   │   │   ├── useAttendance.js
│   │   │   └── useRoles.js
│   │   │
│   │   ├── services/                    # Llamadas a la API
│   │   │   ├── api.js                   # axios instance, interceptors (JWT)
│   │   │   ├── auth.service.js
│   │   │   ├── admin.service.js
│   │   │   └── employee.service.js
│   │   │
│   │   ├── store/                       # (opcional) Redux / Zustand
│   │   │   └── auth.store.js
│   │   │
│   │   ├── utils/
│   │   │   ├── date-helper.js
│   │   │   └── role-guard.js            # función para redirigir
│   │   │
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── routes.jsx                   # React Router (rutas protegidas por rol)
│   │
│   └── package.json
│
├── scripts/
│   ├── seed-dev-data.js                 # Crea usuario RRHH por defecto (email: rrhh@empresa.com, pass: Admin123)
│   │                                    # + algunos empleados y asistencias de prueba
│   └── generate-monthly-report.js
│
├── tests/                               # Tests integrados (backend + frontend)
│   ├── backend/
│   └── frontend/
│
└── docs/
    ├── user-manual.md
    ├── api-docs.md
    └── rrhh-setup.md                    # Explicación del usuario RRHH por defecto


## BACKEND 

### MIGRATIONS 
```sh
bun run migration:generate -- migrations/{migration_name}
```

### Create Migration

```sh
bun run migration:create
```

### Run Migrate

```sh
bun run migration:run
```

### Reverte Migration

```sh
bun run migration:revert
```
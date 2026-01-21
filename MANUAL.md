# 📘 Manual de Usuario — Gestión de Clientes

Este documento describe el uso de la aplicación **Gestión de Clientes** desde el punto de vista del usuario final, incluyendo las funcionalidades disponibles según el rol asignado.

---

## 🔑 Inicio de sesión

1. Ingresar email y contraseña
2. Presionar el botón **Ingresar**
3. El sistema valida las credenciales ingresadas
4. Si son correctas, se accede al panel principal de la aplicación

> El primer usuario administrador debe crearse directamente desde la base de datos.

---

## 👥 Roles del sistema

### Usuario
El usuario estándar puede:
- Crear clientes
- Editar sus propios clientes
- Eliminar sus propios clientes
- Ver únicamente los clientes que él mismo creó

### Administrador
El administrador tiene acceso completo al sistema y puede:
- Ver todos los clientes registrados
- Gestionar usuarios
- Cambiar roles de usuario
- Eliminar usuarios
- Administrar clientes de cualquier usuario

---

## 🧾 Gestión de Clientes

### Crear cliente
1. Completar el formulario con los siguientes datos:
   - Nombre
   - Email
   - Teléfono
   - Empresa
2. Presionar **Agregar**
3. Confirmar la acción en el modal de confirmación

⚠️ El sistema valida los datos y no permite crear clientes duplicados con el mismo email para un mismo usuario.

---

### Editar cliente
1. Presionar el botón **Editar** del cliente deseado
2. Modificar los campos necesarios
3. Confirmar la acción
4. Si no se realizaron cambios, el sistema lo informa mediante un mensaje

---

### Eliminar cliente
1. Presionar el botón ❌ correspondiente al cliente
2. Confirmar la eliminación
3. El cliente se elimina de forma permanente del sistema

---

## 👑 Panel de Administración

Esta sección solo es visible para usuarios con rol **admin**.

### Crear usuario
1. Completar los siguientes campos:
   - Nombre
   - Email
   - Contraseña
   - Rol
2. Presionar **Crear usuario**
3. Confirmar la acción en el modal

---

### Cambiar rol de usuario
- Presionar **Cambiar rol**
- Confirmar la acción
- El cambio se aplica de forma inmediata

⚠️ Un administrador no puede cambiar su propio rol.

---

### Eliminar usuario
- Presionar el botón ❌
- Confirmar la acción
- El usuario se elimina del sistema de forma permanente junto con sus clientes asociados

---

## 📱 Uso en dispositivos móviles

- La aplicación cuenta con diseño responsive
- Las tablas se transforman en tarjetas en pantallas pequeñas
- Los botones se adaptan al ancho del dispositivo
- Puede utilizarse desde un celular sin perder funcionalidad

---

## 🔐 Seguridad

- Las contraseñas se almacenan encriptadas
- La autenticación se maneja mediante tokens JWT
- Las rutas están protegidas según el rol del usuario
- Los usuarios no pueden acceder a datos de otros usuarios

---

## ❗ Mensajes y manejo de errores

- Los errores de validación se muestran mediante modales
- Las acciones críticas requieren confirmación previa
- Los errores del servidor se informan de forma clara al usuario

---

## ✅ Fin

Este manual describe el uso general de la aplicación desde el punto de vista del usuario.

Para información técnica, instalación y configuración del proyecto, consultar el archivo **README.md**.

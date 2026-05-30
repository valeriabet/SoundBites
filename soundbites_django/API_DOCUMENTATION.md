# API SoundBites - Documentación de Endpoints

## Base URL
```
http://localhost:8000/api/
```

## Autenticación
Todos los endpoints requieren un token JWT en el header:
```
Authorization: Bearer <access_token>
```

### Obtener Tokens
**POST** `/auth/login/`
```json
{
  "correo": "admin@soundbites.com",
  "contrasena": "admin123"
}
```

Respuesta:
```json
{
  "usuario": {
    "id_usuario": 1,
    "nombre": "Admin",
    "correo": "admin@soundbites.com",
    "rol": "admin"
  },
  "tokens": {
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

### Registrar Nuevo Usuario
**POST** `/auth/registro/`
```json
{
  "nombre": "Juan Pérez",
  "correo": "juan@example.com",
  "contrasena": "password123",
  "rol": "usuario"
}
```

### Obtener Perfil del Usuario Autenticado
**GET** `/auth/perfil/` (Requiere autenticación)

### Refrescar Token
**POST** `/auth/refresh/`
```json
{
  "refresh": "<refresh_token>"
}
```

---

## USUARIOS

### Listar Todos los Usuarios
**GET** `/usuario/listar/` (Requiere autenticación)

### Buscar Usuario por ID
**GET** `/usuario/buscar/<id>/` (Requiere autenticación)

### Actualizar Usuario
**PUT** `/usuario/actualizar/<id>/` (Requiere autenticación)
```json
{
  "nombre": "Nuevo Nombre",
  "correo": "nuevo@email.com",
  "rol": "usuario",
  "contrasena": "nueva_password"  // Opcional
}
```

### Eliminar Usuario
**DELETE** `/usuario/eliminar/<id>/` (Requiere autenticación)

---

## CATEGORÍAS

### Listar Todas las Categorías
**GET** `/categoria/listar/` (Sin autenticación)

### Buscar Categoría por ID
**GET** `/categoria/buscar/<id>/` (Sin autenticación)

### Crear Categoría
**POST** `/categoria/guardar/` (Requiere autenticación + Admin)
```json
{
  "nombre": "Bebida"
}
```

### Actualizar Categoría
**PUT** `/categoria/actualizar/<id>/` (Requiere autenticación + Admin)
```json
{
  "nombre": "Bebida Fría"
}
```

### Eliminar Categoría
**DELETE** `/categoria/eliminar/<id>/` (Requiere autenticación + Admin)

---

## PLATOS

### Listar Todos los Platos
**GET** `/plato/listar/` (Sin autenticación)

Respuesta incluye datos de la categoría relacionada:
```json
[
  {
    "id_plato": 1,
    "nombre": "Tabla de Quesos",
    "descripcion": "Surtido de quesos",
    "precio": "12.50",
    "id_categoria": 1,
    "categoria": {
      "id_categoria": 1,
      "nombre": "Entrada"
    },
    "imagen": null
  }
]
```

### Buscar Plato por ID
**GET** `/plato/buscar/<id>/` (Sin autenticación)

### Crear Plato
**POST** `/plato/guardar/` (Requiere autenticación + Admin)
```json
{
  "nombre": "Pasta Alfredo",
  "descripcion": "Pasta con salsa blanca",
  "precio": 15.99,
  "id_categoria": 2,
  "imagen": "https://example.com/image.jpg"
}
```

### Actualizar Plato
**PUT** `/plato/actualizar/<id>/` (Requiere autenticación + Admin)

### Eliminar Plato
**DELETE** `/plato/eliminar/<id>/` (Requiere autenticación + Admin)

---

## GÉNEROS

### Listar Todos los Géneros
**GET** `/genero/listar/` (Sin autenticación)

Respuesta incluye cantidad de votos:
```json
[
  {
    "id_genero": 1,
    "nombre": "Pop",
    "descripcion": "Género musical popular",
    "votos_count": 5
  }
]
```

### Buscar Género por ID
**GET** `/genero/buscar/<id>/` (Sin autenticación)

### Crear Género
**POST** `/genero/guardar/` (Requiere autenticación + Admin)
```json
{
  "nombre": "Salsa",
  "descripcion": "Música Latina"
}
```

### Actualizar Género
**PUT** `/genero/actualizar/<id>/` (Requiere autenticación + Admin)

### Eliminar Género
**DELETE** `/genero/eliminar/<id>/` (Requiere autenticación + Admin)

---

## FAVORITOS

### Listar Todos los Favoritos
**GET** `/favorito/listar/` (Requiere autenticación)

Respuesta con datos del usuario y plato:
```json
[
  {
    "id_favorito": 1,
    "id_usuario": 1,
    "id_plato": 1,
    "usuario": { ... },
    "plato": { ... },
    "fecha_agregado": "2026-05-29T22:45:00Z"
  }
]
```

### Obtener Favoritos de un Usuario
**GET** `/favorito/usuario/<id_usuario>/` (Requiere autenticación)

### Buscar Favorito por ID
**GET** `/favorito/buscar/<id>/` (Requiere autenticación)

### Verificar si un Plato es Favorito
**GET** `/favorito/es-favorito/<id_usuario>/<id_plato>/` (Requiere autenticación)

Respuesta:
```json
{
  "es_favorito": true
}
```

### Agregar Favorito
**POST** `/favorito/guardar/` (Requiere autenticación)
```json
{
  "id_usuario": 1,
  "id_plato": 1
}
```

### Eliminar Favorito
**DELETE** `/favorito/eliminar/<id>/` (Requiere autenticación)

O eliminar por usuario y plato:
**DELETE** `/favorito/eliminar/<id_usuario>/<id_plato>/` (Requiere autenticación)

---

## RESERVAS

### Listar Todas las Reservas
**GET** `/reserva/listar/` (Requiere autenticación)

### Obtener Reservas de un Usuario
**GET** `/reserva/usuario/<id_usuario>/` (Requiere autenticación)

### Buscar Reserva por ID
**GET** `/reserva/buscar/<id>/` (Requiere autenticación)

### Crear Reserva
**POST** `/reserva/guardar/` (Requiere autenticación)
```json
{
  "id_usuario": 1,
  "id_genero": 1,
  "fecha": "2026-06-15T19:30:00Z",
  "numero_personas": 4,
  "estado": "pendiente",
  "notas": "Mesa cerca de la ventana por favor"
}
```

Estados posibles: `pendiente`, `confirmada`, `cancelada`, `completada`

### Actualizar Reserva
**PUT** `/reserva/actualizar/<id>/` (Requiere autenticación)
```json
{
  "estado": "confirmada",
  "notas": "Confirmado"
}
```

### Eliminar Reserva
**DELETE** `/reserva/eliminar/<id>/` (Requiere autenticación)

---

## VOTOS

### Listar Todos los Votos
**GET** `/voto/listar/` (Requiere autenticación)

### Obtener Votos de un Usuario
**GET** `/voto/usuario/<id_usuario>/` (Requiere autenticación)

### Obtener Votos de un Género
**GET** `/voto/genero/<id_genero>/` (Requiere autenticación)

### Buscar Voto por ID
**GET** `/voto/buscar/<id>/` (Requiere autenticación)

### Crear Voto (Evita Duplicados)
**POST** `/voto/guardar/` (Requiere autenticación)
```json
{
  "id_usuario": 1,
  "id_genero": 1
}
```

Retorna error si el usuario ya votó por ese género.

### Eliminar Voto
**DELETE** `/voto/eliminar/<id>/` (Requiere autenticación)

O eliminar por usuario y género:
**DELETE** `/voto/eliminar/<id_usuario>/<id_genero>/` (Requiere autenticación)

---

## Códigos de Respuesta

- `200`: OK
- `201`: Creado
- `204`: Sin contenido (borrado exitoso)
- `400`: Solicitud inválida
- `401`: No autenticado
- `404`: No encontrado
- `500`: Error del servidor

---

## Características Implementadas

✅ **Autenticación JWT**
- Login y registro de usuarios
- Tokens con duración configurable
- Refresh tokens

✅ **CRUD Completo**
- Usuarios, Categorías, Platos, Géneros
- Favoritos, Reservas, Votos

✅ **Validaciones**
- Correos únicos
- Favoritos y votos sin duplicados
- Validación de campos requeridos

✅ **Datos Relacionados**
- Los serializers incluyen información de objetos relacionados
- Contador de votos automático en géneros

✅ **Funcionalidades Especiales**
- Verificación rápida de favoritos
- Estados para reservas
- Notas en reservas
- Rastreo de fechas de agregación

---

## Ejemplo de Flujo Completo

1. **Registrarse**
   ```
   POST /api/auth/registro/
   ```

2. **Iniciar sesión**
   ```
   POST /api/auth/login/
   ```

3. **Obtener lista de géneros**
   ```
   GET /api/genero/listar/
   ```

4. **Votar por un género**
   ```
   POST /api/voto/guardar/
   {"id_usuario": 1, "id_genero": 1}
   ```

5. **Hacer una reserva**
   ```
   POST /api/reserva/guardar/
   {"id_usuario": 1, "id_genero": 1, "fecha": "2026-06-15T19:30:00Z", "numero_personas": 4}
   ```

6. **Ver mis favoritos**
   ```
   GET /api/favorito/usuario/1/
   ```

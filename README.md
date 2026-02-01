# ✅ To Do List - Aplicación Moderna de Tareas

Una aplicación web moderna y responsiva para gestionar tus tareas diarias con un diseño glassmorphism elegante. Desarrollada con HTML, CSS y JavaScript vanilla.

![To Do List](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)

---

## 🎯 Características Principales

### ✨ Funcionalidades Completas

- ✅ **Crear tareas** con texto, hora programada y prioridad
- 📝 **Editar tareas** (nombre, prioridad, hora) mediante modal elegante
- 🎯 **Sistema de prioridades** (Alta 🔴, Media 🟡, Baja 🟢) con colores diferenciados
- ⏰ **Programar hora** para cada tarea
- ✔️ **Marcar tareas completadas** con checkbox interactivo
- 🗑️ **Eliminar tareas** con animación suave
- 🔍 **Filtrar tareas** por estado (Todas, Pendientes, Completadas)
- 📊 **Contador de tareas pendientes** en tiempo real
- 💾 **Persistencia de datos** con localStorage
- 🎨 **Diseño glassmorphism** moderno y responsivo
- 📱 **Responsive design** (Desktop, Tablet, Mobile)

---

## 🖼️ Interfaz de Usuario

### Componentes Principales

- **Header**: Logo y título principal
- **Input Container**: Campos para crear nuevas tareas
  - Campo de texto de tarea
  - Selector de prioridad
  - Selector de hora
  - Botón "Añadir"
- **Controles**: Filtros y estadísticas
- **Lista de Tareas**: Muestra todas las tareas con opciones de edición
- **Modal de Edición**: Interfaz para editar todos los detalles de una tarea
- **Estado Vacío**: Mensaje amigable cuando no hay tareas

---

## 🚀 Cómo Usar

### Crear una Tarea

1. Escribe la descripción de la tarea en el campo de texto
2. Selecciona la prioridad (Alta, Media, Baja)
3. Opcionalmente, selecciona una hora
4. Haz clic en "Añadir" o presiona Enter

### Editar una Tarea

1. Haz clic en el botón ✏️ (lápiz) en la tarea
2. Modifica el nombre, prioridad u hora en el modal
3. Haz clic en "Guardar"

### Marcar como Completada

- Haz clic en el checkbox al lado de la tarea

### Eliminar una Tarea

- Haz clic en el botón ✕ (cruz) en la tarea

### Filtrar Tareas

- Usa los botones: "Todas", "Pendientes", "Completadas"

### Limpiar Completadas

- Haz clic en "Limpiar completadas" para eliminar todas las tareas finalizadas

---

## 📁 Estructura del Proyecto

```
todo-list/
├── index.html       # Estructura HTML principal
├── styles.css       # Estilos CSS (glassmorphism)
├── script.js        # Lógica de la aplicación
└── README.md        # Este archivo
```

---

## 💻 Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: 
  - Flexbox y Grid
  - Gradientes lineales y radiales
  - Animaciones y transiciones
  - Media queries responsive
  - Efectos glassmorphism
- **JavaScript ES6+**:
  - Programación orientada a objetos (Clase TaskManager)
  - Métodos de array (map, filter)
  - localStorage API
  - DOM manipulation

### Características Técnicas
- Sin dependencias externas (vanilla JS)
- localStorage para persistencia
- Diseño mobile-first responsive
- Animaciones suaves CSS
- Validación de datos

---

## 🎨 Diseño Visual

### Paleta de Colores

| Color | Uso | Valor |
|-------|-----|-------|
| Púrpura | Gradiente principal | `#667eea` a `#764ba2` |
| Rojo | Prioridad Alta | `#ef4444` |
| Naranja | Prioridad Media | `#f59e0b` |
| Verde | Prioridad Baja | `#22c55e` |
| Oscuro | Fondo principal | `#0f0f23` |
| Claro | Texto principal | `#e2e8f0` |

### Características de Diseño

- ✨ **Glassmorphism**: Efecto de cristal semi-transparente
- 🎭 **Dark Mode**: Tema oscuro por defecto
- 📐 **Grid System**: Diseño flexible basado en Flexbox
- ⚡ **Micro-interacciones**: Animaciones al hover y click
- 🔄 **Transiciones suaves**: 0.2s a 0.5s

---

## 🔧 Instalación

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (para Google Fonts)

### Pasos

1. **Clonar o descargar el repositorio**
```bash
git clone https://github.com/tu-usuario/todo-list.git
cd todo-list
```

2. **Abrir en el navegador**
- Doble clic en `index.html`
- O usar un servidor local:
```bash
python -m http.server 8000
# Luego visita: http://localhost:8000
```

---

## 📊 Ejemplo de Uso

```javascript
// La aplicación se inicializa automáticamente
let taskManager;

// Cuando el DOM está listo, se crea la instancia
document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
});

// La clase TaskManager maneja:
// - Crear, leer, actualizar, eliminar tareas (CRUD)
// - Filtrar tareas por estado
// - Persistencia con localStorage
// - Renderizado dinámico de la UI
```

---

## 🎯 Funcionalidades Futuras

- [ ] Categorías/Tags para clasificar tareas
- [ ] Drag & Drop para reordenar tareas
- [ ] Búsqueda/Filtrado por texto
- [ ] Notificaciones del navegador
- [ ] Temas de color personalizables
- [ ] Exportar tareas a JSON/CSV
- [ ] Sincronización en la nube (Firebase)
- [ ] PWA (Progressive Web App)
- [ ] Tests automatizados

---

## 🐛 Problemas y Soluciones

### Las tareas no se guardan
**Solución**: Verifica que localStorage esté habilitado en tu navegador

### El selector de hora no funciona
**Solución**: Asegúrate de usar un navegador moderno que soporte `<input type="time">`

### Las animaciones van lentas
**Solución**: Desactiva las extensiones del navegador que ralenticen la renderización

---

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👨‍💻 Autor

Desarrollado como proyecto de portfolio para demostrar habilidades en:
- Frontend Development
- UI/UX Design
- Vanilla JavaScript
- CSS avanzado

---

## 🔗 Enlaces Útiles

- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [CSS Glassmorphism](https://ui.glass/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript localStorage API](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)

---

## 📧 Contacto

¿Preguntas o sugerencias? ¡No dudes en abrir un issue!

---

**⭐ Si te gusta este proyecto, ¡dale una estrella!**

Hecho con ❤️ en 2026

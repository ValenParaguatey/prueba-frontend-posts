# Proyecto: Lista de Posts

Este proyecto es una aplicación frontend desarrollada en React que muestra una lista de posts obtenidos de la API pública de [JSONPlaceholder](https://jsonplaceholder.typicode.com/posts). La aplicación permite crear, editar y eliminar posts, y maneja notificaciones a través de modales según las acciones ejecutadas.

## Tabla de Contenidos
1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Uso](#uso)
5. [Componentes Principales](#componentes-principales)
6. [Despliegue en GitHub](#despliegue-en-github)
7. [Contacto](#contacto)

## Requisitos
Construir una aplicación que al iniciar liste los posts paginados en un data table. Cada post debe tener el botón de eliminar. Se deben crear los formularios respectivos para publicar y actualizar un post, además de mostrar una ventana (modal) de notificación para cualquiera de las operaciones realizadas.

## Instalación 
Comandos ejecutados en el proyecto
```bash
npx create-react-app prueba-frontend
cd prueba-frontend
npm install axios
npm install
npm start  # Ejecutar el proyecto
npm install --save-dev @babel/preset-env @babel/preset-react
npm test   # Ejecutar las pruebas
```

## Estructura del Proyecto

El proyecto sigue la siguiente estructura de archivos:

```bash
📁 src/
│
├── 📁 components/
│   ├── LoginPage.jsx    # Componente para renderizar pagina de inicio / login 
│   ├── PostList.jsx     # Componente principal que muestra la lista de posts
│   ├── PostForm.jsx     # Formulario para crear o editar posts
│   ├── Modal.jsx        # Componente reutilizable para mostrar modales
│   ├── ModalForm.jsx    # Modal específico para manejar el formulario de posts
│
├── App.js               # Punto de entrada principal del proyecto React
├── api.js               # Lógica para realizar peticiones HTTP a la API de posts
└── index.js             # Configuración de React DOM y renderización
```

## USO
- **Listar Posts**: En la página principal, se listarán los posts obtenidos de la API con paginación.
- **Crear Post**: Puedes crear un nuevo post desde el botón "Crear Nuevo Post". Esto abrirá un modal con un formulario.
- **Editar Post**: Cada post tiene un botón de edición que permite modificar el título y contenido del post.
- **Eliminar Post**: También puedes eliminar un post, y una notificación de éxito aparecerá tras la confirmación.
- **Paginación**: En la parte inferior de la lista, puedes navegar entre diferentes páginas de posts con los botones "Anterior" y "Siguiente".

## Componentes Principales 

1. **LoginPage.jsx**  
   - Renderiza una vista sencilla de inicio para simular un Login, con un formulario para ingresar usuario y contraseña, que da acceso a la lista de posts.

2. **PostList.jsx**  
   Componente principal que:
   - Muestra la lista de posts.
   - Maneja la paginación de los posts.
   - Incluye los botones para crear, editar y eliminar posts.
   - Se comunica con los modales para confirmar acciones y mostrar notificaciones.

3. **PostForm.jsx**  
   - Componente que gestiona el formulario para la creación y edición de posts. Al enviar el formulario, dependiendo de si se trata de una creación o edición, se actualizará el listado de posts.

4. **Modal.jsx**  
   Componente reutilizable que se utiliza para:
   - Mostrar mensajes de confirmación al eliminar un post.
   - Mostrar notificaciones de éxito.

5. **ModalForm.jsx**  
   - Este modal contiene el formulario (PostForm) y se utiliza para crear o editar un post.

### Archivo `api.js`

Este archivo se encarga de la interacción con la API de JSONPlaceholder:

- **Obtener Posts**: con la función `fetchPosts()`, que permite obtener los posts en bloques de 20 elementos.
- **Crear Post**: con la función `createPost()`.
- **Actualizar Post**: con la función `updatePost()`.
- **Eliminar Post**: con la función `deletePost()`.

## Despliegue en Github 
Comandos utilizados para subir el proyecto en Github
```bash
cd /ruta/a/tu/proyecto
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/ValenParaguatey/prueba-frontend-posts.git
git branch -M main
git push -u origin main
```

## Contacto
Si tienes alguna duda o pregunta, puedes contactarme a través de mi perfil de GitHub ValenParaguatey.






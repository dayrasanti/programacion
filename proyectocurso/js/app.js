document.addEventListener("DOMContentLoaded", () => {
    const courses = JSON.parse(localStorage.getItem("courses")) || [];

    // Registro de usuario
    document.getElementById("registro")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const usuario = document.getElementById("registra-usuario").value;
        const password = document.getElementById("registra-password").value;
        
        // Obtén los usuarios existentes, o inicia un nuevo arreglo si no hay ninguno
        const users = JSON.parse(localStorage.getItem("users")) || [];
        
        // Agrega el nuevo usuario
        users.push({ usuario, password });
        
        // Guarda el arreglo actualizado en el localStorage
        localStorage.setItem("users", JSON.stringify(users));
        
        alert("Usuario registrado");
    });

    // Login
    document.getElementById("login")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const usuario = document.getElementById("ingresar").value;
        const password = document.getElementById("ingresa-password").value;
        
        // Obtiene la lista de usuarios desde el localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        
        // Verifica si las credenciales coinciden con algún usuario registrado
        const user = users.find(u => u.usuario === usuario && u.password === password);
        
        if (user) {
            // Si es admin, redirige a la página de administración
            if (usuario === "admin" && password === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "users.html";
            }
        } else {
            alert("Datos incorrectos");
        }
    });

    // Agregar curso (Admin)
    document.getElementById("add-cursobtn")?.addEventListener("click", () => {
        document.getElementById("cursoform").style.display = "block";
    });

    document.getElementById("guardarc")?.addEventListener("click", () => {
        const title = document.getElementById("titulo").value;
        const description = document.getElementById("descripcion").value;
        const duration = document.getElementById("duracion").value;

        const course = { title, description, duration };
        courses.push(course);
        localStorage.setItem("courses", JSON.stringify(courses));
        
        document.getElementById("cursoform").style.display = "none";
        loadCoursesAdmin();
    });

    // Cargar cursos en la vista de administrador
    function loadCoursesAdmin() {
        const listacurso = document.getElementById("curso-list");
        if (listacurso) {
            listacurso.innerHTML = "";
            courses.forEach((course) => {
                const courseElement = document.createElement("div");
                courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p><p>Duración: ${course.duration} horas</p>`;
                listacurso.appendChild(courseElement);
            });
        }
    }
    loadCoursesAdmin();

    // Cargar cursos en la vista de usuario
    function loadCoursesUser() {
        const cursosv = document.getElementById("cursosv");
        if (cursosv) {
            cursosv.innerHTML = "";
            courses.forEach((course) => {
                const courseElement = document.createElement("div");
                courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p><p>Duración: ${course.duration} horas</p>`;
                cursosv.appendChild(courseElement);
            });
        }
    }
    loadCoursesUser();
});
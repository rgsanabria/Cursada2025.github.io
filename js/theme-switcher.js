document.addEventListener('DOMContentLoaded', () => {
    const themeWrapper = document.getElementById('theme-wrapper'); // Sigue usando este ID
    const lightModeBtn = document.getElementById('lightModeBtn');
    const darkModeBtn = document.getElementById('darkModeBtn');

    // Función para establecer el tema
    function setTheme(mode) {
        if (mode === 'dark') {
            themeWrapper.setAttribute('data-bs-theme', 'dark'); // Cambia el atributo de Bootstrap
            localStorage.setItem('theme', 'dark'); // Guarda preferencia
        } else {
            themeWrapper.setAttribute('data-bs-theme', 'light'); // Cambia el atributo de Bootstrap
            localStorage.setItem('theme', 'light'); // Guarda preferencia
        }
    }

    // Cargar el tema guardado al cargar la página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Tema por defecto si no hay preferencia guardada.
        // Puedes cambiar 'light' por 'dark' si quieres que el oscuro sea el default.
        setTheme('light');
    }

    // Event Listeners para los botones
    if (lightModeBtn) {
        lightModeBtn.addEventListener('click', () => setTheme('light'));
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => setTheme('dark'));
    }
});
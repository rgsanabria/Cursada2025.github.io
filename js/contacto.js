document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage'); // Contenedor para mensajes globales

    // Referencias a los campos de input
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const asuntoInput = document.getElementById('asunto');
    const mensajeInput = document.getElementById('mensaje');

    // Referencias a los divs donde se mostrarán los errores de cada campo
    const errorNombre = document.getElementById('errorNombre');
    const errorEmail = document.getElementById('errorEmail');
    const errorAsunto = document.getElementById('errorAsunto');
    const errorMensaje = document.getElementById('errorMensaje');

    // Función para mostrar un mensaje de error en un div específico de un campo
    function showError(inputElement, errorElement, message) {
        inputElement.classList.add('is-invalid'); // Añade clase de Bootstrap para estilo de error
        errorElement.textContent = message;
    }

    // Función para ocultar un mensaje de error en un div específico de un campo
    function hideError(inputElement, errorElement) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.remove('is-valid'); // Asegurarse de que no tenga la clase 'is-valid' si hay error
        errorElement.textContent = '';
    }

    // Función para marcar un campo como válido (sin mensaje de error)
    function markAsValid(inputElement) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid'); // Añade clase de Bootstrap para estilo de éxito
    }

    // Función para mostrar el mensaje global del formulario (éxito o error)
    function showFormMessage(message, type) { // type puede ser 'success' o 'danger'
        formMessage.textContent = message;
        formMessage.classList.remove('d-none', 'alert-success', 'alert-danger'); // Limpia clases previas
        formMessage.classList.add(`alert-${type}`); // Añade la clase de tipo (alert-success / alert-danger)
        formMessage.classList.remove('d-none'); // Muestra el mensaje
    }

    // Función de validación de email simple (regex)
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Event Listener para el envío del formulario
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Detiene el envío predeterminado del formulario

        // Limpiar mensajes y estilos de validación previos
        hideError(nombreInput, errorNombre);
        hideError(emailInput, errorEmail);
        hideError(asuntoInput, errorAsunto);
        hideError(mensajeInput, errorMensaje);
        formMessage.classList.add('d-none'); // Oculta el mensaje global

        let isValid = true; // Bandera para controlar si el formulario es válido

        // Validar Nombre
        if (nombreInput.value.trim() === '') {
            showError(nombreInput, errorNombre, 'El nombre es obligatorio.');
            isValid = false;
        } else {
            markAsValid(nombreInput);
        }

        // Validar Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, errorEmail, 'El email es obligatorio.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, errorEmail, 'Por favor, introduce un email válido.');
            isValid = false;
        } else {
            markAsValid(emailInput);
        }

        // Validar Asunto (opcionalmente)
        if (asuntoInput.value.trim() === '') {
            showError(asuntoInput, errorAsunto, 'El asunto es obligatorio.');
            isValid = false;
        } else {
            markAsValid(asuntoInput);
        }

        // Validar Mensaje
        if (mensajeInput.value.trim() === '') {
            showError(mensajeInput, errorMensaje, 'El mensaje no puede estar vacío.');
            isValid = false;
        } else if (mensajeInput.value.trim().length < 10) { // Ejemplo: mínimo 10 caracteres
            showError(mensajeInput, errorMensaje, 'El mensaje debe tener al menos 10 caracteres.');
            isValid = false;
        } else {
            markAsValid(mensajeInput);
        }

        // Si todos los campos son válidos
        if (isValid) {
            const nombreDelContacto = nombreInput.value.trim();
            showFormMessage(`¡Gracias por tu contacto, ${nombreDelContacto}! En breve te estaré respondiendo.`, 'success');

            // Puedo Añadir la lógica para enviar el formulario a un servidor (AJAX/Fetch API)
            // Solo reseteamos el formulario después de mostrar el mensaje de éxito
            contactForm.reset(); // Limpia los campos del formulario
            // También limpiar los estados visuales (valid/invalid) de los inputs
            nombreInput.classList.remove('is-valid');
            emailInput.classList.remove('is-valid');
            asuntoInput.classList.remove('is-valid');
            mensajeInput.classList.remove('is-valid');

        } else {
            // Si hay errores, el showFormMessage ya se activó a través de showError para cada campo.
            // Aquí podríamos poner un mensaje general de ,

            showFormMessage('Por favor, corrige los errores en el formulario.', 'danger');
        }
    });
});
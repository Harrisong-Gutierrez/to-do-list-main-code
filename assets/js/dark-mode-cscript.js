const toggle = document.getElementById('toggle');
const body = document.body;
const mainBox = document.querySelector('main');
const headerBox = document.getElementById('header-box');
let taskListItems = document.querySelectorAll('li');
const labelToggle = document.getElementById('label-toggle');
const form = document.getElementById('form');
const taskInput = document.getElementById('task-input');

toggle.addEventListener('change', (event) => {
  let checked = event.target.checked;
  console.log(checked);

  // Cambiar el estado del modo oscuro
  if (checked) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }

  // Guardar el estado del modo oscuro en localStorage
  localStorage.setItem('darkMode', checked.toString());
});

function enableDarkMode() {
  body.classList.add('BodyPrincipalDark');
  mainBox.classList.add('BodyPrincipalDark-dark-main-box');
  headerBox.classList.add('BodyPrincipalDark-header-box');
  taskListItems.forEach((item, index) => {
    item.classList.add('BodyPrincipalDark-dark-list-principal');
    if (index % 2 === 0) {
      item.classList.add('BodyPrincipalDark-dark-list-secundary');
    }
  });
  labelToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  labelToggle.style.color = 'orange';
}

function disableDarkMode() {
  body.classList.remove('BodyPrincipalDark');
  mainBox.classList.remove('BodyPrincipalDark-dark-main-box');
  headerBox.classList.remove('BodyPrincipalDark-header-box');
  taskListItems.forEach((item) => {
    item.classList.remove('BodyPrincipalDark-dark-list-principal');
    item.classList.remove('BodyPrincipalDark-dark-list-secundary');
  });
  labelToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  labelToggle.style.color = 'purple';
}

// Comprobar si hay un estado guardado en localStorage al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  const savedDarkMode = localStorage.getItem('darkMode');

  if (savedDarkMode === 'true') {
    toggle.checked = true;
    enableDarkMode();
  } else {
    toggle.checked = false;
    disableDarkMode();
  }
});

// Persistir el modo oscuro después de recargar la página
window.addEventListener('beforeunload', () => {
  const currentDarkMode = toggle.checked;
  localStorage.setItem('darkMode', currentDarkMode.toString());
});

// Escuchar el evento de envío del formulario
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evitar el comportamiento por defecto del formulario

  const taskValue = taskInput.value.trim();

  if (taskValue !== '') {
    const newTaskItem = document.createElement('li');
    newTaskItem.textContent = taskValue;

    // Agregar las clases correspondientes según el modo oscuro
    if (toggle.checked) {
      newTaskItem.classList.add('BodyPrincipalDark-dark-list-principal');
      const totalTasks = taskListItems.length;
      if (totalTasks % 2 === 0) {
        newTaskItem.classList.add('BodyPrincipalDark-dark-list-secundary');
      }
    }

    taskListItems = document.querySelectorAll('li'); // Actualizar la lista de elementos de la tarea
    form.reset(); // Limpiar el campo de entrada

    // Agregar el nuevo elemento a la lista
    const taskList = document.getElementById('task-list');
    taskList.appendChild(newTaskItem);
  }
});







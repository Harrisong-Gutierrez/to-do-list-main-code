const toggle = document.getElementById('toggle');
const body = document.body;
const mainBox = document.querySelector('main');
const headerBox = document.getElementById('header-box');
const taskListItems = document.querySelectorAll('li');
const labelToggle = document.getElementById('label_toggle');
const form = document.getElementById('form');
const taskInput = document.getElementById('task-input');

toggle.addEventListener('change', (event) => {
  let checked = event.target.checked;
   console.log(checked)


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

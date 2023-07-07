// components/list.js

// Array de tareas
const tasks = [];
console.log(tasks)

// Función para renderizar el componente List
function renderList() {
  const container = document.getElementById('list-container');
  container.innerHTML = ''; // Vaciar el contenido del contenedor antes de renderizar la lista

  const list = document.createElement('ul');
  list.className = 'list-group';

  tasks.forEach(function (task, index) {
    if (!task) {
      return; // Si la tarea está vacía, saltar a la siguiente iteración
    }

    const listItem = document.createElement('li');
    listItem.className = 'list-custom list-group-item d-flex justify-content-between align-items-center';

    if (index % 2 === 1) {
      listItem.classList.add('list-custom-dark');
    }

    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'checkbox';

    const checkbox = document.createElement('div');
    checkbox.type = 'radio';
    checkbox.className = '<fa-sharp fa-solid fa-circle-check radio-task';
    checkbox.id = 'task-' + index;
    checkbox.addEventListener('click', function () {
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        label.style.textDecoration = 'line-through';
      } else {
        label.style.textDecoration = 'none';
      }
    });
    checkboxDiv.appendChild(checkbox);

    const label = document.createElement('label');
    label.htmlFor = 'task-' + index;
    label.textContent = task;
    checkboxDiv.appendChild(label);

    listItem.appendChild(checkboxDiv);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';

    const editButton = document.createElement('button');
    editButton.className = 'button-edit-custom btn btn-outline-primary btn-sm mr-2';
    editButton.innerHTML = '<i class="icon-edit fas fa-edit"></i>';
    buttonsDiv.appendChild(editButton);

    editButton.addEventListener('click', function () {
      editTask(task, index);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'button-danger-custom btn btn-outline-danger btn-sm';
    deleteButton.innerHTML = '<i class="icon-trash fas fa-trash"></i>';
    buttonsDiv.appendChild(deleteButton);

    deleteButton.addEventListener('click', function () {
      deleteTask(index);
    });

    listItem.appendChild(buttonsDiv);
    list.appendChild(listItem);
  });

  container.appendChild(list);
}

// Función para agregar una nueva tarea a la lista
function addTaskToList(task) {
  tasks.push(task);
  renderList();
}

// Llamar a la función para renderizar el componente List
renderList();

function editTask(task, index) {
  const input = document.querySelector('.input-to-do');
  const addButton = document.getElementById('submit-button-id-icon');

  input.value = task; // Establece el valor del input con la tarea existente
  addButton.textContent = 'Update'; // Cambia el texto del botón a "Update"

  // Agrega un evento submit personalizado al formulario para manejar la actualización de la tarea
  const form = document.querySelector('.form-principal-container');
  form.removeEventListener('submit', handleSubmit); // Removemos el evento submit existente para evitar conflictos
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    updateTask(index, input.value); // Llamamos a la función de actualización de tarea
    input.value = ''; // Limpiamos el valor del input
    addButton.textContent = 'Submit'; // Restauramos el texto del botón a "Submit"
    form.removeEventListener('submit', handleSubmit); // Removemos el evento submit personalizado
    form.addEventListener('submit', handleSubmit); // Volvemos a agregar el evento submit original
  });
}

function updateTask(index, newTask) {
  tasks[index] = newTask;
  renderList();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderList();
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector('.input-to-do');
  const task = input.value;
  addTaskToList(task);
  input.value = '';
}

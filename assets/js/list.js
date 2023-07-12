// Array de tareas
let tasks = [];



// Contador de tareas
var taskCounter = 0;

// Función para renderizar el componente List
function renderList() {
  const container = document.getElementById('list-container');
  container.innerHTML = ''; // Vaciar el contenido del contenedor antes de renderizar la lista
  const list = document.createElement('ul');
  list.id = 'list-to-do';
  list.className = 'list-group';

  tasks.forEach(function (task, index) {
    if (!task) {
      return; // Si la tarea está vacía, saltar a la siguiente iteración
    }

    const listItem = document.createElement('li');
    listItem.className = 'list-custom list-group-item d-flex justify-content-between align-items-center';
    listItem.id = 'list-item-' + index; // Nuevo ID para el listItem

    if (index % 2 === 1) {
      listItem.classList.add('list-custom-dark');
    }

    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'checkbox';
    const checkbox = document.createElement('div');
    checkbox.type = 'radio';
    checkbox.className = '<fa-sharp fa-solid fa-circle-check radio-task';
    checkbox.id = 'task-' + index;

    // Marcar o desmarcar el texto al hacer clic en el checkbox
    checkbox.addEventListener('click', function () {
      checkbox.checked = !checkbox.checked;
      if (checkbox.checked) {
        label.style.textDecoration = 'line-through';
        tasks[index].completed = true; // Actualizar el estado de marcado en el objeto de tarea
      } else {
        label.style.textDecoration = 'none';
        tasks[index].completed = false; // Actualizar el estado de marcado en el objeto de tarea
      }
      saveTasksToLocalStorage(); // Guardar el estado actualizado de las tareas
    });
    checkboxDiv.appendChild(checkbox);

    const label = document.createElement('label');
    label.htmlFor = 'task-' + index;
    label.textContent = task.text;
    label.className = 'label-task-to-do';

    // Aplicar el estilo de línea tachada si la tarea está marcada
    if (task.completed) {
      checkbox.checked = true;
      label.style.textDecoration = 'line-through';
    }

    checkboxDiv.appendChild(label);

    listItem.appendChild(checkboxDiv);

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttons';

    const editButton = document.createElement('button');
    editButton.className = 'button-edit-custom btn btn-outline-primary btn-sm mr-2';
    editButton.innerHTML = '<i class="icon-edit fas fa-edit"></i>';
    buttonsDiv.appendChild(editButton);

    editButton.addEventListener('click', function () {
      editTask(task.text, index);
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

  // Actualizar contador de tareas
  taskCounter = tasks.length;
  let element = document.getElementById("couter");
  element.textContent = taskCounter;
  console.log('Número de tareas:', taskCounter);

  // Guardar las tareas en el almacenamiento local
  saveTasksToLocalStorage();
}

// Función para agregar una nueva tarea a la lista
function addTaskToList(task) {
  tasks.push({ text: task, completed: false }); // Agregar el estado de marcado inicial como falso
  renderList();
}

// Función para guardar las tareas en el almacenamiento local
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para cargar las tareas desde el almacenamiento local
function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  tasks = savedTasks ? JSON.parse(savedTasks) : [];
}

// Llamar a la función para cargar las tareas desde el almacenamiento local
loadTasksFromLocalStorage();

// Llamar a la función para renderizar el componente List
renderList();

function editTask(task, index) {
  const listItem = document.getElementById('list-item-' + index);
  listItem.innerHTML = ''; // Vaciar el contenido del listItem

  const inputEdit = document.createElement('input');
  inputEdit.type = 'text';
  inputEdit.value = task;
  inputEdit.className = 'input-edit-task';

  const updateButton = document.createElement('button');
  updateButton.className = 'button-update-task';
  updateButton.textContent = 'Update';

  listItem.appendChild(inputEdit);
  listItem.appendChild(updateButton);

  updateButton.addEventListener('click', function () {
    const updatedTask = inputEdit.value.trim();
    if (updatedTask !== '') {
      tasks[index].text = updatedTask; // Actualizar el texto de la tarea en el objeto de tarea
      renderList();
    }
  });

  inputEdit.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const updatedTask = inputEdit.value.trim();
      if (updatedTask !== '') {
        tasks[index].text = updatedTask; // Actualizar el texto de la tarea en el objeto de tarea
        renderList();
      }
    }
  });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderList();
}

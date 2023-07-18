(function () {
  const module = {
    tasks: [],

    main: function () {
      this.loadTasksFromLocalStorage();
      this.renderList();

      const formContainer = document.getElementById('form-container');

      const renderForm = function () {
        const form = document.getElementById('form-id')
        form.className = 'BodyPrincipal-form';
        const  input = document.getElementById('input-id')

        form.appendChild(input);
/* 
        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.id = 'submit-button-id-icon';
        addButton.className = 'BodyPrincipal-button-light'; */
    /*     addButton.innerHTML = 'Submit'; */
        const addButton = document.getElementById('submit-button-id-icon');

        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-paper-plane';
        addButton.appendChild(document.createTextNode(' '));
        addButton.appendChild(icon);

        addButton.addEventListener('click', function (event) {
          event.preventDefault();
          const inputValue = input.value.trim();

          if (inputValue !== '') {
            module.addTaskToList(inputValue);
            input.value = '';
          }
        });

        form.appendChild(addButton);
        formContainer.appendChild(form);
      };

      renderForm();

      const enableDarkMode = function () {
        document.body.classList.add('BodyPrincipalDark');
        const mainBox = document.querySelector('main');
        mainBox.classList.add('BodyPrincipalDark-dark-main-box');
        const headerBox = document.getElementById('header-box');
        headerBox.classList.add('BodyPrincipalDark-header-box');

        const taskListItems = document.querySelectorAll('li');
        taskListItems.forEach(function (item, index) {
          item.classList.remove('BodyPrincipal-list-custom-light');
          item.classList.add('BodyPrincipal-list-custom-dark');
        });

        const labelToggle = document.getElementById('label_toggle');
        labelToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        labelToggle.style.color = 'orange';
      };

      const disableDarkMode = function () {
        document.body.classList.remove('BodyPrincipalDark');
        const mainBox = document.querySelector('main');
        mainBox.classList.remove('BodyPrincipalDark-dark-main-box');
        const headerBox = document.getElementById('header-box');
        headerBox.classList.remove('BodyPrincipalDark-header-box');

        const taskListItems = document.querySelectorAll('li');
        taskListItems.forEach(function (item, index) {
          item.classList.remove('BodyPrincipal-list-custom-dark');
          item.classList.add('BodyPrincipal-list-custom-light');
        });

        const labelToggle = document.getElementById('label_toggle');
        labelToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        labelToggle.style.color = 'purple';
      };

      const toggle = document.getElementById('toggle');
      const checkboxToggle = document.getElementById('toggle');
      const body = document.body;

      toggle.addEventListener('change', function (event) {
        const checked = event.target.checked;

        if (checked) {
          enableDarkMode();
        } else {
          disableDarkMode();
        }

        localStorage.setItem('darkMode', checked.toString());
      });

      window.addEventListener('DOMContentLoaded', function () {
        const savedDarkMode = localStorage.getItem('darkMode');

        if (savedDarkMode === 'true') {
          checkboxToggle.checked = true;
          enableDarkMode();
        } else {
          checkboxToggle.checked = false;
          disableDarkMode();
        }
      });
    },

    cacheDom: function () {

    },

    renderList: function () {
      const container = document.getElementById('list-container');
      container.innerHTML = '';

      const list = document.createElement('ul');
      list.id = 'list-to-do';
      list.className = 'list-group';

      const tasks = this.tasks;

      const checkboxToggle = document.getElementById('toggle');
      const mainBox = document.querySelector('main');
      const headerBox = document.getElementById('header-box');
      const taskListItems = document.querySelectorAll('li');
      const labelToggle = document.getElementById('label_toggle');
      const isDarkMode = checkboxToggle.checked;

      tasks.forEach(function (task, index) {
        if (!task) {
          return;
        }

        const listItem = document.createElement('li');
        listItem.id = 'list-item-' + index;
        listItem.className = 'BodyPrincipal-list-custom d-flex justify-content-between align-items-center';

        if (isDarkMode) {
          listItem.classList.add('BodyPrincipal-list-custom-dark');
        } else {
          listItem.classList.add('BodyPrincipal-list-custom-light');
        }

        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'BodyPrincipal-checkbox';
        const checkbox = document.createElement('div');
        checkbox.type = 'radio';
        checkbox.className = '<fa-sharp fa-solid fa-circle-check BodyPrincipal-radio-task';
        checkbox.id = 'task-' + index;

        checkbox.addEventListener('click', function () {
          checkbox.checked = !checkbox.checked;
          if (checkbox.checked) {
            label.style.textDecoration = 'line-through';
            tasks[index].completed = true;
          } else {
            label.style.textDecoration = 'none';
            tasks[index].completed = false;
          }
          module.saveTasksToLocalStorage();
        });
        checkboxDiv.appendChild(checkbox);

        const label = document.createElement('label');
        label.htmlFor = 'task-' + index;
        label.textContent = task.text;
        label.className = 'BodyPrincipal-label-task';

        if (task.completed) {
          checkbox.checked = true;
          label.style.textDecoration = 'line-through';
        }

        checkboxDiv.appendChild(label);

        listItem.appendChild(checkboxDiv);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'BodyPrincipal-buttons';

        const editButton = document.createElement('button');
        editButton.className = 'BodyPrincipal-button-edit btn btn-outline-primary btn-sm mr-2';
        editButton.innerHTML = '<i class="BodyPrincipal-icon-edit fas fa-edit"></i>';
        buttonsDiv.appendChild(editButton);

        editButton.addEventListener('click', function () {
          module.editTask(task.text, index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'BodyPrincipal-button-delete btn btn-outline-danger btn-sm';
        deleteButton.innerHTML = '<i class="BodyPrincipal-icon-trash fas fa-trash"></i>';
        buttonsDiv.appendChild(deleteButton);

        deleteButton.addEventListener('click', function () {
          module.deleteTask(index);
        });

        listItem.appendChild(buttonsDiv);
        list.appendChild(listItem);
      });

      container.appendChild(list);

      const taskCounter = tasks.length;
      const element = document.getElementById("couter");
      element.textContent = taskCounter;

      module.saveTasksToLocalStorage();
    },

    addTaskToList: function (task) {
      this.tasks.push({ text: task, completed: false });
      this.renderList();
    },

    saveTasksToLocalStorage: function () {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    loadTasksFromLocalStorage: function () {
      const savedTasks = localStorage.getItem('tasks');
      this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
    },

    editTask: function (task, index) {
  const listItem = document.getElementById('list-item-' + index);
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.BodyPrincipal-button-edit');
  const deleteButton = listItem.querySelector('.BodyPrincipal-button-delete');

  // Ocultar los botones de edición y eliminación
  editButton.style.display = 'none';
  deleteButton.style.display = 'none';

  label.style.display = 'none';

  const inputEdit = document.createElement('input');
  inputEdit.type = 'text';
  inputEdit.value = task.text;
  inputEdit.className = 'BodyPrincipal-input-edit-task';

  const updateButton = document.createElement('button');
  updateButton.className = 'BodyPrincipal-button-update-task';
  updateButton.textContent = 'Update';

  listItem.appendChild(inputEdit);
  listItem.appendChild(updateButton);

  updateButton.addEventListener('click', function () {
    const updatedTask = inputEdit.value.trim();
    if (updatedTask !== '') {
      module.tasks[index].text = updatedTask;
      module.renderList();
    }
  });

  inputEdit.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      const updatedTask = inputEdit.value.trim();
      if (updatedTask !== '') {
        module.tasks[index].text = updatedTask;
        module.renderList();
      }
    }
  });
},


    deleteTask: function (index) {
      this.tasks.splice(index, 1);
      this.renderList();
    },


  };

  module.main();
})();

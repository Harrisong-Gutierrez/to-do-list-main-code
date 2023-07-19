(function () {
  const module = {
    tasks: [],
    cacheDom: function () {
      this.formContainer = document.getElementById('form-container');
      this.form = document.getElementById('form-id');
      this.input = document.getElementById('input-id');
      this.addButton = document.getElementById('submit-button-id-icon');
      this.icon = document.getElementById('icon-id');
      this.toggle = document.getElementById('toggle');
      this.checkboxToggle = document.getElementById('toggle');
      this.listContainer = document.getElementById('list-container');
      this.labelToggle = document.getElementById('label_toggle');
      this.mainBox = document.querySelector('main');
      this.headerBox = document.getElementById('header-box');
      this.taskCounter = document.getElementById('couter');
      this.body = document.body;
    },
    main: function () {
      this.cacheDom();
      this.loadTasksFromLocalStorage();
      this.renderList();
      this.renderForm();
      this.bindingEvents();


    },
    renderForm: function () {
      this.cacheDom();

      this.form.className = 'BodyPrincipal-form';

      this.form.appendChild(this.input);

      this.addButton.appendChild(document.createTextNode(' '));
      this.addButton.appendChild(this.icon);

      this.form.appendChild(this.addButton);
      this.formContainer.appendChild(this.form);
    },
    renderList: function () {
      this.cacheDom();

      this.listContainer.innerHTML = '';

      const list = document.createElement('ul');
      list.id = 'list-to-do';
      list.className = 'list-group';

   
      
      const tasks = this.tasks;

      const isDarkMode = this.checkboxToggle.checked;

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

        const deleteButton = document.createElement('button');
        deleteButton.className = 'BodyPrincipal-button-delete btn btn-outline-danger btn-sm';
        deleteButton.innerHTML = '<i class="BodyPrincipal-icon-trash fas fa-trash"></i>';
        buttonsDiv.appendChild(deleteButton);

        listItem.appendChild(buttonsDiv);
        list.appendChild(listItem);

        // Event Listener para editar tarea
        editButton.addEventListener('click', function () {
          module.editTask(task, index);
        });

        // Event Listener para eliminar tarea
        deleteButton.addEventListener('click', function () {
          module.deleteTask(index);
        });
      });

      this.listContainer.appendChild(list);

      const taskCounter = tasks.length;
      this.taskCounter.textContent = taskCounter;

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
    bindingEvents: function () {
      window.addEventListener('DOMContentLoaded', function () {
        const savedDarkMode = localStorage.getItem('darkMode');

        if (savedDarkMode === 'true') {
          module.checkboxToggle.checked = true;
          enableDarkMode();
        } else {
          module.checkboxToggle.checked = false;
          disableDarkMode();
        }
      });

      const handleAddButton = function (event) {
        event.preventDefault();
        const inputValue = module.input.value.trim();

        if (inputValue !== '') {
          module.addTaskToList(inputValue);
          module.input.value = '';
        }
      };

      this.addButton.addEventListener('click', handleAddButton);
      this.input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          handleAddButton(event);
        }
      });

      this.toggle.addEventListener('change', function (event) {
        const checked = event.target.checked;

        if (checked) {
          enableDarkMode();
        } else {
          disableDarkMode();
        }

        localStorage.setItem('darkMode', checked.toString());
      });
    }
  };

  function enableDarkMode() {
    module.body.classList.add('BodyPrincipalDark');
    module.mainBox.classList.add('BodyPrincipalDark-dark-main-box');
    module.headerBox.classList.add('BodyPrincipalDark-header-box');

    const taskListItems = module.listContainer.querySelectorAll('li');
    taskListItems.forEach(function (item, index) {
      item.classList.remove('BodyPrincipal-list-custom-light');
      item.classList.add('BodyPrincipal-list-custom-dark');
    });

    module.labelToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    module.labelToggle.style.color = 'orange';
  }

  function disableDarkMode() {
    module.body.classList.remove('BodyPrincipalDark');
    module.mainBox.classList.remove('BodyPrincipalDark-dark-main-box');
    module.headerBox.classList.remove('BodyPrincipalDark-header-box');

    const taskListItems = module.listContainer.querySelectorAll('li');
    taskListItems.forEach(function (item, index) {
      item.classList.remove('BodyPrincipal-list-custom-dark');
      item.classList.add('BodyPrincipal-list-custom-light');
    });

    module.labelToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    module.labelToggle.style.color = 'purple';
  }

  module.main();
})();

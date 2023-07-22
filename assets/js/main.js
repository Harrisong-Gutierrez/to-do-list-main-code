(function () {
  const module = {
    cacheDom: function () {
      this.tasks = [];
      this.formContainer = document.getElementById('form-container');
      this.form = document.getElementById('form-id');
      this.input = document.getElementById('input-id');
      this.addButton = document.getElementById('submit-button-id-icon');
      this.icon = document.getElementById('icon-id');
      this.toggle = document.getElementById('toggle');
      this.labelToggle = document.getElementById('label_toggle');
      this.headerBox = document.getElementById('header-box');
      this.mainBox = document.getElementById('container-to-do-list');
      this.taskCounter = document.getElementById('counter');
      this.list = document.getElementById('list-to-do');
      this.listItems = this.list ? this.list.querySelectorAll('li') : [];
      this.isDarkMode = this.toggle.checked;
    },
    main: function () {
      document.addEventListener('DOMContentLoaded', () => {
        this.cacheDom();
        this.loadTasksFromLocalStorage();
        this.bindEvents();
        this.renderList();
        this.updateTaskCounter();
      });
    },
    saveTasksToLocalStorage: function () {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    createItems: function (todo, index) {
      const inputEdit = document.createElement('input');
      const buttonsDiv = document.createElement('div');
      const editButton = document.createElement('button');
      const deleteButton = document.createElement('button');
      const updateButton = document.createElement('button');
      const listItem = document.createElement('li');
      const checkboxDiv = document.createElement('div');
      const label = document.createElement('label');
      const checkbox = document.createElement('div');

      listItem.id = `list-item-${todo.id}`;

      listItem.className = `BodyPrincipal-list-custom d-flex justify-content-between align-items-center`;

      checkboxDiv.className = 'BodyPrincipal-checkbox';
      checkbox.type = 'radio';
      checkbox.className = `fa-sharp fa-solid fa-circle-check BodyPrincipal-radio-task`;
      checkbox.id = `task-${todo.id}`;

      checkbox.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked;
        label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        todo.completed = checkbox.checked;
        this.saveTasksToLocalStorage();
      });

      checkboxDiv.appendChild(checkbox);

      label.htmlFor = `task-${todo.id}`;
      label.textContent = todo.text;
      label.className = 'BodyPrincipal-label-task';

      checkbox.checked = todo.completed;
      label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

      checkboxDiv.appendChild(label);
      listItem.appendChild(checkboxDiv);

      buttonsDiv.className = 'BodyPrincipal-buttons';

      editButton.className = 'BodyPrincipal-button-edit btn btn-outline-primary btn-sm mr-2';
      editButton.innerHTML = '<i class="BodyPrincipal-icon-edit fas fa-edit"></i>';
      buttonsDiv.appendChild(editButton);

      deleteButton.className = 'BodyPrincipal-button-delete btn btn-outline-danger btn-sm';
      deleteButton.innerHTML = '<i class="BodyPrincipal-icon-trash fas fa-trash"></i>';
      buttonsDiv.appendChild(deleteButton);

      listItem.appendChild(buttonsDiv);
      this.list.appendChild(listItem);

      editButton.addEventListener('click', () => this.editTask(todo, todo.id));
      deleteButton.addEventListener('click', this.deleteTask.bind(this, todo.id));

      // Agregar clases específicas para el modo oscuro si está habilitado
      if (this.isDarkMode) {
        listItem.classList.add('BodyPrincipal-list-custom-dark');
        if (this.listItems.length % 2 === 0) {
          listItem.style.backgroundColor = '#4982b4';
          listItem.style.color = 'white';
        } else {
          listItem.style.backgroundColor = '#182938';
          listItem.style.color = 'white';
        }
      } else {
        listItem.classList.add('BodyPrincipal-list-custom-light');
        if (index % 2 === 0) {
          listItem.style.backgroundColor = '#f2f2f2';
          listItem.style.color = 'black';
        } else {
          listItem.style.backgroundColor = 'white';
          listItem.style.color = 'black';
        }
      }
    },
    updateTaskCounter: function () {
      this.taskCounter.textContent = this.tasks.length;
    },
    renderList: function () {
      this.list.innerHTML = ''; // Limpiar la lista antes de volver a renderizar

      this.tasks.forEach((task, index) => {
        this.createItems(task, index);
      });

      let totalTasks = this.tasks.length;

      this.taskCounter.textContent = `${totalTasks}`;
      this.saveTasksToLocalStorage();
    },
    addTaskToList: function (task) {
      const newTask = {
        text: task,
        completed: false,
        id: this.randomId(),
      };
    
      this.tasks.push(newTask);
      this.createItems(newTask, this.tasks.length - 1);
    
      // Actualizar clases para el modo oscuro o claro dependiendo de la intercalación
      const taskListItems = this.list.querySelectorAll('li');
      taskListItems.forEach((item, index) => {
        if (this.isDarkMode) {
          item.classList.remove('BodyPrincipal-list-custom-light');
          item.classList.add('BodyPrincipal-list-custom-dark');
          item.style.backgroundColor = index % 2 === 0 ? '#4982b4' : '#182938';
          item.style.color = 'white';
        } else {
          item.classList.remove('BodyPrincipal-list-custom-dark');
          item.classList.add('BodyPrincipal-list-custom-light');
          item.style.backgroundColor = index % 2 === 0 ? '#f2f2f2' : 'white';
          item.style.color = 'black';
        }
      });
    
      this.saveTasksToLocalStorage();
      this.updateTaskCounter();
    },
    loadTasksFromLocalStorage: function () {
      const savedTasks = localStorage.getItem('tasks');
      this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
    },
    randomId: function (length = 6) {
      return Math.random().toString(36).substring(2, length + 2);
    },
    updateListItem: function (listItem, task) {
      const label = listItem.querySelector('label');
      label.textContent = task.text;
      label.style.display = '';
      listItem.querySelector('.BodyPrincipal-buttons').style.display = '';
    },
    editTask: function (task, taskId) {
      const listItem = document.getElementById(`list-item-${taskId}`);
      const label = listItem.querySelector('label');

      const existingInput = listItem.querySelector('.BodyPrincipal-input-edit-task');
      const existingButton = listItem.querySelector('.BodyPrincipal-button-update-task');

      existingInput?.remove();
      existingButton?.remove();

      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = task.text;
      inputEdit.className = 'BodyPrincipal-input-edit-task';

      const updateButton = document.createElement('button');
      updateButton.className = 'BodyPrincipal-button-update-task';
      updateButton.textContent = 'Update';

      const parentElement = label.parentNode;
      parentElement.insertBefore(inputEdit, label.nextSibling);
      parentElement.insertBefore(updateButton, label.nextSibling);

      label.style.display = 'none';
      listItem.querySelector('.BodyPrincipal-buttons').style.display = 'none';

      const self = this;

      updateButton.addEventListener('click', function () {
        const updatedTask = inputEdit.value.trim();
        if (updatedTask !== '') {
          task.text = updatedTask;
          self.updateListItem(listItem, task);
          inputEdit.remove();
          updateButton.remove();
          self.saveTasksToLocalStorage();
        }

        label.style.display = '';
        listItem.querySelector('.BodyPrincipal-buttons').style.display = '';
        label.textContent = task.text;
      });

      inputEdit.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          const updatedTask = inputEdit.value.trim();

          if (updatedTask !== '') {
            task.text = updatedTask;
            self.updateListItem(listItem, task);
            inputEdit.remove();
            updateButton.remove();
            self.saveTasksToLocalStorage();
          }

          label.style.display = '';
          listItem.querySelector('.BodyPrincipal-buttons').style.display = '';
          label.textContent = task.text;
        }
      });
    },
    deleteTask: function (taskId) {
      const listItem = document.getElementById(`list-item-${taskId}`);
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.saveTasksToLocalStorage();

      if (listItem) {
        listItem.remove();
        this.updateTaskCounter();
      }
    },
    bindEvents: function () {
      window.addEventListener('DOMContentLoaded', () => {
        const savedDarkMode = localStorage.getItem('darkMode');
        this.toggle.checked = savedDarkMode === 'true';
        this.isDarkMode = this.toggle.checked;
        this.toggle.checked ? this.enableDarkMode() : this.disableDarkMode();
      });

      this.addButton.addEventListener('click', (event) => {
        event.preventDefault();
        const inputValue = this.input.value.trim();
        inputValue !== '' ? (this.addTaskToList(inputValue), this.input.value = '') : null;
      });

      this.input.addEventListener('keydown', (event) => {
        event.key === 'Enter' ? (event.preventDefault(), this.addButton.click()) : null;
      });

      this.toggle.addEventListener('change', (event) => {
        const checked = event.target.checked;

        this.isDarkMode = checked; // Actualizar el estado del modo oscuro

        checked ? this.enableDarkMode() : this.disableDarkMode();
        localStorage.setItem('darkMode', checked.toString());
      });
    },
    enableDarkMode: function () {
      document.body.classList.add('BodyPrincipalDark');
      this.mainBox.classList.add('BodyPrincipalDark-dark-main-box');
      this.headerBox.classList.add('BodyPrincipalDark-header-box');

      const taskListItems = this.list.querySelectorAll('li');
      taskListItems.forEach((item, index) => {
        item.classList.remove('BodyPrincipal-list-custom-light');
        item.classList.add('BodyPrincipal-list-custom-dark');
        item.style.backgroundColor = index % 2 === 0 ? '#4982b4' : '#182938';
        item.style.color = 'white';
      });

      this.labelToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      this.labelToggle.style.color = 'orange';
    },
    disableDarkMode: function () {
      document.body.classList.remove('BodyPrincipalDark');
      this.mainBox.classList.remove('BodyPrincipalDark-dark-main-box');
      this.headerBox.classList.remove('BodyPrincipalDark-header-box');

      const taskListItems = this.list.querySelectorAll('li');
      taskListItems.forEach((item, index) => {
        item.classList.remove('BodyPrincipal-list-custom-dark');
        item.classList.add('BodyPrincipal-list-custom-light');
        item.style.backgroundColor = index % 2 === 0 ? '#f2f2f2' : 'white';
        item.style.color = 'black';
      });

      this.labelToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      this.labelToggle.style.color = 'purple';
    },
  };

  module.main();
})();

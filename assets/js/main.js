(function () {
  const module = {
    tasks: [],
    taskIdCounter: 0,
    cacheDom: function () {
      this.formContainer = document.getElementById('form-container');
      this.form = document.getElementById('form-id');
      this.input = document.getElementById('input-id');
      this.addButton = document.getElementById('submit-button-id-icon');
      this.icon = document.getElementById('icon-id');
      this.toggle = document.getElementById('toggle');
      this.labelToggle = document.getElementById('label_toggle');
      this.headerBox = document.getElementById('header-box');
      this.taskCounter = document.getElementById('counter');
      this.list = document.getElementById('list-to-do');
      this.listItems = this.list ? this.list.querySelectorAll('li') : [];
      this.isDarkMode = this.toggle.checked;
    },
    main: function () {
      this.cacheDom();
      this.loadTasksFromLocalStorage();
      this.bindEvents();
      this.renderList(); // Llamar a renderList después de cargar los elementos del DOM
    },
    
    createItems: function (todo) {
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
      listItem.className = `BodyPrincipal-list-custom d-flex justify-content-between align-items-center ${this.isDarkMode ? 'BodyPrincipal-list-custom-dark' : 'BodyPrincipal-list-custom-light'}`;

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
    },
    updateTaskCounter: function () {
      this.taskCounter.textContent = this.tasks.length;
    },
    renderList: function () {
      this.tasks.forEach((task) => {
        this.createItems(task);
      });

      this.taskCounter.textContent = this.tasks.length;
      this.saveTasksToLocalStorage();
    },
    addTaskToList: function (task) {
      const newTask = {
        id: this.taskIdCounter,
        text: task,
        completed: false,
      };

      this.tasks.push(newTask);
      this.taskIdCounter++;
      this.createItems(newTask);
      this.updateTaskCounter();
      this.saveTasksToLocalStorage();
    },
    saveTasksToLocalStorage: function () {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    loadTasksFromLocalStorage: function () {
      const savedTasks = localStorage.getItem('tasks');
      this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
    },
    clearList: function () {
      while (this.list.firstChild) {
        this.list.removeChild(this.list.firstChild);
      }
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
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.saveTasksToLocalStorage();
      const listItem = document.getElementById(`list-item-${taskId}`);
      if (listItem) {
        listItem.remove();
        this.updateTaskCounter();
      }
    },
    bindEvents: function () {
      window.addEventListener('DOMContentLoaded', () => {
        const savedDarkMode = localStorage.getItem('darkMode');
        this.toggle.checked = savedDarkMode === 'true';
        this.toggle.checked ? this.enableDarkMode() : this.disableDarkMode();
      });

      this.addButton.addEventListener('click', (event) => {
        event.preventDefault();
        const inputValue = this.input.value.trim();
        if (inputValue !== '') {
          this.addTaskToList(inputValue);
          this.input.value = '';
        }
      });

      this.input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          this.addButton.click();
        }
      });

      this.toggle.addEventListener('change', (event) => {
        const checked = event.target.checked;
        checked ? this.enableDarkMode() : this.disableDarkMode();
        localStorage.setItem('darkMode', checked.toString());
      });
    },
    enableDarkMode: function () {
      document.body.classList.add('BodyPrincipalDark');
      this.headerBox.classList.add('BodyPrincipalDark-header-box');

      const taskListItems = this.listContainer.querySelectorAll('li');
      taskListItems.forEach((item) => {
        item.classList.remove('BodyPrincipal-list-custom-light');
        item.classList.add('BodyPrincipal-list-custom-dark');
      });

      this.labelToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      this.labelToggle.style.color = 'orange';
    },
    disableDarkMode: function () {
      document.body.classList.remove('BodyPrincipalDark');
      this.headerBox.classList.remove('BodyPrincipalDark-header-box');

      const taskListItems = this.listContainer.querySelectorAll('li');
      taskListItems.forEach((item) => {
        item.classList.remove('BodyPrincipal-list-custom-dark');
        item.classList.add('BodyPrincipal-list-custom-light');
      });

      this.labelToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      this.labelToggle.style.color = 'purple';
    },
  };

  module.main();
})();

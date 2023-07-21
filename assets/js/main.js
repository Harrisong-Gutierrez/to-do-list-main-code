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
      this.checkboxToggle = document.getElementById('toggle');
      this.listContainer = document.getElementById('list-container');
      this.labelToggle = document.getElementById('label_toggle');
      this.mainBox = document.querySelector('main');
      this.headerBox = document.getElementById('header-box');
      this.taskCounter = document.getElementById('couter');
      this.list = document.getElementById('list-to-do');
      this.listItems = this.list ? this.list.querySelectorAll('li') : [];
      this.isDarkMode = this.checkboxToggle.checked;
    },

    main: function () {
      this.cacheDom();
      this.loadTasksFromLocalStorage();
      this.renderList();
      this.bindEvents();
    },

    createItems: function (todo, isDarkMode) {
      this.inputEdit = document.createElement('input');
      this.buttonsDiv = document.createElement('div');
      this.editButton = document.createElement('button');
      this.deleteButton = document.createElement('button');
      this.updateButton = document.createElement('button');
      this.listItem = document.createElement('li');
      this.checkboxDiv = document.createElement('div');
      this.label = document.createElement('label');
      this.listContainer = this.list;

      this.listItem.id = `list-item-${todo.id}`;
      this.listItem.className = `BodyPrincipal-list-custom d-flex justify-content-between align-items-center ${isDarkMode ? 'BodyPrincipal-list-custom-dark' : 'BodyPrincipal-list-custom-light'}`;

      this.checkboxDiv.className = 'BodyPrincipal-checkbox';
      const checkbox = document.createElement('div');
      checkbox.type = 'radio';
      checkbox.className = `fa-sharp fa-solid fa-circle-check BodyPrincipal-radio-task`;
      checkbox.id = `task-${todo.id}`;

      checkbox.addEventListener('click', () => {
        checkbox.checked = !checkbox.checked;
        const label = this.listItem.querySelector('label');
        label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
        task.completed = checkbox.checked;
        this.saveTasksToLocalStorage();
      });

      this.checkboxDiv.appendChild(checkbox);

      this.label.htmlFor = `task-${todo.id}`;
      this.label.textContent = todo.text;
      this.label.className = 'BodyPrincipal-label-task';

      checkbox.checked = todo.completed;
      this.label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

      this.checkboxDiv.appendChild(this.label);
      this.listItem.appendChild(this.checkboxDiv);

      this.buttonsDiv.className = 'BodyPrincipal-buttons';

      this.editButton.className = 'BodyPrincipal-button-edit btn btn-outline-primary btn-sm mr-2';
      this.editButton.innerHTML = '<i class="BodyPrincipal-icon-edit fas fa-edit"></i>';
      this.buttonsDiv.appendChild(this.editButton);

      this.deleteButton.className = 'BodyPrincipal-button-delete btn btn-outline-danger btn-sm';
      this.deleteButton.innerHTML = '<i class="BodyPrincipal-icon-trash fas fa-trash"></i>';
      this.buttonsDiv.appendChild(this.deleteButton);

      this.listItem.appendChild(this.buttonsDiv);
      this.list.appendChild(this.listItem);

      this.editButton.addEventListener('click', () => this.editTask(todo, todo.id));
      this.deleteButton.addEventListener('click', () => this.deleteTask(todo.id));
    },

    updateTaskCounter: function () {
      this.taskCounter.textContent = this.tasks.length;
    },

    renderList: function () {
      this.tasks.forEach((task) => {
        this.createItems(task, this.isDarkMode);
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
      this.createItems(newTask, this.isDarkMode);
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

      this.inputEdit = document.createElement('input');
      this.inputEdit.type = 'text';
      this.inputEdit.value = task.text;
      this.inputEdit.className = 'BodyPrincipal-input-edit-task';

      this.updateButton = document.createElement('button');
      this.updateButton.className = 'BodyPrincipal-button-update-task';
      this.updateButton.textContent = 'Update';

      const parentElement = label.parentNode;
      parentElement.insertBefore(this.inputEdit, label.nextSibling);
      parentElement.insertBefore(this.updateButton, label.nextSibling);

      this.label.style.display = 'none';
      listItem.querySelector('.BodyPrincipal-buttons').style.display = 'none';

      const self = this;

      this.updateButton.addEventListener('click', function () {
        const updatedTask = self.inputEdit.value.trim();
        if (updatedTask !== '') {
          task.text = updatedTask;
          self.updateListItem(listItem, task);
          self.inputEdit.remove();
          self.updateButton.remove();

          self.saveTasksToLocalStorage();
        }

        self.label.style.display = '';
        listItem.querySelector('.BodyPrincipal-buttons').style.display = '';
        label.textContent = task.text;
      });

      this.inputEdit.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          const updatedTask = self.inputEdit.value.trim();
          if (updatedTask !== '') {
            task.text = updatedTask;
            self.updateListItem(listItem, task);
            self.inputEdit.remove();
            self.updateButton.remove();

            self.saveTasksToLocalStorage();
          }

          self.label.style.display = '';
          listItem.querySelector('.BodyPrincipal-buttons').style.display = '';
          label.textContent = task.text;
        }
      });
    },

    deleteTask: function (taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.saveTasksToLocalStorage();
      this.clearList();
      this.renderList();
      this.updateTaskCounter();
    },

    bindEvents: function () {
      window.addEventListener('DOMContentLoaded', () => {
        const savedDarkMode = localStorage.getItem('darkMode');
        this.checkboxToggle.checked = savedDarkMode === 'true';
        this.checkboxToggle.checked ? this.enableDarkMode() : this.disableDarkMode();
      });

      this.addButton.addEventListener('click', (event) => {
        event.preventDefault();
        const inputValue = this.input.value.trim();
        inputValue !== '' && (this.addTaskToList(inputValue), (this.input.value = ''));
      });

      this.input.addEventListener('keydown', (event) => {
        event.key === 'Enter' && this.addButton.click();
      });

      this.toggle.addEventListener('change', (event) => {
        const checked = event.target.checked;
        checked ? this.enableDarkMode() : this.disableDarkMode();
        localStorage.setItem('darkMode', checked.toString());
      });
    },

    enableDarkMode: function () {
      document.body.classList.add('BodyPrincipalDark');
      this.mainBox.classList.add('BodyPrincipalDark-dark-main-box');
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
      this.mainBox.classList.remove('BodyPrincipalDark-dark-main-box');
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

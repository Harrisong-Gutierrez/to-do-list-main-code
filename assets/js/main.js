(function () {
  const module = {
    tasks: [],
    taskIdCounter: 0,
    bodyElement: null,

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
      this.bodyElement = document.querySelector('body');
    },

    main: function () {
      this.cacheDom();
      this.loadTasksFromLocalStorage();
      this.renderList();
      this.bindEvents();
    },

    renderList: function () {
      const list = document.getElementById('list-to-do');

      const newList = list
        ? null
        : ((newList = document.createElement('ul')),
          (newList.id = 'list-to-do'),
          (newList.className = 'list-group'),
          this.listContainer.appendChild(newList));

      const isDarkMode = this.checkboxToggle.checked;
      const listItems = list ? list.querySelectorAll('li') : [];
      listItems.forEach((listItem) => listItem.remove());

      this.tasks.forEach((task) => {
        const listItem = document.createElement('li');
        listItem.id = `list-item-${task.id}`;
        listItem.className = `BodyPrincipal-list-custom d-flex justify-content-between align-items-center ${
          isDarkMode ? 'BodyPrincipal-list-custom-dark' : 'BodyPrincipal-list-custom-light'
        }`;

        const checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'BodyPrincipal-checkbox';
        const checkbox = document.createElement('div');
        checkbox.type = 'radio';
        checkbox.className = `<fa-sharp fa-solid fa-circle-check BodyPrincipal-radio-task`;
        checkbox.id = `task-${task.id}`;

        checkbox.addEventListener('click', () => {
          checkbox.checked = !checkbox.checked;
          const label = listItem.querySelector('label');
          label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
          task.completed = checkbox.checked;
          this.saveTasksToLocalStorage();
        });

        checkboxDiv.appendChild(checkbox);

        const label = document.createElement('label');
        label.htmlFor = `task-${task.id}`;
        label.textContent = task.text;
        label.className = 'BodyPrincipal-label-task';

        checkbox.checked = task.completed;
        label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

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

        editButton.addEventListener('click', () => this.editTask(task, task.id));
        deleteButton.addEventListener('click', () => this.deleteTask(task.id));
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
      this.renderList();
    },

    saveTasksToLocalStorage: function () {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },

    loadTasksFromLocalStorage: function () {
      const savedTasks = localStorage.getItem('tasks');
      this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
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

      listItem.insertBefore(inputEdit, label.nextSibling);
      listItem.insertBefore(updateButton, label.nextSibling);

      label.style.display = 'none';
      listItem.querySelector('.BodyPrincipal-buttons').style.display = 'none';

      updateButton.addEventListener('click', () => {
        const updatedTask = inputEdit.value.trim();
        updatedTask !== '' && ((task.text = updatedTask), this.renderList());
        inputEdit.remove();
        updateButton.remove();
        label.style.display = '';
        listItem.querySelector('.BodyPrincipal-buttons').style.display = '';
        label.textContent = task.text;
      });

      inputEdit.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const updatedTask = inputEdit.value.trim();
          updatedTask !== '' && ((task.text = updatedTask), this.renderList());
          inputEdit.remove();
          updateButton.remove();
          label.style.display = '';
          listItem.querySelector('.BodyPrincipal-buttons').style.display = '';
          label.textContent = task.text;
        }
      });
    },

    deleteTask: function (taskId) {
      const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
      taskIndex !== -1 && (this.tasks.splice(taskIndex, 1), this.renderList());
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
      this.bodyElement.classList.add('BodyPrincipalDark');
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
      this.bodyElement.classList.remove('BodyPrincipalDark');
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

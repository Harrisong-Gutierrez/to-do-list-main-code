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
    },

    main: function () {
      this.cacheDom();
      this.loadTasksFromLocalStorage();
      this.renderList();
      this.bindEvents();
    },

    createItems: function (todo) {



      this.inputEdit = document.createElement('input');

      this.buttonsDiv = document.createElement('div');

      this.editButton = document.createElement('button');

      this.deleteButton = document.createElement('button');

      this.updateButton = document.createElement('button');

      this.listItem = document.createElement('li');

      this.checkboxDiv = document.createElement('div');

      this.label = document.createElement('label');

      this.listContainer = this.list







    },

    renderList: function () {
      this.createItems();

      /*  const list = document.getElementById('list-to-do'); */

      /*  const listContainer = list */
      this.listContainer
        ? null
        : ((listContainer = document.createElement('ul')),
          (listContainer.id = 'list-to-do'),
          (listContainer.className = 'list-group'),
          this.listContainer.appendChild(listContainer));

      const isDarkMode = this.checkboxToggle.checked;
      /*      const listItems = this.list ? this.list.querySelectorAll('li') : [];  */
      this.listItems.forEach((listItem) => listItem.remove());

      this.tasks.forEach((task) => {
        /* const listItem = document.createElement('li'); */
        this.listItem.id = `list-item-${task.id}`;
        this.listItem.className = `BodyPrincipal-list-custom d-flex justify-content-between align-items-center ${isDarkMode ? 'BodyPrincipal-list-custom-dark' : 'BodyPrincipal-list-custom-light'
          }`;

        /* const checkboxDiv = document.createElement('div'); */
        this.checkboxDiv.className = 'BodyPrincipal-checkbox';
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

        this.checkboxDiv.appendChild(checkbox);

        /*  const label = document.createElement('label'); */
        this.label.htmlFor = `task-${task.id}`;
        this.label.textContent = task.text;
        this.label.className = 'BodyPrincipal-label-task';

        checkbox.checked = task.completed;
        this.label.style.textDecoration = checkbox.checked ? 'line-through' : 'none';

        this.checkboxDiv.appendChild(this.label);
        this.listItem.appendChild(this.checkboxDiv);

        /* const buttonsDiv = document.createElement('div'); */
        this.buttonsDiv.className = 'BodyPrincipal-buttons';

        /* const editButton = document.createElement('button'); */
        this.editButton.className = 'BodyPrincipal-button-edit btn btn-outline-primary btn-sm mr-2';
        this.editButton.innerHTML = '<i class="BodyPrincipal-icon-edit fas fa-edit"></i>';
        this.buttonsDiv.appendChild(this.editButton);

        /* const deleteButton = document.createElement('button'); */
        this.deleteButton.className = 'BodyPrincipal-button-delete btn btn-outline-danger btn-sm';
        this.deleteButton.innerHTML = '<i class="BodyPrincipal-icon-trash fas fa-trash"></i>';
        this.buttonsDiv.appendChild(this.deleteButton);

        this.listItem.appendChild(this.buttonsDiv);
        this.list.appendChild(this.listItem);

        this.editButton.addEventListener('click', () => this.editTask(task, task.id));
        this.deleteButton.addEventListener('click', () => this.deleteTask(task.id));
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

      /*  const inputEdit = document.createElement('input'); */
      this.inputEdit.type = 'text';
      this.inputEdit.value = task.text;
      this.inputEdit.className = 'BodyPrincipal-input-edit-task';

      /*  const updateButton = document.createElement('button'); */
      this.updateButton.className = 'BodyPrincipal-button-update-task';
      this.updateButton.textContent = 'Update';

      listItem.insertBefore(this.inputEdit, label.nextSibling);
      listItem.insertBefore(this.updateButton, label.nextSibling);

      this.label.style.display = 'none';
      this.listItem.querySelector('.BodyPrincipal-buttons').style.display = 'none';

      this.updateButton.addEventListener('click', () => {
        const updatedTask = this.inputEdit.value.trim();
        updatedTask !== '' && ((task.text = updatedTask), this.renderList());
        this.inputEdit.remove();
        this.updateButton.remove();
        label.style.display = '';
        listItem.querySelector('.BodyPrincipal-buttons').style.display = '';
        label.textContent = task.text;
      });

      this.inputEdit.addEventListener('keydown', (event) => {
        event.key === 'Enter' &&
          ((updatedTask = this.inputEdit.value.trim()),
            updatedTask !== '' &&
            ((task.text = updatedTask), this.renderList()),
            this.inputEdit.remove(),
            this.updateButton.remove(),
            (label.style.display = ''),
            (listItem.querySelector('.BodyPrincipal-buttons').style.display = ''),
            (label.textContent = task.text));
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

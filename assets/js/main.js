(function () {
  const module = {
    main: function () {
      const List = function () {
        this.tasks = [];
        this.taskCounter = 0;

        this.renderList = function () {
          const container = document.getElementById('list-container');
          container.innerHTML = '';

          const list = document.createElement('ul');
          list.id = 'list-to-do';
          list.className = 'list-group';

          const tasks = this.tasks;

          tasks.forEach(function (task, index) {
            if (!task) {
              return;
            }

            const listItem = document.createElement('li');
            listItem.id = 'list-item-' + index;
            listItem.className = 'BodyPrincipal-list-custom-light  d-flex justify-content-between align-items-center';

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
              saveTasksToLocalStorage();
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
              editTask(task.text, index);
            });

            const deleteButton = document.createElement('button');
            deleteButton.className = 'BodyPrincipal-button-delete btn btn-outline-danger btn-sm';
            deleteButton.innerHTML = '<i class="BodyPrincipal-icon-trash fas fa-trash"></i>';
            buttonsDiv.appendChild(deleteButton);

            deleteButton.addEventListener('click', function () {
              deleteTask(index);
            });

            listItem.appendChild(buttonsDiv);
            list.appendChild(listItem);
          });

          container.appendChild(list);

          taskCounter = tasks.length;
          let element = document.getElementById("couter");
          element.textContent = taskCounter;

          saveTasksToLocalStorage();
        };

        this.addTaskToList = function (task) {
          this.tasks.push({ text: task, completed: false });
          this.renderList();
        };

        this.saveTasksToLocalStorage = function () {
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
        };

        this.loadTasksFromLocalStorage = function () {
          const savedTasks = localStorage.getItem('tasks');
          this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
        };

        this.editTask = function (task, index) {
          const listItem = document.getElementById('list-item-' + index);
          listItem.innerHTML = '';

          const inputEdit = document.createElement('input');
          inputEdit.type = 'text';
          inputEdit.value = task;
          inputEdit.className = 'BodyPrincipal-input-edit-task';

          const updateButton = document.createElement('button');
          updateButton.className = 'BodyPrincipal-button-update-task';
          updateButton.textContent = 'Update';

          listItem.appendChild(inputEdit);
          listItem.appendChild(updateButton);

          updateButton.addEventListener('click', function () {
            const updatedTask = inputEdit.value.trim();
            if (updatedTask !== '') {
              tasks[index].text = updatedTask;
              renderList();
            }
          });

          inputEdit.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
              const updatedTask = inputEdit.value.trim();
              if (updatedTask !== '') {
                tasks[index].text = updatedTask;
                renderList();
              }
            }
          });
        };

        this.deleteTask = function (index) {
          this.tasks.splice(index, 1);
          this.renderList();
        };
      };

      const list = new List();
      list.loadTasksFromLocalStorage();
      list.renderList();

      const formContainer = document.getElementById('form-container');

      function addTaskToList(task) {
        list.addTaskToList(task);
      }

      // Código del componente form.js
      function renderForm() {
        const form = document.createElement('form');
        form.className = 'BodyPrincipal-form';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'BodyPrincipal-input-form-light';
        input.placeholder = 'Enter todo here';
        form.appendChild(input);

        const addButton = document.createElement('button');
        addButton.type = 'submit';
        addButton.id = 'submit-button-id-icon';
        addButton.className = 'BodyPrincipal-button-light';
        addButton.textContent = 'Submit';

        const icon = document.createElement('i');
        icon.className = 'fa-sharp fa-solid fa-paper-plane';

        addButton.appendChild(document.createTextNode(' '));
        addButton.appendChild(icon);

        form.appendChild(addButton);

        form.addEventListener('submit', function (event) {
          event.preventDefault();

          const inputValue = input.value.trim();

          if (inputValue !== '') {
            addTaskToList(inputValue);
            input.value = '';
          }
        });

        formContainer.appendChild(form);
      }

      renderForm();

      function saveTasksToLocalStorage() {
        list.saveTasksToLocalStorage();
      }

      function renderList() {
        list.renderList();
      }

      function editTask(task, index) {
        list.editTask(task, index);
      }

      function deleteTask(index) {
        list.deleteTask(index);
      }

      // Código del componente Dark Mode
      const toggle = document.getElementById('toggle');
      const body = document.body;
      const mainBox = document.querySelector('main');
      const headerBox = document.getElementById('header-box');
      const taskListItems = document.querySelectorAll('li');
      const labelToggle = document.getElementById('label_toggle');
      const tasks = list.tasks; // Agregamos esta línea para acceder a la variable tasks

      toggle.addEventListener('change', (event) => {
        let checked = event.target.checked;

        if (checked) {
          enableDarkMode();
        } else {
          disableDarkMode();
        }

        localStorage.setItem('darkMode', checked.toString());
      });

      function enableDarkMode() {
        body.classList.add('BodyPrincipalDark');
        mainBox.classList.add('BodyPrincipalDark-dark-main-box');
        headerBox.classList.add('BodyPrincipalDark-header-box');
        taskListItems.forEach((item) => {
          item.classList.add('BodyPrincipalDark-dark-list-principal');
        });
        labelToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        labelToggle.style.color = 'orange';
      }

      function disableDarkMode() {
        body.classList.remove('BodyPrincipalDark');
        mainBox.classList.remove('BodyPrincipalDark-dark-main-box');
        headerBox.classList.remove('BodyPrincipalDark-header-box');
        taskListItems.forEach((item) => {
          item.classList.remove('BodyPrincipalDark-dark-list-principal');
        });
        labelToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        labelToggle.style.color = 'purple';
      }

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
    },
    cacheDom: function () {
      const container = document.getElementById('list-container');
      const addButton = document.getElementById('add-button');
      // Resto del código para cacheDom...
    },
  };

  module.main();
})();

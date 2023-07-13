// components/form.js

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

  const container = document.getElementById('form-container');
  container.appendChild(form);

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const inputValue = input.value.trim(); // Obtén el valor del input y elimina los espacios en blanco al inicio y al final

    if (inputValue !== '') {
      addTaskToList(inputValue);
      input.value = ''; // Limpia el valor del input después de agregar la tarea
    }
  });
};

renderForm();

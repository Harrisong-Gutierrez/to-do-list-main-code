toggle.addEventListener('change', (event) => {
    let checked = event.target.checked;
    console.log(checked);

    document.body.classList.toggle('dark-body');
    const myelemento_main_box = document.querySelector('main');
    myelemento_main_box.classList.toggle('dark-main-box-to-do');
    const myelemento_header_box = document.getElementById('header-box');
    myelemento_header_box.classList.toggle('dark-header-box-custom');
    
    const taskListItems = document.querySelectorAll('li');
    taskListItems.forEach((item, index) => {
        if (checked) {
            item.classList.toggle('dark-list-principal-class');
            if (index % 2 === 0) {
                item.classList.add('dark-list-secundary-class');
            } else {
                item.classList.remove('dark-list-secundary-class');
            }
        } else {
            item.classList.remove('dark-list-principal-class');
            item.classList.remove('dark-list-secundary-class');
        }

        // Guardar el estado de los elementos en localStorage
        localStorage.setItem(`task_${index}_darkListPrincipal`, item.classList.contains('dark-list-principal-class').toString());
        localStorage.setItem(`task_${index}_darkListSecundary`, item.classList.contains('dark-list-secundary-class').toString());
    });

    if (checked) {
        label_toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        label_toggle.style.color = "orange";
    } else {
        label_toggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        label_toggle.style.color = "purple";
    }
});

window.addEventListener('DOMContentLoaded', () => {
  const taskListItems = document.querySelectorAll('li');
    taskListItems.forEach((item, index) => {
        const isDarkListPrincipal = localStorage.getItem(`task_${index}_darkListPrincipal`) === 'true';
        const isDarkListSecundary = localStorage.getItem(`task_${index}_darkListSecundary`) === 'true';

        if (isDarkListPrincipal) {
            item.classList.add('dark-list-principal-class');
        } else {
            item.classList.remove('dark-list-principal-class');
        }

        if (isDarkListSecundary) {
            item.classList.add('dark-list-secundary-class');
        } else {
            item.classList.remove('dark-list-secundary-class');
        }
    });
});







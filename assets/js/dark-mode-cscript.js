let toggle=document.getElementById('toggle');
let label=document.getElementById('label_toggle');

toggle.addEventListener('change',(event)=> {

    let checked=event.target.checked;
    console.log(checked);


     document.body.classList.toggle('dark-body')

     const myelemento_main_box = document.querySelector('main')
     myelemento_main_box.classList.toggle('dark-main-box-to-do')
     

     const myelemento_header_box = document.getElementById('header-box')
     myelemento_header_box.classList.toggle('dark-header-box-custom')

     const myelemento_list_box = document.querySelector('li')
     myelemento_list_box.classList.toggle('dark-list-principal-class')

  




    if  (checked==true) {
        label_toggle.innerHTML='<i class="fa-solid fa-sun"></i>';
        label_toggle.style.color="orange"
    }else {
         label_toggle.innerHTML='<i class="fa-solid fa-moon"></i>';
         label_toggle.style.color="purple"
    }
})
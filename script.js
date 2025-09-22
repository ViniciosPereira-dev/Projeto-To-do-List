// Selecionar os elementos;

const input_box = document.getElementById('input-box');
const btn_Add = document.getElementById('btn-add');
const list = document.getElementById('list');
const categorias = document.getElementById('categorias')
const concluidas = document.getElementById('Concluidas');
const pendentes = document.getElementById('Pendentes')
const btnReset = document.getElementById('reset');

//ADD uma task
btn_Add.addEventListener('click', () => {
    if(input_box.value === ""){
        alert("Voçê deve inserir uma taréfa!")
    }else{
    let li = document.createElement('li');
    li.innerHTML = input_box.value;
    list.appendChild(li);

    let span = document.createElement('span');
    let iconX = document.createElement('i');
    let iconP = document.createElement('i');
    iconX.classList.add('fa-solid', 'fa-trash', 'iconX');
    iconP.classList.add('fa-solid', 'fa-pen', 'iconP');
    span.appendChild(iconP);
    span.appendChild(iconX);    
    li.appendChild(span);

    atualizarContador();
    input_box.value = "";
    saveData();
    }

})
input_box.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        if (input_box.value === "") {
            alert("You must write something!");
            return;
        }

        let li = document.createElement('li');
        li.innerHTML = input_box.value;
        list.appendChild(li);

        let span = document.createElement('span');
        let iconX = document.createElement('i');
        let iconP = document.createElement('i');
        iconX.classList.add('fa-solid', 'fa-trash', 'iconX');
        iconX.setAttribute('title', 'Apagar')
        iconP.classList.add('fa-solid', 'fa-pen', 'iconP');
        iconP.setAttribute('title', 'Editar')
        span.appendChild(iconP);
        span.appendChild(iconX);    
        li.appendChild(span);

        atualizarContador();
        input_box.value = "";
        saveData();
    }
});
// Cheked e o Remove da task
list.addEventListener('click', (event) => {
    if(event.target.tagName === 'LI'){
        event.target.classList.toggle('checked');
        atualizarContador();
        saveData();

    }else if(event.target.classList.contains('fa-trash')) { 
        const li = event.target.closest('li');
        if(confirm("Tem certeza que gostaria de apagar essa task?")){
        li.remove();
        atualizarContador();
        saveData();
        }
    }else if(event.target.classList.contains('fa-pen')){

        const li = event.target.closest('li');
        let textoExtraido = li.firstChild;
        let inputEditar = document.createElement('input');
        inputEditar.setAttribute('maxlength', 35)
        inputEditar.value = textoExtraido.textContent;
        li.replaceChild(inputEditar, textoExtraido )

        inputEditar.addEventListener('keydown', (event) => {
            if(event.key === 'Enter'){
                let novoTexto = inputEditar.value;
                novoTexto = document.createTextNode(novoTexto)
                li.replaceChild(novoTexto, inputEditar)
                saveData();
            }
        })
        inputEditar.addEventListener('blur', () => {
                let novoTexto = inputEditar.value;
                novoTexto = document.createTextNode(novoTexto)
                li.replaceChild(novoTexto, inputEditar)
                saveData();              
        })    
    }
});
//Select - Opt
categorias.addEventListener('change', (event) => {
    let valorSelecionado = event.target.value;
    list.querySelectorAll('li').forEach(li => {
        if(valorSelecionado === 'todos'){
            li.style.display = 'flex';
        }else if(valorSelecionado === 'feito'){
            if(li.classList.contains('checked')){
                li.style.display = 'flex';
            }else{
                li.style.display = 'none';
            }
        }else if( valorSelecionado === 'pendente'){
            if(!li.classList.contains('checked')){
                li.style.display = 'flex';
            }else{
                li.style.display = 'none';
            }
        }
    });
});

//Contadores Task
const atualizarContador = () => {
    let contadorCheked = 0;
    let contadorPendentes = 0;
    list.querySelectorAll('li').forEach( li => {
        if(li.classList.contains('checked')) {
            contadorCheked++;
        }else{
            contadorPendentes++;
        }
    });
    concluidas.innerHTML = `<i class="fa-solid fa-check"></i> Concluídas: ${contadorCheked}`;
    pendentes.innerHTML = `<i class="fa-regular fa-clock"></i> Pendentes: ${contadorPendentes}`;

    if (list.querySelectorAll('li').length > 0) {
        categorias.style.display = 'block';
        concluidas.style.display = 'block';
        pendentes.style.display = 'block';
        btnReset.style.display = 'inline-block';
    } else {
        categorias.style.display = 'none';
        concluidas.style.display = 'none';
        pendentes.style.display = 'none';
        btnReset.style.display = 'none';
    }
};    


// btnReset
btnReset.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja resetar todas as tarefas?')) {
        localStorage.clear();
        list.innerHTML = '';
        atualizarContador();
    }
});


const saveData = () => {
    localStorage.setItem("data", list.innerHTML);
};

const showTask = () => {
    list.innerHTML = localStorage.getItem("data");
}
showTask()
atualizarContador();


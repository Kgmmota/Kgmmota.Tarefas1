let listElement = document.querySelector('#app ul') as HTMLUListElement;
let inputElement = document.querySelector('#app input') as HTMLInputElement;
let buttonElement = document.querySelector('#app button') as HTMLButtonElement;

let categorySelect = document.querySelector('#categoryInput') as HTMLSelectElement;
let filterSelect = document.querySelector('#filterSelect') as HTMLSelectElement;

interface Tarefa {
    texto: string;
    concluida: boolean;
    categoria: string; 
}

let listaSalva: (string | null) = localStorage.getItem("@listagem_tarefas");
let tarefas: Tarefa[] = listaSalva !== null ? JSON.parse(listaSalva) : [];


filterSelect.onchange = () => listarTarefas();

function listarTarefas(){
    listElement.innerHTML = '';
    
    
    const filtroAtual = filterSelect.value;

    tarefas.map((item, posicao) => {
       
        
        if(filtroAtual !== 'todas' && item.categoria !== filtroAtual) {
            return; 
        }

        let todoElement = document.createElement("li");

        
        let categorySpan = document.createElement("span");
        let nomeCategoria = item.categoria || "Geral"; 
        categorySpan.setAttribute("class", `badge ${nomeCategoria}`);
        categorySpan.innerText = nomeCategoria;

        let textSpan = document.createElement("span");
        textSpan.setAttribute("class", "texto-tarefa"); 
        let todoText = document.createTextNode(item.texto);
        textSpan.appendChild(todoText);

        if(item.concluida === true) {
            textSpan.classList.add("concluida"); 
        }

        textSpan.onclick = () => alternarTarefa(posicao);

        // Criar botão excluir
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        
        
        linkElement.onclick = (e) => {
            e.preventDefault();
            deletarTarefa(posicao);
        };

        let linkText = document.createTextNode('Excluir');
        linkElement.appendChild(linkText);


        todoElement.appendChild(categorySpan);
        todoElement.appendChild(textSpan);
        todoElement.appendChild(linkElement);
        
        listElement.appendChild(todoElement);
    })
}

listarTarefas();

function adicionarTarefa(): boolean | void {
    if (inputElement.value === ""){
        alert("Por favor, insira uma tarefa.");
        return false;
    } else {
        
        
        let novaTarefa: Tarefa = {
            texto: inputElement.value,
            concluida: false,
            categoria: categorySelect.value 
        };

        tarefas.push(novaTarefa);

        inputElement.value = "";
        listarTarefas();
        salvarDados();
    }
}

buttonElement.onclick = adicionarTarefa;

function deletarTarefa(posicao: number){
    tarefas.splice(posicao, 1);
    listarTarefas();
    salvarDados();
}

function alternarTarefa(posicao: number) {
    let tarefa = tarefas[posicao];

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        listarTarefas();
        salvarDados();
    }
}

function salvarDados(){
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}
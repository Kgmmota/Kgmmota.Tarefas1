let listElement = document.querySelector('#app ul');
let inputElement = document.querySelector('#app input');
let buttonElement = document.querySelector('#app button');
// Selecionando os novos elementos do HTML
let categorySelect = document.querySelector('#categoryInput');
let filterSelect = document.querySelector('#filterSelect');
let listaSalva = localStorage.getItem("@listagem_tarefas");
let tarefas = listaSalva !== null ? JSON.parse(listaSalva) : [];
// Atualiza a lista sempre que mudar o filtro
filterSelect.onchange = () => listarTarefas();
function listarTarefas() {
    listElement.innerHTML = '';
    // 1. Pega o valor que está no select de filtro
    const filtroAtual = filterSelect.value;
    tarefas.map((item, posicao) => {
        // 2. LÓGICA DE FILTRO: 
        // Se o filtro não for "todas" E a categoria do item for diferente, pula este item.
        if (filtroAtual !== 'todas' && item.categoria !== filtroAtual) {
            return;
        }
        let todoElement = document.createElement("li");
        // 3. CRIAR O BADGE (ETIQUETA) DA CATEGORIA
        let categorySpan = document.createElement("span");
        // Se for uma tarefa antiga sem categoria, usa "Geral"
        let nomeCategoria = item.categoria || "Geral";
        // Adiciona classes CSS: "badge" (fixa) e o nome da categoria (para cor)
        categorySpan.setAttribute("class", `badge ${nomeCategoria}`);
        categorySpan.innerText = nomeCategoria;
        // Criar o texto da tarefa
        let textSpan = document.createElement("span");
        textSpan.setAttribute("class", "texto-tarefa"); // Classe para ajudar no CSS
        let todoText = document.createTextNode(item.texto);
        textSpan.appendChild(todoText);
        if (item.concluida === true) {
            textSpan.classList.add("concluida"); // Melhor usar classList
        }
        textSpan.onclick = () => alternarTarefa(posicao);
        // Criar botão excluir
        let linkElement = document.createElement("a");
        linkElement.setAttribute("href", "#");
        // PreventDefault evita que a tela pule para o topo
        linkElement.onclick = (e) => {
            e.preventDefault();
            deletarTarefa(posicao);
        };
        let linkText = document.createTextNode('Excluir');
        linkElement.appendChild(linkText);
        // 4. ADICIONAR NA ORDEM CORRETA: Badge -> Texto -> Botão
        todoElement.appendChild(categorySpan);
        todoElement.appendChild(textSpan);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);
    });
}
listarTarefas();
function adicionarTarefa() {
    if (inputElement.value === "") {
        alert("Por favor, insira uma tarefa.");
        return false;
    }
    else {
        // 5. SALVAR A CATEGORIA SELECIONADA
        let novaTarefa = {
            texto: inputElement.value,
            concluida: false,
            categoria: categorySelect.value // Pega o valor do select ao lado do input
        };
        tarefas.push(novaTarefa);
        inputElement.value = "";
        listarTarefas();
        salvarDados();
    }
}
buttonElement.onclick = adicionarTarefa;
function deletarTarefa(posicao) {
    tarefas.splice(posicao, 1);
    listarTarefas();
    salvarDados();
}
function alternarTarefa(posicao) {
    let tarefa = tarefas[posicao];
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        listarTarefas();
        salvarDados();
    }
}
function salvarDados() {
    localStorage.setItem("@listagem_tarefas", JSON.stringify(tarefas));
}


const form = document.querySelector("[data-novo-item]");
const lista = document.querySelector("[data-lista]");

//  se o localStorage tiver vazio cria um array vazio, se não pega os elementos e poe no forEach 
//  e povoa o array, criando os elementos a lista
const itens= JSON.parse(localStorage.getItem("itens")) || [];
console.log(itens);

itens.forEach((elemento) => {
    criaElemento(elemento);
});

form.addEventListener(('submit'), (evento)=>{
    evento.preventDefault();

    //console.log(evento);
    //no log do evento é possível buscar o target(alvo) em diversas propriedades a escolhida foi 'target.elements'
    const nome = evento.target.elements.nome;
    const quantidade = evento.target.elements.quantidade;
    
    // find(), busca no array itens o elemento .nome
    const existe = itens.find(elemento => elemento.nome === nome.value);
    console.log(existe);
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
    }

    if (existe){
        // se o elemento foi encontrado, o id atual vai receber o id que já existe
        itemAtual.id = existe.id
        console.log("esse item já exite na posição: " + existe.id);

        atualizaElemento(itemAtual);

        //o array itens recebe na posição do id antigo os valores do item atual
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;

    }else{
        // operador ternário: ? condição um : else --- if itens[itens.length - 1] não existir o itemAtual.id vai ser 0,
        //if existir o itemAtual vai ter o id do ultimo elemento do array itens + 1 . 
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id+1 : 0;

        criaElemento(itemAtual);
        itens.push(itemAtual);
    }
    

    // método strigify do JSON para transformar o objeto em uma string
    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";
}) 

function criaElemento(item){

    //<li class="item"><strong>3</strong>Casaco</li>
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;


    novoItem.appendChild(numeroItem);
    novoItem.innerHTML = novoItem.innerHTML + item.nome;
    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem)
}

function botaoDeleta(elemento_id){
    const button = document.createElement('button');
    button.innerHTML = "x";

    button.addEventListener(('click'), (evento)=>{
        const alvo = evento.target.parentElement;
        console.log()
        deletaElemento(alvo, elemento_id);
    });

    return button;
}

function deletaElemento(alvo, elemento_id){
    alvo.remove();

    // remover item do array - splice remove o item splice('o que queremos remover', 1)
    itens.splice(itens.findIndex(elemento => elemento.id === elemento_id),1);

    //escrever no localstorage
    localStorage.setItem("itens", JSON.stringify(itens));
}                                                                           

function atualizaElemento(item){
    // a função recebe o itemAtual e busca a tag strong que tem o data Attributes que tem o valor do id
    const strong = document.querySelector("[data-id='"+item.id+"']");
    console.log(strong)
    strong.textContent = item.quantidade;
}

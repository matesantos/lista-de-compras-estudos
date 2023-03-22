let listaDeItens = []
const form = document.querySelector("#form-itens");
const itensInput = document.querySelector("#receber-item");
const ulsItens = document.querySelector("#lista-de-itens");

form.addEventListener('submit', evt => {
  evt.preventDefault();
  salvarItens();
  addItem();
})

const salvarItens = () => {
  const comprasItem = itensInput.value;
  const checarDuplicado = (listaDeItens.some(item => item.valor.toUpperCase() === comprasItem.toUpperCase()));
  if (!checarDuplicado) {
    listaDeItens = [...listaDeItens, {
      valor: comprasItem
    }]
  }
  else {
    alert('Item já adicionado.')
  }
}

const addItem = () => {
  const liItem = listaDeItens.reduce((accumulator, currentyValue, index) => {
    currentyValue = `
    <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
      <div>
        <input type="checkbox" checked class="is-clickable" />  
        <span class="is-size-5">${currentyValue.valor}</span>
      </div>
      <div>
        <i class="fa-solid fa-trash is-clickable deletar"></i>
      </div>
    </li>
    `
    return accumulator += currentyValue;
  }, '')
  ulsItens.innerHTML = liItem;
}


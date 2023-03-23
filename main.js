let listaDeItens = []
const form = document.querySelector("#form-itens");
const itensInput = document.querySelector("#receber-item");
const ulsItens = document.querySelector("#lista-de-itens");
const ulsItensComprados = document.querySelector("#itens-comprados");


form.addEventListener('submit', evt => {
  evt.preventDefault();
  salvarItens();
  addItem();
  itensInput.focus();
})

const salvarItens = () => {
  const comprasItem = itensInput.value;
  const checarDuplicado = (listaDeItens.some(item => item.valor.toUpperCase() === comprasItem.toUpperCase()));
  if (!checarDuplicado) {
    listaDeItens = [...listaDeItens, {
      valor: comprasItem,
      checar: false
    }]
  }
  else {
    alert('Item já adicionado.')
  }
  itensInput.value = '';
}

const addItem = () => {
  ulsItens.innerHTML = '';
  ulsItensComprados.innerHTML = '';
  listaDeItens.forEach((element, index) => {
    if(element.checar){
      ulsItensComprados.innerHTML +=`<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
          <input type="checkbox" checked class="is-clickable" />  
          <span class="itens-comprados is-size-5">${element.valor}</span>
        </div>
        <div>
          <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
      </li>`
    }else{

      ulsItens.innerHTML += `
        <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
          <div>
            <input type="checkbox" class="is-clickable" />  
            <span class="is-size-5">${element.valor}</span>
          </div>
          <div>
            <i class="fa-solid fa-trash is-clickable deletar"></i>
          </div>
        </li>
      `
      }
    })

  const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

  inputsCheck.forEach(input => {
    input.addEventListener('click', evt =>{
      const valorDoElemento = evt.target.parentElement.parentElement.getAttribute('data-value');
      listaDeItens[valorDoElemento].checar = evt.target.checked;
      addItem(); 
    })
  })
}


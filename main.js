let listaDeItens = [];
let itemAEditar;
const form = document.querySelector("#form-itens");
const itensInput = document.querySelector("#receber-item");
const ulsItens = document.querySelector("#lista-de-itens");
const ulsItensComprados = document.querySelector("#itens-comprados");
const listaRecuperada = localStorage.getItem('listaDeItens')

const atualizaLocalStorage = () => {
  localStorage.setItem('listaDeItens', JSON.stringify(listaDeItens))
}

if(listaRecuperada) {
  listaDeItens = JSON.parse(listaRecuperada);
  addItem();
}else {
  listaDeItens = [];
}

form.addEventListener('submit', evt => {
  evt.preventDefault();
  salvarItens();
  addItem();
  itensInput.focus();
  
});

function salvarItens () {
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

function addItem () {
  ulsItens.innerHTML = '';
  ulsItensComprados.innerHTML = '';
  listaDeItens.forEach((element, index) => {

    if (element.checar) {
      ulsItensComprados.innerHTML += `
      <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
          <input type="checkbox" checked class="is-clickable" />  
          <span class="itens-comprados is-size-5">${element.valor}</span>
        </div>
        <div>
          <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
      </li>`
    } else {

    ulsItens.innerHTML += `
      <li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
        <div>
          <input type="checkbox" class="is-clickable" />  
          <input type="text" class="is-size-5" value="${element.valor}" ${index !== Number(itemAEditar) ? 'disabled' : ''}></input>
        </div>
        <div>
          ${ 
            index === Number(itemAEditar) 
            ? 
            `<button onClick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>` 
            : 
            `<i class="fa-regular is-clickable fa-pen-to-square editar"></i>`
          }
          <i class="fa-solid fa-trash is-clickable deletar"></i>
        </div>
      </li>
    `
    }
  })

  const inputsCheck = document.querySelectorAll('input[type="checkbox"]')

  inputsCheck.forEach(input => {
    input.addEventListener('click', evt => {
      const valorDoElemento = evt.target.parentElement.parentElement.getAttribute('data-value');
      listaDeItens[valorDoElemento].checar = evt.target.checked;
      addItem();
    })
  })

  deleteItem();
  editItens();
  atualizaLocalStorage();
}

function deleteItem() {
  const deletarObject = document.querySelectorAll('.deletar');
  deletarObject.forEach(icone => {
    icone.addEventListener('click', evt => {
      const valorDoElemento = evt.target.parentElement.parentElement.getAttribute('data-value');
      console.log("olá", valorDoElemento);
      listaDeItens.splice(valorDoElemento, 1);
      addItem();
    })
  })
}

function editItens () {
const editarItens = document.querySelectorAll('.editar');
  editarItens.forEach(icone => {
    icone.addEventListener('click', evt => {
      itemAEditar = evt.target.parentElement.parentElement.getAttribute('data-value');
      addItem();
    })
  })
}

function salvarEdicao () {
  const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`);
  listaDeItens[itemAEditar].valor = itemEditado.value;
  itemAEditar = -1;
  addItem();
}

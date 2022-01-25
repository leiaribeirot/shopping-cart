const totalElement = document.querySelector('.total-price');
const cartContainer = document.querySelector('.cart__items');
const itemsElement = document.querySelector('.items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}
function refreshTotalPrice() { 
  let allPrices = Array.from(document.querySelectorAll('.price')); 
  allPrices = allPrices.map((el) => parseFloat(el.innerText));  
  const totalPrice = allPrices.reduce((sum, el) => sum + el, 0); 
  totalElement.innerText = `${totalPrice}`;
}
// function getSkuFromProductItem(item) {
//  return item.querySelector('span.item__sku').innerText;
// }
const clickRemoveitem = ({ target }) => {
  if (target.className === 'cart__item') {
    target.remove(); 
  }
};

 function cartItemClickListener() {
  cartContainer.addEventListener('click', clickRemoveitem);
  refreshTotalPrice(); 
  saveCartItems(cartContainer.innerHTML);
}
  //
  function createCartItemElement({ sku, name, salePrice }) { 
    const li = document.createElement('li');
    const span = document.createElement('span'); 
    li.className = 'cart__item';
    li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
    li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $`;
    span.className = 'price'; 
    span.innerText = `${salePrice}`; 
    li.appendChild(span);
    li.addEventListener('click', cartItemClickListener);
    return li;
}

// Função Mostrar Itens
const mostrarItens = async () => {
  const { results } = await fetchProducts('computer'); // result from async fetch
  const itemsContainer = document.querySelector('.items'); // where item should be
  // use forEach
  results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const sectionProduct = createProductItemElement({ sku, name, image });
    itemsContainer.appendChild(sectionProduct);
  });
};

const createCartItem = async () => {
  document.querySelector('.items').addEventListener('click', async (event) => {
    itemsElement.appendChild(createCustomElement('h3', 'loading', 'carregando...'));  
    const et = event.target;
      if (et.innerText === 'Adicionar ao carrinho!') {
        // if that text is clicked then
        const buttonID = et.parentNode.firstChild.textContent;
        const { id: sku, title: name, price: salePrice } = await fetchItem(buttonID);
        const loadingElement = document.querySelector('.loading');
        loadingElement.remove();
        const cart = document.querySelector('.cart__items');
        cart.appendChild(createCartItemElement({ sku, name, salePrice }));
        refreshTotalPrice();
        saveCartItems(cartContainer.innerHTML);
      }
  });
};

function showlocalStorage() {
  const cartItems = getSavedCartItems();
    cartContainer.innerHTML = cartItems;
    Array.from(cartContainer.children).forEach((result) => {
      result.addEventListener('click', cartItemClickListener);
    });
}

const trashCartItem = () => {
  const buttonEmptyCart = document.querySelector('.empty-cart');
  buttonEmptyCart.addEventListener('click', () => {
    cartContainer.innerHTML = '';
    saveCartItems('');
    refreshTotalPrice();
  });
};

window.onload = () => { 
  mostrarItens();
  createCartItem();
  showlocalStorage();
  trashCartItem();
  refreshTotalPrice();
};

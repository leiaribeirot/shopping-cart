const cartContainer = document.querySelector('.cart__items');

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
}
  //
 function createCartItemElement({ sku, name, salePrice }) {
   const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
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
  // select .item class using addEventListener on click with async
  document.querySelector('.items').addEventListener('click', async (event) => {
      const et = event.target;// storing result in variable
      if (et.innerText === 'Adicionar ao carrinho!') {
        // if that text is clicked then
        const buttonID = et.parentNode.firstChild.textContent;// where shouldbe the new childs
        const { id: sku, title: name, price: salePrice } = await fetchItem(buttonID);// our primise await for this resuts
        const cart = document.querySelector('.cart__items');// where should put the car items
        cart.appendChild(createCartItemElement({ sku, name, salePrice })); // apendChild using creatEelent With destructuing from await
        saveCartItems(cartContainer.innerHTML);
      }
  });
};

window.onload = () => { 
  mostrarItens();
  createCartItem();
};

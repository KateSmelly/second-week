"use strict";

let productsJSON = `[ 
{
"name": "Варенье",
"id": "raspberryJam",
"price": "$5"
},

{
"name": "Клюква",
"id": "cranberry",
"price": "$20"
},

{
"name": "Молоко",
"id": "milk",
"price": "$2"
},

{
"name": "Грибы",
"id": "mushrooms",
"price": "$50"
},

{
"name": "Сыр",
"id": "cheese",
"price": "$4"
}
]`;

let products = JSON.parse(productsJSON);
let main = document.querySelector("main");
let div = document.createElement("div");
main.append(div);
div.classList.add("container");
div.id = "wall";
updateCartCount();

for (let product of products) {
  let elem = document.createElement("div");
  div.append(elem);

  elem.classList.add("blocks");
  let img = document.createElement("img");
  elem.prepend(img);
  img.src = `./img/${product.id}.svg`;
  img.classList.add("imgStyle");
  let h3 = document.createElement("h3");
  elem.append(h3);
  h3.textContent = product.name;
  let p = document.createElement("p");
  elem.append(p);
  p.textContent = product.price;

  let button = document.createElement("button");
  elem.append(button);
  button.classList.add("btnS");
  button.textContent = "Купить";
  button.onclick = () => addToCart(product);
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (cart[product.id]) {
    cart[product.id].amount += 1;
  } else {
    cart[product.id] = { ...product, amount: 1 };
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  let itemCount = 0;
  for (const key in cart) {
    if (cart.hasOwnProperty(key)) {
      itemCount += cart[key].amount;
    }
  }
  document.querySelectorAll("a")[1].textContent = `🛒Cart ${itemCount}`;
}

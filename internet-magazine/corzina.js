"use strict";

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

updateCartCount();

const cart = JSON.parse(localStorage.getItem("cart")) || {};

let productCart = document.querySelector(".products");

for (let prod in cart) {
  let element = document.createElement("div");
  productCart.append(element);
  element.classList.add("block");
  let img = document.createElement("img");
  element.prepend(img);
  img.src = `./img/${cart[prod].id}.svg`;
  img.classList.add("image");
  let h4 = document.createElement("h4");
  element.append(h4);
  h4.textContent = cart[prod].name;
  let pPrice = document.createElement("p");
  element.append(pPrice);
  pPrice.textContent = cart[prod].price;
  let pQuantity = document.createElement("p");
  element.append(pQuantity);
  pQuantity.innerHTML = cart[prod].amount;
  let pTotal = document.createElement("p");
  element.append(pTotal);
  pTotal.textContent = `$${cart[prod].price * cart[prod].amount}`;
}

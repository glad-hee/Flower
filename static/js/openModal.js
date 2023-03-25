const product = [
  {
    name: "해바라기",
    img: "/static/src/해바라기.jpg",
    priceView: "₩25,000",
    price: 25000,
  },
  {
    name: "봄 스폐셜",
    img: "/static/src/봄스폐셜.jpg",
    priceView: "₩34,000",
    price: 34000,
  },
  {
    name: "노랑 튤립",
    img: "/static/src/튤립.jpg",
    priceView: "₩24,000",
    price: 24000,
  },
  {
    name: "설유화",
    img: "/static/src/설유화.jpg",
    priceView: "₩24,000",
    price: 24000,
  },
  {
    name: "리시안서스",
    img: "/static/src/수국리시안셔스장미.jpg",
    priceView: "₩29,000",
    price: 29000,
  },
  {
    name: "만천홍",
    img: "/static/src/만천홍.jpg",
    priceView: "₩21,000",
    price: 21000,
  },
  {
    name: "호접란",
    img: "/static/src/호접란.jpg",
    priceView: "₩20,000",
    price: 20000,
  },
  {
    name: "호접란(화이트)",
    img: "/static/src/호접란(화이트).jpg",
    priceView: "₩22,000",
    price: 22000,
  },
  {
    name: "호접란(삼색조)",
    img: "/static/src/호접란(삼색조).jpg",
    priceView: "₩23,000",
    price: 23000,
  },
];

const cart = {
  items: [],
  total: 0,
  quantity: 0,
};

function openModal(index) {
  console.log(product, index);
  document.getElementById("modal").style.display = "block";
  document.getElementById("body").style.opacity = "0.5";

  document.getElementById("modal-image").src = product[index].img;
  document.getElementById("modal-image").alt = product[index].name;
  document.querySelector("h3").innerHTML = product[index].name;
  document.getElementById("product-price").innerHTML = product[index].priceView;

  // addToCart에 알맞은 객체 찾기
  document.getElementById("purchase").onclick = function () {
    addToCart(index);
    closeModal();
  };
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("body").style.opacity = "1";
}

function addToCart(index) {
  const selectedProduct = product[index];
  const cartItem = cart.items.find(
    (item) => item.name === selectedProduct.name
  );

  if (cartItem) {
    cartItem.quantity++;
    cartItem.totalPrice = cartItem.quantity * selectedProduct.price;
  } else {
    cart.items.push({
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: 1,
      totalPrice: selectedProduct.price,
    });
    console.log(cart);
  }

  cart.total += selectedProduct.price;
  cart.quantity++;

  const cartItemsElement = document.querySelector(".cart-items");
  cartItemsElement.innerHTML = "";

  cart.items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - Quantity: ${item.quantity} - Price: ₩${item.totalPrice}`;

    const plusButton = document.createElement("button");
    plusButton.innerText = "+";
    plusButton.id = "plusButton";
    // plusButton.style.marginRight = "10px";
    // plusButton.style.marginLeft = "10px";
    plusButton.addEventListener("click", () => {
      plusQuantity(item);
      updateCart();
    });
    li.appendChild(plusButton);

    const minusButton = document.createElement("button");
    minusButton.innerText = "-";
    minusButton.id = "minusButton";
    minusButton.addEventListener("click", () => {
      minusQuantity(item);
      updateCart();
    });
    li.appendChild(minusButton);

    cartItemsElement.appendChild(li);
  });

  document.querySelector(
    ".cart-total"
  ).innerHTML = `<br />Total - Quantity: ${cart.quantity} - Price: ₩${cart.total}`;

  console.log(cart);
}

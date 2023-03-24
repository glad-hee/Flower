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
function modal() {
  const { body } = document;
  const frag = document.createDocumentFragment();

  // 모달 컨테이너
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
  modalContainer.id = "couponModal";
  modalContainer.style.display = "none";
  // 모달 헤더
  const mHeader = document.createElement("div");
  mHeader.classList.add("m-header");
  // 모달 헤더 - h3 태그
  const mSubtitle = document.createElement("h1");
  mSubtitle.classList.add("m-title");
  mSubtitle.textContent = "제품 교환권 / 모바일 쿠폰 / 바코드";
  // 모달 헤더 - h1 태그
  const mTitle = document.createElement("h3");
  mTitle.classList.add("m-subtitle");
  mTitle.textContent = "* 쿠폰번호를 하단의 버튼을 눌러 입력해 주세요.";
  mHeader.append(mSubtitle, mTitle);
  // 메인
  const mMain = document.createElement("div");
  mMain.classList.add("m-main");
  // 메인 - 이미지
  const mImg = document.createElement("div");
  mImg.classList.add("m-img");
  const img = document.createElement("img");
  img.setAttribute("src", "http://place-hold.it/300x400");
  img.setAttribute("alt", "쿠폰 입력 가이드 사진");
  img.id = "img";
  mImg.append(img);
  // 메인 - 설명
  const mDesc = document.createElement("div");
  mDesc.classList.add("m-desc");
  mDesc.innerHTML = "* 8자리 혹은 12자리의 쿠폰번호를 입력해 주세요.";
  const mCN = document.createElement("input");
  mCN.classList.add("m-coupon-number");
  mCN.setAttribute("maxlength", "8");
  mCN.setAttribute("type", "text");
  mCN.setAttribute("readonly", "");
  // mCN.innerHTML='&nbsp';
  //메인 - 넘버패드
  const mNumpad = document.createElement("div");
  mNumpad.classList.add("m-numpad");
  const clear = document.createElement("button");
  clear.textContent = "Clear";
  clear.id = "clear";
  mNumpad.append(clear);
  // 메인 - 넘바패드 - 버튼 들
  for (let i = 0; i < 10; i++) {
    const num = document.createElement("button");
    num.textContent = `${i}`;
    num.id = `number-${i}`;
    num.classList.add("numbers");
    mNumpad.append(num);
  }
  mMain.append(mImg, mDesc, mCN, mNumpad);
  // 취소/입력
  const mBtnWrap = document.createElement("div");
  mBtnWrap.classList.add("m-btn-wrap");

  const mBtn = document.createElement("div");
  mBtn.classList.add("m-btn");
  const cancel = document.createElement("button");
  cancel.id = "cancel";
  cancel.textContent = "Cancel";
  mBtn.append(cancel);

  const mCloseBtn = document.createElement("div");
  mCloseBtn.classList.add("m-close-btn");
  const enter = document.createElement("button");
  enter.id = "enter";
  enter.textContent = "Enter";
  mCloseBtn.append(enter);

  mBtnWrap.append(mBtn, mCloseBtn);

  modalContainer.append(mHeader, mMain, mBtnWrap);
  frag.append(modalContainer);

  const body1 = document.body;
  body1.append(frag);
}

const cart = {
  items: [],
  total: 0,
  quantity: 0,
};

modal();
const mCn = document.querySelector(".m-coupon-number");
const n0 = document.querySelector("#number-0");
let couponNumber = 0;

const numbers = document.querySelectorAll(".numbers");
const clearBtn = document.querySelector("#clear");
numbers.forEach((v, i) => {
  v.addEventListener("click", function () {
    if (mCn.value.length > 12) {
      mCn.value.substring(0, 11);
    } else {
      // 화면상의 쿠폰번호 출력
      mCn.value += this.textContent;
      // 데이터상의 쿠폰번호 이동
      couponNumber = mCn.value;
    }
    console.log(mCn.value.length);
  });
});

clearBtn.addEventListener("click", function () {
  mCn.value = "";
  couponNumber = "";
});

// 선택한 꽃에 따라 알맞는 모달창 띄우기
function openModal($) {
  console.log(product, $);
  document.getElementById("modal").style.display = "block";
  document.getElementById("body").style.opacity = "0.5";

  document.getElementById("modal-image").src = product[$].img;
  document.getElementById("modal-image").alt = product[$].name;
  document.querySelector("h3").innerHTML = product[$].name;
  document.getElementById("product-price").innerHTML = product[$].priceView;

  document.getElementById("purchase").onclick = function () {
    addToCart($);
    closeModal();
  };
}

// 닫기누르면 모달창 꺼짐
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("body").style.opacity = "1";
}

// 모달 바깥누르면 꺼지게
const closeM = document.getElementById("modal");
const cancelModal2 = document.getElementById("couponModal");

window.onclick = function (event) {
  if (event.target == closeM) {
    closeModal();
  } else if (event.target == cancelModal2) {
    cancelModal2.style.display = "none";
    mCn.value = "";
    couponNumber = "";
  }
};

// 꽃에 맞는 정보 cart에 삽입
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

function updateCart() {
  const cartItemsElement = document.querySelector(".cart-items");
  cartItemsElement.innerHTML = "";

  cart.items.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - Quantity: ${item.quantity} - Price: ₩${item.totalPrice}`;

    const plusButton = document.createElement("button");
    plusButton.innerText = "+";
    plusButton.id = "plusButton";
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
}

function plusQuantity(item) {
  item.quantity++;
  item.totalPrice = item.quantity * item.price;
  cart.total += item.price;
  cart.quantity++;
}

function minusQuantity(item) {
  if (item.quantity > 1) {
    item.quantity--;
    item.totalPrice = item.quantity * item.price;
    cart.total -= item.price;
    cart.quantity--;
  } else if (item.quantity === 1) {
    const index = cart.items.findIndex(
      (cartItem) => cartItem.name === item.name
    );
    cart.total -= item.price;
    cart.quantity--;
    cart.items.splice(index, 1);
  }
}

//여기서부터
const resetBtn = document.querySelector("#reset");
const couponBtn = document.querySelector("#coupon");
const modalContainer = document.querySelector("#couponModal");

resetBtn.addEventListener("click", function () {
  //   구매내역의 정보 innerthtml ='';
  // 데이터 값 = 0;
});
//여기까지 이거 왜있는지 모름

function openCouponModal() {
  console.log("test");
  modalContainer.style.display = "flex";
  modalContainer.classList.add = "on";
}

// 쿠폰창에서 cancel 누르면 모달 꺼짐
const cancelModal = document.querySelector("#cancel");
cancelModal.addEventListener("click", function () {
  document.getElementById("couponModal").style.display = "none";
  mCn.value = "";
  couponNumber = "";
});

// 쿠폰창 밖 누르면 꺼지게
// const cancelModal2 = document.getElementById("couponModal");

// window.onclick = function (event) {
//   if (event.target == cancelModal2) {
//     cancelModal2.style.display = "none";
//     mCn.value = "";
//     couponNumber = "";
//   }
// };

// 쿠폰창에서 enter event
const enter = document.getElementById("enter");
enter.addEventListener("click", function () {
  mCn.value = "";
  couponNumber = "";
  alert("쿠폰 번호를 다시 확인해주세요");
});

//카트리셋시키기
function resetCart() {
  cart.items = [];
  cart.quantity = 0;
  cart.total = 0;

  const cartItemsElement = document.querySelector(".cart-items");
  cartItemsElement.innerHTML = "";
  document.querySelector(".cart-total").innerHTML = "";
}

// function filterItem(filter) {
//   let items = document.querySelectorAll(".bb-main-item");

//   items.forEach((item) => {
//     if (filter === "all") {
//       item.classList.remove("hidden");
//     } else {
//       if (item.classList.contains(filter)) {
//         item.classList.remove("hidden");
//       } else {
//         item.classList.add("hidden");
//       }
//     }
//   });

//   items.forEach((item) => {
//     if (filter == "best") {
//       item.classList.remove("hidden");
//     } else {
//       if (item.classList.contains("hidden")) {
//         item.classList.remove("hidden");
//       } else {
//         item.classList.add("hidden");
//       }
//     }
//   });
// }

function filterItem(className) {
  const items = document.getElementsByClassName("bb-main-item");

  // '전체보기' 버튼 클릭 시 모든 아이템 표시
  if (className === "all") {
    for (let i = 0; i < items.length; i++) {
      items[i].style.display = "block";
    }
    return;
  }

  // 선택한 클래스에 해당하는 아이템 표시, 나머지는 숨김
  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains(className)) {
      items[i].style.display = "block";
    } else {
      items[i].style.display = "none";
    }
  }
}

// 검색기능
function searchItems() {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value.toLowerCase();

  const items = document.getElementsByClassName("bb-main-item");
  for (let i = 0; i < items.length; i++) {
    const title = items[i].getElementsByClassName("bb-item-title")[0];
    if (title.innerHTML.toLowerCase().includes(searchText)) {
      items[i].style.display = "";
    } else {
      items[i].style.display = "none";
    }
  }
}

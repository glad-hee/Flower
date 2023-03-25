// import { cart } from "./index.js";
// const cart = require("./index.js");

// 아이템 갯수마다 열 생성 하는 함수
function makingRow(v, i) {
  // list 클래스를 가진 div 태그 생성
  const list = document.createElement("div");
  // list 클래스 부여
  list.classList.add("list");
  list.classList.add(`flower-id-${1}`); // test3.js 객체의 고유 id 값

  // delete 클래스를 가진 button 태그 생성
  const deleteb = document.createElement("button");
  deleteb.classList.add("delete-btn");
  //delete 버튼의 X
  deleteb.textContent = "X";

  // 상품명 생성
  const fName = document.createElement("p");
  //상품명의 클래스 부여
  fName.classList.add("flower-name");
  // 상품명의 아이디 인덱스 부여
  fName.id = "name-" + i;

  const fprice = document.createElement("p");
  fprice.classList.add("flower-price");
  fprice.id = "price-" + i;

  const minusb = document.createElement("button");
  minusb.classList.add("minus-btn");
  minusb.textContent = "-";

  const fnum = document.createElement("p");
  fnum.classList.add("flower-num");
  fnum.id = "num-" + i;

  const plusb = document.createElement("button");
  plusb.classList.add("plus-btn");
  plusb.textContent = "+";

  // 생성한 태그들 list 의 넣기
  list.append(deleteb, fName, fprice, minusb, fnum, plusb);
  //  생성한 list body에 넣기
  document.body.append(list);
}

// 장바구니의 품목갯수마다 열 생성 및 열 마다 데이터값 출력
cart.items.forEach((v, i) => {
  // 아이템 갯수마다 열 생성하는 함수 호출
  makingRow(v, i);
  // 인덱스 개수마다 알맞는 아이디 선택
  const fName = document.querySelector(`#name-${i}`);
  // 해당아이디의 상품명 가져오기
  fName.textContent = cart.items[i].name;

  // 가격 생성
  const fprice = document.querySelector(`#price-${i}`);
  fprice.textContent = cart.items[i].price * cart.items[i].quantity;
  // 수량 생성
  const fnum = document.querySelector(`#num-${i}`);
  fnum.textContent = cart.items[i].quantity;
});

// 엑스를 누르면 div가 없어지는
const deleteBtns = document.querySelectorAll(".delete-btn");

deleteBtns.forEach((button) => {
  button.addEventListener("click", () => {
    // confirm 대화 상자 띄우기
    const confirmed = confirm("정말로 삭제하시겠습니까?");

    // 삭제하기를 누르면 삭제가 됨
    if (confirmed) {
      button.parentElement.remove();
    }
  });
});

// 총 금액, 총 수량 구하기
const lists = document.querySelectorAll(".list");
const div = document.createElement("div");
const div2 = document.createElement("div"); // total div
// total div
let sum = 0;
let sum2 = 0;

// 총 금액부분
const price = document.querySelectorAll(".flower-price");
price.forEach((value, i) => {
  sum += Number(value.textContent);
  // console.log(sum)
  div.textContent = `총 금액: ${sum.toLocaleString()}원`;
});
div.classList.add("total-price");

document.body.append(div);

// 총 수량 부분
const nums = document.querySelectorAll(".flower-num");
nums.forEach((value, i) => {
  sum2 += Number(value.textContent);
});
div2.textContent = `총 수량: ${sum2.toLocaleString()}개`;
div2.classList.add("total-nums");

document.body.append(div2);

//플러스 수량
// 플러스버튼에 수량 추가하는 코드
const plusBtns = document.querySelectorAll(".plus-btn");

plusBtns.forEach((button, i) => {
  button.addEventListener("click", () => {
    //list(부모 엘리먼트)에서 수량이랑 가격 선택(불러온다? 느낌)
    const nums = button.parentElement.querySelector(".flower-num");
    const prices = button.parentElement.querySelector(".flower-price");

    //수량이랑 가격 불러옴
    const quantity = parseInt(nums.textContent);
    const price = parseInt(prices.textContent);

    // 수량 1씩 증가
    const newQuantity = quantity + 1;
    // 수량 오르는 만큼 가격도 올라가게
    const newPrice = (price / quantity) * newQuantity;

    // 올라간 거 실시간반영
    nums.textContent = newQuantity;
    prices.textContent = newPrice;
    ++sum2;
    sum += parseInt(price / quantity);
    const totalNums = document.querySelector(".total-nums");
    totalNums.textContent = `총 수량: ${sum2.toLocaleString()}개`;

    const totalPrice = document.querySelector(".total-price");
    console.log(totalPrice, sum);
    totalPrice.textContent = `총 금액: ${sum.toLocaleString()}원`;
  });
});

//  마이너스 수량
// 마이너스버튼에 수량 추가하는 코드
const minusBtns = document.querySelectorAll(".minus-btn");
minusBtns.forEach((button) => {
  button.addEventListener("click", () => {
    //list(부모 엘리먼트)에서 수량이랑 가격 선택(불러온다? 느낌)
    const nums = button.parentElement.querySelector(".flower-num");
    const prices = button.parentElement.querySelector(".flower-price");

    //수량이랑 가격 불러옴
    let quantity = parseInt(nums.textContent);
    let price = parseInt(prices.textContent);

    // 0이면. 감소하지않음
    if (quantity === 0) {
      return;
    }

    // 수량 1씩 감소
    const newQuantity = quantity - 1;

    // 수량 오르는 만큼 가격도 내려가게
    const newPrice = (price / quantity) * newQuantity;

    // 내려간 거 실시간반영
    nums.textContent = newQuantity;
    prices.textContent = newPrice;

    sum2--;
    sum -= parseInt(price / quantity);

    const totalNums = document.querySelector(".total-nums");
    totalNums.textContent = `총 수량: ${sum2.toLocaleString()}개`;
    const totalPrice = document.querySelector(".total-price");
    totalPrice.textContent = `총 금액: ${sum.toLocaleString()}원`;
  });
});

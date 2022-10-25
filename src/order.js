import dataImgs from './database/ngoiNhaCafe.json' assert { type: 'json' };
// import dataUsers from './database/user.json' assert { type: 'json' };

// let tempArr = [
//     {
//         title: 'Cà Phê Sữa Đá',
//         description:
//             'Cà phê Đắk Lắk nguyên chất được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.',
//         image: 'public/img/ngoiNhaCafe/CPhSa.jpg',
//         id: 1,
//         price: 29000,
//         tag: 'Cà Phê Việt Nam',
//         currency: 'đ',
//         salePercent: '20%',
//         priceTotal: 34800,
//     },
//     {
//         title: 'Cà Phê Sữa Nóng',
//         description:
//             'Cà phê được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.',
//         image: 'public/img/ngoiNhaCafe/CPhSaNng.jpg',
//         id: 2,
//         price: 35000,
//         tag: 'Cà Phê Việt Nam',
//         currency: 'đ',
//         salePercent: '20%',
//         priceTotal: 42000,
//     },
//     {
//         title: 'Bạc Sỉu',
//         description:
//             'Bạc sỉu chính là "Ly sữa trắng kèm một chút cà phê". Thức uống này rất phù hợp những ai vừa muốn trải nghiệm chút vị đắng của cà phê vừa muốn thưởng thức vị ngọt béo ngậy từ sữa.',
//         image: 'public/img/ngoiNhaCafe/BcSu.jpg',
//         id: 3,
//         price: 29000,
//         tag: 'Cà Phê Việt Nam',
//         currency: 'đ',
//         salePercent: '20%',
//         priceTotal: 34800,
//     },
// ];

// let html = `<tr>
// <th></th>
// <th>sản phẩm</th>
// <th>giá</th>
// <th>số lượng</th>
// <th>Tổng</th>
// <th></th>
// </tr>`;
// tempArr.forEach((elem) => {
//     html += `<tr>
//     <td>
//         <img src="${elem.image}" alt="" />
//     </td>
//     <td>
//         <div class="">${elem.title}</div>
//     </td>
//     <td>${elem.price}${elem.currency}</td>
//     <td>
//         <button>+</button>
//         <input disabled type="text" value="1" />
//         <button>-</button>
//     </td>
//     <td>fdsfsdfsdfsdfsdfs</td>
//     <td>
//         <button>x</button>
//     </td>
// </tr>`;
// });

// cartTable.innerHTML = html;

// viết phần js thêm/ giảm món hàng
//phần để cho trang HTML chạy trước rồi sau đó JS mới chạy
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    updateTotalPrices();
    var removeCartItemBtns = document.getElementsByClassName('deleted-btn');
    for (let index = 0; index < removeCartItemBtns.length; index++) {
        var btn = removeCartItemBtns[index];
        btn.addEventListener('click', (e) => {
            var btnClicked = e.target;
            btnClicked.parentElement.parentElement.remove();
            updateTotalPrices();
        });
    }
    quantity();

    //hàm click mua hàng
    document
        .getElementsByClassName('btn-all-deleted')[0]
        .addEventListener('click', purchasedCLicked2);
    //hàm xóa tất cả đơn hàng
    document
        .getElementsByClassName('btn-purchased')[0]
        .addEventListener('click', purchasedCLicked1);
}
//viết hàm click mua hàng(xóa hết items trong cart và cập nhật lại giá) có thông báo
function purchasedCLicked1() {
    alert('Cảm ơn vì đã mua hàng của chúng tôi');
    var cartList = document.getElementsByClassName('cart-table')[0].children[0];
    console.log(cartList);
    while (!(cartList.childElementCount == 1)) {
        cartList.removeChild(cartList.lastChild);
    }
    updateTotalPrices();
}

//viết hàm click xóa all(xóa hết items trong cart và cập nhật lại giá)
function purchasedCLicked2() {
    var cartList = document.getElementsByClassName('cart-table')[0].children[0];
    console.log(cartList);
    while (!(cartList.childElementCount == 1)) {
        cartList.removeChild(cartList.lastChild);
    }
    updateTotalPrices();
}
// xóa xong thì cập nhật lại total price
function updateTotalPrices() {
    var cartItemContainer = document.getElementsByClassName('cart-table')[0];
    var cartRows = cartItemContainer.children[0].children;
    var total = 0;
    var eachTotal;
    //tổng tất cả những sản phẩm
    for (var index = 1; index < cartRows.length; index++) {
        eachTotal = 0;
        var cartRow = cartRows[index];
        var priceElement = cartRow.querySelectorAll('.cart-price')[0];
        // console.log(priceElement);
        var quantityElement =
            cartRow.getElementsByClassName('info-count_num')[0];

        var price = parseFloat(priceElement.innerText.replace('$', ''));
        // console.log(price);
        var quantity = parseInt(quantityElement.innerText);
        // console.log(quantity);
        total += price * quantity;
        eachTotal += price * quantity;
        eachTotal = Math.round(eachTotal * 100) / 100;
        var eachTotalAdress = cartRow.children[4];
        eachTotalAdress.innerText = '$' + eachTotal;
        // console.log(eachTotal);
    }
    // console.log(total);
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText =
        '$' + total;
}

//tự viết hàm dấu cộng
// function quantityCount() {
//     var incBtn = document.getElementsByClassName('plus');
//     var minusBtn = document.getElementsByClassName('minus');
//     console.log(incBtn);
//     console.log(minusBtn);

//     for (let index = 0; index < incBtn.length; index++) {
//         var btn = incBtn[index];
//         btn.addEventListener('click', (e) => {
//             var btnClicked = e.target;
//             var input = btnClicked.parentElement;
//             console.log(input);
//         });
//     }
// }
// quantityCount();

function quantity() {
    var cartItemContainer = document.getElementsByClassName('cart-table')[0];
    var cartRows = cartItemContainer.children[0].children;
    // console.log(cartRows);
    // console.log(cartRows);
    let quantity = [];
    for (var index = 1; index < cartRows.length; index++) {
        var cartRow = cartRows[index];
        const btnQuantities = cartRow.querySelectorAll('.icon');
        quantity.push(1);
        btnQuantities.forEach((btn) => {
            calcQuantity(btn, index - 1);
        });
    }

    function calcQuantity(btn, indexQuantity) {
        const textQuantity = btn.parentElement.querySelector('.info-count_num');
        let sign = btn.classList.contains('minus') ? -1 : 1;
        let btnMinus = btn.parentElement.querySelector('.minus');
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            quantity[indexQuantity] += sign;

            if (quantity[indexQuantity] < 1) {
                quantity[indexQuantity] = 1;
            } else {
                if (quantity[indexQuantity] == 1 && sign == -1) {
                    if (!btnMinus.classList.contains('--gray'))
                        btnMinus.classList.add('--gray');
                } else if (btnMinus.classList.contains('--gray')) {
                    btnMinus.classList.remove('--gray');
                }

                textQuantity.textContent = quantity[indexQuantity];
            }
            updateTotalPrices(); //phần này là add vô khi tăng/giảm sẻ tự động cập nhật
        });
    }
}

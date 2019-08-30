// import { json } from "body-parser";

const generateItemObject = function($input, quantity) {
  const id = Number($input.siblings('input').attr('name'));
  const name = $input.parent().siblings('.menu-text').find('.dish-name').text();
  const price = $input.parent().siblings('.price').text();

  const item = {
    id,
    name,
    quantity,
    price,
  };

  return item;
};

const getNumOfItems = function() {
  const numItems = Object.keys(window.localStorage).length;

  return numItems;
};
const myCheckout = function() {
  console.log("test");
}
const getCartTotal = function() {
  const numKeys = getNumOfItems();
  let sum = 0.00;

  for (let index = 0; index < numKeys; index++) {
    let item = JSON.parse(window.localStorage.getItem(window.localStorage.key(index)));
    sum += item.quantity * item.price;
  }

  return sum.toFixed(2);
};

const renderCartTotal = function() {
  $('section.total div.container p').empty();
  $('section.total div.container p').append(`$${getCartTotal()}`);
}

const renderCartItems = function() {
  const numKeys = getNumOfItems();

  $('section#order-container').empty();
  let total = 0;
  for (let index = 0; index < numKeys; index++) {
    let item = JSON.parse(window.localStorage.getItem(window.localStorage.key(index)));

    let markup = `
          <tr>
            <td>${item.quantity}</td>
            <td>${item.name}</td>
            <td class="right-align">$${Number(item.price * item.quantity).toFixed(2)}</td>
          </tr>
    `;

    total = total + Number(item.price * item.quantity);
    $('#order-container').append(markup);

    // set onclick for 'x mark remove from cart' located inside the sidebar
  }
  $('tfoot td.right-align').text(total)
};

$(document).ready(function() {
  renderCartItems();

  $("#checkout").on("click", function(event) {
    event.preventDefault;

    const numKeys =   getNumOfItems();
    let item;
    let data = [];
    let total = 0;
    for (let index = 0; index < numKeys; index++) {
      item = JSON.parse(window.localStorage.getItem(window.localStorage.key(index)));
      console.log(77, item);
      data.push(JSON.parse(window.localStorage.getItem(window.localStorage.key(index))));
      console.log(79, data);
      total = total + Number(item.price * item.quantity);
    }

    console.log(window.localStorage)
    console.log(data);

    $.ajax({
      method: "POST",
      url: "/checkout",
      data: { data },
      dataType: "json",
      success: function() {
        // $(".estimated-time").text(`Order will be ready in ${time.value}`);
        console.log('test1')
      },
      error: function() {
        // alert("An AJAX error has occured");
      }
    });

  });

});


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

const incrementItemLocalStorage = function($input, quantity) {
  const item = generateItemObject($input, quantity);

  window.localStorage.setItem(item.id, JSON.stringify(item));
};

const removeItemFromLocalStorage = function($input) {
  const id = Number($input.siblings('input').attr('name'));

  window.localStorage.removeItem(id);
};

const removeItemFromCart = function($input) {
  const id = Number($input.siblings('input').attr('name'));

  $(`article.${id}`).remove();
};

const getNumOfItems = function() {
  const numItems = Object.keys(window.localStorage).length;

  return numItems;
};

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

  for (let index = 0; index < numKeys; index++) {
    let item = JSON.parse(window.localStorage.getItem(window.localStorage.key(index)));

    const markup = `
    <p>${item.quantity}</p>
    <h3 class="${item.id}">${item.name}</h3>
    <p>$${Number(item.price * item.quantity).toFixed(2)}</p>
    <span class="remove-item"><img src="/images/x-mark.png" alt="Remove from order" title="Remove from order"></span>
    `;

    $('#order-container').append($('<article>').addClass(`container ${item.id}`).html(markup));

    // set onclick for 'x mark remove from cart' located inside the sidebar
    $(".remove-item").on("click", function () {
      const $button = $(this);

      // need to eventually refactor
      const id = Number($button.siblings("h3").attr("class"));
      window.localStorage.removeItem(id);
      $(`article.${id}`).remove();
      renderCartTotal();

      // updating menu side
      $(`input.quantity[name=${id}]`).attr("value", 0);
      $(`input.quantity[name=${id}]`).val(0);
      $(`input.quantity[name=${id}]`).css({ "color": "black" });
      $(`input.quantity[name=${id}]`).css({ "font-weight": "normal" });
      $(`input.quantity[name=${id}]`).siblings("span").css({ "visibility": "hidden" });
    });
  }
};

const renderInputValues = function() {
  const numKeys = getNumOfItems();

  for (let index = 0; index < numKeys; index++) {
    let item = JSON.parse(window.localStorage.getItem(window.localStorage.key(index)));

    $(`input.quantity[name=${item.id}]`).attr("value", item.quantity);
    $(`input.quantity[name=${item.id}]`).val(item.quantity);
    $(`input.quantity[name=${item.id}]`).css({ "color": "rgb(225, 30, 30)" });
    $(`input.quantity[name=${item.id}]`).css({ "font-weight": "bold" });
    $(`input.quantity[name=${item.id}]`).siblings("span").css({ "visibility": "visible" });
  }
}

$(document).ready(function() {

  // Append database menu_items to page //
  $("tr .add").prepend('<button type="button" class="plus increment">+</button>');
  $("tr .add").append('<button type="button" class="minus increment">-</button>');
  $("tr .add").append('<span class="reset"><img src="/images/x-mark.png" alt="Remove from order" title="Remove from order"></span>');

  renderInputValues();

  // Implement onclick for the + - buttons
  $(".increment").on("click", function() {
    const $button = $(this);
    const oldValue = $button.parent().find("input").val();
    let newVal = oldValue;

    if ($button.text() === "+") {
      newVal = parseFloat(oldValue) + 1;

      incrementItemLocalStorage($button, newVal);
      // $button.parent().find("input").attr('value', newVal);

    } else {
      // Don't allow decrementing below zero
      if (oldValue > 0) {
        newVal = parseFloat(oldValue) - 1;
        incrementItemLocalStorage($button, newVal);

        if (newVal === 0) {
          removeItemFromLocalStorage($button);
        }

      } else {
        newVal = 0;
      }
    }

    // Update look of the html
    if (newVal !== 0) {
      $(this).siblings("input").css({ "color": "rgb(225, 30, 30)" });
      $(this).siblings("input").css({ "font-weight": "bold" });
      $(this).siblings("span").css({ "visibility": "visible" });

    } else {
      $(this).siblings("input").css({ "color": "black" });
      $(this).siblings("input").css({ "font-weight": "normal" });
      $(this).siblings("span").css({ "visibility": "hidden" });
    }

    $button.parent().find("input").val(newVal);
  });

  // Implement the onclick for the cross mark button
  $(".reset").on("click", function() {
    const $button = $(this);

    // set everythign to zero
    $button.parent().find("input").val("0");
    removeItemFromLocalStorage($button);

    // remove item from cart
    removeItemFromCart($button);

    // reset css to zero state
    $(this).siblings('input').css({ "color": "black" });
    $(this).siblings('input').css({ "font-weight": "normal" });
    $(this).css({ "visibility": "hidden" });
  });

  // Implement open close side bar cart //
  let cartOpen = false;

  $('body .toggle-cart').on('click', function(event) {
    event.preventDefault();
    if (cartOpen) {
      closeCart();
      return;
    }
    openCart();
    renderCartItems();
    renderCartTotal();
  });

  const openCart = function() {
    cartOpen = true;
    $("#menu").toggleClass("open");
    $('body').addClass('open');
  };

  const closeCart = function() {
    cartOpen = false;
    $("#menu").toggleClass("open");
    $('body').removeClass('open');
  };

});


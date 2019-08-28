$(document).ready(function() {

  const generateItemObject = function($input, quantity) {
    // slice at 20 since id starts at index 20 from 'menu-text menu_item_id'
    const id = Number($input.parent().siblings().attr('class').slice(20));
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

  const incrementItemLocalStorage = function ($input, quantity) {
    const item = generateItemObject($input, quantity);

    window.localStorage.setItem(item.id, JSON.stringify(item));
  };

  const removeItemFromLocalStorage = function ($input) {
    const id = Number($input.parent().siblings().attr('class').slice(20));

    window.localStorage.removeItem(id);
  };

  const getNumOfItems = function() {
    const numItems = Object.keys(window.localStorage).length;

    return numItems;
  };

  const renderCartItem = function($input, quantity) {
    const item = generateItemObject($input, quantity);

    const markup = `
    <p>${item.quantity}</p>
    <h3 class="${item.id}">${item.name}</h3>
    <p>$${Number(item.price * item.quantity).toFixed(2)}</p>
    <span class="remove-item"><img src="/images/x-mark.png" alt="Remove from order" title="Remove from order"></span>
    `;

    $('#order-container').append($('<article>').addClass(`container ${item.id}`).html(markup));

    // x mark remove from cart
    $(".remove-item").on("click", function () {
      const $button = $(this);

      const id = Number($button.siblings("h3").attr("class"));
      window.localStorage.removeItem(id);
      $(`article.${id}`).remove();
      renderCartTotal();
    })
  };

  const removeItemFromCart = function($input) {
    const id = Number($input.parent().siblings().attr('class').slice(20));

    $(`article.${id}`).remove();
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

  const renderCartItems = function($input) {
    const numKeys = getNumOfItems();

    for (let index = 0; index < numKeys; index++) {
      renderCartItem();
    }

  };



  $(function () {

    // console.log($("tr .add").siblings().attr('class'));

    // #### NEED TO GIVE IT AN CLASS ID USING EJS #### //
    $("tr .add").prepend('<button type="button" class="plus increment">+</button>');
    $("tr .add").append(`<input class="quantity" type="number" name="quantity" value="0" max="100" min="0" disabled></input>`)
    $("tr .add").append('<button type="button" class="minus increment">-</button>');
    $("tr .add").append('<span class="reset"><img src="/images/x-mark.png" alt="Remove from order" title="Remove from order"></span>');

    // console.log($("tr .add").children("input").attr('value', 1));

    // Implement onclick for the + - buttons
    $(".increment").on("click", function () {
      const $button = $(this);
      const oldValue = $button.parent().find("input").val();
      let newVal = oldValue;

      const id = Number($button.parent().siblings().attr('class').slice(20));


      if ($button.text() === "+") {
        newVal = parseFloat(oldValue) + 1;

        // if (!window.localStorage.getItem(id)) {
        //   removeItemFromCart($button)
        //   renderCartItem($button, newVal);
        // } else {
        //   //increment
        // }

        incrementItemLocalStorage($button, newVal);
        $button.parent().find("input").attr('value', newVal);

        removeItemFromCart($button);
        renderCartItem($button, newVal);

      } else {
        // Don't allow decrementing below zero
        if (oldValue > 0) {
          newVal = parseFloat(oldValue) - 1;
          incrementItemLocalStorage($button, newVal);

          removeItemFromCart($button);
          renderCartItem($button, newVal);

          if (newVal === 0) {
            removeItemFromLocalStorage($button);
            removeItemFromCart($button);
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
    $(".reset").on("click", function () {
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


  });

  // Open close side bar cart //
  let cartOpen = false;

  $('body').on('click', '.toggle-cart', toggleCart);

  function toggleCart(event) {
    event.preventDefault();
    if (cartOpen) {
      closeCart();
      return;
    }
    openCart();
    renderCartTotal();
  };

  function openCart() {
    cartOpen = true;
    $("#menu").toggleClass("open");
    $('body').addClass('open');
  };

  function closeCart() {
    cartOpen = false;
    $("#menu").toggleClass("open");
    $('body').removeClass('open');
  };

});


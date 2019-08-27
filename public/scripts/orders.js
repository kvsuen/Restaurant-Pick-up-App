$(document).ready(function() {

  const incrementItemLocalStorage = function ($input, quantity) {
    // slice at 10 since id starts at index 10 from 'menu_item_id'
    const id = Number($input.parent().find("input").attr('name').slice(10));
    const name = $input.parent().siblings('.menu-text').find('.dish-name').text();
    const price = $input.parent().siblings('.price').text();

    const item = {
      id,
      name,
      quantity,
      price,
    };

    window.localStorage.setItem(id, JSON.stringify(item));
  };

  const removeItemFromLocalStorage = function ($input) {
    const id = Number($input.parent().find("input").attr('name').slice(10));

    window.localStorage.removeItem(id);
  };

  $(function () {

    $("tr .add").prepend('<button type="button" class="plus increment">+</button>');
    $("tr .add").append('<button type="button" class="minus increment">-</button>');
    $("tr .add").append('<span class="reset"><img src="/images/x-mark.png" alt="Remove from order" title="Remove from order"></span>');

    // Implement onclick for the + - buttons
    $(".increment").on("click", function () {
      var $button = $(this);
      var oldValue = $button.parent().find("input").val();

      if ($button.text() === "+") {
        var newVal = parseFloat(oldValue) + 1;

        incrementItemLocalStorage($button, newVal);

        // const markup = `
        // <p>${quantity}</p>
        // <h3>${name}</h3>
        // <p>$${Number(price).toFixed(2)}</p>
        // <span><img src="/images/x-mark.png" alt="Remove from order" title="Remove from order"></span>
        // `;

        // $('#order-container').prepend($('<article>').addClass('container').html(markup));




      } else {
        // Don't allow decrementing below zero
        if (oldValue > 0) {
          var newVal = parseFloat(oldValue) - 1;
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
    $(".reset").on("click", function () {
      var $button = $(this);

      // set everythign to zero
      $button.parent().find("input").val("0");
      removeItemFromLocalStorage($button);

      // reset css to zero state
      $(this).siblings('input').css({ "color": "black" });
      $(this).siblings('input').css({ "font-weight": "normal" });
      $(this).css({ "visibility": "hidden" });
    });
  });

  // Open close side bar cart //
  var cartOpen = false;
  var numberOfProducts = 0;

  $('body').on('click', '.toggle-cart', toggleCart);

  function toggleCart(event) {
    event.preventDefault();
    if (cartOpen) {
      closeCart();
      return;
    }
    openCart();
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


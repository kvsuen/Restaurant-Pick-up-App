const checkFormValid = (formInfo) => {
  if (formInfo.email === "" || formInfo.password === "" || formInfo.phoneNumber === "" || formInfo.name === "") {
    return false;
  } else {
    return true;
  }
};

const applyPromo = (userInput, totalPrice) => {
  if (userInput === 'KRUSTY') {
    let discountedPrice = totalPrice;

    if (totalPrice >= 10000) {
      discountedPrice *= 0.80;
    } else if (totalPrice >= 5000) {
      discountedPrice *= 0.85;
    }

    return discountedPrice;
  } else {
    return totalPrice;
  }
};

// const applyTip = (userInput, totalPrice) => {
//   $('#tip-10')
// };

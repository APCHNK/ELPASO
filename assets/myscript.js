



// CART

let up = document.querySelectorAll('.up')
let down = document.querySelectorAll('.down')
let remove = document.querySelectorAll('.remove')





  up.forEach((item) => {
    item.addEventListener('click', (e) => {
      let product = e.target.closest('.cart-item')
      let input = product.querySelector('.quantity-input');
      let key = product.getAttribute('data-key');
      let value = parseInt(input.value, 10);
      value = isNaN(value) ? 0 : value;
      value++;
      input.value = value;
      changeItemTotalPrice(product ,value);
      changeItemQuantity(key, value);
      updateSubtotal()
    })
  })

  down.forEach((item) => {
    item.addEventListener('click', (e) => {
      let product = e.target.closest('.cart-item')
      let input = product.querySelector('.quantity-input');
      let key = product.getAttribute('data-key');
      let value = parseInt(input.value, 10);
      if (value > 0) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.value = value;
      } 
      if (value == 0) {
        const parent = item.closest('.cart-item')
        parent.style.display = 'none'
      }
      console.log(product)
      changeItemTotalPrice(product ,value);
      changeItemQuantity(key, value);
      updateSubtotal()
    })
  })

  remove.forEach(item => {
    item.addEventListener('click', (e)=>{
        e.preventDefault();
        const parent = item.closest('.cart-item')
        parent.style.display = 'none'
        changeItemTotalPrice(parent ,0);
        changeItemQuantity(parent.getAttribute('data-key'), 0);
        updateSubtotal()
    })
  })


  function strokeToNumber(stroke) {
    return parseFloat(stroke.replace(/[$,]/g, '')) * 100;
  }
  
  function changeItemTotalPrice(item, quantity) {
    let priceText = item.querySelector('.price').textContent.trim();
    let price = strokeToNumber(priceText);
    let totalPrice = price * quantity;
    let totalElement = item.querySelector('.total');
    totalElement.textContent = `$${(totalPrice / 100).toFixed(2)}`;
  }
  
  function updateSubtotal() {
    let totalElements = document.querySelectorAll('.cart-item .total');
    let subtotal = Array.from(totalElements).reduce((acc, element) => {
      let stroke = element.textContent.trim();
      let price = strokeToNumber(stroke);
      return acc + price;
    }, 0);
    let subtotalFields = document.querySelectorAll('.subtotal-field');
    subtotalFields.forEach(field => {
      field.textContent = `$${(subtotal / 100).toFixed(2)}`;
    });
  }

  function strokeToNumber(stroke) {
      let number = parseFloat(stroke.replace(/[^0-9]/g, ''));
      return number;
  }


  function changeItemQuantity(key, quantity) {
    
    let updates = {};
    updates[key] = quantity; 
    formData = {
      updates,
    }
    console.log(formData)
    fetch(window.Shopify.routes.root + 'cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) 
    })
    .then(response => {
      return response.json();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }


  
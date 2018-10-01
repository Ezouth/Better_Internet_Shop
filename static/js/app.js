// global cart variable
var cart = [];

// if cart is empty don't show Cart

if (cart.length == 0){
  $("#cart").css("display", "none");
}

$.get('./components/header.html', function(response) {
    $("#nav").html(response);
});

// Callback function to show our products.json
function showProducts(response) {
  console.log(response);
  // define local variables for headers and html
  let products = response.products;
  let html = "";

  // need to loop through the products and create card for each
  for (let i=0; i < products.length; i++) {
    //open row for each third product
    if ( i % 3 == 0) {
      html += '<div class="row">';
    }
    html +=` <div class="card col-md-4">
      <div class="card-img-top">
          <img src="http://placehold.it/1x1" alt="Placeholder" class="card-img" />
        </div>
        <div class="card-title">${products[i].title}</div>
        <div class="card-subtitle">$${products[i].price}</div>
        <div class="card-text">${products[i].description}</div>
        <button onclick="addToCart(${products[i].id})" class="btn btn-primary">Add To Cart</button>
      </div>` ;
    // close row after 3 products have been added
    if ((i + 1) % 3 == 0 ) {
      html += '</div>';
    }
  }
  // inject html string into products id
  $("#products").html(html);
}


// use jQuery to pull products information

$.get('./assests/products.json', showProducts);


function addToCart(id) {
  $.get('./assests/products.json', function(response) {
    let products = response.products;

    // Loop through products array to find correct id
    for (var i=0; i< products.length; i++) {
      // check current product id to id parameter passed
      if (products[i].id ==id ) {
        // add product to global cart
        cart.push(products[i]);
        break;
      }
    }
  });
 sleep(50).then(() => {
   showCart();
    // Do something after the sleep!
})}

function showCart() {
  // if cart is empty, hide, otherwise show
  if (cart.length === 0) {
  $("#cart").css("display", "none");
    }
  else {
    $("#cart").css("display", "block");
  }
  //define html variable to be inserted to tbody
  let html = '';
  // loop through all products in cart
  // TODO change total to be quantity times price
  for (var i=0; i<cart.length; i++) {
  html += `
  <tr>
    <td>1</td>
    <td>${cart[i].title}</td>
    <td>$${cart[i].price}</td>
    <td>$${cart[i].price}</td>
    <td><button onclick="removeFromCart(${cart[i].id})" class="btn btn-danger">x</button></td>
  </tr> `;
}
console.log(cart)
  // inject html variable into table-tbody
  $("#table-body").html(html);
}


// TODO: create remove functionality
function removeFromCart(id) {
  // loop through products in cart and remove on instance of id
  for (var i=0; i < cart.length; i++ ) {
    // check current product for id passed in
    if (cart[i].id == id ) {
      // splice current product
      cart.splice(i,1);
      break;
    }
  }
  // run showCart to generate current cart array
  sleep(50).then(() => {
    showCart();
  });

}


function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

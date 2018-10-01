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


// Add funcitonality later
function addToCart(id) {
  console.log(id);
}

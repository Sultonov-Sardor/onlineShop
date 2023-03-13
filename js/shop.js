let elList = document.querySelector('.js-list');

let localData = localStorage.getItem('token');

const renderProduct = (array,node) => {
  node.innerHTML = "";

  array.forEach((product) => {
    node.innerHTML += `
     <li class="item">
     <img class="img-product" width="200" height="300" src="${product.product_img}" alt="">
      <h2 class="title-product mll">${product.product_name}</h2>
      <p class="desc-product mll">${product.product_desc}</p>
      <span class="span-product mll">${product.product_price}</span>
     </li>
    `
  })
}

async function getProducts(){
  const res = await fetch('http://localhost:5000/product',{
    headers: {
      Authorization: localData,
    }
  });
  const data = await res.json();
  renderProduct(data,elList)
}

getProducts();
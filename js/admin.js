let elAdd = document.querySelector('.add-btn');
let modal = document.querySelector('.js-modal');
let ModalForm = document.querySelector('.js-modal-form');
let elList = document.querySelector('.js-lists');

let productName = document.querySelector('.js-name');
let productDesc = document.querySelector('.js-desc');
let productPrice = document.querySelector('.js-price');
let productImg = document.querySelector('.js-img');

// ======================================================================

let localData = localStorage.getItem('token');

// ======================================================================

elAdd.addEventListener('click', (evt) =>{
  modal.classList.toggle('dn');
});

function closeModal(){
  modal.classList.add('dn');
}

function openModal(){
  modal.classList.remove('dn');
}

// ======================================================================

const renderProduct = (array,node) => {
  node.innerHTML = "";

  array.forEach((product) => {
    node.innerHTML += `
     <li class="item">
     <img class="img-product" width="200" height="300" src="${product.product_img}" alt="">
      <h2 class="title-product mll">${product.product_name}</h2>
      <p class="desc-product mll">${product.product_desc}</p>
      <span class="span-product mll">${product.product_price}</span>
      <div class="mb-20 mll">
        <button data-product-id=${product.id} class="btns js-edit">Edit</button>
        <button data-product-id=${product.id} class="btns js-delete">Delete</button>
      </div>
     </li>
    `
  })
}

// ======================================================================

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

// ======================================================================

ModalForm.addEventListener('submit', (evt) =>{
  evt.preventDefault();

  const formData = new FormData();
  const img = productImg.files[0];

  formData.append('product_name', productName.value);
  formData.append('product_desc', productDesc.value);
  formData.append('product_img', img);
  formData.append('product_price', productPrice.value);

  fetch('http://localhost:5000/product',{
    method: 'POST',
    headers:{
      Authorization: localData,
    },
    body: formData,
  })
  .then((res)=> res.json())
  .then((data)=> {
    if(data){
      getProducts()
    }
  })
  .catch((err)=>console.log(err))
})

// ======================================================================

// const editProduct = (id) => {
//   const newValue = prompt('enter text');
//   fetch(`http://192.168.100.8:5000/product/${id}`, {
//     method: 'PUT',
//     headers:{
//       Authorization: localData,
//     },
//     body: JSON.stringify({
//       text: newValue,
//     })
//   })
//   .then((res)=> res.json())
//   .then((data)=> console.log(data))
//   .catch((err)=>console.log(err))
// }


function editProduct(){
  openModal()

  ModalForm.addEventListener('submit', (evt) =>{
    evt.preventDefault();
  
    const formData = new FormData();
    const img = productImg.files[0];
  
    formData.set('product_name', productName.value);
    formData.set('product_desc', productDesc.value);
    formData.set('product_img', img);
    formData.set('product_price', productPrice.value);

    function myEdit(){
      fetch(`http://localhost:5000/product/${id}`,{
        method: 'PUT',
        headers:{
          Authorization: localData,
        },
        body: formData,
      })
      .then((res)=> res.json())
      .then((data)=> {
        if (data) {
          getProducts();
        }
      })
      .catch((err)=>console.log(err))
    }
    myEdit()
    closeModal()
  })
}


const deleteProduct = (id) => {
  fetch(`http://192.168.100.8:5000/product/${id}`, {
    method: 'DELETE',
    headers:{
      Authorization: localData,
    },
  })
  .then((res)=> res.json())
  .then((data)=> {
    if(data){
      getProducts()
    }
  })
  .catch((err)=>console.log(err))
}



elList.addEventListener('click', (evt) => {
  evt.preventDefault();

  if(evt.target.matches('.js-delete')){
    const productId = evt.target.dataset.productId;
    deleteProduct(productId)
  }
  if(evt.target.matches('.js-edit')){
    const productId = evt.target.dataset.productId;
    editProduct(productId)
  }
})
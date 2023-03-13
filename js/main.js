let token = localStorage.getItem('token');

if(token){
  location.replace('shop.html')
}

let loginBtn = document.querySelector('.login-btn');

loginBtn.addEventListener('click', () => {
  location.replace('login.html')
})
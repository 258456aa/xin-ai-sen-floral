const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? '關閉選單' : '開啟選單');
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(item => observer.observe(item));

const inquiryForm = document.querySelector('#inquiry-form');
if (inquiryForm) {
  inquiryForm.addEventListener('submit', event => {
    event.preventDefault();
    const status = event.currentTarget.querySelector('.form-status');
    status.textContent = '已收到您的需求示範。正式上線前可串接 LINE、Email 或表單服務。';
  });
}

if (!document.querySelector('.floating-social')) {
  document.body.insertAdjacentHTML('beforeend', '<div class="floating-social" aria-label="社群聯絡連結"><a class="social-line" href="assets/line-id.jpg" target="_blank">LINE</a><a href="https://www.facebook.com/share/1BPyFwZrpU/?mibextid=wwXIfr" target="_blank" rel="noopener">FB</a><a href="https://www.instagram.com/xinasen_floral?igsh=ZmNuNDRycjJiN3ox&igsi=ZmNuNDRycjJiN3ox&utm_source=qr" target="_blank" rel="noopener">IG</a></div><a class="back-to-top" href="#top" aria-label="返回網站最上方"><span>↑</span> 返回頁首</a>');
}

const cartButtons = document.querySelectorAll('.add-cart');
if (cartButtons.length) {
  const drawer = document.querySelector('.cart-drawer');
  const backdrop = document.querySelector('.cart-backdrop');
  const itemsBox = document.querySelector('.cart-items');
  const emptyText = document.querySelector('.cart-empty');
  const countBox = document.querySelector('.cart-count');
  let cart = JSON.parse(localStorage.getItem('xinasen-cart') || '[]');
  const renderCart = () => {
    itemsBox.innerHTML = cart.map((item, index) => `<div class="cart-item"><span>${item}</span><button type="button" data-remove="${index}">移除</button></div>`).join('');
    countBox.textContent = cart.length;
    emptyText.hidden = cart.length > 0;
    localStorage.setItem('xinasen-cart', JSON.stringify(cart));
  };
  const toggleCart = open => { drawer.classList.toggle('open', open); backdrop.classList.toggle('open', open); };
  cartButtons.forEach(button => button.addEventListener('click', () => { cart.push(button.dataset.product); renderCart(); toggleCart(true); }));
  document.querySelector('.cart-toggle').addEventListener('click', () => toggleCart(true));
  document.querySelector('.cart-close').addEventListener('click', () => toggleCart(false));
  backdrop.addEventListener('click', () => toggleCart(false));
  itemsBox.addEventListener('click', event => { const removeButton = event.target.closest('[data-remove]'); if (!removeButton) return; cart.splice(Number(removeButton.dataset.remove), 1); renderCart(); });
  renderCart();
}

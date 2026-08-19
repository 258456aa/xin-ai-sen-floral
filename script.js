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

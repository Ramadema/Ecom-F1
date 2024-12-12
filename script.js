document.addEventListener('DOMContentLoaded', () => {
  const kebabMenu = document.querySelector('.kebab-menu');
  const fullScreenMenu = document.querySelector('.full-screen-menu');
  const closeBtn = document.querySelector('.close-btn');
  const cartLogo = document.querySelector('.cart-logo');
  const cartSidebar = document.createElement('div');
  const closeCartSidebarBtn = document.createElement('button');
  
  closeCartSidebarBtn.classList.add('close-cart-sidebar-btn');
  closeCartSidebarBtn.innerHTML = '&times;';
  cartSidebar.classList.add('cart-sidebar');
  cartSidebar.appendChild(closeCartSidebarBtn);
  document.body.appendChild(cartSidebar);

  // Mostrar menú al hacer clic en el botón kebab
  kebabMenu.addEventListener('click', () => {
    fullScreenMenu.classList.add('show');
  });

  // Ocultar menú al hacer clic en el botón de cierre
  closeBtn.addEventListener('click', () => {
    fullScreenMenu.classList.remove('show');
  });

  // Manejo del carrito
  let cart = [];

  function formatPrice(price) {
    return price.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function updateCart() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartLogo.dataset.count = totalItems;
    cartSidebar.innerHTML = `
      <button class="close-cart-btn">&times;</button>
      <h2>Carrito</h2>
      <ul>
        ${cart.map(item => `<li>${item.name} x ${item.quantity} - $${formatPrice(item.price * item.quantity)}</li>`).join('')}
      </ul>
      <p>Total: $${formatPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0))}</p>
    `;

    const closeCartBtn = cartSidebar.querySelector('.close-cart-btn');
    closeCartBtn.addEventListener('click', () => {
      cartSidebar.classList.remove('open');
      document.body.classList.remove('overlay'); // remove overlay class from body
    });
  }

  function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
  }

  document.querySelectorAll('.btn-agregar-carrito').forEach((button, index) => {
    button.addEventListener('click', () => {
      button.textContent = 'Agregado al carrito';
      setTimeout(() => {
        button.textContent = 'Añadir al Carrito';
      }, 1000);

      const product = {
        id: index,
        name: button.parentElement.querySelector('h3').textContent,
        price: parseFloat(button.parentElement.querySelector('.precio').textContent.replace('$', '').replace('.', '').replace(',', '.'))
      };
      addToCart(product);
    });
  });

  cartLogo.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    document.body.classList.add('overlay'); // add overlay class to body
  });

  closeCartSidebarBtn.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
    document.body.classList.remove('overlay'); // remove overlay class from body
  });

  //*** Slides ***

  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const sliderContainer = document.querySelector('.slider-container');

  let currentSlide = 0;
  let autoSlideInterval;
  let startX = 0;
  let isDragging = false;

  // Función para mostrar un slide específico
  function showSlide(index) {
    // Ajustar el índice para que siempre esté dentro del rango
    currentSlide = (index + slides.length) % slides.length;

    // Mueve el contenedor del slider al slide correspondiente
    const offset = currentSlide * -100; // Usamos el 100vw para el desplazamiento
    sliderContainer.style.transform = `translateX(${offset}vw)`;

    // Actualiza los dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  // Función para avanzar al siguiente slide
  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  // Función para retroceder al slide anterior
  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Manejo de los dots
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      currentSlide = parseInt(dot.dataset.index);
      showSlide(currentSlide);
      resetAutoSlide();
    });
  });

  // Botones de navegación
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  // Pase automático cada 5 segundos
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  // Reinicia el pase automático después de una interacción manual
  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Funcionalidad de "swipe" (deslizar) para dispositivos móviles
  sliderContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  sliderContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const touchX = e.touches[0].clientX;
    const deltaX = touchX - startX;

    if (deltaX > 50) {
      prevSlide();
      isDragging = false;
      resetAutoSlide();
    } else if (deltaX < -50) {
      nextSlide();
      isDragging = false;
      resetAutoSlide();
    }
  });

  sliderContainer.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Inicializa el slider
  showSlide(currentSlide);
  startAutoSlide();

  // Selecciona todas las diapositivas
  const slids = document.querySelectorAll('.slide');

  // Función para cambiar las imágenes según el tamaño de la pantalla
  function updateSlides() {
    if (window.innerWidth <= 768) {
      slides[0].style.backgroundImage = "url('images/banner3.jpeg')";
      slides[1].style.backgroundImage = "url('images/banner3.jpeg')";
      slides[2].style.backgroundImage = "url('images/banner3.jpeg')";
    } else {
      slides[0].style.backgroundImage = "url('images/banner1.jpeg')";
      slides[1].style.backgroundImage = "url('images/banner2.jpeg')";
      slides[2].style.backgroundImage = "url('images/banner3.jpeg')";
    }
  }

  // Llama a la función en carga y al cambiar el tamaño de la ventana
  window.addEventListener('resize', updateSlides);
  updateSlides();


  function redirectToProduct(producto) {
    // Aquí puedes personalizar la URL según tus necesidades
    const url = `chombas.html`; // Reemplaza 'chombas.html' con la URL deseada
    window.location.href = url;
  }
});

document.getElementById('search-bar').addEventListener('input', function() { // Barra de búsqueda
  var filter = this.value.toLowerCase();
  var posts = document.querySelectorAll('.tarjeta-producto');

  posts.forEach(function(post) {
    var title = post.querySelector('h3').textContent.toLowerCase();
    post.classList.toggle('hidden', !title.includes(filter));
  });

  var visiblePosts = document.querySelectorAll('.tarjeta-producto:not(.hidden)');
  var productosGrid = document.querySelector('.productos-grid');

  if (visiblePosts.length % 2 === 0) {
    productosGrid.style.justifyContent = 'space-around';
  } else {
    productosGrid.style.justifyContent = 'center';
  }
});

// Movimiento del carrusel
document.addEventListener('DOMContentLoaded', () => {
  const carruselWrapper = document.querySelector('.carrusel-wrapper');
  const bannerContents = document.querySelectorAll('.carrusel-content');

  let currentIndex = 0;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % bannerContents.length;
    const newTransform = -currentIndex * 100;
    carruselWrapper.style.transform = `translateX(${newTransform}%)`;
  }, 2000); // Cambia de imagen cada 2 segundos
});

document.addEventListener('DOMContentLoaded', () => {
  // Referencias a los elementos del modal de login
  const loginModal = document.getElementById('login-modal');
  const openLoginModal = document.getElementById('open-login-modal');
  const closeLoginModal = document.getElementById('close-login-modal');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const goToRegister = document.getElementById('go-to-register');
  const goToLogin = document.getElementById('go-to-login');
  const loginErrorMessage = document.getElementById('login-error-message');
  const registerErrorMessage = document.getElementById('register-error-message');

  // Abrir el modal de login
  openLoginModal.addEventListener('click', (event) => {
    event.preventDefault(); // Previene el comportamiento predeterminado del enlace
    loginModal.classList.add('active'); // Muestra el modal
  });

  // Cerrar el modal de login
  closeLoginModal.addEventListener('click', () => {
    loginModal.classList.remove('active'); // Oculta el modal
  });

  // Cambiar a formulario de registro
  goToRegister.addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });

  // Cambiar a formulario de login
  goToLogin.addEventListener('click', (event) => {
    event.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  // Manejo del envío del formulario de login
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Previene el comportamiento de recargar la página

    // Obtén los valores ingresados por el usuario
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Aquí puedes agregar tu lógica de autenticación
    if (username === "admin" && password === "1234") {
      alert("Login exitoso");
      loginModal.classList.remove('active'); // Cierra el modal
    } else {
      loginErrorMessage.classList.remove('hidden'); // Muestra un mensaje de error
    }
  });

  // Manejo del envío del formulario de registro
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Previene el comportamiento de recargar la página

    // Lógica para validar y crear una nueva cuenta
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username && password) {
      alert("Registro exitoso");
      registerForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
    } else {
      registerErrorMessage.classList.remove('hidden'); // Muestra un mensaje de error
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const loginModal = document.getElementById('login-modal');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const goToRegister = document.getElementById('go-to-register');
  const goToLogin = document.getElementById('go-to-login');
  const registerErrorMessage = document.getElementById('register-error-message');
  const loginErrorMessage = document.getElementById('login-error-message');

  // Cambiar a formulario de registro
  goToRegister.addEventListener('click', (event) => {
    event.preventDefault();
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
  });

  // Cambiar a formulario de login
  goToLogin.addEventListener('click', (event) => {
    event.preventDefault();
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
  });

  // Registrar usuarios
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    if (username && password) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push({ username, password });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registro exitoso');
      registerForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
    } else {
      registerErrorMessage.classList.remove('hidden');
    }
  });

  // Iniciar sesión
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      alert('Login exitoso');
      loginModal.classList.remove('active');
    } else {
      loginErrorMessage.classList.remove('hidden');
    }
  });
});


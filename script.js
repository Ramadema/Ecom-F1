document.addEventListener('DOMContentLoaded', () => {
  const kebabMenu = document.querySelector('.kebab-menu');
  const fullScreenMenu = document.querySelector('.full-screen-menu');
  const closeBtn = document.querySelector('.close-btn');

  // Mostrar menú al hacer clic en el botón kebab
  kebabMenu.addEventListener('click', () => {
    fullScreenMenu.classList.add('show');
  });

  // Ocultar menú al hacer clic en el botón de cierre
  closeBtn.addEventListener('click', () => {
    fullScreenMenu.classList.remove('show');
  });
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

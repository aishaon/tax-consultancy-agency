/* ============================================
   Ajay & Safiullah Associates - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // --- Initialize AOS ---
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      delay: 100
    });
  }

  // --- Initialize Swiper ---
  initSwipers();

  // --- Navbar Scroll Effect ---
  initNavbarScroll();

  // --- Back to Top Button ---
  initBackToTop();

  // --- Button Ripple Effect ---
  initRippleEffect();

  // --- Smooth Anchor Scrolling ---
  initSmoothScroll();

  // --- Contact Form Handler ---
  initContactForm();

  // --- Appointment Form Handler ---
  initAppointmentForm();

  // --- Gallery Filter ---
  initGalleryFilter();

});

/* ============================================
   Swiper Initialization
   ============================================ */
function initSwipers() {
  // Testimonials Swiper
  if (document.querySelector('.testimonials-swiper')) {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }
    });
  }

  // Gallery Swiper
  if (document.querySelector('.gallery-swiper')) {
    new Swiper('.gallery-swiper', {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }
    });
  }

  // Logo/Partner Swiper
  if (document.querySelector('.logo-swiper')) {
    new Swiper('.logo-swiper', {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        480: { slidesPerView: 3 },
        768: { slidesPerView: 4 },
        1024: { slidesPerView: 5 },
      }
    });
  }
}

/* ============================================
   Navbar Scroll Effect
   ============================================ */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 80) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }

    // Hide/show on scroll down/up
    if (currentScroll > 200) {
      if (currentScroll > lastScroll) {
        navbar.classList.add('navbar-hidden');
      } else {
        navbar.classList.remove('navbar-hidden');
      }
    } else {
      navbar.classList.remove('navbar-hidden');
    }

    lastScroll = currentScroll;
  });
}

/* ============================================
   Back to Top Button
   ============================================ */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ============================================
   Button Ripple Effect
   ============================================ */
function initRippleEffect() {
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = ripple.style.height = '20px';

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

/* ============================================
   Smooth Anchor Scrolling
   ============================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navbarHeight = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ============================================
   Contact Form Handler
   ============================================ */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const formInputs = form.querySelectorAll('.form-input');
  const submitBtn = form.querySelector('button[type="submit"]');
  const successMsg = document.getElementById('formSuccess');

  // Real-time validation
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });

    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    formInputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    // Simulate submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      form.reset();
      form.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('show');
      }
    }, 2000);
  });
}

/* ============================================
   Appointment Form Handler
   ============================================ */
function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  if (!form) return;

  const formInputs = form.querySelectorAll('.form-input');
  const submitBtn = form.querySelector('button[type="submit"]');
  const successMsg = document.getElementById('appointmentSuccess');

  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });

    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;

    formInputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Booking...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Book Appointment <i class="fas fa-calendar-check"></i>';
      form.reset();
      form.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('show');
      }
    }, 2000);
  });
}

/* ============================================
   Field Validation
   ============================================ */
function validateField(input) {
  const value = input.value.trim();
  const type = input.getAttribute('type') || input.tagName.toLowerCase();
  let isValid = true;

  input.classList.remove('error');

  if (input.hasAttribute('required') && !value) {
    isValid = false;
  } else if (type === 'email' && value && !isValidEmail(value)) {
    isValid = false;
  } else if (type === 'tel' && value && !isValidPhone(value)) {
    isValid = false;
  }

  if (!isValid) {
    input.classList.add('error');
  }

  return isValid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[\d\s\-\+\(\)]{8,}$/.test(phone);
}

/* ============================================
   Gallery Filter
   ============================================ */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  if (!filterBtns.length) return;

  const items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      items.forEach(item => {
        const category = item.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

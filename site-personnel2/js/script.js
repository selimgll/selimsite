// ===== VARIABLES GLOBALES =====
let isLoading = true;
let currentSection = 'accueil';
let typewriterIndex = 0;
let typewriterText = '';
const typewriterTexts = [
  "Créer l'avenir numérique",
  "Innover avec passion",
  "Développer des solutions",
  "Transformer les idées"
];

// ===== INITIALISATION =====
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Initialiser AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });
  
  // Initialiser tous les composants
  initializeLoading();
  initializeNavigation();
  initializeScrollEffects();
  initializeSkillBars();
  initializeTypewriter();
  initializeContactForm();
  initializeParticles();
  
  // Démarrer les animations
  setTimeout(() => {
    hideLoadingScreen();
  }, 3000);
}

// ===== ÉCRAN DE CHARGEMENT =====
function initializeLoading() {
  const loadingScreen = document.getElementById('loading-screen');
  const typingText = document.querySelector('.typing-text');
  const cursor = document.querySelector('.cursor');
  
  // Animation du texte de chargement
  const loadingTexts = [
    'Initialisation du portfolio...',
    'Chargement des composants...',
    'Configuration de l\'interface...',
    'Prêt à explorer !'
  ];
  
  let textIndex = 0;
  
  function updateLoadingText() {
    if (textIndex < loadingTexts.length) {
      typingText.textContent = loadingTexts[textIndex];
      textIndex++;
      setTimeout(updateLoadingText, 800);
    }
  }
  
  updateLoadingText();
}

function hideLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.classList.add('hidden');
  
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    isLoading = false;
    
    // Démarrer les animations de la page
    startPageAnimations();
  }, 500);
}

function startPageAnimations() {
  // Animer la navbar
  const navbar = document.querySelector('.navbar');
  navbar.style.transform = 'translateY(-100%)';
  setTimeout(() => {
    navbar.style.transition = 'transform 0.5s ease';
    navbar.style.transform = 'translateY(0)';
  }, 100);
  
  // Démarrer l'effet machine à écrire
  setTimeout(() => {
    startTypewriter();
  }, 1000);
}

// ===== NAVIGATION =====
function initializeNavigation() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');
  
  // Menu hamburger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Navigation smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // Fermer le menu mobile
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Scroll fluide vers la section
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Mettre à jour la navigation active
        updateActiveNavigation(targetId);
      }
    });
  });
  
  // Effet de scroll sur la navbar
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Auto-hide navbar on scroll down (mobile)
    if (window.innerWidth <= 768) {
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    }
    
    lastScrollY = currentScrollY;
  });
}

function updateActiveNavigation(sectionId) {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === sectionId) {
      link.classList.add('active');
    }
  });
  
  currentSection = sectionId;
}

// ===== EFFETS DE SCROLL =====
function initializeScrollEffects() {
  // Intersection Observer pour détecter les sections visibles
  const sections = document.querySelectorAll('.section');
  
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '-50px 0px -50px 0px'
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        updateActiveNavigation(sectionId);
        
        // Déclencher des animations spécifiques par section
        triggerSectionAnimations(sectionId);
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    sectionObserver.observe(section);
  });
  
  // Parallax effect pour les éléments de fond
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background, .geometric-shapes');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

function triggerSectionAnimations(sectionId) {
  switch (sectionId) {
    case 'competences':
      animateSkillBars();
      break;
    case 'ambitions':
      if (!typewriterText) {
        startTypewriter();
      }
      break;
    case 'projets':
      animateProjectCards();
      break;
  }
}

// ===== BARRES DE COMPÉTENCES =====
function initializeSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    bar.style.width = '0%';
  });
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach((bar, index) => {
    const targetWidth = bar.getAttribute('data-width');
    
    setTimeout(() => {
      bar.style.width = targetWidth + '%';
    }, index * 200);
  });
}

// ===== EFFET MACHINE À ÉCRIRE =====
function initializeTypewriter() {
  const typewriterElement = document.getElementById('typewriter-text');
  if (typewriterElement) {
    typewriterElement.textContent = '';
  }
}

function startTypewriter() {
  const typewriterElement = document.getElementById('typewriter-text');
  if (!typewriterElement || typewriterText) return;
  
  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  
  function typeWriter() {
    const currentText = typewriterTexts[currentTextIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
      currentCharIndex--;
    } else {
      typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
      currentCharIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentCharIndex === currentText.length) {
      typeSpeed = 2000; // Pause à la fin
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % typewriterTexts.length;
      typeSpeed = 500; // Pause avant le nouveau texte
    }
    
    setTimeout(typeWriter, typeSpeed);
  }
  
  typeWriter();
  typewriterText = 'started';
}

// ===== ANIMATIONS DES PROJETS =====
function animateProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add('fade-in');
    }, index * 150);
  });
}

// ===== FORMULAIRE DE CONTACT =====
function initializeContactForm() {
  const form = document.getElementById('contact-form');
  const submitBtn = form.querySelector('.submit-btn');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Animation du bouton
    submitBtn.classList.add('loading');
    
    // Simuler l'envoi (remplacer par vraie logique d'envoi)
    await simulateFormSubmission();
    
    // Réinitialiser le formulaire
    form.reset();
    submitBtn.classList.remove('loading');
    
    // Afficher un message de succès
    showNotification('Message envoyé avec succès !', 'success');
  });
  
  // Validation en temps réel
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
  });
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  // Supprimer les erreurs précédentes
  clearFieldError(e);
  
  let isValid = true;
  let errorMessage = '';
  
  if (field.hasAttribute('required') && !value) {
    isValid = false;
    errorMessage = 'Ce champ est requis';
  } else if (field.type === 'email' && value && !isValidEmail(value)) {
    isValid = false;
    errorMessage = 'Adresse email invalide';
  }
  
  if (!isValid) {
    showFieldError(field, errorMessage);
  }
  
  return isValid;
}

function clearFieldError(e) {
  const field = e.target;
  const errorElement = field.parentNode.querySelector('.field-error');
  
  if (errorElement) {
    errorElement.remove();
  }
  
  field.style.borderColor = '';
}

function showFieldError(field, message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error';
  errorElement.textContent = message;
  errorElement.style.color = '#ef4444';
  errorElement.style.fontSize = '0.875rem';
  errorElement.style.marginTop = '0.25rem';
  
  field.style.borderColor = '#ef4444';
  field.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function simulateFormSubmission() {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Styles de la notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: type === 'success' ? '#10b981' : '#3b82f6',
    color: 'white',
    padding: '1rem 1.5rem',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    zIndex: '9999',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease'
  });
  
  document.body.appendChild(notification);
  
  // Animation d'entrée
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Animation de sortie
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// ===== PARTICULES ET EFFETS VISUELS =====
function initializeParticles() {
  createCodeRain();
  createFloatingElements();
}

function createCodeRain() {
  const codeRain = document.querySelector('.code-rain');
  if (!codeRain) return;
  
  const characters = '01';
  let rainHTML = '';
  
  for (let i = 0; i < 50; i++) {
    const randomChar = characters[Math.floor(Math.random() * characters.length)];
    const randomDelay = Math.random() * 2;
    const randomDuration = 3 + Math.random() * 2;
    
    rainHTML += `
      <span style="
        position: absolute;
        left: ${Math.random() * 100}%;
        animation-delay: ${randomDelay}s;
        animation-duration: ${randomDuration}s;
        opacity: ${0.1 + Math.random() * 0.3};
      ">${randomChar}</span>
    `;
  }
  
  codeRain.innerHTML = rainHTML;
}

function createFloatingElements() {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  
  for (let i = 0; i < 10; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    
    Object.assign(element.style, {
      position: 'absolute',
      width: '4px',
      height: '4px',
      background: 'var(--primary-color)',
      borderRadius: '50%',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      opacity: '0.3',
      animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
      animationDelay: Math.random() * 2 + 's'
    });
    
    heroSection.appendChild(element);
  }
}

// ===== INTERACTIONS AVANCÉES =====
function initializeAdvancedInteractions() {
  // Effet de survol sur les cartes de projet
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Effet de parallax sur les éléments
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const parallaxElements = document.querySelectorAll('.avatar-particles, .geometric-shapes');
    parallaxElements.forEach(element => {
      const speed = 0.05;
      const x = (mouseX - 0.5) * speed * 100;
      const y = (mouseY - 0.5) * speed * 100;
      
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
  
  // Animation des outils au survol
  const toolItems = document.querySelectorAll('.tool-item');
  toolItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-5px) rotateY(10deg)';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'translateY(0) rotateY(0deg)';
    });
  });
}

// ===== OPTIMISATIONS PERFORMANCE =====
function optimizePerformance() {
  // Lazy loading pour les images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // Throttle pour les événements de scroll
  let ticking = false;
  
  function updateOnScroll() {
    // Logique de scroll optimisée
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });
}

// ===== ACCESSIBILITÉ =====
function initializeAccessibility() {
  // Navigation au clavier
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
  
  // Réduction des animations pour les utilisateurs qui le préfèrent
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
  }
}

// ===== GESTION DES ERREURS =====
window.addEventListener('error', (e) => {
  console.error('Erreur JavaScript:', e.error);
  // Ici, vous pourriez envoyer l'erreur à un service de monitoring
});

// ===== INITIALISATION FINALE =====
document.addEventListener('DOMContentLoaded', () => {
  initializeAdvancedInteractions();
  optimizePerformance();
  initializeAccessibility();
});

// ===== UTILITAIRES =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===== EASTER EGGS =====
let konamiCode = [];
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.code);
  
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    activateEasterEgg();
    konamiCode = [];
  }
});

function activateEasterEgg() {
  // Effet spécial quand le code Konami est entré
  document.body.style.filter = 'hue-rotate(180deg)';
  showNotification('🎉 Code secret activé ! Mode Matrix ON', 'success');
  
  setTimeout(() => {
    document.body.style.filter = '';
  }, 5000);
}

// ===== EXPORT POUR TESTS =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeApp,
    updateActiveNavigation,
    validateField,
    isValidEmail
  };
}


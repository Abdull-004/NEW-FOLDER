// ======================
// IMPORTS & INITIALIZATION
// ======================
import { Howl } from 'howler';
import confetti from 'canvas-confetti';

// Initialize audio files
const sounds = {
  menuOpen: new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-arrow-whoosh-1491.mp3'], volume: 0.3 }),
  success: new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3'] }),
  error: new Howl({ src: ['https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3'] })
};

// ======================
// MOBILE MENU ENHANCEMENTS
// ======================
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('nav ul');
  const menuIcon = document.querySelector('.menu-icon');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('show');
      
      // Haptic feedback
      if ('vibrate' in navigator) navigator.vibrate(50);
      
      // Sound effect
      sounds.menuOpen.play();
      
      // Icon animation
      if (menuIcon) menuIcon.classList.toggle('active');
    });
  }

  // ======================
  // SMOOTH SCROLLING WITH VIBES
  // ======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu.classList.contains('show')) {
          navMenu.classList.remove('show');
          if (menuIcon) menuIcon.classList.remove('active');
        }
        
        // Celebration for important sections
        if (targetId === '#features' || targetId === '#demo') {
          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
            sounds.success.play();
          }, 800);
        }
      }
    });
  });
});

// ======================
// ENHANCED ANIMATIONS
// ======================
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate');
  
  elements.forEach((element, index) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.setProperty('--delay', `${index * 0.1}s`);
      element.classList.add('animated');
      
      // First-time celebration
      if (!element.dataset.celebrated && (element.id === 'features' || element.id === 'demo')) {
        element.dataset.celebrated = 'true';
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        sounds.success.play();
      }
    }
  });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ======================
// SUPAVASE ERROR HANDLING
// ======================
async function safeSupabaseOperation(operation) {
  try {
    const { data, error } = await operation;
    if (error) throw new Error(error.message);
    
    // Success feedback
    if (operation.method === 'insert') {
      sounds.success.play();
    }
    
    return data;
  } catch (error) {
    console.error('Supabase Error:', error);
    sounds.error.play();
    
    // Visual error toast
    const toast = document.createElement('div');
    toast.className = 'error-toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path fill="white" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <span>${error.message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 500);
    }, 3000);
    
    return null;
  }
}

// ======================
// HELPER FUNCTIONS
// ======================
function showConfetti() {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#4CAF50', '#2196F3', '#FFC107']
  });
}

// Initialize floating animations
function initFloatingElements() {
  document.querySelectorAll('.animate-float').forEach(el => {
    el.style.animationDelay = `${Math.random() * 2}s`;
  });
}

window.addEventListener('load', initFloatingElements);
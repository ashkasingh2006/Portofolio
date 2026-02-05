const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Smooth scrolling for nav links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  hero.style.transform = `translateY(${scrolled * 0.3}px)`;
});

// Enhanced hover effects for cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    cursor.style.background = 'rgba(118, 75, 162, 0.5)';
  });
  card.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.background = 'rgba(102, 126, 234, 0.5)';
  });
});

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.2)';
  });
  btn.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
  });
});

// Typing effect for hero text
const heroText = document.querySelector('.hero h1');
const text = heroText.textContent;
heroText.textContent = '';
let i = 0;

function typeWriter() {
  if (i < text.length) {
    heroText.textContent += text.charAt(i);
    i++;
    setTimeout(typeWriter, 100);
  }
}

setTimeout(typeWriter, 1000);

// Scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.width = '0%';
progressBar.style.height = '4px';
progressBar.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
progressBar.style.zIndex = '1001';
progressBar.style.transition = 'width 0.3s ease';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.offsetHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// Form submission with Formspree
const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const button = form.querySelector('button');
  const originalText = button.textContent;
  button.textContent = 'Sending...';
  button.style.background = '#28a745';
  button.disabled = true;

  const formData = new FormData(form);

  try {
    const response = await fetch('https://formspree.io/f/mnjpzagd', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      button.textContent = 'Message Sent!';
      form.reset();
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        button.disabled = false;
      }, 3000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    button.textContent = 'Error! Try Again';
    button.style.background = '#dc3545';
    setTimeout(() => {
      button.textContent = originalText;
      button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      button.disabled = false;
    }, 3000);
  }
});

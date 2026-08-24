/**
 * VANSH SAINI - MAIN APPLICATION CONTROLLER
 * Navigation, ScrollSpy, Skill Filters, Copy-to-Clipboard, Form Validation & Toasts
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ----------------- DOM Elements -----------------
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');
  const contactForm = document.getElementById('contact-form');
  const toastContainer = document.getElementById('toast-container');
  const backToTopBtn = document.getElementById('back-to-top');
  const copyButtons = document.querySelectorAll('[data-copy-text]');

  // ----------------- Sticky Header & ScrollSpy -----------------
  function handleScroll() {
    const scrollY = window.scrollY;

    // Header glass effect on scroll
    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link highlighting
    let currentSectionId = '';
    const scrollPosition = scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ----------------- Mobile Navigation Drawer -----------------
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on link click
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----------------- Skills Category Filter -----------------
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const categories = card.getAttribute('data-categories') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ----------------- Toast Notification System -----------------
  function showToast(message, type = 'info', duration = 3500) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let iconSvg = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `;

    if (type === 'success') {
      iconSvg = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      `;
    }

    toast.innerHTML = `
      ${iconSvg}
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger transition
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode === toastContainer) {
          toastContainer.removeChild(toast);
        }
      }, 300);
    }, duration);
  }

  // ----------------- One-Click Copy-to-Clipboard -----------------
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-text');
      const label = btn.getAttribute('data-copy-label') || 'Text';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for non-https or older environments
          const textArea = document.createElement('textarea');
          textArea.value = textToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          textArea.remove();
        }

        showToast(`Copied ${label} to clipboard: ${textToCopy}`, 'success');

        // Visual feedback on button
        const originalText = btn.innerHTML;
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg> Copied!
        `;
        btn.style.borderColor = '#10b981';
        btn.style.color = '#10b981';

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2000);
      } catch (err) {
        showToast(`Failed to copy automatically. Please copy manually: ${textToCopy}`, 'info');
      }
    });
  });

  // ----------------- Contact Form Handler -----------------
  if (contactForm) {
    const charCounter = document.getElementById('message-char-count');
    const messageInput = document.getElementById('form-message');

    if (messageInput && charCounter) {
      messageInput.addEventListener('input', () => {
        const length = messageInput.value.length;
        charCounter.textContent = `${length} / 500`;
      });
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name')?.value.trim();
      const email = document.getElementById('form-email')?.value.trim();
      const subject = document.getElementById('form-subject')?.value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('form-message')?.value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.', 'info');
        return;
      }

      // Email validation regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast('Please enter a valid email address.', 'info');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
          </svg> Sending...
        `;
      }

      // Compose mailto as universal fallback
      const mailtoLink = `mailto:vanshsainicse@gmail.com?subject=${encodeURIComponent(
        `[Portfolio] ${subject} from ${name}`
      )}&body=${encodeURIComponent(
        `Hello Vansh,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from Portfolio Website.`
      )}`;

      setTimeout(() => {
        showToast('Thank you! Your message has been prepared.', 'success', 4000);

        // Offer to launch user's default email client
        window.location.href = mailtoLink;

        contactForm.reset();
        if (charCounter) charCounter.textContent = '0 / 500';

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg> Send Message
          `;
        }
      }, 700);
    });
  }

  // ----------------- Scroll Reveal Observer -----------------
  if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.reveal-init');
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver not supported
    document.querySelectorAll('.reveal-init').forEach((el) => el.classList.add('revealed'));
  }

  // ----------------- Back To Top -----------------
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ----------------- Dynamic Profile Code Copy -----------------
  const copyCodeBtn = document.getElementById('copy-code-btn');
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      const codeSnippet = `const developer = {
  name: "Vansh Saini",
  role: "Computer Science Engineering Student",
  university: "Lovely Professional University (LPU)",
  batch: "2025–2029",
  passions: ["Web Development", "IoT", "Embedded Systems", "Hardware-Software Integration"],
  status: "Available for Internships & Projects"
};`;
      navigator.clipboard?.writeText(codeSnippet).then(() => {
        showToast('Developer profile snippet copied to clipboard!', 'success');
      });
    });
  }

  // ----------------- LinkedIn Placeholder Handler -----------------
  const linkedinLinks = document.querySelectorAll('.linkedin-placeholder');
  linkedinLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // If href is still a placeholder, notify the user gracefully
      if (link.getAttribute('href') === '#' || link.getAttribute('href').includes('placeholder')) {
        e.preventDefault();
        showToast('LinkedIn profile link placeholder — ready to be updated with Vansh Saini\'s personal handle.', 'info', 4000);
      }
    });
  });

  // Global helper
  window.showPortfolioToast = showToast;
});

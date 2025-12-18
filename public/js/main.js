// GTG Perfumes - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initMobileMenu();
  initGallery();
  initProductOptions();
  initAccordion();
  initCountUp();
  initLazyLoading();
});

// mobile-menu
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');
  
  if (!menuToggle || !mobileNav) return;

  menuToggle.addEventListener('click', function() {
    const isOpen = mobileNav.classList.contains('active');
    
    if (isOpen) {
      mobileNav.classList.remove('active');
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    } else {
      mobileNav.classList.add('active');
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    }
  });

  // Close menu when clicking on links
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('active');
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    });
  });
}

// products
function initGallery() {
  const galleryMain = document.getElementById('galleryMain');
  const thumbnails = document.querySelectorAll('.thumbnail');
  const dots = document.querySelectorAll('.gallery-dot');
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  
  if (!galleryMain) return;

  const images = [
    'assets/perfume-main.png',
    'assets/perfume-thumb-1.jpg',
    'assets/perfume-thumb-2.jpg',
    'assets/perfume-thumb-3.jpg',
    'assets/perfume-thumb-4.jpg',
    'assets/perfume-main.png',
    'assets/perfume-thumb-1.jpg',
    'assets/perfume-thumb-2.jpg'
  ];

  let currentIndex = 0;

  function updateGallery(index) {
    currentIndex = index;
    galleryMain.src = images[index];
    
    // Update thumbnails
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
    
    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Thumbnail clicks
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => updateGallery(index));
  });

  // Dot clicks
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateGallery(index));
  });

  // Arrow clicks
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
      updateGallery(newIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      updateGallery(newIndex);
    });
  }
}

// options
function initProductOptions() {
  const fragranceCards = document.querySelectorAll('.fragrance-card');
  const subscriptionHeaders = document.querySelectorAll('.subscription-header');
  const addToCartBtn = document.getElementById('addToCart');
  
  let selectedFragrance = 'original';
  let selectedPurchase = 'single';

  // Fragrance selection
  fragranceCards.forEach(card => {
    card.addEventListener('click', function() {
      fragranceCards.forEach(c => c.classList.remove('selected'));
      this.classList.add('selected');
      selectedFragrance = this.dataset.fragrance;
      updateCartLink();
    });
  });

  // Purchase type selection
  subscriptionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const card = this.closest('.subscription-card');
      const purchaseType = card.dataset.purchase;
      const content = card.querySelector('.subscription-content');
      const radioCircle = this.querySelector('.radio-circle');
      const chevron = this.querySelector('.chevron');

      // Update selection
      selectedPurchase = purchaseType;

      // Update all cards
      document.querySelectorAll('.subscription-card').forEach(c => {
        c.classList.remove('expanded');
        const rc = c.querySelector('.radio-circle');
        const cont = c.querySelector('.subscription-content');
        const chev = c.querySelector('.chevron');
        
        if (rc) {
          rc.classList.remove('selected');
          rc.innerHTML = '';
        }
        if (cont) cont.classList.remove('active');
        if (chev) {
          chev.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>';
        }
      });

      // Expand selected card
      card.classList.add('expanded');
      radioCircle.classList.add('selected');
      radioCircle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>';
      
      if (content && (purchaseType === 'single' || purchaseType === 'double')) {
        content.classList.add('active');
        if (chevron) {
          chevron.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>';
        }
      }

      updateCartLink();
    });
  });

  // Update cart link based on selections
  function updateCartLink() {
    const fragranceCode = {
      original: 'OG',
      lily: 'LY',
      rose: 'RS'
    };
    const purchaseCode = {
      single: 'SUB1',
      double: 'SUB2',
      'one-time': 'OTP'
    };

    const newLink = `https://example.com/cart/add?fragrance=${fragranceCode[selectedFragrance]}&type=${purchaseCode[selectedPurchase]}`;
    
    if (addToCartBtn) {
      addToCartBtn.href = newLink;
      console.log('Cart link updated:', newLink);
    }
  }

  // Initialize with default selection
  updateCartLink();
}

// accordian
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach((header, index) => {
    header.addEventListener('click', function() {
      const item = this.closest('.accordion-item');
      const content = item.querySelector('.accordion-content');
      const icon = this.querySelector('svg');
      const isOpen = content.classList.contains('active');

      // Close all accordions
      document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
      document.querySelectorAll('.accordion-header svg').forEach(svg => {
        svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>';
      });

      // Open clicked accordion if it was closed
      if (!isOpen) {
        content.classList.add('active');
        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>';
      }
    });
  });
}

// count-up animation
function initCountUp() {
  const statsSection = document.getElementById('statsSection');
  if (!statsSection) return;

  const countElements = document.querySelectorAll('.count-up');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);

  function animateCounters() {
    countElements.forEach((element, index) => {
      const target = parseInt(element.dataset.target);
      const suffix = element.dataset.suffix || '';
      const duration = 2000;
      const delay = index * 150;

      setTimeout(() => {
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
          } else {
            element.textContent = Math.floor(current) + suffix;
          }
        }, duration / steps);
      }, delay);
    });
  }
}

// lazy-loading
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      img.classList.add('loaded');
    });
  }
}
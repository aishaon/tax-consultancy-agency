/* ============================================
   Ajay & Safiullah Associates - AlpineJS Components
   ============================================ */

document.addEventListener('alpine:init', () => {

  /* ==========================================
     Navbar Component
     ========================================== */
  Alpine.data('navbar', () => ({
    mobileOpen: false,
    scrolled: false,
    hidden: false,
    lastScroll: 0,
    activeDropdown: null,

    init() {
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        this.scrolled = currentScroll > 80;

        if (currentScroll > 200) {
          this.hidden = currentScroll > this.lastScroll;
        } else {
          this.hidden = false;
        }

        this.lastScroll = currentScroll;
      });
    },

    toggleMobile() {
      this.mobileOpen = !this.mobileOpen;
      if (this.mobileOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },

    closeMobile() {
      this.mobileOpen = false;
      document.body.style.overflow = '';
    },

    toggleDropdown(name) {
      this.activeDropdown = this.activeDropdown === name ? null : name;
    },

    closeDropdown() {
      this.activeDropdown = null;
    }
  }));

  /* ==========================================
     FAQ Accordion Component
     ========================================== */
  Alpine.data('faqAccordion', () => ({
    activeItem: null,
    searchQuery: '',
    items: [],

    init() {
      this.items = this.$el.querySelectorAll('.faq-item');
    },

    toggle(index) {
      this.activeItem = this.activeItem === index ? null : index;
    },

    get filteredItems() {
      if (!this.searchQuery.trim()) {
        return Array.from(this.items);
      }
      const query = this.searchQuery.toLowerCase();
      return Array.from(this.items).filter(item => {
        const question = item.querySelector('.faq-question')?.textContent?.toLowerCase() || '';
        const answer = item.querySelector('.faq-answer')?.textContent?.toLowerCase() || '';
        return question.includes(query) || answer.includes(query);
      });
    }
  }));

  /* ==========================================
     Counter Animation Component
     ========================================== */
  Alpine.data('counter', () => ({
    value: 0,
    target: 0,
    suffix: '',
    prefix: '',
    observed: false,

    init() {
      this.target = parseInt(this.$el.getAttribute('data-target')) || 0;
      this.suffix = this.$el.getAttribute('data-suffix') || '';
      this.prefix = this.$el.getAttribute('data-prefix') || '';

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.observed) {
            this.observed = true;
            this.animate();
          }
        });
      }, { threshold: 0.5 });

      observer.observe(this.$el);
    },

    animate() {
      const duration = 2000;
      const start = 0;
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        this.value = Math.floor(start + (this.target - start) * easeOut);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          this.value = this.target;
        }
      };

      requestAnimationFrame(step);
    }
  }));

  /* ==========================================
     Testimonials Component
     ========================================== */
  Alpine.data('testimonials', () => ({
    current: 0,
    autoplayInterval: null,

    testimonials: [
      {
        name: 'Mohammad Rahim',
        role: 'Business Owner, Rangpur',
        content: 'Ajay & Safiullah Associates handled my VAT registration and tax filing with utmost professionalism. Their team made the entire process smooth and hassle-free. Highly recommended for any tax-related services.',
        rating: 5,
        initials: 'MR'
      },
      {
        name: 'Fatima Begum',
        role: 'Managing Director, Fatima Group',
        content: 'I have been using their accounting and tax planning services for over two years. Their attention to detail and deep knowledge of Bangladesh tax laws is impressive. Peace of mind knowing my finances are in good hands.',
        rating: 5,
        initials: 'FB'
      },
      {
        name: 'Abul Hasan',
        role: 'Entrepreneur, Dhaka',
        content: 'Professional, reliable, and extremely knowledgeable. They helped me with TIN registration and tax return filing. The process was explained clearly and completed ahead of schedule. Excellent service!',
        rating: 5,
        initials: 'AH'
      },
      {
        name: 'Shamima Akhter',
        role: 'CEO, Shamima Enterprises',
        content: 'Their VAT consultancy service is top-notch. As a growing business, compliance was a challenge until we found this team. They handle everything from BIN registration to monthly VAT returns. Truly expert consultants.',
        rating: 5,
        initials: 'SA'
      },
      {
        name: 'Kamal Hossain',
        role: 'Chartered Accountant',
        content: 'I refer clients to Ajay & Safiullah Associates for their tax planning needs. Their team demonstrates exceptional expertise in Bangladesh tax regulations. A trusted partner for financial consultancy.',
        rating: 5,
        initials: 'KH'
      }
    ],

    init() {
      this.startAutoplay();
    },

    next() {
      this.current = (this.current + 1) % this.testimonials.length;
      this.resetAutoplay();
    },

    prev() {
      this.current = (this.current - 1 + this.testimonials.length) % this.testimonials.length;
      this.resetAutoplay();
    },

    goTo(index) {
      this.current = index;
      this.resetAutoplay();
    },

    startAutoplay() {
      this.autoplayInterval = setInterval(() => {
        this.next();
      }, 5000);
    },

    resetAutoplay() {
      clearInterval(this.autoplayInterval);
      this.startAutoplay();
    }
  }));

  /* ==========================================
     Modal Component
     ========================================== */
  Alpine.data('modal', () => ({
    open: false,
    currentImage: '',

    openModal(imageSrc) {
      this.currentImage = imageSrc;
      this.open = true;
      document.body.style.overflow = 'hidden';
    },

    closeModal() {
      this.open = false;
      document.body.style.overflow = '';
    }
  }));

  /* ==========================================
     Toast Notification Component
     ========================================== */
  Alpine.data('toast', () => ({
    show: false,
    message: '',
    type: 'success',
    timeout: null,

    notify(msg, type = 'success') {
      this.message = msg;
      this.type = type;
      this.show = true;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.show = false;
      }, 4000);
    },

    close() {
      this.show = false;
      clearTimeout(this.timeout);
    }
  }));

  /* ==========================================
     Appointment Form Component
     ========================================== */
  Alpine.data('appointmentForm', () => ({
    formData: {
      name: '',
      phone: '',
      email: '',
      service: '',
      date: '',
      message: ''
    },
    errors: {},
    submitted: false,
    loading: false,

    services: [
      'Income Tax Filing',
      'VAT Consultancy',
      'Tax Return Preparation',
      'Tax Planning',
      'Accounting Services',
      'Bookkeeping',
      'Payroll Management',
      'Business Registration',
      'BIN Registration',
      'TIN Registration',
      'RJSC Services',
      'Trade License',
      'Company Formation',
      'Financial Consultancy',
      'Audit Support'
    ],

    validate() {
      this.errors = {};

      if (!this.formData.name.trim()) {
        this.errors.name = 'Name is required';
      }

      if (!this.formData.phone.trim()) {
        this.errors.phone = 'Phone number is required';
      } else if (!/^[\d\s\-\+\(\)]{8,}$/.test(this.formData.phone)) {
        this.errors.phone = 'Please enter a valid phone number';
      }

      if (this.formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
        this.errors.email = 'Please enter a valid email';
      }

      if (!this.formData.service) {
        this.errors.service = 'Please select a service';
      }

      if (!this.formData.date) {
        this.errors.date = 'Please select a preferred date';
      }

      return Object.keys(this.errors).length === 0;
    },

    submit() {
      if (!this.validate()) return;

      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.submitted = true;
        this.formData = {
          name: '', phone: '', email: '',
          service: '', date: '', message: ''
        };
      }, 2000);
    },

    reset() {
      this.submitted = false;
      this.errors = {};
    }
  }));

  /* ==========================================
     Contact Form Component
     ========================================== */
  Alpine.data('contactForm', () => ({
    formData: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    },
    errors: {},
    submitted: false,
    loading: false,

    validate() {
      this.errors = {};

      if (!this.formData.name.trim()) this.errors.name = 'Name is required';
      if (!this.formData.email.trim()) {
        this.errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
        this.errors.email = 'Invalid email address';
      }
      if (!this.formData.phone.trim()) this.errors.phone = 'Phone is required';
      if (!this.formData.subject.trim()) this.errors.subject = 'Subject is required';
      if (!this.formData.message.trim()) this.errors.message = 'Message is required';

      return Object.keys(this.errors).length === 0;
    },

    submit() {
      if (!this.validate()) return;
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.submitted = true;
      }, 2000);
    }
  }));

  /* ==========================================
     Dark Mode Toggle
     ========================================== */
  Alpine.data('themeToggle', () => ({
    dark: false,

    init() {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
        this.dark = true;
        document.documentElement.classList.add('dark');
      }
    },

    toggle() {
      this.dark = !this.dark;
      if (this.dark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  }));

  /* ==========================================
     Services Filter (for Gallery)
     ========================================== */
  Alpine.data('galleryFilter', () => ({
    activeFilter: 'all',

    items: [
      { id: 1, category: 'office', title: 'Our Office', image: '' },
      { id: 2, category: 'team', title: 'Team Meeting', image: '' },
      { id: 3, category: 'event', title: 'Seminar 2024', image: '' },
      { id: 4, category: 'office', title: 'Reception Area', image: '' },
      { id: 5, category: 'team', title: 'Consultants Team', image: '' },
      { id: 6, category: 'event', title: 'Client Workshop', image: '' },
      { id: 7, category: 'office', title: 'Conference Room', image: '' },
      { id: 8, category: 'certificate', title: 'NBR Certificate', image: '' }
    ],

    get filteredItems() {
      if (this.activeFilter === 'all') return this.items;
      return this.items.filter(item => item.category === this.activeFilter);
    },

    setFilter(filter) {
      this.activeFilter = filter;
    }
  }));

  /* ==========================================
     Blog Search Component
     ========================================== */
  Alpine.data('blogSearch', () => ({
    searchQuery: '',
    selectedCategory: 'all',

    categories: ['All', 'Tax', 'VAT', 'Accounting', 'Business'],

    posts: [
      {
        id: 1,
        title: 'Understanding Income Tax in Bangladesh: A Complete Guide for 2024-2025',
        excerpt: 'Income tax is a crucial aspect of financial planning for individuals and businesses in Bangladesh. This comprehensive guide covers everything you need to know about income tax rates, filing deadlines, deductions, and exemptions.',
        category: 'Tax',
        date: 'June 15, 2026',
        author: 'Ajay & Safiullah Associates',
        image: '',
        slug: 'understanding-income-tax-bangladesh'
      },
      {
        id: 2,
        title: 'VAT Registration in Bangladesh: Step-by-Step Process for New Businesses',
        excerpt: 'Value Added Tax (VAT) registration is mandatory for businesses meeting certain thresholds. Learn the complete process of VAT registration, required documents, and compliance requirements.',
        category: 'VAT',
        date: 'June 10, 2026',
        author: 'Ajay & Safiullah Associates',
        image: '',
        slug: 'vat-registration-bangladesh'
      },
      {
        id: 3,
        title: 'Tax Planning Strategies for Small Businesses in Bangladesh',
        excerpt: 'Effective tax planning can help small businesses minimize tax liability while ensuring compliance with Bangladesh tax laws. Discover proven strategies for tax optimization.',
        category: 'Tax',
        date: 'June 5, 2026',
        author: 'Ajay & Safiullah Associates',
        image: '',
        slug: 'tax-planning-small-business'
      },
      {
        id: 4,
        title: 'Essential Bookkeeping Practices for Bangladeshi Enterprises',
        excerpt: 'Proper bookkeeping is the foundation of financial success. Learn essential bookkeeping practices that every Bangladeshi business should implement for better financial management.',
        category: 'Accounting',
        date: 'May 28, 2026',
        author: 'Ajay & Safiullah Associates',
        image: '',
        slug: 'essential-bookkeeping-practices'
      },
      {
        id: 5,
        title: 'How to Register a Company in Bangladesh: Complete Guide 2026',
        excerpt: 'Starting a business in Bangladesh requires proper registration with RJSC. This guide walks you through the entire company registration process, from name clearance to incorporation.',
        category: 'Business',
        date: 'May 20, 2026',
        author: 'Ajay & Safiullah Associates',
        image: '',
        slug: 'register-company-bangladesh'
      },
      {
        id: 6,
        title: 'VAT Return Filing: Common Mistakes and How to Avoid Them',
        excerpt: 'Filing VAT returns correctly is essential for compliance. Avoid these common mistakes that Bangladeshi businesses make when filing their VAT returns.',
        category: 'VAT',
        date: 'May 15, 2026',
        author: 'Ajay & Safiullah Associates',
        image: '',
        slug: 'vat-return-common-mistakes'
      }
    ],

    get filteredPosts() {
      let result = this.posts;

      if (this.selectedCategory !== 'All') {
        result = result.filter(p => p.category === this.selectedCategory);
      }

      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        result = result.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
        );
      }

      return result;
    },

    setCategory(cat) {
      this.selectedCategory = cat;
    }
  }));
});

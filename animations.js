const faders = document.querySelectorAll('.fade-in-up');

const appearOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});
const toggleBtn = document.getElementById('theme-toggle');

document.addEventListener('DOMContentLoaded', () => {
  const isDark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
});

toggleBtn.addEventListener('click', () => {
  const nowDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', nowDark ? 'dark' : 'light');
});

// EmailJS Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm && submitBtn && formStatus) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate EmailJS is loaded
      if (typeof emailjs === 'undefined') {
        formStatus.style.color = '#ff4444';
        formStatus.textContent = '✗ Email service not loaded. Please refresh the page.';
        return;
      }
      
      // Disable submit button and show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      formStatus.textContent = '';
      formStatus.style.color = '#ffd700';
      
      // Send email using EmailJS
      emailjs.sendForm(
        'service_3ibdfbk',    // EmailJS Service ID
        'q4ih6c9',            // EmailJS Template ID
        this
      )
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        formStatus.style.color = '#00ff00';
        formStatus.textContent = '✓ Message sent successfully!';
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
        }, 5000);
      })
      .catch(function(error) {
        console.log('FAILED...', error);
        formStatus.style.color = '#ff4444';
        formStatus.textContent = '✗ Failed to send: ' + (error.text || 'Please try again');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      });
    });
  }
});


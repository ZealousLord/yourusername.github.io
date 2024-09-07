document.addEventListener('DOMContentLoaded', (event) => {
    // Navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.getAttribute('href').substring(1);
            loadPage(page);
        });
    });

    // Book Now buttons
    const bookNowButtons = document.querySelectorAll('.book-now, .book-service');
    bookNowButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const service = e.target.dataset.service || '';
            loadPage('booking', { service });
        });
    });

    // Form submissions
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', handleEmailSubmit);
    }

    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // Initial page load
    const initialPage = window.location.hash.substring(1) || 'home';
    loadPage(initialPage);
});

function loadPage(page, data = {}) {
    fetch(`${page}.html`)
        .then(response => response.text())
        .then(html => {
            document.querySelector('main').innerHTML = html;
            window.location.hash = `#${page}`;
            
            if (page === 'portfolio') {
                loadPortfolioContent();
            } else if (page === 'booking') {
                prefillBookingForm(data);
            }
        })
        .catch(error => console.error('Error loading page:', error));
}

function loadPortfolioContent() {
    // In a real application, this would fetch data from a server
    const teamMembers = [
        { name: 'John Doe', role: 'Lead Photographer' },
        { name: 'Jane Smith', role: 'Videographer' },
        // ... more team members ...
    ];

    const workShowcase = [
        { title: 'Beach Wedding', image: 'beach-wedding.jpg' },
        { title: 'Product Shoot', image: 'product-shoot.jpg' },
        // ... more portfolio items ...
    ];

    const teamSection = document.getElementById('team-members');
    teamMembers.forEach(member => {
        const memberElement = document.createElement('div');
        memberElement.innerHTML = `<h3>${member.name}</h3><p>${member.role}</p>`;
        teamSection.appendChild(memberElement);
    });

    const workSection = document.getElementById('work-showcase');
    workShowcase.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `<img src="${item.image}" alt="${item.title}"><p>${item.title}</p>`;
        workSection.appendChild(itemElement);
    });
}

function prefillBookingForm(data) {
    const serviceSelect = document.querySelector('select[name="service"]');
    if (serviceSelect && data.service) {
        serviceSelect.value = data.service;
    }
}

function handleEmailSubmit(e) {
    e.preventDefault();
    // In a real application, this would send the form data to a server
    console.log('Email form submitted');
    alert('Thank you for your message. We will get back to you soon!');
}

function handleBookingSubmit(e) {
    e.preventDefault();
    // In a real application, this would send the booking data to a server
    console.log('Booking form submitted');
    alert('Thank you for your booking. We will confirm your appointment soon!');
}

// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    // Animate menu appearance
    if (!menu.classList.contains('hidden')) {
        menu.classList.add('animate-pulse-glow');
        setTimeout(() => {
            menu.classList.remove('animate-pulse-glow');
        }, 500);
    }
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('bg-oniyx-black/95', 'shadow-lg');
        navbar.classList.remove('bg-oniyx-black/80');
    } else {
        navbar.classList.remove('bg-oniyx-black/95', 'shadow-lg');
        navbar.classList.add('bg-oniyx-black/80');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for navbar height
                behavior: 'smooth'
            });
            // Close mobile menu if open
            if (!menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
            }
        }
    });
});

// Payment Modal Logic
const paymentModal = document.getElementById('payment-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const paymentForm = document.getElementById('payment-form');
const checkoutAmount = document.getElementById('checkout-amount');
const paymentLoading = document.getElementById('payment-loading');
const paymentSuccess = document.getElementById('payment-success');
const paymentFormContainer = document.getElementById('payment-form-container');
const closeSuccessBtn = document.getElementById('close-success');

// Function to open modal
function openModal(price) {
    checkoutAmount.textContent = price;
    paymentModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to close modal
function closeModal() {
    paymentModal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
    // Reset form states
    setTimeout(() => {
        paymentForm.reset();
        paymentLoading.classList.add('hidden');
        paymentSuccess.classList.add('hidden');
        paymentFormContainer.classList.remove('hidden');
    }, 300);
}

// Event Listeners for Closing
closeModalBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);
closeSuccessBtn.addEventListener('click', closeModal);

// Attach Event Listeners to "Add to Cart" Buttons
document.querySelectorAll('.fa-shopping-cart').forEach(icon => {
    const btn = icon.closest('button');
    if (btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Find price in the closest product card
            const productCard = btn.closest('.group'); // Using 'group' class from the card container
            if (productCard) {
                // Look for the price inside the card
                // The structure is .p-6 -> .flex -> span
                const priceElement = productCard.querySelector('span.text-xl');
                if (priceElement) {
                    openModal(priceElement.textContent);
                }
            }
        });
    }
});

// Mock Payment Processing
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show Loading
    paymentLoading.classList.remove('hidden');

    // Simulate API Call (2 seconds)
    setTimeout(() => {
        // Hide Form
        paymentFormContainer.classList.add('hidden');

        // Show Success
        paymentSuccess.classList.remove('hidden');
        paymentLoading.classList.add('hidden');

        // Optional: Confetti or success sound could be added here
    }, 2000);
});

// Input Formatting (Optional but nice)
const cardInput = document.querySelector('input[placeholder="0000 0000 0000 0000"]');
if (cardInput) {
    cardInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = value.substring(0, 19);
    });
}

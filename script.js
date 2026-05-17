document.addEventListener('DOMContentLoaded', () => {
    
    // --- CAROUSEL FUNCTIONALITY ---
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Images array
    const imagePath = 'images/';
    const images = [
        'Designer  Street(2).png',
        'Designer  office 2(2).png',
        'Designer (2).png',
        'Designer (Deportivo).png',
        'Designer En uso  (2).png',
        'Designer office (2).png',
        'landing_img_1.png',
        'landing_img_4.png',
        'landing_img_5.png',
        'landing_img_6.png',
        'landing_img_7.png'
    ];

    // Populate carousel
    images.forEach(img => {
        const li = document.createElement('li');
        li.className = 'carousel-slide';
        const imageElement = document.createElement('img');
        imageElement.src = `${imagePath}${img}`;
        imageElement.alt = 'Invicta I-Tech 006 View';
        li.appendChild(imageElement);
        carouselTrack.appendChild(li);
    });

    const slides = Array.from(carouselTrack.children);
    let currentIndex = 0;

    function updateCarousel() {
        const slideWidth = slides[0].getBoundingClientRect().width;
        carouselTrack.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        updateCarousel();
    });

    // Handle window resize for carousel
    window.addEventListener('resize', updateCarousel);


    // --- CART FUNCTIONALITY ---
    let cart = [];
    const productPrice = 700000;
    
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.getElementById('closeCart');
    const overlay = document.getElementById('overlay');
    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalValue = document.getElementById('cartTotalValue');
    const addToCartHero = document.getElementById('addToCartHero');

    function toggleCart() {
        cartModal.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    cartBtn.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);

    function formatPrice(price) {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
    }

    function renderCart() {
        cartCount.textContent = cart.length;
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">El carrito está vacío</p>';
            cartTotalValue.textContent = '$0';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>${formatPrice(item.price)}</p>
                </div>
                <button class="remove-item" data-index="${index}"><i class="fas fa-trash"></i></button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        cartTotalValue.textContent = formatPrice(total);

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.getAttribute('data-index'));
                cart.splice(index, 1);
                renderCart();
            });
        });
    }

    addToCartHero.addEventListener('click', () => {
        cart.push({
            name: 'INVICTA I-TECH 006',
            price: productPrice
        });
        renderCart();
        toggleCart();
    });


    // --- LEAD GENERATION FORM ---
    const leadForm = document.getElementById('leadForm');
    
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        
        // Simulating form submission
        const submitBtn = leadForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Registro Exitoso!';
            submitBtn.style.background = '#10b981'; // Green color for success
            
            // Show alert
            alert(`¡Gracias ${name}! Te has registrado correctamente para el sorteo y tu descuento del 15%. Revisa tu correo electrónico para más detalles.`);
            
            // Reset form
            leadForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
            
        }, 1500);
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

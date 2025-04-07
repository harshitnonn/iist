  // Sample product data (replace with actual data loading)
  const products = [
    { id: 1, name: 'Capsicum (SHIMLA)', category: 'vegetables', price: 8000, unit: '100KG', image: 'image/capsicum.jpg', description: 'Fresh and high-quality Capsicum from Shimla.', longDescription: "These capsicums are sourced directly from farmers in Shimla, known for their superior quality. They are perfect for a variety of culinary uses." },
    { id: 2, name: 'Gram (चने)', category: 'pulses', price: 8000, unit: '100KG', image: 'image/gram.jpg', description: 'High-quality Gram.', longDescription: "This gram is carefully harvested and processed to retain its natural flavor and nutritional value.  It's a staple food, rich in protein and fiber." },
    { id: 3, name: 'Wheat (गेहूँ)', category: 'grains', price: 5000, unit: '100KG', image: 'image/wheat.jpg', description: 'Lockwon Gehu.', longDescription: "Premium Lockwon wheat, known for its excellent milling quality and taste. Ideal for making chapatis and other Indian breads." },
    { id: 4, name: 'Garlic (लहसुन)', category: 'vegetables', price: 12000, unit: '100KG', image: 'image/garlic.jpg', description: 'Tulsfa Garlic.', longDescription: "Fresh Tulsfa garlic, known for its strong aroma and flavor.  A must-have ingredient in many Indian dishes." },
    { id: 5, name: 'Onion (प्याज)', category: 'vegetables', price: 6000, unit: '100KG', image: 'image/onion.jpg', description: 'Fresh Onions.', longDescription: "These onions are freshly harvested and of the highest quality.  They are versatile and essential for everyday cooking." },
    { id: 6, name: 'Green Chilli (हरी मिर्च)', category: 'vegetables', price: 10000, unit: '100KG', image: 'image/mirchi.jpg', description: 'Fresh Green Chilli.', longDescription: "Freshly picked green chillies, perfect for adding spice to your dishes. High in vitamins and flavor." },
    { id: 7, name: 'Green Coriander (हरी धनिया)', category: 'vegetables', price: 5000, unit: '100KG', image: 'image/corinder.jpg', description: 'Fresh Green Coriander.', longDescription: "Fresh green coriander, adds a wonderful aroma and flavor to your cooking.  Rich in antioxidants." },
    { id: 8, name: 'Mango (आम)', category: 'fruits', price: 7000, unit: '100KG', image: 'image/mangoes.jpg', description: 'Mangoes', longDescription: "Delicious Alphonso mangoes, known for their sweetness and flavor.  The king of fruits!" },
    { id: 9, name: 'Apple (सेब)', category: 'fruits', price: 9000, unit: '100KG', image: 'image/apple.jpg', description: 'Apples', longDescription: "Crisp and juicy Kashmiri apples, grown in the pristine valleys of Kashmir.  High in fiber and taste." },
    { id: 10, name: 'Banana (केला)', category: 'fruits', price: 3000, unit: '100KG', image: 'image/Banana.jpg', description: 'Banana', longDescription: "Fresh Yellaki bananas, a good source of potassium and energy.  Perfect for a quick snack." },
];

let cart = JSON.parse(localStorage.getItem('kisanmartCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('kisanmartWishlist')) || [];
let loggedInUser = JSON.parse(localStorage.getItem('kisanmartUser')) || null;
let orders = JSON.parse(localStorage.getItem('kisanmartOrders')) || [];

// Get DOM elements
const productList = document.getElementById('product-list');
const categoryList = document.getElementById('category-list');
const sortOptions = document.getElementById('sort-options');
const productDetailsModal = document.getElementById('product-details');
const cartPage = document.getElementById('cart-page');
const wishlistPage = document.getElementById('wishlist-page');
const profilePage = document.getElementById('profile-page');
const orderHistoryPage = document.getElementById('order-history-page');
const liveBiddingPage = document.getElementById('live-bidding-page');
const aboutUsPage = document.getElementById('about-us-page');
const contactUsPage = document.getElementById('contact-us-page');

const cartLink = document.getElementById('cart-link');
const profileLink = document.getElementById('profile-link');
const orderHistoryLink = document.getElementById('order-history-link');
const wishlistLink = document.getElementById('wishlist-link');
const logoutLink = document.getElementById('logout-link');
const homeLink = document.querySelector('.home-link');
const liveBiddingLink = document.getElementById('live-bidding-link');
const aboutUsLink = document.getElementById('about-us-link');
const contactUsLink = document.getElementById('contact-us-link');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');


let selectedProductId = null;

// Function to render product list
function renderProductList(productsToRender) {
    productList.innerHTML = '';
    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.dataset.productId = product.id;
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="price">₹${product.price} / ${product.unit}</p>
            <p class="description">${product.description}</p>
            <div class="actions">
                <button class="add-to-cart"><i class="fas fa-shopping-basket"></i> Add to Cart</button>
                <button class="view-details"><i class="fas fa-eye"></i> View Details</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Function to show product details
function showProductDetails(productId) {
    selectedProductId = productId;
    const product = products.find(p => p.id === productId);
    if (product) {
        productDetailsModal.style.display = 'block';
        productDetailsModal.querySelector('#product-name').textContent = product.name;
        productDetailsModal.querySelector('#product-image').src = product.image;
        productDetailsModal.querySelector('#product-price').textContent = `₹${product.price} / ${product.unit}`;
        productDetailsModal.querySelector('#product-description').textContent = product.description;
        productDetailsModal.querySelector('#product-long-description').textContent = product.longDescription;
    }
}

// Function to add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('kisanmartCart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
        updateCartLink();
    }
}

// Function to add product to wishlist
function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = wishlist.find(item => item.id === productId);
        if (!existingItem) {
            wishlist.push({ ...product, quantity: 1 });
            localStorage.setItem('kisanmartWishlist', JSON.stringify(wishlist));
            alert(`${product.name} added to wishlist!`);
            updateWishlistLink();
        } else {
            alert(`${product.name} is already in your wishlist!`);
        }
    }
}

// Function to render cart items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        const tbody = table.querySelector('tbody');
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}"></td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price} / ${item.unit}</td>
                <td>₹${(item.price * item.quantity).toFixed(2)}</td>
                <td><span class="remove-item" data-product-id="${item.id}">&times;</span></td>
            `;
            tbody.appendChild(row);
            total += item.price * item.quantity;
        });
        cartItemsContainer.appendChild(table);
        document.getElementById('cart-total').textContent = total.toFixed(2);
    }
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('kisanmartCart', JSON.stringify(cart));
    renderCartItems();
    updateCartLink();
    if (cart.length === 0) {
        cartPage.style.display = 'none';
    }
}

// Function to render wishlist items
function renderWishlistItems() {
    const wishlistItemsContainer = document.getElementById('wishlist-items');
    wishlistItemsContainer.innerHTML = '';
    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = '<p>Your wishlist is empty.</p>';
    } else {
        wishlist.forEach(item => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.productId = item.id;
            productCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h2>${item.name}</h2>
                <p class="price">₹${item.price} / ${item.unit}</p>
                <div class="actions">
                    <button class="remove-wishlist-item" data-product-id="${item.id}"><i class="fas fa-trash"></i> Remove</button>
                    <button class="add-to-cart" data-product-id="${item.id}"><i class="fas fa-shopping-basket"></i> Add to Cart</button>
                </div>
            `;
            wishlistItemsContainer.appendChild(productCard);
        });
    }
}

// Function to remove item from wishlist
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('kisanmartWishlist', JSON.stringify(wishlist));
    renderWishlistItems();
    updateWishlistLink();
    if (wishlist.length === 0) {
        wishlistPage.style.display = 'none';
    }
}

// Function to update cart link
function updateCartLink() {
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartLink.textContent = `My Cart (${totalQuantity})`;
}

// Function to update wishlist link
function updateWishlistLink() {
    wishlistLink.textContent = `Wishlist (${wishlist.length})`;
}

// Function to handle sorting
function handleSort(event) {
    const value = event.target.value;
    let sortedProducts = [...products];
    switch (value) {
        case 'price-low-to-high':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high-to-low':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-a-z':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-z-a':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            break;
    }
    renderProductList(sortedProducts);
}

// Function to handle category filter
function handleCategoryFilter(category) {
    let filteredProducts;
    if (category === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }
    renderProductList(filteredProducts);
}

// Function to handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    renderProductList(filteredProducts);
}

// Function to show user profile
function showUserProfile() {
    if (loggedInUser) {
        profilePage.style.display = 'block';
        const form = profilePage.querySelector('form');
        form.querySelector('#name').value = loggedInUser.name;
        form.querySelector('#email').value = loggedInUser.email;
        form.querySelector('#phone').value = loggedInUser.phone;
        form.querySelector('#address').value = loggedInUser.address;
    } else {
        alert('Please log in to view your profile.');
    }
}

// Function to update user profile
function updateUserProfile(event) {
    event.preventDefault();
    const form = event.target;
    loggedInUser = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        address: form.address.value,
    };
    localStorage.setItem('kisanmartUser', JSON.stringify(loggedInUser));
    alert('Profile updated successfully!');
    profilePage.style.display = 'none';
}

// Function to show order history
function showOrderHistory() {
    if (loggedInUser) {
        orderHistoryPage.style.display = 'block';
        const orderHistoryList = document.getElementById('order-history-list');
        orderHistoryList.innerHTML = '';
        if (orders.length === 0) {
            orderHistoryList.innerHTML = '<p>No orders found.</p>';
        } else {
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;
            const tbody = table.querySelector('tbody');
            orders.forEach(order => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${order.orderId}</td>
                    <td>${order.date}</td>
                    <td>
                        <ul>
                            ${order.items.map(item => `<li>${item.name} x ${item.quantity}</li>`).join('')}
                        </ul>
                    </td>
                    <td>₹${order.total.toFixed(2)}</td>
                    <td>${order.status}</td>
                `;
                tbody.appendChild(row);
            });
            orderHistoryList.appendChild(table);
        }
    } else {
        alert('Please log in to view your order history.');
    }
}

// Function to handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
     if (!loggedInUser) {
        alert('Please log in to checkout.');
        return;
    }

    const orderId = Math.floor(Math.random() * 1000000);
    const date = new Date().toLocaleDateString();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const status = 'Order Placed';
    const items = cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
    }));

    const order = { orderId, date, items, total, status };
    orders.push(order);
    localStorage.setItem('kisanmartOrders', JSON.stringify(orders));
    localStorage.setItem('kisanmartCart', JSON.stringify([]));
    cart = [];
    alert(`Order placed successfully! Your Order ID is ${orderId}`);
    renderCartItems();
    updateCartLink();
    cartPage.style.display = 'none';
    // Redirect to order history
    showOrderHistory();
}

// Function to show live bidding items (replace with actual data fetching)
function renderLiveBiddingItems() {
    const liveBiddingList = document.getElementById('live-bidding-list');
    liveBiddingList.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Current Bid</th>
                    <th>Your Bid</th>
                    <th>Time Remaining</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Organic Tomatoes</td>
                    <td id="tomato-current-bid">₹150</td>
                    <td><input type="number" class="bid-input" id="tomato-bid-input" value="160"></td>
                    <td id="tomato-timer">00:10:00</td>
                    <td><button class="bid-button" data-product-id="1">Place Bid</button></td>
                </tr>
                <tr>
                    <td>Fresh Carrots</td>
                    <td id="carrot-current-bid">₹120</td>
                    <td><input type="number" class="bid-input" id="carrot-bid-input" value="130"></td>
                    <td id="carrot-timer">00:15:00</td>
                    <td><button class="bid-button" data-product-id="2">Place Bid</button></td>
                </tr>
            </tbody>
        </table>
    `;
    // Add sample bidding logic (replace with real-time updates)
    const bidButtons = liveBiddingList.querySelectorAll('.bid-button');
    bidButtons.forEach(button => {
        button.addEventListener('click', handleBid);
    });
    startBidTimer(1, 'tomato-timer', 600); // 10 minutes
    startBidTimer(2, 'carrot-timer', 900); // 15 minutes
}

const biddingIntervals = {};
// Function to start bid timer
function startBidTimer(productId, timerId, duration) {
    let timeRemaining = duration;
    const timerDisplay = document.getElementById(timerId);
    if (biddingIntervals[productId]) {
      clearInterval(biddingIntervals[productId]);
    }

    biddingIntervals[productId] = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        if (timeRemaining <= 0) {
            clearInterval(biddingIntervals[productId]);
            // End bidding logic here (e.g., determine winner, update database)
            timerDisplay.textContent = 'Bidding Ended';
            // Disable the bid button
            const bidButton = document.querySelector(`[data-product-id="${productId}"]`);
            if (bidButton) {
                 bidButton.disabled = true;
            }
            console.log(`Bidding ended for product ${productId}`);
        }
        timeRemaining--;
    }, 1000);
}

// Function to handle bid submission
function handleBid(event) {
    const productId = parseInt(event.target.dataset.productId);
    const bidInput = document.getElementById(productId === 1 ? 'tomato-bid-input' : 'carrot-bid-input');
    const bidAmount = parseFloat(bidInput.value);
    const currentBidDisplay = document.getElementById(productId === 1 ? 'tomato-current-bid' : 'carrot-current-bid');
    let currentBid = parseFloat(currentBidDisplay.textContent.replace('₹', ''));

    if (bidAmount > currentBid) {
        currentBid = bidAmount;
        currentBidDisplay.textContent = `₹${bidAmount}`;
        // Update database with new bid
        console.log(`Bid of ₹{bidAmount} placed for product ₹{productId}`);
        alert(`Your bid of ₹{bidAmount} is now the highest bid!`);
    } else {
        alert('Please enter a bid higher than the current bid.');
    }
    bidInput.value = currentBid + 10;
}

// Function to handle logout
function handleLogout() {
    loggedInUser = null;
    localStorage.removeItem('kisanmartUser');
    alert('Logged out successfully!');
    // Redirect to home page
    homeLink.click();
}

// Event Listeners
productList.addEventListener('click', (event) => {
    const target = event.target;
    const productCard = target.closest('.product-card');
    if (productCard) {
        const productId = parseInt(productCard.dataset.productId);
        if (target.classList.contains('view-details')) {
            showProductDetails(productId);
        } else if (target.classList.contains('add-to-cart')) {
            addToCart(productId);
        }
    }
});

productDetailsModal.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('close-btn')) {
        productDetailsModal.style.display = 'none';
    } else if (target.id === 'add-to-cart-details') {
        addToCart(selectedProductId);
        productDetailsModal.style.display = 'none';
    } else if (target.id === 'add-to-wishlist-details'){
        addToWishlist(selectedProductId);
        productDetailsModal.style.display = 'none';
    }
});

cartLink.addEventListener('click', (event) => {
    event.preventDefault();
    cartPage.style.display = 'block';
    renderCartItems();
});

cartPage.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('close-btn')) {
        cartPage.style.display = 'none';
    } else if (target.classList.contains('remove-item')) {
        const productId = parseInt(target.dataset.productId);
        removeFromCart(productId);
    } else if (target.id === 'cart-checkout') {
        handleCheckout();
    }
});

wishlistLink.addEventListener('click', (event) => {
    event.preventDefault();
    wishlistPage.style.display = 'block';
    renderWishlistItems();
});

wishlistPage.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('close-btn')) {
        wishlistPage.style.display = 'none';
    } else if (target.classList.contains('remove-wishlist-item')) {
        const productId = parseInt(target.dataset.productId);
        removeFromWishlist(productId);
    } else if (target.classList.contains('add-to-cart')) {
        const productId = parseInt(target.dataset.productId);
        addToCart(productId);
        removeFromWishlist(productId);
    }
});

profileLink.addEventListener('click', (event) => {
    event.preventDefault();
    showUserProfile();
});

profilePage.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('close-btn')) {
        profilePage.style.display = 'none';
    }
});

profilePage.querySelector('form').addEventListener('submit', updateUserProfile);

orderHistoryLink.addEventListener('click', (event) => {
    event.preventDefault();
    showOrderHistory();
});

orderHistoryPage.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('close-btn')) {
        orderHistoryPage.style.display = 'none';
    }
});

logoutLink.addEventListener('click', (event) => {
    event.preventDefault();
    handleLogout();
});

homeLink.addEventListener('click', (event) => {
    event.preventDefault();
    // Close any open modals
    productDetailsModal.style.display = 'none';
    cartPage.style.display = 'none';
    wishlistPage.style.display = 'none';
    profilePage.style.display = 'none';
    orderHistoryPage.style.display = 'none';
    liveBiddingPage.style.display = 'none';
    aboutUsPage.style.display = 'none';
    contactUsPage.style.display = 'none';
    // Render the home page
    renderProductList(products);
});

liveBiddingLink.addEventListener('click', (event) => {
    event.preventDefault();
    liveBiddingPage.style.display = 'block';
    renderLiveBiddingItems();
});

liveBiddingPage.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('close-btn')) {
        liveBiddingPage.style.display = 'none';
    }
});

aboutUsLink.addEventListener('click', (event) => {
    event.preventDefault();
    aboutUsPage.style.display = 'block';
});

aboutUsPage.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('close-btn')) {
        aboutUsPage.style.display = 'none';
    }
});

contactUsLink.addEventListener('click', (event) => {
    event.preventDefault();
    contactUsPage.style.display = 'block';
});

contactUsPage.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('close-btn')) {
        contactUsPage.style.display = 'none';
    }
});

contactUsPage.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Your message has been sent. We will get back to you soon!');
    contactUsPage.style.display = 'none';
    contactUsPage.querySelector('form').reset();
});

categoryList.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'A') {
        const category = target.dataset.category;
        handleCategoryFilter(category);
    }
});


sortOptions.addEventListener('change', handleSort);
searchButton.addEventListener('click', handleSearch);

// Initial render
renderProductList(products);
updateCartLink();
updateWishlistLink();
if (loggedInUser) {
  logoutLink.parentElement.style.display = 'block';
  profileLink.parentElement.style.display = 'block';
  orderHistoryLink.parentElement.style.display = 'block';
} else {
  logoutLink.parentElement.style.display = 'none';
  profileLink.parentElement.style.display = 'none';
  orderHistoryLink.parentElement.style.display = 'none';
}
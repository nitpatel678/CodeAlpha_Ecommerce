class EcommerceStore {
  constructor() {
    this.checkoutInfo = null;
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.products = [];
    this.currentFilter = "all";
    this.currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    this.orders = JSON.parse(localStorage.getItem("orders")) || [];
    this.token = localStorage.getItem("token") || null;

    this.init();
  }

  init() {
    this.loadProducts();
    this.setupEventListeners();
    this.updateCartUI();
    this.updateUserUI();
    this.setupScrollAnimations();
  }

  // Sample product data
  loadProducts() {
    this.products = [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "electronics",
        price: 299.99,
        originalPrice: 399.99,
        description:
          "High-quality wireless headphones with noise cancellation and premium sound quality.",
        image:
          "https://images.pexels.com/photos/17810093/pexels-photo-17810093.jpeg",
        rating: 4.8,
        reviews: 124,
        badge: "Sale",
        inStock: true,
        colors: ["Black", "White", "Silver"],
        sizes: [],
      },
      {
        id: 2,
        name: "Smart Fitness Watch",
        category: "electronics",
        price: 199.99,
        originalPrice: 249.99,
        description:
          "Advanced fitness tracking with heart rate monitoring and GPS functionality.",
        image:
          "https://images.pexels.com/photos/9142237/pexels-photo-9142237.jpeg",
        rating: 4.6,
        reviews: 89,
        badge: "New",
        inStock: true,
        colors: ["Black", "Blue", "Red"],
        sizes: ["S", "M", "L"],
      },
      {
        id: 3,
        name: "Designer Leather Jacket",
        category: "fashion",
        price: 449.99,
        originalPrice: 599.99,
        description:
          "Premium leather jacket with modern design and superior craftsmanship.",
        image:
          "https://images.pexels.com/photos/983497/pexels-photo-983497.jpeg",
        rating: 4.9,
        reviews: 67,
        badge: "Premium",
        inStock: true,
        colors: ["Black", "Brown", "Navy"],
        sizes: ["XS", "S", "M", "L", "XL"],
      },
      {
        id: 4,
        name: "Minimalist Desk Lamp",
        category: "home",
        price: 89.99,
        originalPrice: 119.99,
        description:
          "Modern LED desk lamp with adjustable brightness and sleek design.",
        image:
          "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
        rating: 4.7,
        reviews: 156,
        badge: "Eco-Friendly",
        inStock: true,
        colors: ["White", "Black", "Silver"],
        sizes: [],
      },
      {
        id: 5,
        name: "Organic Cotton T-Shirt",
        category: "fashion",
        price: 29.99,
        originalPrice: 39.99,
        description:
          "Comfortable organic cotton t-shirt with sustainable production methods.",
        image:
          "https://images.pexels.com/photos/7671168/pexels-photo-7671168.jpeg",
        rating: 4.5,
        reviews: 203,
        badge: "Organic",
        inStock: true,
        colors: ["White", "Black", "Gray", "Navy"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      },
      {
        id: 6,
        name: "Wireless Charging Pad",
        category: "electronics",
        price: 49.99,
        originalPrice: 69.99,
        description:
          "Fast wireless charging pad compatible with all Qi-enabled devices.",
        image:
          "https://images.pexels.com/photos/5083411/pexels-photo-5083411.jpeg",
        rating: 4.4,
        reviews: 91,
        badge: "Fast Charge",
        inStock: true,
        colors: ["Black", "White"],
        sizes: [],
      },
      {
        id: 7,
        name: "Ceramic Coffee Mug Set",
        category: "home",
        price: 34.99,
        originalPrice: 44.99,
        description:
          "Set of 4 handcrafted ceramic mugs perfect for your morning coffee.",
        image:
          "https://images.pexels.com/photos/33117977/pexels-photo-33117977.jpeg",
        rating: 4.8,
        reviews: 78,
        badge: "Handmade",
        inStock: true,
        colors: ["White", "Blue", "Green"],
        sizes: [],
      },
      {
        id: 8,
        name: "Running Sneakers",
        category: "fashion",
        price: 129.99,
        originalPrice: 159.99,
        description:
          "Lightweight running sneakers with advanced cushioning technology.",
        image:
          "https://images.pexels.com/photos/28645960/pexels-photo-28645960.jpeg",
        rating: 4.6,
        reviews: 142,
        badge: "Athletic",
        inStock: true,
        colors: ["White", "Black", "Blue", "Red"],
        sizes: ["7", "8", "9", "10", "11", "12"],

        id: 9,
        name: "Noise-Cancelling Earbuds",
        category: "electronics",
        price: 149.99,
        originalPrice: 219.99,
        description:
          "Compact true wireless earbuds with active noise cancellation and long battery life.",
        image:
          "https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg",
        rating: 4.5,
        reviews: 312,
        badge: "Bestseller",
        inStock: true,
        colors: ["Black", "White"],
        sizes: [],
      },
      {
        id: 10,
        name: "4K Action Camera",
        category: "electronics",
        price: 249.99,
        originalPrice: 329.99,
        description:
          "Waterproof action camera with 4K recording, wide-angle lens, and Wi-Fi connectivity.",
        image:
          "https://images.pexels.com/photos/690806/pexels-photo-690806.jpeg",
        rating: 4.6,
        reviews: 178,
        badge: "Adventure",
        inStock: true,
        colors: ["Black"],
        sizes: [],
      },
      {
        id: 11,
        name: "Smart Home Speaker",
        category: "electronics",
        price: 99.99,
        originalPrice: 129.99,
        description:
          "Voice-controlled smart speaker with high-fidelity sound and smart assistant integration.",
        image:
          "https://images.pexels.com/photos/14309813/pexels-photo-14309813.jpeg",
        rating: 4.4,
        reviews: 243,
        badge: "Smart",
        inStock: true,
        colors: ["Gray", "Black", "White"],
        sizes: [],
      },
      {
        id: 12,
        name: "Bluetooth Car Adapter",
        category: "electronics",
        price: 39.99,
        originalPrice: 59.99,
        description:
          "FM transmitter and Bluetooth adapter for hands-free calls and music streaming in your car.",
        image:
          "https://images.pexels.com/photos/6073989/pexels-photo-6073989.jpeg",
        rating: 4.3,
        reviews: 114,
        badge: "",
        inStock: true,
        colors: ["Black"],
        sizes: [],
      },
      {
        id: 13,
        name: "Outdoor Drone",
        category: "electronics",
        price: 499.99,
        originalPrice: 599.99,
        description:
          "Compact drone with HD camera, GPS return-to-home, and 30‑minute flight time.",
        image:
          "https://images.pexels.com/photos/10822503/pexels-photo-10822503.jpeg",
        rating: 4.2,
        reviews: 89,
        badge: "New",
        inStock: true,
        colors: ["White"],
        sizes: [],
      },
      {
        id: 14,
        name: "Smart LED Light Strip",
        category: "electronics",
        price: 59.99,
        originalPrice: 79.99,
        description:
          "Wi‑Fi enabled LED strip, color changing, voice control compatible with Alexa & Google.",
        image:
          "https://images.pexels.com/photos/17784701/pexels-photo-17784701.jpeg",
        rating: 4.7,
        reviews: 203,
        badge: "Eco-Friendly",
        inStock: true,
        colors: ["RGB"],
        sizes: ["2m", "5m"],
      },
      {
        id: 15,
        name: "Slim Laptop Backpack",
        category: "fashion",
        price: 69.99,
        originalPrice: 89.99,
        description:
          "Water-resistant backpack with padded laptop compartment and stylish design.",
        image:
          "https://images.pexels.com/photos/936081/pexels-photo-936081.jpeg",
        rating: 4.6,
        reviews: 156,
        badge: "Unisex",
        inStock: true,
        colors: ["Black", "Gray", "Blue"],
        sizes: [],
      },
      {
        id: 16,
        name: "Eco-Friendly Hoodie",
        category: "fashion",
        price: 79.99,
        originalPrice: 109.99,
        description:
          "Soft organic cotton hoodie, sustainably made with modern fit.",
        image:
          "https://images.pexels.com/photos/1666779/pexels-photo-1666779.jpeg",
        rating: 4.8,
        reviews: 101,
        badge: "Organic",
        inStock: true,
        colors: ["Olive", "Charcoal", "Beige"],
        sizes: ["S", "M", "L", "XL"],
      },
      {
        id: 17,
        name: "Denim Jeans – Slim Fit",
        category: "fashion",
        price: 59.99,
        originalPrice: 79.99,
        description:
          "Men’s slim-fit denim jeans with stretch for comfort and durability.",
        image:
          "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
        rating: 4.5,
        reviews: 130,
        badge: "",
        inStock: true,
        colors: ["Dark Blue", "Black"],
        sizes: ["30", "32", "34", "36", "38"],
      },
      {
        id: 18,
        name: "Summer Maxi Dress",
        category: "fashion",
        price: 49.99,
        originalPrice: 69.99,
        description:
          "Lightweight floral maxi dress with adjustable straps and flowy silhouette.",
        image:
          "https://images.pexels.com/photos/4838042/pexels-photo-4838042.jpeg",
        rating: 4.7,
        reviews: 89,
        badge: "Summer",
        inStock: true,
        colors: ["Floral", "Solid Blue", "Solid Red"],
        sizes: ["S", "M", "L"],
      },
      {
        id: 19,
        name: "Wool Scarf",
        category: "fashion",
        price: 29.99,
        originalPrice: 39.99,
        description:
          "Cozy merino wool scarf, soft, warm, and perfect for cold weather.",
        image:
          "https://images.pexels.com/photos/14240832/pexels-photo-14240832.jpeg",
        rating: 4.9,
        reviews: 45,
        badge: "Premium",
        inStock: true,
        colors: ["Gray", "Camel", "Navy"],
        sizes: [],
      },
      {
        id: 20,
        name: "Wooden Serving Tray",
        category: "home",
        price: 54.99,
        originalPrice: 74.99,
        description:
          "Handcrafted teak wooden tray perfect for breakfast in bed or entertaining.",
        image:
          "https://images.pexels.com/photos/33125316/pexels-photo-33125316.jpeg",
        rating: 4.8,
        reviews: 67,
        badge: "Handmade",
        inStock: true,
        colors: ["Natural Wood"],
        sizes: [],
      },
      {
        id: 21,
        name: "Memory Foam Pillow",
        category: "home",
        price: 39.99,
        originalPrice: 59.99,
        description:
          "Ergonomic memory foam pillow with cooling gel for superior neck support.",
        image:
          "https://images.pexels.com/photos/189293/pexels-photo-189293.jpeg",
        rating: 4.6,
        reviews: 256,
        badge: "",
        inStock: true,
        colors: ["White"],
        sizes: ["Standard", "Queen"],
      },
      {
        id: 22,
        name: "Minimalist Wall Clock",
        category: "home",
        price: 79.99,
        originalPrice: 99.99,
        description:
          "Modern silent quartz wall clock with sleek design and silent sweep.",
        image:
          "https://images.pexels.com/photos/3283142/pexels-photo-3283142.jpeg",
        rating: 4.7,
        reviews: 142,
        badge: "Eco-Friendly",
        inStock: true,
        colors: ["Black", "White", "Oak"],
        sizes: ["12-inch"],
      },
      {
        id: 23,
        name: "Ceramic Planter Set",
        category: "living",
        price: 44.99,
        originalPrice: 59.99,
        description:
          "Set of 3 modern ceramic planters with saucers for indoor plants.",
        image:
          "https://images.pexels.com/photos/18376914/pexels-photo-18376914.jpeg",
        rating: 4.8,
        reviews: 98,
        badge: "Eco-Friendly",
        inStock: true,
        colors: ["White", "Terracotta", "Gray"],
        sizes: [],
      },
      {
        id: 24,
        name: "Reversible Throw Blanket",
        category: "living",
        price: 59.99,
        originalPrice: 79.99,
        description:
          "Double-sided plush throw blanket, cozy and lightweight for any season.",
        image:
          "https://images.pexels.com/photos/6123269/pexels-photo-6123269.jpeg",
        rating: 4.9,
        reviews: 177,
        badge: "Luxury",
        inStock: true,
        colors: ["Gray", "Cream"],
        sizes: ["50x60", "60x80"],
      },
      {
        id: 25,
        name: "Aromatherapy Diffuser",
        category: "living",
        price: 39.99,
        originalPrice: 49.99,
        description:
          "Ultrasonic essential oil diffuser with LED mood lighting and 8‑hour runtime.",
        image:
          "https://images.pexels.com/photos/19201670/pexels-photo-19201670.jpeg",
        rating: 4.6,
        reviews: 234,
        badge: "Relax",
        inStock: true,
        colors: ["White", "Woodgrain"],
        sizes: [],
      },
      {
        id: 26,
        name: "Bamboo Cutting Board",
        category: "home",
        price: 24.99,
        originalPrice: 34.99,
        description:
          "Durable bamboo cutting board with juice groove, eco-friendly and knife-safe.",
        image:
          "https://images.pexels.com/photos/349609/pexels-photo-349609.jpeg",
        rating: 4.7,
        reviews: 145,
        badge: "Eco-Friendly",
        inStock: true,
        colors: ["Natural"],
        sizes: ["Large", "XL"],
      },
      {
        id: 27,
        name: "Stylish Floor Lamp",
        category: "home",
        price: 129.99,
        originalPrice: 159.99,
        description:
          "Tall floor lamp with tripod base and fabric shade for living room ambiance.",
        image:
          "https://images.pexels.com/photos/896407/pexels-photo-896407.jpeg",
        rating: 4.5,
        reviews: 88,
        badge: "Design",
        inStock: true,
        colors: ["Black", "Brass"],
        sizes: [],
      },
      {
        id: 28,
        name: "Portable Blender",
        category: "home",
        price: 49.99,
        originalPrice: 69.99,
        description:
          "USB rechargeable portable blender for smoothies on the go, 6 stainless blades.",
        image:
          "https://images.pexels.com/photos/27861734/pexels-photo-27861734.jpeg",
        rating: 4.6,
        reviews: 120,
        badge: "Kitchen",
        inStock: true,
        colors: ["Pink", "Blue", "Green"],
        sizes: [],
      },
      {
        id: 29,
        name: "Yoga Mat – Eco Yoga",
        category: "living",
        price: 59.99,
        originalPrice: 79.99,
        description:
          "Non-toxic natural rubber yoga mat with alignment guide and cushioning.",
        image:
          "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
        rating: 4.8,
        reviews: 202,
        badge: "Eco-Friendly",
        inStock: true,
        colors: ["Purple", "Teal", "Gray"],
        sizes: [],
      },
    ];

    this.renderProducts();
  }

  setupEventListeners() {
    // Navigation
    document
      .getElementById("search-btn")
      .addEventListener("click", () => this.toggleSearch());
    document
      .getElementById("search-close")
      .addEventListener("click", () => this.toggleSearch());
    document
      .getElementById("cart-btn")
      .addEventListener("click", () => this.toggleCart());
    document
      .getElementById("cart-close")
      .addEventListener("click", () => this.toggleCart());
    document
      .getElementById("user-btn")
      .addEventListener("click", () => this.toggleAuth());

    // Search
    document
      .getElementById("search-input")
      .addEventListener("input", (e) => this.handleSearch(e.target.value));

    // Product filters
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.filterProducts(e.target.dataset.filter)
      );
    });

    // Load more products
    document
      .getElementById("load-more")
      .addEventListener("click", () => this.loadMoreProducts());

    // Modal closes
    document.querySelectorAll(".modal-close").forEach((btn) => {
      btn.addEventListener("click", (e) =>
        this.closeModal(e.target.closest(".modal-overlay"))
      );
    });

    // Auth tabs
    document.querySelectorAll(".auth-tab").forEach((tab) => {
      tab.addEventListener("click", (e) =>
        this.switchAuthTab(e.target.dataset.tab)
      );
    });

    // Close modals on overlay click
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          this.closeModal(overlay);
        }
      });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          this.updateActiveNavLink(link);
        }
      });
    });

    // Form submissions for login and registration
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }
  }

  renderProducts(productsToRender = this.products) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    productsToRender.forEach((product) => {
      const productCard = this.createProductCard(product);
      grid.appendChild(productCard);
    });

    // Add animation delay for staggered effect
    const cards = grid.querySelectorAll(".product-card");
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add("fade-in");
    });
  }

  createProductCard(product) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${
      product.name
    }" loading="lazy">
                ${
                  product.badge
                    ? `<div class="product-badge">${product.badge}</div>`
                    : ""
                }
                <div class="product-actions">
                    <button class="product-action" onclick="store.toggleWishlist(${
                      product.id
                    })" title="Add to Wishlist">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="product-action" onclick="store.quickView(${
                      product.id
                    })" title="Quick View">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="price-current">$${product.price}</span>
                    ${
                      product.originalPrice
                        ? `<span class="price-original">$${product.originalPrice}</span>`
                        : ""
                    }
                </div>
                <div class="product-rating">
                    <div class="stars">
                        ${this.generateStars(product.rating)}
                    </div>
                    <span class="rating-text">${product.rating} (${
      product.reviews
    } reviews)</span>
                </div>
                <button class="add-to-cart" onclick="store.addToCart(${
                  product.id
                })">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
            </div>
        `;

    card.addEventListener("click", (e) => {
      if (
        !e.target.closest(".product-actions") &&
        !e.target.closest(".add-to-cart")
      ) {
        this.quickView(product.id);
      }
    });

    return card;
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = "";

    for (let i = 0; i < fullStars; i++) {
      stars += '<i class="fas fa-star star"></i>';
    }

    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt star"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars += '<i class="far fa-star star"></i>';
    }

    return stars;
  }

  filterProducts(filter) {
    this.currentFilter = filter;

    // Update active filter button
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add("active");

    // Filter products
    const filteredProducts =
      filter === "all"
        ? this.products
        : this.products.filter((product) => product.category === filter);

    this.renderProducts(filteredProducts);
  }

  handleSearch(query) {
    if (!query.trim()) {
      this.renderProducts();
      return;
    }

    const filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    this.renderProducts(filteredProducts);
  }

  addToCart(productId, quantity = 1, selectedOptions = {}) {
    if (!this.currentUser) {
      this.showToast("Please login to add items to cart!", "warning");
      this.toggleAuth();
      return;
    }

    cartId: String(Date.now() + Math.random());

    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = this.cart.find(
      (item) =>
        item.id === productId &&
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        ...product,
        quantity,
        selectedOptions,
        cartId: Date.now() + Math.random(),
      });
    }

    this.saveCart();
    this.updateCartUI();
    this.showToast("Product added to cart!", "success");

    // Add animation to cart button
    const cartBtn = document.getElementById("cart-btn");
    cartBtn.classList.add("pulse");
    setTimeout(() => cartBtn.classList.remove("pulse"), 600);
  }

  removeFromCart(cartId) {
    this.cart = this.cart.filter(
      (item) => String(item.cartId) !== String(cartId)
    );
    this.saveCart();
    this.updateCartUI();
    this.showToast("Product removed from cart", "warning");
  }

  updateCartQuantity(cartId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeFromCart(cartId);
      return;
    }

    this.cart = this.cart.filter(
      (item) => String(item.cartId) !== String(cartId)
    );

    const item = this.cart.find((item) => item.cartId === cartId);
    if (item) {
      item.quantity = newQuantity;
      this.saveCart();
      this.updateCartUI();
    }
  }

  updateCartUI() {
    const cartCount = document.getElementById("cart-count");
    const cartContent = document.getElementById("cart-content");
    const cartFooter = document.getElementById("cart-footer");
    const emptyCart = document.getElementById("empty-cart");

    const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (this.cart.length === 0) {
      if (emptyCart) emptyCart.style.display = "block"; // Check if emptyCart exists
      if (cartFooter) cartFooter.style.display = "none"; // Check if cartFooter exists
      if (cartContent)
        cartContent.innerHTML =
          '<div class="empty-cart" id="empty-cart"><i class="fas fa-shopping-cart"></i><p>Your cart is empty</p><button class="btn btn-primary" onclick="store.closeCart()">Continue Shopping</button></div>';
    } else {
      if (emptyCart) emptyCart.style.display = "none"; // Check if emptyCart exists
      if (cartFooter) cartFooter.style.display = "block"; // Check if cartFooter exists

      if (cartContent)
        cartContent.innerHTML = this.cart
          .map(
            (item) => `
                        <div class="cart-item">
                            <div class="cart-item-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="cart-item-info">
                                <div class="cart-item-title">${item.name}</div>
                                <div class="cart-item-price">$${
                                  item.price
                                }</div>
                                <div class="cart-item-controls">
                                    <button class="quantity-btn" onclick="store.updateCartQuantity('${
                                      item.cartId
                                    }', ${item.quantity - 1})">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <span class="quantity">${
                                      item.quantity
                                    }</span>
                                    <button class="quantity-btn" onclick="store.updateCartQuantity('${
                                      item.cartId
                                    }', ${item.quantity + 1})">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                    <button class="remove-item" onclick="store.removeFromCart('${
                                      item.cartId
                                    }')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `
          )
          .join("");

      const subtotal = this.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      if (document.getElementById("cart-subtotal"))
        document.getElementById(
          "cart-subtotal"
        ).textContent = `$${subtotal.toFixed(2)}`;
      if (document.getElementById("cart-total"))
        document.getElementById(
          "cart-total"
        ).textContent = `$${subtotal.toFixed(2)}`;
    }
  }

  quickView(productId) {
    const product = this.products.find((p) => p.id === productId);
    if (!product) return;

    const modal = document.getElementById("product-modal");
    const productDetail = document.getElementById("product-detail");

    productDetail.innerHTML = `
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-detail-info">
                <div class="product-detail-category">${product.category}</div>
                <h2 class="product-detail-title">${product.name}</h2>
                <p class="product-detail-description">${product.description}</p>
                <div class="product-detail-price">
                    <span class="price-current">$${product.price}</span>
                    ${
                      product.originalPrice
                        ? `<span class="price-original">$${product.originalPrice}</span>`
                        : ""
                    }
                </div>
                <div class="product-detail-rating">
                    <div class="stars">${this.generateStars(
                      product.rating
                    )}</div>
                    <span class="rating-text">${product.rating} (${
      product.reviews
    } reviews)</span>
                </div>
                <div class="product-options">
                    ${
                      product.colors.length > 0
                        ? `
                        <div class="option-group">
                            <label class="option-label">Color:</label>
                            <div class="option-buttons">
                                ${product.colors
                                  .map(
                                    (color) => `
                                <button class="option-btn" data-option="color" data-value="${color}">${color}</button>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                    `
                        : ""
                    }
                    ${
                      product.sizes.length > 0
                        ? `
                        <div class="option-group">
                            <label class="option-label">Size:</label>
                            <div class="option-buttons">
                                ${product.sizes
                                  .map(
                                    (size) => `
                                <button class="option-btn" data-option="size" data-value="${size}">${size}</button>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>
                    `
                        : ""
                    }
                </div>
                <div class="quantity-selector">
                    <label class="option-label">Quantity:</label>
                    <button class="quantity-btn" onclick="this.nextElementSibling.textContent = Math.max(1, parseInt(this.nextElementSibling.textContent) - 1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">1</span>
                    <button class="quantity-btn" onclick="this.previousElementSibling.textContent = parseInt(this.previousElementSibling.textContent) + 1">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="product-actions-detail">
                    <button class="btn btn-primary" onclick="store.addToCartFromModal(${
                      product.id
                    })">
                        <i class="fas fa-shopping-cart"></i>
                        Add to Cart
                    </button>
                    <button class="btn btn-secondary" onclick="store.toggleWishlist(${
                      product.id
                    })">
                        <i class="fas fa-heart"></i>
                        Wishlist
                    </button>
                </div>
            </div>
        `;

    // Setup option selection
    productDetail.querySelectorAll(".option-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const group = btn.closest(".option-group");
        group
          .querySelectorAll(".option-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    this.showModal(modal);
  }

  addToCartFromModal(productId) {
    const modal = document.getElementById("product-modal");
    const quantity = Number.parseInt(
      modal.querySelector(".quantity").textContent
    );
    const selectedOptions = {};

    modal.querySelectorAll(".option-btn.active").forEach((btn) => {
      selectedOptions[btn.dataset.option] = btn.dataset.value;
    });

    this.addToCart(productId, quantity, selectedOptions);
    this.closeModal(modal);
  }

  toggleWishlist(productId) {
    // Wishlist functionality would be implemented here
    this.showToast("Added to wishlist!", "success");
  }

  toggleSearch() {
    const overlay = document.getElementById("search-overlay");
    const input = document.getElementById("search-input");

    overlay.classList.toggle("active");

    if (overlay.classList.contains("active")) {
      setTimeout(() => input.focus(), 300);
    }
  }

  toggleCart() {
    const sidebar = document.getElementById("cart-sidebar");
    sidebar.classList.toggle("active");

    if (sidebar.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  closeCart() {
    const sidebar = document.getElementById("cart-sidebar");
    sidebar.classList.remove("active");
    document.body.style.overflow = "";
  }

  toggleAuth() {
    const modal = document.getElementById("auth-modal");
    this.showModal(modal);
  }

  switchAuthTab(tab) {
    document
      .querySelectorAll(".auth-tab")
      .forEach((t) => t.classList.remove("active"));
    document.querySelector(`[data-tab="${tab}"]`).classList.add("active");

    document.getElementById("login-form").style.display =
      tab === "login" ? "block" : "none";
    document.getElementById("register-form").style.display =
      tab === "register" ? "block" : "none";
  }

  proceedToCheckout() {
    if (this.cart.length === 0) {
      this.showToast("Your cart is empty!", "error");
      return;
    }

    if (!this.currentUser) {
      this.showToast("Please login to continue", "warning");
      this.toggleAuth();
      return;
    }

    this.closeCart();
    this.showCheckout();
  }

  showCheckout() {
    const modal = document.getElementById("checkout-modal");
    const content = document.getElementById("checkout-content");

    content.innerHTML = `
  <div class="checkout-step" id="shipping-step">
    <h4>Shipping Information</h4>
    <form class="checkout-form">
      <div class="form-group">
          <input type="text" placeholder="Full Name" required>
      </div>
      <div class="form-group">
          <input type="text" placeholder="Address" required>
      </div>
      <div class="form-group">
          <input type="text" placeholder="Phone Number" required>
      </div>
      <button type="button" class="btn btn-primary" onclick="store.nextCheckoutStep()">Continue to Payment</button>
    </form>
  </div>
`;

    this.showModal(modal);
  }

  nextCheckoutStep() {
    const shippingStep = document.getElementById("shipping-step");
    if (!shippingStep) return;

    const fullName = shippingStep.querySelector(
      'input[placeholder="Full Name"]'
    ).value;
    const address = shippingStep.querySelector(
      'input[placeholder="Address"]'
    ).value;
    const phone = shippingStep.querySelector(
      'input[placeholder="Phone Number"]'
    ).value;

    if (!fullName || !address || !phone) {
      this.showToast("Please fill all fields", "warning");
      return;
    }

    // Save to temp state
    this.checkoutInfo = { fullName, address, phone };

    // Replace with payment UI
    const content = document.getElementById("checkout-content");
    content.innerHTML = `
    <div class="checkout-step" id="payment-step">
      <h4>Payment Method</h4>
      <p>Only Cash on Delivery is available at the moment.</p>
      <button class="btn btn-success" onclick="store.placeFinalOrder()">Place Order</button>
    </div>
  `;
  }

  placeFinalOrder() {
    const { fullName, address, phone } = this.checkoutInfo || {};
    if (!fullName || !address || !phone) {
      return this.showToast("Shipping info missing", "error");
    }

    const total = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({
        items: this.cart,
        total,
        address,
        phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          this.showToast(data.message || "Order failed", "error");
        } else {
          this.cart = [];
          this.saveCart();
          this.updateCartUI();
          this.closeModal(document.getElementById("checkout-modal"));
          this.showToast("Order placed successfully!", "success");
        }
      })
      .catch(() => {
        this.showToast("Failed to place order", "error");
      });
  }

  // Modify completeOrder() to place order via backend
  async completeOrder() {
    const fullName = document.querySelector(
      '#shipping-step input[placeholder="Full Name"]'
    ).value;
    const address = document.querySelector(
      '#shipping-step input[placeholder="Address"]'
    ).value;
    const phone = document.querySelector(
      '#shipping-step input[placeholder="Phone Number"]'
    ).value;
    const total = this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (!this.token) {
      return this.showToast("Login required to place order", "error");
    }

    try {
      this.showLoading();

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify({
          items: this.cart,
          total,
          address,
          phone,
        }),
      });

      const data = await res.json();
      this.hideLoading();

      if (!res.ok)
        return this.showToast(data.message || "Order failed", "error");

      this.cart = [];
      this.saveCart();
      this.updateCartUI();

      this.closeModal(document.getElementById("checkout-modal"));
      this.showToast("Order placed successfully!", "success");
    } catch (err) {
      this.hideLoading();
      this.showToast("Order error", "error");
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (form.closest("#login-form")) {
      this.handleLogin(form);
    } else if (form.closest("#register-form")) {
      this.handleRegister(form);
    }
  }

  // Modified handleLogin()
  async handleLogin(form) {
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    try {
      this.showLoading();
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      this.hideLoading();

      if (!res.ok)
        return this.showToast(data.message || "Login failed", "error");

      this.currentUser = data.user;
      this.token = data.token;
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      this.updateUserUI();
      this.closeModal(document.getElementById("auth-modal"));
      this.showToast("Login successful!", "success");
    } catch (err) {
      this.hideLoading();
      this.showToast("Something went wrong", "error");
    }
  }

  // Modified handleRegister()
  async handleRegister(form) {
    const name = form.querySelector('input[placeholder="Full Name"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[placeholder="Password"]').value;

    try {
      this.showLoading();

      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      this.hideLoading();

      if (!res.ok)
        return this.showToast(data.message || "Registration failed", "error");

      this.currentUser = data.user;
      this.token = data.token;
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      this.updateUserUI();
      this.closeModal(document.getElementById("auth-modal"));
      this.showToast("Account created successfully!", "success");
    } catch (err) {
      this.hideLoading();
      this.showToast("Something went wrong", "error");
    }
  }

  updateUserUI() {
    const userBtn = document.getElementById("user-btn");
    const modal = document.getElementById("auth-modal");

    if (this.currentUser) {
      userBtn.innerHTML = `
      <i class="fas fa-sign-out-alt"></i>
      <span>Logout</span>
    `;
      userBtn.title = `Logged in as ${this.currentUser.name}`;
      userBtn.onclick = () => this.logout();
      if (modal) modal.style.display = "none"; // Hide modal
    } else {
      userBtn.innerHTML = `<i class="fas fa-user"></i> <span>Login</span>`;
      userBtn.onclick = () => this.toggleAuth();
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    this.token = null;
    this.currentUser = null;
    this.updateUserUI();
    this.showToast("Logged out successfully", "success");
  }

  subscribeNewsletter() {
    const input = document.querySelector(".newsletter input");
    const email = input.value.trim();

    if (!email || !email.includes("@")) {
      this.showToast("Please enter a valid email address", "error");
      return;
    }

    input.value = "";
    this.showToast("Successfully subscribed to newsletter!", "success");
  }

  loadMoreProducts() {
    // Simulate loading more products
    this.showLoading();

    setTimeout(() => {
      this.hideLoading();
      this.showToast("All products loaded!", "success");
    }, 1000);
  }

  showModal(modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeModal(modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  showLoading() {
    document.getElementById("loading-spinner").classList.add("active");
  }

  hideLoading() {
    document.getElementById("loading-spinner").classList.remove("active");
  }

  showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const icons = {
      success: "fas fa-check-circle",
      error: "fas fa-exclamation-circle",
      warning: "fas fa-exclamation-triangle",
    };

    toast.innerHTML = `
            <i class="toast-icon ${icons[type]}"></i>
            <span class="toast-message">${message}</span>
        `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  updateActiveNavLink(activeLink) {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });
    activeLink.classList.add("active");
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document
      .querySelectorAll(".product-card, .section-header")
      .forEach((el) => {
        observer.observe(el);
      });
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
}

// Utility functions
function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function switchAuthTab(tab) {
  store.switchAuthTab(tab);
}

function proceedToCheckout() {
  store.proceedToCheckout();
}

function closeCart() {
  store.closeCart();
}

// Initialize the store
const store = new EcommerceStore();

// Smooth scrolling for all anchor links
document.addEventListener("DOMContentLoaded", () => {
  // Add scroll effect to header
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  });

  // Add loading animation to images
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });
  });
});

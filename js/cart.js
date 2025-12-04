// Sepeti getir
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Sepeti kaydet
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Sepete ürün ekle
function addToCart(name, price, image) {
    let cart = getCart();

    let existing = cart.find(p => p.name === name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: Number(price),
            image: image,
            quantity: 1
        });
    }

    saveCart(cart);
    console.log("Sepete eklendi:", name);
    alert("Ürün sepete eklendi!");
}

// *** EN KRİTİK NOKTA: document.level event delegation ***
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-to-cart")) {
        e.preventDefault(); // "#" yenilemeyi engeller

        let btn = e.target;

        addToCart(
            btn.dataset.name,
            btn.dataset.price,
            btn.dataset.image
        );
    }
});

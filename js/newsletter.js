function saveEmail() {
    const input = document.querySelector(".newsletter-input");
    const email = input.value.trim();

    if (!email) {
        alert("Lütfen bir email adresi girin.");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert("Geçerli bir email girin.");
        return;
    }

    let list = JSON.parse(localStorage.getItem("newsletter")) || [];
    list.push(email);
    localStorage.setItem("newsletter", JSON.stringify(list));

    input.value = "";
    alert("Abonelik başarılı!");
}
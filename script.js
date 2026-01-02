function addtocart(name, price, details = "") {
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, details });
    localStorage.setItem("cart", JSON.stringify(cart));

   
    let toast = document.getElementById("toast-message");
    toast.innerText = name + " added to cart!";
    toast.style.display = "block";

    // Hide after 2 seconds
    setTimeout(() => {
        toast.style.display = "none";
    }, 2000);

    showcart(); 
}

function clearCart() {
    localStorage.removeItem("cart"); 
    showcart();                      
    alert("Cart has been cleared!"); 
}


document.getElementById("clear-cart-btn").addEventListener("click", clearCart);


function showcart() {
    let cartDiv = document.getElementById("cartitem");
    let totalSpan = document.getElementById("total");
    let finalSpan = document.getElementById("final");

    if (!cartDiv) return; 

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartDiv.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        cartDiv.innerHTML += `
            <div class="cart-item">
                ${item.name} - Rs.${item.price}
                ${item.details ? "<small>(" + item.details + ")</small>" : ""}
            </div>
        `;
    });

    totalSpan.innerText = total;
    finalSpan.innerText = total; 
}

function applydiscount() {
    let code = document.getElementById("discount").value;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let final = total;

    if (code.toUpperCase() === "SWEET10") {
        final = total * 0.9; 
        alert("Discount applied! Final Total: Rs." + final);
    } else {
        alert("Invalid discount code.");
    }

    document.getElementById("final").innerText = final;
}

window.onload = function() {
    showcart();

    
    let checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function() {
            let billingForm = document.getElementById("billing-form");
            billingForm.style.display = "block";
            window.scrollTo(0, document.body.scrollHeight);
        });
    }
};


function placeOrder() {
    let city = document.getElementById("bill-city").value;
    let address = document.getElementById("bill-address").value;
    let phone = document.getElementById("bill-phone").value;
    let payment = document.getElementById("bill-payment").value;

    if (!city || !address || !phone || !payment) {
        alert("Please fill all billing details.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    console.log("Order Details:");
    console.log("City:", city);
    console.log("Address:", address);
    console.log("Phone:", phone);
    console.log("Payment Method:", payment);
    console.log("Cart Items:", cart);

    alert("Order placed successfully!");

   
    localStorage.removeItem("cart");
    showcart();

   
    document.getElementById("billing-form").style.display = "none";
}

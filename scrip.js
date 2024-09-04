// for burger menu
document.querySelector(".burger-menu").addEventListener("click", function () {
  document.querySelector(".nav-links").classList.toggle("active");
});

//close the menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelector(".nav-links").classList.remove("active");
    console.log("close");
  });
});


  
  // subscribing
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit").addEventListener("click", function () {
      const emailInput = document.getElementById("emailInput").value.trim();

      // Custom validation for email input
      if (emailInput === "") {
        alert("Please fill out this field.");
      } else if (!validateEmail(emailInput)) {
        alert("Please enter a valid email address.");
      } else {
        alert("Thank you for subscribing.");
      }
    });

   
  });

   //validate email format regex
   function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

// form validation and feedback storage
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitContactForm").addEventListener("click", function () {
      const nameInput = document.getElementById("name").value.trim();
      const emailInput = document.getElementById("email").value.trim();
      const phoneInput = document.getElementById("phone").value.trim();
      const feedbackInput = document.getElementById("feedback").value.trim();
      const customOrderChecked = document.getElementById("customOrder").checked;
  
      // custom validation
      if (nameInput === "") {
        alert("Please enter your name.");
      } else if (emailInput === "") {
        alert("Please enter your email address.");
      } else if (!validateEmail(emailInput)) {
        alert("Please enter a valid email address.");
      } else {
        alert("Thank you for your submission!");
  
        // save feedback to local storage
        const feedbackData = {
          name: nameInput,
          email: emailInput,
          phone: phoneInput,
          feedback: feedbackInput,
          customOrder: customOrderChecked
        };
  
        localStorage.setItem("customerFeedback", JSON.stringify(feedbackData));
  
        console.log(feedbackData);
        document.getElementById("contactForm").reset();
      }
    });
  
  });
  
  // add to cart feature - alert when adding an item to the cart
  const addButtons = document.querySelectorAll(".addBtn");
  addButtons.forEach((button) => {
    button.addEventListener("click", function () {
      alert("Item added to the cart");
    });
  });
  
  // view vart and cart functionality
  document.addEventListener("DOMContentLoaded", function () {
    const viewCardButton = document.getElementById("viewCard");
    const cartModal = document.getElementById("cartModal");
    const closeModalButton = document.getElementById("closeModal");
  
    if (viewCardButton) {
      viewCardButton.addEventListener("click", function () {
        if (cartModal) {
          cartModal.classList.add("active");
        }
      });
    }
  
    if (closeModalButton) {
      closeModalButton.addEventListener("click", function () {
        if (cartModal) {
          cartModal.classList.remove("active");
        }
      });
    }
  });
  
  // Shopping cart functionality using sessionStorage
  document.addEventListener("DOMContentLoaded", function () {
  
    // Retrieve cart items from session storage or initialize as an empty array
    let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  
    const addButtons = document.querySelectorAll(".addBtn");
    const viewCartButton = document.getElementById("viewCard");
    const cartItemsList = document.getElementById("cartItemsList");
    const clearCartButton = document.getElementById("clearCart");
    const processOrderButton = document.getElementById("processOrder");
  
    // update the cart button text with the number of items
    function updateCartButton() {
      if (viewCartButton) {
        viewCartButton.innerHTML = `<i class="fa-solid fa-cart-plus"></i> View Cart (${cartItems.length})`;
      }
    }
  
    //render cart items in the modal
    function renderCartItems() {
      if (cartItemsList) {
        cartItemsList.innerHTML = ""; // clear existing items
  
        if (cartItems.length > 0) {
          cartItems.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            cartItemsList.appendChild(listItem);
          });
        } else {
          cartItemsList.innerHTML = "<li>No items in the cart.</li>";
        }
      }
    }
  
    // add to cart functionality
    if (addButtons.length > 0) {
      addButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const itemName = this.closest("article").querySelector("h3").innerText;
          cartItems.push(itemName);
          alert(`${itemName} added to the cart`);
          updateCartButton();
          renderCartItems();
  
          // save the updated cart to session storage
          sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
        });
      });
    }
  
    // view cart functionality
    if (viewCartButton) {
      viewCartButton.addEventListener("click", function () {
        renderCartItems(); // render cart items each time the cart is viewed
      });
    }
  
    // clear cart functionality
    if (clearCartButton) {
      clearCartButton.addEventListener("click", function () {
        if (cartItems.length > 0) {
          cartItems = [];
          alert("Cart Cleared");
          updateCartButton();
          renderCartItems();
  
          // clear the cart from session storage
          sessionStorage.removeItem("cartItems");
        } else {
          alert("No items to clear.");
        }
      });
    }
  
    // process order functionality
    if (processOrderButton) {
      processOrderButton.addEventListener("click", function () {
        if (cartItems.length > 0) {
          alert("Thank you for your order!");
          cartItems = [];
          updateCartButton();
          renderCartItems();
  
          // clear the cart from session storage
          sessionStorage.removeItem("cartItems");
        } else {
          alert("Cart is empty.");
        }
      });
    }
  
    // update the cart button on page load
    updateCartButton();
  });
  
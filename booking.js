document.addEventListener("DOMContentLoaded", function () {
  if (typeof google !== "undefined") {
    // Initialize Google Places Autocomplete
    var gpaInput = document.getElementById("Address");
    var autocomplete = new google.maps.places.Autocomplete(gpaInput);
  }

  // Get references to the input and spsan elements
  const passengerCountInput = document.getElementById("passengerCount");
  const totalPaySpan = document.getElementById("totalPay");

  let passengers = []; // Move the declaration outside of the event listeners

  // Add an event listener to the passengerCount input
  passengerCountInput.addEventListener("input", function () {
    const passengerCount = parseInt(passengerCountInput.value) || 0;
    if (isNaN(passengerCount) || passengerCount < 0) {
      // Handle invalid input
      return;
    }

    // Calculate the total pay
    const totalPay = (passengerCount * 129).toFixed(2);
    totalPaySpan.textContent = `${totalPay}`;
  });

  passengerCount = document.getElementById("passengerCount");
  const passengerContainer = document.getElementById("passengerContainer");
  const bookingForm = document.getElementById("bookingForm");

  passengerCount.addEventListener("change", function () {
    const numPassengers = parseInt(passengerCount.value);
    passengerContainer.innerHTML = ""; // Clear previous entries
    passengers.length = 0; // Clear previous passenger data

    for (let i = 0; i < numPassengers; i++) {
      const div = document.createElement("div");
      div.className = "passengers_item";
      div.innerHTML = `
        <p class="heading-style-h6">Passenger ${i + 1}</p>
        <div class="space-medium"></div>
        <p class="paragraph.is-label">Full Name</p>
        <input class="input" type="text" id="name${i}" name="name${i}" required> <br>
        <div class="space-small"></div>
        <p class="paragraph.is-label">Passport #</p>
        <input class="input" type="text" id="passport${i}" name="passport${i}" required><br>
        <div class="space-small"></div>
        <p class="paragraph.is-label">Age</p>
        <input class="input" type="number" id="age${i}" name="age${i}" required><br>
      `;
      passengerContainer.appendChild(div);

      passengers.push({ name: "", passport: "", age: "" }); // Initialize empty passenger data
    }
  });

  bookingForm.addEventListener("submit", function () {
    for (let i = 0; i < passengers.length; i++) {
      const nameInput = document.getElementById(`name${i}`);
      const passportInput = document.getElementById(`passport${i}`);
      const ageInput = document.getElementById(`age${i}`);
      passengers[i].name = nameInput.value;
      passengers[i].passport = passportInput.value;
      passengers[i].age = ageInput.value;
    }

    localStorage.setItem("myPassengers", JSON.stringify(passengers));

    // Retrieve the passenger data from localStorage
    const jsonString = localStorage.getItem("myPassengers");
    const myPassengers = JSON.parse(jsonString) || [];
    const bookingDate = document.getElementById("date").value;
    const pickupAddress = document.getElementById("Address").value;
    const emailAddress = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phone-number").value;
    function generateUUID() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let uuid = "ord_live_";

      for (let i = 0; i < 16; i++) {
        const charIndex = Math.floor(Math.random() * characters.length);
        uuid += characters.charAt(charIndex);
      }

      return uuid;
    }

    const uniqueId = generateUUID();

    let totalNow = passengerCount.value;
    // Calculate the total pay
    totalPay = (totalNow * 129).toFixed(2);

    const payload = {
      passengersNumber: passengerCountInput.value,
      date: bookingDate,
      address: pickupAddress,
      email: emailAddress,
      phone: phoneNumber,
      uuid: uniqueId,
      total: totalPay,
      passengerList: myPassengers,
    };

    // Define the URL of the webhook
    const webhookURL =
      "https://xmlm-tvsy-xdlb.n7c.xano.io/api:vrMxFQw6/booking";

    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Webhook request was successful.");
          // Redirect to the successful payment page
          // window.location.href = "/successful-payment";
        } else {
          console.error("Webhook request failed.");
          // Redirect to the failed payment page
          // window.location.href = "/failed-payment";
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        // Redirect to the failed payment page
        // window.location.href = "/failed-payment";
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuLinksMobile = document.querySelectorAll(".navbar_menu-link-mobile");
  const mobileMenuButton = document.querySelector(".navbar_mobile-menu-button");

  // Function to trigger a click on the mobile menu button
  function triggerMobileMenuButtonClick() {
    mobileMenuButton.click(); // Simulate a click on the mobile menu button
  }

  menuLinksMobile.forEach(function (link) {
    link.addEventListener("click", function () {
      triggerMobileMenuButtonClick();
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  document.getElementById("currentYear").textContent = currentYear;
});

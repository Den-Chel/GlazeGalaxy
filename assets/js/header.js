document.addEventListener("DOMContentLoaded", () => {
  fetch("Header/header.htm") // Adjust the path based on the actual file location
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header-placeholder").innerHTML = data;

      // Reinitialize Hamburger Menu Functionality after Header is Loaded
      const hamburgerMenu = document.getElementById("hamburgerMenu");
      const navMenu = document.getElementById("navMenu");

      if (hamburgerMenu && navMenu) {
        hamburgerMenu.addEventListener("click", () => {
          hamburgerMenu.classList.toggle("active");
          navMenu.classList.toggle("active");
        });
      }
    })
    .catch((error) => console.error("Error loading header:", error));
});

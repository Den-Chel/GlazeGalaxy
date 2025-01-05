document.addEventListener("DOMContentLoaded", () => {
  // Form Validation
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const dob = document.getElementById("dob").value;
      const [year, month, day] = dob.split("-").map(Number);
      const email = document.getElementById("email").value.trim();
      const confirmEmail = document
        .getElementById("confirm-email")
        .value.trim();
      const message = document.getElementById("message").value.trim();
      const consent = document.getElementById("checkbox").checked;

      const errors = {
        nameError: name === "",
        phoneError: !/^\d{10}$/.test(phone),
        dobError: !dob || !isAgeOfMajority(year, month, day),
        emailError: !isValidEmail(email),
        confirmEmailError: email !== confirmEmail,
        messageError: message.length < 3,
        consentError: !consent,
      };

      // Reset error messages
      for (let errorId in errors) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
          errorElement.style.display = errors[errorId] ? "inline" : "none";
        }
      }

      // Check if the form is valid
      const formIsValid = !Object.values(errors).includes(true);
      if (formIsValid) {
        showSuccessMessage();
      }
    });
  }

  // Success Message
  function showSuccessMessage() {
    const successMessage = document.getElementById("success-message");
    if (successMessage) {
      successMessage.style.display = "block";

      setTimeout(() => {
        successMessage.style.display = "none";
        resetForm();
      }, 2000);
    }
  }

  // Reset Form
  function resetForm() {
    const inputs = document.querySelectorAll("input");
    const textarea = document.querySelector("textarea");
    inputs.forEach((input) => (input.value = ""));
    if (textarea) textarea.value = "";
  }
});

// Email Validation Function
function isValidEmail(email) {
  const emailRegex =
    /^[A-Za-z][A-Za-z0-9._-]{2,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return typeof email === "string" && emailRegex.test(email);
}

// Age Validation Function
function isAgeOfMajority(birthYear, birthMonth, birthDay) {
  if (typeof birthYear !== "number" || birthYear < 1920 || birthYear > 2010)
    return false;
  if (typeof birthMonth !== "number" || birthMonth < 1 || birthMonth > 12)
    return false;
  if (typeof birthDay !== "number" || birthDay < 1 || birthDay > 31)
    return false;

  const TODAY = new Date();
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  const ageDifference = TODAY - birthDate;

  return ageDifference > 6570 * 24 * 60 * 60 * 1000; // 6570 days = 18 years
}

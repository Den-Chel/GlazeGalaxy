/*
 * Student Name: Denis Chechulin
 * Student ID: 41170583
 * Course: CST8117 - Cross-Platform Web Design
 * Semester: 1
 * Assignment: Online Store – Part 4
 * Date Submitted: 16/08/2024
 */

function isValidEmail(email) {
  const emailRegex =
    /^[A-Za-z][A-Za-z0-9._-]{2,}@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

console.log(isValidEmail("myEmail1@email.com")); // true
console.log(isValidEmail("my.Email1@e-mail.com")); // true
console.log(isValidEmail("myEmail1@email.c")); // false
console.log(isValidEmail("m@email1.com")); // false
console.log(isValidEmail(1)); // false
console.log(isValidEmail(true)); // false
console.log(isValidEmail("myEmail1@com")); // false
console.log(isValidEmail("my_Email1@e.com")); // true
console.log(isValidEmail("1m@email.com")); // false
console.log(isValidEmail("my!Email@email.com")); // false

function isAgeOfMajority(birthYear, birthMonth, birthDay) {
  if (typeof birthYear !== "number" || birthYear < 1920 || birthYear > 2010) {
    return false;
  }
  if (typeof birthMonth !== "number" || birthMonth < 1 || birthMonth > 12) {
    return false;
  }
  if (typeof birthDay !== "number" || birthDay < 1 || birthDay > 31) {
    return false;
  }

  const TODAY = new Date();
  let birthDate = new Date(`${birthMonth}/${birthDay}/${birthYear}`);
  /*
   * The Date constructor can take a date string or separate year, month, and day values.
   * Joining the parameters into a single string helps ensure the date is interpreted correctly.
   * This is important because different browsers might handle date formats in various ways.
   */
  const ageDifference = TODAY - birthDate;

  return ageDifference > 6570 * 24 * 60 * 60 * 1000;
}

console.log(isAgeOfMajority(2005, 2, 25)); // true – just old enough
console.log(isAgeOfMajority(1997, 2, 29)); // false – not a leap year
console.log(isAgeOfMajority(2008, 5, 1)); // false
console.log(isAgeOfMajority(2000, 1, 1)); // true
console.log(isAgeOfMajority(1980, 12, 31)); // true
console.log(isAgeOfMajority("1980", "12", 31)); // false – wrong data type in parameter

let formIsValid = true;
const inputs = document.querySelectorAll("input");
const textarea = document.querySelector("textarea");
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const dob = document.getElementById("dob").value;
  const [year, month, day] = dob.split("-").map(Number);
  const email = document.getElementById("email").value.trim();
  const confirmEmail = document.getElementById("confirm-email").value.trim();
  const message = document.getElementById("message").value.trim();
  const consent = document.getElementById("checkbox").checked;

  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const dobError = document.getElementById("dobError");
  const emailError = document.getElementById("emailError");
  const confirmEmailError = document.getElementById("confirmEmailError");
  const messageError = document.getElementById("messageError");
  const consentError = document.getElementById("consentError");

  // Reset error messages
  nameError.style.display = "none";
  phoneError.style.display = "none";
  dobError.style.display = "none";
  emailError.style.display = "none";
  confirmEmailError.style.display = "none";
  messageError.style.display = "none";
  consentError.style.display = "none";

  if (name === "") {
    nameError.style.display = "inline";
    formIsValid = false;
  }

  if (!/^\d{10}$/.test(phone)) {
    phoneError.style.display = "inline";
    formIsValid = false;
  }

  if (!dob || !isAgeOfMajority(year, month, day)) {
    dobError.style.display = "inline";
    formIsValid = false;
  }

  if (!isValidEmail(email)) {
    emailError.style.display = "inline";
    formIsValid = false;
  }

  if (email !== confirmEmail) {
    confirmEmailError.style.display = "inline";
    formIsValid = false;
  }

  if (message.length < 3) {
    messageError.style.display = "inline";
    formIsValid = false;
  }

  if (!consent) {
    consentError.style.display = "inline";
    formIsValid = false;
  }
});

function handleSubmit(event) {
  event.preventDefault();

  if (!formIsValid) {
  } else {
    document.getElementById("success-message").style.display = "block";

    setTimeout(() => {
      document.getElementById("success-message").style.display = "none";
      inputs.forEach((input) => (input.value = ""));
      textarea.value = "";
    }, 2000);
  }
}

contactForm.addEventListener("submit", handleSubmit);

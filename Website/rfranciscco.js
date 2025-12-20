
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

const titleText = "My Name Is Rassel Kurt Francisco";
let index = 0;
const titleElement = document.querySelector("header h1");

titleElement.textContent = "";

function typeEffect() {
  if (index < titleText.length) {
    titleElement.textContent += titleText.charAt(index);
    index++;
    setTimeout(typeEffect, 80);
  }
}
typeEffect();


const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.querySelector('input[type="text"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const message = form.querySelector("textarea").value;

  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields.");
  } else {
    alert("Thank you! Your message has been sent.");
    form.reset();
  }
});


const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
      section.style.opacity = 1;
      section.style.transform = "translateY(0)";
    }
  });
});


sections.forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(30px)";
  section.style.transition = "all 0.6s ease";
});

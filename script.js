const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

const revealElements = document.querySelectorAll(
  ".about, .food-card, .review-card, .contact-card, .stat-card, .reservation-box",
);

function revealOnScroll() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const revealTop = element.getBoundingClientRect().top;
    const revealPoint = 120;

    if (revealTop < windowHeight - revealPoint) {
      element.classList.add("active");
      element.classList.add("reveal");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.style.padding = "12px 8%";
    navbar.style.background = "rgba(5,8,22,0.95)";
    navbar.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
  } else {
    navbar.style.padding = "18px 8%";
    navbar.style.background = "rgba(5,8,22,0.75)";
    navbar.style.boxShadow = "none";
  }
});

const counters = document.querySelectorAll(".stat-card h2");

let counterStarted = false;

function startCounters() {
  if (counterStarted) return;

  const statsSection = document.querySelector(".stats");

  const sectionTop = statsSection.getBoundingClientRect().top;

  if (sectionTop < window.innerHeight - 100) {
    counterStarted = true;

    counters.forEach((counter) => {
      const originalText = counter.innerText;

      const numericValue = parseInt(originalText.replace(/\D/g, ""));

      let count = 0;

      const speed = numericValue / 80;

      const updateCounter = () => {
        if (count < numericValue) {
          count += speed;

          if (originalText.includes("k")) {
            counter.innerText = Math.floor(count) + "k+";
          } else if (originalText.includes("+")) {
            counter.innerText = Math.floor(count) + "+";
          } else {
            counter.innerText = count.toFixed(1);
          }

          requestAnimationFrame(updateCounter);
        } else {
          counter.innerText = originalText;
        }
      };

      updateCounter();
    });
  }
}

window.addEventListener("scroll", startCounters);
startCounters();

const reviews = document.querySelectorAll(".review-card");

let reviewIndex = 0;

function rotateReviews() {
  reviews.forEach((card) => {
    card.style.opacity = "0.5";
    card.style.transform = "scale(0.95)";
  });

  reviews[reviewIndex].style.opacity = "1";
  reviews[reviewIndex].style.transform = "scale(1.05)";

  reviewIndex++;

  if (reviewIndex >= reviews.length) {
    reviewIndex = 0;
  }
}

if (reviews.length > 0) {
  rotateReviews();

  setInterval(() => {
    rotateReviews();
  }, 2500);
}

const heroImage = document.querySelector(".hero-image img");

window.addEventListener("mousemove", (e) => {
  if (!heroImage) return;

  let x = (window.innerWidth / 2 - e.pageX) / 40;
  let y = (window.innerHeight / 2 - e.pageY) / 40;

  heroImage.style.transform = `translate(${x}px, ${y}px)`;
});

const buttons = document.querySelectorAll(".primary-btn, .book-btn");

buttons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const circle = document.createElement("span");

    const diameter = Math.max(this.clientWidth, this.clientHeight);

    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;

    circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;

    circle.style.top = `${e.clientY - this.offsetTop - radius}px`;

    circle.classList.add("ripple");

    const ripple = this.querySelector(".ripple");

    if (ripple) {
      ripple.remove();
    }

    this.appendChild(circle);
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("load", () => {
  document.body.style.opacity = "0";

  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease";

    document.body.style.opacity = "1";
  }, 100);
});

console.log("Blue Flame Restaurant Loaded Successfully 🚀");

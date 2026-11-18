
/* ================= DARK / LIGHT MODE ================= */

const themeToggle = document.getElementById("theme-toggle");

function setTheme(theme) {
    document.body.classList.toggle("dark", theme === "dark");

    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );

    localStorage.setItem("theme", theme);
}

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

// Toggle theme on click
themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");

    setTheme(isDark ? "light" : "dark");
});


/* ================= MOBILE NAVIGATION ================= */

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

// Open / close mobile menu
menuToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Close menu after clicking a navigation link
const navLinks = document.querySelectorAll(".navbar a");

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navbar.classList.remove("open");

        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});

// Close menu when clicking outside
document.addEventListener("click", (event) => {
    const clickedInsideNavbar = navbar.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideNavbar && !clickedMenuButton) {
        navbar.classList.remove("open");

        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
});

// Reset mobile menu when resizing to desktop
window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
        navbar.classList.remove("open");

        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
});


/* ================= SCROLL TO TOP ================= */

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    scrollTopBtn.style.display =
        window.scrollY > 300 ? "block" : "none";
});

// Scroll smoothly to the top
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* ================= SCROLL PROGRESS BAR ================= */

const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress =
        scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    scrollProgress.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("resize", updateScrollProgress);

// Set initial progress
updateScrollProgress();


/* ================= REVEAL ANIMATION ================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");

                // Stop observing after revealing
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

// Observe each reveal section
revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    const subject = encodeURIComponent("Portfolio Contact - " + name);

    const body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n\n" +
        "Message:\n" + message
    );

    const mailtoLink =
        "mailto:vyugendhar18@gmail.com" +
        "?subject=" + subject +
        "&body=" + body;

    // Open the visitor's default email application
    window.location.href = mailtoLink;
});


/* ================= FOOTER YEAR ================= */

const yearElement = document.getElementById("current-year");

yearElement.textContent = new Date().getFullYear();

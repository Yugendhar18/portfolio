// Dark Mode Toggle
const toggle = document.getElementById("theme-toggle");
toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};

// Load theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Scroll To Top
const btn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  btn.style.display = window.scrollY > 300 ? "block" : "none";
};
btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

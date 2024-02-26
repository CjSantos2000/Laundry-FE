// Function to handle the scroll event
function handleScroll() {
  const navbar = document.getElementById("navbar");

  // Get the current scroll position
  const scrollPosition = window.scrollY;

  // If the scroll position is greater than 0, add the "sticky" class
  if (scrollPosition > 0) {
    navbar.classList.add("sticky-top");
    navbar.style.height = "70px"; // New height when scrolled
  } else {
    navbar.classList.remove("sticky-top");
    navbar.style.height = "90px"; // Initial height when not scrolled
  }
}

// Add a scroll event listener to the window
window.addEventListener("scroll", handleScroll);

function handleScroll2() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // Show the button when user scrolls down 20px from the top
  if (window.scrollY > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// Function to scroll to the top when the button is clicked
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Add smooth scrolling behavior
  });
}

// Add a scroll event listener to the window
window.addEventListener("scroll", handleScroll2);

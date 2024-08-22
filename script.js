const back = document.querySelector(".card-side.back");
const front = document.querySelector(".card-side.front");

// Toggle between displaying the back and front of the card
function display() {
  back.style.transform = "rotateY(0deg)";
  front.style.transform = "rotateY(180deg)";
}

function hide() {
  back.style.transform = "rotateY(180deg)";
  front.style.transform = "rotateY(0deg)";
}

document.getElementById("download-btn").addEventListener("click", function () {
  // Trigger the download of the CV (replace 'cv.pdf' with your actual CV file path)
  window.location.href = "cv.pdf";
});

const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
}

// Check if the user has previously saved a theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  setTheme(savedTheme);
}

// Add an event listener to the toggle button to switch between themes
themeToggleBtn.addEventListener("click", () => {
  const currentTheme = body.classList.contains("dark-mode") ? "dark" : "light";
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

// Show a preview of the CV when hovering over a preview link
//   document.getElementById("preview-link").addEventListener("mouseover", function() {
//     const previewURL = this.getAttribute("data-preview");
//     const previewPopup = document.getElementById("preview-popup");

//     // Set position of the popup
//     previewPopup.style.left = `${event.pageX}px`;
//     previewPopup.style.top = `${event.pageY + 10}px`;

//     // Load preview content (e.g., an image or iframe)
//     previewPopup.innerHTML = `<iframe src="${previewURL}" width="100%" height="200px" frameborder="0"></iframe>`;
//     previewPopup.classList.add("active");
//   });

document.addEventListener("DOMContentLoaded", function () {
  const previewLinks = document.querySelectorAll(".link");
  const previewPopup = document.getElementById("preview-popup");

  previewLinks.forEach((link) => {
    link.addEventListener("mouseover", function (event) {
      const previewURL = this.getAttribute("data-preview");

      // Load preview content (e.g., an image or iframe)
      previewPopup.innerHTML = `<iframe src="${previewURL}" width="100%" height="100%" frameborder="0"></iframe>`;
      previewPopup.classList.add("active");

      // Adjust position to avoid going off-screen
      const popupWidth = previewPopup.offsetWidth;
      const popupHeight = previewPopup.offsetHeight;
      let left = event.pageX + 10;
      let top = event.pageY + 10;

      if (left + popupWidth > window.innerWidth) {
        left = window.innerWidth - popupWidth - 10;
      }

      if (top + popupHeight > window.innerHeight) {
        top = window.innerHeight - popupHeight - 10;
      }

      previewPopup.style.left = `${left}px`;
      previewPopup.style.top = `${top}px`;
    });

    link.addEventListener("mouseout", function () {
      previewPopup.classList.remove("active");
      previewPopup.innerHTML = "";
    });
  });
});

/* -------------------------------------------------------------------------- */
/*                                  Research                                  */
/* -------------------------------------------------------------------------- */

// console.log("hamburger:", hamburger); // Check if the element is found
// console.log("navbar:", navbar);

function navigate() {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");
  console.log("click event triggered");
  hamburger.classList.toggle("change");
  navbar.classList.toggle("change");
}

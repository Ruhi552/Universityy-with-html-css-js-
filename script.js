
/* ==============================
   1. MOBILE NAVIGATION
============================== */

const menuToggle = document.getElementById("menuToggle");
const navList = document.getElementById("navList");

if (menuToggle && navList) {
  menuToggle.addEventListener("click", function () {
    navList.classList.toggle("active");

    menuToggle.textContent = navList.classList.contains("active")
      ? "✕"
      : "☰";
  });
}


/* ==============================
   2. ALL DROPDOWN SUBMENUS
============================== */

const dropdownButtons = document.querySelectorAll(".dropdown-btn");

dropdownButtons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const parent = button.closest(".has-menu");

    if (!parent) return;

    const wasOpen = parent.classList.contains("open");

    // Close all other submenus
    document.querySelectorAll(".has-menu.open").forEach(function (item) {
      item.classList.remove("open");
    });

    // Open the clicked submenu
    if (!wasOpen) {
      parent.classList.add("open");
    }
  });
});


// Close submenu when clicking outside
document.addEventListener("click", function (event) {
  if (!event.target.closest(".has-menu")) {
    document.querySelectorAll(".has-menu.open").forEach(function (item) {
      item.classList.remove("open");
    });
  }
});


// Close submenu when clicking a submenu link
document.querySelectorAll(".mega-menu a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelectorAll(".has-menu.open").forEach(function (item) {
      item.classList.remove("open");
    });

    if (navList) {
      navList.classList.remove("active");
    }

    if (menuToggle) {
      menuToggle.textContent = "☰";
    }
  });
});


// Close mobile navigation after clicking a normal navigation link
document.querySelectorAll(".nav-list > li > a").forEach(function (link) {
  link.addEventListener("click", function () {
    if (navList) {
      navList.classList.remove("active");
    }

    if (menuToggle) {
      menuToggle.textContent = "☰";
    }
  });
});


/* ==============================
   3. SEARCH BUTTON
============================== */

const searchPanel = document.getElementById("searchPanel");
const siteSearch = document.getElementById("siteSearch");
const searchBtn = document.getElementById("searchBtn");
const searchMessage = document.getElementById("searchMessage");
const closeSearch = document.getElementById("closeSearch");


// Create a search toggle button
const navbarContainer = document.querySelector(".navbar .container");

let searchToggle = document.getElementById("searchToggle");

if (navbarContainer && !searchToggle) {
  searchToggle = document.createElement("button");

  searchToggle.type = "button";
  searchToggle.id = "searchToggle";
  searchToggle.className = "nav-link search-toggle";
  searchToggle.textContent = "🔍 SEARCH";

  navbarContainer.appendChild(searchToggle);
}


// Show and hide search box
if (searchToggle && searchPanel) {
  searchToggle.addEventListener("click", function () {
    searchPanel.classList.toggle("show");

    if (searchPanel.classList.contains("show") && siteSearch) {
      siteSearch.focus();
    }
  });
}


if (closeSearch && searchPanel) {
  closeSearch.addEventListener("click", function () {
    searchPanel.classList.remove("show");

    if (searchMessage) {
      searchMessage.textContent = "";
    }
  });
}


// Search page content
function runSearch() {
  if (!siteSearch || !searchMessage) return;

  const query = siteSearch.value.trim().toLowerCase();

  if (query === "") {
    searchMessage.textContent = "Please enter a search word.";
    return;
  }

  const items = document.querySelectorAll(
    "main h1, main h2, main h3, main p, main a"
  );

  let foundItem = null;

  for (const item of items) {
    if (item.textContent.toLowerCase().includes(query)) {
      foundItem = item;
      break;
    }
  }

  if (foundItem) {
    const section = foundItem.closest("section");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    } else {
      foundItem.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }

    searchMessage.textContent = "Matching content found.";
  } else {
    searchMessage.textContent =
      "No matching content found. Try another word.";
  }
}


if (searchBtn) {
  searchBtn.addEventListener("click", runSearch);
}

if (siteSearch) {
  siteSearch.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      runSearch();
    }
  });
}

-/-////////
/* ==============================
   4. HERO IMAGE SLIDER
============================== */

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

let currentSlide = 0;
let sliderTimer = null;


function showSlide(index) {
  if (slides.length === 0) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach(function (slide, i) {
    slide.classList.toggle("active", i === currentSlide);
  });

  dots.forEach(function (dot, i) {
    dot.classList.toggle("active", i === currentSlide);
  });
}


function startSlider() {
  clearInterval(sliderTimer);

  sliderTimer = setInterval(function () {
    showSlide(currentSlide + 1);
  }, 5000);
}


if (slides.length > 0) {
  showSlide(0);
  startSlider();
}


if (prevSlide) {
  prevSlide.addEventListener("click", function () {
    showSlide(currentSlide - 1);
    startSlider();
  });
}


if (nextSlide) {
  nextSlide.addEventListener("click", function () {
    showSlide(currentSlide + 1);
    startSlider();
  });
}


dots.forEach(function (dot) {
  dot.addEventListener("click", function () {
    const slideNumber = Number(dot.dataset.slide);

    showSlide(slideNumber);
    startSlider();
  });
});


/* ==============================
   5. CONTACT FORM
============================== */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (formMessage) {
      formMessage.textContent =
        "Demo only: your message was not sent to a university server.";
    }

    contactForm.reset();
  });
}


/* ==============================
   6. BACK TO TOP BUTTON
============================== */

const backToTop = document.getElementById("backToTop");


window.addEventListener("scroll", function () {
  if (backToTop) {
    backToTop.classList.toggle("show", window.scrollY > 400);
  }
});


if (backToTop) {
  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


/* ==============================
   7. CURRENT YEAR IN FOOTER
============================== */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* --------------------------------------------------Carousel Dragging / Arrows-------------------------------------------------- */ 
document.addEventListener('DOMContentLoaded', function() {
  // Alle Carousel-Container auswählen
  const carousels = document.querySelectorAll(".carousel");
  
  // Für jedes Carousel die Funktionalität einrichten
  carousels.forEach((carousel, carouselIndex) => {
    const firstDiv = carousel.querySelectorAll("div")[0];
    const wrapperEl = carousel.closest('.wrapper');
    const arrowIcons = wrapperEl.querySelectorAll("i");
    
    // Prevent default drag behavior auf divs
    carousel.querySelectorAll("div").forEach(div => {
      div.addEventListener("dragstart", e => e.preventDefault());
    });
    
    // Drag-Variablen für dieses Carousel
    let isDragStart = false;
    let prevPageX, prevScrollLeft;
    let firstDivWidth = firstDiv ? firstDiv.clientWidth + 15 : 0;
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    let wasDragging = false;
    
    // Pfeil-Icons anzeigen/ausblenden
    const showHideIcons = () => {
      if (arrowIcons.length >= 2) {
        arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
        arrowIcons[1].style.display = carousel.scrollLeft >= scrollWidth ? "none" : "block";
      }
    }
    
    // Initial Icons Status festlegen
    showHideIcons();
    
    // Pfeil-Click Events
    arrowIcons.forEach(icon => {
      icon.addEventListener("click", () => {
        let scrollDistance = icon.id == "left" ? -firstDivWidth * 5 : firstDivWidth * 5;
        carousel.scrollLeft += scrollDistance;
        setTimeout(() => showHideIcons(), 550);
      });
    });
    
    // Drag-Funktionen
    const dragStart = (e) => {
      isDragStart = true;
      wasDragging = false;
      prevPageX = e.pageX || (e.touches && e.touches[0].pageX);
      prevScrollLeft = carousel.scrollLeft;
    }
    
    const dragging = (e) => {
      if (!isDragStart) return;
      wasDragging = true;
      e.preventDefault();
      carousel.classList.add("dragging");
      let currentPosition = e.pageX || (e.touches && e.touches[0].pageX);
      if (currentPosition) {
        let positionDiff = currentPosition - prevPageX;
        carousel.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
      }
    }
    
    const dragStop = () => {
      isDragStart = false;
      carousel.classList.remove("dragging");
    }
    
    // Event-Listener für das aktuelle Carousel
    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("touchstart", dragStart);
    carousel.addEventListener("mousemove", dragging);
    carousel.addEventListener("touchmove", dragging);
    carousel.addEventListener("mouseup", dragStop);
    carousel.addEventListener("mouseleave", dragStop);
    carousel.addEventListener("touchend", dragStop);
    
    /* --------------------------------------------------Card Flip-------------------------------------------------- */
    var cards = carousel.querySelectorAll(".card");
    [...cards].forEach((card) => {
      card.addEventListener("click", function(event) {
        if (wasDragging) return;
        if (event.target.tagName.toLowerCase() === "a") return;
        cards.forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.remove("is-flipped");
          }
        });
        card.classList.toggle("is-flipped");
      });
    });
  });
});

/* --------------------------------------------------Darkmode-------------------------------------------------- */

let darkmode = localStorage.getItem("darkmode");
const themeSwitch = document.getElementById("theme-switch");

const enableDarkmode = () => {
  document.body.classList.add("darkmode");
  localStorage.setItem("darkmode", "active");
};

const disableDarkmode = () => {
  document.body.classList.remove("darkmode");
  localStorage.setItem("darkmode", null);
};

if (darkmode === "active") enableDarkmode();

themeSwitch.addEventListener("click", () => {
  darkmode = localStorage.getItem("darkmode");
  darkmode !== "active" ? enableDarkmode() : disableDarkmode();
});
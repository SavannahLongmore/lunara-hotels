import { hotels } from "./hotels.js";

// YEAR
const yearSpan = document.querySelector("#year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// NAV
const navButton = document.querySelector("#navButton");
const primaryNav = document.querySelector("#primaryNav");

if (navButton && primaryNav) {
  navButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    navButton.classList.toggle("open");
    navButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
  if (e.target.closest(".nav-overlay")) {
    primaryNav.classList.remove("open");
    navButton.classList.remove("open");
    navButton.setAttribute("aria-expanded", "false");
  }
});
}




// BUILD CARDS
const hotelCards = document.querySelector("#hotelCards");

if (hotelCards) {
  hotels.forEach((hotel) => {
    const card = document.createElement("article");
    card.classList.add("hotel-card");

    const phoneNumber = hotel.phone.replace(/\D/g, "");

    card.innerHTML = `
      <img src="${hotel.image}" alt="${hotel.alt}" width="600" height="400" loading="lazy">

      <div class="hotel-card__content">
        <h3>${hotel.name}</h3>

        <address>
          <span>${hotel.address[0]}</span>
          <span>${hotel.address[1]}</span>
        </address>

        <a href="tel:+1${phoneNumber}" class="phone-link">${hotel.phone}</a>

        <a href="#" class="card-button" data-name="${hotel.name}">
          Check Rates <span class="arrow">→</span>
        </a>
      </div>
    `;

    hotelCards.appendChild(card);
  });
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".card-button")) {
    e.preventDefault();

    const button = e.target.closest(".card-button");
    const hotelName = button.dataset.name;

    openModal(hotelName);
  }
});

function openModal(name) {
  const modal = document.querySelector("#hotelModal");
  const modalTitle = modal.querySelector(".modal-title");

  modalTitle.textContent = name;
  modal.classList.add("open");
}

function closeModal() {
  document.querySelector("#hotelModal").classList.remove("open");
}
document.addEventListener("click", (e) => {
  if (
    e.target.closest(".modal-overlay") ||
    e.target.closest(".modal-close")
  ) {
    closeModal();
  }
});
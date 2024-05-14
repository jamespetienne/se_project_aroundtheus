const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// ELEMENTS
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditClose = document.querySelector("#profile-edit-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const galleryCardEl = document.querySelector(".gallery__cards");

// FUNCTION DECLARATIONS

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function openEditProfileModal() {
  fillProfileForm();
  profileEditModal.classList.add("modal_opened");
}

// EVENT HANDLERS

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", openEditProfileModal);

profileEditClose.addEventListener("click", closePopup);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// CALLING EVENT HANDLERS FOR INITIAL CARDS
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  galleryCardEl.append(cardElement);
});

/*
document.addEventListener("DOMContentLoaded", function () {
  // Constants
  const CARD_TEMPLATE_ID = "card-template";
  const PROFILE_MODAL_ID = "profile-edit-modal";
  const PROFILE_EDIT_BUTTON_ID = "profile-edit-button";
  const PROFILE_EDIT_CLOSE_ID = "profile-edit-close";
  const PROFILE_TITLE_SELECTOR = ".profile__title";
  const PROFILE_DESCRIPTION_SELECTOR = ".profile__description";
  const PROFILE_TITLE_INPUT_ID = "profile-title-input";
  const PROFILE_DESCRIPTION_INPUT_ID = "profile-description-input";

  // Elements
  const profileEditButton = document.getElementById(PROFILE_EDIT_BUTTON_ID);
  const profileEditModal = document.getElementById(PROFILE_MODAL_ID);
  const profileEditClose = document.getElementById(PROFILE_EDIT_CLOSE_ID);
  const profileTitle = document.querySelector(PROFILE_TITLE_SELECTOR);
  const profileDescription = document.querySelector(
    PROFILE_DESCRIPTION_SELECTOR
  );
  const profileTitleInput = document.getElementById(PROFILE_TITLE_INPUT_ID);
  const profileDescriptionInput = document.getElementById(
    PROFILE_DESCRIPTION_INPUT_ID
  );
  const cardTemplate =
    document.getElementById(CARD_TEMPLATE_ID).content.firstElementChild;
  const galleryCardEl = document.querySelector(".gallery__cards");
  const profileEditForm = profileEditModal.querySelector(".modal__form");

  // Functions
  function closePopup() {
    profileEditModal.classList.remove("modal_opened");
  }

  function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardTitleEl = cardElement.querySelector(".card__title");
    cardTitleEl.textContent = cardData.name;
    cardImageEl.src = cardData.link;
    cardImageEl.alt = cardData.name;
    return cardElement;
  }

  function fillProfileForm() {
    profileTitleInput.value = profileTitle.textContent;
    profileDescriptionInput.value = profileDescription.textContent;
  }

  function openEditProfileModal() {
    fillProfileForm();
    profileEditModal.classList.add("modal_opened");
  }

  function handleProfileEditSubmit(e) {
    e.preventDefault();
    profileTitle.textContent = profileTitleInput.value;
    profileDescription.textContent = profileDescriptionInput.value;
    closePopup();
  }

  // Event Listeners
  profileEditButton.addEventListener("click", openEditProfileModal);
  profileEditClose.addEventListener("click", closePopup);
  profileEditForm.addEventListener("submit", handleProfileEditSubmit);

  // Initialize
  initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    galleryCardEl.append(cardElement);
  });
});
*/

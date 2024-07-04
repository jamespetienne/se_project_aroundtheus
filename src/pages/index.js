/** 
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

// Initial Cards Data
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

// Elements
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditClose = profileEditModal.querySelector("#profile-edit-close");
const addCardModalButton = document.querySelector("#modal-add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalClose = addCardModal.querySelector("#modal-add-close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardFormElement = addCardModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const galleryCardEl = document.querySelector(".gallery__cards");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector("#preview-image");
const previewImageCaption = document.querySelector("#preview-image-caption");
const previewImageClose = document.querySelector("#preview-image-close");

// Validation Settings
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Functions
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscClose);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscClose);
}

function handleOverlayClose(evt) {
  if (evt.target.classList.contains("modal")) {
    closePopup(evt.target);
  }
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopup(openModal);
  }
}

function handleImageClick(name, link) {
  previewImage.src = link;
  previewImage.alt = name;
  previewImageCaption.textContent = name;
  openPopup(previewImageModal);
}

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  wrapper.prepend(cardElement);
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// Event Handlers
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, galleryCardEl);
  closePopup(addCardModal);
  addCardFormElement.reset();
  addCardFormValidator.resetValidation();
}

// Event Listeners
profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileEditClose.addEventListener("click", () => closePopup(profileEditModal));

addCardModalButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

addCardFormElement.addEventListener("submit", handleAddCardSubmit);
addCardModalClose.addEventListener("click", () => closePopup(addCardModal));

previewImageClose.addEventListener("click", () =>
  closePopup(previewImageModal)
);

profileEditModal.addEventListener("click", handleOverlayClose);
addCardModal.addEventListener("click", handleOverlayClose);
previewImageModal.addEventListener("click", handleOverlayClose);

// Initialize Cards
initialCards.forEach((cardData) => renderCard(cardData, galleryCardEl));

// Initialize Form Validation
const profileEditFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
addCardFormValidator.enableValidation();
*/

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationSettings,
  profileSelectors,
} from "../utils/utils.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

// Initialize Cards Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = new Card(cardData, "#card-template", handleImageClick);
      const cardElement = card.getView();
      cardSection.addItem(cardElement);
    },
  },
  ".gallery__cards"
);

cardSection.renderItems();

// Initialize Popups
const imagePopup = new PopupWithImage("#preview-image-modal");
imagePopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const cardData = { name: formData.title, link: formData.url };
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardSection.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({ name: formData.title, job: formData.description });
    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();

// Initialize UserInfo
const userInfo = new UserInfo(profileSelectors);

document.querySelector("#profile-edit-button").addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  document.querySelector("#profile-title-input").value = userData.name;
  document.querySelector("#profile-description-input").value = userData.job;
  editProfilePopup.open();
});

document.querySelector("#modal-add-button").addEventListener("click", () => {
  addCardPopup.open();
});

// Initialize Form Validation
const profileEditFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#edit-profile-form")
);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  validationSettings,
  document.querySelector("#add-card-form")
);
addCardFormValidator.enableValidation();

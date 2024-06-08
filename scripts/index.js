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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const galleryCardEl = document.querySelector(".gallery__cards");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector("#preview-image");
const previewImageCaption = document.querySelector("#preview-image-caption");
const previewImageClose = document.querySelector("#preview-image-close");

// FUNCTION DECLARATIONS

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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const trashButton = cardElement.querySelector(".card__trash-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageCaption.textContent = cardData.name;
    openPopup(previewImageModal);
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// FORM ELEMENT

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

// EVENT HANDLERS

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
}

// EVENT LISTENERS

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openPopup(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);
profileEditClose.addEventListener("click", () => closePopup(profileEditModal));
addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalClose.addEventListener("click", () => closePopup(addCardModal));
previewImageClose.addEventListener("click", () =>
  closePopup(previewImageModal)
);

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", handleOverlayClose);
});

// CALLING EVENT HANDLERS FOR INITIAL CARDS
initialCards.forEach((cardData) => renderCard(cardData, galleryCardEl));

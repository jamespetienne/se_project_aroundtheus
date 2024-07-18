// Import CSS and JS Modules
import "../pages/index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, validationSettings } from "../utils/utils.js";
import Api from "../components/Api.js";

// DOM Elements
const profileEditModal = document.querySelector("#profileEditModal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const avatarFormElement = document.querySelector("#change-profile-form");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileImageEditButton = document.querySelector(
  ".profile-image__edit-button"
);

// API Initialization
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "740df34c-ea9e-4ff2-ad05-85becca779ab",
    "Content-Type": "application/json",
  },
});

let cardList;
let userInfo;

// Load Initial Data
api
  .loadPageResults()
  .then(([card, userData]) => {
    // Initialize Card List
    cardList = new Section(
      {
        items: [...initialCards, ...card],
        renderer: createCard,
      },
      ".gallery__cards"
    );
    cardList.renderItems();

    // Initialize User Info
    userInfo = new UserInfo(
      ".profile__title",
      ".profile__description",
      ".profile__image"
    );
    userInfo.setUserInfo({ title: userData.name, description: userData.about });
    userInfo.setUserImage(userData.avatar);
  })
  .catch(console.error);

// Function to Create Card
function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handlePreviewPicture,
    handleDeleteClick,
    handleLikeClick
  );
  return cardElement.getView();
}

// Profile Edit Submit Handler
function handleProfileEditSubmit(userData) {
  profilePopupForm.setLoading(true);
  api
    .fetchEditProfile(userData)
    .then(() => {
      userInfo.setUserInfo({
        title: userData.title,
        description: userData.description,
      });
      profilePopupForm.close();
    })
    .catch((err) => console.error(err))
    .finally(() => profilePopupForm.setLoading(false));
}

// Initialize Profile Image Popup Form
const profileImagePopupForm = new PopupWithForm(
  "#picture-modal",
  handleProfilePictureEdit
);
profileImagePopupForm.setEventListeners();

// Profile Image Edit Button Click Event
profileImageEditButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  profileImagePopupForm.open();
  addFormValidator.disableButton();
  avatarFormElement.reset();
});

// Profile Picture Edit Handler
function handleProfilePictureEdit(userData) {
  profileImagePopupForm.setLoading(true);
  api
    .fetchProfilePicture(userData.profileurl)
    .then((userData) => {
      avatarFormElement.reset();
      profileImagePopupForm.close();
      userInfo.setUserImage(userData.avatar);
    })
    .catch(console.error)
    .finally(() => profileImagePopupForm.setLoading(false));
}

// Initialize Add Card Popup Form
const cardPopupForm = new PopupWithForm(
  "#add-card-modal",
  handleNewCardFormSubmit
);
cardPopupForm.setEventListeners();

// Add New Card Form Submit Handler
function handleNewCardFormSubmit(userInfo) {
  cardPopupForm.setLoading(true);
  api
    .fetchNewCard(userInfo)
    .then((res) => {
      cardList.addItem(res);
    })
    .then(() => {
      addCardFormElement.reset();
      addFormValidator.disableButton();
      cardPopupForm.close();
    })
    .catch(console.error)
    .finally(() => cardPopupForm.setLoading(false));
}

// Initialize Popup With Image
const popupWithImage = new PopupWithImage("#preview-picture-modal");
popupWithImage.setEventListeners();

// Handle Preview Picture
function handlePreviewPicture(cardData) {
  popupWithImage.open(cardData);
}

// Initialize Profile Popup Form
const profilePopupForm = new PopupWithForm(
  "#profileEditModal",
  handleProfileEditSubmit
);
profilePopupForm.setEventListeners();

// Profile Edit Button Click Event
profileEditButton.addEventListener("click", () => {
  profilePopupForm.open();
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.title;
  profileDescriptionInput.value = userData.description;
  editFormValidator.disableButton();
});

// Add New Card Button Click Event
addNewCardButton.addEventListener("click", () => cardPopupForm.open());

// Initialize Delete Confirmation Popup
const deleteConfirmPopup = new PopupWithConfirmation("#confirm-modal");
deleteConfirmPopup.setEventListeners();

// Handle Delete Click
function handleDeleteClick(cardElement) {
  deleteConfirmPopup.open();

  deleteConfirmPopup.setSubmitAction(() => {
    deleteConfirmPopup.setLoading(true);
    api
      .fetchDeleteCard(cardElement.getId())
      .then(() => {
        cardElement.removeCard();
        deleteConfirmPopup.close();
      })
      .catch(console.error)
      .finally(() => deleteConfirmPopup.setLoading(false));
  });
}

// Handle Like Click
function handleLikeClick(cardElement) {
  if (cardElement.getLikes()) {
    api
      .fetchDisLikeCard(cardElement.getId())
      .then((res) => {
        cardElement.renderLikes(res.isLiked);
        cardElement._isLiked = res.isLiked;
      })
      .catch(console.error);
  } else {
    api
      .fetchLikeCard(cardElement.getId())
      .then((res) => {
        cardElement.renderLikes(res.isLiked);
        cardElement._isLiked = res.isLiked;
      })
      .catch(console.error);
  }
}

// Initialize Form Validators
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModal
);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(
  validationSettings,
  addCardFormElement
);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(
  validationSettings,
  avatarFormElement
);
avatarFormValidator.enableValidation();

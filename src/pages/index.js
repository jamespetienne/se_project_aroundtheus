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

// Function to handle image click and open popup
const handleImageClick = (name, link) => {
  imagePopup.open({ name, link });
};

// Function to create a card
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

// Initialize Cards Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
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
  const cardElement = createCard(cardData);
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
  editProfilePopup.setInputValues(userData); // Use setInputValues method
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

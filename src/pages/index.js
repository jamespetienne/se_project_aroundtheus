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
import { api } from "./Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation";

// Initialize API
const api = new Api(apiConfig);

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

const addCardForm = document.querySelector("#add-card-form");
const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const cardData = { name: formData.title, link: formData.url };
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
  addCardForm.reset();
  addCardFormValidator.resetValidation();
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
  editProfilePopup.setInputValues({
    title: userData.name,
    description: userData.job,
  });
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

const deleteConfirmationPopup = new PopupWithConfirmation(
  ".modal_type_delete",
  () => {
    return api.deleteCard(cardId).then(() => {
      cardElement.remove();
      cardElement = null;
    });
  }
);

deleteConfirmationPopup.setEventListeners();

// API SECTION

// Function to load user info and cards
function loadPageData() {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
      // Update user profile with fetched data
      userInfo.setUserInfo(userData);
      userInfo.setUserAvatar(userData.avatar);

      // Render cards with fetched data
      initialCards.forEach((cardData) => {
        const card = createCard(cardData);
        cardList.addItem(card);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

// Call loadPageData on page load
loadPageData();

// Event listener for editing profile
profileEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const userData = {
    name: profileNameInput.value,
    about: profileAboutInput.value,
  };

  api
    .editProfile(userData)
    .then((updatedUserData) => {
      userInfo.setUserInfo(updatedUserData);
      profilePopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
});

// Event listener for adding a new card
cardAddForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  api
    .addCard(cardData)
    .then((newCardData) => {
      const card = createCard(newCardData);
      cardList.addItem(card);
      cardAddPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
});

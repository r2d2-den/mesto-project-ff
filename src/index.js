// Импорт необходимых функций и данных из внешних модулей и файлов
// import { initialCards } from "./scripts/cards.js";
import { createCard } from "./scripts/card.js";
import { closeModal, openModal } from "./scripts/modal.js";
import { enableValidation } from "./scripts/validation.js";
import { clearValidation } from "./scripts/validation.js";
import {
  createNewCard,
  getAllCrds,
  getUser,
  newUser,
  deleteCardApi,
  addAvatar
} from "./scripts/api.js";

// Импорт файла CSS для стилизации
import "./pages/index.css";
let userId = null;
// Выбор элементов DOM и сохранение их в переменные
const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const imageContainerCard = document.querySelector(".popup__image");
const popupTypeImage = document.querySelector(".popup_type_image");
const cardContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const popupInputTypeName = document.querySelector(".popup__input_type_name");
const popupInputTypeJob = document.querySelector(".popup__input_type_description");
const profileDescription = document.querySelector(".profile__description");
const popupInpuTypeCardName = document.querySelector(".popup__input_type_card-name");
const popupInputTypeUrl = document.querySelector(".popup__input_type_url");
const atributeNameEditProfile = document.querySelector('[name="edit-profile"]');
const atributeNameNewPlace = document.querySelector('[name="new-place"]');
const atributeNameEditAvatar = document.querySelector('[name="edit-avatar-profile"]');
const closeButtons = document.querySelectorAll(".popup__close");
const popupCaption = document.querySelector(".popup__caption");
const profileAvatar = document.querySelector(".profile__image");
const popupRemoveCard = document.querySelector(".popup_type_remov-card");
const popupTypeEditAvatar = document.querySelector('.popup_type_edit_avatar')

// настройки валидации
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// функция добавления слушателя на кнопки закрытия модальных окон
const addClickListenerButtonClose = (elem) => {
  closeButtons.forEach((e) => {
    e.addEventListener("click", () => {
      closeModal(elem);
    
    });
  });
};

// функция меняющая текст кнопок при отправки формы на сервер
const submitStatusText = (popup, text) => {
  const button = popup.querySelector('.popup__button');
  button.textContent = text;
  }

  // вызов функции для добавления обработчика событий клика к кнопкам закрытия модалки
addClickListenerButtonClose(popupTypeImage);
addClickListenerButtonClose(popupTypeEdit);
addClickListenerButtonClose(popupTypeNewCard);
addClickListenerButtonClose(popupRemoveCard);
addClickListenerButtonClose(popupTypeEditAvatar);

// Определение функции для открытия модального окна с изображением при клике на изображение
const openPopupOnImageClick = (event) => {
  openModal(popupTypeImage);
  imageContainerCard.src = event.target.src;
  imageContainerCard.alt, (popupCaption.textContent = event.target.alt);
};

// Определение функции для добавления обработчика событий клика к элементам
const addClickListener = (element, popup) => {
  element.addEventListener("click", () => {
    openModal(popup);
    clearValidation(popup, config);
    enableValidation(config);
  });

};

// Добавление обработчиков событий для кнопок редактирования профиля и добавления карточки для открытия соответствующих модальных окон
addClickListener(profileEditButton, popupTypeEdit);
addClickListener(profileAddButton, popupTypeNewCard);
addClickListener(profileAvatar, popupTypeEditAvatar);


// Определение функции для обработки отправки формы и обновления информации профиля
const addSubmitHandler = (form, popup, submitHandler) => {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    submitHandler(popup);
  });
};

// функция возвращающая в консоль текст ошибки
const renderError = (item) => {
  console.log(item)
}
// функция открытия попапа удаления карточки и удаление карточки 
const openPopupRemoveCard = (card, id) => {
  openModal(popupRemoveCard);
  console.log(id);
  popupRemoveCard.addEventListener("submit", (evt) => {
    evt.preventDefault();
    submitStatusText(popupRemoveCard, "Удаление...");
    deleteCardApi(id).then(() => {
      card.remove();
      closeModal(popupRemoveCard);
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`)
    })
    .finally(() => {
      submitStatusText(popupRemoveCard, "Да");
  });
  });
};

// хендлер меняющий аватар пользователя
const handleEditAvatarSubmit = (popup) => {
  submitStatusText(popup, "Сохранение..");
  const linkAvatar = popup.querySelector('.popup__input_typet_avatar_url').value;
  addAvatar(linkAvatar)
  .then((data) => {
    profileAvatar.style = `background-image: url(${data.avatar})`;
    closeModal(popup);})
    .catch((err) => {
      renderError(`Ошибка: ${err}`)
    })
    .finally(() => {
      submitStatusText(popup, "Сохранить");
  });
}
// хендлер редактирования информации пользователя
const handleEditProfileSubmit = (popup) => {
  submitStatusText(popup, "Сохранение..")
  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeJob.value;
  newUser(popupInputTypeName.value, popupInputTypeJob.value);
  getUser()
  .then(() => {
    closeModal(popup);
  })
  .catch((err) => {
    renderError(`Ошибка: ${err}`)
  })
  .finally(() => {
    submitStatusText(popup, "Сохранить");
});
};

// хендлер добавления новой карточки
const handleNewPlaceSubmit = (popup) => {
  submitStatusText(popup, "Сохранение..");
  const newCardData = {
    name: popupInpuTypeCardName.value,
    link: popupInputTypeUrl.value
  };
  createNewCard(newCardData, userId)
    .then((data) => {
      const newCard = createCard(data, openPopupOnImageClick, openPopupRemoveCard, userId);
      cardContainer.prepend(newCard);
      closeModal(popup);
      atributeNameNewPlace.reset();
    })
    .catch((err) => {
      renderError(`Ошибка: ${err}`)
    })
    .finally(() => {
      submitStatusText(popup, "Сохранить");
  });
};



// Добавление обработчиков событий отправки формы для редактирования профиля и добавления нового места
addSubmitHandler(atributeNameEditProfile, popupTypeEdit, handleEditProfileSubmit);
addSubmitHandler(atributeNameNewPlace, popupTypeNewCard, handleNewPlaceSubmit);
addSubmitHandler(atributeNameEditAvatar, popupTypeEditAvatar, handleEditAvatarSubmit);




/// Добавление класса "popup_is-animated" для плавного открытия и закрытия модальных окон при клике
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// массив промисов с данными о карточках и пользователе
  Promise.all([getUser(), getAllCrds()]).then(([userData, allCards]) => {
    profileAvatar.style = `background-image: url(${userData.avatar})`;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    popupInputTypeName.value = userData.name;
    popupInputTypeJob.value = userData.about;

    userId = userData._id;
    
    allCards.forEach((cardData) => {
      cardContainer.appendChild(createCard(cardData, openPopupOnImageClick, openPopupRemoveCard, userId));
    });
  });


  





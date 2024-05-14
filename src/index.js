// Импорт необходимых функций и данных из внешних модулей и файлов
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard } from "./scripts/card.js";
import { closeModal, openModal } from "./scripts/modal.js";

// Импорт файла CSS для стилизации
import "./pages/index.css";

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
const closeButtons = document.querySelectorAll(".popup__close");

// функция добавления слушателя на кнопки закрытия модальных окон
const addClickListenerButtonClose = (elem) => {
  closeButtons.forEach((e) => {
    e.addEventListener("click", () => {
      closeModal(elem);
    });
  });
};

// Определение функции для открытия модального окна с изображением при клике на изображение
const openPopupOnImageClick = (event) => {
  openModal(popupTypeImage);
  imageContainerCard.src = event.target.src;
  imageContainerCard.alt = event.target.alt;
  imageContainerCard.textContent = event.target.name;
  addClickListenerButtonClose(popupTypeImage);
};

// Определение функции для добавления обработчика событий клика к элементам
const addClickListener = (element, popup) => {
  element.addEventListener("click", () => openModal(popup));
  addClickListenerButtonClose(popup);
  if( popup === popupTypeEdit){
    popupInputTypeName.value = profileTitle.textContent;
    popupInputTypeJob.value = profileDescription.textContent;
  }  
};

// Добавление обработчиков событий для кнопок редактирования профиля и добавления карточки для открытия соответствующих модальных окон
addClickListener(profileEditButton, popupTypeEdit);
addClickListener(profileAddButton, popupTypeNewCard);

// Определение функции для обработки отправки формы и обновления информации профиля
const addSubmitHandler = (form, popup, submitHandler) => {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    submitHandler(popup);
  });
};

const handleEditProfileSubmit = (popup) => {
  profileTitle.textContent = popupInputTypeName.value;
  profileDescription.textContent = popupInputTypeJob.value;
  closeModal(popup);
};

// Определение функции для обработки отправки формы при добавлении нового места и создания новой карточки
const handleNewPlaceSubmit = (popup) => {
  const { value: name } = popupInpuTypeCardName;
  const { value: link } = popupInputTypeUrl;
  cardContainer.prepend(
    createCard({ name, link }, deleteCard, openPopupOnImageClick)
  );
  closeModal(popup);
  return (popupInpuTypeCardName.value = ""), (popupInputTypeUrl.value = "");
};

// Добавление обработчиков событий отправки формы для редактирования профиля и добавления нового места
addSubmitHandler(
  atributeNameEditProfile,
  popupTypeEdit,
  handleEditProfileSubmit
);

addSubmitHandler(atributeNameNewPlace, popupTypeNewCard, handleNewPlaceSubmit);

/// Добавление класса "popup_is-animated" для плавного открытия и закрытия модальных окон при клике
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Перебор данных начальных карточек, создание элементов карточек и их добавление в контейнер
initialCards.forEach((cardData) =>
  cardContainer.appendChild(
    createCard(cardData, deleteCard, openPopupOnImageClick)
  )
);

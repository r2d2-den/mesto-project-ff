// Импорт необходимых функций и данных из внешних модулей и файлов
import { initialCards, createCard, deleteCard } from "./scripts/cards.js";
import { closeModal, openModal } from "./scripts/modal.js";

// Импорт файла CSS для стилизации
import "./pages/index.css";

// Выбор элементов DOM и сохранение их в переменные
const popups = document.querySelectorAll(".popup");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const stopClose = document.querySelectorAll(".popup__content");
const imageContainerCard = document.querySelector(".popup__image");
const popupTypeImage = document.querySelector(".popup_type_image");
const cardContainer = document.querySelector(".places__list");

// Определение функции для открытия модального окна с изображением при клике на изображение
const openPopupOnImageClick = (event) => {
  openModal(popupTypeImage);
  imageContainerCard.src = event.target.src;
};
// Определение функции для добавления обработчика событий клика к элементам
const addClickListener = (element, popup) => {
  element.addEventListener("click", () => openModal(popup));
};

// Добавление обработчиков событий для кнопок редактирования профиля и добавления карточки для открытия соответствующих модальных окон
addClickListener(
  document.querySelector(".profile__edit-button"),
  popupTypeEdit
);
addClickListener(
  document.querySelector(".profile__add-button"),
  popupTypeNewCard
);

// Определение функций для обработки отправки формы и обновления информации профиля
const addSubmitHandler = (form, popup, submitHandler) => {
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    submitHandler(popup);
  });
};

// Определение функции для обработки отправки формы при добавлении нового места и создания новой карточки
const handleEditProfileSubmit = (popup) => {
  document.querySelector(".profile__title").textContent =
    document.querySelector(".popup__input_type_name").value;
  document.querySelector(".profile__description").textContent =
    document.querySelector(".popup__input_type_description").value;
  closeModal(popup);
};

const handleNewPlaceSubmit = (popup) => {
  const { value: name } = document.querySelector(
    ".popup__input_type_card-name"
  );
  const { value: link } = document.querySelector(".popup__input_type_url");
  cardContainer.prepend(
    createCard({ name, link }, deleteCard, openPopupOnImageClick)
  );
  closeModal(popup);
};

// Добавление обработчиков событий отправки формы для редактирования профиля и добавления нового места
addSubmitHandler(
  document.querySelector('[name="edit-profile"]'),
  popupTypeEdit,
  handleEditProfileSubmit
);
addSubmitHandler(
  document.querySelector('[name="new-place"]'),
  popupTypeNewCard,
  handleNewPlaceSubmit
);

// Предотвращение закрытия модальных окон при клике внутри контента модального окна
stopClose.forEach((evt) => {
  evt.addEventListener("click", (event) => event.stopPropagation());
});

// Добавление обработчиков событий для закрытия модальных окон при клике на фон, нажатии Escape или клике на кнопку закрытия
popups.forEach((popup) => {
  const buttonCloseModal = popup.querySelector(".popup__close");
  popup.classList.add("popup_is-animated");

  const closePopup = () => closeModal(popup);

  document.addEventListener(
    "keydown",
    (event) => event.key === "Escape" && closePopup()
  );

  popup.addEventListener("click", closePopup);
  buttonCloseModal.addEventListener("click", closePopup);
});

// Перебор данных начальных карточек, создание элементов карточек и их добавление в контейнер
initialCards.forEach((cardData) =>
  cardContainer.appendChild(
    createCard(cardData, deleteCard, openPopupOnImageClick)
  )
);

import { addLike, deleteLike } from "./api.js";

// Функция обработки клика по кнопке лайка
const handleLikeButtonClick = (cardLikeButton, cardId, numbersLike) => {
  if (cardLikeButton.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((data) => {
        console.log(data.name);
        resetLike(data.likes.length, numbersLike);
        cardLikeButton.classList.remove("card__like-button_is-active");
      })
      .catch((error) => {
        console.error("Ошибка при удалении лайка:", error);
      });
  } else {
    addLike(cardId)
      .then((data) => {
        console.log(data.name);
        resetLike(data.likes.length, numbersLike);
        cardLikeButton.classList.add("card__like-button_is-active");
      })
      .catch((error) => {
        console.error("Ошибка при добавлении лайка:", error);
      });
  }
};

function checkLikeIsActive(userId, card, button) {
  if (card.likes.some((like) => like._id === userId)) {
    button.classList.add("card__like-button_is-active");
  }
}

function resetLike(number, text) {
  if (number !== 0) {
    text.textContent = number;
  } else {
    text.textContent = "";
  }
}

// Функция создания карточки
export function createCard(data, openImagePopup, onDeleteCard, userId) {
  const cardClone = document
    .getElementById("card-template")
    .content.querySelector(".places__item")
    .cloneNode(true);
  const imagesCard = cardClone.querySelector(".card__image");
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const titleCard = cardClone.querySelector(".card__title");
  const cardLikeButton = cardClone.querySelector(".card__like-button");
  const numbersLike = cardClone.querySelector(
    ".card__like-button__numbers-like"
  );
  const like = data.likes.length;

  imagesCard.src = data.link;
  imagesCard.alt = data.name;
  titleCard.textContent = data.name;
  numbersLike.textContent = like;
  resetLike(like, numbersLike);
  if (data.owner._id !== userId) {
    deleteButton.style.display = "none";
  }
  checkLikeIsActive(userId, data, cardLikeButton);
  cardLikeButton.addEventListener("click", () => {
    handleLikeButtonClick(cardLikeButton, data._id, numbersLike, data, userId);
  });
  deleteButton.addEventListener("click", () => {
    onDeleteCard(data._id, cardClone);
  });
  imagesCard.addEventListener("click", openImagePopup);
  return cardClone;
}

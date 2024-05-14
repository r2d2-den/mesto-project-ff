// Функция обработки клика по кнопке лайка
const handleLikeButtonClick = (e) => e.target.classList.toggle("card__like-button_is-active")
// Функция создания карточки
export function createCard(data, deleteCallback, openImagePopup) {
  const cardClone = document
    .getElementById("card-template")
    .content.querySelector(".places__item")
    .cloneNode(true);
  const imagesCard = cardClone.querySelector(".card__image");
  const deleteButton = cardClone.querySelector(".card__delete-button");
  const titleCard = cardClone.querySelector(".card__title");
  const cardLikeButton = cardClone.querySelector(".card__like-button");

  imagesCard.src = data.link;
  imagesCard.alt = data.name;
  titleCard.textContent = data.name;

  cardLikeButton.addEventListener("click", handleLikeButtonClick);
  deleteButton.addEventListener("click", () => deleteCallback(cardClone));
  imagesCard.addEventListener("click", openImagePopup);
  return cardClone;
}
// Функция удаления карточки
export const deleteCard = (cardClone) => cardClone.remove();

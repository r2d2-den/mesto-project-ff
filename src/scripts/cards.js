export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function createCard(data, deleteCallback, CardClick) {
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

  cardLikeButton.addEventListener("click", () =>
    cardLikeButton.classList.toggle("card__like-button_is-active")
  );
  deleteButton.addEventListener("click", () => deleteCallback(cardClone));
  imagesCard.addEventListener("click", CardClick);
  return cardClone;
}

export const deleteCard = (cardClone) => cardClone.remove();

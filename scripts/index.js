const createCard = (data, deleteCallback) => {
  const cardTemplate = document.getElementById('card-template');
  const cardClone = cardTemplate.content.querySelector('.places__item').cloneNode(true);

  const cardImage = cardClone.querySelector('.card__image');
  const cardTitle = cardClone.querySelector('.card__title');
  const deleteButton = cardClone.querySelector('.card__delete-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  deleteButton.addEventListener('click', () => deleteCallback(cardClone));
  return cardClone;
};

const deleteCard = (cardClone) => {
  cardClone.remove();
};

const cardContainer = document.querySelector('.places__list');

initialCards.forEach(cardData => {
  const cardElement = createCard(cardData, deleteCard);
  cardContainer.appendChild(cardElement);
});
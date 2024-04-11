export const closeModal = (modal) => {
  modal.classList.remove("popup_is-opened");

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closePopup();
    }
  };

  const closePopup = () => {
    modal.removeEventListener("click", closePopup);
    closeButton.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", handleKeyDown);
  };
};

export const openModal = (modal) => {
  modal.classList.add("popup_is-opened");

  const closeButton = modal.querySelector(".popup__close");

  const closePopup = () => closeModal(modal);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closePopup();
    }
  };
  document.addEventListener("keydown", handleKeyDown);
  modal.addEventListener("click", closePopup);
  closeButton.addEventListener("click", closePopup);
};


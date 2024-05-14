const closePopupByEsc = (e) => {
  if (e.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
}}
const closePopupByOverlayClick = (evt) => closeModal(evt.target);
export const openModal = (modal) => { 
  modal.classList.add("popup_is-opened"); 
  document.addEventListener("keydown", closePopupByEsc); 
  modal.addEventListener("click", closePopupByOverlayClick);
}; 
export const closeModal = (modal) => { 
  modal.classList.remove("popup_is-opened"); 
  modal.removeEventListener("click", closePopupByOverlayClick); 
  document.removeEventListener("keydown", closePopupByEsc);
}; 
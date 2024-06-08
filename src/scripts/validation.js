export function enableValidation(config) {
  const {
    formSelector, // Селектор формы
    inputSelector, // Селектор полей ввода
    submitButtonSelector, // Селектор кнопки отправки формы
    inactiveButtonClass, // Класс для неактивной кнопки
    inputErrorClass, // Класс ошибки для поля ввода
    errorClass, // Класс ошибки
  } = config;

  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        toggleButtonState(inputList, submitButton, config);
        validateInput(formElement, inputElement, config);
      });
    });
    toggleButtonState(inputList, submitButton, config);
  });
}

// Функция для валидации отдельного поля ввода
const validateInput = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Функция для отображения сообщения об ошибке в поле ввода
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция для скрытия сообщения об ошибке в поле ввода
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

// Функция для проверки наличия невалидных полей ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

// Функция для управления состоянием кнопки отправки формы
const toggleButtonState = (inputList, submitButton, config) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }
};


// функция очищающая поля ввода и текст ошибки
export const clearValidation = (popup, config) => {
  const inputList = Array.from(popup.querySelectorAll(config.inputSelector));
  const submitButton = popup.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => {
    if (input.value === "") {
      submitButton.disabled = true;
      submitButton.classList.add(config.inactiveButtonClass);
      const errorElement = popup.querySelector(`.${input.id}-error`);
      errorElement.textContent = "";
      errorElement.classList.remove(config.errorClass);
      input.classList.remove(config.inputErrorClass);
    } else if (!input.validity.valid) {
      input.value = "";
      // Удаляем текст об ошибках
      const errorElement = popup.querySelector(`.${input.id}-error`);
      errorElement.textContent = "";
      errorElement.classList.remove(config.errorClass);
      input.classList.remove(config.inputErrorClass);
    }
  });

  if (inputList.every((input) => input.value === "")) {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass);
  } else {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass);
  }
};
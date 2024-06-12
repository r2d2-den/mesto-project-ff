export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const inputList = Array.from(
      formElement.querySelectorAll(config.inputSelector)
    );

    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        validateInput(formElement, inputElement, config);
      });
    });

    toggleButtonState(formElement, inputList[0], config);
  });
}

const validateInput = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(
      "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"
    );
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }

  toggleButtonState(formElement, inputElement, config);
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
const toggleButtonState = (formElement, inputElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(config.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(config.inactiveButtonClass);
    submitButton.disabled = false;
  }
};

// Функция очищающая поля ввода и текст ошибки
export const clearValidation = (popup, config) => {
  const inputList = Array.from(popup.querySelectorAll(config.inputSelector));

  inputList.forEach((input) => {
    if (input.value === "") {
      hideInputError(popup, input, config);
    } else if (!input.validity.valid) {
      input.value = "";
      hideInputError(popup, input, config);
    }
  });

  toggleButtonState(popup, inputList[0], config);
};

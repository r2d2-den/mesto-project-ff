// export const apiCards = () => {
//   return fetch('https://nomoreparties.co/v1/wff-cohort-15/cards', {
//     headers: {
//       authorization: 'a71e59a0-b509-4fcc-8612-4924db40e713'
//     }
//   })
//     .then(res => res.json())
//     .then((result) => {
//       console.log(result);
//     });
// }

//   export const apiAvatar = () => {

//   return fetch('https://nomoreparties.co/v1/wff-cohort-15/users/me', {
//     method: 'GET',
//     headers: {
//       authorization: 'a71e59a0-b509-4fcc-8612-4924db40e713'

//     }
//   })
//     .then(res => res.json())
//     .then((result) => {
//       console.log(result);
//       console.log(result.name);
//   })
// }
//  ВОРКШОП
// app
// getAllapp
// адрес с запросами лучше вынести в переменную для универсальности path

export const mePromis = fetch(
  "https://nomoreparties.co/v1/wff-cohort-15/users/me",
  {
    method: "GET",
    headers: {
      authorization: "a71e59a0-b509-4fcc-8612-4924db40e713",
    },
  }
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

export const getAllCrds = () => {
  return fetch("https://nomoreparties.co/v1/wff-cohort-15/cards", {
    headers: {
      authorization: "a71e59a0-b509-4fcc-8612-4924db40e713",
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
};

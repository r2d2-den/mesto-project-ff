const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
};
const PATH = 'https://nomoreparties.co/v1/wff-cohort-15'


export const getUser = () => {
  return fetch(`${PATH}/users/me`, {
    method: "GET",
    headers: {
      authorization: "a71e59a0-b509-4fcc-8612-4924db40e713",
    },
  }).then(handleResponse);
};

export const getAllCrds = () => {
  return fetch(`${PATH}/cards`, {
    method: "GET",
    headers: {
      authorization: "a71e59a0-b509-4fcc-8612-4924db40e713",
    },
  }).then(handleResponse);
};


export const createNewCard= (newCardData, userId) => {
  return fetch(`${PATH}/cards`, {
        method: 'POST',
        headers: {
          authorization: 'a71e59a0-b509-4fcc-8612-4924db40e713',
          'Content-Type': 'application/json'
        },
    body: JSON.stringify({...newCardData, userId})
  })
  .then(handleResponse)
  .catch(error => {
    console.error('Ошибка при создании новой карточки:', error);
    throw error;
  });
}

 export const newUser = (nameUser,  aboutUser) => {
  fetch(`${PATH}/users/me`, {
  method: 'PATCH',
  headers: {
    authorization: 'a71e59a0-b509-4fcc-8612-4924db40e713',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: nameUser,
    about: aboutUser
  })
}); 
}

export const deleteCardApi = (id) => {
  return fetch(`${PATH}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'a71e59a0-b509-4fcc-8612-4924db40e713',
      'Content-Type': 'application/json'
    },
})
};

export const addLike = (id) => {
  return fetch(`${PATH}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: 'a71e59a0-b509-4fcc-8612-4924db40e713',
      'Content-Type': 'application/json'
    },
})
.then(handleResponse)
}

export const deleteLike = (id) => {
  return fetch(`${PATH}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'a71e59a0-b509-4fcc-8612-4924db40e713',
      'Content-Type': 'application/json'
    },
})
.then(handleResponse)
}

export const addAvatar = (link) => {
  return fetch(`${PATH}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: 'a71e59a0-b509-4fcc-8612-4924db40e713',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: link,
    })
})
.then(handleResponse)
}




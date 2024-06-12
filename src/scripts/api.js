const handleResponse = (response) => {
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then((error) => {
      error.httpResponseCode = response.status;
      return Promise.reject(error);
    });
  }
};

function request(url, options) {
  return fetch(url, options).then(handleResponse);
}

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-15",
  headers: {
    authorization: "a71e59a0-b509-4fcc-8612-4924db40e713",
    "Content-Type": "application/json",
  },
};

export const getUser = () => {
  return request(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  });
};

export const getAllCrds = () => {
  return request(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  });
};

export const createNewCard = (newCardData, userId) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ ...newCardData, userId }),
  });
};

export const updatinUseData = (nameUser, aboutUser) => {
  request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: nameUser,
      about: aboutUser,
    }),
  });
};

export const deleteCardApi = (id) => {
  return request(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const addLike = (id) => {
  return request(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  });
};

export const deleteLike = (id) => {
  return request(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

export const addAvatar = (link) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  });
};

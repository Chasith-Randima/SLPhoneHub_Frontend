import fetch from "isomorphic-fetch";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const createWanted = (wanted, token) => {
  let url = `${API}/wanted`;

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(wanted),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const allWanted = () => {
  let url = `${API}/wanted`;

  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteWanted = (id, token) => {
  let url = `${API}/wanted/${id}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateWanted = (id, wanted, token) => {
  let url = `${API}/wanted/${id}`;

  return fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(wanted),
  });
};

export const oneWanted = (id) => {
  let url = `${API}/wanted/${id}`;

  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const allMyWanted = (user) => {
  let url = `${API}/wanted?user=${user}`;

  return fetch(url, {
    method: "GET",
  })
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

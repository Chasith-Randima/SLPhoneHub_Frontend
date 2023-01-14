import fetch from "isomorphic-fetch";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

if (process.env.NEXT_PUBLIC_PRODUCTION == true) {
  API = process.env.NEXT_PUBLIC_API_PRODUCTION;
}

export const createAccessory = (accessory, token) => {
  let url = `${API}/accessories`;

  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: accessory,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const allAccessory = () => {
  let url = `${API}/accessories`;

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

export const deleteAccessory = (id, token) => {
  let url = `${API}/accessories/${id}`;

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

export const updateAccessory = (id, accessory, token) => {
  let url = `${API}/accessories/${id}`;
  console.log("It was called");

  return fetch(url, {
    method: "PATCH",
    headers: {
      // Accept: "applicatin/json",
      // "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: accessory,
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const oneAccessory = (id) => {
  let url = `${API}/accessories/${id}`;

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

export const allMyAccessories = (user) => {
  let url = `${API}/accessories?user=${user}`;

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

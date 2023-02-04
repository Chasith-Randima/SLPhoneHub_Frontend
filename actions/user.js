import fetch from "isomorphic-fetch";

let API = process.env.NEXT_PUBLIC_API_DEVELOPMENT;

export const getProfile = (id, token) => {
  // console.log(token, id, "from user action");
  let url = `${API}/users/${id}`;

  return fetch(url, {
    method: "GET",
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
      return err;
    });
};

export const updateProfile = (id, user, token) => {
  let url = `${API}/users/${id}`;

  return fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

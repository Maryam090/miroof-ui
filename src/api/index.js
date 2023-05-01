
import { BASE_URL } from "../constants";

// Function to post the data
export const postData = async (url, payload) => {
  const response = await fetch(BASE_URL + url, {
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch(e => e);
    return response;
};

// Function to get the data
export const fetchData = async (url) => {
  const response = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
        "content-type": "application/json"
    },
  })
    .then((res) => res.json())
    .then((res) => res)
    .catch(e => e);
    return response;
};
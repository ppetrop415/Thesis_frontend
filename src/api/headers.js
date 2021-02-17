export default function authHeader() {
  let credentials = JSON.parse(localStorage.getItem("credentials"));

  if (credentials) {
    return { Authorization: "Bearer " + credentials.access };
  } else {
    return {};
  }
}

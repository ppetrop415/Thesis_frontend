export default function logoutHeader() {
  let credentials = JSON.parse(localStorage.getItem("credentials"));

  if (credentials) {
    return { Authorization: "Bearer " + credentials.refresh };
  } else {
    return {};
  }
}

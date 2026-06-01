import { loginRequest } from "../api/auth.api.js";
import { setToken } from "../utils/auth.js";

const form = document.getElementById("loginForm");
const errorText = document.getElementById("error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await loginRequest({ email, password });

    if (!res.ok) {
      throw new Error();
    }

    const data = await res.json();

    setToken(data.token);

    window.location.href = "index.html";

  } catch {
    errorText.textContent = "Invalid email or password";
  }
});
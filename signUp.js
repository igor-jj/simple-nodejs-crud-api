const form = document.getElementById("registerForm");
const errorText = document.getElementById("error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password != confirmPassword) {
    errorText.textContent = "As senhas devem ser compatíveis";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Internal Error");
    }

    window.location.href = "login.html";

  } catch (err) {
    errorText.textContent = err;
  }
});

async function postSignup(username, password) {
  const data = {
    username,
    password,
  };
  const response = await fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const result = await postSignup(username, password);
  if (result.message === "User creado con exito") {
    window.location.href = "/login";
  } else {
    alert("Datos incorrectos");
  }
});
const githubButton = document.getElementById("github-button");

githubButton.addEventListener("click", () => {
  window.location.href = "/auth/github";
});
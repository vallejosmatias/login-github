async function postLogin(username, password) {
  const data = {
    username,
    password,
  };
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const result = await response.json();
  return result;
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async(e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const result = await postLogin(username, password);
  if (result.message === "ok") {
    window.location.href = "/privado";
  } else {
    alert("datos incorrectos");
  }
});
const githubButton = document.getElementById("github-button");

githubButton.addEventListener("click", () => {
  window.location.href = "/auth/github";
});


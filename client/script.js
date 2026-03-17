const API = "http://localhost:5000/api";


// REGISTER
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {

  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let res = await fetch(`${API}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  });

  let data = await res.json();

  alert(data.message);

  window.location = "login.html";

});



// LOGIN
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {

  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  let data = await res.json();

  if (data.success) {

    localStorage.setItem("user", JSON.stringify(data.user));

    window.location = "welcome.html";

  } else {

    alert(data.message);

  }

});


// WELCOME PAGE 
if (window.location.pathname.includes("welcome.html")) {
  let user = JSON.parse(localStorage.getItem("user"));
  
  if (user) {

    document.getElementById("userName").innerText = user.name;
    document.getElementById("userEmail").innerText = user.email;
  } else {
    window.location = "login.html";
  }
}



// LOGOUT
function logout() {

  localStorage.removeItem("user");

  window.location = "login.html";

}
// ========= SIGN UP =========
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("signupUser").value.trim();
    const password = document.getElementById("signupPass").value.trim();
    const agreeTerms = document.getElementById("agreeTerms");

    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (!agreeTerms.checked) {
      alert("❌ You must agree to the terms before signing up.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
      alert("Username already exists.");
      return;
    }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Account created! Please log in.");
    window.location.href = "login.html";
  });
}

// ========= LOG IN =========
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("loginUser").value.trim();
    const password = document.getElementById("loginPass").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", user.username);
      window.location.href = "home.html";
    } else {
      alert("❌ Invalid username or password!");
    }
  });
}

// ========= PROTECT PAGES =========
if (["home.html", "create.html", "profile.html"].some(page => window.location.pathname.endsWith(page))) {
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    window.location.href = "login.html";
  }
}

// ========= LOGOUT =========
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      window.location.href = "index.html";
    });
  }
});

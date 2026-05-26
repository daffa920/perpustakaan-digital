localStorage.removeItem("currentUser");

function goLogin() {
  window.location.href = "login.html";
}

setTimeout(() => {
  window.location.href = "login.html";
}, 2000);
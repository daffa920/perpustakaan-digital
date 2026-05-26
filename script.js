// ===== DATABASE =====
const DB = {

  getUsers: function () {
    return JSON.parse(
      localStorage.getItem("users") || "[]"
    );
  },

  setUsers: function (users) {
    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );
  },

  setSession: function (user) {
    localStorage.setItem(
      "session",
      JSON.stringify(user)
    );
  },

  getSession: function () {
    return JSON.parse(
      localStorage.getItem("session")
    );
  },

  clearSession: function () {
    localStorage.removeItem("session");
  }
};


// ===== REGISTER =====
function register() {

  const name =
    document.getElementById("reg-name").value;

  const email =
    document.getElementById("reg-email").value;

  const password =
    document.getElementById("reg-password").value;

  const confirm =
    document.getElementById("reg-confirm").value;

  const error =
    document.getElementById("register-error");

  // RESET ERROR
  error.innerText = "";

  // VALIDASI
  if (
    name === "" ||
    email === "" ||
    password === "" ||
    confirm === ""
  ) {

    error.innerText =
      "Semua field wajib diisi";

    return;
  }

  // PASSWORD TIDAK SAMA
  if (password !== confirm) {

    error.innerText =
      "Konfirmasi password tidak sama";

    return;
  }

  // AMBIL USER
  let users = DB.getUsers();

  // CEK EMAIL
  const checkEmail =
    users.find(u => u.email === email);

  if (checkEmail) {

    error.innerText =
      "Email sudah terdaftar";

    return;
  }

  // SIMPAN USER
  users.push({
    id: Date.now(),
    name: name,
    email: email,
    password: password
  });

  DB.setUsers(users);

  // ALERT
  alert("Registrasi berhasil");

  // PINDAH KE LOGIN
  window.location.href = "login.html";
}



// ===== LOGIN =====
function login() {

  const email =
    document.getElementById("login-email").value;

  const password =
    document.getElementById("login-password").value;

  const users = DB.getUsers();

  const user =
    users.find(
      u =>
        u.email === email &&
        u.password === password
    );

  // LOGIN GAGAL
  if (!user) {

    document.getElementById(
      "login-error"
    ).innerText =
      "Email atau password salah";

    return;
  }

  // SIMPAN SESSION
  DB.setSession(user);

  // MASUK HALAMAN
  window.location.href =
    "perpustakaan-digital.html";
}



// ===== LOGOUT =====
function logout() {

  DB.clearSession();

  window.location.href =
    "login.html";
}



// ===== PROTECT PAGE =====
if (
  window.location.pathname.includes(
    "perpustakaan-digital.html"
  )
) {

  const session =
    DB.getSession();

  if (!session) {

    window.location.href =
      "login.html";
  }
}
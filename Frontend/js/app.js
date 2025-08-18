const API_URL = "http://localhost:5000/api"; // Backend API URL

// ===== REGISTER =====
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Registered successfully!");
        window.location.href = "index.html";
      } else {
        alert(data.message || "Register failed");
      }
    } catch (err) {
      console.error(err);
      alert("Cannot connect to API");
    }
  });
}

// ===== LOGIN =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        window.location.href = "profile.html";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Cannot connect to API");
    }
  });
}

// ===== LOGOUT =====
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshToken }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.clear();
      window.location.href = "index.html";
    }
  });
}

// ===== PROFILE & REFRESH =====
const profileDiv = document.getElementById("profileData");
if (profileDiv) {
  const loadProfile = async () => {
    let accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken) {
      window.location.href = "index.html";
      return;
    }

    try {
      let res = await fetch(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (res.status === 401 && refreshToken) {
        // Token expired → refresh
        const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: refreshToken }),
        });

        const refreshData = await refreshRes.json();
        if (refreshRes.ok) {
          localStorage.setItem("accessToken", refreshData.accessToken);
          accessToken = refreshData.accessToken;
          res = await fetch(`${API_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
        } else {
          localStorage.clear();
          window.location.href = "index.html";
          return;
        }
      }

      const data = await res.json();
      profileDiv.innerHTML = `
        <p>Username: ${data.username}</p>
        <p>Email: ${data.email}</p>
      `;
    } catch (err) {
      console.error(err);
      window.location.href = "index.html";
    }
  };

  loadProfile();
}
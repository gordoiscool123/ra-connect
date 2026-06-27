/* =========================================================
   RA Connect — shared app logic
   Runs on every protected page (dashboard, directory,
   messages, community). Handles the mock auth guard,
   header nav behavior, and logout.
   ========================================================= */

const STORAGE_KEYS = {
  user: "raconnect_user",
  conversations: "raconnect_conversations",
  community: "raconnect_community",
  messageSeed: "raconnect_messages_seeded",
  communitySeed: "raconnect_community_seeded",
};

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.user);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

function requireAuth() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "index.html";
    return null;
  }
  return user;
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.user);
  window.location.href = "index.html";
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* Ensure mock conversation/community data exists at least once per browser */
function ensureSeedData() {
  if (!localStorage.getItem(STORAGE_KEYS.messageSeed)) {
    localStorage.setItem(STORAGE_KEYS.conversations, JSON.stringify(SEED_CONVERSATIONS));
    localStorage.setItem(STORAGE_KEYS.messageSeed, "1");
  }
  if (!localStorage.getItem(STORAGE_KEYS.communitySeed)) {
    localStorage.setItem(STORAGE_KEYS.community, JSON.stringify(SEED_COMMUNITY_POSTS));
    localStorage.setItem(STORAGE_KEYS.communitySeed, "1");
  }
}

function initHeader(user) {
  const greetEls = document.querySelectorAll("[data-user-name]");
  greetEls.forEach((el) => {
    el.textContent = user.name.split(" ")[0];
  });

  const toggle = document.querySelector(".nav-toggle");
  const list = document.querySelector(".main-nav__list");
  if (toggle && list) {
    toggle.addEventListener("click", () => {
      const isOpen = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const logoutBtn = document.querySelector("[data-logout]");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }

  // Mark current nav link
  const path = window.location.pathname.split("/").pop() || "dashboard.html";
  document.querySelectorAll(".main-nav__link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path) {
      link.setAttribute("aria-current", "page");
    }
  });
}

/* Run the guard + header init automatically on protected pages */
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.protected === "true") {
    const user = requireAuth();
    if (!user) return;
    ensureSeedData();
    initHeader(user);
  }
});

/* =========================================================
   RA Connect — sign-in / create-account page logic
   This is a prototype: no real backend. Credentials are not
   verified or stored anywhere except this browser's
   localStorage, purely so the rest of the demo can greet you
   by name.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // If already "signed in", skip straight to the dashboard.
  if (getCurrentUserSafe()) {
    window.location.href = "dashboard.html";
    return;
  }

  const tabs = document.querySelectorAll(".auth-tabs button");
  const panels = {
    signin: document.getElementById("panel-signin"),
    signup: document.getElementById("panel-signup"),
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      const target = tab.dataset.panel;
      Object.entries(panels).forEach(([key, panel]) => {
        panel.hidden = key !== target;
      });
    });
  });

  setupForm("signin-form", handleSignIn);
  setupForm("signup-form", handleSignUp);

  const demoBtn = document.getElementById("demo-btn");
  if (demoBtn) {
    demoBtn.addEventListener("click", () => {
      signInAs({ name: "Jordan Avery", email: "jordan.demo@example.com" });
    });
  }
});

function getCurrentUserSafe() {
  try {
    return JSON.parse(localStorage.getItem("raconnect_user"));
  } catch (e) {
    return null;
  }
}

function setupForm(formId, onValid) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll("[data-required]").forEach((field) => {
      const wrapper = field.closest(".field") || field.closest(".checkbox-row");
      const errorEl = wrapper ? wrapper.querySelector(".field-error") : null;

      if (field.type === "checkbox") {
        if (!field.checked) {
          valid = false;
          if (wrapper) {
            wrapper.classList.add("has-error");
            if (errorEl) errorEl.textContent = "Please check this box to continue.";
          }
        } else if (wrapper) {
          wrapper.classList.remove("has-error");
        }
        return;
      }

      const isEmail = field.type === "email";
      const isEmpty = field.value.trim() === "";
      const isBadEmail = isEmail && field.value.trim() !== "" && !field.value.includes("@");

      if (isEmpty || isBadEmail) {
        valid = false;
        if (wrapper) wrapper.classList.add("has-error");
        if (errorEl) {
          errorEl.textContent = isEmpty
            ? "This field is required."
            : "Please enter a valid email address.";
        }
      } else if (wrapper) {
        wrapper.classList.remove("has-error");
      }
    });

    if (!valid) {
      const firstErrorWrapper = form.querySelector(".has-error");
      const firstError = firstErrorWrapper ? firstErrorWrapper.querySelector("input") : null;
      if (firstError) firstError.focus();
      return;
    }

    onValid(form);
  });
}

function handleSignIn(form) {
  const email = form.querySelector("#signin-email").value.trim();
  const displayName = email.split("@")[0].replace(/[._]/g, " ") || "there";
  signInAs({ name: titleCase(displayName), email });
}

function handleSignUp(form) {
  const name = form.querySelector("#signup-name").value.trim();
  const email = form.querySelector("#signup-email").value.trim();
  signInAs({ name, email });
}

function titleCase(str) {
  return str
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function signInAs(user) {
  localStorage.setItem("raconnect_user", JSON.stringify(user));
  window.location.href = "dashboard.html";
}

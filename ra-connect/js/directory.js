/* =========================================================
   RA Connect — directory page logic
   ========================================================= */

let activeFilters = {
  query: "",
  specialty: "",
  location: "",
  acceptingOnly: false,
  telehealthOnly: false,
};

document.addEventListener("DOMContentLoaded", () => {
  if (!getCurrentUser()) return;
  populateFilterOptions();
  bindControls();
  renderDirectory();
});

function populateFilterOptions() {
  const specialtySelect = document.getElementById("specialty-select");
  const locationSelect = document.getElementById("location-select");

  const specialties = [...new Set(DOCTORS.map((d) => d.specialty))].sort();
  specialties.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    specialtySelect.appendChild(opt);
  });

  const locations = [...new Set(DOCTORS.map((d) => `${d.city}, ${d.state}`))].sort();
  locations.forEach((loc) => {
    const opt = document.createElement("option");
    opt.value = loc;
    opt.textContent = loc;
    locationSelect.appendChild(opt);
  });
}

function bindControls() {
  document.getElementById("search-input").addEventListener("input", (e) => {
    activeFilters.query = e.target.value.trim().toLowerCase();
    renderDirectory();
  });

  document.getElementById("specialty-select").addEventListener("change", (e) => {
    activeFilters.specialty = e.target.value;
    renderDirectory();
  });

  document.getElementById("location-select").addEventListener("change", (e) => {
    activeFilters.location = e.target.value;
    renderDirectory();
  });

  const acceptingChip = document.getElementById("chip-accepting");
  acceptingChip.addEventListener("click", () => {
    activeFilters.acceptingOnly = !activeFilters.acceptingOnly;
    acceptingChip.setAttribute("aria-pressed", String(activeFilters.acceptingOnly));
    renderDirectory();
  });

  const telehealthChip = document.getElementById("chip-telehealth");
  telehealthChip.addEventListener("click", () => {
    activeFilters.telehealthOnly = !activeFilters.telehealthOnly;
    telehealthChip.setAttribute("aria-pressed", String(activeFilters.telehealthOnly));
    renderDirectory();
  });

  document.getElementById("clear-filters").addEventListener("click", () => {
    activeFilters = { query: "", specialty: "", location: "", acceptingOnly: false, telehealthOnly: false };
    document.getElementById("search-input").value = "";
    document.getElementById("specialty-select").value = "";
    document.getElementById("location-select").value = "";
    acceptingChip.setAttribute("aria-pressed", "false");
    telehealthChip.setAttribute("aria-pressed", "false");
    renderDirectory();
  });

  document.getElementById("profile-dialog").addEventListener("click", (e) => {
    if (e.target.id === "profile-dialog") e.target.close();
  });
}

function filteredDoctors() {
  return DOCTORS.filter((d) => {
    const haystack = `${d.name} ${d.specialty} ${d.city} ${d.state} ${d.bio}`.toLowerCase();
    if (activeFilters.query && !haystack.includes(activeFilters.query)) return false;
    if (activeFilters.specialty && d.specialty !== activeFilters.specialty) return false;
    if (activeFilters.location && `${d.city}, ${d.state}` !== activeFilters.location) return false;
    if (activeFilters.acceptingOnly && !d.acceptingPatients) return false;
    if (activeFilters.telehealthOnly && !d.telehealth) return false;
    return true;
  });
}

function renderDirectory() {
  const grid = document.getElementById("doctor-grid");
  const meta = document.getElementById("results-meta");
  const results = filteredDoctors();

  meta.textContent = `${results.length} specialist${results.length === 1 ? "" : "s"} found`;

  if (results.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <h3>No specialists match those filters</h3>
        <p>Try clearing a filter or searching a different term.</p>
      </div>`;
    return;
  }

  grid.innerHTML = results.map(renderDoctorCard).join("");

  grid.querySelectorAll("[data-view-profile]").forEach((btn) => {
    btn.addEventListener("click", () => openProfile(btn.dataset.viewProfile));
  });

  grid.querySelectorAll("[data-message]").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.location.href = `messages.html?doctor=${encodeURIComponent(btn.dataset.message)}`;
    });
  });
}

function renderDoctorCard(d) {
  return `
    <article class="doctor-card">
      <div class="doctor-card__head">
        <span class="avatar avatar-md" style="background:${colorForName(d.name)}">${initialsOf(d.name)}</span>
        <div>
          <h3 class="doctor-card__name">${escapeHTML(d.name)}</h3>
          <p class="doctor-card__meta mb-0">${escapeHTML(d.credentials)}</p>
          <p class="doctor-card__meta mb-0">${escapeHTML(d.city)}, ${escapeHTML(d.state)} · ${d.yearsExperience} yrs experience</p>
        </div>
      </div>

      <div class="doctor-card__pills">
        <span class="pill pill-teal">${escapeHTML(d.specialty)}</span>
        ${d.acceptingPatients ? `<span class="pill pill-success">Accepting patients</span>` : `<span class="pill pill-outline">Not accepting new patients</span>`}
        ${d.telehealth ? `<span class="pill pill-gold">Telehealth</span>` : ""}
      </div>

      <p class="text-soft mb-0">${escapeHTML(d.bio)}</p>

      <p class="doctor-card__contact mb-0">★ ${d.rating} (${d.reviewCount} reviews) · ${escapeHTML(d.phone)}</p>

      <div class="doctor-card__actions">
        <button type="button" class="btn btn-primary btn-sm" data-message="${d.id}">Message</button>
        <button type="button" class="btn btn-secondary btn-sm" data-view-profile="${d.id}">View profile</button>
      </div>
    </article>`;
}

function openProfile(doctorId) {
  const d = DOCTORS.find((doc) => doc.id === doctorId);
  if (!d) return;

  const dialog = document.getElementById("profile-dialog");
  const content = document.getElementById("profile-dialog-content");

  content.innerHTML = `
    <button type="button" class="btn btn-ghost btn-sm profile-dialog__close" id="close-profile" aria-label="Close profile">✕ Close</button>
    <div class="row gap-3" style="margin-top:2rem;">
      <span class="avatar avatar-lg" style="background:${colorForName(d.name)}">${initialsOf(d.name)}</span>
      <div>
        <h2 id="profile-dialog-title" class="mb-0">${escapeHTML(d.name)}</h2>
        <p class="text-soft mb-0">${escapeHTML(d.credentials)}</p>
      </div>
    </div>

    <div class="doctor-card__pills" style="margin-top:1rem;">
      <span class="pill pill-teal">${escapeHTML(d.specialty)}</span>
      ${d.acceptingPatients ? `<span class="pill pill-success">Accepting patients</span>` : `<span class="pill pill-outline">Not accepting new patients</span>`}
      ${d.telehealth ? `<span class="pill pill-gold">Telehealth</span>` : ""}
    </div>

    <p style="margin-top:1rem;">${escapeHTML(d.bio)}</p>

    <ul class="stack gap-1" style="margin-top:1rem;">
      <li><strong>Location:</strong> ${escapeHTML(d.city)}, ${escapeHTML(d.state)}</li>
      <li><strong>Experience:</strong> ${d.yearsExperience} years</li>
      <li><strong>Languages:</strong> ${escapeHTML(d.languages.join(", "))}</li>
      <li><strong>Rating:</strong> ★ ${d.rating} (${d.reviewCount} reviews)</li>
      <li><strong>Phone:</strong> ${escapeHTML(d.phone)}</li>
      <li><strong>Email:</strong> ${escapeHTML(d.email)}</li>
    </ul>

    <button type="button" class="btn btn-primary btn-block" style="margin-top:1.25rem;" id="profile-message-btn">Message ${escapeHTML(d.name.split(" ")[0])}</button>
  `;

  content.querySelector("#close-profile").addEventListener("click", () => dialog.close());
  content.querySelector("#profile-message-btn").addEventListener("click", () => {
    window.location.href = `messages.html?doctor=${encodeURIComponent(d.id)}`;
  });

  dialog.showModal();
}

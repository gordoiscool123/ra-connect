/* =========================================================
   RA Connect — patient-doctor messaging logic
   Conversations live in localStorage. Sending a message
   triggers a short "typing…" indicator and a canned reply,
   purely to demonstrate the interaction — nothing is sent
   anywhere.
   ========================================================= */

let activeDoctorId = null;

document.addEventListener("DOMContentLoaded", () => {
  if (!getCurrentUser()) return;

  const params = new URLSearchParams(window.location.search);
  const requestedDoctor = params.get("doctor");

  if (requestedDoctor) {
    const conversations = getConversations();
    if (!conversations[requestedDoctor]) {
      conversations[requestedDoctor] = [];
      saveConversations(conversations);
    }
  }

  renderConversationList();

  if (requestedDoctor && DOCTORS.some((d) => d.id === requestedDoctor)) {
    selectConversation(requestedDoctor);
  }

  document.getElementById("chat-composer").addEventListener("submit", (e) => {
    e.preventDefault();
    sendMessage();
  });

  document.getElementById("chat-back").addEventListener("click", () => {
    document.getElementById("chat-active").hidden = true;
    document.getElementById("chat-empty").hidden = false;
  });

  document.getElementById("new-message-btn").addEventListener("click", openNewMessageDialog);
  document.getElementById("close-new-message").addEventListener("click", () => {
    document.getElementById("new-message-dialog").close();
  });
  document.getElementById("start-conversation-btn").addEventListener("click", startNewConversation);

  document.getElementById("new-message-dialog").addEventListener("click", (e) => {
    if (e.target.id === "new-message-dialog") e.target.close();
  });
});

function getConversations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.conversations)) || {};
  } catch (e) {
    return {};
  }
}

function saveConversations(conversations) {
  localStorage.setItem(STORAGE_KEYS.conversations, JSON.stringify(conversations));
}

function renderConversationList() {
  const container = document.getElementById("conversation-items");
  const conversations = getConversations();
  const doctorIds = Object.keys(conversations);

  if (doctorIds.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>No conversations yet. Tap "New message" to reach out to your care team.</p></div>`;
    return;
  }

  container.innerHTML = doctorIds
    .map((id) => {
      const doctor = DOCTORS.find((d) => d.id === id);
      if (!doctor) return "";
      const msgs = conversations[id];
      const last = msgs[msgs.length - 1];
      return `
        <button type="button" class="conversation-item" data-doctor="${id}" aria-current="${id === activeDoctorId}">
          <span class="avatar avatar-sm" style="background:${colorForName(doctor.name)}">${initialsOf(doctor.name)}</span>
          <span style="overflow:hidden; flex:1;">
            <span class="conversation-item__name">${escapeHTML(doctor.name)}</span>
            <span class="conversation-item__preview">${last ? escapeHTML(last.text) : "Say hello to start the conversation."}</span>
          </span>
        </button>`;
    })
    .join("");

  container.querySelectorAll(".conversation-item").forEach((btn) => {
    btn.addEventListener("click", () => selectConversation(btn.dataset.doctor));
  });
}

function selectConversation(doctorId) {
  activeDoctorId = doctorId;
  const doctor = DOCTORS.find((d) => d.id === doctorId);
  if (!doctor) return;

  document.getElementById("chat-empty").hidden = true;
  document.getElementById("chat-active").hidden = false;

  document.getElementById("chat-avatar").textContent = initialsOf(doctor.name);
  document.getElementById("chat-avatar").style.background = colorForName(doctor.name);
  document.getElementById("chat-doctor-name").textContent = doctor.name;
  document.getElementById("chat-doctor-specialty").textContent = doctor.specialty;

  renderConversationList();
  renderThread();
  document.getElementById("chat-input").focus();
}

function renderThread() {
  const thread = document.getElementById("chat-thread");
  const conversations = getConversations();
  const msgs = conversations[activeDoctorId] || [];

  if (msgs.length === 0) {
    thread.innerHTML = `<div class="empty-state"><p>No messages yet — say hello below.</p></div>`;
    return;
  }

  thread.innerHTML = msgs
    .map(
      (m) => `
      <div class="chat-bubble chat-bubble--${m.sender === "me" ? "me" : "them"}">
        ${escapeHTML(m.text)}
        <span class="chat-bubble__time">${escapeHTML(m.time)}</span>
      </div>`
    )
    .join("");

  thread.scrollTop = thread.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text || !activeDoctorId) return;

  const conversations = getConversations();
  if (!conversations[activeDoctorId]) conversations[activeDoctorId] = [];

  conversations[activeDoctorId].push({ sender: "me", text, time: nowLabel() });
  saveConversations(conversations);
  input.value = "";
  renderThread();
  renderConversationList();

  const doctor = DOCTORS.find((d) => d.id === activeDoctorId);
  const typingEl = document.getElementById("chat-typing");
  typingEl.textContent = `${doctor.name.split(" ").slice(-1)[0]} is typing…`;

  setTimeout(() => {
    const current = getConversations();
    if (!current[activeDoctorId]) return; // conversation may have changed
    const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
    current[activeDoctorId].push({ sender: "them", text: reply, time: nowLabel() });
    saveConversations(current);
    typingEl.textContent = "";
    renderThread();
    renderConversationList();
  }, 1400);
}

function nowLabel() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function openNewMessageDialog() {
  const select = document.getElementById("new-message-select");
  select.innerHTML = DOCTORS.map((d) => `<option value="${d.id}">${escapeHTML(d.name)} — ${escapeHTML(d.specialty)}</option>`).join("");
  document.getElementById("new-message-dialog").showModal();
}

function startNewConversation() {
  const select = document.getElementById("new-message-select");
  const doctorId = select.value;
  const conversations = getConversations();
  if (!conversations[doctorId]) {
    conversations[doctorId] = [];
    saveConversations(conversations);
  }
  document.getElementById("new-message-dialog").close();
  renderConversationList();
  selectConversation(doctorId);
}

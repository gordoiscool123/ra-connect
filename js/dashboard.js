/* =========================================================
   RA Connect — dashboard page logic
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  if (!getCurrentUser()) return; // app.js will already be redirecting
  renderRecentMessages();
  renderCommunityHighlights();
});

function renderRecentMessages() {
  const container = document.getElementById("recent-messages");
  if (!container) return;

  let conversations = {};
  try {
    conversations = JSON.parse(localStorage.getItem(STORAGE_KEYS.conversations)) || {};
  } catch (e) {
    conversations = {};
  }

  const entries = Object.entries(conversations)
    .filter(([, msgs]) => msgs.length > 0)
    .map(([doctorId, msgs]) => {
      const doctor = DOCTORS.find((d) => d.id === doctorId);
      const last = msgs[msgs.length - 1];
      return { doctor, last };
    })
    .filter((e) => e.doctor);

  if (entries.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>No conversations yet. Visit the directory to message a specialist.</p></div>`;
    return;
  }

  container.innerHTML = entries
    .slice(0, 3)
    .map(
      (e) => `
      <div class="list-row">
        <span class="avatar avatar-sm" style="background:${colorForName(e.doctor.name)}">${initialsOf(e.doctor.name)}</span>
        <div style="overflow:hidden;">
          <div class="conversation-item__name">${escapeHTML(e.doctor.name)}</div>
          <span class="conversation-item__preview">${escapeHTML(e.last.text)}</span>
        </div>
      </div>`
    )
    .join("");
}

function renderCommunityHighlights() {
  const container = document.getElementById("community-highlights");
  if (!container) return;

  let community = {};
  try {
    community = JSON.parse(localStorage.getItem(STORAGE_KEYS.community)) || {};
  } catch (e) {
    community = {};
  }

  const posts = [];
  Object.entries(community).forEach(([channelId, channelPosts]) => {
    const channel = CHANNELS.find((c) => c.id === channelId);
    channelPosts.forEach((post) => posts.push({ channel, post }));
  });

  if (posts.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>No posts yet. Be the first to share in the community.</p></div>`;
    return;
  }

  container.innerHTML = posts
    .slice(0, 3)
    .map(
      (entry) => `
      <div class="list-row">
        <span class="avatar avatar-sm" style="background:${colorForName(entry.post.author)}">${initialsOf(entry.post.author)}</span>
        <div style="overflow:hidden;">
          <div class="row gap-1" style="flex-wrap:wrap;">
            <span class="conversation-item__name">${escapeHTML(entry.post.author)}</span>
            <span class="pill pill-teal">${escapeHTML(entry.channel ? entry.channel.name : "Community")}</span>
          </div>
          <span class="conversation-item__preview">${escapeHTML(entry.post.text)}</span>
        </div>
      </div>`
    )
    .join("");
}

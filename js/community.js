/* =========================================================
   RA Connect — community page logic
   ========================================================= */

let activeChannelId = CHANNELS[0].id;

document.addEventListener("DOMContentLoaded", () => {
  if (!getCurrentUser()) return;
  renderChannelList();
  renderChannelHeader();
  renderPosts();

  document.getElementById("post-submit").addEventListener("click", submitPost);

  document.getElementById("post-list").addEventListener("click", (e) => {
    const likeBtn = e.target.closest(".like-btn");
    if (likeBtn) toggleLike(likeBtn.dataset.postId);

    const replyToggle = e.target.closest("[data-reply-toggle]");
    if (replyToggle) {
      const form = document.getElementById(`reply-form-${replyToggle.dataset.replyToggle}`);
      if (form) form.hidden = !form.hidden;
      if (form && !form.hidden) form.querySelector("textarea").focus();
    }
  });

  document.getElementById("post-list").addEventListener("submit", (e) => {
    if (e.target.matches("[data-reply-form]")) {
      e.preventDefault();
      const postId = e.target.dataset.replyForm;
      const textarea = e.target.querySelector("textarea");
      const text = textarea.value.trim();
      if (!text) return;
      submitReply(postId, text);
      textarea.value = "";
    }
  });
});

function getCommunity() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.community)) || {};
  } catch (e) {
    return {};
  }
}

function saveCommunity(data) {
  localStorage.setItem(STORAGE_KEYS.community, JSON.stringify(data));
}

function renderChannelList() {
  const container = document.getElementById("channel-list");
  container.innerHTML = CHANNELS.map(
    (c) => `
    <button type="button" class="channel-item" data-channel="${c.id}" aria-current="${c.id === activeChannelId}">
      <span class="channel-item__name">${escapeHTML(c.name)}</span>
      <span class="channel-item__desc">${escapeHTML(c.description)}</span>
    </button>`
  ).join("");

  container.querySelectorAll(".channel-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeChannelId = btn.dataset.channel;
      renderChannelList();
      renderChannelHeader();
      renderPosts();
      document.getElementById("post-input").focus();
    });
  });
}

function renderChannelHeader() {
  const channel = CHANNELS.find((c) => c.id === activeChannelId);
  document.getElementById("channel-heading").textContent = channel.name;
  document.getElementById("channel-description").textContent = channel.description;
}

function renderPosts() {
  const container = document.getElementById("post-list");
  const community = getCommunity();
  const posts = community[activeChannelId] || [];

  if (posts.length === 0) {
    container.innerHTML = `<div class="empty-state"><h3>No posts yet</h3><p>Be the first to share something in this channel.</p></div>`;
    return;
  }

  container.innerHTML = posts.map(renderPost).join("");
}

function renderPost(post) {
  const repliesHTML = (post.replies || [])
    .map(
      (r) => `
      <div class="row gap-2" style="align-items:flex-start;">
        <span class="avatar avatar-sm" style="background:${colorForName(r.author)}">${initialsOf(r.author)}</span>
        <div>
          <div class="row gap-1"><strong>${escapeHTML(r.author)}</strong><span class="post-card__time">${escapeHTML(r.timeLabel)}</span></div>
          <p class="mb-0">${escapeHTML(r.text)}</p>
        </div>
      </div>`
    )
    .join("");

  return `
    <article class="post-card">
      <div class="post-card__head">
        <span class="avatar avatar-sm" style="background:${colorForName(post.author)}">${initialsOf(post.author)}</span>
        <div>
          <span class="post-card__name">${escapeHTML(post.author)}</span>
          <span class="post-card__time" style="margin-left:0.5rem;">${escapeHTML(post.timeLabel)}</span>
        </div>
      </div>
      <p>${escapeHTML(post.text)}</p>
      <div class="post-card__actions">
        <button type="button" class="like-btn" data-post-id="${post.id}" aria-pressed="${!!post.liked}">
          <span aria-hidden="true">${post.liked ? "♥" : "♡"}</span> ${post.likes} ${post.likes === 1 ? "like" : "likes"}
        </button>
        <button type="button" class="btn btn-ghost btn-sm" data-reply-toggle="${post.id}">Reply</button>
      </div>

      ${repliesHTML ? `<div class="post-card__replies">${repliesHTML}</div>` : ""}

      <form class="reply-form" id="reply-form-${post.id}" data-reply-form="${post.id}" hidden>
        <label for="reply-input-${post.id}" class="visually-hidden">Write a reply</label>
        <textarea id="reply-input-${post.id}" placeholder="Write a reply…"></textarea>
        <button type="submit" class="btn btn-secondary btn-sm">Reply</button>
      </form>
    </article>`;
}

function submitPost() {
  const input = document.getElementById("post-input");
  const text = input.value.trim();
  if (!text) return;

  const user = getCurrentUser();
  const community = getCommunity();
  if (!community[activeChannelId]) community[activeChannelId] = [];

  community[activeChannelId].unshift({
    id: `p_${Date.now()}`,
    author: user.name || "You",
    timeLabel: "Just now",
    text,
    likes: 0,
    liked: false,
    replies: [],
  });

  saveCommunity(community);
  input.value = "";
  renderPosts();
}

function toggleLike(postId) {
  const community = getCommunity();
  const posts = community[activeChannelId] || [];
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  saveCommunity(community);
  renderPosts();
}

function submitReply(postId, text) {
  const user = getCurrentUser();
  const community = getCommunity();
  const posts = community[activeChannelId] || [];
  const post = posts.find((p) => p.id === postId);
  if (!post) return;

  if (!post.replies) post.replies = [];
  post.replies.push({ author: user.name || "You", timeLabel: "Just now", text });
  saveCommunity(community);
  renderPosts();

  // Keep the reply box open and focused after the list re-renders
  const form = document.getElementById(`reply-form-${postId}`);
  if (form) {
    form.hidden = false;
    form.querySelector("textarea").focus();
  }
}

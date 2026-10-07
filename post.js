// ========= CREATE POST =========
const createForm = document.getElementById("createPostForm");
if (createForm) {
  createForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = document.getElementById("postDescription").value;
    const song = document.getElementById("postSong").value;
    const image = document.getElementById("postImage").value;
    const user = localStorage.getItem("loggedInUser");

    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    posts.unshift({ user, description, song, image }); // add newest first
    localStorage.setItem("posts", JSON.stringify(posts));

    alert("✅ Dedication posted!");
    window.location.href = "home.html";
  });
}

// ========= DISPLAY POSTS =========
const feed = document.getElementById("postFeed");
if (feed) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  if (posts.length === 0) {
    feed.innerHTML = "<p>No posts yet. Be the first to share!</p>";
  } else {
    feed.innerHTML = posts.map(post => `
      <div class="post">
        <h3>@${post.user}</h3>
        <p>${post.description}</p>
        ${post.image ? `<img src="${post.image}" alt="dedication image">` : ""}
        ${post.song ? `<p><a href="${post.song}" target="_blank">🎵 Listen to Song</a></p>` : ""}
      </div>
    `).join("");
  }
}

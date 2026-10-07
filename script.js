// Load posts from localStorage
function loadPosts() {
  const postsContainer = document.getElementById("posts");
  if (!postsContainer) return;

  postsContainer.innerHTML = "";
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.reverse().forEach(post => {
    const div = document.createElement("div");
    div.classList.add("post");
    div.innerHTML = `
      <img src="${post.img}" alt="Post Image">
      <p><b>${post.user}</b>: ${post.desc}</p>
      <iframe src="${post.song}" frameborder="0" allowfullscreen></iframe>
    `;
    postsContainer.appendChild(div);
  });
}

// Handle new post
const postForm = document.getElementById("postForm");
if (postForm) {
  postForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const img = document.getElementById("imgUrl").value;
    const desc = document.getElementById("description").value;
    let song = document.getElementById("songUrl").value;

    // Convert YouTube link to embed format
    song = song.replace("watch?v=", "embed/");

    const user = localStorage.getItem("loggedInUser");

    const newPost = { img, desc, song, user };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("postForm").reset();
    loadPosts();
  });
}

// Initial load
loadPosts();

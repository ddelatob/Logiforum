// Frontend JavaScript running in the user's browser
async function loadPosts(pageNumber) {
  // 1. Sends the GET request to server.js and PAUSES until server calls res.json(...)
  const response = await fetch(`/api/posts?page=${pageNumber}&limit=5`);

  // 2. Reads the JSON text that server.js put into res.json(...) and turns it back into a JS object
  const data = await response.json();

  // 3. Updates the webpage's HTML (DOM) using the data from the server
  const container = document.getElementById("posts-container");
  container.innerHTML = data.posts
    .map((post) => `<article class="posts"><h2>${post.title}</h2></article>`)
    .join("");
}

loadPosts(1);

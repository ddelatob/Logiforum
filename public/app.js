let activeSuperThreadId = null;
let currentPage = 1;
// Frontend JavaScript running in the user's browser
async function loadPosts(page) {
  // 1. Sends the GET request to server.js and PAUSES until server calls res.json(...)
  const params = new URLSearchParams({ page });

  if (activeSuperThreadId !== null) {
    params.set("superThread", activeSuperThreadId);
  }

  const response = await fetch(`/api/subthreads?${params.toString()}`);

  // 2. Reads the JSON text that server.js put into res.json(...) and turns it back into a JS object
  const data = await response.json();

  // 3. Updates the webpage's HTML (DOM) using the data from the server
  const container = document.getElementById("posts-container");
  container.innerHTML = data.subThreads
    .map((post) => `<article class="posts"><h2>${post.title}</h2></article>`)
    .join("");
}

document.querySelector(".pagination").addEventListener("click", (event) => {
  const button = event.target.closest("button[data-page]");
  if (button) {
    loadPosts(Number(button.dataset.page));
  }
});

document
  .querySelector(".superthread-list")
  .addEventListener("click", (event) => {
    const item = event.target.closest(".superthread-item[data-superthread-id]");
    if (!item) return;

    const clickedId = Number(item.dataset.superthreadId);
    activeSuperThreadId = activeSuperThreadId === clickedId ? null : clickedId;

    updateActiveSidebarState();
    loadPosts(currentPage);
  });

async function loadSuperThreads() {
  const response = await fetch("/api/superthreads");

  const data = await response.json();

  const container = document.getElementById("superthread-list");

  container.innerHTML = data.superthreads
    .map(
      (superThread) =>
        `<li> <button class="superthread-item" data-superthread-id=${superThread.id}> <span class="superthread-title" >${superThread.title}</span > <span class="superthread-meta">${superThread.numSubThreads} subthreads</span> </button> </li>`,
    )
    .join("");
}

function updateActiveSidebarState() {
  document
    .querySelectorAll(".superthread-item[data-superthread-id")
    .forEach((el) => {
      const id = Number(el.dataset.superthreadId);
      el.classList.toggle("active", id === activeSuperThreadId);
    });
}

function toggleHiddenCreateView() {
  button = document.querySelector(".new-btn");
}


loadSuperThreads();

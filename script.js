let generate = document.querySelector(".generate");
let hideButton = document.querySelectorAll("#hide");
const input = document.querySelector("#searchInput");

const options = {
  headers: {
    Authorization: "563492ad6f91700001000001eb3b37e1257549b7979212ddd07c2f88",
  },
};

loadPics = (photos) => {
  generate.innerHTML = "";
  for (let photo of photos) {
    generate.innerHTML += `
    <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
    <img class="img-card-top img-fluid" src="${photo.src.medium}">
    <div class="card-body">
        <p class="card-text">
        This is a wider card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
        </p>
        <div
        class="d-flex justify-content-between align-items-center"
        >
        <div class="btn-group">
            <button
            type="button"
            class="btn btn-sm btn-outline-secondary"
            >
            View
            </button>
            <button
                        type="button"
                        class="btn btn-sm btn-outline-secondary hide" onclick="hideBtn()" id="hide"
                      >
                        Hide
                      </button>
        </div>
        <small class="text-muted">${photo.id}</small>
        </div>
    </div>
    </div>
    </div>`;
  }
  const hideBtn = document.querySelectorAll("#hide");
  for (btn of hideBtn) {
    btn.addEventListener("click", hideCard);
  }
};

const loadFirst = () => {
  fetch("https://api.pexels.com/v1/search?query=grafitti", options)
    .then((response) => response.json())
    .then((response) => loadPics(response.photos));
};

const loadSecond = () => {
  fetch("https://api.pexels.com/v1/search?query=tattoos", options)
    .then((response) => response.json())
    .then((response) => loadPics(response.photos));
};

const hideCard = (e) => {
  e.path[5].style.display = "none";
};

for (btn of hideBtn) {
  btn.addEventListener("click", hideCard);
}

const searchPics = (event) => {
  const searchTerm = event.target.value;

  fetch(`https://api.pexels.com/v1/search?query=${searchTerm}`, options)
    .then((response) => response.json())
    .then((response) => loadPics(response.photos));
};

input.addEventListener("input", searchPics);

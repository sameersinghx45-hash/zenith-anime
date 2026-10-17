// Zenith Anime demo data. Replace sample titles with content you have rights to use.
const animeData = [
  {
    id: "moonlit-ronin", title: "Moonlit Ronin", genre: "Action", year: 2025, episodes: 12, score: "9.1",
    symbol: "月", palette: "linear-gradient(145deg, #5b2d88, #19102d 75%)",
    description: "A wandering swordsman follows a trail of mysterious purple lights across a world where forgotten legends are waking up.",
    episodeNames: ["The First Lantern", "Footsteps in Fog", "A Silent Promise", "The Violet Gate"],
    videoUrls: []
  },
  {
    id: "starfall-academy", title: "Starfall Academy", genre: "Fantasy", year: 2024, episodes: 24, score: "8.8",
    symbol: "✦", palette: "linear-gradient(145deg, #34418e, #1a102e 75%)",
    description: "A new student discovers that the stars above the academy are connected to an ancient kind of magic.",
    episodeNames: ["A Sky Full of Secrets", "The Hidden Observatory", "Lessons in Starlight", "The Midnight Exam"],
    videoUrls: []
  },
  {
    id: "ember-trail", title: "Ember Trail", genre: "Adventure", year: 2025, episodes: 10, score: "8.6",
    symbol: "火", palette: "linear-gradient(145deg, #a04c77, #2c123f 75%)",
    description: "Two unlikely friends cross a colourful wilderness to return a lost spark to their mountain village.",
    episodeNames: ["The Last Spark", "Across the Red Valley", "Campfire Stories", "A New Direction"],
    videoUrls: []
  },
  {
    id: "paper-cranes", title: "Paper Cranes", genre: "Drama", year: 2023, episodes: 11, score: "8.9",
    symbol: "折", palette: "linear-gradient(145deg, #7351b4, #17203e 75%)",
    description: "A quiet art club learns to understand each other while preparing a paper installation for their town festival.",
    episodeNames: ["A Thousand Folds", "The Art Room", "Rainy Afternoon", "Festival Day"],
    videoUrls: []
  },
  {
    id: "neon-orbit", title: "Neon Orbit", genre: "Action", year: 2024, episodes: 13, score: "8.7",
    symbol: "◎", palette: "linear-gradient(145deg, #4d2a99, #102e48 75%)",
    description: "A rookie pilot joins a small space crew and uncovers a signal hidden beyond the outer planets.",
    episodeNames: ["Ignition", "The Blue Comet", "Signal Lost", "Beyond Orbit"],
    videoUrls: []
  },
  {
    id: "fox-spirit-cafe", title: "Fox Spirit Café", genre: "Fantasy", year: 2025, episodes: 8, score: "8.5",
    symbol: "狐", palette: "linear-gradient(145deg, #a45eaf, #321747 75%)",
    description: "A night-shift café serves travellers from the human world and the spirit realm, one warm cup at a time.",
    episodeNames: ["Open After Dusk", "A Guest with Nine Tails", "The Missing Recipe", "One Last Cup"],
    videoUrls: []
  },
  {
    id: "wild-compass", title: "Wild Compass", genre: "Adventure", year: 2022, episodes: 16, score: "8.4",
    symbol: "➤", palette: "linear-gradient(145deg, #477d9d, #201442 75%)",
    description: "A curious cartographer and a fearless mechanic search for a moving island that appears on no map.",
    episodeNames: ["North Is a Feeling", "The Moving Island", "Map of the Wind", "A New Horizon"],
    videoUrls: []
  },
  {
    id: "winter-letter", title: "Winter Letter", genre: "Drama", year: 2023, episodes: 12, score: "8.9",
    symbol: "❄", palette: "linear-gradient(145deg, #8d8cda, #292044 75%)",
    description: "A letter delivered years late brings two former friends together to finish a promise they once made.",
    episodeNames: ["The Blue Envelope", "Snowfall", "What We Kept", "Until Spring"],
    videoUrls: []
  }
];

const grid = document.getElementById("animeGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const hero = document.getElementById("hero");
const toolbar = document.querySelector(".toolbar");
const filters = document.getElementById("filters");
const episodePage = document.getElementById("episodePage");
const sectionTitle = document.getElementById("sectionTitle");
let activeGenre = "All";
let currentAnime = null;
let currentEpisode = 0;
let currentView = "home";

function getWatchlist() {
  try { return JSON.parse(localStorage.getItem("zenithWatchlist") || "[]"); }
  catch { return []; }
}
function saveWatchlist(list) {
  localStorage.setItem("zenithWatchlist", JSON.stringify(list));
  updateWatchCount();
}
function isSaved(id) { return getWatchlist().includes(id); }
function toggleWatchlist(id) {
  const list = getWatchlist();
  saveWatchlist(list.includes(id) ? list.filter(item => item !== id) : [...list, id]);
  renderCards();
  if (currentAnime && currentAnime.id === id) updateEpisodeWatchlistButton();
}
function updateWatchCount() { document.getElementById("watchCount").textContent = getWatchlist().length; }

function cardTemplate(anime) {
  const saved = isSaved(anime.id);
  return `<article class="anime-card">
    <div class="poster" style="--poster-bg:${anime.palette}" data-symbol="${anime.symbol}">
      <span class="poster-tag">${anime.genre.toUpperCase()}</span>
    </div>
    <div class="card-body">
      <div class="card-top"><h3 class="card-title">${escapeHTML(anime.title)}</h3><span class="score">★ ${anime.score}</span></div>
      <p class="card-meta">${anime.year} · ${anime.episodes} episodes</p>
      <div class="card-actions">
        <button class="small-btn" data-open="${anime.id}">View episodes ↗</button>
        <button class="small-btn ${saved ? "saved" : ""}" data-save="${anime.id}">${saved ? "✓ Saved" : "＋ Watchlist"}</button>
      </div>
    </div>
  </article>`;
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}
function renderCards() {
  let list = animeData.filter(anime => {
    const query = searchInput.value.trim().toLowerCase();
    const matchesQuery = !query || `${anime.title} ${anime.genre} ${anime.description}`.toLowerCase().includes(query);
    const matchesGenre = activeGenre === "All" || anime.genre === activeGenre;
    const matchesWatchlist = currentView !== "watchlist" || isSaved(anime.id);
    return matchesQuery && matchesGenre && matchesWatchlist;
  });
  grid.innerHTML = list.map(cardTemplate).join("");
  emptyState.classList.toggle("hidden", list.length !== 0);
  grid.classList.toggle("hidden", list.length === 0);
  sectionTitle.textContent = currentView === "watchlist" ? "My watchlist" : "Discover anime";
}
function showHome() {
  currentView = "home";
  hero.classList.remove("hidden"); toolbar.classList.remove("hidden"); filters.classList.remove("hidden");
  grid.classList.remove("hidden"); episodePage.classList.add("hidden");
  document.querySelectorAll("[data-view]").forEach(btn => btn.classList.toggle("active", btn.dataset.view === "home"));
  renderCards();
}
function showWatchlist() {
  currentView = "watchlist";
  hero.classList.add("hidden"); toolbar.classList.remove("hidden"); filters.classList.add("hidden");
  episodePage.classList.add("hidden"); grid.classList.remove("hidden");
  document.querySelectorAll("[data-view]").forEach(btn => btn.classList.toggle("active", btn.dataset.view === "watchlist"));
  activeGenre = "All";
  document.querySelectorAll(".filter").forEach(btn => btn.classList.toggle("active", btn.dataset.genre === "All"));
  renderCards();
}
function updateEpisodeWatchlistButton() {
  const btn = document.getElementById("episodeWatchlistBtn");
  btn.textContent = isSaved(currentAnime.id) ? "✓ Saved to watchlist" : "＋ Add to watchlist";
}
function showEpisodePage(id) {
  currentAnime = animeData.find(anime => anime.id === id);
  if (!currentAnime) return;
  currentEpisode = 0;
  currentView = "episode";
  hero.classList.add("hidden"); toolbar.classList.add("hidden"); filters.classList.add("hidden"); grid.classList.add("hidden"); emptyState.classList.add("hidden");
  episodePage.classList.remove("hidden");
  document.querySelectorAll("[data-view]").forEach(btn => btn.classList.remove("active"));
  document.getElementById("episodePoster").style.setProperty("--poster-bg", currentAnime.palette);
  document.getElementById("episodePoster").dataset.symbol = currentAnime.symbol;
  document.getElementById("episodeTitle").textContent = currentAnime.title;
  document.getElementById("episodeMeta").textContent = `${currentAnime.genre} · ${currentAnime.year} · ${currentAnime.episodes} episodes · ★ ${currentAnime.score}`;
  document.getElementById("episodeDescription").textContent = currentAnime.description;
  document.getElementById("episodeList").innerHTML = currentAnime.episodeNames.map((name, index) =>
    `<button class="episode-btn ${index === 0 ? "active" : ""}" data-episode="${index}">EP ${String(index + 1).padStart(2, "0")} · ${escapeHTML(name)}</button>`
  ).join("");
  updateEpisodeWatchlistButton();
  setVideoForEpisode(0);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function setVideoForEpisode(index) {
  currentEpisode = index;
  document.querySelectorAll("[data-episode]").forEach(btn => btn.classList.toggle("active", Number(btn.dataset.episode) === index));
  const url = currentAnime.videoUrls && currentAnime.videoUrls[index];
  const player = document.getElementById("videoPlayer");
  const videoWrap = document.getElementById("videoWrap");
  const placeholder = document.getElementById("playerPlaceholder");
  player.pause();
  if (url && isAllowedVideoUrl(url)) {
    player.src = url;
    videoWrap.classList.remove("hidden");
    placeholder.classList.add("hidden");
  } else {
    player.removeAttribute("src");
    player.load();
    videoWrap.classList.add("hidden");
    placeholder.classList.remove("hidden");
  }
}
function isAllowedVideoUrl(url) {
  try {
    const parsed = new URL(url, window.location.href);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch { return false; }
}

grid.addEventListener("click", event => {
  const openButton = event.target.closest("[data-open]");
  const saveButton = event.target.closest("[data-save]");
  if (openButton) showEpisodePage(openButton.dataset.open);
  if (saveButton) toggleWatchlist(saveButton.dataset.save);
});
document.getElementById("episodeList").addEventListener("click", event => {
  const btn = event.target.closest("[data-episode]");
  if (btn) setVideoForEpisode(Number(btn.dataset.episode));
});
document.getElementById("episodeWatchlistBtn").addEventListener("click", () => {
  if (currentAnime) toggleWatchlist(currentAnime.id);
});
document.getElementById("backBtn").addEventListener("click", () => currentView === "watchlist" ? showWatchlist() : showHome());
document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => {
  activeGenre = btn.dataset.genre;
  document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === btn));
  renderCards();
}));
searchInput.addEventListener("input", renderCards);
document.querySelectorAll("[data-view]").forEach(btn => btn.addEventListener("click", () => {
  if (btn.dataset.view === "watchlist") showWatchlist(); else showHome();
}));
document.getElementById("exploreBtn").addEventListener("click", () => document.getElementById("catalogue").scrollIntoView({ behavior: "smooth" }));
document.getElementById("homeLink").addEventListener("click", event => { event.preventDefault(); showHome(); });
document.querySelectorAll("footer .brand").forEach(link => link.addEventListener("click", event => { event.preventDefault(); showHome(); }));
document.addEventListener("keydown", event => {
  if (event.key === "/" && document.activeElement !== searchInput && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault(); searchInput.focus();
  }
  if (event.key === "Escape" && document.activeElement === searchInput) searchInput.blur();
});
updateWatchCount();
renderCards();

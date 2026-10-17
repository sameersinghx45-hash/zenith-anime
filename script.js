
const animeData = [
  {document.getElementById("animeGrid").innerHTML = "<h2 style='color:white'>JavaScript is working!</h2>";
    id: "demon-slayer",
    title: "Demon Slayer",
    genre: "Action",
    year: 2019,
    episodes: "Official",
    score: "—",
    symbol: "滅",
    palette: "linear-gradient(145deg, #8d273d, #19102d 75%)",
    description: "Tanjiro Kamado begins a journey to protect his sister and fight demons.",
    episodeNames: ["Official streaming page"],
    videoUrls: [],
    officialUrl: "https://www.crunchyroll.com/hi/series/GY5P48XEY/demon-slayer-kimetsu-no-yaiba"
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    genre: "Action",
    year: 2024,
    episodes: "Official",
    score: "—",
    symbol: "影",
    palette: "linear-gradient(145deg, #263c80, #11101f 75%)",
    description: "Sung Jinwoo rises from a weak hunter to a powerful fighter.",
    episodeNames: ["Official streaming page"],
    videoUrls: [],
    officialUrl: "https://www.crunchyroll.com/series/GDKHZEJ0K/solo-leveling"
  },
  {
    id: "naruto",
    title: "Naruto",
    genre: "Adventure",
    year: 2002,
    episodes: "Official",
    score: "—",
    symbol: "忍",
    palette: "linear-gradient(145deg, #db762a, #25102d 75%)",
    description: "Naruto dreams of becoming the Hokage of his village.",
    episodeNames: ["Official streaming page"],
    videoUrls: [],
    officialUrl: "https://www.crunchyroll.com/hi/series/GY9PJ5KWR/naruto"
  },
  {
    id: "one-piece",
    title: "One Piece",
    genre: "Adventure",
    year: 1999,
    episodes: "Official",
    score: "—",
    symbol: "☠",
    palette: "linear-gradient(145deg, #267da1, #19102d 75%)",
    description: "Luffy and his crew sail in search of the legendary One Piece.",
    episodeNames: ["Official streaming page"],
    videoUrls: [],
    officialUrl: "https://www.crunchyroll.com/series/GRMG8ZQZR/one-piece"
  },
  {
    id: "blue-lock",
    title: "Blue Lock",
    genre: "Sports",
    year: 2022,
    episodes: "Official",
    score: "—",
    symbol: "⚽",
    palette: "linear-gradient(145deg, #1465a0, #17102e 75%)",
    description: "Young footballers compete to become Japan's best striker.",
    episodeNames: ["Official streaming page"],
    videoUrls: [],
    officialUrl: "https://www.crunchyroll.com/series/G4PH0WEKE/blue-lock"
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    genre: "Action",
    year: 2020,
    episodes: "Official",
    score: "—",
    symbol: "呪",
    palette: "linear-gradient(145deg, #7542a0, #17102e 75%)",
    description: "Yuji Itadori enters the world of cursed spirits and sorcerers.",
    episodeNames: ["Official streaming page"],
    videoUrls: [],
    officialUrl: "https://www.crunchyroll.com/series/GRDV0019R/jujutsu-kaisen"
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
let currentView = "home";

function getWatchlist() {
  try {
    return JSON.parse(
      localStorage.getItem("zenithWatchlist") || "[]"
    );
  } catch {
    return [];
  }
}

function saveWatchlist(list) {
  try {
    localStorage.setItem("zenithWatchlist", JSON.stringify(list));
  } catch {
    // Website still works if storage is unavailable.
  }
  updateWatchCount();
}

function isSaved(id) {
  return getWatchlist().includes(id);
}

function updateWatchCount() {
  const count = document.getElementById("watchCount");
  if (count) count.textContent = getWatchlist().length;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

function cardTemplate(anime) {
  const saved = isSaved(anime.id);

  return `
    <article class="anime-card">
      <div class="poster"
        style="--poster-bg:${anime.palette}"
        data-symbol="${escapeHTML(anime.symbol)}">
        <span class="poster-tag">
          ${escapeHTML(anime.genre.toUpperCase())}
        </span>
      </div>

      <div class="card-body">
        <div class="card-top">
          <h3 class="card-title">${escapeHTML(anime.title)}</h3>
          <span class="score">★ ${escapeHTML(anime.score)}</span>
        </div>

        <p class="card-meta">
          ${anime.year} · Official listing
        </p>

        <div class="card-actions">
          <button class="small-btn" data-open="${anime.id}">
            View details ↗
          </button>
          <button class="small-btn ${saved ? "saved" : ""}"
            data-save="${anime.id}">
            ${saved ? "✓ Saved" : "＋ Watchlist"}
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderCards() {
  if (!grid || !searchInput || !emptyState) return;

  const query = searchInput.value.trim().toLowerCase();

  const list = animeData.filter(anime => {
    const matchesQuery =
      `${anime.title} ${anime.genre} ${anime.description}`
        .toLowerCase().includes(query);

    const matchesGenre =
      activeGenre === "All" || anime.genre === activeGenre;

    const matchesWatchlist =
      currentView !== "watchlist" || isSaved(anime.id);

    return matchesQuery && matchesGenre && matchesWatchlist;
  });

  grid.innerHTML = list.map(cardTemplate).join("");
  emptyState.classList.toggle("hidden", list.length > 0);
  grid.classList.toggle("hidden", list.length === 0);

  if (sectionTitle) {
    sectionTitle.textContent =
      currentView === "watchlist"
        ? "My watchlist"
        : "Discover anime";
  }
}

function updateNavigation() {
  document.querySelectorAll("[data-view]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.view === currentView
    );
  });
}

function showHome() {
  currentView = "home";

  hero?.classList.remove("hidden");
  toolbar?.classList.remove("hidden");
  filters?.classList.remove("hidden");
  grid?.classList.remove("hidden");
  episodePage?.classList.add("hidden");

  updateNavigation();
  renderCards();
}

function showWatchlist() {
  currentView = "watchlist";
  activeGenre = "All";

  hero?.classList.add("hidden");
  toolbar?.classList.remove("hidden");
  filters?.classList.add("hidden");
  episodePage?.classList.add("hidden");
  grid?.classList.remove("hidden");

  document.querySelectorAll(".filter").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.genre === "All"
    );
  });

  updateNavigation();
  renderCards();
}

function toggleWatchlist(id) {
  const list = getWatchlist();
  const updated = list.includes(id)
    ? list.filter(item => item !== id)
    : [...list, id];

  saveWatchlist(updated);
  renderCards();

  if (currentAnime?.id === id) {
    updateEpisodeWatchlistButton();
  }
}

function updateEpisodeWatchlistButton() {
  const button = document.getElementById("episodeWatchlistBtn");
  if (!button || !currentAnime) return;

  button.textContent = isSaved(currentAnime.id)
    ? "✓ Saved to watchlist"
    : "＋ Add to watchlist";
}

function showEpisodePage(id) {
  currentAnime = animeData.find(anime => anime.id === id);
  if (!currentAnime) return;

  currentView = "episode";
  hero?.classList.add("hidden");
  toolbar?.classList.add("hidden");
  filters?.classList.add("hidden");
  grid?.classList.add("hidden");
  emptyState?.classList.add("hidden");
  episodePage?.classList.remove("hidden");

  updateNavigation();

  const poster = document.getElementById("episodePoster");
  const title = document.getElementById("episodeTitle");
  const meta = document.getElementById("episodeMeta");
  const description = document.getElementById("episodeDescription");
  const list = document.getElementById("episodeList");

  if (poster) {
    poster.style.setProperty("--poster-bg", currentAnime.palette);
    poster.dataset.symbol = currentAnime.symbol;
  }

  if (title) title.textContent = currentAnime.title;

  if (meta) {
    meta.textContent =
      `${currentAnime.genre} · ${currentAnime.year} · ★ ${currentAnime.score}`;
  }

  if (description) {
    description.textContent = currentAnime.description;
  }

  if (list) {
    list.innerHTML = currentAnime.episodeNames.map((name, index) => `
      <button class="episode-btn ${index === 0 ? "active" : ""}"
        data-episode="${index}">
        ${escapeHTML(name)}
      </button>
    `).join("");
  }

  let officialLink = document.getElementById("officialAnimeLink");

  if (!officialLink && description) {
    officialLink = document.createElement("a");
    officialLink.id = "officialAnimeLink";
    officialLink.className = "primary-btn";
    officialLink.target = "_blank";
    officialLink.rel = "noopener noreferrer";
    officialLink.textContent = "Open official streaming page ↗";
    description.insertAdjacentElement("afterend", officialLink);
  }

  if (officialLink) {
    officialLink.href = currentAnime.officialUrl;
    officialLink.style.display = "inline-block";
  }

  const player = document.getElementById("videoPlayer");
  const videoWrap = document.getElementById("videoWrap");
  const placeholder = document.getElementById("playerPlaceholder");

  if (player) {
    player.pause();
    player.removeAttribute("src");
    player.load();
  }

  videoWrap?.classList.add("hidden");
  placeholder?.classList.remove("hidden");

  updateEpisodeWatchlistButton();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

if (grid) {
  grid.addEventListener("click", event => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const openButton = target.closest("[data-open]");
    const saveButton = target.closest("[data-save]");

    if (openButton) showEpisodePage(openButton.dataset.open);
    if (saveButton) toggleWatchlist(saveButton.dataset.save);
  });
}

document.getElementById("episodeList")?.addEventListener("click", event => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const button = target.closest("[data-episode]");
  if (!button || !currentAnime) return;

  document.querySelectorAll("[data-episode]").forEach(item => {
    item.classList.toggle("active", item === button);
  });

  // This demo links to official sources instead of hosting episodes.
  const officialLink = document.getElementById("officialAnimeLink");
  if (officialLink) {
    officialLink.href = currentAnime.officialUrl;
  }
});

document.getElementById("episodeWatchlistBtn")
  ?.addEventListener("click", () => {
    if (currentAnime) toggleWatchlist(currentAnime.id);
  });

document.getElementById("backBtn")
  ?.addEventListener("click", () => {
    if (currentView === "watchlist") showWatchlist();
    else showHome();
  });

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    activeGenre = button.dataset.genre;

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderCards();
  });
});

searchInput?.addEventListener("input", renderCards);

document.querySelectorAll("[data-view]").forEach(button => {
  button.addEventListener("click", () => {
    if (button.dataset.view === "watchlist") showWatchlist();
    else showHome();
  });
});

document.getElementById("exploreBtn")
  ?.addEventListener("click", () => {
    document.getElementById("catalogue")
      ?.scrollIntoView({ behavior: "smooth" });
  });

document.getElementById("homeLink")
  ?.addEventListener("click", event => {
    event.preventDefault();
    showHome();
  });

document.querySelectorAll("footer .brand").forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    showHome();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

document.addEventListener("keydown", event => {
  if (
    event.key === "/" &&
    document.activeElement !== searchInput &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)
  ) {
    event.preventDefault();
    searchInput?.focus();
  }

  if (event.key === "Escape" && document.activeElement === searchInput) {
    searchInput.blur();
  }
});

updateWatchCount();
renderCards();

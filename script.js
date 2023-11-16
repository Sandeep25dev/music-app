const songs = [
  {
    id: 0,
    songName: "One Love",
    artist: "Shubh Khalistaani",
    img: "./covers/1.jpg",
    filePath: "./songs/1.mp3",
  },
  {
    id: 1,
    songName: "Brown Rang",
    artist: "Yo Yo Honey Singh",
    img: "./covers/2.jpg",
    filePath: "./songs/2.mp3",
  },
  {
    id: 2,
    songName: "Blue Eyes",
    artist: "Yo Yo Honey Singh",
    img: "./covers/3.jpg",
    filePath: "./songs/3.mp3",
  },
  {
    id: 3,
    songName: "Desi Kalakaar",
    artist: "Yo Yo Honey Singh",
    img: "./covers/4.jpg",
    filePath: "./songs/4.mp3",
  },
  {
    id: 4,
    songName: "Love Dose",
    artist: "Yo Yo Honey Singh",
    img: "./covers/5.jpg",
    filePath: "./songs/5.mp3",
  },
  {
    id: 5,
    songName: "Yaar Bathere",
    artist: "Yo Yo Honey Singh",
    img: "./covers/6.jpg",
    filePath: "./songs/6.mp3",
  },
  {
    id: 6,
    songName: "Birthday Bash",
    artist: "Yo Yo Honey Singh",
    img: "./covers/7.jpg",
    filePath: "./songs/7.mp3",
  },
  {
    id: 7,
    songName: "Bebo",
    artist: "Yo Yo Honey Singh",
    img: "./covers/8.jpg",
    filePath: "./songs/8.mp3",
  },
  {
    id: 8,
    songName: "Choot Vol.1",
    artist: "Yo Yo Honey Singh",
    img: "./covers/9.jpg",
    filePath: "./songs/9.mp3",
  },
  {
    id: 9,
    songName: "Get Up Jawani",
    artist: "Yo Yo Honey Singh",
    img: "./covers/10.jpg",
    filePath: "./songs/10.mp3",
  },
];

// const songsTemplate = `<div class="song-item">
// <img src="covers/1.jpg" alt="1" />
// <span>Let me love you</span>
// <span class="song-list-play"
//   ><span class="timestamp"
//     ><span>05:15</span>
//     <i class="fa-regular fa-circle-play"></i></span
// ></span>
// </div>`;

/// Initialize the variables
const songItemContainer = document.querySelector(".song-item-container");
const songInfoSongName = document.getElementById("song-info-name");
const masterPlayBtn = document.querySelector(".master-play-btn");
const myProgressBar = document.getElementById("my-progress-bar");
const nextButton = document.querySelector(".fa-forward");
const previousButton = document.querySelector(".fa-backward");
const gif = document.getElementById("gif");
let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filePath);
let currentSong = `${songs[songIndex].songName} - ${songs[songIndex].artist}`;

const createSongsUI = songs
  .map(
    (el) => `<div class="song-item">
<img src="${el.img}" alt="1" />
<span>${el.songName}</span>
<span class="song-list-play"
  ><span class="timestamp"
    ><span>05:15</span>
    <i id="${el.id}" class="fa-regular fa-circle-play"></i></span
></span>
</div>`
  )
  .join("");

songItemContainer.innerHTML = createSongsUI;

// songItemContainer.insertAdjacentElement("afterend", createSongsUI);
// console.log(songInfoSongName.textContent);
songInfoSongName.textContent = currentSong;

masterPlayBtn.addEventListener("click", function () {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    masterPlayBtn.classList.remove("fa-play");
    masterPlayBtn.classList.add("fa-pause");
    audioElement.play();
    gif.style.opacity = 100;
  } else {
    masterPlayBtn.classList.remove("fa-pause");
    masterPlayBtn.classList.add("fa-play");
    audioElement.pause();
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  // console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

nextButton.addEventListener("click", () => {
  if (songIndex < 10) {
    songIndex++;
    audioElement.src = songs[songIndex].filePath;
    currentSong = `${songs[songIndex].songName} - ${songs[songIndex].artist}`;
    songInfoSongName.textContent = currentSong;
    if (!masterPlayBtn.classList.contains("fa-play")) {
      audioElement.play();
    }
    console.log(songIndex, currentSong);
  } else {
    songIndex = 0;
  }
});
previousButton.addEventListener("click", () => {
  if (songIndex >= 0) {
    audioElement.src = songs[songIndex - 1].filePath;
    songIndex--;
    currentSong = `${songs[songIndex].songName} - ${songs[songIndex].artist}`;
    songInfoSongName.textContent = currentSong;
    if (!masterPlayBtn.classList.contains("fa-play")) {
      audioElement.play();
    }
  } else {
    songIndex = 0;
  }
});

Array.from(document.getElementsByClassName("fa-circle-play")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      let index = parseInt(e.target.id);
      songIndex = index;
      audioElement.src = songs[songIndex].filePath;
      currentSong = `${songs[songIndex].songName} - ${songs[songIndex].artist}`;
      songInfoSongName.textContent = currentSong;
      audioElement.play();
      if (masterPlayBtn.classList.contains("fa-play")) {
        masterPlayBtn.classList.remove("fa-play");
        masterPlayBtn.classList.add("fa-pause");
      }
    });
  }
);

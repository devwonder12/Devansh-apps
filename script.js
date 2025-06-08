console.log("Welcome to D-MUSIC");

// Global vars
let songIndex = 0;
const audioElement = new Audio('songs/1.mp3');
const masterPlay    = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif           = document.getElementById('gif');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentSongName = document.getElementById('currentSongName');

// Songs array
const songs = [
  { songName: "Jhol",         filePath: "songs/1.mp3",  coverPath: "cover/1.jpg" },
  { songName: "Finding Her",   filePath: "songs/2.mp3",  coverPath: "cover/2.webp" },
  { songName: "Hanuman Chalisa", filePath: "songs/3.mp3", coverPath: "cover/3.webp" },
  { songName: "Raftaarein",    filePath: "songs/4.mp3",  coverPath: "cover/4.webp" },
  { songName: "Radha Gori Gori", filePath:"songs/5.mp3", coverPath: "cover/5.jpg" },
  { songName: "Deva Shree Ganesha", filePath:"songs/6.mp3", coverPath:"cover/6.jpg" },
  { songName: "The Roar",      filePath: "songs/7.mp3",  coverPath: "cover/7.jpg" },
  { songName: "Roots",         filePath: "songs/8.mp3",  coverPath: "cover/8.jpg" },
  { songName: "Baller",        filePath: "songs/9.mp3",  coverPath: "cover/9.jpg" },
  { songName: "Winning speech", filePath:"songs/10.mp3", coverPath:"cover/10.jpg" },
];

// 1) Page load: set covers & names
document.querySelectorAll('.songItem').forEach((item, i) => {
  item.querySelector('img').src          = songs[i].coverPath;
  item.querySelector('.songName').innerText = songs[i].songName;
});

// Helper: reset all row-icons to play
const makeAllPlays = () => {
  document.querySelectorAll('.songItemPlay').forEach(icon => {
    icon.classList.replace('fa-circle-pause', 'fa-circle-play');
  });
};

// 2) Row-icon click: load & play that song
document.querySelectorAll('.songItemPlay').forEach((icon, i) => {
  icon.addEventListener('click', e => {
    makeAllPlays();
    songIndex = i;
    e.target.classList.replace('fa-circle-play', 'fa-circle-pause');
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    currentSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.replace('fa-play', 'fa-pause');
    gif.style.opacity = 1;
  });
});

// 3) Master play/pause button
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    currentSongName.innerText = songs[songIndex].songName;
    audioElement.play();
    masterPlay.classList.replace('fa-play', 'fa-pause');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.replace('fa-pause', 'fa-play');
    gif.style.opacity = 0;
    makeAllPlays();
  }
});

prevBtn.addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();

  makeAllPlays();  
  document.querySelectorAll('.songItemPlay')[songIndex]
          .classList.replace('fa-circle-play','fa-circle-pause');
  masterPlay.classList.replace('fa-play','fa-pause');
  gif.style.opacity = 1;
});

nextBtn.addEventListener('click', () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();

  makeAllPlays();
  document.querySelectorAll('.songItemPlay')[songIndex]
          .classList.replace('fa-circle-play','fa-circle-pause');
  masterPlay.classList.replace('fa-play','fa-pause');
  gif.style.opacity = 1;
});

let isShuffle = false, isRepeat = false;

document.getElementById('shuffle').addEventListener('click', e => {
  isShuffle = !isShuffle;
  e.target.classList.toggle('active'); 
});

document.getElementById('repeat').addEventListener('click', e => {
  isRepeat = !isRepeat;
  e.target.classList.toggle('active');
});

audioElement.addEventListener('ended', () => {
  if (isRepeat) {
    audioElement.currentTime = 0;
    audioElement.play();
  } else if (isShuffle) {
    songIndex = Math.floor(Math.random() * songs.length);
    nextBtn.click();
  } else {
    nextBtn.click();
  }
});

const navHome = document.getElementById('navHome');
const navAbout = document.getElementById('navAbout');
const homeSection = document.getElementById('homeSection');
const aboutSection = document.getElementById('aboutSection');

function toggleSection(showSection, hideSection, activeBtn, inactiveBtn) {
  showSection.classList.add('show');       // Add animation
  hideSection.classList.remove('show');    // Remove animation
  activeBtn.classList.add('active');       // Highlight tab
  inactiveBtn.classList.remove('active');  // Un-highlight other
}

navHome.addEventListener('click', () => {
  toggleSection(homeSection, aboutSection, navHome, navAbout);
});

navAbout.addEventListener('click', () => {
  toggleSection(aboutSection, homeSection, navAbout, navHome);
});

// Show Home section by default
window.addEventListener('DOMContentLoaded', () => {
  homeSection.classList.add('show');
});

document.addEventListener('DOMContentLoaded', () => {
  const navHome = document.getElementById('navHome');
  const navAbout = document.getElementById('navAbout');
  const homeSection = document.getElementById('homeSection');
  const aboutSection = document.getElementById('aboutSection');

  function toggleSection(show, hide1, hide2, activeBtn, inactiveBtn1, inactiveBtn2) {
  // Hide old sections
  hide1.classList.remove('show');
  hide2.classList.remove('show');

  // Show new section
  show.classList.add('show');

  // Update active tab
}

  navHome.addEventListener('click', () => {
    toggleSection(homeSection, aboutSection, navHome, navAbout);
  });

  navAbout.addEventListener('click', () => {
    toggleSection(aboutSection, homeSection, navAbout, navHome);
  });

  // Show home by default
  homeSection.style.display = 'block';
  aboutSection.style.display = 'none';
});

const navContact = document.getElementById('navContact');
const contactSection = document.getElementById('contactSection');

navContact.addEventListener('click', () => {
  homeSection.style.display = 'none';
  aboutSection.style.display = 'none';
  contactSection.style.display = 'block';
  navHome.classList.remove('active');
  navAbout.classList.remove('active');
  navContact.classList.add('active');
});

// Contact form alert
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thanks for your message, Devansh will get back to you soon!');
  e.target.reset();
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

navHome.addEventListener('click', () => {
  toggleSection(homeSection, aboutSection, contactSection, navHome, navAbout, navContact);
});

navAbout.addEventListener('click', () => {
  toggleSection(aboutSection, homeSection, contactSection, navAbout, navHome, navContact);
});

navContact.addEventListener('click', () => {
  toggleSection(contactSection, homeSection, aboutSection, navContact, navHome, navAbout);
});

homeSection.classList.add('show');

audioElement.addEventListener('timeupdate', () => {
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});

myProgressBar.addEventListener('input', () => {
  audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '🌙' : '☀️';
});

const miniSongName = document.getElementById("miniSongName");
const miniPlayPause = document.getElementById("miniPlayPause");

// When main player plays song
function updateMiniPlayer(song) {
  miniSongName.innerText = song.songName;
  miniPlayPause.classList.remove("fa-play");
  miniPlayPause.classList.add("fa-pause");
}

// Also listen on masterPlay
masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    updateMiniPlayer(songs[songIndex]);
  } else {
    miniPlayPause.classList.remove("fa-pause");
    miniPlayPause.classList.add("fa-play");
  }
});

const nowPlayingView = document.getElementById("nowPlayingView");
const nowPlayingTitle = document.getElementById("nowPlayingTitle");
const nowPlayingCover = document.getElementById("nowPlayingCover");

function openNowPlaying(index) {
  songIndex = index;
  audioElement.src = songs[index].filePath;
  nowPlayingTitle.innerText = songs[index].songName;
  nowPlayingCover.src = songs[index].coverPath;
  nowPlayingView.style.display = "flex";

  audioElement.play();
  updateMiniPlayer(songs[index]);
  masterPlay.classList.replace("fa-play", "fa-pause");
  gif.style.opacity = 1;
}

const nowPlayingBar = document.getElementById("nowPlayingBar");

audioElement.addEventListener("timeupdate", () => {
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  if (nowPlayingBar) nowPlayingBar.value = progress;
if (myProgressBar) myProgressBar.value = progress;
});

document.addEventListener('DOMContentLoaded', () => {
  const miniPlayPause = document.getElementById("miniPlayPause");
  const miniPrev = document.getElementById("miniPrev");
  const miniNext = document.getElementById("miniNext");
 

  if (!miniPlayPause) {
    console.warn("⚠️ miniPlayPause element not found!");
    return;
  }

   console.log(miniPlayPause);

  miniPlayPause.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      masterPlay.classList.replace("fa-play", "fa-pause");
      miniPlayPause.classList.replace("fa-play", "fa-pause");
      gif.style.opacity = 1;
    } else {
      audioElement.pause();
      masterPlay.classList.replace("fa-pause", "fa-play");
      miniPlayPause.classList.replace("fa-pause", "fa-play");
      gif.style.opacity = 0;
    }
  });

  miniPrev.addEventListener("click", () => {
    prevBtn.click();
  });

  miniNext.addEventListener("click", () => {
    nextBtn.click();
  });
});

if (nowPlayingBar) {
  nowPlayingBar.addEventListener("input", () => {
    audioElement.currentTime = nowPlayingBar.value * audioElement.duration / 100;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const navHome = document.getElementById('navHome');
  const navAbout = document.getElementById('navAbout');
  const homeSection = document.getElementById('homeSection');
  const aboutSection = document.getElementById('aboutSection');

  function toggleSection(showSection, hideSection, activeBtn, inactiveBtn) {
    if (showSection) showSection.style.display = 'block';
    if (hideSection) hideSection.style.display = 'none';

    if (activeBtn) activeBtn.classList.add('active');
    if (inactiveBtn) inactiveBtn.classList.remove('active');
  }

  if (navHome && navAbout && homeSection && aboutSection) {
    navHome.addEventListener('click', () => {
      toggleSection(homeSection, aboutSection, navHome, navAbout);
    });

    navAbout.addEventListener('click', () => {
      toggleSection(aboutSection, homeSection, navAbout, navHome);
    });

    // Default view
    toggleSection(homeSection, aboutSection, navHome, navAbout);
  } else {
    console.warn("❌ One or more nav/section elements not found in DOM.");
  }
});





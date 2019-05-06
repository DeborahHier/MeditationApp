const song = document.querySelector(".song");
const video = document.querySelector(".vid-container video");
const play = document.querySelector(".play");
const outline = document.querySelector(".moving-outline circle");
// Get the length of the outline
const outlineLength = outline.getTotalLength();



// Duration
let fakeDuration = 600;



// Toggle the sounds (play/pause music)
function togglePlay(song) {
    if (song.paused) {
        song.play();
        video.play()
        play.src = './svg/pause.svg';

    } else {
        song.pause();
        video.pause();
        play.src = './svg/play.svg';
    }
}

// --------------------------------------------------------
const app = () => {
  // Time Display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll('.time-select button');

  // Circle Timer Animation
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  // Play sound and corresponding video
  play.addEventListener("click", () => {
      togglePlay(song);
  });


  // Time Duration Selection
  timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = Math.floor(fakeDuration / 60) + ":" + Math.floor(fakeDuration % 60);
    });
  });

  // Pick Rain or Beach Sound (and change background video)
  const sounds = document.querySelectorAll(".sound-picker button");
  sounds.forEach(sound => {
    sound.addEventListener("click", function() {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      togglePlay(song);
    });
  });

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // Animate the progress circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // Animate the time Display
    timeDisplay.textContent = minutes + ":" + seconds;

    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }
  };
};

app();

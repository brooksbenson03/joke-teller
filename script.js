const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

function disableButton(bool) {
  button.disabled = bool;
}

function speak(text) {
  VoiceRSS.speech({
    key: "ABC",
    src: text,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function tellAJoke() {
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      speak(`${data.setup} ... ${data.delivery}`);
    } else {
      speak(data.joke);
    }
  } catch (e) {
    console.log("Failed to get jokes", e);
  }
}

button.addEventListener("click", tellAJoke);
audioElement.addEventListener("canplay", disableButton.bind(null, true));
audioElement.addEventListener("ended", disableButton.bind(null, false));

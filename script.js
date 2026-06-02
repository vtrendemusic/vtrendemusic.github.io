const audioPlayers = Array.from(document.querySelectorAll("audio"));

function stopOtherPlayers(activePlayer) {
  audioPlayers.forEach((player) => {
    if (player === activePlayer) {
      return;
    }

    player.pause();

    try {
      player.currentTime = 0;
    } catch (error) {
      player.load();
    }
  });
}

audioPlayers.forEach((player) => {
  player.addEventListener("play", () => stopOtherPlayers(player));
  player.addEventListener("playing", () => stopOtherPlayers(player));
});

document.addEventListener(
  "play",
  (event) => {
    if (event.target instanceof HTMLAudioElement) {
      stopOtherPlayers(event.target);
    }
  },
  true
);

function chooseGift(gift) {
  let message = "";

  switch(gift) {
    case 'camping':
      message = "Get ready for a cozy 2-day camping trip with a BYD — nature, stars, and you.";
      break;
    case 'scuba':
      message = "A scuba mask just for you — the Red Sea is calling 🐠🌊";
      break;
    case 'surf':
      message = "Windsurfing in France awaits! Let’s catch the wind together ☀️🇫🇷";
      break;
  }

  document.body.innerHTML = `
    <h1>🎁 Your Gift 🎁</h1>
    <p>${message}</p>
    <p>Can’t wait to share this memory with you 💖</p>
  `;
}


// script.js

// 等待 HTML 文件完全載入
// script.js

// Warten, bis das HTML-Dokument vollständig geladen ist
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Elemente abrufen ---
  const enterBtn = document.getElementById('enter-btn');
  const landingPage = document.querySelector('.landing-page');
  const mainContent = document.querySelector('.main-content');
  const backgroundMusic = document.getElementById('background-music');
  const photoSlideshow = document.getElementById('photo-slideshow');
  const buttonContainer = document.querySelector('.button-container');
  const giftResultContainer = document.getElementById('gift-result');
  const slideshowImage = document.getElementById('slideshow-image');
  const captionElement = document.getElementById('slideshow-caption'); // Bildunterschrift-Element
  const transitionScreen = document.getElementById('transition-screen'); // Übergangsbildschirm
  const giftBox = document.querySelector('.gift-box-animation');     // Geschenkbox-Animation
  const mainGiftChoices = document.getElementById('main-gift-choices'); // Hauptauswahl (Container)
  const practicalGiftClues = document.getElementById('practical-gift-clues'); // Hinweise (Container)
  const experienceGiftOptions = document.getElementById('experience-gift-options'); // Erlebnis-Optionen (Container)
  const btnExperience = document.getElementById('btn-experience'); // Erlebnis-Button
  const btnPractical = document.getElementById('btn-practical');   // Praktisch-Button
  const waterActivityType = document.getElementById('water-activity-type'); // Erlebnis Stufe 1
  const aboveWaterSpeed = document.getElementById('above-water-speed'); // Erlebnis Stufe 2
  const clueDisplayArea = document.getElementById('clue-display-area'); // Erlebnis Hinweisbereich

  // --- 2. Fotodaten ---
  // Hinweis: 'ali.HEIC' ist ein HEIC-Bild. Konvertierung zu JPG/PNG wäre sicherer.
  const photos = [
    { path: 'images/kh1.JPG', caption: 'Das erste Mal in Kaohsiung ☀️' },
    { path: 'images/mj1.JPG', caption: 'Mahjong lernen... gar nicht so einfach! :D' },
    { path: 'images/1syanni.JPG', caption: '1 Jahr 💕' },
    { path: 'images/ali.HEIC', caption: 'Du bist über den Wolken ☁︎' },
    { path: 'images/camp3.JPG', caption: 'Camping Abenteuer!' },
    { path: 'images/camp2.JPG', caption: '' }, // Leere Caption ist ok
    { path: 'images/hl2.JPG', caption: 'Hualien 🌊 Erkundung' },
    { path: 'images/jf2.JPG', caption: 'Erste Wanderung in Taiwan 🌃' },
    { path: 'images/fc_BJ.JPG', caption: 'Beijing vor der Fernbeziehung' },
    { path: 'images/jp.JPEG', caption: 'Kimono-Zeit in Japan!' },
    { path: 'images/paris.JPG', caption: ' Tom und Mal in Paris!' },
    { path: 'images/kani.JPG', caption: 'Karneval in Mainz 🎉' },
    { path: 'images/cmffm.jpg', caption: 'Erster Weihnachtsmarkt & verlorene Schlüssel!' },
    { path: 'images/bl.JPG', caption: 'Silvester in Berlin 🎆' },
    { path: 'images/IMG_6439.JPG', caption: 'Wiedersehen nach der Fernbeziehung 🥰' },
    { path: 'images/khh.JPG', caption: ' 💑' }
  ];

  let currentPhotoIndex = 0;
  let slideshowInterval = null;

  // --- 3. Funktionsdefinitionen ---

  function startSlideshow() {
    photoSlideshow.style.display = 'block';
    changePhoto();
    slideshowInterval = setInterval(changePhoto, 3000);
    const showTransitionDelay = photos.length * 3000;
    setTimeout(showTransitionScreen, showTransitionDelay);
  }

  function showTransitionScreen() {
    console.log("Showing transition screen...");
    if (slideshowInterval) { clearInterval(slideshowInterval); console.log("Slideshow interval cleared."); }
    if (photoSlideshow.style.display !== 'none') { photoSlideshow.style.display = 'none'; console.log("Photo slideshow hidden."); }

    transitionScreen.style.display = 'flex';
    setTimeout(() => { transitionScreen.classList.add('visible'); console.log("Transition screen faded in."); }, 50);

    setTimeout(() => { giftBox.classList.add('open'); console.log("Gift box animation triggered."); }, 700);

    setTimeout(() => {
        console.log("Hiding transition screen...");
        transitionScreen.classList.remove('visible');
        setTimeout(() => {
            transitionScreen.style.display = 'none';
            giftBox.classList.remove('open');
            console.log("Transition screen hidden, calling showGiftSelection.");
            showGiftSelection();
        }, 500);
    }, 3500);
  }

  function changePhoto() {
    const currentPhoto = photos[currentPhotoIndex];
    slideshowImage.src = currentPhoto.path;
    captionElement.textContent = currentPhoto.caption || ''; // Handle missing caption
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
  }

  function showGiftSelection() {
    console.log("Showing main gift choices.");
    buttonContainer.style.display = 'block'; // Show the main button container
    // Ensure only the main choices are visible initially within the container
    mainGiftChoices.style.display = 'block';
    practicalGiftClues.style.display = 'none';
    experienceGiftOptions.style.display = 'none'; // Hide the experience container too
    waterActivityType.style.display = 'none'; // Hide sub-levels
    aboveWaterSpeed.style.display = 'none';
    clueDisplayArea.style.display = 'none';
  }

  // Zeigt Hinweise nacheinander an
  function revealCluesSequentially(clues, finalGiftIdentifier) {
      console.log(`Revealing clues for: ${finalGiftIdentifier}`);
      // Ensure the experience options container is visible if revealing clues
      experienceGiftOptions.style.display = 'block';
      clueDisplayArea.innerHTML = '<p><strong>Folge den Hinweisen...</strong></p>'; // Reset & Titel
      clueDisplayArea.style.display = 'block'; // Bereich anzeigen

      let delay = 500; // Startverzögerung
      const clueDelayIncrement = 2000; // Zeit zwischen Hinweisen

      clues.forEach((clueText, index) => {
          setTimeout(() => {
              const clueElement = document.createElement('p');
              clueElement.classList.add('clue');
              clueElement.textContent = clueText;
              clueDisplayArea.appendChild(clueElement);
              console.log(`Showing clue ${index + 1}: ${clueText}`);
              setTimeout(() => clueElement.classList.add('visible'), 50); // Trigger Animation

              if (index === clues.length - 1) {
                  setTimeout(() => {
                      console.log("All clues revealed. Calling chooseGift.");
                      // Optional: clueDisplayArea verstecken, bevor Ergebnis kommt?
                      // clueDisplayArea.style.display = 'none';
                      chooseGift(finalGiftIdentifier);
                  }, clueDelayIncrement + 500); // Warte nach letztem Hinweis
              }
          }, delay);
          delay += clueDelayIncrement;
      });
  }


  // Verarbeitet die Auswahl eines Geschenks und zeigt das Ergebnis an
  window.chooseGift = function(giftIdentifier) {
    let message = "";
    let giftTitle = "🎁 Dein Geschenk!"; // Standard Titel

    console.log(`chooseGift called with: ${giftIdentifier}`);

    // Verstecke alle potenziell sichtbaren Bereiche
    if(mainContent.querySelector('.initial-message')?.style.display !== 'none') mainContent.querySelector('.initial-message').style.display = 'none'; // Sicherer Zugriff mit ?.
    if(photoSlideshow?.style.display !== 'none') photoSlideshow.style.display = 'none';
    if(transitionScreen?.style.display !== 'none') transitionScreen.style.display = 'none';
    if(buttonContainer?.style.display !== 'none') buttonContainer.style.display = 'none'; // Gesamten Button-Container verstecken
    // Nicht notwendig, da buttonContainer eh versteckt wird:
    // if(mainGiftChoices?.style.display !== 'none') mainGiftChoices.style.display = 'none';
    // if(practicalGiftClues?.style.display !== 'none') practicalGiftClues.style.display = 'none';
    // if(experienceGiftOptions?.style.display !== 'none') experienceGiftOptions.style.display = 'none';
    // if(waterActivityType?.style.display !== 'none') waterActivityType.style.display = 'none';
    // if(aboveWaterSpeed?.style.display !== 'none') aboveWaterSpeed.style.display = 'none';
    // if(clueDisplayArea?.style.display !== 'none') clueDisplayArea.style.display = 'none';


    switch(giftIdentifier) {
        // Praktische Geschenke
        case 'mask':
            message = "Eine Tauchermaske nur für dich! Das Rote Meer ruft! 🐠🌊";
            break;
        case 'fins':
            message = "Passende Taucherflossen, um die Unterwasserwelt schnell zu erkunden!";
            break;
        case 'shoes':
            message = "Neue Dr. Martens! Sicher und stylisch unterwegs. 👞";
            break;
        case 'pants':
            message = "Schicke neue Hosen von Ralph Lauren für einen tollen Start in den Tag! ✨";
            break;

        // Erlebnis Geschenke
        case 'sup':
            giftTitle = "🎁 Dein Erlebnis-Geschenk!";
            message = "Ein entspannter SUP-Ausflug auf dem Main bei Sonnenuntergang! 🌇 Paddel bereit?";
            break;
        case 'windsurf':
             giftTitle = "🎁 Dein Erlebnis-Geschenk!";
            message = "Windsurfen am Atlantik, genau wie damals in Frankreich! 🏄‍♂️🌊 Nostalgie pur!";
            break;
        case 'marsa_diving':
             giftTitle = "🎁 Dein Erlebnis-Geschenk!";
            message = "Auf zum Tauchen in Marsa Alam, Ägypten! Die Korallen warten auf uns! 🐠🇪🇬";
            break;

        // Fallback für alte Erlebnis-IDs (falls noch irgendwo verlinkt)
        case 'camping':
             giftTitle = "🎁 Dein Erlebnis-Geschenk!";
            message = "Mach dich bereit für einen gemütlichen 2-Tage-Campingausflug mit einem BYD – Natur, Sterne und du.";
            break;

        default:
             message = "Ups, da ist etwas schiefgelaufen bei der Geschenkauswahl.";
             giftTitle = "Hoppla!";
    }

    // Ergebnisbereich aktualisieren und anzeigen
    giftResultContainer.innerHTML = `
      <h1>${giftTitle}</h1>
      <p>${message}</p>
      <p>Ich kann es kaum erwarten, dieses ${giftIdentifier.includes('diving') || giftIdentifier.includes('sup') || giftIdentifier.includes('windsurf') || giftIdentifier.includes('camping') ? 'Erlebnis' : 'Geschenk'} mit dir zu teilen 💖</p> <div id="final-icons">💖✨🎉🎈🚀</div> `;
    giftResultContainer.style.display = 'block';
    console.log("Gift result displayed with icons.");
  }


  // --- 4. Event-Listener ---

  // Startknopf
  enterBtn.addEventListener('click', () => {
    console.log("Enter button clicked.");
    backgroundMusic.play().catch(error => console.log("Musikwiedergabe erfordert Benutzerinteraktion:", error));
    landingPage.style.opacity = '0';
    setTimeout(() => {
      landingPage.style.display = 'none';
      mainContent.style.display = 'block';
      setTimeout(() => { mainContent.style.opacity = '1'; }, 50);
      setTimeout(startSlideshow, 5000);
    }, 500);
  });

  // Hauptauswahl: Praktisch
  btnPractical.addEventListener('click', () => {
    console.log("Practical gifts chosen.");
    mainGiftChoices.style.display = 'none';
    experienceGiftOptions.style.display = 'none'; // Verstecke Erlebnis-Container
    practicalGiftClues.style.display = 'block'; // Zeige Hinweise für Praktisches
  });

  // Hauptauswahl: Erlebnis
  btnExperience.addEventListener('click', () => {
    console.log("Experience gifts chosen. Showing water type choice.");
    mainGiftChoices.style.display = 'none';
    practicalGiftClues.style.display = 'none'; // Verstecke Praktisches
    experienceGiftOptions.style.display = 'block'; // Zeige Erlebnis-Container
    waterActivityType.style.display = 'block'; // Zeige erste Stufe darin
    aboveWaterSpeed.style.display = 'none';
    clueDisplayArea.style.display = 'none';
  });

  // Klick auf Hinweis-Button (Praktisch) - Event Delegation
  practicalGiftClues.addEventListener('click', (event) => {
    if (event.target.classList.contains('clue-button')) {
        const chosenGift = event.target.dataset.gift;
        console.log(`Clue chosen (Practical), gift identifier: ${chosenGift}`);
        practicalGiftClues.style.display = 'none';
        chooseGift(chosenGift);
    }
  });

  // Klick auf Erlebnis Stufe 1: Wasser Typ - Event Delegation
  waterActivityType.addEventListener('click', (event) => {
      if (event.target.classList.contains('choice-button')) {
          const choice = event.target.dataset.choice;
          console.log(`Water activity type chosen: ${choice}`);
          waterActivityType.style.display = 'none';
          if (choice === 'above') {
              aboveWaterSpeed.style.display = 'block';
          } else if (choice === 'under') {
              revealCluesSequentially([
                  "Bereit, Europa zu verlassen?",
                  "...auf nach Afrika!"
              ], 'marsa_diving');
          }
      }
  });

  // Klick auf Erlebnis Stufe 2: Geschwindigkeit - Event Delegation
  aboveWaterSpeed.addEventListener('click', (event) => {
      if (event.target.classList.contains('choice-button')) {
          const choice = event.target.dataset.choice;
          console.log(`Above water speed chosen: ${choice}`);
          aboveWaterSpeed.style.display = 'none';
          if (choice === 'slow') {
              revealCluesSequentially([
                  "Ganz in unserer Nähe...",
                  "...den Sonnenuntergang in Frankfurt genießen.",
                  "Mach dich bereit zum Schwimmen...",
                  "Der Sonnenuntergang ist perfekt🌇"
              ], 'sup');
          } else if (choice === 'fast') {
              revealCluesSequentially([
                  "Bereit für eine Reise in die Vergangenheit?",
                  "...zurück an den Ort, an dem alles begann.",
                  "Der Wind ruft...",
                  "...den Sonnenuntergang in Frankeich genießen."
              ], 'windsurf');
          }
      }
  });

}); // Ende von DOMContentLoaded

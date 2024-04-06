const palettesContainer = document.getElementById('palettes-container');
const generateButton = document.getElementById('generate-button');
const categoryButtons = document.querySelectorAll('.category-button');

const colorCategories = {
  'all': () => generateColor(),
  'tint': () => generateColor(true),
  'shade': () => generateColor(false, true),
  'tone': () => generateColor(true, true),
  'pastel': () => generatePastelColor(),
  'vibrant': () => generateVibrantColor(),
  'neutral': () => generateNeutralColor(),
  'earthy': () => generateEarthyColor(),
  'monochrome': () => generateMonochromeColor(),
  'analogous': () => generateAnalogousColor(),
  'complementary': () => generateComplementaryColor(),
  'triadic': () => generateTriadicColor()
};

function generateColor(isTint = false, isShade = false) {
  let r, g, b;
  if (isTint) {
    r = Math.floor(Math.random() * (255 - 128) + 128);
    g = Math.floor(Math.random() * (255 - 128) + 128);
    b = Math.floor(Math.random() * (255 - 128) + 128);
  } else if (isShade) {
    r = Math.floor(Math.random() * 128);
    g = Math.floor(Math.random() * 128);
    b = Math.floor(Math.random() * 128);
  } else {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);
  }
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function generatePastelColor() {
  const r = Math.floor(Math.random() * 128 + 128);
  const g = Math.floor(Math.random() * 128 + 128);
  const b = Math.floor(Math.random() * 128 + 128);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function generateVibrantColor() {
  const r = Math.floor(Math.random() * 128 + 128);
  const g = Math.floor(Math.random() * 128 + 128);
  const b = Math.floor(Math.random() * 128 + 128);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function generateNeutralColor() {
  const value = Math.floor(Math.random() * 256);
  return `#${value.toString(16).padStart(2, '0')}${value.toString(16).padStart(2, '0')}${value.toString(16).padStart(2, '0')}`;
}

function generateEarthyColor() {
  const r = Math.floor(Math.random() * 128 + 64);
  const g = Math.floor(Math.random() * 128 + 64);
  const b = Math.floor(Math.random() * 128 + 64);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function generateMonochromeColor() {
  const value = Math.floor(Math.random() * 256);
  return `#${value.toString(16).padStart(2, '0')}${value.toString(16).padStart(2, '0')}${value.toString(16).padStart(2, '0')}`;
}

function generateAnalogousColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100);
  const l = Math.floor(Math.random() * 100);
  const r = Math.floor(((2 * s * Math.cos(h * Math.PI / 180)) + 255) / 3);
  const g = Math.floor(((2 * s * Math.sin(h * Math.PI / 180)) + 255) / 3);
  const b = Math.floor((255 - s) / 3);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function generateComplementaryColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100);
  const l = Math.floor(Math.random() * 100);
  const r = Math.floor((255 - s * Math.cos((h + 180) * Math.PI / 180)) / 3);
  const g = Math.floor((255 - s * Math.sin((h + 180) * Math.PI / 180)) / 3);
  const b = Math.floor((255 - s) / 3);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function generateTriadicColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100);
  const l = Math.floor(Math.random() * 100);
  const r = Math.floor((255 - s * Math.cos((h + 120) * Math.PI / 180)) / 3);
  const g = Math.floor((255 - s * Math.sin((h + 120) * Math.PI / 180)) / 3);
  const b = Math.floor((255 - s * Math.cos((h + 240) * Math.PI / 180)) / 3);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function generatePalette(category = 'all') {
  const palette = document.createElement('div');
  palette.classList.add('palette');

  for (let i = 0; i < 6; i++) {
    const color = colorCategories[category]();
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('color');
    colorDiv.style.backgroundColor = color;
    colorDiv.textContent = color;
    colorDiv.setAttribute('data-color', color);
    colorDiv.addEventListener('click', copyColorCode);
    palette.appendChild(colorDiv);
  }

  palettesContainer.appendChild(palette);
}

function generateMorePalettes(category = 'all') {
  for (let i = 0; i < 10; i++) {
    generatePalette(category);
  }
}

// Initial generation of color palettes
generateMorePalettes();

// Add event listener to the generate button
generateButton.addEventListener('click', () => generateMorePalettes());

// Add event listeners to the category buttons
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;
    palettesContainer.innerHTML = '';
    generateMorePalettes(category);
  });
});

// Function to copy color code to clipboard
function copyColorCode(event) {
  const colorCode = event.target.getAttribute('data-color');
  navigator.clipboard.writeText(colorCode)
    .then(() => {
      console.log('Color code copied to clipboard:', colorCode);
      const message = document.createElement('div');
      message.textContent = 'Color code copied to clipboard: ' + colorCode;
      message.classList.add('copied-message');
      document.body.appendChild(message);
      setTimeout(() => {
        message.classList.add('slideOutRight');
        setTimeout(() => {
          message.remove();
        }, 500); // Remove the message after the animation completes
      }, 3000); // Remove the message after 3 seconds
    })
    .catch(err => {
      console.error('Failed to copy color code: ', err);
    });
}


// Show or hide scroll-to-top and scroll-to-bottom buttons based on scroll position
window.addEventListener('scroll', () => {
  const scrollToTopButton = document.getElementById('scrollToTopButton');
  const scrollToBottomButton = document.getElementById('scrollToBottomButton');
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = 'block';
    scrollToBottomButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
    scrollToBottomButton.style.display = 'none';
  }
});

// Scroll to top when the arrow is clicked
document.getElementById('scrollToTopButton').addEventListener('click', () => {
  // Smooth scroll to top
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Scroll to bottom when the arrow is clicked
document.getElementById('scrollToBottomButton').addEventListener('click', () => {
  // Smooth scroll to bottom
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const redSlider = document.getElementById("red-slider-custom");
  const greenSlider = document.getElementById("green-slider-custom");
  const blueSlider = document.getElementById("blue-slider-custom");
  const opacitySlider = document.getElementById("opacity-slider-custom");
  const mixedColor = document.getElementById("mixed-color-custom");
  const colorCodeDisplay = document.getElementById("color-code-custom");
  const paletteContainer = document.getElementById("palette-container-custom");
  const colorSearchInput = document.getElementById("color-search-input");
  const colorSearchButton = document.getElementById("color-search-button");
  const searchedColorPreview = document.getElementById("searched-color-preview");
  const errorMessage = document.getElementById("error-message");

  // Update color when sliders change
  redSlider.addEventListener("input", updateColor);
  greenSlider.addEventListener("input", updateColor);
  blueSlider.addEventListener("input", updateColor);
  opacitySlider.addEventListener("input", updateColor);

  // Update color and copy code when preview box is clicked
  mixedColor.addEventListener("click", function () {
    copyColorCode(colorCodeDisplay.textContent);
  });

  // Search button event listener
  colorSearchButton.addEventListener("click", searchColor);

  // Enter key event listener on input field
  colorSearchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchColor();
    }
  });

  function updateColor() {
    const redValue = redSlider.value;
    const greenValue = greenSlider.value;
    const blueValue = blueSlider.value;
    const opacityValue = opacitySlider.value;

    const color = `rgba(${redValue}, ${greenValue}, ${blueValue}, ${opacityValue})`;
    mixedColor.style.backgroundColor = color;
    colorCodeDisplay.textContent = `Color code: ${color}`;
  }

  function copyColorCode(colorCode) {
    navigator.clipboard.writeText(colorCode)
      .then(() => {
        console.log('Color code copied to clipboard:', colorCode);
        const message = document.createElement('div');
        message.textContent = 'Color code copied to clipboard: ' + colorCode;
        message.classList.add('copied-message');
        document.body.appendChild(message);
        setTimeout(() => {
          message.classList.add('slideOutRight');
          setTimeout(() => {
            message.remove();
          }, 500); // Remove the message after the animation completes
        }, 3000); // Remove the message after 3 seconds
      })
      .catch(err => {
        console.error('Failed to copy color code: ', err);
      });
  }

  function searchColor() {
    const colorCodeOrName = colorSearchInput.value.trim();
    const parsedColor = tinycolor(colorCodeOrName);

    if (parsedColor.isValid()) {
      searchedColorPreview.style.backgroundColor = parsedColor.toRgbString();
      searchedColorPreview.textContent = `Color code: ${parsedColor.toRgbString()}`;
      errorMessage.textContent = ""; // Clear any previous error message
    } else {
      errorMessage.textContent = "Invalid color code or name. Please enter a valid color code or name.";
    }
  }
});




document.addEventListener("DOMContentLoaded", function () {
  // Get the modal
  const modal = document.getElementById("instruction-modal");

  // Get the instruction symbol element
  const instructionSymbol = document.getElementById("instruction-symbol");

  // Get the <span> element that closes the modal
  const closeBtn = document.querySelector("#instruction-modal .close");

  // When the user clicks on <span> (x), close the modal
  closeBtn.onclick = function () {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Show the modal when the instruction symbol is clicked
  instructionSymbol.onclick = function () {
    modal.style.display = "block";
  }
});


// Assuming your color palette data is in the following format
const colorPalettes = [
  {
    colors: ['#8B0000', '#FF6347', '#FFFF00', '#FFFAF0']
  },
  {
    colors: ['#9B30FF', '#FF00FF', '#00FFFF', '#FFD700']
  },
  {
    colors: ['#8B4513', '#D2B48C', '#F5DEB3', '#FFEFD5']
  },
  {
    colors: ['#9370DB', '#E6E6FA', '#FF69B4', '#8B008B']
  },
  {
    colors: ['#708090', '#F5F5F5', '#DCDCDC', '#778899']
  },
  {
    colors: ['#4B0082', '#EE82EE', '#DA70D6', '#BA55D3']
  },
  {
    colors: ['#800080', '#B22222', '#FFD700', '#F5F5F5']
  }
];

const paletteContainer = document.querySelector('.palette-container');
const generateMoreButton = document.querySelector('.generate-more');

function createPaletteCard(palette) {
  const paletteCard = document.createElement('div');
  paletteCard.classList.add('palette-card');

  const colorRows = document.createElement('div');
  colorRows.classList.add('color-rows');

  palette.colors.forEach(color => {
    const colorRow = document.createElement('div');
    colorRow.classList.add('color-row');
    colorRow.style.backgroundColor = color;
    colorRow.setAttribute('data-color', color);
    colorRow.addEventListener('click', copyColorCode);
    colorRows.appendChild(colorRow);
  });

  const info = document.createElement('div');
  info.classList.add('info');

  const durationEl = document.createElement('div');
  durationEl.textContent = `${palette.duration || ''}`;

  const likesEl = document.createElement('div');
  likesEl.classList.add('likes');
  const heartIcon = document.createElement('svg');
  heartIcon.setAttribute('viewBox', '0 0 24 24');
  heartIcon.setAttribute('width', '16');
  heartIcon.setAttribute('height', '16');
  heartIcon.setAttribute('stroke', 'currentColor');
  heartIcon.setAttribute('stroke-width', '2');
  heartIcon.setAttribute('fill', 'none');
  heartIcon.setAttribute('stroke-linecap', 'round');
  heartIcon.setAttribute('stroke-linejoin', 'round');
  heartIcon.innerHTML = '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>';
  likesEl.appendChild(heartIcon);

  info.appendChild(durationEl);
  info.appendChild(likesEl);

  paletteCard.appendChild(colorRows);
  paletteCard.appendChild(info);

  return paletteCard;
}

colorPalettes.forEach(palette => {
  const paletteCard = createPaletteCard(palette);
  paletteContainer.appendChild(paletteCard);
});

generateMoreButton.addEventListener('click', () => {
  const newPalettes = [
    {
      colors: ['#9400D3', '#4B0082', '#00BFFF', '#1E90FF']
    },
    {
      colors: ['#8B0000', '#DC143C', '#FF8C00', '#FFD700']
    }
  ];

  newPalettes.forEach(palette => {
    const paletteCard = createPaletteCard(palette);
    paletteContainer.appendChild(paletteCard);
  });
});

// Function to copy color code to clipboard
function copyColorCode(event) {
  const colorCode = event.target.getAttribute('data-color');
  navigator.clipboard.writeText(colorCode)
    .then(() => {
      console.log('Color code copied to clipboard:', colorCode);
      const message = document.createElement('div');
      message.textContent = 'Color code copied to clipboard: ' + colorCode;
      message.classList.add('copied-message');
      document.body.appendChild(message);
      setTimeout(() => {
        message.classList.add('slideOutRight');
        setTimeout(() => {
          message.remove();
        }, 500);
      }, 3000);
    })
    .catch(err => {
      console.error('Failed to copy color code: ', err);
    });
}



// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


// Disable right-click
document.addEventListener('contextmenu', function (event) {
  event.preventDefault();
});

// Disable copying of content
document.addEventListener('copy', function (event) {
  event.preventDefault();
});

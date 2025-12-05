const slideData = [
  {
    title: "Wind Stance",
    image: "./images/slide-1.jpg",
  },
  {
    title: "Calm Focus",
    image: "./images/slide-2.jpg",
  },
  {
    title: "Red Profile",
    image: "./images/slide-3.jpg",
  },
  {
    title: "Warm Casual",
    image: "./images/slide-4.jpg",
  },
  {
    title: "Soft Gaze",
    image: "./images/slide-5.jpg",
  },
];

const containery = document.querySelector(".containery");
const slider = document.querySelector(".slider");

'let frontSlideIndex = 0;
let isSliderAnimating = false;'

function initializeSlider() {
  slideData.forEach((data, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
                <img src="${data.image}" alt="${data.title}" 
                class="slide-image" />
                <h1 class="slide-title">${data.title}</h1>
    `;
    slider.append(slide);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("content is loaded");
});

console.log("before init:", slider);

initializeSlider();

console.log("after init", slider);

//////

const slideData = [
  {
    title: "Wind Stance",
    image: "./images/slide-1.jpg",
  },
  {
    title: "Calm Focus",
    image: "./images/slide-2.jpg",
  },
  {
    title: "Red Profile",
    image: "./images/slide-3.jpg",
  },
  {
    title: "Warm Casual",
    image: "./images/slide-4.jpg",
  },
  {
    title: "Soft Gaze",
    image: "./images/slide-5.jpg",
  },
];

const containery = document.querySelector(".containery");
const slider = document.querySelector(".slider");

function initializeSlider() {
  slideData.forEach((data, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="slide-image" />
      <h1 class="slide-title">${data.title}</h1>
    `;
    slider.append(slide);
  });

  let slides = document.querySelectorAll(".slide");
  console.log(slides);
}

// run once after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initializeSlider();
});


 slides.forEach((slide, i) => {
    gsap.set(slide, {
      y: -15 + 15 * i + "%",
      z: 15 * i,
      opacity: 1,
    });
  });
}


// -15 + (15 * 0) + "%"; i = 0 => y: -15
// -15 + (15 * 1) + "%"; i = 1 => Y:  0
// -15 + (15 * 2) + "%"; i = 3 => y:  15
// -15 + (15 * 3) + "%"; i = 4 => y:  30
// -15 + (15 * 4) + "%"; i = 5 => y:  45



// console.log("before", title.innerHTML);  // just text/spans inside h1
// console.log("before (full)", title.outerHTML); // h1 + inside

// const split = new SplitText(title, { type: "words", mask: "words" });

// console.log("after", title.innerHTML);   // now shows the word/word-mask spans
// console.log("after (full)", title.outerHTML);

<h1 class="title"><span>Soft</span> Gaze</h1>

title.innerHTML;  // "<span>Soft</span> Gaze"


title.outerHTML;  // "<h1 class=\"title\"><span>Soft</span> Gaze</h1>"


new SplitText(title, {
  type: "words",
  mask: "words",
});

<h1 class="slide-title">
  <span class="word-mask">
    <span class="word">Soft</span>
  </span>
  <span class="word-mask">
    <span class="word">Gaze</span>
  </span>
</h1>

container.addEventListener("wheel", function (e) {
  e.preventDefault();
  // without e.preventDefault() we can scroll in a page , but with e.preventDefault() we cant scroll to a page
  console.log("Without prevent default", e.deltaY);
});


// e is the touch event object (from touchstart / touchmove etc.).

// e.touches is an array‑like list of all fingers currently touching the screen.

// e.touches[0] = the first finger.

// If the user used two fingers, e.touches[1] would be the second finger, and so o
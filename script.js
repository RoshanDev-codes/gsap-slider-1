const slideData = [
  {
    title: "Lost Whisper",
    image: "./images/slide-1-new.jpg",
  },
  {
    title: "Light Tension",
    image: "./images/slide-2-new.jpg",
  },
  {
    title: "Dim Elegance",
    image: "./images/slide-3-new.jpg",
  },
  {
    title: "Urban Dream",
    image: "./images/slide-4-new.jpg",
  },
  {
    title: "Soft Dusk",
    image: "./images/slide-5-new.jpg",
  },
];

const containery = document.querySelector(".containery");
const slider = document.querySelector(".slider");

let frontSlideIndex = 0;
let isSlideAnimating = false;

function initializeSlider() {
  slideData.forEach((slide, index) => {
    const slides = document.createElement("div");
    slides.className =
      "slide h-[400px] absolute w-1/2 top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md";
    slides.innerHTML = ` <img
            src="${slide.image}"
            alt="${slide.title}"
            class="absolute top-0 left-0 size-full object-cover"
          />

          <div class="relative size-full z-10 flex items-center justify-center">
            <h1 class="text-[4rem] slide-title tracking-wide text-base-100 translate-y-4">
            ${slide.title}
            </h1>
          </div>`;

    slider.appendChild(slides);
  });

  let slides = document.querySelectorAll(".slide");

  slides.forEach((slide, index) => {
    gsap.set(slide, {
      y: -15 + 15 * index + "%",
      z: 15 * index,
      opacity: 1,
    });

    let title = slide.querySelectorAll(".slide-title");
    new SplitText(title, {
      type: "words",
      mask: "words",
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initializeSlider();
});

let wheelAccumulator = 0;
let wheelThreShold = 100;
let isWheelActive = false;

containery.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();

    if (isSlideAnimating || isWheelActive) return;

    wheelAccumulator += Math.floor(Math.abs(e.deltaY));

    if (wheelAccumulator > wheelThreShold) {
      wheelAccumulator = 0;
      isWheelActive = true;

      const direction = e.deltaY > 0 ? "down" : "up";
      handleSlideChange(direction);
    }

    setTimeout(() => {
      isWheelActive = false;
    }, 1200);
  },
  {
    passive: false,
  }
);

let isTouchActive = false;
let touchStartX = 0;
let touchStartY = 0;
let touchThreShold = 50;

containery.addEventListener(
  "touchstart",
  function (e) {
    if (isSlideAnimating || isTouchActive) return;

    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  },
  {
    passive: true,
  }
);

containery.addEventListener(
  "touchend",
  function (e) {
    if (isSlideAnimating || isTouchActive) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;

    let positiveDeltaX = Math.floor(Math.abs(deltaX));
    let positiveDeltaY = Math.floor(Math.abs(deltaY));

    console.log(deltaY);

    if (positiveDeltaY > touchThreShold && positiveDeltaY > positiveDeltaX) {
      isTouchActive = true;
      console.log(isTouchActive);

      const direction = deltaY > 0 ? "down" : "up";
      handleSlideChange(direction);
    }

    setTimeout(() => {
      isTouchActive = false;
    }, 1200);
  },
  {
    passive: true,
  }
);

function handleSlideChange(direction) {
  if (isSlideAnimating) return;

  isSlideAnimating = true;

  if (direction === "down") {
    handleScrollDown();
  } else {
    handleScrollUp();
  }
}

function handleScrollDown() {
  let slides = document.querySelectorAll(".slide");

  const firstSlide = slides[0];

  frontSlideIndex = (frontSlideIndex + 1) % slideData.length;
  let backIndex = (frontSlideIndex + 4) % slideData.length;

  let newSlideData = slideData[backIndex];

  const newSlide = document.createElement("div");

  newSlide.className =
    "slide h-[400px] absolute w-1/2 top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md";
  newSlide.innerHTML = `<img
            src="${newSlideData.image}"
            alt="${newSlideData.title}"
            class="absolute top-0 left-0 size-full object-cover"
          />

          <div class="relative size-full z-10 flex items-center justify-center">
            <h1 class="text-[4rem] slide-title tracking-wide text-base-100 translate-y-4">
            ${newSlideData.title}
            </h1>
          </div>`;

  slider.appendChild(newSlide);

  gsap.set(newSlide, {
    y: -15 + 15 * 5 + "%",
    z: 15 * 5,
    opacity: 0,
  });

  const newTitle = newSlide.querySelector(".slide-title");

  const newSplit = new SplitText(newTitle, {
    type: "words",
    mask: "words",
  });

  gsap.set(newSplit.words, {
    yPercent: 100,
  });

  let allSlides = document.querySelectorAll(".slide");

  allSlides.forEach((slide, index) => {
    let targetPosition = index - 1;

    gsap.to(slide, {
      y: -15 + 15 * targetPosition + "%",
      z: 15 * targetPosition,
      ease: "power3.inOut",
      duration: 1,
      opacity: targetPosition < 0 ? 0 : 1,
      onComplete: () => {
        if (index === 0) {
          firstSlide.remove();
          isSlideAnimating = false;
        }
      },
    });

    gsap.to(newSplit.words, {
      yPercent: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.5,
    });
  });
}

function handleScrollUp() {
  let slides = document.querySelectorAll(".slide");

  let lastSlide = slides[slideData.length - 1];

  frontSlideIndex = (frontSlideIndex - 1 + slideData.length) % slideData.length;

  let prevSlideData = slideData[frontSlideIndex];

  const newSlide = document.createElement("div");

  newSlide.className =
    "slide h-[400px] absolute w-1/2 top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md";

  newSlide.innerHTML = `<img
            src="${prevSlideData.image}"
            alt="${prevSlideData.title}"
            class="absolute top-0 left-0 size-full object-cover"
          />

          <div class="relative size-full z-10 flex items-center justify-center">
            <h1 class="text-[4rem] slide-title tracking-wide text-base-100 translate-y-4">
            ${prevSlideData.title}
            </h1>
          </div>`;

  slider.prepend(newSlide);

  gsap.set(newSlide, {
    y: -15 + 15 * -1 + "%",
    z: 15 * -1,
    opacity: 0,
  });

  let allSlides = document.querySelectorAll(".slide");
  allSlides.forEach((slide, i) => {
    let targetPosition = i;

    gsap.to(slide, {
      y: -15 + 15 * targetPosition + "%",
      z: 15 * targetPosition,
      ease: "power3.inOut",
      duration: 1,
      opacity: targetPosition > 4 ? 0 : 1,
      onComplete: () => {
        if (i === slideData.length - 1) {
          lastSlide.remove();
          isSlideAnimating = false;
        }
      },
    });
  });

  const frontSlide = slider.querySelectorAll(".slide")[4];
  const frontTitle = frontSlide.querySelector(".slide-title");

  const newSplit = new SplitText(frontTitle, {
    type: "words",
    mask: "words",
  });

  gsap.set(newSplit.words, {
    yPercent: -100,
  });

  gsap.to(newSplit.words, {
    yPercent: 0,
    duration: 0.8,
    ease: "power4.Out",
    stagger: 0.15,
    delay: 0.5,
  });
}

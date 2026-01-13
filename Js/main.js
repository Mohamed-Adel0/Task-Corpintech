let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let slide = document.querySelector(".slide");

let intervalTime = 8000;
let interval;

// Here is Related to Auto Slide
function automatical() {
  let items = document.querySelectorAll(".item");
  slide.appendChild(items[0]);
}

// Here is Related to Start Auto
function startAuto() {
  stopAuto(); // Here to Avoid Multiple Intervals
  interval = setInterval(automatical, intervalTime);
}

// Here is Related to Stop Auto
function stopAuto() {
  clearInterval(interval);
}
next.addEventListener("click", () => {
  let items = document.querySelectorAll(".item");
  slide.appendChild(items[0]);
});

// Here is Related to Previous Slide
prev.addEventListener("click", () => {
  let items = document.querySelectorAll(".item");
  slide.prepend(items[items.length - 1]);
});

//here to Stop Auto on Mouse Enter and Start Auto on Mouse Leave
[next, prev].forEach((el) => {
  el.addEventListener("mouseenter", stopAuto);
  el.addEventListener("mouseleave", startAuto);
});

// Start the Auto Slide
startAuto();
// End of Auto Slide
// Here is for Video Control
document.addEventListener("DOMContentLoaded", () => {
  const videos = document.querySelectorAll(".myVideo");
  const buttons = document.querySelectorAll(".playBtn");
  // Ensure equal number of videos and buttons
  // if(videos.length !== buttons.length) {
  //   console.error('Mismatch between number of videos and buttons');
  //   return;
  // }
  videos.forEach((video, index) => {
    const btn = buttons[index];
    video.autoplay = false;

    btn.addEventListener("click", () => {
      video.play();
    });

    video.addEventListener("play", () => {
      btn.style.display = "none";
    });

    video.addEventListener("pause", () => {
      btn.style.display = "flex";
    });

    video.addEventListener("ended", () => {
      btn.style.display = "flex";
    });
  });
});
// End of Video Control
// Here is for Services Cards Append from JS
let itemsService = [
  {
    id: 1,
    img: "./Pictures/img5s.gif",
    title: "Event Coverage & Live Streaming",
    desc: "We bring your events to life, both on-site and online. Offering comprehensive coverage for conferences, exhibitions, and corporate or private events, with professional live streaming on social media platforms, delivering superior audio-visual quality.",
  },
  {
    id: 2,
    img: "./Pictures/img2.jpeg",
    title: "Media Production",
    desc: "We produce all types of visual content, including commercial and promotional videos, corporate films, product videos, as well as professional photography services, tailored to suit all digital platforms and marketing needs.",
  },
  {
    id: 3,
    img: "./Pictures/img3.jpeg",
    title: "Digital Content",
    desc: "We execute and elevate digital content with cinematic precision: Social Media Content, Reels, TikTok, Stories, YouTube & Podcast Production. ",
  },
  {
    id: 4,
    img: "./Pictures/img4.jpeg",
    title: "Equipment Rental",
    desc: " We provide media agencies  and content creators with state-of-the-art gear from cameras and lighting tools to professional accessories. Flexible rental options available for short-term or full-scale productions.",
  },
];
const appendServiceCards = () => {
  let servicesCard = ``;
  for (let i = 0; i < itemsService.length; i++) {
    servicesCard += `
     <div class="card">
          <div class="image">
            <img src="${itemsService[i].img}" alt="${itemsService[i].title}" />
          </div>
            <div class="content">
              <h2>
                ${itemsService[i].title}
              </h2>
              <p>
               ${itemsService[i].desc}
              </p>
            </div>
          </div>
    `;
  }

  document.getElementById("servicesCards").innerHTML = servicesCard;
};
appendServiceCards();
// End of Services Cards Append from JS

// Here is for Carousel JS Client Testimonials
const containers = document.querySelectorAll(".clients-logos");

containers.forEach((container) => {
  const carousel = container.querySelector(".carousel");
  const arrowBtns = container.querySelectorAll("button");
  const carouselChildrens = [...carousel.children];

  let isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;

  const firstCardWidth = carousel.querySelector(".card").offsetWidth;

  // Get the number of cards that can fit in the carousel at once
  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  // Insert copies of the last few cards to beginning of carousel
  carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  // Insert copies of the first few cards to end of carousel
  carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  // Hide duplicate cards
  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");

  // Arrow buttons
  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft +=
        btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
  });

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    } else if (
      Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - carousel.offsetWidth
    ) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!container.matches(":hover")) autoPlay();
  };

  const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return;
    timeoutId = setTimeout(() => {
      carousel.scrollLeft += firstCardWidth;
    }, 2500);
  };

  autoPlay();

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  container.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  container.addEventListener("mouseleave", autoPlay);
});
// End of Carousel JS Client Testimonials

// Here is for Open and Close Tab Functionality
const openBtn = document.getElementById("openBtn");
const tab = document.getElementById("tabContent");
const closeBtn = document.getElementById("closeBtn");

// Open Tab Functionality
openBtn.addEventListener("click", () => {
  // Show the tab with animation
  tab.style.right = "2%";
  tab.style.left = "80%";
  openBtn.style.display = "none";
});

// Close Tab Functionality
closeBtn.addEventListener("click", () => {
  tab.style.right = "-10%";
  tab.style.left = "120%";
  openBtn.style.display = "flex";
});

// Here Related By OnClick NavBar-Meno
// const nav = 
document.getElementById("menu").addEventListener("click", () => {
  const nav = document.getElementById("nav");

  if (nav.style.display === "flex") {
    nav.style.display = "none";
  } else {
    nav.style.display = "flex";
  }
});

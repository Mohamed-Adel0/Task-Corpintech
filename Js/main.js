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
[next, prev].forEach(el => {
  el.addEventListener("mouseenter", stopAuto);
  el.addEventListener("mouseleave", startAuto);
});

// Start the Auto Slide
startAuto();
// End of Auto Slide
// Here is for Video Control
 document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.myVideo');
  const buttons = document.querySelectorAll('.playBtn');
// Ensure equal number of videos and buttons
  // if(videos.length !== buttons.length) {
  //   console.error('Mismatch between number of videos and buttons');
  //   return;
  // }
  videos.forEach((video, index) => {
    const btn = buttons[index];
    video.autoplay = false;

    btn.addEventListener('click', () => {
      video.play();
    });

    video.addEventListener('play', () => {
      btn.style.display = 'none';
    });

    video.addEventListener('pause', () => {
      btn.style.display = 'flex';
    });

    video.addEventListener('ended', () => {
      btn.style.display = 'flex';
    });
  });
});
// End of Video Control

let itemsService =[
  {
    id :1,
    img: "./Pictures/img5s.gif",
    title: "Event Coverage & Live Streaming",
    desc: "We bring your events to life, both on-site and online. Offering comprehensive coverage for conferences, exhibitions, and corporate or private events, with professional live streaming on social media platforms, delivering superior audio-visual quality."
  },
  {
    id :2,
    img: "./Pictures/img2.jpeg",
    title: "Media Production",
    desc: "We produce all types of visual content, including commercial and promotional videos, corporate films, product videos, as well as professional photography services, tailored to suit all digital platforms and marketing needs."
  },
  {
    id :3,
    img: "./Pictures/img3.jpeg",
    title: "Digital Content",
    desc: "We execute and elevate digital content with cinematic precision: Social Media Content, Reels, TikTok, Stories, YouTube & Podcast Production. "
  },
  {
    id :4,
    img: "./Pictures/img4.jpeg",
    title: "Equipment Rental",
    desc: " We provide media agencies  and content creators with state-of-the-art gear from cameras and lighting tools to professional accessories. Flexible rental options available for short-term or full-scale productions."
  },
]
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
  };

  document.getElementById("servicesCards").innerHTML = servicesCard;
}
appendServiceCards();
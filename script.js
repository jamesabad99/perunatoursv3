document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    loop: true,
    slidesPerView: 1,
    spaceBetween: 64,
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev",
    },
    breakpoints: {
      // when window width is >= 320px
      992: {
        slidesPerView: 2,
        spaceBetween: 64,
      },
    },
  });
});

const pageWrapper = document.getElementById("page-wrapper");
const time = 0.75;
const tl = gsap.timeline();
pageWrapper.classList.add("is-loading");

tl.to(".preloader_line", { width: "100%", duration: time, ease: "expo.inOut" });

tl.to(".preloader_logo-wrapper", {
  height: "auto",
  duration: time,
  ease: "expo.inOut",
});
tl.to(
  ".preloader_text-wrapper",
  { height: "auto", duration: time, ease: "expo.inOut" },
  "<",
);

tl.to(".preloader_logo-wrapper", {
  height: "0rem",
  duration: time,
  ease: "expo.inOut",
});
tl.to(
  ".preloader_text-wrapper",
  { height: "0rem", duration: time, ease: "expo.inOut" },
  "<",
);
tl.to(".preloader_line", { width: "0%", duration: time, ease: "expo.inOut" });

tl.to(".preloader_item", {
  y: "100%",
  stagger: { amount: 0.5 },
  ease: "expo.inOut",
  onComplete: () => {
    pageWrapper.classList.remove("is-loading");
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
  },
});

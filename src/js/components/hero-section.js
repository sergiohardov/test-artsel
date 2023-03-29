import { heroSlider } from "./sliders.js";

const sectionSlider = (sectionClass, slideClass) => {
  const section = document.querySelector(sectionClass);
  const slides = section.querySelectorAll(slideClass);
  const container = slides[0].parentElement;
  const sliderContainer = document.createElement("div");
  const sliderWrapper = document.createElement("div");
  const sliderDots = document.createElement("div");

  sliderContainer.classList.add("swiper-container");
  sliderWrapper.classList.add("swiper-wrapper");
  sliderDots.classList.add("swiper-pagination");
  sliderContainer.append(sliderWrapper);
  sliderContainer.append(sliderDots);

  let slider = null;

  function toggleSlider(active) {
    if (active) {
      slides.forEach((slide) => {
        slide.classList.add("swiper-slide");
      });
      container.append(sliderContainer);
      sliderWrapper.append(...slides);
      slider = heroSlider(sectionClass + " .swiper-container");
      slider.init();
    } else {
      if (slider) slider.destroy();
      slides.forEach((slide) => {
        slide.classList.remove("swiper-slide");
      });
      container.innerHTML = "";
      container.append(...slides);
    }
  }

  let flag = window.innerWidth < 1200;
  let count = slides.length > 2;

  if (count) {
    toggleSlider(flag);

    window.addEventListener("resize", () => {
      if (window.innerWidth < 1200 && flag) {
        toggleSlider(flag);
        flag = false;
      }

      if (window.innerWidth >= 1200 && !flag) {
        toggleSlider(flag);
        flag = true;
      }
    });
  }
};

export default {
  sectionSlider,
};

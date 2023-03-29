// Базовый файл скриптов, входящий.
import { isWebp } from "./modules/functions.js";
import heroSection from "./components/hero-section.js";

// Проверка на WebP
isWebp();

// HeroSection
heroSection.sectionSlider(".hero-section", ".member-card");

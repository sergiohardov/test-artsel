// Базовый файл скриптов, входящий.
import { isWebp } from "./modules/functions.js";
import heroSection from "./components/hero-section.js";
import { contactForm } from "./components/contacts.js";

// Проверка на WebP
isWebp();

// HeroSection
heroSection.sectionSlider(".hero-section", ".member-card", 1200);

// ContactSection
contactForm(".contact-form");

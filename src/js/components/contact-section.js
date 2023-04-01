import ContactForm from "../modules/ContactForm.js";

const contactForm = new ContactForm({
  formId: "about-section-form",
  captcha: {
    id: "about-section-form-captcha",
    key: "6LdZ8EYlAAAAAKOPykM1rgBg4oeAjoXMY8KlnPFg",
  },
  submitId: "about-section-form-submit",
  fields: {
    fullname: "form_fullname",
    email: "form_email",
    message: "form_message",
  },
});

export default function () {}

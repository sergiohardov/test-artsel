export function contactForm(className) {

  const form = {
    container: document.querySelector(className),
    submit: document.querySelector(className + " .contact-form__submit"),
    inputs: {},
    errors: {},
    validName(input) {
      const regex = /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+$/;
      const errmsg = input.parentElement.querySelector(".contact-form__error");

      if (!input.value.match(regex)) {
        console.log("Проблема имя");

        errmsg.classList.add("active");
        input.classList.remove("success");
        input.classList.add("error");
        this.errors.form_name = true;

        return false;
      } else {
        console.log("Имя ок");

        errmsg.classList.remove("active");
        input.classList.remove("error");
        input.classList.add("success");
        this.errors.form_name = false;

        return true;
      }
    },
    validEmail(input) {
      const check = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
      const errmsg = input.parentElement.querySelector(".contact-form__error");

      if (check) {
        console.log("Емейл ок");

        errmsg.classList.remove("active");
        input.classList.remove("error");
        input.classList.add("success");
        this.errors.form_email = false;

        return true;
      } else {
        console.log("Проблема емайл");

        errmsg.classList.add("active");
        input.classList.remove("success");
        input.classList.add("error");
        this.errors.form_email = true;

        return false;
      }
    },
    validMessage(input) {
      const errmsg = input.parentElement.querySelector(".contact-form__error");

      if (input.value.length < 5) {
        console.log("Проблема message");

        errmsg.classList.add("active");
        input.classList.remove("success");
        input.classList.add("error");
        this.errors.form_message = true;

        return false;
      } else {
        console.log("message ok");

        errmsg.classList.remove("active");
        input.classList.remove("error");
        input.classList.add("success");
        this.errors.form_message = false;

        return true;
      }
    },
    validForm() {
      this.validName(this.inputs.form_name);
      this.validEmail(this.inputs.form_email);
      this.validMessage(this.inputs.form_message);

      if (!this.errors.form_name && !this.errors.form_email && !this.errors.form_message) {
        console.log("Форма ок");
        this.submit.removeAttribute("disabled");
        return true;
      } else {
        console.log("форма не ок");
        this.submit.setAttribute("disabled", "");
        return false;
      }
    },
  };

  form.container.querySelectorAll("input, textarea").forEach((input) => {
    form.inputs[input.name] = input;
    form.errors[input.name] = true;
  });
  form.inputs.form_name.addEventListener("change", (e) => {
    form.validName(form.inputs.form_name);
    form.validForm();
  });
  form.inputs.form_email.addEventListener("change", (e) => {
    form.validEmail(form.inputs.form_email);
    form.validForm();
  });
  form.inputs.form_message.addEventListener("change", (e) => {
    form.validMessage(form.inputs.form_message);
    form.validForm();
  });

}

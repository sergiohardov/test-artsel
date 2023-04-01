export default class ContactForm {
  constructor(options) {
    this.$formId = document.getElementById(options.formId);
    this.captchaId = options.captcha.id;
    this.captchaKey = options.captcha.key;
    this.captchaWidget = null;
    this.$submitId = document.getElementById(options.submitId);
    this.fields = options.fields;
    this.inputs = [];

    this.errorFields = [];
    this.hasEvent = false;

    this.#events();
    this.#captcha();
  }

  // Хелперы
  #addError(nameField) {
    if (this.errorFields.indexOf(nameField) === -1) {
      this.errorFields.push(nameField);
    }
  }
  #removeError(nameField) {
    if (this.errorFields.indexOf(nameField) !== -1) {
      this.errorFields.splice(this.errorFields.indexOf(nameField), 1);
    }
  }
  #showError(input) {
    const msgEl = input.parentElement.querySelector(".contact-form__error");
    msgEl.classList.add("active");
  }
  #hideError(input) {
    const msgEl = input.parentElement.querySelector(".contact-form__error");
    msgEl.classList.remove("active");
  }

  // Валидаторы
  #validName(input, nameField) {
    const regex = /^[a-zA-Zа-яА-Я]+\s[a-zA-Zа-яА-Я]+$/;
    if (!input.value.match(regex)) {
      this.#addError(nameField);
      input.classList.remove("success");
      input.classList.add("error");
      this.#showError(input);
    } else {
      this.#removeError(nameField);
      input.classList.remove("error");
      input.classList.add("success");
      this.#hideError(input);
    }
  }
  #validEmail(input, nameField) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
    if (!regex) {
      this.#addError(nameField);
      input.classList.remove("success");
      input.classList.add("error");
      this.#showError(input);
    } else {
      this.#removeError(nameField);
      input.classList.remove("error");
      input.classList.add("success");
      this.#hideError(input);
    }
  }
  #validMessage(input, nameField) {
    if (input.value.length < 5) {
      this.#addError(nameField);
      input.classList.remove("success");
      input.classList.add("error");
      this.#showError(input);
    } else {
      this.#removeError(nameField);
      input.classList.remove("error");
      input.classList.add("success");
      this.#hideError(input);
    }
  }
  #validFields() {
    if (this.errorFields.length === 0) {
      console.log("all clear");
      this.$submitId.removeAttribute("disabled");

      if (!this.hasEvent) {
        this.$submitId.addEventListener("click", this.#sendMessage);
        this.hasEvent = true;
      }
    } else {
      console.log("problem");
      this.$submitId.setAttribute("disabled", "");

      if (this.hasEvent) {
        this.$submitId.removeEventListener("click", this.#sendMessage);
        this.hasEvent = false;
      }
    }
  }
  #validCaptcha(captchaId) {
    const captcha = grecaptcha.getResponse(captchaId);

    if (captcha === "") {
      this.#showError(document.getElementById(this.captchaId));
      return false;
    } else {
      this.#hideError(document.getElementById(this.captchaId));
      return true;
    }
  }

  // Отправка
  #sendMessage = (e) => {
    e.preventDefault();

    if (!this.#validCaptcha(this.captchaWidget)) {
      console.log("Капча не заполнена");
    } else {
      const textButton = this.$submitId.innerHTML;
      this.$submitId.innerHTML = "Loading...";

      const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
      const url = "https://artsel.thelookway.com/recaptcha.php";
      const data = this.inputs.reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc;
      }, {});

      data.captcha = grecaptcha.getResponse(this.captchaWidget);
      console.log(data);

      fetch(corsAnywhereUrl + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          this.$submitId.innerHTML = textButton;
          if (data.success) {
            this.#resetForm();
            console.log(data);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  // Сброс формы
  #resetForm() {
    this.inputs.forEach((input) => {
      input.value = "";
    });
    Array.from(Object.keys(this.fields)).forEach((field) => {
      this.#addError(field);
    });
    this.#validFields();
    console.log(this.errorFields);
  }

  // Рендер капчи
  #captcha() {
    window.onload = () => {
      this.captchaWidget = grecaptcha.render(this.captchaId, {
        sitekey: this.captchaKey,
      });
    };
  }

  // События
  #events() {
    Array.from(Object.keys(this.fields)).forEach((field) => {
      let el = this.$formId.querySelector(`[name="${this.fields[field]}"]`);
      this.inputs.push(el);
      this.errorFields.push(field);

      if (field === "fullname") {
        el.addEventListener("input", () => {
          this.#validName(el, field);
          this.#validFields();
          console.log(this.errorFields);
        });
      } else if (field === "email") {
        el.addEventListener("input", () => {
          this.#validEmail(el, field);
          this.#validFields();
          console.log(this.errorFields);
        });
      } else if (field === "message") {
        el.addEventListener("input", () => {
          this.#validMessage(el, field);
          this.#validFields();
          console.log(this.errorFields);
        });
      }
    });
  }
}

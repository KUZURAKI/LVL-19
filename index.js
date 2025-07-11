document.addEventListener("DOMContentLoaded", function () {
  const phoneInput = document.getElementById("phone");

  phoneInput.addEventListener("focus", function () {
    if (!this.value.startsWith("+7")) {
      this.value = "+7";
    }
  });

  phoneInput.addEventListener("input", function (e) {
    const cursorPosition = this.selectionStart;

    let cleaned = this.value.replace(/\D/g, "");

    if (cleaned.startsWith("7") && !cleaned.startsWith("+7")) {
      cleaned = "7" + cleaned.substring(1);
    } else if (!cleaned.startsWith("7")) {
      cleaned = "7" + cleaned;
    }

    let formatted = "+7";

    if (cleaned.length > 1) {
      const rest = cleaned.substring(1);
      let match;

      if (rest.length <= 3) {
        formatted += ` (${rest}`;
      } else if (rest.length <= 6) {
        formatted += ` (${rest.substring(0, 3)}) ${rest.substring(3)}`;
      } else if (rest.length <= 8) {
        formatted += ` (${rest.substring(0, 3)}) ${rest.substring(
          3,
          6
        )}-${rest.substring(6)}`;
      } else {
        formatted += ` (${rest.substring(0, 3)}) ${rest.substring(
          3,
          6
        )}-${rest.substring(6, 8)}-${rest.substring(8, 10)}`;
      }
    }

    this.value = formatted;

    if (e.inputType === "deleteContentBackward") {
      this.setSelectionRange(cursorPosition, cursorPosition);
    } else {
      this.setSelectionRange(this.value.length, this.value.length);
    }
  });

  const emailInput = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  emailInput.addEventListener("blur", function () {
    if (!emailRegex.test(this.value)) {
      this.setCustomValidity("Пожалуйста, введите корректный email адрес");
      this.reportValidity();
    } else {
      this.setCustomValidity("");
    }
  });

  const fullNameInput = document.getElementById("full_name");

  fullNameInput.addEventListener("blur", function () {
    const value = this.value.trim();
    const words = value.split(/\s+/).filter((word) => word.length > 0);

    if (words.length < 3) {
      this.setCustomValidity(
        "Пожалуйста, введите Фамилию, Имя и Отчество (3 слова)"
      );
      this.reportValidity();
    } else {
      this.setCustomValidity("");
    }
  });

  const togglePasswordButtons = document.querySelectorAll(".togglePassword");
  togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const input = this.parentElement.querySelector("input");
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    });
  });

  emailInput.addEventListener("input", function () {
    if (!emailRegex.test(this.value)) {
      document
        .querySelectorAll("input, textarea, button")
        .forEach((element) => {
          if (element !== emailInput) {
            element.disabled = true;
          }
        });
    } else {
      document
        .querySelectorAll("input, textarea, button")
        .forEach((element) => {
          element.disabled = false;
        });
    }
  });
});

export default class FormValidator {
    constructor(form) {
        this.form = form;
      }
    checkInputValidity(input) {
        const errorMessages = {
            empty: 'Нужно ввести ключевое слово',
            wrongLength: 'Должно быть от 2 до 30 символов'
        };
        input.setCustomValidity("");
        if (input.validity.valueMissing) {
            input.setCustomValidity(errorMessages.empty);
            return false
        }
        if (input.validity.tooShort || input.validity.tooLong) {
            input.setCustomValidity(errorMessages.wrongLength);
            return false
        }
        return input.checkValidity();
    }

    setSubmitButtonState(button, state) {
        if (state) {
            button.removeAttribute('disabled', true);
            // button.classList.add('popup__button_valid');
            // button.classList.remove('popup__button_invalid');
          } else {
            button.setAttribute('disabled', true);
            // button.classList.add('popup__button_invalid');
            // button.classList.remove('popup__button_valid');
          }
    }
    // isFieldValid(input) {
    //     const parent = input.closest('.main__field');
    //     const errorElem = parent.querySelector(`#${input.id}-error`);
    //     console.log(errorElem);
    //     const valid = this.checkInputValidity(input);
    //     errorElem.textContent = input.validationMessage;
    //     return valid;
    //     }

    isFieldValid(input) {
        // const parent = input.closest('.main__field');
        const errorElem = document.getElementById('fieldInput-error');
        // console.log(errorElem);
        const valid = this.checkInputValidity(input);
        errorElem.textContent = input.validationMessage;
        return valid;
        }
    setEventListeners() {
        const submit = this.form.querySelector('.main__field-button');
        const [...inputs] = this.form.querySelectorAll('input');
        this.form.addEventListener('input', (event) => {
            this.isFieldValid(event.target);
            if (inputs.every(this.checkInputValidity)) {
            this.setSubmitButtonState(submit, true);
            } else {
            this.setSubmitButtonState(submit, false);
            }
        })
    }
}

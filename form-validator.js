/**
 * FormValidator - A flexible form validation library
 * Version 1.0.0
 * Author: Feri Murdeni
 */
class FormValidator {
    constructor(formElement, options = {}) {
        this.form = formElement;
        this.options = {
            errorClass: 'error-message',
            validClass: 'is-valid',
            invalidClass: 'is-invalid',
            ...options
        };
        
        this.validators = {
            required: (value) => value.trim() !== '',
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
            min: (value, min) => value.length >= parseInt(min),
            max: (value, max) => value.length <= parseInt(max),
            minValue: (value, min) => parseFloat(value) >= parseFloat(min),
            maxValue: (value, max) => parseFloat(value) <= parseFloat(max),
            pattern: (value, pattern) => new RegExp(pattern).test(value),
            numeric: (value) => /^\d+$/.test(value),
            phone: (value) => /^[\d\s\-\+\(\)]+$/.test(value),
            url: (value) => {
                try {
                    new URL(value);
                    return true;
                } catch {
                    return false;
                }
            }
        };

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        // Real-time validation on input
        this.form.addEventListener('input', (e) => {
            if (e.target.hasAttribute('data-validate')) {
                this.validateField(e.target);
            }
        });
    }

    validateField(field) {
        const rules = field.getAttribute('data-validate').split(' ');
        const errorContainer = this.getErrorContainer(field);
        let isValid = true;
        let errorMessage = '';

        for (const rule of rules) {
            const [validationType, ...params] = rule.split(':');
            const validatorFn = this.validators[validationType];

            if (validatorFn) {
                const isValidField = validatorFn(field.value, ...params);
                if (!isValidField) {
                    isValid = false;
                    errorMessage = field.getAttribute(`data-${validationType}-message`) || 
                                 this.getDefaultErrorMessage(validationType, params);
                    break;
                }
            }
        }

        this.updateFieldStatus(field, errorContainer, isValid, errorMessage);
        return isValid;
    }

    getErrorContainer(field) {
        let errorContainer = field.nextElementSibling;
        if (!errorContainer || !errorContainer.classList.contains(this.options.errorClass)) {
            errorContainer = document.createElement('div');
            errorContainer.className = this.options.errorClass;
            field.parentNode.insertBefore(errorContainer, field.nextSibling);
        }
        return errorContainer;
    }

    updateFieldStatus(field, errorContainer, isValid, errorMessage) {
        field.classList.remove(this.options.validClass, this.options.invalidClass);
        field.classList.add(isValid ? this.options.validClass : this.options.invalidClass);
        errorContainer.textContent = isValid ? '' : errorMessage;
        errorContainer.style.display = isValid ? 'none' : 'block';
    }

    getDefaultErrorMessage(validationType, params) {
        const messages = {
            required: 'This field is required',
            email: 'Please enter a valid email address',
            min: `Minimum length is ${params[0]} characters`,
            max: `Maximum length is ${params[0]} characters`,
            minValue: `Minimum value is ${params[0]}`,
            maxValue: `Maximum value is ${params[0]}`,
            pattern: 'Please match the requested format',
            numeric: 'Please enter numbers only',
            phone: 'Please enter a valid phone number',
            url: 'Please enter a valid URL'
        };
        return messages[validationType] || 'Invalid input';
    }

    handleSubmit(e) {
        e.preventDefault();
        const fields = this.form.querySelectorAll('[data-validate]');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid && typeof this.options.onSuccess === 'function') {
            this.options.onSuccess(this.form);
        } else if (!isFormValid && typeof this.options.onError === 'function') {
            this.options.onError(this.form);
        }

        return isFormValid;
    }
}

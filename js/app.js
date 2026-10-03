function isValidStudentNumber(value) {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  const studentNumRegex = /^\d{2}-\d{4}-\d{3}$/;
  return studentNumRegex.test(trimmed);
}

function isValidPassword(value) {
  if (typeof value !== 'string') return false;
  // Check no whitespace
  if (/\s/.test(value)) return false;
  // Check length >= 8
  if (value.length < 8) return false;
  // Check at least one uppercase letter
  if (!/[A-Z]/.test(value)) return false;
  // Check at least one digit
  if (!/\d/.test(value)) return false;
  // Check at least one of @, $, or !
  if (!/[@$!]/.test(value)) return false;

  return true;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isValidStudentNumber,
    isValidPassword
  };
}

// Browser DOM Interaction Logic
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const fullName = document.getElementById('fullName');
    const studentNumber = document.getElementById('studentNumber');
    const email = document.getElementById('email');
    const mobileNumber = document.getElementById('mobileNumber');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const course = document.getElementById('course');
    const terms = document.getElementById('terms');

    // Error & Feedback Elements
    const fullNameError = document.getElementById('fullNameError');
    const studentNumberError = document.getElementById('studentNumberError');
    const emailError = document.getElementById('emailError');
    const mobileNumberError = document.getElementById('mobileNumberError');
    const passwordError = document.getElementById('passwordError');
    const passwordFeedback = document.getElementById('passwordFeedback');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const courseError = document.getElementById('courseError');
    const termsError = document.getElementById('termsError');

    // Output Summary Elements
    const successMessage = document.getElementById('successMessage');
    const registrationSummary = document.getElementById('registrationSummary');
    const summaryName = document.getElementById('summaryName');
    const summaryStudentNumber = document.getElementById('summaryStudentNumber');
    const summaryEmail = document.getElementById('summaryEmail');
    const summaryMobileNumber = document.getElementById('summaryMobileNumber');
    const summaryCourse = document.getElementById('summaryCourse');

    // Utility helper to clear error states
    function clearError(field, errorEl) {
      errorEl.textContent = '';
      field.setAttribute('aria-invalid', 'false');
    }

    // Utility helper to set error states
    function setError(field, errorEl, message) {
      errorEl.textContent = message;
      field.setAttribute('aria-invalid', 'true');
    }

    // Individual Validation Checkers
    function validateFullName() {
      const trimmed = fullName.value.trim();
      if (trimmed.length < 2) {
        setError(fullName, fullNameError, 'Full name must be at least 2 characters long.');
        return false;
      }
      clearError(fullName, fullNameError);
      return true;
    }

    function validateStudentNumber() {
      if (!isValidStudentNumber(studentNumber.value)) {
        setError(studentNumber, studentNumberError, 'Enter a student number in the format 24-1234-123.');
        return false;
      }
      clearError(studentNumber, studentNumberError);
      return true;
    }

    function validateEmail() {
      const trimmed = email.value.trim();
      // Simplified email pattern: text before @, domain with a dot, text after dot; no whitespace
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        setError(email, emailError, 'Enter a valid email address.');
        return false;
      }
      clearError(email, emailError);
      return true;
    }

    function validateMobileNumber() {
      const trimmed = mobileNumber.value.trim();
      // Accepts 09XXXXXXXXX or +639XXXXXXXXX (11 or 13 digits)
      const mobileRegex = /^(09|\+639)\d{9}$/;
      if (!mobileRegex.test(trimmed)) {
        setError(mobileNumber, mobileNumberError, 'Enter a valid mobile number (e.g., 09123456789 or +639123456789).');
        return false;
      }
      clearError(mobileNumber, mobileNumberError);
      return true;
    }

    function validatePassword() {
      if (!isValidPassword(password.value)) {
        setError(password, passwordError, 'Password must be at least 8 characters, include 1 uppercase, 1 digit, 1 special character (@, $, !), and no spaces.');
        return false;
      }
      clearError(password, passwordError);
      return true;
    }

    function validateConfirmPassword() {
      if (!confirmPassword.value || confirmPassword.value !== password.value) {
        setError(confirmPassword, confirmPasswordError, 'Passwords do not match.');
        return false;
      }
      clearError(confirmPassword, confirmPasswordError);
      return true;
    }

    function validateCourse() {
      if (course.value !== 'BSIT' && course.value !== 'BSCS') {
        setError(course, courseError, 'Please select a valid course (BSIT or BSCS).');
        return false;
      }
      clearError(course, courseError);
      return true;
    }

    function validateTerms() {
      if (!terms.checked) {
        setError(terms, termsError, 'You must agree to the terms and conditions.');
        return false;
      }
      clearError(terms, termsError);
      return true;
    }

    // Event: Live Password Feedback (input event)
    password.addEventListener('input', () => {
      const val = password.value;
      if (isValidPassword(val)) {
        passwordFeedback.textContent = 'Password meets all requirements.';
        passwordFeedback.style.color = '#28a745';
        clearError(password, passwordError);
      } else {
        passwordFeedback.textContent = 'Requires: 8+ chars, 1 uppercase, 1 digit, 1 symbol (@, $, !), no spaces.';
        passwordFeedback.style.color = '#17a2b8';
      }
    });

    // Event: Full Name Blur Validation
    fullName.addEventListener('blur', validateFullName);

    // Event: Course and Terms Change Feedback
    course.addEventListener('change', validateCourse);
    terms.addEventListener('change', validateTerms);

    // Event: Form Submission
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const isNameValid = validateFullName();
      const isStudentNumValid = validateStudentNumber();
      const isEmailValid = validateEmail();
      const isMobileValid = validateMobileNumber();
      const isPasswordValid = validatePassword();
      const isConfirmPassValid = validateConfirmPassword();
      const isCourseValid = validateCourse();
      const isTermsValid = validateTerms();

      const isFormValid =
        isNameValid &&
        isStudentNumValid &&
        isEmailValid &&
        isMobileValid &&
        isPasswordValid &&
        isConfirmPassValid &&
        isCourseValid &&
        isTermsValid;

      if (isFormValid) {
        // Safe display using textContent
        summaryName.textContent = fullName.value.trim();
        summaryStudentNumber.textContent = studentNumber.value.trim();
        summaryEmail.textContent = email.value.trim();
        summaryMobileNumber.textContent = mobileNumber.value.trim();
        summaryCourse.textContent = course.value;

        successMessage.textContent = 'Registration details validated successfully!';
        registrationSummary.hidden = false;
      } else {
        successMessage.textContent = '';
        registrationSummary.hidden = true;
      }
    });

    // Event: Reset Form
    form.addEventListener('reset', () => {
      // Clear errors
      const errorElements = [
        fullNameError,
        studentNumberError,
        emailError,
        mobileNumberError,
        passwordError,
        confirmPasswordError,
        courseError,
        termsError
      ];
      errorElements.forEach((el) => (el.textContent = ''));

      // Clear aria-invalid attributes
      const inputElements = [fullName, studentNumber, email, mobileNumber, password, confirmPassword, course, terms];
      inputElements.forEach((el) => el.setAttribute('aria-invalid', 'false'));

      // Clear feedback and output text/containers
      passwordFeedback.textContent = '';
      successMessage.textContent = '';
      registrationSummary.hidden = true;

      summaryName.textContent = '';
      summaryStudentNumber.textContent = '';
      summaryEmail.textContent = '';
      summaryMobileNumber.textContent = '';
      summaryCourse.textContent = '';
    });
  });
}

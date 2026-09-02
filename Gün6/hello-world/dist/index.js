const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const usernameError = document.querySelector('#username-error');
const passwordError = document.querySelector('#password-error');
if (loginForm && usernameInput && passwordInput && usernameError && passwordError) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^\+?[\d\s()-]{7,}$/;
        let isValid = true;
        usernameError.textContent = '';
        passwordError.textContent = '';
        if (!emailPattern.test(username) && !phonePattern.test(username)) {
            usernameError.textContent = 'Enter a valid e-mail address or phone number.';
            isValid = false;
        }
        if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters.';
            isValid = false;
        }
        if (isValid) {
            loginForm.submit();
        }
    });
}
export {};
//# sourceMappingURL=index.js.map
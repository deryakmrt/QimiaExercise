const loginForm = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const emailError = document.querySelector('#email-error');
const passwordError = document.querySelector('#password-error');
const loginMessage = document.querySelector('#login-message');
const mockUser = {
    email: 'user@qimia.com',
    password: 'Qimia!80',
};
if (loginForm && emailInput && passwordInput && emailError && passwordError && loginMessage) { // tüm elementlerin varlığını kontrol et
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); //sayfa yenilenmesini engellemek için preventDefault() kullanılır
        const email = emailInput.value.trim(); //trim() ile baştaki ve sondaki boşluklar kaldırılır
        const password = passwordInput.value; //parola boşlukları kaldırılmaz çünkü parola boşluk içerebilir
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //e-posta formatını kontrol etmek için regex patterni
        const passwordRules = [
            { pattern: /.{8,}/, message: 'Parola en az 8 karakter olmalıdır.' },
            { pattern: /[A-Z]/, message: 'Parola büyük harf içermelidir.' },
            { pattern: /[a-z]/, message: 'Parola küçük harf içermelidir.' },
            { pattern: /\d/, message: 'Parola rakam içermelidir.' },
            { pattern: /[^A-Za-z0-9]/, message: 'Parola özel karakter içermelidir.' },
        ];
        let isValid = true;
        emailError.textContent = ''; //hata mesajlarını temizlemek için
        passwordError.textContent = '';
        loginMessage.textContent = '';
        loginMessage.className = 'text-center text-sm min-h-5 mt-4'; //loginMessage'ın className'ini temizlemek için
        if (!emailPattern.test(email)) { //e-posta formatını kontrol
            emailError.textContent = 'Geçerli bir e-posta adresi giriniz.';
            isValid = false;
        }
        const failedPasswordRule = passwordRules.find((rule) => !rule.pattern.test(password)); //parola kurallarını kontrol etmek için find() kullanılır, ilk başarısız kural bulunur
        if (failedPasswordRule) {
            passwordError.textContent = failedPasswordRule.message;
            isValid = false;
        }
        if (isValid) {
            if (email !== mockUser.email || password !== mockUser.password) {
                loginMessage.textContent = 'Geçersiz e-posta veya şifre.';
                loginMessage.classList.add('text-red-600');
                return;
            }
            loginMessage.textContent = 'Giriş başarılı✅';
            loginMessage.classList.add('text-green-700');
        }
    });
}
export {};
//# sourceMappingURL=index.js.map
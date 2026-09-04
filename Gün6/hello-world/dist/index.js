const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const usernameError = document.querySelector('#username-error');
const passwordError = document.querySelector('#password-error');
const loginMessage = document.querySelector('#login-message');
if (loginForm && usernameInput && passwordInput && usernameError && passwordError && loginMessage) { // tüm elementlerin varlığını kontrol et
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); //sayfa yenilenmesini engellemek için preventDefault() kullanılır
        const username = usernameInput.value.trim(); //trim() ile baştaki ve sondaki boşluklar kaldırılır
        const password = passwordInput.value; //parola boşlukları kaldırılmaz çünkü parola boşluk içerebilir
        /* const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//e-posta formatını kontrol etmek için regex patterni
        const passwordRules = [
            { pattern: /.{8,}/, message: 'Parola en az 8 karakter olmalıdır.' },
            { pattern: /[A-Z]/, message: 'Parola büyük harf içermelidir.' },
            { pattern: /[a-z]/, message: 'Parola küçük harf içermelidir.' },
            { pattern: /\d/, message: 'Parola rakam içermelidir.' },
            { pattern: /[^A-Za-z0-9]/, message: 'Parola özel karakter içermelidir.' },
        ]; */
        usernameError.textContent = ''; //hata mesajlarını temizlemek için
        passwordError.textContent = '';
        loginMessage.textContent = '';
        loginMessage.className = 'text-center text-sm min-h-5 mt-4'; //loginMessage'ın className'ini temizlemek için
        let isValid = true;
        if (!username) {
            usernameError.textContent = 'Kullanıcı adı giriniz.';
            isValid = false;
        }
        if (password.length < 8) {
            passwordError.textContent = 'Parola en az 8 karakter olmalıdır.';
            isValid = false;
        }
        if (!isValid) {
            return;
        }
        try {
            const response = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    expiresInMins: 30, // optional, defaults to 60
                }),
                credentials: 'include' // Include cookies (e.g., accessToken) in the request
            });
            if (!response.ok) {
                throw new Error('Giriş başarısız');
            }
            const data = (await response.json());
            sessionStorage.setItem('accessToken', data.accessToken);
            sessionStorage.setItem('refreshToken', data.refreshToken);
            loginMessage.textContent = 'Giriş başarılı!';
            loginMessage.classList.add('text-green-600');
        }
        catch {
            loginMessage.textContent = 'Geçersiz kullanıcı adı veya parola.';
            loginMessage.classList.add('text-red-600');
        }
    });
}
export {};
//# sourceMappingURL=index.js.map
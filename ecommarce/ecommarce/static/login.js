
        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const usernameError = document.getElementById('usernameError');
        const passwordError = document.getElementById('passwordError');

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            let isValid = true;

            usernameError.style.display = 'none';
            passwordError.style.display = 'none';

            if(usernameInput.value.trim().length < 3) {
                usernameError.textContent = 'Username must be at least 3 characters';
                usernameError.style.display = 'block';
                isValid = false;
            }

            if(passwordInput.value.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters';
                passwordError.style.display = 'block';
                isValid = false;
            }

            if(!isValid) e.preventDefault();
        });

        usernameInput.addEventListener('input', () => {
            if(usernameInput.value.trim().length >= 3) {
                usernameError.style.display = 'none';
            }
        });

        passwordInput.addEventListener('input', () => {
            if(passwordInput.value.length >= 6) {
                passwordError.style.display = 'none';
            }
        });
    
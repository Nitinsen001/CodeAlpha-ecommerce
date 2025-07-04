
    // <!-- Minimal JavaScript for password match validation -->

        document.getElementById('registerForm').addEventListener('submit', function(e) {
            // Clear previous errors
            document.getElementById('confirmError').style.display = 'none';
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                document.getElementById('confirmError').innerText = "Passwords do not match.";
                document.getElementById('confirmError').style.display = 'block';
                e.preventDefault();
                return false;
            }
            // Allow form to submit to Django backend
        });
    
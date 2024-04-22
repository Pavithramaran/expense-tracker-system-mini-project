document.addEventListener("DOMContentLoaded", function() {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const showRegistrationForm = document.getElementById('showRegistrationForm');
    const showLoginForm = document.getElementById('showLoginForm');

    showRegistrationForm.addEventListener('click', toggleRegistrationForm);
    showLoginForm.addEventListener('click', toggleLoginForm);

    registrationForm.addEventListener('submit', registerUser);
    loginForm.addEventListener('submit', loginUser);

    function toggleRegistrationForm(event) {
        event.preventDefault();
        registrationForm.style.display = 'block';
        loginForm.style.display = 'none';
    }

    function toggleLoginForm(event) {
        event.preventDefault();
        registrationForm.style.display = 'none';
        loginForm.style.display = 'block';
    }

    function registerUser(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (!email || !username || !password) {
            alert('Please enter email, username, and password.');
            return;
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'register.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    alert('Registration successful. Please login.');
                    toggleLoginForm(event);
                } else {
                    alert('Registration failed. Please try again.');
                }
            }
        };
        xhr.send(`email=${email}&username=${username}&password=${password}`);
    }

    function loginUser(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        if (!email || !password) {
            alert('Please enter email and password.');
            return;
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'login.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    alert('Login successful.');
                    window.location.href = 'dashboard.php';
                } else {
                    alert('Login failed. Please check your credentials.');
                }
            }
        };
        xhr.send(`email=${email}&password=${password}`);
    }
});
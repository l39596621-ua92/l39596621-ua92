document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const userInfo = document.getElementById('user-info');
    const authForms = document.getElementById('auth-forms');

    function showUserInfo(name) {
        userInfo.innerHTML = `
            <div class="col-md-12">
                <h4>Welcome, ${name}</h4>
                <button id="logout-button" class="btn btn-danger">Logout</button>
            </div>
        `;
        authForms.style.display = 'none';
        document.getElementById('logout-button').addEventListener('click', function() {
            localStorage.removeItem('user');
            location.reload();
        });
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        showUserInfo(storedUser.name);
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            showUserInfo(storedUser.name);
        } else {
            alert('Invalid email or password. Please try again or register.');
        }
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password === confirmPassword) {
            const user = { name: name, email: email, password: password };
            localStorage.setItem('user', JSON.stringify(user));
            showUserInfo(user.name);
        } else {
            alert('Passwords do not match');
        }
    });
});
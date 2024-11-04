document.getElementById('registration-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            alert('Registration successful! You can now login.');
            window.location.href = 'login.html';
        } else {
            const error = await response.text();
            alert(error);
        }
    } catch (error) {
        console.error(error);
        alert('Error during registration');
    }
});
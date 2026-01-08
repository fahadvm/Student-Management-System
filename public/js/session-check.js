function checkSession() {
    fetch('/user/check-session', { method: 'GET' })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;
            }
        })
        .catch(error => console.error('Error:', error));
}

// Run the check every 30 seconds
setInterval(checkSession, 1000);


function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('forumMessages')) || [];
    const forumMessages = document.getElementById('forum-messages');
    forumMessages.innerHTML = '';
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'forum-message';
        messageDiv.innerHTML = `<strong>${message.name}:</strong> <p>${message.text}</p>`;
        forumMessages.appendChild(messageDiv);
    });
}

document.getElementById('forum-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('forum-name').value;
    const text = document.getElementById('forum-message').value;

    const messages = JSON.parse(localStorage.getItem('forumMessages')) || [];
    messages.push({ name, text });
    localStorage.setItem('forumMessages', JSON.stringify(messages));

    this.reset();
    loadMessages();
});

// Initial load
loadMessages();
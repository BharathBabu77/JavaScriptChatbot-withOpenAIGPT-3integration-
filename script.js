document.addEventListener('DOMContentLoaded', function () {
    const chatContainer = document.getElementById('chatContainer');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');

    function sendMessage() {
        const userMessage = userInput.value.trim();

        if (userMessage === '') {
            return;
        }

        appendMessage('user', userMessage);
        handleBotResponse(userMessage);

        userInput.value = '';
    }

    async function handleBotResponse(userMessage) {
        try {
            const response = await fetch('/api/gpt3', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from NLP API');
            }

            const data = await response.json();
            const botResponse = data.result;

            appendMessage('bot', botResponse);
        } catch (error) {
            console.error('Error handling bot response:', error);
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender === 'bot' ? 'bot-message' : 'user-message');
        messageElement.textContent = message;

        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    window.sendMessage = sendMessage; 
});

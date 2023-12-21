const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/gpt3', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_API_KEY',
            },
            body: JSON.stringify({
                prompt: message,
                max_tokens: 100,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to get response from GPT-3 API');
        }

        const data = await response.json();
        res.json({ result: data.choices[0].text.trim() });
    } catch (error) {
        console.error('Error handling GPT-3 response:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

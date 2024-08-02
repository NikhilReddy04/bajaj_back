const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const fullName = 'Nikhil Reddy Boddu';
const dob = '02062004'; 
const email = 'bb0377@srmist.edu.in'; 
const rollNumber = 'RA2111030010056'; 

function separateData(data) {
    const numbers = [];
    const alphabets = [];
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else {
            alphabets.push(item);
        }
    });
    return { numbers, alphabets };
}

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ is_success: false, error: 'Invalid input' });
    }

    const { numbers, alphabets } = separateData(data);
    const highestAlphabet = alphabets.length ? [alphabets.sort((a, b) => b.localeCompare(a))[0]] : [];

    res.json({
        is_success: true,
        user_id: fullName, 
        email,
        roll_number: rollNumber,
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', (message) => {
        console.log(`Received message => ${message}`);
    });

    ws.send('Hello! Message From Server!!');
});

const PORT = 4000; 
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
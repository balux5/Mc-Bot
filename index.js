const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Koyeb-in botu sönülü hesab etməməsi üçün kiçik veb server
app.get('/', (req, res) => res.send('Bot 7/24 aktivdir!'));
app.listen(process.env.PORT || 3000);

function createBot() {
    const bot = mineflayer.createBot({
        host: 'SERVER_IP.aternos.me', // Bura öz IP-nizi yazın
        port: 25565,
        username: '7_24_Botu',
        version: false
    });

    bot.on('spawn', () => {
        console.log("Bot serverdədir!");
        // Aternosun botu atmaması üçün hər 30 saniyədən bir tullanır
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('end', () => {
        console.log('Bağlantı kəsildi, 5 saniyə sonra yenidən qoşulur...');
        setTimeout(createBot, 5000);
    });

    bot.on('error', (err) => console.log('Xəta:', err));
}

createBot();

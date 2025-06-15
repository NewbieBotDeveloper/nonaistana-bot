// bot/index.js
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config();

import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('NonaIstana aktif Bos! 🔥');
});

app.listen(PORT, () => {
  console.log(`✅ Server jalan di port ${PORT}`);
});


const bot = new Telegraf(process.env.BOT_TOKEN);

// 🎰 Game List Berdasarkan Provider (min 10 per provider)
const gameByProvider = {
  'PRAGMATIC': [
    'Gates of Olympus', 'Starlight Princess', 'Sweet Bonanza', 'Wild West Gold', 'Aztec Gems',
    'Fruit Party', 'Sugar Rush', 'Big Bass Bonanza', 'Power of Thor', 'Madame Destiny Megaways'
  ],
  'HABANERO': [
    'Koi Gate', 'Fa Cai Shen', 'Hot Hot Fruit', '5 Lucky Lions', 'Jump!',
    'Nine Tails', 'Zeus', 'Golden Unicorn', 'Mystic Fortune', 'Presto!'
  ],
  'CQ GAMING': [
    'Golden Eggs', 'Lucky Bingo', 'Fruits Mania', 'Candy Pop', 'Happy Jump',
    'Jungle King', 'Piggy Farm', 'Classic Fruit', 'Sea King', 'Candy Rush'
  ],
  'PG SOFT': [
    'Mahjong Ways 2', 'Fortune Tiger', 'Queen of Bounty', 'Lucky Neko', 'Treasures of Aztec',
    'Leprechaun Riches', 'Phoenix Rises', 'Ways of the Qilin', 'Opera Dynasty', 'Candy Burst'
  ],
  'MIKRO GAMING': [
    'Immortal Romance', 'Thunderstruck II', 'Break Da Bank Again', 'Lucky Leprechaun', 'Mega Moolah',
    'Jurassic Park', 'Avalon', 'Agent Jane Blonde', 'Terminator 2', 'Dragonz'
  ],
  'JOKER': [
    'Yeh Hsien Deluxe', 'Roma', 'Hot Fruits', 'Golden Dragon', 'Lucky God',
    'Ocean King', 'Fire 88', 'Lightning God', 'Dragon Power Flame', 'Panther Moon'
  ],
  'PLAYSTAR': [
    'Lucky Poker 888', 'Fiery Sevens', 'Royal Gold', 'Beauty and the Beast', 'Three Lucky Stars',
    'Money Tree', 'Candy Pop', 'Fortune Fest', 'Samurai Blade', 'Jungle King'
  ],
  'REEL KINGDOM': [
    'Big Bass Bonanza', 'Floating Dragon', 'Return of the Dead', 'Cowboys Gold', 'Christmas Carol Megaways',
    'Big Bass Splash', 'Eye of the Storm', 'Reel Keeper', 'Cash Elevator', 'Chilli Heat Megaways'
  ],
  'NO LIMIT CITY': [
    'Mental', 'Tombstone RIP', 'San Quentin', 'Fire in the Hole', 'Deadwood',
    'True Grit Redemption', 'The Border', 'The Rave', 'Serial', 'xWays Hoarder'
  ],
  'BIG TIME GAMING': [
    'Bonanza', 'Extra Chilli', 'White Rabbit', 'Dragon Born', 'Lil Devil',
    'Danger High Voltage', 'The Final Countdown', 'Queen of Riches', 'Donuts', 'Temple Quest'
  ],
  'RED TIGER': [
    'Dragon\'s Luck', 'Gonzo\'s Quest Megaways', 'Pirates Plenty', 'Mystery Reels', 'Dynamite Riches',
    'Rainbow Jackpots', 'Piggy Riches Megaways', 'Golden Lotus', 'Lucky Easter', 'Reel King Mega'
  ],
  'NET ENT': [
    'Starburst', 'Gonzo\'s Quest', 'Dead or Alive 2', 'Twin Spin', 'Divine Fortune',
    'Jack and the Beanstalk', 'Blood Suckers', 'Fruit Shop', 'Steam Tower', 'Narcos'
  ],
  'FAT PANDA': [
    'Pig Farm', 'Starlight Wins', 'Lucky Mouse', 'Happy Cow Farm', 'Jungle Party',
    'Panda Rush', 'Tiger Fury', 'Candy Piggy', 'Fruit Bomb', 'Happy Garden'
  ],
  '5G GAMING': [
    'Gold Rush', 'Pirate\'s Booty', 'Lucky Gems', 'Galaxy War', 'Burning Hot',
    'Super 7', 'Magic Jungle', 'Tiki Spins', 'Candy Wheel', 'Fruits Kingdom'
  ]
};

// 📢 Auto-kirim tiap 2 jam
cron.schedule('0 */2 * * *', () => {
  let providerList = Object.keys(gameByProvider);
  let randomProvider = providerList[Math.floor(Math.random() * providerList.length)];
  let allGames = gameByProvider[randomProvider];

  // Ambil 3 game acak
  let selectedGames = allGames.sort(() => 0.5 - Math.random()).slice(0, 3);

  let message = `🔥 Rekomendasi Slot Gacor!\n\n🎰 Provider: *${randomProvider}*\n\n`;
  selectedGames.forEach((game, index) => {
    message += `🎮 Game ${index + 1}: ${game}\n`;
  });

  message += `\nMain langsung di:
👉 [XDEWA](https://link99.vip/xdewa)
👉 [IstanaGaming](https://link99.vip/istanagaming)
👉 [IstanaCasino](https://link99.vip/istanacasino)`;

  bot.telegram.sendMessage(process.env.GROUP_ID, message, { parse_mode: 'Markdown' });
});

// 🔁 Auto motivasi & FOMO tiap 30 menit
cron.schedule('*/30 * * * *', () => {
  const quotes = [
    '💬 Yang sabar pasti JP. Yang panik, cuma jadi penonton.',
    '⚠️ JP bukan buat yang banyak nanya... tapi yang cepet klik! 😏',
    '🚀 Jangan nunggu mood dewa… gas dulu, baru hoki nyusul!',
    '🎯 Yang diam-diam biasanya udah maxwin duluan 😎',
    '🧠 Jangan kebanyakan mikir, klik dulu baru tau hasil!',
    '🔥 Zeus kadang PHP, tapi kalo udah ngasih… gak kira-kira!',
    '💥 JP itu bukan dicari, tapi dijemput dengan klik percaya diri!',
    '⏰ Scatter itu suka malam, jangan buru-buru siang!',
    '🎮 Provider diem-diem gacor? Biasanya itu pertanda!',
    '🎲 Spin kecil, sabar besar, JP gede!' 
];
  const random = quotes[Math.floor(Math.random() * quotes.length)];
  bot.telegram.sendMessage(process.env.GROUP_ID, random);
});

// 📣 Bonus Announcement: Selasa & Minggu jam 09:00 pagi
cron.schedule('0 9 * * 2,0', () => {
  const today = new Date();
  const dayName = today.getDay() === 2 ? 'Selasa' : 'Minggu';

  let bonusType = today.getDay() === 2
    ? '💰 Cashback Live Casino & Tembak Ikan'
    : '💰 Rollingan Slot & Tembak Ikan';

  let bonusMessage = `🎉 INFO BONUS ${dayName.toUpperCase()} 🎉\n\n${bonusType} akan dibagikan sekitar jam 12:00 siang.\n\nPastikan Bos sudah memenuhi semua syarat ya.\n\n📌 Promo Lainnya:\n👉 [XDEWA](https://link99.vip/xdewa-promo) | [IstanaGaming](https://link99.vip/ig-promo) | [IstanaCasino](https://link99.vip/ic-promo)`;

  bot.telegram.sendMessage(process.env.GROUP_ID, bonusMessage, { parse_mode: 'Markdown' });
});

// Command Manual
bot.start((ctx) => ctx.reply('Halo Bos! Aku NonaIstana siap bantu JP 🎰\nKetik /pola atau /promo ya~'));

bot.command('pola', (ctx) => {
  ctx.reply(`🔍 *CEK POLA GACOR HARIAN & TOGEL BOS*

🎰 [Lihat Pola Gacor Hari Ini](https://t.me/istanagamingofc/3)
🎯 [Cek Prediksi Togel Hari Ini](https://t.me/istanagamingofc/20)`, { parse_mode: 'Markdown' });
});

bot.command('promo', (ctx) => {
  ctx.reply(`📌 *HOT PROMO TIAP SITUS* 🔥

🟨 *XDEWA*
• Bonus New Member sampai 100%
• Bonus Garansi slot hingga 1jt
• Bonus Rollingan Slot hingga 50 juta  
👉 [Lihat Promo XDEWA](https://link99.vip/xdewa-promo)

🟥 *ISTANACASINO*
• Bonus New Member sampai 100%
• Bonus Garansi slot hingga 1jt
• Bonus Cashback casino 150jt  
👉 [Lihat Promo IstanaCasino](https://link99.vip/ic-promo)

🟦 *ISTANAGAMING*
• Bonus New Member hingga 300rb
• Bonus Rollingan Slot hingga 50 juta
• Bonus Cashback casino 150jt  
👉 [Lihat Promo IstanaGaming](https://link99.vip/ig-promo)`, { parse_mode: 'Markdown' });
});

bot.command('link', (ctx) => {
  ctx.reply(`🔗 *LINK RESMI BOSKU*:

[xdewa](https://link99.vip/xdewa) | [istanagaming](https://link99.vip/istanagaming) | [istanacasino](https://link99.vip/istanacasino)`, { parse_mode: 'Markdown' });
});

// 💳 CARA DEPOSIT
bot.command('caradeposit', (ctx) => {
  ctx.reply(`🎯 *CARA DEPOSIT PALING MUDAH*

1️⃣ Login ke akun Bos  
2️⃣ Klik menu *Deposit*  
3️⃣ Pilih metode: Pulsa, Ewallet, atau Bank  
4️⃣ Tambahkan rekening jika diminta  
5️⃣ Transfer ke nomor tujuan yang tampil  
6️⃣ Isi form deposit → Klik *Request Deposit*  
7️⃣ Selesai! Tinggal tunggu saldo masuk 💸

🚨 *Ingat!* Nomor tujuan bisa berubah. Selalu cek nomor terbaru sebelum transfer ya, Bos!

🔗 Main sekarang di situs favorit Bos:

🟨 [XDEWA](https://link99.vip/xdewa)  
🟦 [ISTANAGAMING](https://link99.vip/istanagaming)  
🟥 [ISTANACASINO](https://link99.vip/istanacasino)

🎰 Semoga hari ini JP terus ya Bos! 🍀`, { parse_mode: 'Markdown' });
});

// 💸 CARA WITHDRAW
bot.command('carawd', (ctx) => {
  ctx.reply(`🎉 *CARA WITHDRAW PALING MUDAH!* 💸

1️⃣ Login ke akun Bos  
2️⃣ Klik menu *Withdraw*  
3️⃣ Pilih tujuan: Ewallet atau Bank  
4️⃣ Masukkan nominal sesuai minimum:  
🔹 ISTANAGAMING: min. 30.000  
🔹 XDEWA & ISTANACASINO: min. 50.000  
(sesuai kelipatan 10.000)  
5️⃣ Isi password → Klik *Kirim* ✅  
6️⃣ Dana langsung diproses, cepet banget!

⚠️ *INGAT YA BOS!*  
Kalau ambil Bonus Depo atau Bonus Harian, pastikan TO sudah tercapai biar WD-nya lancar~

🔗 Langsung gas di situs andalan Bos:

🟨 [XDEWA](https://link99.vip/xdewa)  
🟦 [ISTANAGAMING](https://link99.vip/istanagaming)  
🟥 [ISTANACASINO](https://link99.vip/istanacasino)

💸 Semoga makin sering WD & JP terus ya, Bos! 🍀🔥`, { parse_mode: 'Markdown' });
});

// 📲 CARA DEPOSIT VIA QRIS
bot.command('qris', (ctx) => {
  ctx.reply(`⚙️ *CARA DEPOSIT VIA QRIS – CEPAT & MUDAH!*

1️⃣ Masuk ke menu *Deposit*  
2️⃣ Pilih metode *QRIS* (misal: QRIS HD)  
3️⃣ Masukkan nominal sesuai minimum:  
🔹 ISTANAGAMING: min. 10.000  
🔹 XDEWA: min. 20.000  
🔹 ISTANACASINO: min. 50.000  
4️⃣ Klik *Request Deposit*  
5️⃣ Bayar pakai DANA / OVO / GoPay / M-Banking:  
🔸 Scan QR yang muncul  
🔸 Jangan ubah nominal ya, Bos  
6️⃣ Tunggu beberapa detik → Saldo langsung masuk! ⚡️

⚠️ QR berlaku ± 5 menit  
⚠️ Simpan bukti bayar buat jaga-jaga

🔗 Pilih situs andalan Bos di sini:

🟨 [XDEWA](https://link99.vip/xdewa)  
🟦 [ISTANAGAMING](https://link99.vip/istanagaming)  
🟥 [ISTANACASINO](https://link99.vip/istanacasino)

💸 Setor gampang, main tenang, JP makin cuan! 🎰🍀`, { parse_mode: 'Markdown' });
});

bot.command('bantuan', (ctx) => {
  ctx.reply(`📖 *DAFTAR PERINTAH NONAISTANA* 🎰

/start – Sapaan awal dari NonaIstana
/pola – Pola gacor & prediksi togel
/promo – Promo tiap situs & link main
/caradeposit – Panduan deposit umum  
/qris – Cara deposit via QRIS  
/carawd – Panduan withdraw
/link – Link situs resmi
/bantuan – Daftar semua perintah

Gas terus Bos, semoga JP hari ini! 🚀`, { parse_mode: 'Markdown' });
});

// Keyword
bot.hears(/scatter|jp|maxwin/i, (ctx) => {
  ctx.reply('⚡️ Lagi cari scatter ya Bos? Coba spin jam 21:00, biasanya nyala 🔥');
});

bot.launch();

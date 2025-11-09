// --- Konstanta Warna Global untuk SVG ---
const BROWN = '#A0522D';
const DARK_BROWN = '#6B4226';
const LIGHT_BROWN = '#F5DEB3';
const GOLD = '#E1AD01';
const DARK_GOLD = '#C59300';
const RED = '#FF4500';
const DARK_RED = '#CC3700';
const GREEN = '#5F9EA0';
const DARK_GREEN = '#006400';
const WHITE = '#FFFFFF';
const ORANGE = '#FF8C00';
const MAGENTA = '#E75480';
const BLUE = '#4682B4';
const DARK_BLUE = '#2A5D8D';
const GREY = '#CCCCCC';

// Definisi Filter Global
const filters = `
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="2" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.4)"/>
    </filter>
    <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="1" dy="1" stdDeviation="1.5" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
`;

// --- Fungsi Utility untuk Mengacak Array (Fisher-Yates Shuffle) ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Mengembalikan SVG dekorasi budaya (Flower/Wave)
 */
function getFlourishSVG(isLarge = false) {
    const colorA = BROWN;
    const colorB = GOLD;
    const colorR = RED;
    const size = isLarge ? 100 : 50;

    return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 50 C 30 20, 70 20, 90 50 S 70 80, 50 80 S 30 80, 10 50 Z" fill="${colorB}" opacity="0.3"/>
        <path d="M15 50 C 35 25, 65 25, 85 50 C 70 70, 50 65, 30 70 Z" fill="${colorR}" opacity="0.6" stroke="${colorA}" stroke-width="2"/>
        <circle cx="50" cy="50" r="10" fill="${colorA}" stroke="${colorB}" stroke-width="2"/>
    </svg>`;
}

function animateFlourish(elementId, isLarge = false) {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.innerHTML = getFlourishSVG(isLarge);
    // Re-triggering animation by cloning or removing/adding class
    el.classList.remove('anim-flourish');
    void el.offsetWidth; // Trigger reflow
    el.classList.add('anim-flourish');
}

/**
 * Mendefinisikan bentuk SVG yang lebih detail dan berwarna untuk setiap item.
 */
function getItemShape(item) {
    let shape = '';
    let defs = '';


    if (item.includes('Canang Sari')) {
        defs = `
                        <linearGradient id="canangBaseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${LIGHT_BROWN};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${BROWN};stop-opacity:1" />
                        </linearGradient>
                        <radialGradient id="flowerGold" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_GOLD};stop-opacity:1" />
                        </radialGradient>
                         <radialGradient id="flowerRed" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" style="stop-color:${RED};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_RED};stop-opacity:1" />
                        </radialGradient>
                    `;
        shape = `
                    <g transform="scale(0.8)" filter="url(#soft-shadow)">
                        <rect x="-15" y="-5" width="30" height="15" rx="4" fill="url(#canangBaseGradient)" stroke="${DARK_BROWN}" stroke-width="1.5"/>
                        <path d="M-12,-3 C -10,-10, 10,-10, 12,-3 L 0,-15 Z" fill="${GREEN}" stroke="${DARK_GREEN}" stroke-width="1"/>
                        <circle cx="-5" cy="-7" r="4" fill="url(#flowerRed)" stroke="${DARK_RED}" stroke-width="0.5"/>
                        <circle cx="5" cy="-7" r="4" fill="url(#flowerGold)" stroke="${DARK_GOLD}" stroke-width="0.5"/>
                        <circle cx="0" cy="-2" r="2" fill="${WHITE}" stroke="${GREY}" stroke-width="0.2"/>
                    </g>`;
    } else if (item.includes('Meru Pura')) {
        defs = `
                        <linearGradient id="meruRoof" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${RED};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_RED};stop-opacity:1" />
                        </linearGradient>
                         <linearGradient id="meruBase" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${BROWN};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_BROWN};stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="meruWall" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_GOLD};stop-opacity:1" />
                        </linearGradient>
                    `;
        shape = `
                    <g transform="scale(0.7)" filter="url(#shadow)">
                        <polygon points="0,-40 -18,-20 18,-20" fill="url(#meruRoof)" stroke="${DARK_RED}" stroke-width="2"/>
                        <polygon points="0,-20 -23,0 23,0" fill="url(#meruRoof)" stroke="${DARK_RED}" stroke-width="2"/>
                        <polygon points="0,0 -28,20 28,20" fill="url(#meruRoof)" stroke="${DARK_RED}" stroke-width="2"/>
                        <rect x="-20" y="20" width="40" height="10" fill="url(#meruWall)" stroke="${DARK_GOLD}" stroke-width="1.5"/>
                        <rect x="-20" y="30" width="40" height="5" fill="url(#meruBase)" stroke="${DARK_BROWN}" stroke-width="1.5"/>
                    </g>`;
    } else if (item.includes('Udeng')) {
        defs = `
                        <linearGradient id="udengGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_GOLD};stop-opacity:1" />
                        </linearGradient>
                    `;
        shape = `
                    <g transform="scale(0.8)" filter="url(#soft-shadow)">
                        <path d="M-25,10 C -10,-10, 10,-10, 25,10 L 25,-10 C 10,-20, -10,-20, -25,-10 Z" fill="url(#udengGradient)" stroke="${DARK_GOLD}" stroke-width="2"/>
                        <path d="M-15,10 L 0,-5 L 15,10 Z" fill="${RED}" stroke="${DARK_RED}" stroke-width="1.5"/>
                        <circle cx="0" cy="-8" r="4" fill="${BROWN}" stroke="${DARK_BROWN}" stroke-width="1"/>
                    </g>`;
    } else if (item.includes('Penari Barong')) {
        defs = `
                        <radialGradient id="barongFace" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" style="stop-color:${ORANGE};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_RED};stop-opacity:1" />
                        </radialGradient>
                        <linearGradient id="barongMane" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_GOLD};stop-opacity:1" />
                        </linearGradient>
                    `;
        shape = `
                    <g transform="scale(0.7)" filter="url(#shadow)">
                        <path d="M-25,-15 C -30,-25, 30,-25, 25,-15 L 20,5 C 10,15, -10,15, -20,5 Z" fill="url(#barongMane)" stroke="${DARK_GOLD}" stroke-width="1.5"/>
                        <circle cx="0" cy="-5" r="18" fill="url(#barongFace)" stroke="${RED}" stroke-width="2"/>
                        <path d="M-10,-5 Q -5,0, 0,0 Q 5,0, 10,-5" stroke="${WHITE}" stroke-width="2" fill="none"/>
                        <circle cx="-7" cy="-10" r="3" fill="black"/>
                        <circle cx="7" cy="-10" r="3" fill="black"/>
                        <rect x="-18" y="8" width="36" height="7" fill="${BROWN}" stroke="${DARK_BROWN}" stroke-width="1.5"/>
                    </g>`;
    } else if (item.includes('Topeng Bali')) {
        defs = `
                        <linearGradient id="maskRed" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${RED};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_RED};stop-opacity:1" />
                        </linearGradient>
                        <radialGradient id="maskMouth" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" style="stop-color:${DARK_BROWN};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:black;stop-opacity:1" />
                        </radialGradient>
                    `;
        shape = `
                    <g transform="scale(0.8)" filter="url(#shadow)">
                        <path d="M-20,-15 C -25,0, 25,0, 20,-15 L 0,-28 Z" fill="url(#maskRed)" stroke="${GOLD}" stroke-width="2"/>
                        <rect x="-12" y="-2" width="24" height="6" fill="${LIGHT_BROWN}" stroke="${BROWN}" stroke-width="1"/>
                        <circle cx="-8" cy="-8" r="4" fill="black" stroke="${WHITE}" stroke-width="0.5"/>
                        <circle cx="8" cy="-8" r="4" fill="black" stroke="${WHITE}" stroke-width="0.5"/>
                        <path d="M-10,5 Q 0,15, 10,5 Q 0,10, -10,5 Z" fill="url(#maskMouth)"/>
                    </g>`;
    } else if (item.includes('Gapura Candi Bentar')) {
        defs = `
                        <linearGradient id="gateStone" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${BROWN};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_BROWN};stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="gateDecor" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${RED};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_RED};stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="gateTop" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${GOLD};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_GOLD};stop-opacity:1" />
                        </linearGradient>
                    `;
        shape = `
                    <g transform="scale(0.6)" filter="url(#shadow)">
                        <rect x="-30" y="-35" width="25" height="70" fill="url(#gateStone)" stroke="${DARK_BROWN}" stroke-width="2"/>
                        <rect x="5" y="-35" width="25" height="70" fill="url(#gateStone)" stroke="${DARK_BROWN}" stroke-width="2"/>
                        <rect x="-30" y="-35" width="60" height="7" fill="url(#gateDecor)" stroke="${DARK_RED}" stroke-width="1.5"/>
                        <path d="M-30,-35 L 30,-35 L 30,-45 L -30,-45 Z" fill="url(#gateTop)" stroke="${DARK_GOLD}" stroke-width="1.5"/>
                        <path d="M-17,-25 L -13,-30 L -10,-25" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
                        <path d="M17,-25 L 13,-30 L 10,-25" fill="none" stroke="${GOLD}" stroke-width="1.5"/>
                    </g>`;
    } else if (item.includes('Banten')) {
        defs = `
                        <linearGradient id="bantenBase" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${LIGHT_BROWN};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${BROWN};stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="bantenWhite" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${WHITE};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${GREY};stop-opacity:1" />
                        </linearGradient>
                        <radialGradient id="bantenFlower1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" style="stop-color:${GREEN};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_GREEN};stop-opacity:1" />
                        </radialGradient>
                         <radialGradient id="bantenFlower2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" style="stop-color:${MAGENTA};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${RED};stop-opacity:1" />
                        </radialGradient>
                    `;
        shape = `
                    <g transform="scale(0.8)" filter="url(#soft-shadow)">
                        <rect x="-18" y="0" width="36" height="12" rx="4" fill="url(#bantenBase)" stroke="${DARK_BROWN}" stroke-width="1.5"/>
                        <rect x="-12" y="-6" width="24" height="6" fill="url(#bantenWhite)" stroke="${GREY}" stroke-width="1"/>
                        <circle cx="0" cy="-12" r="5" fill="url(#bantenFlower1)" stroke="${DARK_GREEN}" stroke-width="0.5"/>
                        <circle cx="-6" cy="-18" r="3" fill="url(#bantenFlower2)" stroke="${RED}" stroke-width="0.5"/>
                        <circle cx="6" cy="-18" r="3" fill="url(#flowerGold)" stroke="${DARK_GOLD}" stroke-width="0.5"/>
                    </g>`;
    } else if (item.includes('Gamelan')) {
        defs = `
                        <radialGradient id="gamelanBrass" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                            <stop offset="50%" style="stop-color:#DAA520;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#B8860B;stop-opacity:1" />
                        </radialGradient>
                        <linearGradient id="gamelanWood" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${BROWN};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_BROWN};stop-opacity:1" />
                        </linearGradient>
                    `;
        shape = `
                    <g transform="scale(0.8)" filter="url(#shadow)">
                        <circle cx="0" cy="0" r="18" fill="url(#gamelanBrass)" stroke="#B8860B" stroke-width="2"/>
                        <circle cx="0" cy="0" r="12" fill="${DARK_BROWN}"/>
                        <circle cx="0" cy="0" r="6" fill="url(#gamelanBrass)"/>
                        <rect x="-22" y="10" width="44" height="6" fill="url(#gamelanWood)" stroke="${DARK_BROWN}" stroke-width="1.5"/>
                    </g>`;
    } else if (item.includes('Saluran Subak')) {
        defs = `
                        <linearGradient id="subakSoil" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${DARK_GREEN};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${BROWN};stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="subakWater" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${BLUE};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_BLUE};stop-opacity:1" />
                        </linearGradient>
                    `;
        shape = `
                    <g transform="scale(0.8)" filter="url(#soft-shadow)">
                        <path d="M-25,10 L 25,10 L 20,-10 L -20,-10 Z" fill="url(#subakSoil)" stroke="${BROWN}" stroke-width="2"/>
                        <rect x="-18" y="-8" width="36" height="6" fill="url(#subakWater)"/>
                        <path d="M-25,-15 C -15,-18, 15,-18, 25,-15" fill="none" stroke="${GREY}" stroke-width="2"/>
                    </g>`;
    } else if (item.includes('Layang-layang')) {
        defs = `
                        <linearGradient id="kiteRed" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#CD5C5C;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#8B0000;stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="kiteTail" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:${ORANGE};stop-opacity:1" />
                            <stop offset="100%" style="stop-color:${DARK_RED};stop-opacity:1" />
                        </linearGradient>
                    `;
        shape = `
                    <g transform="scale(0.8)" filter="url(#shadow)">
                        <path d="M0,-25 L 20,0 L 0,25 L -20,0 Z" fill="url(#kiteRed)" stroke="${DARK_RED}" stroke-width="2"/>
                        <line x1="0" y1="-25" x2="0" y2="25" stroke="${BROWN}" stroke-width="3" stroke-linecap="round"/>
                        <line x1="-20" y1="0" x2="20" y2="0" stroke="${GOLD}" stroke-width="3" stroke-linecap="round"/>
                        <circle cx="0" cy="15" r="3" fill="url(#kiteTail)"/>
                        <circle cx="0" cy="20" r="2" fill="url(#kiteTail)"/>
                    </g>`;
    } else {
         defs = '';
         shape = `<circle cx="0" cy="0" r="15" fill="${GREY}"/>`;
    }

    return { defs, shape };
}

function generateItemSVG(item, count) {
    const svgItems = [];
    let allDefs = '';
    const rows = Math.ceil(Math.sqrt(count));
    const cols = Math.ceil(count / rows);
    const spacing = 55; /* Diperbesar sedikit karena detail item lebih besar */
    const scaleFactor = 0.8; /* FINAL PERBAIKAN: Meningkatkan skala gambar agar lebih besar di kartu (dari 0.6 ke 0.8) */

    const totalWidth = (cols - 1) * spacing;
    const totalHeight = (rows - 1) * spacing;
    const startX = -totalWidth / 2;
    const startY = -totalHeight / 2;

    /* Ambil shape dan defs dari item */
    const { defs: itemDefs, shape: itemShape } = getItemShape(item);

    /* Defs global (filters) */
    allDefs += filters;
    /* Defs item-spesifik (gradients) */
    allDefs += itemDefs;

    for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = startX + col * spacing;
        const y = startY + row * spacing;

        if (i < 15) {
            /* Tambahkan shape tanpa defs */
            svgItems.push(`<g transform="translate(${x}, ${y})">${itemShape}</g>`);
        }
    }

    const width = totalWidth + 100;
    const height = totalHeight + 100;
    const viewBox = `${-width/2} ${-height/2} ${width} ${height}`;

    /* KODE PERBAIKAN: Memastikan semua defs (filter dan gradien) masuk ke tag <defs> utama */
    return `<svg viewBox="${viewBox}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="transform: scale(${scaleFactor});">
        <defs>${allDefs}</defs>
        ${svgItems.join('')}
    </svg>`;
}

/* --- Konfigurasi Data Flashcard --- */
/* Format diubah untuk Flashcard: { questionText: "Soal", answerValue: 5, answerItem: "Canang Sari", svg: "..." } */
let flashcardData = [
    { questionText: "1 Canang Sari + 5 Canang Sari = ...", answerValue: 6, answerItem: "Canang Sari", svg: generateItemSVG('Canang Sari', 6) },
    { questionText: "15 Meru Pura - 5 Meru Pura = ...", answerValue: 10, answerItem: "Meru Pura", svg: generateItemSVG('Meru Pura', 10) },
    { questionText: "5 Udeng - 2 Udeng = ...", answerValue: 3, answerItem: "Udeng", svg: generateItemSVG('Udeng (Ikat Kepala)', 3) },
    { questionText: "2 Penari Barong + 13 Penari Barong = ...", answerValue: 15, answerItem: "Penari Barong", svg: generateItemSVG('Penari Barong', 15) },
    { questionText: "11 Topeng Bali - 3 Topeng Bali = ...", answerValue: 8, answerItem: "Topeng Bali", svg: generateItemSVG('Topeng Bali', 8) },
    { questionText: "6 Gapura + 6 Gapura = ...", answerValue: 12, answerItem: "Gapura", svg: generateItemSVG('Gapura Candi Bentar', 12) },
    { questionText: "2 Banten + 3 Banten = ...", answerValue: 5, answerItem: "Banten", svg: generateItemSVG('Banten (Persembahan)', 5) },
    { questionText: "20 Gamelan - 6 Gamelan = ...", answerValue: 14, answerItem: "Alat Gamelan", svg: generateItemSVG('Gamelan', 14) },
    { questionText: "10 Saluran Subak - 3 Saluran Subak = ...", answerValue: 7, answerItem: "Saluran Subak", svg: generateItemSVG('Saluran Subak', 7) },
    { questionText: "4 Layang-layang + 5 Layang-layang = ...", answerValue: 9, answerItem: "Layang-layang Bali", svg: generateItemSVG('Layang-layang', 9) }
];

/* --- State Flashcard --- */
let currentCardIndex = 0;
let isFlipped = false;
let isTransitioning = false;

/* --- Elemen DOM --- */
/* Elemen DOM dipanggil di dalam fungsi untuk menghindari masalah timing saat loading */
const getDomElements = () => ({
    startArea: document.getElementById('start-area'),
    startButton: document.getElementById('start-button'),
    flashcardArea: document.getElementById('flashcard-area'),
    cardInner: document.getElementById('card-inner'),
    cardFront: document.getElementById('card-front'),
    cardBack: document.getElementById('card-back'),
    questionTextDisplay: document.getElementById('question-text-display'),
    answerDisplay: document.getElementById('answer-display'), // Untuk menampilkan nilai jawaban
    itemDisplay: document.getElementById('item-display'), // Untuk menampilkan nama item
    quizSvgContainerFront: document.getElementById('quiz-svg-container-front'),
    nextCardButton: document.getElementById('next-card-button'),
    prevCardButton: document.getElementById('prev-card-button'),
    currentQIndexDisplay: document.getElementById('current-q-index'),
    totalQCountDisplay: document.getElementById('total-q-count'),
    resultArea: document.getElementById('result-area'),
    resultFlourish: document.getElementById('result-flourish'),
    restartButton: document.getElementById('restart-button'),
    startFlourish: document.getElementById('start-flourish'),
});

/* --- Fungsi Logika Flashcard --- */

function updateNavigationButtons(elements) {
    // PERBAIKAN: Tombol Lanjut SELALU AKTIF, kecuali saat transisi atau di akhir sesi.
    elements.nextCardButton.disabled = false; // Selalu aktif

    // Mengaktifkan tombol Sebelumnya hanya jika bukan kartu pertama
    elements.prevCardButton.disabled = (currentCardIndex === 0);
}

function loadCard() {
    const elements = getDomElements();

    if (currentCardIndex >= flashcardData.length) {
        showResults();
        return;
    }

    isTransitioning = true;
    isFlipped = false;
    elements.cardInner.classList.remove('is-flipped');

    const card = flashcardData[currentCardIndex];

    /* 1. Muat Sisi Depan (Soal) */
    elements.questionTextDisplay.textContent = card.questionText;
    elements.quizSvgContainerFront.innerHTML = card.svg;

    /* 2. Muat Sisi Belakang (Jawaban) */
    elements.answerDisplay.textContent = card.answerValue;
    elements.itemDisplay.textContent = card.answerItem;

    /* Update footer index */
    elements.currentQIndexDisplay.textContent = currentCardIndex + 1;

    // Periksa apakah ini kartu terakhir untuk mengubah teks tombol
    if (currentCardIndex === flashcardData.length - 1) {
         elements.nextCardButton.innerHTML = "&raquo;"; // DIUBAH: Kembali ke ikon panah
    } else {
         elements.nextCardButton.innerHTML = "&raquo;";
    }

    /* Update tombol navigasi */
    updateNavigationButtons(elements);

    isTransitioning = false;
}

function flipCard(event) {
    const elements = getDomElements();
    if (isTransitioning) return;

    if (isFlipped) {
        /* KARTU SUDAH TERBALIK: ABAIKAN klik pada kartu itu sendiri */
        if (event.currentTarget === elements.cardInner) {
            return;
        }
    } else {
        /* KARTU BELUM TERBALIK: Balik ke belakang (Konfirmasi Jawaban) */
        elements.cardInner.classList.add('is-flipped');
        isFlipped = true;
        updateNavigationButtons(elements); /* Tombol Lanjut selalu aktif sekarang */
    }
}

function nextCard() {
    const elements = getDomElements();

    // --- LOGIKA PERBAIKAN UNTUK KARTU TERAKHIR ---
    const isLastCard = currentCardIndex === flashcardData.length - 1;

    if (isLastCard) {
        if (!isFlipped) {
            // Jika ini kartu terakhir dan belum dibalik, balikkan dulu
            flipCard({ currentTarget: elements.cardInner });
            return; // Tunggu klik berikutnya untuk menyelesaikan sesi
        } else {
            // Jika sudah dibalik, langsung tampilkan hasil
            showResults();
            return;
        }
    }

    // Logika untuk kartu non-terakhir
    if (!isFlipped) {
        // Jika belum dibalik, balikkan dulu (opsional, tergantung UX)
        flipCard({ currentTarget: elements.cardInner });
        return;
    }

    if (isTransitioning) return;

    currentCardIndex++;

    /* Animasi Transisi Halus (Flashcard Flap) */
    elements.flashcardArea.classList.add('quiz-exit');

    setTimeout(() => {
        elements.flashcardArea.classList.remove('quiz-exit');
        elements.flashcardArea.classList.add('quiz-entry');
        loadCard();
    }, 50);

    elements.flashcardArea.classList.remove('quiz-entry');
}

function previousCard() {
    const elements = getDomElements();
    if (isTransitioning || currentCardIndex === 0) return;

    currentCardIndex--;

    /* Animasi Transisi Halus (Flashcard Flap) */
    elements.flashcardArea.classList.add('quiz-exit');

    setTimeout(() => {
        elements.flashcardArea.classList.remove('quiz-exit');
        elements.flashcardArea.classList.add('quiz-entry');
        loadCard();
    }, 50);

    elements.flashcardArea.classList.remove('quiz-entry');
}

function startSession() {
    const elements = getDomElements();
    /* Mengacak urutan kartu sebelum dimulai */
    flashcardData = shuffleArray(flashcardData);
    currentCardIndex = 0;

    elements.startArea.classList.add('hidden');
    elements.flashcardArea.classList.remove('hidden');

    /* Hapus flourish dari start-area */
    if(elements.startFlourish) {
        elements.startFlourish.innerHTML = '';
    }

    /* Pasang event listener: */
    elements.cardInner.addEventListener('click', flipCard);
    /* Tombol navigasi (luar kartu) memanggil fungsi navigasi langsung */
    elements.nextCardButton.addEventListener('click', nextCard);
    elements.prevCardButton.addEventListener('click', previousCard);

    /* Muat kartu pertama */
    loadCard();
}

function showResults() {
    const elements = getDomElements();
    elements.flashcardArea.classList.add('hidden');
    elements.resultArea.classList.remove('hidden');

    /* Tambahkan animasi flourish Bali di layar hasil */
    animateFlourish('result-flourish', true);
}

function restartSession() {
    const elements = getDomElements();
    currentCardIndex = 0;

    elements.resultArea.classList.add('hidden');
    /* Kembali ke layar awal (yang akan mengacak soal lagi saat mulai) */
    elements.startArea.classList.remove('hidden');
    elements.flashcardArea.classList.add('hidden');

    /* Hapus animasi flourish dari result-area */
    elements.resultFlourish.innerHTML = '';

    /* Panggil flourish untuk layar awal */
    animateFlourish('start-flourish');

    /* Hapus event listener flip agar tidak ter-trigger di start screen */
    elements.cardInner.removeEventListener('click', flipCard);
    elements.nextCardButton.removeEventListener('click', nextCard);
    elements.prevCardButton.removeEventListener('click', previousCard);
}

/* --- Eksekusi Awal: Panggil animasi flourish di start slide saat dimuat --- */
window.onload = () => {
    const elements = getDomElements();
    elements.totalQCountDisplay.textContent = flashcardData.length;
    animateFlourish('start-flourish');

    /* Pasang listener untuk tombol start dan restart */
    elements.startButton.addEventListener('click', startSession);
    elements.restartButton.addEventListener('click', restartSession);
};

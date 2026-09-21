// Navigasi Section
function showSection(sectionId) {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('active-section');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active-section');
    
    // Highlight menu navigasi
    if(sectionId === 'home') document.querySelectorAll('.nav-btn')[0].classList.add('active');
    if(sectionId === 'learn') document.querySelectorAll('.nav-btn')[1].classList.add('active');
    if(sectionId === 'quiz') {
        document.querySelectorAll('.nav-btn')[2].classList.add('active');
        resetQuiz();
    }
}

// Perpindahan Tab Konsep Belajar
function switchConcept(type) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active-tab'));
    document.querySelectorAll('.concept-content').forEach(c => c.classList.add('hide'));

    if(type === 'panjang') {
        document.querySelectorAll('.tab-btn')[0].classList.add('active-tab');
        document.getElementById('concept-panjang').classList.remove('hide');
    } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active-tab');
        document.getElementById('concept-tinggi').classList.remove('hide');
    }
}

// Data Soal Latihan (Gambar berupa SVG terintegrasi)
const questions = [
    {
        question: "Mana benda yang LEBIH PANJANG? 📏",
        targetProp: "panjang",
        options: [
            {
                id: "a",
                isCorrect: true,
                svg: `<svg width="180" height="60" viewBox="0 0 180 60"><rect x="10" y="20" width="150" height="15" fill="#3F51B5" rx="3"/><circle cx="20" cy="27" r="10" fill="#333"/><circle cx="150" cy="27" r="10" fill="#333"/></svg>`,
                label: "Mobil-Mobilan A"
            },
            {
                id: "b",
                isCorrect: false,
                svg: `<svg width="180" height="60" viewBox="0 0 180 60"><rect x="10" y="20" width="70" height="15" fill="#E91E63" rx="3"/><circle cx="20" cy="27" r="10" fill="#333"/><circle cx="70" cy="27" r="10" fill="#333"/></svg>`,
                label: "Mobil-Mobilan B"
            }
        ]
    },
    {
        question: "Mana yang LEBIH TINGGI? 🦒",
        targetProp: "tinggi",
        options: [
            {
                id: "a",
                isCorrect: false,
                svg: `<svg width="100" height="150" viewBox="0 0 100 150"><rect x="35" y="80" width="30" height="60" fill="#8D6E63"/><polygon points="10,80 50,20 90,80" fill="#4CAF50"/></svg>`,
                label: "Pohon A"
            },
            {
                id: "b",
                isCorrect: true,
                svg: `<svg width="100" height="150" viewBox="0 0 100 150"><rect x="35" y="40" width="30" height="100" fill="#8D6E63"/><polygon points="10,40 50,-10 90,40" fill="#2E7D32"/></svg>`,
                label: "Pohon B"
            }
        ]
    },
    {
        question: "Mana benda yang LEBIH PENDEK? ✏️",
        targetProp: "pendek",
        options: [
            {
                id: "a",
                isCorrect: true,
                svg: `<svg width="150" height="50" viewBox="0 0 150 50"><rect x="10" y="15" width="60" height="20" fill="#FF9800" rx="2"/><polygon points="70,15 90,25 70,35" fill="#333"/></svg>`,
                label: "Pensil A"
            },
            {
                id: "b",
                isCorrect: false,
                svg: `<svg width="150" height="50" viewBox="0 0 150 50"><rect x="10" y="15" width="120" height="20" fill="#9C27B0" rx="2"/><polygon points="130,15 145,25 130,35" fill="#333"/></svg>`,
                label: "Pensil B"
            }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    document.getElementById('feedback').classList.add('hide');
    document.getElementById('next-btn').classList.add('hide');

    q.options.forEach(opt => {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.innerHTML = `${opt.svg}<p class="word-label"><b>${opt.label}</b></p>`;
        card.onclick = () => checkAnswer(opt.isCorrect, card);
        optionsContainer.appendChild(card);
    });
}

function checkAnswer(isCorrect, selectedCard) {
    // Kunci opsi agar tidak bisa diklik berulang
    const cards = document.querySelectorAll('.option-card');
    cards.forEach(c => c.style.pointerEvents = 'none');

    const feedback = document.getElementById('feedback');
    feedback.classList.remove('hide');

    if (isCorrect) {
        score += 10;
        document.getElementById('score').innerText = score;
        selectedCard.style.borderColor = '#4CAF50';
        selectedCard.style.backgroundColor = '#E8F5E9';
        
        // Visual Feedback ramah tunarungu
        feedback.className = 'feedback-box feedback-correct';
        feedback.innerHTML = '✨ HEBAT! JAWABAN BENAR! 👏';
    } else {
        selectedCard.style.borderColor = '#F44336';
        selectedCard.style.backgroundColor = '#FFEBEE';
        
        feedback.className = 'feedback-box feedback-wrong';
        feedback.innerHTML = '❌ Coba Lagi Ya! Perhatikan Ukurannya 😊';
    }

    document.getElementById('next-btn').classList.remove('hide');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
}

function showFinalResult() {
    document.getElementById('quiz-container').innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <h1 style="font-size: 2.5rem;">🎉 Selesai! 🎉</h1>
            <p style="font-size: 1.5rem; margin: 15px 0;">Nilai Akhir Kamu: <b>${score}</b></p>
            <p>Bagus Sekali! Kamu Sudah Memahami Ukuran!</p>
            <button class="btn-start" style="margin-top:20px;" onclick="resetQuiz()">Ulangi Latihan 🔄</button>
        </div>
    `;
    document.getElementById('next-btn').classList.add('hide');
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('score').innerText = score;
    loadQuestion();
}

// Inisialisasi saat pertama dibuka
window.onload = () => {
    loadQuestion();
};
const prefectures = [
    { name: "北海道", capital: "札幌市", region: "北海道" },
    { name: "青森県", capital: "青森市", region: "東北" },
    { name: "岩手県", capital: "盛岡市", region: "東北" },
    { name: "宮城県", capital: "仙台市", region: "東北" },
    { name: "秋田県", capital: "秋田市", region: "東北" },
    { name: "山形県", capital: "山形市", region: "東北" },
    { name: "福島県", capital: "福島市", region: "東北" },
    { name: "茨城県", capital: "水戸市", region: "関東" },
    { name: "栃木県", capital: "宇都宮市", region: "関東" },
    { name: "群馬県", capital: "前橋市", region: "関東" },
    { name: "埼玉県", capital: "さいたま市", region: "関東" },
    { name: "千葉県", capital: "千葉市", region: "関東" },
    { name: "東京都", capital: "新宿区", region: "関東" },
    { name: "神奈川県", capital: "横浜市", region: "関東" },
    { name: "新潟県", capital: "新潟市", region: "中部" },
    { name: "富山県", capital: "富山市", region: "中部" },
    { name: "石川県", capital: "金沢市", region: "中部" },
    { name: "福井県", capital: "福井市", region: "中部" },
    { name: "山梨県", capital: "甲府市", region: "中部" },
    { name: "長野県", capital: "長野市", region: "中部" },
    { name: "岐阜県", capital: "岐阜市", region: "中部" },
    { name: "静岡県", capital: "静岡市", region: "中部" },
    { name: "愛知県", capital: "名古屋市", region: "中部" },
    { name: "三重県", capital: "津市", region: "近畿" },
    { name: "滋賀県", capital: "大津市", region: "近畿" },
    { name: "京都府", capital: "京都市", region: "近畿" },
    { name: "大阪府", capital: "大阪市", region: "近畿" },
    { name: "兵庫県", capital: "神戸市", region: "近畿" },
    { name: "奈良県", capital: "奈良市", region: "近畿" },
    { name: "和歌山県", capital: "和歌山市", region: "近畿" },
    { name: "鳥取県", capital: "鳥取市", region: "中国" },
    { name: "島根県", capital: "松江市", region: "中国" },
    { name: "岡山県", capital: "岡山市", region: "中国" },
    { name: "広島県", capital: "広島市", region: "中国" },
    { name: "山口県", capital: "山口市", region: "中国" },
    { name: "徳島県", capital: "徳島市", region: "四国" },
    { name: "香川県", capital: "高松市", region: "四国" },
    { name: "愛媛県", capital: "松山市", region: "四国" },
    { name: "高知県", capital: "高知市", region: "四国" },
    { name: "福岡県", capital: "福岡市", region: "九州" },
    { name: "佐賀県", capital: "佐賀市", region: "九州" },
    { name: "長崎県", capital: "長崎市", region: "九州" },
    { name: "熊本県", capital: "熊本市", region: "九州" },
    { name: "大分県", capital: "大分市", region: "九州" },
    { name: "宮崎県", capital: "宮崎市", region: "九州" },
    { name: "鹿児島県", capital: "鹿児島市", region: "九州" },
    { name: "沖縄県", capital: "那覇市", region: "沖縄" }
];

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// 画面要素の取得
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCountText = document.getElementById('question-count');
const scoreDisplay = document.getElementById('score-display');
const finalScoreText = document.getElementById('final-score');
const rankMessage = document.getElementById('rank-message');

// クイズの初期化
function initQuiz() {
    // 47からランダムに10問選ぶ
    questions = [...prefectures]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
    
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
}

// 画面遷移
function showScreen(screen) {
    [startScreen, quizScreen, resultScreen].forEach(s => s.classList.add('hidden'));
    screen.classList.remove('hidden');
}

// スコア更新
function updateScore() {
    scoreDisplay.innerText = `得点: ${score}`;
}

// 問題の表示
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionCountText.innerText = `第 ${currentQuestionIndex + 1} 問`;
    
    // 問題タイプをランダムに決定 (0: 県庁所在地は?, 1: どの地方?)
    const type = Math.floor(Math.random() * 2);
    let correctAnswer = "";
    let questionStr = "";

    if (type === 0) {
        questionStr = `${question.name}の県庁所在地はどこ？`;
        correctAnswer = question.capital;
    } else {
        questionStr = `${question.name}は何地方？`;
        correctAnswer = question.region + "地方";
    }

    questionText.innerText = questionStr;

    // 選択肢の作成
    let options = [correctAnswer];
    while (options.length < 4) {
        const randomPref = prefectures[Math.floor(Math.random() * prefectures.length)];
        const wrongOption = type === 0 ? randomPref.capital : randomPref.region + "地方";
        if (!options.includes(wrongOption)) {
            options.push(wrongOption);
        }
    }
    options.sort(() => Math.random() - 0.5);

    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.classList.add('option-btn');
        btn.onclick = () => handleAnswer(option, correctAnswer, btn);
        optionsContainer.appendChild(btn);
    });
}

// 解答処理
function handleAnswer(selected, correct, btn) {
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    allButtons.forEach(b => b.disabled = true);

    if (selected === correct) {
        score += 1;
        btn.classList.add('correct');
        updateScore();
    } else {
        btn.classList.add('wrong');
        // 正解を表示
        allButtons.forEach(b => {
            if (b.innerText === correct) {
                b.classList.add('correct');
            }
        });
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

// 結果表示
function showResult() {
    showScreen(resultScreen);
    finalScoreText.innerText = score;

    let message = "";
    if (score === 10) message = "天晴れ！あなたは都道府県の達人です。";
    else if (score >= 7) message = "見事なり。優れた知識をお持ちですね。";
    else if (score >= 4) message = "まずまずの腕前。さらなる精進を。";
    else message = "修行が足りぬようです。出直してまいれ。";
    
    rankMessage.innerText = message;
}

// イベントリスナー
startBtn.onclick = () => {
    initQuiz();
    showScreen(quizScreen);
    displayQuestion();
};

restartBtn.onclick = () => {
    showScreen(startScreen);
};

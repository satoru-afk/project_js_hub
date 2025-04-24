document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startScreen = document.querySelector('.start-screen');
    const quizScreen = document.querySelector('.quiz-screen');
    const resultsScreen = document.querySelector('.results-screen');
    const startBtn = document.querySelector('.start-btn');
    const nextBtn = document.querySelector('.next-btn');
    const restartBtn = document.querySelector('.restart-btn');
    const questionText = document.querySelector('.question-text');
    const optionsContainer = document.querySelector('.options-container');
    const feedbackContainer = document.querySelector('.feedback-container');
    const feedbackMessage = document.querySelector('.feedback-message');
    const progressBar = document.querySelector('.progress-bar');
    const currentQuestionEl = document.getElementById('current-question');
    const totalQuestionsEl = document.getElementById('total-questions');
    const timerEl = document.querySelector('.timer span');
    const scoreEl = document.querySelector('.score');
    const totalEl = document.querySelector('.total');
    const scoreMessageEl = document.querySelector('.score-message');

    // Quiz Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let timeLeft = 10;
    let quizData = [
        {
            question: "Which Bauhaus artist created the 'Red Balloon' painting?",
            options: ["Wassily Kandinsky", "Paul Klee", "László Moholy-Nagy", "Oskar Schlemmer"],
            correctAnswer: 1,
            fact: "Paul Klee taught at the Bauhaus school and created abstract works with fantastic imagery."
        },
        {
            question: "What was the primary goal of the Bauhaus movement?",
            options: ["To combine art, craft, and technology", "To promote abstract expressionism", "To revive classical art forms", "To create political propaganda"],
            correctAnswer: 0,
            fact: "The Bauhaus sought to bridge the gap between art and industry through functional design."
        },
        {
            question: "Which of these is NOT a characteristic Bauhaus color?",
            options: ["Primary red", "Primary blue", "Primary yellow", "Primary green"],
            correctAnswer: 3,
            fact: "While Bauhaus used green, its core palette focused on the primary colors red, blue, and yellow."
        },
        {
            question: "What geometric shape is most associated with Bauhaus design?",
            options: ["Circle", "Triangle", "Square", "All of the above"],
            correctAnswer: 3,
            fact: "Bauhaus design famously used basic geometric shapes as fundamental building blocks."
        },
        {
            question: "Which Bauhaus director coined the phrase 'form follows function'?",
            options: ["Walter Gropius", "Hannes Meyer", "Ludwig Mies van der Rohe", "Johannes Itten"],
            correctAnswer: 2,
            fact: "Mies van der Rohe, the last Bauhaus director, emphasized functionalism in design."
        }
    ];

    // Initialize Quiz
    function initQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        totalQuestionsEl.textContent = quizData.length;
        showQuestion();
    }

    // Show Question
    function showQuestion() {
        resetState();
        const currentQuestion = quizData[currentQuestionIndex];
        questionText.textContent = currentQuestion.question;
        currentQuestionEl.textContent = currentQuestionIndex + 1;
        
        // Update progress bar
        const progressPercent = (currentQuestionIndex / quizData.length) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        // Create options
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            
            // Assign Bauhaus colors to options
            const colors = ['red', 'blue', 'yellow', 'green'];
            button.setAttribute('data-color', colors[index]);
            button.setAttribute('data-index', index);
            
            button.addEventListener('click', selectAnswer);
            optionsContainer.appendChild(button);
        });
        
        // Start timer
        startTimer();
    }

    // Reset State
    function resetState() {
        clearInterval(timer);
        timeLeft = 10;
        timerEl.textContent = timeLeft;
        feedbackContainer.style.display = 'none';
        
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
    }

    // Start Timer
    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerEl.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                handleTimeOut();
            }
        }, 1000);
    }

    // Handle Time Out
    function handleTimeOut() {
        const currentQuestion = quizData[currentQuestionIndex];
        feedbackMessage.textContent = `Time's up! The correct answer was: ${currentQuestion.options[currentQuestion.correctAnswer]}`;
        feedbackContainer.style.display = 'block';
        
        // Disable all options
        document.querySelectorAll('.option-btn').forEach(button => {
            button.disabled = true;
        });
    }

    // Select Answer
    function selectAnswer(e) {
        clearInterval(timer);
        const selectedButton = e.target;
        const selectedIndex = parseInt(selectedButton.getAttribute('data-index'));
        const currentQuestion = quizData[currentQuestionIndex];
        
        // Disable all options
        document.querySelectorAll('.option-btn').forEach(button => {
            button.disabled = true;
        });
        
        // Check answer
        if (selectedIndex === currentQuestion.correctAnswer) {
            selectedButton.style.boxShadow = `0 0 20px ${getComputedStyle(selectedButton).backgroundColor}`;
            feedbackMessage.textContent = `Correct! ${currentQuestion.fact}`;
            feedbackMessage.style.color = 'var(--correct-color)';
            score++;
        } else {
            selectedButton.style.boxShadow = '0 0 20px var(--wrong-color)';
            feedbackMessage.textContent = `Incorrect. The correct answer was: ${currentQuestion.options[currentQuestion.correctAnswer]}. ${currentQuestion.fact}`;
            feedbackMessage.style.color = 'var(--wrong-color)';
        }
        
        feedbackContainer.style.display = 'block';
    }

    // Show Results
    function showResults() {
        scoreEl.textContent = score;
        totalEl.textContent = quizData.length;
        
        // Set score message
        const percentage = (score / quizData.length) * 100;
        if (percentage >= 80) {
            scoreMessageEl.textContent = "Bauhaus Master! You know your design history.";
        } else if (percentage >= 50) {
            scoreMessageEl.textContent = "Good effort! Keep studying modernist design.";
        } else {
            scoreMessageEl.textContent = "Time to revisit the Bauhaus fundamentals!";
        }
    }

    // Event Listeners
    startBtn.addEventListener('click', () => {
        startScreen.classList.remove('active');
        quizScreen.classList.add('active');
        initQuiz();
    });

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            quizScreen.classList.remove('active');
            resultsScreen.classList.add('active');
            showResults();
        }
    });

    restartBtn.addEventListener('click', () => {
        resultsScreen.classList.remove('active');
        startScreen.classList.add('active');
    });
});
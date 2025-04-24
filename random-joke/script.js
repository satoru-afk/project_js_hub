document.addEventListener('DOMContentLoaded', function() {
    const jokeText = document.getElementById('joke-text');
    const jokePunchline = document.getElementById('joke-punchline');
    const generateBtn = document.getElementById('generate-btn');
    
    const jokes = [
        {
            setup: "Why don't scientists trust atoms?",
            punchline: "Because they make up everything!"
        },
        {
            setup: "Why did the scarecrow win an award?",
            punchline: "Because he was outstanding in his field!"
        },
        {
            setup: "What do you call fake spaghetti?",
            punchline: "An impasta!"
        },
        {
            setup: "How do you organize a space party?",
            punchline: "You planet!"
        },
        {
            setup: "Why did the math book look sad?",
            punchline: "Because it had too many problems."
        },
        {
            setup: "What do you call a fish wearing a bowtie?",
            punchline: "Sofishticated."
        },
        {
            setup: "How do you make a tissue dance?",
            punchline: "Put a little boogie in it!"
        },
        {
            setup: "Why did the bicycle fall over?",
            punchline: "Because it was two-tired!"
        },
        {
            setup: "What's orange and sounds like a parrot?",
            punchline: "A carrot."
        },
        {
            setup: "Why can't you explain puns to kleptomaniacs?",
            punchline: "They always take things literally."
        }
    ];
    
    generateBtn.addEventListener('click', function() {
        // Hide punchline
        jokePunchline.classList.remove('reveal');
        
        // Get random joke
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        
        // Display setup
        jokeText.textContent = randomJoke.setup;
        
        // Display punchline after a short delay
        setTimeout(function() {
            jokePunchline.textContent = randomJoke.punchline;
            jokePunchline.classList.add('reveal');
        }, 1000);
        
        // Button animation
        this.style.transform = 'translateY(2px)';
        setTimeout(() => {
            this.style.transform = 'translateY(-3px)';
        }, 100);
    });
});
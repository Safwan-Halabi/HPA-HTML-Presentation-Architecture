class HPAEngine {
    constructor() {
        this.scenes = Array.from(document.querySelectorAll('.scene'));
        this.currentIndex = 0;
        this.progressBar = document.getElementById('progressBar');
        this.counter = document.getElementById('sceneCounter');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateState();
    }

    bindEvents() {
        // Keyboard Navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') this.next();
            if (e.key === 'ArrowLeft') this.prev();
        });

        // UI Controls
        document.getElementById('nextBtn')?.addEventListener('click', () => this.next());
        document.getElementById('prevBtn')?.addEventListener('click', () => this.prev());

        // Interactive Quiz Delegations
        document.querySelectorAll('.guess-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuiz(e.target));
        });

        // Flip Cards
        document.querySelectorAll('.flip-card').forEach(card => {
            card.addEventListener('click', () => card.classList.toggle('flipped'));
        });
    }

    goTo(index) {
        if (index < 0 || index >= this.scenes.length) return;
        
        this.scenes[this.currentIndex].classList.remove('active');
        this.currentIndex = index;
        this.scenes[this.currentIndex].classList.add('active');
        
        this.updateState();
    }

    next() { this.goTo(this.currentIndex + 1); }
    prev() { this.goTo(this.currentIndex - 1); }

    updateState() {
        // Update Progress Bar
        const progress = ((this.currentIndex + 1) / this.scenes.length) * 100;
        if (this.progressBar) this.progressBar.style.width = `${progress}%`;

        // Update Scene Counter
        if (this.counter) this.counter.textContent = `${this.currentIndex + 1} / ${this.scenes.length}`;
    }

    handleQuiz(button) {
        const isCorrect = button.dataset.correct === 'true';
        if (isCorrect) {
            button.classList.add('correct');
            document.getElementById('quizFeedback')?.classList.remove('hidden');
        } else {
            button.classList.add('wrong');
        }
    }
}

// Instantiate Engine on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    window.hpa = new HPAEngine();
});

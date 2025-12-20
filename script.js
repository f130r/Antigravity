document.addEventListener('DOMContentLoaded', () => {
    const counterValue = document.getElementById('counter-value');
    const incrementBtn = document.getElementById('increment');
    const decrementBtn = document.getElementById('decrement');

    let count = 0;

    const updateDisplay = () => {
        // Simple update
        counterValue.textContent = count;
        
        // Add a small scale animation on update
        counterValue.style.transform = 'scale(1.1)';
        counterValue.style.display = 'inline-block';
        counterValue.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            counterValue.style.transform = 'scale(1)';
        }, 100);
    };

    incrementBtn.addEventListener('click', () => {
        count++;
        updateDisplay();
    });

    decrementBtn.addEventListener('click', () => {
        count--;
        updateDisplay();
    });
});

const button = document.getElementById("check-btn");

function checkPalindrome() {
    const text = document.getElementById('textInput').value;
    const cleanText = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    const isPalindrome = cleanText === cleanText.split('').reverse().join('');
    
    const result = document.getElementById('result');
    result.textContent = isPalindrome 
        ? `"${text}" is a palindrome!` 
        : `"${text}" is not a palindrome.`;
        result.className = isPalindrome ? 'success' : 'error';
}
    
button.addEventListener('click', () => {
    checkPalindrome();
});
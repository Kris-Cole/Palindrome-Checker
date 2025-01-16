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

let history = [];
const palindromes = ['A man a plan a canal Panama', 'Race a car', 'Was it a car or a cat I saw', 
                   'Never odd or even', 'Do geese see God'];

function cleanText(text, options) {
    let cleaned = text;
    if (options.ignoreCase) cleaned = cleaned.toLowerCase();
    if (options.ignorePunctuation) cleaned = cleaned.replace(/[^a-zA-Z0-9\s]/g, '');
    if (options.ignoreSpaces) cleaned = cleaned.replace(/\s/g, '');
    return cleaned;
}

function checkPalindromeText(text, options = getOptions()) {
    const cleaned = cleanText(text, options);
    const reversed = cleaned.split('').reverse().join('');
    return {
        isPalindrome: cleaned === reversed,
        original: text,
        cleaned: cleaned,
        reversed: reversed
    };
}

function getOptions() {
    return {
        ignoreSpaces: document.getElementById('ignoreSpaces').checked,
        ignorePunctuation: document.getElementById('ignorePunctuation').checked,
        ignoreCase: document.getElementById('ignoreCase').checked
    };
}

function checkPalindrome() {
    const text = document.getElementById('textInput').value;
    if (!text) return;
    
    const result = checkPalindromeText(text);
    displayResult(result);
    addToHistory(result);
    updateStats();
}

function checkBulkPalindromes() {
    const texts = document.getElementById('bulkInput').value.split('\n').filter(t => t.trim());
    if (!texts.length) return;
    
    const results = texts.map(text => checkPalindromeText(text));
    displayBulkResults(results);
    results.forEach(addToHistory);
    updateStats();
}

function generatePalindrome() {
    const randomPalindrome = palindromes[Math.floor(Math.random() * palindromes.length)];
    document.getElementById('textInput').value = randomPalindrome;
    checkPalindrome();
}

function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>${result.isPalindrome ? 'Is' : 'Not'} a palindrome!</p>
        <p>Original: "${result.original}"</p>
        <p>Cleaned: "${result.cleaned}"</p>
        <p>Reversed: "${result.reversed}"</p>
    `;
    resultDiv.className = result.isPalindrome ? 'success' : 'error';
}

function displayBulkResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Results:</p>
        ${results.map(r => `
            <div class="${r.isPalindrome ? 'success' : 'error'}">
                "${r.original}" - ${r.isPalindrome ? 'Is' : 'Not'} a palindrome
            </div>
        `).join('')}
    `;
}

function addToHistory(result) {
    history.unshift(result);
    if (history.length > 10) history.pop();
    
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = history.map(h => `
        <div class="${h.isPalindrome ? 'success' : 'error'}">
            "${h.original}" - ${h.isPalindrome ? 'Is' : 'Not'} a palindrome
        </div>
    `).join('');
}

function updateStats() {
    const stats = {
        total: history.length,
        palindromes: history.filter(h => h.isPalindrome).length
    };
    
    document.getElementById('stats').innerHTML = `
        Checked: ${stats.total} | 
        Palindromes: ${stats.palindromes} |
        Success Rate: ${((stats.palindromes / stats.total) * 100).toFixed(1)}%
    `;
}
    
button.addEventListener('click', () => {
    checkPalindrome();
});                                                                                                                                  
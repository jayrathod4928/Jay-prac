document.getElementById('loanForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const annualInterestRate = parseFloat(document.getElementById('rate').value);
    const loanTermInYears = parseInt(document.getElementById('year').value);

    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const numberOfPayments = loanTermInYears * 12;

    const output_1 = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, - numberOfPayments));
    const output_2 = output_1 * numberOfPayments;
    const output_3 = output_2 - amount;

    document.getElementById('output_1').textContent = output_1.toFixed(2);
    document.getElementById('output_2').textContent = output_2.toFixed(2);
    document.getElementById('output_3').textContent = output_3.toFixed(2);

    document.getElementById('result').style.display = 'block';
});



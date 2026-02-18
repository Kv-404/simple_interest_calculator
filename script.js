document.addEventListener('DOMContentLoaded', () => {

    // --- Tab Switching Logic ---
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.form-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove 'active' class from all
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add 'active' class to current
            tab.classList.add('active');

            // Show corresponding section
            const targetId = tab.dataset.target;
            if (targetId === 'simple-interest') {
                document.getElementById('simple-interest-form').classList.add('active');
            } else if (targetId === 'sip') {
                document.getElementById('sip-form').classList.add('active');
            }
        });
    });


    // --- Simple Interest Calculator ---
    const siForm = document.getElementById('si-calc-form');

    siForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get Inputs
        const principal = parseFloat(document.getElementById('si-principal').value);
        const rate = parseFloat(document.getElementById('si-rate').value);
        const time = parseFloat(document.getElementById('si-time').value);

        // Validate
        if (isInvalid(principal) || isInvalid(rate) || isInvalid(time)) {
            alert('Please enter valid positive numbers.');
            return;
        }

        // Calculate
        // Formula: SI = (P * R * T) / 100
        const interest = (principal * rate * time) / 100;
        const total = principal + interest;

        // Display Results
        // Note: We added 'si-principal-amount' back to the HTML
        document.getElementById('si-principal-amount').textContent = formatCurrency(principal);
        document.getElementById('si-interest-amount').textContent = formatCurrency(interest);
        document.getElementById('si-total-amount').textContent = formatCurrency(total);

        // Show result box
        document.getElementById('si-result').classList.remove('hidden');
    });


    // --- SIP Calculator ---
    const sipForm = document.getElementById('sip-calc-form');

    sipForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get Inputs
        const monthlyInvestment = parseFloat(document.getElementById('sip-monthly').value);
        const annualRate = parseFloat(document.getElementById('sip-rate').value);
        const years = parseFloat(document.getElementById('sip-time').value);

        // Validate
        if (isInvalid(monthlyInvestment) || isInvalid(annualRate) || isInvalid(years)) {
            alert('Please enter valid positive numbers.');
            return;
        }

        // Calculate SIP (Recurring Deposit / Cumulative Simple Interest Style)
        // This method calculates simple interest on each monthly installment.
        // It is commonly used for RDs and gives a result of ~65 for 1200 annual investment (100/mo) at 10%.

        const totalMonths = years * 12;
        const monthlyRate = annualRate / 12 / 100; // Monthly Rate as a decimal

        // Formula for Sum of Simple Interests: P * [N * (N+1) / 2] * r
        // Where P = Monthly Investment
        // N = Total Months
        // r = Monthly Interest Rate

        const nSum = (totalMonths * (totalMonths + 1)) / 2;
        const totalInterest = monthlyInvestment * nSum * monthlyRate;

        const totalInvested = monthlyInvestment * totalMonths;
        const totalValue = totalInvested + totalInterest;

        const estimatedReturns = totalInterest;

        // Display Results
        document.getElementById('sip-invested-amount').textContent = formatCurrency(totalInvested);
        document.getElementById('sip-returns-amount').textContent = formatCurrency(estimatedReturns);
        document.getElementById('sip-total-amount').textContent = formatCurrency(totalValue);

        // Show result box
        document.getElementById('sip-result').classList.remove('hidden');
    });


    // --- Helper Functions ---

    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    function isInvalid(number) {
        return isNaN(number) || number < 0;
    }

});

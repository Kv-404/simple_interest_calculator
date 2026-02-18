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

        // Calculate SIP (Compound Interest)
        // Formula: FV = P * [ ((1 + i)^n - 1) / i ] * (1 + i)
        // P = Monthly Investment
        // i = Monthly Interest Rate (Annual Rate / 12 / 100)
        // n = Total Months

        const totalMonths = years * 12;
        const monthlyRate = annualRate / 12 / 100;

        let totalValue = 0;
        const totalInvested = monthlyInvestment * totalMonths;

        if (annualRate === 0) {
            totalValue = totalInvested;
        } else {
            // Future Value of Annuity Due (Investment at the beginning of each period)
            const n = totalMonths;
            const i = monthlyRate;
            const P = monthlyInvestment;

            totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        }

        const estimatedReturns = totalValue - totalInvested;

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

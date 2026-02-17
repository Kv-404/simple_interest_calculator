document.addEventListener('DOMContentLoaded', () => {

    // Tab Switching
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.form-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to current
            tab.classList.add('active');
            const targetId = tab.dataset.target;

            // Show corresponding section
            if (targetId === 'simple-interest') {
                document.getElementById('simple-interest-form').classList.add('active');
                document.getElementById('sip-form').classList.remove('active');
            } else if (targetId === 'sip') {
                document.getElementById('sip-form').classList.add('active');
                document.getElementById('simple-interest-form').classList.remove('active');
            }
        });
    });


    // --- Simple Interest Calculator ---
    const siForm = document.getElementById('si-calc-form');
    const siResultContainer = document.getElementById('si-result');
    const siInterestEl = document.getElementById('si-interest-amount');
    const siTotalEl = document.getElementById('si-total-amount');

    siForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const principal = parseFloat(document.getElementById('si-principal').value);
        const rate = parseFloat(document.getElementById('si-rate').value);
        const time = parseFloat(document.getElementById('si-time').value);

        if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal < 0 || rate < 0 || time < 0) {
            alert('Please enter valid positive numbers.');
            return;
        }

        const interest = (principal * rate * time) / 100;
        const total = principal + interest;

        siInterestEl.textContent = formatCurrency(interest);
        siTotalEl.textContent = formatCurrency(total);
        siResultContainer.classList.remove('hidden');
    });


    // --- SIP Calculator ---
    const sipForm = document.getElementById('sip-calc-form');
    const sipResultContainer = document.getElementById('sip-result');
    const sipInvestedEl = document.getElementById('sip-invested-amount');
    const sipReturnsEl = document.getElementById('sip-returns-amount');
    const sipTotalEl = document.getElementById('sip-total-amount');

    sipForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const monthlyInvestment = parseFloat(document.getElementById('sip-monthly').value);
        const annualRate = parseFloat(document.getElementById('sip-rate').value);
        const years = parseFloat(document.getElementById('sip-time').value);

        if (isNaN(monthlyInvestment) || isNaN(annualRate) || isNaN(years) || monthlyInvestment < 0 || annualRate < 0 || years < 0) {
            alert('Please enter valid positive numbers.');
            return;
        }

        // SIP Formula: M = P * ({[1 + i]^n - 1} / i) * (1 + i)
        // i = monthly rate = annualRate/12/100
        // n = months = years * 12

        const i = (annualRate / 12) / 100;
        const n = years * 12;

        let maturityAmount;
        if (i === 0) {
            maturityAmount = monthlyInvestment * n;
        } else {
            maturityAmount = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        }

        const totalInvested = monthlyInvestment * n;
        const estimatedReturns = maturityAmount - totalInvested;

        sipInvestedEl.textContent = formatCurrency(totalInvested);
        sipReturnsEl.textContent = formatCurrency(estimatedReturns);
        sipTotalEl.textContent = formatCurrency(maturityAmount);

        sipResultContainer.classList.remove('hidden');
    });


    // Helper: Format Currency
    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

});

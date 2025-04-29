document.getElementById('username').addEventListener('input', function (event) {
    console.log('Username input changed to:', event.target.value);

    const username = event.target.value;
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;

    const bubbleMessage = document.getElementById('username-guide');
    if (!regex.test(username)) {
        event.target.style.border = '2px solid red';
        bubbleMessage.textContent = 'Username must be at least 8 characters long, include one uppercase letter, one number, and one special character (!@#$%^&*).';
        bubbleMessage.style.color = 'red';
    } else {
        event.target.style.border = '2px solid green';
        bubbleMessage.textContent = 'Valid username!';
        bubbleMessage.style.color = 'green';
    }
});

// Add a guide message element dynamically if it doesn't exist
if (!document.getElementById('username-guide')) {
    const guide = document.createElement('div');
    guide.id = 'username-guide';
    guide.style.marginTop = '5px';
    guide.style.fontSize = '0.9em';
    document.getElementById('username').insertAdjacentElement('afterend', guide);
}


document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById('barChart').getContext('2d');

    // Function to get data from input fields for all months
    function getDataFromInput() {
        const months = [
            'january', 'february', 'march', 'april', 'may', 'june',
            'july', 'august', 'september', 'october', 'november', 'december'
        ];

        const income = months.map(month => {
            const incomeInput = document.getElementById(`${month}-income`);
            return incomeInput ? parseFloat(incomeInput.value) || 0 : 0;
        });

        const expenses = months.map(month => {
            const expensesInput = document.getElementById(`${month}-expenses`);
            return expensesInput ? parseFloat(expensesInput.value) || 0 : 0;
        });

        return { income, expenses };
    }

    // Initial chart setup
    let barChart;
    function initializeChart() {
        if (!barChart) {
            barChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: [{
                        label: 'Income',
                        data: [],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }, {
                        label: 'Expenses',
                        data: [],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Monthly Income vs Expenses'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }

    // Update chart data
    function updateChartData() {
        const { income, expenses } = getDataFromInput();
        barChart.data.datasets[0].data = income;
        barChart.data.datasets[1].data = expenses;
        barChart.update();
    }

    // Add event listener to the "Chart" tab
    document.getElementById('chart-tab').addEventListener('click', function () {
        initializeChart();
        updateChartData();
    });


    // Add event listener to the download button
    document.getElementById('downloadChart').addEventListener('click', function () {
        const link = document.createElement('a');
        link.href = barChart.toBase64Image();
        link.download = 'chart.png';
        link.click();
    });
});
const ctx = document.getElementById('eth-chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Ethereum Price (USD)',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [] 
        }]
    },
    pan: {
        enabled: true,
        mode: 'x'
    },
    zoom: {
        enabled: true,
        mode: 'x'
                }
});


const updatePrice = async () => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const response = await fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=7&toTs=${Math.floor(oneWeekAgo / 1000)}`);
        const data = await response.json();
        chart.data.labels = data.Data.Data.map(day => new Date(day.time * 1000).toLocaleDateString());
        chart.data.datasets[0].data = data.Data.Data.map(day => day.close);
        chart.update();
    } catch (error) {
        console.error(error);
    }
};

updatePrice();

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spark Line Chart JS</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, Helvetica, sans-serif;
        }
        .navigation {
            background: var(--clr-one);
            padding: 10px;
            color: #fff;
        }

        .chartBox {
            width: 100%;
        }

        .sparkline {
            height: 50px;
            width: 100%;
            margin-bottom: 10px;
        }

    </style>
</head>

<body>
    <!-- remove title -->
    <div class="navigation"></div>

    <section>
        <div class="chartBox">
            <div class="sparkline">
                <canvas id="myChart"></canvas>
        </ul>
    </section>


    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{// index [0]
                    data: [12, 19, 3, 5, 2, 3],
                    //backgroundColor:'#33b1ff',
                    borderColor: '#33B1FF',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        beginAtZero: true,
                        display: false,
                    }
                },
                Plugin: {
                    legend: {
                        display: false
                    },
                    tooltips: {
                        display: false
                    }
                }
            }
        });

    </script>

</body>

</html>
Chart.register({
    id: 'arrowPlugin',
    afterDatasetsDraw: function(chart) {
        const ctx = chart.ctx;
        const dataset = chart.data.datasets.find(ds => ds.label === 'Tổng chi phí');
        const meta = chart.getDatasetMeta(chart.data.datasets.findIndex(ds => ds.label === 'Tổng chi phí'));

        if (!meta || !meta.data.length) return;

        ctx.save();
        ctx.strokeStyle = '#FFC700';
        ctx.fillStyle = '#FFC700';

        // Kích thước mũi tên thay đổi theo màn hình
        const arrowSize = window.innerWidth < 768 ? 15 : 30;
        ctx.lineWidth = window.innerWidth < 768 ? 2.5 : 5;

        const points = meta.data;
        const lastPoint = points[points.length - 1];

        const yScale = chart.scales.y;
        const targetY = yScale.getPixelForValue(850);
        const startX = lastPoint.x; 
        const endX = lastPoint.x + (window.innerWidth < 768 ? 60 : 110);
        const endY = targetY - (window.innerWidth < 768 ? 60 : 110);

        // Vẽ đường kéo dài
        ctx.beginPath();
        ctx.moveTo(startX, targetY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Tính góc của đoạn thẳng
        const angle = Math.atan2(endY - targetY, endX - startX);

        // Tọa độ các đỉnh của tam giác mũi tên
        const arrowX1 = endX - arrowSize * Math.cos(angle - Math.PI / 6);
        const arrowY1 = endY - arrowSize * Math.sin(angle - Math.PI / 6);
        const arrowX2 = endX - arrowSize * Math.cos(angle + Math.PI / 6);
        const arrowY2 = endY - arrowSize * Math.sin(angle + Math.PI / 6);

        // Vẽ tam giác mũi tên
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(arrowX1, arrowY1);
        ctx.lineTo(arrowX2, arrowY2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
});

const ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['個人開業', 'シェアサロン', "Owner's Salon"],
        datasets: [
            { label: '円収入', data: [230, 610, 900], backgroundColor: '#99379B', order: 1 },
            { label: '出店費用', data: [650, 200, 30], backgroundColor: '#1BADE4', order: 1 },
            { label: '內容費用', data: [0, 54, 200], backgroundColor: '#2384C8', order: 1 },
            { label: '雜費', data: [0, 50, 40], backgroundColor: '#28CCDD', order: 1 },
            { label: '人件費', data: [0, 30, 50], backgroundColor: '#41BA96', order: 1 },
            { label: '補償金(3个月)', data: [0, 200, 100], backgroundColor: '#3C8A50', order: 1 },
            {
                label: 'Tổng chi phí',
                data: [250, 620, 850],
                type: 'line',
                borderColor: '#FFC700',
                backgroundColor: 'transparent',
                borderWidth: 4,
                pointBackgroundColor: '#FFC700',
                pointBorderColor: '#FFC700',
                pointRadius: 5,
                order: 0,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: window.innerWidth < 768 ? 7.48 : 16,
                        weight: 400,
                    },
                    color: "#373338",
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 17,
                    boxHeight: 17,
                    filter: function(item) {
                        return item.text !== "Tổng chi phí";
                    }
                }
            }, 
            arrowPlugin: {} ,
            datalabels: {
                anchor: 'end', 
                align: 'top',    
                color: '#99379B', 
                font: {
                    size: window.innerWidth < 768 ? 10 : 14,
                    weight: 'bold'
                },
                formatter: function(value, context) {
                    if (context.dataset.label === '円収入') {
                        return value;  
                    }
                    return '';  
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: { 
                    font: { size: window.innerWidth < 768 ? 14 : 20, weight: 700 }, 
                    color: "#373338", 
                    padding: window.innerWidth < 768 ? 12 : 30 
                }
            },
            y: {
                stacked: true,
                ticks: { 
                    font: { size: window.innerWidth < 768 ? 6.07 : 16, weight: 400 }, 
                    color: "#373338",
                    stepSize: 200,
                    callback: function(value) {
                        return value <= 1200 ? value : '';
                    }
                },
                grid: {
                    drawBorder: false, 
                    color: function(context) {
                        return context.tick.value % 200 === 0 ? 'rgba(0, 0, 0, 0.2)' : 'transparent';
                    },
                    borderDash: [5, 5], 
                }
            }
        },
        barThickness: window.innerWidth < 768 ? 40 : 56,
    }
});



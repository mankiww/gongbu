var randomScalingFactor = function() {
    return Math.floor(Math.random() * 6);
};

Chart.defaults.global.defaultFontSize = 30;

const memory = document.querySelector("#memory");

var colorNames = ['red', 'blue', 'green', 'purple'];

var randomColorIndex = Math.floor(Math.random() * colorNames.length);
var colorIndex = window.chartColors[colorNames[randomColorIndex]]
var color = Chart.helpers.color;

var groupName;
switch (colorNames[randomColorIndex]) {
    case 'red':
        groupName = "사쿠라모리";
        break;
    case 'blue':
        groupName = "WHE";
        break;
    case 'green':
        groupName = "미루아이";
        break;
    case 'purple':
        groupName = "네코야나기";
}


var config = {
    type: 'radar',
    data: {
        labels: ['Vocal', 'Actor', 'Model', 'Dance', 'Idol', 'Genin'],
        datasets: [{
            label: `${groupName}1`,
            backgroundColor: color(colorIndex).alpha(0.2).rgbString(),
            borderColor: colorIndex,
            pointBackgroundColor: colorIndex,
            fill: true,
            pointRadius: 30,
            pointHoverRadius: 50,
            data: [
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor(),
                randomScalingFactor()
            ]
        }]
    },
    options: {
        tooltips: {
            mode: "dataset",
            callbacks: {
                title: function(tooltipItem, data){
                    return data.datasets[tooltipItem[0]['datasetIndex']]['label']
                }, 
                label: function(tooltipItem, data){
                    return `${data['labels'][tooltipItem.index]}: ${tooltipItem.label}`
                }                
            }                            
        },
        legend: {
            position: 'bottom',
            labels: {fontSize: 14}
        },
        scale: {
            pointLabels: {fontSize: 35},
            ticks: {
                beginAtZero: true,
                stepSize: 1,
                max: 5,
            }
        }
    }
};

window.onload = function() {
    window.myRadar = new Chart(document.getElementById('canvas'), config);
};

document.getElementById('randomizeData').addEventListener('click', function() {
    config.data.datasets.forEach(function(dataset) {
        dataset.data = dataset.data.map(function() {
            return randomScalingFactor();
        });
    });

    window.myRadar.update();
});

var colorNames =  ['red', 'blue', 'green', 'purple'];
		document.getElementById('addDataset').addEventListener('click', function() {
			var randomColorIndex = Math.floor(Math.random() * colorNames.length);
            var newColor = window.chartColors[colorNames[randomColorIndex]]
            
            var groupName;
            switch (colorNames[randomColorIndex]) {
                case 'red':
                    groupName = "사쿠라모리";
                    break;
                case 'blue':
                    groupName = "WHE";
                    break;
                case 'green':
                    groupName = "미루아이";
                    break;
                case 'purple':
                    groupName = "네코야나기";
            }
            
            var groupNumber = config.data.datasets.filter(function(element){
                return element.borderColor === newColor
            })

			var newDataset = {
				label: `${groupName}${groupNumber.length+1}`,
				borderColor: newColor,
				backgroundColor: color(newColor).alpha(0.2).rgbString(),
                pointBackgroundColor: newColor,                    
                fill: true,
                pointRadius: 30,
                pointHoverRadius: 50,             
				data: [],
			};

			for (var index = 0; index < config.data.labels.length; ++index) {
				newDataset.data.push(randomScalingFactor());
			}

			config.data.datasets.push(newDataset);
			window.myRadar.update();
        });
        
    const memo = document.querySelector("#memory");
    
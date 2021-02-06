const nameForm = document.querySelector("#nameCard");
const nameInput = nameForm.querySelector("input");
const nameSelect = document.querySelector("select");
const colorForm = document.querySelector("#colorSelector");
const colorInput = colorForm.querySelector("input");

var randomScalingFactor = function() {
    return Math.floor(Math.random() * 6);
};

Chart.defaults.global.defaultFontSize = 30;

const memory = document.querySelector("#memory");

var colorNames = ['red', 'blue', 'green', 'purple'];

var randomColorIndex = Math.floor(Math.random() * colorNames.length);
var colorIndex = 'skyblue'
var color = Chart.helpers.color;
var groupName = "무명"

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
        responsive: true,
        maintainAspectRatio: false,
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

function paintSelect (){
    while(nameSelect.firstChild !== null){
        nameSelect.removeChild(nameSelect.firstChild);
    }

    config.data.datasets.forEach(function(dataset){
        var dataName = dataset.label;
        console.log(dataName)
        var nameOption = document.createElement("option");
        nameOption.value = dataName;
        nameOption.innerText = dataName;
        nameSelect.appendChild(nameOption);
    })    
}

window.onload = function() {
    window.myRadar = new Chart(document.getElementById('canvas'), config);
    paintSelect()
};

document.getElementById('randomizeData').addEventListener('click', function() {
    var dataIndex = config.data.datasets.findIndex(function(dataset){
        return dataset.label ===nameSelect.value
    });
    
    var dataset = config.data.datasets[dataIndex];
    config.data.datasets[dataIndex].data = dataset.data.map(function() {
            return randomScalingFactor();
        });
    window.myRadar.update();
});

nameForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var dataIndex = config.data.datasets.findIndex(function(dataset){
        return dataset.label ===nameSelect.value
    });
    config.data.datasets[dataIndex].label = nameInput.value;
    window.myRadar.update();
    paintSelect()
})

colorForm.addEventListener("submit", function(event){
    event.preventDefault();    
    var newColor = colorInput.value;
    console.log(newColor);
    var dataIndex = config.data.datasets.findIndex(function(dataset){
        return dataset.label ===nameSelect.value
    }); 
    var dataset = config.data.datasets[dataIndex];
    dataset.backgroundColor = color(newColor).alpha(0.2).rgbString();
    dataset.borderColor = newColor;
    dataset.pointBackgroundColor = newColor;
    window.myRadar.update();
})

var colorNames =  ['red', 'blue', 'green', 'purple'];
		document.getElementById('addDataset').addEventListener('click', function() {
			var randomColorIndex = Math.floor(Math.random() * colorNames.length);
            var newColor = window.chartColors[colorNames[randomColorIndex]]            
            var groupNumber = config.data.datasets.length

			var newDataset = {
				label: `${groupName}${groupNumber+1}`,
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
            
            paintSelect()

        });
        
    const memo = document.querySelector("#memory");
    
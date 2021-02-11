const nameForm = document.querySelector("#nameCard");
const nameInput = nameForm.querySelector("input");
const nameSelect = document.querySelector("select");
const colorForm = document.querySelector("#colorSelector");
const colorInput = colorForm.querySelector("input");
const deleteBtn = document.querySelector("#deleteDataset");

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
            label: '테치',
            backgroundColor: color('darkgreen').alpha(0.2).rgbString(),
            borderColor: 'darkgreen',
            pointBackgroundColor: 'darkgreen',
            fill: true,
            pointRadius: 10,
            pointHoverRadius: 50,
            data: [3, 4, 2, 5, 0, 0]
        }, 
        {
            label: '하루',
            backgroundColor: color('skyblue').alpha(0.2).rgbString(),
            borderColor: 'skyblue',
            pointBackgroundColor: 'skyblue',
            fill: true,
            pointRadius: 10,
            pointHoverRadius: 50,
            data: [3, 1, 4, 4, 5, 2]
        },
        {
            label: '스우',
            backgroundColor: color('pink').alpha(0.2).rgbString(),
            borderColor: 'pink',
            pointBackgroundColor: 'pink',
            fill: true,
            pointRadius: 10,
            pointHoverRadius: 50,
            data: [3, 4, 2, 5, 5, 3]
        }
]

    },
    options: {
        title: {
            display: true,
            text: '夏の夢'
        },
        tooltips: {
            enabled: false
        },
        hover: {
            animationDuration: 0
        },
        animation: {
            duration: 1,
            onComplete: function () {
                var chartInstance = this.chart,
                    ctx = chartInstance.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                this.data.datasets.forEach(function (dataset, i) {
                    var meta = chartInstance.controller.getDatasetMeta(i);
                    meta.data.forEach(function (bar, index) {
                        var data = dataset.data[index];							
                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                        ctx.fillStyle = config.data.datasets[i].borderColor;
                    });
                });
            }
        },
        legend: {
            position: 'bottom',
            backgroundColor: '#fff'
        },
        scale: {
            pointLabels: {fontSize: 35},
            ticks: {
                display: false,
                beginAtZero: true,
                stepSize: 1,
                max: 5,
            }
        },
        chartArea: {
            backgroundColor: '#000000'
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
        

deleteBtn.addEventListener("click", function () {
    var dataIndex = config.data.datasets.findIndex(function(dataset){
        return dataset.label ===nameSelect.value
    }); 
    config.data.datasets.splice(dataIndex, 1);

    window.myRadar.update();
    paintSelect();
    
})
    

const dwbtn = document.querySelector("#download");
dwbtn.addEventListener("click", function() {
    var image = canvas.toDataURL("image/png", 1.0);
    var a = document.createElement('a');
    a.href = image;
    a.download = 'chart.jpg';
    a.click()
})

Chart.plugins.register({
    beforeDraw: function(chartInstance, easing) {
      var ctx = chartInstance.chart.ctx;
      ctx.fillStyle = '#ffffff'
  
      var chartArea = chartInstance.chartArea;
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
    }
  });

/*

AUTHOR: Gretchen Doyle '21.5
Advisor: Jeff Howarth

Script to detect the spectral signature of different objects based on the point
in the landscape that you click on 

*/

//Access script with functions 
var functions = require('users/gldoyle/geog700:functions');


/*----------------------------------------------------------------------------------*/

/****************       PART 1: DEFINE STUDY REGION EXTENT        *******************/

var geometry = 
    ee.Geometry.Point([-121.87278759819331, 37.297181938334084]);
    
var extent = geometry.buffer({'distance': 1000000});


/*----------------------------------------------------------------------------------*/

/****************         PART 2: DEFINE TEMPORAL EXTENT         *******************/
  
//Time window before the fire (generous so you can get best image from stack)
var start1 = "2020-08-01";
var end1 = "2020-08-13";

//Time window after the fire (generous so you can get best image from stack)
var start2 = "2020-10-01";
var end2 = "2020-10-31";

/*----------------------------------------------------------------------------------*/

/***********           PART 3: VISUALIZATION PARAMETERS               ***************/

//True/Narual color visualization params
var trueColorVis = {
  min: -100.0,
  max: 4000.0,
  gamma: 1.4,
  bands: ['B4', 'B3', 'B2'],
};

// False Color composite to reveal fire scars
var falseColorVis = {
  gamma: 1.4,
  max: 4000,
  min: -100,
  bands: ["B7","B5","B4"]
};


/*----------------------------------------------------------------------------------*/

/***********                  PART 5: GATHER IMAGERY                 ***************/

var filterImage = function(startDate, endDate, extent){
  return ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
                    .filterDate(startDate, endDate)
                    .filterBounds(extent)
                    .map(functions.maskL8sr)
                    .median();
};

//Create a before the wildfire and after the wildfire image                   
var landsatImage1 = filterImage(start1, end1, extent);
var landsatImage2 = filterImage(start2, end2, extent);

/*----------------------------------------------------------------------------------*/

/***********                 PART 6: ADD LAYERS TO MAP               ***************/

var map = ui.Map();

map.setOptions("TERRAIN");
map.addLayer(landsatImage1, trueColorVis, 'Natural Color (before)', 1);
map.addLayer(landsatImage1, falseColorVis, 'False Color (before)', 0);
map.setControlVisibility({
  drawingToolsControl:false,
  mapTypeControl: false,
  layerList: false
});
map.setCenter(-121.87278759819331, 37.297181938334084, 9); //Santa Clara

/*----------------------------------------------------------------------------------*/
var landsat_images = ee.ImageCollection([landsatImage1.set({'tag': 't1'}).select(['B2', 'B3', 'B4', 'B5', 'B7']), landsatImage2.set({'tag': 't2'}).select(['B3', 'B4', 'B2', 'B5', 'B7'])]);	


// Initialize Widgets.
// ===================
var panel = ui.Panel({
  style: {
    width: '30%',
    border: '3px solid #ddd',
  }
});

var title = ui.Label({
  value: 'Spectra Explorer',
  style: {
    fontSize: '18px',
    fontWeight: '100',
    padding: '10px',
  }
});

var instructions = ui.Label({
  value: 'Click on the map to show Spectral chart for bands used in the natural and false color composites as well as the dNBR.',
  style: {
    color: 'gray',
    padding: '10px',
  }
});

var guidance = ui.Label({
  value: 'Click on areas where you remember the burn scars were and look at how the band values change. For reference, B2 = blue, B3 = green, B4 = red, B5 = NIR (Near-Infrared), B6 = SWIR (Short-wave infrared).',
  style: {
    color: 'gray',
    padding: '10px',
  }
});

var text = ui.Label({
  value: 'Click on other features in the lanscape (such as water) as well to see how the spectral signature changes.',
  style: {
    color: 'gray',
    padding: '10px',
  }
});

var link = ui.Label(
  'GO BACK TO LESSON',
   {fontSize: '12px'
   }
  );  
    link.setUrl("https://github.com/gldoyle/remotesensing/blob/main/Modules.md");

var chartPanel = ui.Panel();
panel.add(title);
panel.add(instructions);
panel.add(chartPanel);
panel.add(guidance);
panel.add(text);
panel.add(link);


//Show initial point on map which is what the chart uses 
function showPointOnMap(point) {
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  map.layers().set(1, dot);
}

var linker = ui.Map.Linker([ui.root.widgets().get(0), panel]);

var splitPanel = ui.SplitPanel({
  firstPanel: panel,
  secondPanel: map,
});
ui.root.clear();
ui.root.add(splitPanel);

function makeChart(point) {
  var chart = ui.Chart.image.series(landsat_images, point, ee.Reducer.mean(), 200, 'tag');
  chart.setOptions({
    title: 'Spectral Signatures Before and After Wildfire',
    vAxis: {title: 'Band Value'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    chartArea: {backgroundColor: 'EBEBEB'},
    series: {
    0: {color: 'blue'},
    1: {color: 'green'},
    2: {color: 'red'},
    3: {color: 'purple'},
    4: {color: 'orange'}
  },
  });
  chartPanel.clear();
  chartPanel.add(chart);
  
}

//Event handler so that when a point is clicked, the point is displayed and 
//the spectral chart is displayed based off of that point
map.onClick(function(coordinates){
  var point = ee.Geometry.Point([coordinates.lon, coordinates.lat]);
  showPointOnMap(point);
  makeChart(point); 
});

showPointOnMap(point);
makeChart(point); 

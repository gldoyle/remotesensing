/*

AUTHOR: Gretchen Doyle
Advisor: Jeff Howarth


In this tutorial, we look at natural color and false color composites as well
as the difference in Normalized Burn Ratio to demonstrate why you might
want to use band ratios to identify changes in the landscape. 

Case: California 2020 wildfires

*/

// Access script with functions 
var functions = require('users/gldoyle/geog700:functions');

//Choose a point within the area of interest (AOI)
var geometry = 
    ee.Geometry.Point([-122.90323443204238, 39.431080405438294]);
    
//Create a buffer around the AOI
var extent = geometry.buffer({'distance': 100000});


/*-------------- DEFINE TWO TIME WINDOWS -----------------*/


var start = '2014-01-01';
var end = '2014-12-31';

var start2 = '2020-01-01';
var end2 = '2020-12-31';

/*-------------------- GATHER DATA -----------------------*/


var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate(start, end)
                  .filterBounds(extent)
                  .map(functions.maskL8sr)
                  .median();
                  
var dataset2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate(start2, end2)
                  .filterBounds(extent)
                  .map(functions.maskL8sr)
                  .median();
                  
/*---------- DEFINE VISUALIZATION PARAMETERS ------------*/


//Red, green, blue (natural color composite)
var natColorVisParams = {
  bands: ['B4', 'B3', 'B2'], 
  min: 0,
  max: 1500,
  gamma: 1.4, 
};

//Near-Infrared false color composite
var nirVisParams = {
  bands: ['B5', 'B4', 'B3'], 
  min: 0,
  max: 2000,
  gamma: [1.2,1.1,1.4], 
};


/*---------- CREATE dNBR  ------------*/


//Normalized burn ratio for first image
var nbr = dataset.normalizedDifference(['B5', 'B7']);

//Normalized burn ratio for second image
var nbr2 = dataset2.normalizedDifference(['B5', 'B7']);

//Calculate their differnce and scale to USGS standards
var dnbr_init = nbr.subtract(nbr2);
var dnbr = dnbr_init.multiply(1000);

// Define an SLD style of discrete intervals to apply to the image.
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' +
      '<ColorMapEntry color="#7a8737" quantity="-250" label="-250" />' +
      '<ColorMapEntry color="#acbe4d" quantity="-100" label="-100" />' +
      '<ColorMapEntry color="#0ae042" quantity="100" label="100" />' +
      '<ColorMapEntry color="#fff70b" quantity="270" label="270" />' +
      '<ColorMapEntry color="#ffaf38" quantity="440" label="440" />' +
      '<ColorMapEntry color="#ff641b" quantity="660" label="660" />' +
      '<ColorMapEntry color="#a41fd6" quantity="2000" label="2000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';


/*---------- DISPLAY LAYERS ------------*/
Map.addLayer(dataset, natColorVisParams, 'Natural Color', 1);
Map.addLayer(dataset, nirVisParams, 'NIR False Color', 0);
Map.addLayer(dnbr.sldStyle(sld_intervals), {opacity: 0.85}, 'dNBR classified', 0);

//Map.addLayer(ndvi, ndviVisParams, 'ndvi', 0);
Map.setControlVisibility({
  drawingToolsControl:false,
  mapTypeControl: false,
  layerList: false

});

Map.setCenter(-122.90323443204238, 39.431080405438294, 8); 

/*---------- ADD SWIPERS ------------*/

var linkedMap = ui.Map();

var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);

var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});

ui.root.widgets().reset([splitPanel]);

//----------------//----------------//----------------

/*---------- ADD DROPDOWN TO SELECT LAYERS TO DISPLAY ------------*/


var showLayers = function(setting) {
  
  if(setting === 1){
    
    Map.layers().get(0).setShown(true);
    Map.layers().get(1).setShown(false);
    Map.layers().get(2).setShown(false);
    linkedMap.layers().get(0).setShown(true);
    linkedMap.layers().get(1).setShown(false);
    linkedMap.layers().get(2).setShown(false);
    before_label.style().set('shown', true);
    
  } else if(setting === 2){
    
    Map.layers().get(0).setShown(false);
    Map.layers().get(1).setShown(true);
    Map.layers().get(2).setShown(false);
    linkedMap.layers().get(0).setShown(false);
    linkedMap.layers().get(1).setShown(true);
    linkedMap.layers().get(2).setShown(false);
    before_label.style().set('shown', true);

  } else if(setting === 3){
    
    Map.layers().get(0).setShown(false);
    Map.layers().get(1).setShown(false);
    Map.layers().get(2).setShown(true);
    linkedMap.layers().get(0).setShown(false);
    linkedMap.layers().get(1).setShown(true);
    linkedMap.layers().get(2).setShown(false);
    before_label.style().set('shown', false);
  }

};

var layers = {
  "Compare Nat Color Composites" : 1,
  "Compare False Color Composites": 2,
  "Compare dNBR to False Color (both post fire)" : 3
};

var checkStyle = {
   position: 'bottom-left',
    padding: '8px 15px'
    };
    
var select = ui.Select({
  items: Object.keys(layers),
  onChange: function(key) {
    print(layers[key][1]);
    showLayers(layers[key])},
  
  style: checkStyle
});

// Set a place holder (initial text to be displayed on the dropdown)
select.setPlaceholder('Choose layers to compare...');


/*---------- DISPLAY LAYERS PART 2 ------------*/

linkedMap.addLayer(dataset2, natColorVisParams, 'Natural Color', 1);
linkedMap.addLayer(dataset2, nirVisParams, 'NIR False Color', 0);
linkedMap.addLayer(dnbr.sldStyle(sld_intervals), {opacity: 0.85}, 'dNBR classified', 0);

linkedMap.setControlVisibility({
  drawingToolsControl:false,
  mapTypeControl: false,
  layerList: false
});

Map.setCenter(-122.90323443204238, 39.431080405438294, 9); //better fire area

/*---------- ADD LABELS TO THE MAP ------------*/


// Create a 'Before the wildfire' label.
var before_label = ui.Label('Before the wildfire');
before_label.style().set('position', 'bottom-left');
Map.add(before_label);

// Create a 'Before the wildfire' label.
var after_label = ui.Label('After the wildfire');
after_label.style().set('position', 'bottom-right');
linkedMap.add(after_label);

/*--------------- ADD A LEGEND -----------------*/

var dNBRlabels = [
  'High post-fire regrowth',
  'Low post-fire regrowth',
  'Unburned',
  'Low Severity',
  'Moderate-low Severity',
  'Moderate-high Severity',
  'High Severity'];


var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
    }
    });

var legendTitle = ui.Label({
  value: 'Burn Severity',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
  });

// Add the title to the panel
legend.add(legendTitle);

var dNBRpalette = ['#778735', '#a7c04f', '#07e444', '#f6fc0d', '#f7b140', '#f86819', '#a601d4'];

var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
      }
    });
  var description = ui.Label({
    value: name,
    style: {
      margin: '0 0 4px 6px',
      fontSize: '14px'
      }
    });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
    });
};
 
//For each color, add a row to the legend with the palette colorbox and name.
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(dNBRpalette[i], dNBRlabels[i]));
  } 

//Add legend to the map
Map.add(legend);

/*---------- CREATE SIDE PANEL WITH TEXT ------------*/


var header = ui.Label('Exploring Burn Scars Using Natural/False Color Composites and dNBR', {fontSize: '20px', color: 'black'});
var text1 = ui.Label(
    'The goal of this module is to explore the differences between natural color and false color composites in identifying burn scars and how using band indices such as the Difference in Normalized Burn Ratio (dNBR) can help highlight these trends to an even greater degree.',
    {fontSize: '13px'});
var text2 = ui.Label(
    'We will look at another wildfire in California in 2020 and observe which areas experienced the most severe burning.',
    {fontSize: '13px'});
var text3 = ui.Label(
    'Here you see satellite imagery from before the wildfire on the left and imagery from after the wildfire on the right of the slider.',
    {fontSize: '13px'});

    
var text4 = ui.Label(
 'Turn on the dNBR layer on the right to see what a band ratio can look like.',
 {fontSize: '13px'});   
 var link = ui.Label(
  'GO BACK TO LESSON',
   {fontSize: '12px'}
  );  
    link.setUrl("https://github.com/gldoyle/remotesensing/blob/main/Modules.md");
    
var textPanel = ui.Panel([header, text1, text2, text3, text4, select, link], 'flow', {width: '300px'});

ui.root.widgets().add(textPanel);


    




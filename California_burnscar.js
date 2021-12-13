/*

AUTHOR: Gretchen Doyle

Purpose: Use MODIS data to look at burn scars with natural and false color composites
in California

Case: 2020 SCU Lightning Complex California Wildfire

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


//False Color composite to reveal fire scars
var trueColorVis = {
  min: -100.0,
  max: 4000.0,
  gamma: 1.4,
  bands: ['B4', 'B3', 'B2'],
};

var falseColorVis = {
  gamma: 1.4,
  max: 4000,
  min: -100,
  bands: ["B7","B5","B4"]
};


/*----------------------------------------------------------------------------------*/

/***********                  PART 4: GATHER IMAGERY                 ***************/

var filterImage = function(startDate, endDate, extent){
  return ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
                    .filterDate(startDate, endDate)
                    .filterBounds(extent)
                    .map(functions.maskL8sr)
                    .median();
};

// Create two images: one before the wildfire and one after                  
var landsatImage1 = filterImage(start1, end1, extent);
var landsatImage2 = filterImage(start2, end2, extent);


/*----------------------------------------------------------------------------------*/

/***********                 PART 5: ADD LAYERS TO MAP               ***************/
Map.setOptions("TERRAIN");
Map.addLayer(landsatImage1, trueColorVis, 'Natural Color (before)', 1);
Map.addLayer(landsatImage1, falseColorVis, 'False Color (before)', 0);
Map.setControlVisibility({
  drawingToolsControl:false,
  mapTypeControl: false,
  layerList: false
});
Map.setCenter(-121.87278759819331, 37.297181938334084, 9); //Santa Clara

/*----------------------------------------------------------------------------------*/

/***********      PART 6: ADD SWIPE TO MAP TO SHOW TWO VIEWS          ***************/


// Create new linked map 
var linkedMap = ui.Map();

// Link the default Map to the linked map
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);

// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});

// Add splitPanel to your layout 
ui.root.widgets().reset([splitPanel]);

linkedMap.setOptions("TERRAIN");
linkedMap.addLayer(landsatImage2, trueColorVis, 'Natural Color (after)', 1);
linkedMap.addLayer(landsatImage2, falseColorVis, 'False Color (after)', 0);
linkedMap.setControlVisibility({
  drawingToolsControl:false,
  mapTypeControl: false,
  layerList: false
  
});

/*----------------------------------------------------------------------------------*/

/***********      PART 7: ADD WIDGETS TO SIDE PANEL          ***************/


var showFalseColor = function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(1).setShown(checked);
  linkedMap.layers().get(1).setShown(checked);
};

var checkStyle = {
   position: 'top-right',
    padding: '8px 15px'
    };
    
var checkbox = ui.Checkbox('Show False Color Composite', false, showFalseColor, false, checkStyle);


// Create a 'Before the wildfire' label.
var title = ui.Label('Before the wildfire');
title.style().set('position', 'bottom-left');
Map.add(title);

// Create a 'Before the wildfire' label.
var title = ui.Label('After the wildfire');
title.style().set('position', 'bottom-right');
linkedMap.add(title);

// Create text labels to be displayed on the side panel
var header = ui.Label('Exploring Wildfire Effects Using Natural/False Color Composites', {fontSize: '20px', color: 'black'});
var text1 = ui.Label(
    'The goal of this module is to explore the differences between natural color and false color composites in identifying land cover changes.',
    {fontSize: '13px'});
var text2 = ui.Label(
    'In this case we will be looking at burnscars from the 2020 wildfires in California including the SCU Lightning Complex Fires',
    {fontSize: '13px'});
var text3 = ui.Label(
    'Here you see satellite imagery from before the wildfires in California on the left and imagery from the aftermath on the right of the slider.',
    {fontSize: '13px'});
var text4 = ui.Label(
    'Use the slider to look at the burn scars and use the checkbox to choose between the false color and natural color composites.',
    {fontSize: '13px'});
var link = ui.Label(
  'GO BACK TO LESSON',
   {fontSize: '12px'}
  );  
    link.setUrl("https://github.com/gldoyle/remotesensing/blob/main/Modules.md");


var textPanel = ui.Panel([header, text1, text2, text3, text4, checkbox, link], 'flow', {width: '300px'});

ui.root.widgets().add(textPanel);


/*----------------------------------------------------------------------------------*/

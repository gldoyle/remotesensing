# An Exploration in Remote Sensing Techniques: Harnessing the Power of Satellite Imagery to See Beyond the Visible Light Spectrum

[Gretchen Doyle](https://github.com/gldoyle?tab=repositories)<br/>
Middlebury College<br/>
Candidate for BA in Geography/Computer Science  

## Tutorial 1

To begin to appreciate the world beyond the visible light spectrum, we will look at how false color composites can highlight or enhance trends that natural color composites can't capture.

This tutorial is based on Google Earth Engine (GEE) scripts which are suitable for learning remote sensing concepts due to the fact that the platform is open-sourced meaning anyone can access these tools and also because through interaction with these tools, those interested can gain practice in using different spectral bands to visualize the world in new ways.

First, let's look at how we can identify burn scars in landscapes after wildfires. Satellite imagery is often used to track wildfires as they happen, evaluate the extent of the damage in the aftermath of the disaster, and to predict which areas are more susceptible to future wildfires.

## Google Earth Engine Burn Scar Tutorial

In this first tutorial we'll look at Australia after the 2020 bushfires. By interacting
with this GEE script, you'll be able to see what burn scars look like in satellite imagery (in this case, the MODIS dataset)

Below is a link which will take you to Google Earth Engine where you will be able to access the burn scar interactive tool.

Before you navigate to GEE, however, let's discuss what you'll be seeing there.

Here is an image of what the application looks like. The image on the left of the slider represents what the landscape in Australia looked like before the wildfires devastated the region and the right image depicts the landscape post-wildfire. The default display is natural color composites which show what the landscape looks like in the visible light spectrum (which is the section of the Electromagentic Spectrum which the human eye can see). The satellites that acquire images of the Earth also collect information beyond the visible light spectrum which is a powerful way to visualize features since we can use different spectral bands.

<img width="1000" alt="gee" src="https://user-images.githubusercontent.com/63744379/141497446-934ba6c2-b82b-4cc0-ae73-8dc337bc70d5.png">

You can change the layers to display the false color composites which use band combinations beyond the visible light spectrum to help identify features whose spectral signature is more distinct in bands other than those with which our eyes can see.

### Link to code

https://code.earthengine.google.com/?scriptPath=users%2Fgldoyle%2Fgeog700%3Aburnscar

### Questions to consider:
1. What differences do you notice between natural color and false color composites?

## Vegetation Tutorial

Now that you've had a chance to look at burn scars from wildfires we will look at vegetation using natural and false color composites. 






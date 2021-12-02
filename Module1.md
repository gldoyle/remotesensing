# Beyond the Visible Light Spectrum

[Gretchen Doyle](https://github.com/gldoyle?tab=repositories)<br/>
Middlebury College<br/>
Candidate for BA in Geography/Computer Science  

## Introduction

This tutorial is designed for students who are looking to explore the power of **remote sensing** tools through interactive apps which they will be guided through. It was created for students in their late high school or early college career who have limited to no experience with remote sensing but understand the basics of the Electromagnetic Radiation (EMR) and the RGB color model that is used in digital image displays. If you are interested in using the following modules to get a glimpse of some of the things you can do with remote sensing, but don't have this background knowledge- explore those topics and come back here when you're ready!

## Tutorial 1

To begin to appreciate the world beyond the visible light spectrum, we will look at how utilizing image bands beyond the visible light spectrum can enhance trends that are more difficult to pick up on when you are only observing images through the traditional bands (ones that mimick the way our eyes would naturally process visual information). 

Images displaying a combination of visible red, blue and green bands to the corresponding red, blue and greens channels in the digital display is what is referred to in the remote sensing world as a **natural color composite**. Natural color composites are also called true color composites and images displayed using this method look like what the natural world looks like to you.

Below is a natural color composite image of the United States

<img width="642" alt="nat color" src="https://user-images.githubusercontent.com/63744379/143723754-f56bb74a-38e3-44bd-9ffa-fad99307e966.png">


Conversely, a **false color composite** is a multi-spectral image that uses bands other than visible red, green and blue which allows us to visualize wavelengths that the human eye can't see. 

And here is what one false color composite of the United States looks like. 

<img width="635" alt="false color" src="https://user-images.githubusercontent.com/63744379/143723756-2d7f41d6-4bb1-4dab-94cc-ff4a5776cfae.png">

Since false color composites incorporate bands beyond the visible light specturm, there are many combinations of bands which would constitute a false color composite and the combination that people choose to use depends on the feature in the landscape that they are trying to highlight.

In this first tutorial we'll look at how we can identify burn scars in landscapes after wildfires. Satellite imagery is often used to track wildfires as they happen, evaluate the extent of the damage in the aftermath of the disaster, and to predict which areas are more susceptible to future wildfires.

## Burn Scar Tutorial

We will begin by looking at Australia after the 2020 bushfires. By interacting
with this app, you'll be able to see what burn scars look like in satellite imagery.

Below is a link which will redirect you to the burn scar interactive tool.

Before you navigate to the app, however, let's discuss what you'll be seeing there.

Here is what the application looks like. The image on the left of the slider represents what the landscape in Australia looked like before the wildfires devastated the region and the right image depicts the landscape post-wildfire. The default display is natural color composites which show what the landscape looks like in the visible light spectrum (which is the section of the Electromagentic Spectrum which the human eye can see). The satellites that acquire images of the Earth also collect information beyond the visible light spectrum which is a powerful way to visualize features since we can use different spectral bands.

![demo](https://user-images.githubusercontent.com/63744379/143724812-214d1f01-f036-48dd-abbf-3a99a804ccf4.gif)

You can change the layers to display the false color composites which help identify features whose spectral signature is more distinct in bands other than those with which our eyes can see. To do this, navigate to the 'Layers' widget in the upper right corner to turn on different composite layers for each side of the panel. 

In this example, you can see some of the burn scars faintly appear by using the slider to see the before and after images and areas of change. Notice how when you turn on the false color composite layers to visualize the scene before and after the Australian bushfires, the change is more distinct. In this case we are using bands other than the traditional Red, Green and Blue to get a better picture of the burn scars based on their **spectral signatures** (the variation of reflectance of an object on the ground with respect to wavelengths). 

False color composites allow us to visualize wavelengths that the human eye can not see (i.e. near-infrared). Using bands such as near-infrared increases the differences in spectral signatures from various features, which can also us to identify them more easily. Knowledge of the spectral signature of a feature of interest is vital in finding the best visualization for it given a specific satllite image. In this tutorial, the bands for visualizing burn scars in a false color composite have already been chosen for you so you don't have to worry about finding the exact combination to properly identify the scars!

### Link to code
https://gldoyle.users.earthengine.app/view/burnscarexploration

### Burn Scar in California

Now that you've looked at burn scars in the Australian bushfires we are going to take a look at the effects of the SCU Lightning Complex fires in California in 2020. After observing changes in the landscape in the Australia example, see what you notice in this tutorial.

https://gldoyle.users.earthengine.app/view/burnscarcalifornia


### Questions to consider:
1. What differences do you notice between natural color and false color composites (if any)?
2. Do you notice other features aside from burn scars that become either easier or harder to detect with the false color composite?
3. How do you think the bands for the false color composite were chosen?
4. Do you find it easier to idenify burn scars in either the California example or the Australia example? Why do you think this might be?

## Using Band Ratios to Detect Burn Scars

Now that you've had a chance to explore some of the differences between natural and false color composites, we are going to look at how band ratios can show us interesting trends in the landscape. 

In remote sensing, **band indices** such as the **Normalized Difference Vegetation Index (NDVI)**  are combinations of pixel values from 2 or more spectral bands in a multispectral image. They are used to highlight specific aspects of land cover, for example, the NDVI is a good demonstrator of vegetation health. In this tutorial we'll be looking at the **difference in Normalized Burn Ratio (dNBR)** this ratio shows us the difference in burn severity of a landscape over time, in this case, before the wildfire and after the wildfire.

In the following tutorial you'll get to look at natural and false color composites and compare them to the dNBR.


<img width="908" alt="Screen Shot 2021-11-28 at 7 51 01 PM" src="https://user-images.githubusercontent.com/63744379/143793601-40c053d2-c30d-41b8-b524-65ad4f818fab.png">

### Link to code
https://gldoyle.users.earthengine.app/view/burnscarindices

### Questions to consider:
1. What advantages does displaying an dNBR have?
2. What are colors in the dNBR image representing?
3. Why does the dNBR image look so difference from the natural and false color composites?
4. What does bright red represent in the false color composite? (Use clues from the natural color composite layers and think about what the change after the wildfire in the false color composite can tell you about what bright red represents)

## Spectral Signatures

For this last tutorial we will look at spectral signatures of objects 




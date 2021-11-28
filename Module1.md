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

### Natural Color and False Color Composites
The satellite images you'll look at are comprised of pixels which are represented through three values: Red, Green and Blue which are the channels that 
a computer outputs when visualizing the image. The human eye can only see part of the Electromagnetic Spectrum, called the "Visible light spectrum". When we use the red, green and blue bands of the satellite imagery to correspond to the computer's red, green and blue outputs, this is what our eyes would naturally see. Luckily, satellites collect data beyond just the visible light spectrum and we can use that data to gain insight into changes on the ground. This is where false color composites come into play. False color images are multi-spectral images that use bands other than visble red, green and blue as the corresponding red, green and blue components of the computer's image display. 

So why is this useful to us?

Different features on the ground like snow, vegetation and urban areas (to name a few) have different spectral signatures which represent their variation of reflectance of wavelengths. Healthy vegetation, for example, has a notably high reflectance in the Near Infrared section of the Electromagnetic Spectrum so by using bands in that spectral range, we can more easily differentiate healthy vegetation from other features.

False color composites allow us to visualize wavelengths that the human eye can not see (i.e. near-infrared). Using bands such as near infra-red increases the differences in spectral signatures from various features, which can also us to identify them more easily. Knowledge of the spectral signature of a feature of interest is vital in finding the best visualization for it given a specific satllite image. In this tutorial, the bands for visualizing burn scars in a false color 
composite have already been chosen for you so you don't have to worry about finding the exact combination to properly identify the scars!

Now that you've been introducted to false and natural color composites, navigate to the tutorial and see what you find.

### Link to code
<div>
<figure class="video_container">
<iframe src="https://gldoyle.users.earthengine.app/view/burnscarexploration" ></iframe>
</figure>
</div>

### Questions to consider:
1. What differences do you notice between natural color and false color composites (if any)?
2. Do you notice other features aside from burn scars that become either easier or harder to detect with the false color composite?
3. How do you think the bands for the false color composite were chosen?

## Vegetation Tutorial

Now that you've had a chance to look at burn scars from wildfires we will look at vegetation using natural and false color composites. In this tutorial we will also look at the Normalized Difference Vegetation Index (NDVI).

In remote sensing, band indices such as NDVI are combinations of pixel values from 2 or more spectral bands in a multispectral image. They are used to highlight specific aspects of land cover, for example, the NDVI is a good demonstrator of vegetation health.

In the following tutorial you'll get to look at natural and false color composites in a new context, and you'll also get to explore a new concept.

<img width="1063" alt="Screen Shot 2021-11-21 at 12 38 26 PM" src="https://user-images.githubusercontent.com/63744379/142772935-828225ad-b568-4e3f-9bba-814d4740a546.png">

### Link to code
https://gldoyle.users.earthengine.app/view/vegetationtutorial

### Questions to consider:
1. What advantages does displaying an NDVI have?
2. What are colors in the NDVI image representing?
3. Why does the NDVI image look so difference from the natural and false color composites?
4. What does bright red represent in the false color composite?
5. Do you notice changes in the Amazon from 2014 to 2020?

If you are interested in looking at different regions, use the tutorial as a base and use zoom/pan to find a particular region to look at! One future investigation could be to look at how the NDVI shows differences between tropical places like the Amazon versus more arid places like countries in Northern Africa.



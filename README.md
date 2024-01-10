# Interactive Web Visualizations Dashboard

## Overview

This project utilizes the D3 library to create an interactive web dashboard that visualizes biological data from `samples.json`. The dashboard includes a horizontal bar chart, a bubble chart, and sample metadata. The goal is to provide a user-friendly interface to explore the top OTUs (Operational Taxonomic Units) found in an individual's samples.

## Instructions

### Data Retrieval:

- The data is loaded from the following URL: [samples.json](https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json) using the D3 library.

### Bar Chart:

- Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in an individual's samples.
- Use `sample_values` as the values for the bar chart.
- Use `otu_ids` as the labels for the bar chart.
- Use `otu_labels` as hovertext for the chart.

### Bubble Chart:

- Create a bubble chart to display each sample.
- Use `otu_ids` for the x values.
- Use `sample_values` for the y values.
- Use `sample_values` for the marker size.
- Use `otu_ids` for the marker colors.
- Use `otu_labels` for the text values.

### Sample Metadata:

- Display an individual's demographic information (sample metadata).
- Display each key-value pair from the metadata JSON object somewhere on the page.

### Plot Updates:

- Update all the plots dynamically when a new sample is selected from the dropdown menu.

### Layout:

- You are welcome to create any layout that suits your design preferences for the dashboard.

## Usage

1. Open the HTML file in a web browser.
2. Use the dropdown menu to select a specific sample.
3. Explore the visualizations, including the horizontal bar chart, bubble chart, and sample metadata.
4. The charts will update automatically when a new sample is selected.
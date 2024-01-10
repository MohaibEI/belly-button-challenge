var data;

// HTML selectors
var inputSelector = d3.select("#selDataset");
var demoInfoPanel = d3.select("#sample-metadata");
var barChart = d3.select("#bar");
var bubbleChart = d3.select("#bubble");
var gaugeChart = d3.select("#gauge");

// Function to initialize the dashboard
function init() {
    // Load data from the JSON file
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (jsonData) {
        data = jsonData;

        // Populate the dropdown menu
        populateDropdown();

        // Display default charts and metadata
        updateCharts(data.names[0]);
    });
}

// Function to populate the dropdown menu
function populateDropdown() {
    data.names.forEach(function (name) {
        inputSelector.append("option").text(name).property("value", name);
    });
}

console.log

// Function to update all charts and metadata based on selected sample
function updateCharts(selectedSample) {
    // Filter data for the selected sample
    var selectedData = data.samples.find(function (sample) {
        return sample.id == selectedSample;
    });

    // Update the bar chart
    updateBarChart(selectedData);

    // Update the bubble chart
    updateBubbleChart(selectedData);

    // Display metadata for the selected sample
    displayMetadata(selectedSample);
}

function updateBarChart(selectedData) {
    var trace = {
        x: selectedData.sample_values.slice(0, 10).reverse(),
        y: selectedData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
        text: selectedData.otu_labels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
    };

    var layout = {
        title: "Top 10 OTUs Found",
        yaxis: { title: "OTU Labels" },
        xaxis: { title: "Values" }
    };

    Plotly.newPlot("bar", [trace], layout);
}

console.log

// Function to update the bubble chart
function updateBubbleChart(selectedData) {
    var trace = {
        x: selectedData.otu_ids,
        y: selectedData.sample_values,
        mode: 'markers',
        text: selectedData.otu_labels,
        marker: {
            size: selectedData.sample_values,
            color: selectedData.otu_ids,
            colorscale: 'Earth'
        }
    };

    var layout = {
        showlegend: false,
        height: 600,
        width: 1500,
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Values" },
        title: "Bubble Chart"
    };

    Plotly.newPlot('bubble', [trace], layout);
}

console.log

// Function to display metadata for the selected sample
function displayMetadata(selectedSample) {
    // Clear previous metadata
    demoInfoPanel.html("");

    // Find metadata for the selected sample
    var selectedMetadata = data.metadata.find(function (metadata) {
        return metadata.id == selectedSample;
    });

    // Display each key-value pair from the metadata
    Object.entries(selectedMetadata).forEach(function ([key, value]) {
        var formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
        demoInfoPanel.append("h6").text(`${formattedKey}: ${value}`);
    });
}

// Event handler for dropdown change
function optionChanged(selectedSample) {
    // Update charts and metadata based on the selected sample
    updateCharts(selectedSample);
}

// Initialize the dashboard
init();

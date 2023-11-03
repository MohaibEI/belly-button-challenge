// Read the Data

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function getData() {
    // Read the data from the URL
    d3.json(url).then(function(data) {
        // Extract the relevant data for the charts (ex. sample_values, otu_ids, otu_labels)
        let sampleValues = data.samples[0].sample_values;
        let otuIds = data.samples[0].otu_ids;
        let otuLabels = data.samples[0].otu_labels;

        // Call the functions to create the bar chart and bubble chart
        createBarChart(sampleValues, otuIds, otuLabels);
        createBubbleChart(otuIds, sampleValues, otuLabels);
    });
}

// Create ther bar chart

function createBarChart(sampleValues, otuIds, otuLabels) {
    // Extract the top 10 values, labels, and IDs
    let top10SampleValues = sampleValues.slice(0, 10).reverse();
    let top10OtuIds = otuIds.slice(0, 10).reverse();
    let top10OtuLabels = otuLabels.slice(0, 10);

    // Create a trace for the bar chart
    let barTrace = {
        x: top10SampleValues,
        y: top10OtuIds.map(id => `OTU ${id}`),
        text: top10OtuLabels,
        type: 'bar',
        orientation: 'h',
    };

    // Create a data array for the bar chart
    let barData = [barTrace];

    // Define the layout for the bar chart
    let barLayout = {
        title: "Top 10 OTUs",
        xaxis: { title: 'Sample Values' },
        yaxis: { title: 'OTU IDs' },
    };

    // Craete the bar chart
    Plotly.newPlot('bar', barData, barLayout);
}

// Create the bubble chart

function createBubbleChart(otuIds, sampleValues, otuLabels) {
    // Create a trace for the bubble chart
    let bubbleTrace = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: otuIds,
            colorscale: 'Red',
        },
    };

    // Create a data array for the bubble chart
    let bubbleData = [bubbleTrace];

    // Define the layout for the bubble chart
    let bubbleLayout = {
        title: 'OTU Bubble Chart',
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' },
    };

    // Create the bubble chart
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
}

function updateCharts(selectedIndividual) {
}


// Fetch the data and populate the dropdown
function getData() {
    d3.json(url).then(function(data) {
        const sampleDropdown = d3.select("#sample-dropdown");

        data.names.forEach(sample => {
            sampleDropdown
                .append("option")
                .attr("value", sample)
                .text(`Sample ${sample}`);
        });

        // Call a function to load initial data
        loadSampleData(data.names[0]);
    });
}

// Load data for a selected sample
function loadSampleData(sampleId) {
    // Fetch metadata and data for the selected sample
    d3.json(url).then(function(data) {
        const metadata = data.metadata.find(entry => entry.id === sampleId);
        const sampleData = data.samples.find(entry => entry.id === sampleId);

        // Display metadata and create/update plots
        displayMetadata(metadata);
        createBarChart(sampleData);
        createBubbleChart(sampleData);
    });
}

// Display metadata in the HTML
function displayMetadata(metadata) {
    const metadataDiv = d3.select("#sample-metadata");
    metadataDiv.html(""); // Clear previous metadata

    Object.entries(metadata).forEach(([key, value]) => {
        metadataDiv.append("p").text(`${key}: ${value}`);
    });
}

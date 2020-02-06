function buildmetadata(sample) {
  d3.json("samples.json").then(data => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(
      sampleobject => sampleobject.id == sample
    );
    var result = resultArray[0];
    var panel = document.getElementById("#sample-metadata");
    if (panel) {
      panel.innerHTML("");
    }

    Object.entries(result).forEach(([key, value]) => {
      if (panel) panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

function buildchart(sample) {
  d3.json("samples.json").then(data => {
    var metadata = data.samples;
    var resultArray = metadata.filter(
      sampleobject => sampleobject.id == sample
    );
    var result = resultArray[0];
    var otu_ids = result.otu_id;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    console.log(result);
    var bubbleLayout = {
      title: "Bacteria Culture Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30 }
    };
    // var yticks = otu_ids
    //   .slice(0, 10)
    //   .map(otuID => `OTU ${otuID}`)
    //   .reverse();
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: otu_ids,
          colorScale: "Earth"
        }
      }
    ];
    var bubble = document.getElementById("bubble");
    Plotly.newPlot(bubble, bubbleData, bubbleLayout);
    console.log(bubble);
  });
}

function init() {
  var selector = d3.select("#selDataset");
  d3.json("samples.json").then(data => {
    var sampleNames = data.names;
    sampleNames.forEach(sample => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    var firstSample = sampleNames[0];
    buildchart(firstSample);
    buildmetadata(firstSample);
  });
}

function optionChanged(newSample) {
  buildchart(newSample);
  buildmetadata(newSample);
}

init();

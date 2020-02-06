function buildmetadata(sample) {
  d3.json("samples.json").then(data => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(
      sampleobject => sampleobject.id == sample
    );
    var result = resultArray[0];
    var panel = d3.select("#sample-metadata");
    panel.html("");
    object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
    console.log("buildmetadata");
  });
}

function buildchart(sample) {
  d3.json("samples.json").then(data => {
    var metadata = data.samples;
    var resultArray = metadata.filter(
      sampleobject => sampleobject.id == sample
    );
    console.log("buildchart");
    var result = resultArray[0];
    var otu_id = result.otu_id;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    var bubbleLayout = {
      title: "Bacteria Culture Per Sample",
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" },
      margin: { t: 30 }
    };
    var yticks = otu_ids
      .slice(0, 10)
      .map(otuID => `OTU ${otuID}`)
      .reverse();
    var bubbleData = [
      {
        x: otu_id,
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
    Plotly.newPlot("bubble", bubbleData, "bubbleLayout");
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

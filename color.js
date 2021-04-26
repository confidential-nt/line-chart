export function colorChangeListner(chart) {
  const inputs = document.querySelectorAll("[type=color]");
  inputs.forEach((input) =>
    input.addEventListener("input", (e) => {
      setGraphColor(chart, e);
    })
  );
}

function setGraphColor(chart, e) {
  const { target } = e;

  if (target.id === "line") {
    chart.linesColor = target.value;
  }
  if (target.id === "inner") {
    const rgb = hexToRGB(target.value);
    chart.linesInnerColor = `rgba(${rgb},0.3)`;
  }

  chart.eraseAll();
  chart.drawChart();
}

function hexToRGB(hex) {
  const [r, g, b] = hex.match(/\w\w/g).map((value) => parseInt(value, 16));

  return `${r},${g},${b}`;
}

import LineChart from "./line-chart.js";
import { getData } from "./data.js";
import { colorChangeListener } from "./color.js";

const canvasHeight = 600;
const canvasWidth = 700;
const targetId = "#chart";

const dataLength = 6;

try {
  // const data = getData(dataLength);
  const data = [
    { label: "tomato", value: 13 },
    { label: "orange", value: 43 },
    { label: "apple", value: 55 },
    { label: "banana", value: 40 },
    { label: "strawberry", value: 60 },
    { label: "grapes", value: 73 },
  ];
  const chart = new LineChart(canvasWidth, canvasHeight, data, targetId);
  colorChangeListener(chart);
} catch (error) {
  console.log(error);
}

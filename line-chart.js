class LineChart {
  constructor(canvasWidth, canvasHeight, data, id) {
    this.setCanvasParameters(canvasWidth, canvasHeight, data, id);
    this.setChartParameters();
    this.preferBasicSettings();
    this.drawChart();
  }

  setCanvasParameters(canvasWidth, canvasHeight, data, id) {
    this.width = canvasWidth;
    this.height = canvasHeight;
    this.data = data;
    this.targetId = id;
  }

  setChartParameters() {
    this.axisWidth = "2px";
    this.axisColor = "#000";

    this.xAxisLabelTextAlign = "center";
    this.xAxisLabelFontSize = 14;
    this.xAxisLabelFontFamliy = "sans-serif";
    this.xAxisLabelBaseline = "top";
    this.xAxisLabelFontColor = "#000";

    this.yAxisLabelTextAlign = "end";
    this.yAxisLabelFontSize = 14;
    this.yAxisLabelFontFamliy = "sans-serif";
    this.yAxisLabelBaseline = "middle";
    this.yAxisLabelFontColor = "#000";

    this.guideLineWidth = "1px";
    this.guideLineColor = "rgba(0,0,0,0.1)";

    this.linesColor = "hotpink";
    this.linesJoinStyle = "round";

    this.linesInnerColor = "rgba(245, 200, 250,0.3)";

    this.valueMarkerRadius = 4;
    this.valueMarkerStrokeColor = "#f00";
    this.valueMarkerFillColor = "rgba(255,0,0,0.2)";
  }

  preferBasicSettings() {
    this.setCanvas();
    this.handleData();
    this.setValueRange();
    this.setChartSize();
  }

  drawChart() {
    this.drawXAxis();
    this.drawXAxisLabels();

    this.drawYAxis();
    this.drawYAxisLabels();

    this.drawVerticalGuideLines();
    this.drawHorizontalGuideLines();

    this.drawLines();
    this.fillLinesInner();
    this.drawValueMarker();
  }

  setCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;

    const container = document.querySelector(this.targetId);

    container.innerHTML = ``;
    container.appendChild(canvas);

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
  }

  handleData() {
    this.itemsNum = this.data.length;

    const labels = this.data.map((el) => el.label);
    const values = this.data.map((el) => el.value);

    this.labels = labels;
    this.values = values;
  }

  setValueRange() {
    this.maxValue = Math.max.apply(null, this.values);
    this.ceiledMaxValue = Math.ceil(this.maxValue * 0.1) * 10;
  }

  setChartSize() {
    this.ratio = 0.8;
    this.xAxisLength = this.width * this.ratio;
    this.yAxisLength = this.height * this.ratio;

    this.horizontalMargin = (this.width - this.xAxisLength) / 2;
    this.verticalMargin = (this.height - this.yAxisLength) / 2;

    this.yAxisMarkFreq = 10;
    this.yAxisLabelDrawGap = this.yAxisLength / this.yAxisMarkFreq;
    this.yAxisLabelNumGap = Math.floor(
      this.ceiledMaxValue / this.yAxisMarkFreq
    );

    this.xAxisMarkFreq = this.itemsNum - 1;
    this.xAxisLabelDrawGap = this.xAxisLength / this.xAxisMarkFreq;
  }

  drawXAxis() {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.axisLineWidth;
    this.ctx.strokeStyle = this.axisColor;
    this.ctx.moveTo(
      this.horizontalMargin,
      this.verticalMargin + this.yAxisLength
    );
    this.ctx.lineTo(
      this.horizontalMargin + this.xAxisLength,
      this.verticalMargin + this.yAxisLength
    );
    this.ctx.stroke();
  }

  drawXAxisLabels() {
    this.ctx.textAlign = this.xAxisLabelTextAlign;
    this.ctx.textBaseline = this.xAxisLabelBaseline;
    this.ctx.font = `${this.xAxisLabelFontSize}px ${this.xAxisLabelFontFamliy}`;
    this.ctx.fillStyle = this.yAxisLabelFontColor;

    for (let i = 0; i < this.itemsNum; i++) {
      this.ctx.fillText(
        this.labels[i].toUpperCase(),
        this.horizontalMargin + i * this.xAxisLabelDrawGap,
        this.verticalMargin +
          this.yAxisLength +
          this.verticalMargin * (1 - this.ratio)
      );
    }
  }

  drawYAxis() {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.axisLineWidth;
    this.ctx.strokeStyle = this.axisColor;
    this.ctx.moveTo(this.horizontalMargin, this.verticalMargin);
    this.ctx.lineTo(
      this.horizontalMargin,
      this.verticalMargin + this.yAxisLength
    );
    this.ctx.stroke();
  }

  drawYAxisLabels() {
    this.ctx.textAlign = this.yAxisLabelTextAlign;
    this.ctx.textBaseline = this.yAxisLabelBaseline;
    this.ctx.font = `${this.yAxisLabelFontSize}px ${this.yAxisLabelFontFamliy}`;
    this.ctx.fillStyle = this.yAxisLabelFontColor;

    for (let i = 0; i <= this.yAxisMarkFreq; i++) {
      this.ctx.fillText(
        this.ceiledMaxValue - i * this.yAxisLabelNumGap,
        this.horizontalMargin - this.horizontalMargin * (1 - this.ratio),
        this.verticalMargin + i * this.yAxisLabelDrawGap
      );
    }
  }

  drawVerticalGuideLines() {
    this.ctx.lineWidth = this.guideLineWidth;
    this.ctx.strokeStyle = this.guideLineColor;
    for (let i = 0; i <= this.yAxisMarkFreq; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.horizontalMargin - this.horizontalMargin * (1 - this.ratio),
        this.verticalMargin + i * this.yAxisLabelDrawGap
      );
      this.ctx.lineTo(
        this.horizontalMargin + this.xAxisLength,
        this.verticalMargin + i * this.yAxisLabelDrawGap
      );
      this.ctx.stroke();
    }
  }

  drawHorizontalGuideLines() {
    this.ctx.lineWidth = this.guideLineWidth;
    this.ctx.strokeStyle = this.guideLineColor;
    for (let i = 0; i <= this.itemsNum; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(
        this.horizontalMargin + i * this.xAxisLabelDrawGap,
        this.verticalMargin
      );
      this.ctx.lineTo(
        this.horizontalMargin + i * this.xAxisLabelDrawGap,
        this.verticalMargin +
          this.yAxisLength +
          this.verticalMargin * (1 - this.ratio)
      );
      this.ctx.stroke();
    }
  }

  drawLines() {
    this.ctx.strokeStyle = this.linesColor;
    this.ctx.lineJoin = this.linesJoinStyle;
    let alpha;
    const xStep = 20;
    const yStep = 10;
    let start = false;
    this.ctx.beginPath();

    for (let i = 0; i < this.xAxisMarkFreq; i++) {
      const [startX, startY] = [
        this.horizontalMargin + i * this.xAxisLabelDrawGap,
        this.verticalMargin +
          this.yAxisLength -
          this.yAxisLabelDrawGap * (this.values[i] / this.yAxisLabelNumGap),
      ];
      const [endX, endY] = [
        this.horizontalMargin + (i + 1) * this.xAxisLabelDrawGap,
        this.verticalMargin +
          this.yAxisLength -
          this.yAxisLabelDrawGap * (this.values[i + 1] / this.yAxisLabelNumGap),
      ];

      const slope = (endY - startY) / (endX - startX);

      if (slope > 0) {
        alpha = -1;
      } else {
        alpha = 1;
      }

      const [controlX, controlY] = [
        (startX + endX) / 2 - xStep * alpha,
        (startY + endY) / 2 - yStep,
      ];

      if (!start) {
        this.ctx.moveTo(startX, startY);
        start = true;
      }
      this.ctx.quadraticCurveTo(controlX, controlY, endX, endY);
      this.ctx.stroke();
    }
  }

  fillLinesInner() {
    let alpha;
    const xStep = 20;
    const yStep = 10;

    const region = new Path2D();

    let start = false;

    for (let i = 0; i < this.xAxisMarkFreq; i++) {
      const [startX, startY] = [
        this.horizontalMargin + i * this.xAxisLabelDrawGap,
        this.verticalMargin +
          this.yAxisLength -
          this.yAxisLabelDrawGap * (this.values[i] / this.yAxisLabelNumGap),
      ];
      const [endX, endY] = [
        this.horizontalMargin + (i + 1) * this.xAxisLabelDrawGap,
        this.verticalMargin +
          this.yAxisLength -
          this.yAxisLabelDrawGap * (this.values[i + 1] / this.yAxisLabelNumGap),
      ];

      const slope = (endY - startY) / (endX - startX);

      if (slope > 0) {
        alpha = -1;
      } else {
        alpha = 1;
      }

      const [controlX, controlY] = [
        (startX + endX) / 2 - xStep * alpha,
        (startY + endY) / 2 - yStep,
      ];

      if (!start) {
        region.moveTo(startX, startY);
        start = true;
      }
      region.quadraticCurveTo(controlX, controlY, endX, endY);
    }

    region.lineTo(
      this.horizontalMargin + this.xAxisLength,
      this.verticalMargin + this.yAxisLength
    );
    region.lineTo(
      this.horizontalMargin,
      this.verticalMargin + this.yAxisLength
    );
    region.lineTo(
      this.horizontalMargin,
      this.verticalMargin +
        this.yAxisLength -
        this.yAxisLabelDrawGap * (this.values[0] / this.yAxisLabelNumGap)
    );
    region.closePath();

    this.ctx.fillStyle = this.linesInnerColor;
    this.ctx.fill(region);
  }

  drawValueMarker() {
    this.ctx.strokeStyle = this.valueMarkerStrokeColor;
    this.ctx.fillStyle = this.valueMarkerFillColor;
    for (let i = 0; i < this.itemsNum; i++) {
      const x = this.horizontalMargin + i * this.xAxisLabelDrawGap;
      const y =
        this.verticalMargin +
        this.yAxisLength -
        this.yAxisLabelDrawGap * (this.values[i] / this.yAxisLabelNumGap);

      this.ctx.beginPath();
      this.ctx.arc(x, y, this.valueMarkerRadius, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fill();
    }
  }

  eraseAll() {
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}

export default LineChart;

//앞으로 할거: input으로 그래프 선, 안에 채우는 색깔 지정하게 하기, 마커에 마우스 올리면 value와 label 알려주는 거..

// Import the library
const canvasSketch = require("canvas-sketch");

//canvas the size of browser window
const clientWidth = document.documentElement.clientWidth;
const clientHeight = document.documentElement.clientHeight;

// console.log(clientWidth, clientHeight);

const settings = {
  dimensions: [clientWidth, clientHeight],
  // animate: true,
};

// Start the sketch
const sketch = () => {
  let x, y, w, h, size;
  return (props) => {
    // Destructure what we need from props
    const { context, width, height } = props;
    context.fillStyle = "#202521";
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "aqua";

    x = width * 0.5;
    y = height * 0.5;
    w = width * 0.65;
    h = height * 0.5;

    context.save();
    rectCorners = drawBaseRect({ context, x, y, w, h });

    console.log(rectCorners);
    context.restore();

    connectEdges({ context, rectCorners, width, height });
  };
};

//draw lines to connect corners of rectangle to canvas
const connectEdges = ({ context, rectCorners, width, height }) => {
  context.strokeStyle = "#FF69B4";

  const canvasCorners = {
    tl: { x: 0, y: 0 },
    tr: { x: width, y: 0 },
    bl: { x: 0, y: height },
    br: { x: width, y: height },
  };

  const connectCorners = (rectCorner, canvasCorner) => {
    context.beginPath();
    context.moveTo(canvasCorner.x, canvasCorner.y);
    context.lineTo(rectCorner.x, rectCorner.y);
    context.stroke();
  };

  connectCorners(rectCorners.tl, canvasCorners.tl);
  connectCorners(rectCorners.tr, canvasCorners.tr);
  connectCorners(rectCorners.bl, canvasCorners.bl);
  connectCorners(rectCorners.br, canvasCorners.br);
};

//draw the rectangle and crosshairs
const drawBaseRect = ({ context, x, y, w, h }) => {
  context.strokeStyle = "aqua";
  context.translate(x, y);
  context.translate(w * -0.5, h * -0.5);

  //get rectangle corner points & save to object
  const rectCorners = {
    tl: context.getTransform().transformPoint({ x: 0, y: 0 }),
    tr: context.getTransform().transformPoint({ x: w, y: 0 }),
    bl: context.getTransform().transformPoint({ x: 0, y: h }),
    br: context.getTransform().transformPoint({ x: w, y: h }),
  };

  //draw
  //rectangle
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(w, 0);
  context.lineTo(w, h);
  context.lineTo(0, h);
  context.closePath();
  context.stroke();

  //horizontal line
  context.beginPath();
  context.moveTo(0, h * 0.5);
  context.lineTo(w, h * 0.5);
  context.closePath();
  context.stroke();

  //vert line
  context.beginPath();
  context.moveTo(w * 0.5, 0);
  context.lineTo(w * 0.5, h);
  context.closePath();
  context.stroke();

  return rectCorners;
};

canvasSketch(sketch, settings);

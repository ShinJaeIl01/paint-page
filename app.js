const $ref = {
  painting: false,
  canvas: document.getElementById('jsCanvas'),
  ctx: document.getElementById('jsCanvas').getContext('2d'),
  colors: document.getElementsByClassName('jsColor'),
  range: document.getElementById('jsRange'),
  mode: document.getElementById('jsMode'),
  filling: false,
  CANVAS_SIZE: 640,
  INITIAL_COLOR: '#2c2c2c'
}

//function
//function
function startPainting() {
  $ref.painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!$ref.painting) {
    $ref.ctx.beginPath();
    $ref.ctx.moveTo(x, y);
  } else {
    $ref.ctx.lineTo(x, y);
    $ref.ctx.stroke();
  }
}
function stopPainting(event) {
  $ref.painting = false;
}
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  $ref.ctx.strokeStyle = color;
  $ref.ctx.fillStyle = color;
}
function handleRangeChange(event) {
  const size = event.target.value
  $ref.ctx.lineWidth = size;
}
function handleModeChange() {
  if($ref.filling === true) {
    $ref.filling = false;
    $ref.mode.innerText = 'fill'
  } else {
    $ref.filling = true;
    $ref.mode.innerText = 'paint'
  }
}
function handleCanvasClick() {
  if($ref.filling) {
    console.log($ref.filling)
    $ref.ctx.fillRect(0, 0, $ref.CANVAS_SIZE, $ref.CANVAS_SIZE)
  }
}


if($ref.canvas) {
  $ref.canvas.addEventListener('mousemove', onMouseMove);
  $ref.canvas.addEventListener('mousedown', startPainting);
  $ref.canvas.addEventListener('mouseup', stopPainting);
  $ref.canvas.addEventListener('mouseleave', stopPainting);
  $ref.canvas.addEventListener('click', handleCanvasClick);
}

if($ref.range) {
  $ref.range.addEventListener('input', handleRangeChange)
}

if($ref.mode) {
  $ref.mode.addEventListener('click', handleModeChange)
}

$ref.canvas.width = $ref.CANVAS_SIZE;
$ref.canvas.height = $ref.CANVAS_SIZE;
$ref.ctx.strokeStyle = $ref.INITIAL_COLOR;
$ref.ctx.fillStyle = $ref.INITIAL_COLOR;
$ref.ctx.lineWidth = 1.0;

Array.from($ref.colors).forEach(color => color.addEventListener('click', handleColorClick))
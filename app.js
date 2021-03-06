const $ref = {
  painting: false,
  canvas: document.getElementById('jsCanvas'),
  ctx: document.getElementById('jsCanvas').getContext('2d'),
  colors: document.getElementsByClassName('jsColor'),
  range: document.getElementById('jsRange'),
  modeBtn: document.getElementById('jsMode'),
  saveBtn: document.getElementById('jsSave'),
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
  const size = event.target.value;
  $ref.ctx.lineWidth = size;
}
function handleModeChange() {
  if($ref.filling === true) {
    $ref.filling = false;
    $ref.modeBtn.innerText = 'fill';
  } else {
    $ref.filling = true;
    $ref.modeBtn.innerText = 'paint';
  }
}
function handleCanvasClick() {
  if($ref.filling) {
    $ref.ctx.fillRect(0, 0, $ref.CANVAS_SIZE, $ref.CANVAS_SIZE);
  }
}
function handleCM(event) {
  event.preventDefault();
}
function handleSaveClick() {
  const image = $ref.canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'MyWork >_<';
  link.click();
}


if($ref.canvas) {
  $ref.canvas.addEventListener('mousemove', onMouseMove);
  $ref.canvas.addEventListener('mousedown', startPainting);
  $ref.canvas.addEventListener('mouseup', stopPainting);
  $ref.canvas.addEventListener('mouseleave', stopPainting);
  $ref.canvas.addEventListener('click', handleCanvasClick);
  $ref.canvas.addEventListener('contextmenu', handleCM);
}

if($ref.range) {
  $ref.range.addEventListener('input', handleRangeChange);
}

if($ref.modeBtn) {
  $ref.modeBtn.addEventListener('click', handleModeChange);
}

if($ref.saveBtn) {
  $ref.saveBtn.addEventListener('click', handleSaveClick);
}

$ref.canvas.width = $ref.CANVAS_SIZE;
$ref.canvas.height = $ref.CANVAS_SIZE;
$ref.ctx.fillStyle = 'white';
$ref.ctx.fillRect(0, 0, $ref.CANVAS_SIZE, $ref.CANVAS_SIZE)
$ref.ctx.strokeStyle = $ref.INITIAL_COLOR;
$ref.ctx.fillStyle = $ref.INITIAL_COLOR;
$ref.ctx.lineWidth = 1.0;

Array.from($ref.colors).forEach(color => color.addEventListener('click', handleColorClick));
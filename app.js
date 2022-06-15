const $ref = {
  painting: false,
  canvas: document.getElementById('jsCanvas'),
  ctx: document.getElementById('jsCanvas').getContext('2d'),
  colors: document.getElementsByClassName('jsColor'),
  range: document.getElementById('jsRange'),
  mode: document.getElementById('jsMode'),
  filling: false
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


if($ref.canvas) {
  $ref.canvas.addEventListener('mousemove', onMouseMove);
  $ref.canvas.addEventListener('mousedown', startPainting);
  $ref.canvas.addEventListener('mouseup', stopPainting);
  $ref.canvas.addEventListener('mouseleave', stopPainting);
}

if($ref.range) {
  $ref.range.addEventListener('input', handleRangeChange)
}

if($ref.mode) {
  $ref.mode.addEventListener('click', handleModeChange)
}

$ref.canvas.width = 640;
$ref.canvas.height = 640;
$ref.ctx.strokeStyle = '##2c2c2c';
$ref.ctx.lineWidth = 1.0;

Array.from($ref.colors).forEach(color => color.addEventListener('click', handleColorClick))
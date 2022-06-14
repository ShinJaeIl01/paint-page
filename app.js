const $ref = {
  canvas: document.getElementById('jsCanvas'),
  ctx: document.getElementById('jsCanvas').getContext('2d')
}

painting = false;

//function
//function
function startPainting() {
  painting = true;
}
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) {
    $ref.ctx.beginPath();
    $ref.ctx.moveTo(x, y);
  } else {
    $ref.ctx.lineTo(x, y);
    $ref.ctx.stroke();
  }
}
function stopPainting(event) {
  painting = false;
}
function onMouseDown(event) {
  painting = true;
}


if($ref.canvas) {
  $ref.canvas.addEventListener('mousemove', onMouseMove);
  $ref.canvas.addEventListener('mousedown', startPainting);
  $ref.canvas.addEventListener('mouseup', stopPainting);
  $ref.canvas.addEventListener('mouseleave', stopPainting);
}

$ref.canvas.width = 640;
$ref.canvas.height = 640;
$ref.ctx.strokeStyle = '##2c2c2c';
$ref.ctx.lineWidth = 1.0;
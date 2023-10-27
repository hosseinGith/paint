const canvas = document.querySelector("canvas");
const brush = document.querySelector(".brush");
const eraser = document.querySelector(".eraser");
const brushColor = document.querySelector(".brushColor");
const brushRange = document.querySelector(".brushRange");
const clear = document.querySelector(".clear");
const save = document.querySelector(".saveBtn");

let ctx = canvas.getContext("2d");
let isDrawing = false;
brushRange.value = 1;
let brushCol = "";
function resz() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
resz();

//--------------- function for mouse envents --------------------

function draw(e) {
  e.preventDefault();
  isDrawing = true;
}

function Drawing(e) {
  e.preventDefault();
  if (!isDrawing) return;
  let x = e.offsetX;
  let y = e.offsetY;
  ctx.lineWidth = brushRange.value;
  ctx.strokeStyle = brushCol;
  ctx.lineTo(x, y);
  ctx.stroke();
}

function endDrawing(e) {
  e.preventDefault();
  ctx.beginPath();
  isDrawing = false;
}

//--------------- function for touch envent --------------------

function DrawingPhone(e) {
  e.preventDefault();
  let x = e.touches[0].clientX - canvas.offsetLeft;
  let y = e.touches[0].clientY - canvas.offsetTop;

  ctx.lineWidth = brushRange.value;
  ctx.strokeStyle = brushCol;
  ctx.lineTo(x, y);
  ctx.stroke();
}

function endDrawingPhone() {
  ctx.beginPath();
}
//--------------- envents for mouse --------------------

canvas.addEventListener("mousedown", draw);
canvas.addEventListener("mousemove", Drawing);
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("mouseleave", endDrawing);

brushColor.addEventListener("change", () => {
  brushCol = brushColor.value;
});
brush.addEventListener("click", (e) => {
  brushCol = brushColor.value;
});
eraser.addEventListener("click", () => {
  brushCol = "#fff";
});
clear.addEventListener("click", () => {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
});
save.addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = Math.random().toString().substring(2, 9);
  link.href = canvas.toDataURL();
  link.click();
});
//--------------- envents for touch --------------------

canvas.addEventListener("touchmove", DrawingPhone);
canvas.addEventListener("touchend", endDrawingPhone);

//----------if the user change the window size ,the canvas will refresh the self offset width-----

window.addEventListener("resize", resz);

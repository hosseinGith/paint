const canvas = document.querySelector("canvas");
const paintOptional = document.querySelector(".paintOptionalBtn");
const text = document.querySelector(".text");
const brush = document.querySelector(".brush");
const eraser = document.querySelector(".eraser");
const brushColor = document.querySelector(".brushColor");
const brushRange = document.querySelector(".brushRange");
const clear = document.querySelector(".clear");
const save = document.querySelector(".saveBtn");

const ctx = canvas.getContext("2d");
let isDrawing = false,
  brushCol = "",
  isSquare = false,
  squareOffsets = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  },
  indexSpans = 1;
brushRange.value = 1;
function resz() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  //   ctx.fillStyle = "white";
  //   ctx.fillRect(0, 0, canvas.width, canvas.height);
}
resz();
//--------------- function for mouse envents --------------------

function draw(e) {
  e.preventDefault();
  isDrawing = true;
}

function Drawing(e) {
  e.preventDefault();
  if (!isDrawing || isSquare) return;
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
let span = document.createElement("span"),
  span2 = document.createElement("span"),
  span3 = document.createElement("span"),
  span4 = document.createElement("span");
span.classList.add("squareOffset");
span2.classList.add("squareOffset");
span3.classList.add("squareOffset");
span4.classList.add("squareOffset");
document.body.appendChild(span);
document.body.appendChild(span2);
document.body.appendChild(span3);
document.body.appendChild(span4);
function squareFun(e) {
  if (!isSquare) return;
  switch (indexSpans) {
    case 1:
      span.classList.add("active");
      span.style.left = e.clientX + "px";
      span.style.top = e.clientY + "px";
      squareOffsets.x1 = e.clientX;
      indexSpans++;
      break;
    case 2:
      span2.classList.add("active");
      span2.style.left = e.clientX + "px";
      span2.style.top = e.clientY + "px";
      squareOffsets.x2 = e.clientX - canvas.width / 2;

      indexSpans++;
      break;
    case 3:
      span3.classList.add("active");
      span3.style.top = e.clientY + "px";
      span3.style.left = e.clientX + "px";
      squareOffsets.y1 = e.clientY;

      indexSpans++;
      break;
    case 4:
      span4.classList.add("active");
      span4.style.top = e.clientY + "px";
      span4.style.left = e.clientX + "px";
      squareOffsets.y2 = e.clientY - canvas.height;
      ctx.fillStyle = brushCol;
      ctx.fillRect(
        squareOffsets.x1,
        squareOffsets.y1,
        squareOffsets.x2,
        squareOffsets.y2
      );
      console.table(squareOffsets);
      console.table(span.style.left);
      span.classList.remove("active");
      span2.classList.remove("active");
      span3.classList.remove("active");
      span4.classList.remove("active");
      indexSpans = 1;
      break;
  }
}
canvas.addEventListener("click", squareFun);
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

paintOptional.addEventListener("click", () => {
  text.textContent = "نقطه ی اول را مشخض کنید";
  isSquare = true;
});

brushColor.addEventListener("change", () => {
  brushCol = brushColor.value;
});
brush.addEventListener("click", () => {
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

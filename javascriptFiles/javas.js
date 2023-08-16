const canvas = document.querySelector('canvas')
const brush = document.querySelector('.brush')
const eraser = document.querySelector('.eraser')
const brushColor = document.querySelector('.brushColor')
const brushRange = document.querySelector('.brushRange')
const clear = document.querySelector('.clear')

let ctx = canvas.getContext('2d')
let isDrowing = false
let brushWid = 5
let brushCol = ''
function drow(e) {
    isDrowing = true
}
canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight
window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
})
function Drowing(e) {
    if (!isDrowing)
        return
    let x = e.offsetX
    let y = e.offsetY
    ctx.lineWidth = brushRange.value
    ctx.strokeStyle = brushCol
    ctx.lineTo(x, y)
    ctx.stroke()
}
function endDrawing() {
    ctx.beginPath()
    isDrowing = false
}
canvas.addEventListener('mousedown', drow)
canvas.addEventListener('mousemove', Drowing)
canvas.addEventListener('mouseup', endDrawing)
canvas.addEventListener('mouseleave', endDrawing)
brushColor.addEventListener('change', () => {
    brushCol = brushColor.value
})
brush.addEventListener('click', () => {
    brushCol = brushColor.value
})
eraser.addEventListener('click', () => {
    brushCol = '#fff'
})
clear.addEventListener('click', () => {
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
})



function DrowingPhone(e) {
    let x = e.touches[0].clientX - canvas.offsetLeft
    let y = e.touches[0].clientY - canvas.offsetTop

    ctx.lineWidth = brushRange.value
    ctx.strokeStyle = brushCol
    ctx.lineTo(x, y)
    ctx.stroke()
}
function endDrawingPhone() {
    ctx.beginPath()
}
function leaveCanvasPhone() {
    ctx.beginPath()
    console.log(1);
}
canvas.addEventListener('touchmove', DrowingPhone)
canvas.addEventListener('touchend', endDrawingPhone)
canvas.addEventListener('touchcancel', leaveCanvasPhone)

brushColor.addEventListener('change', () => {
    brushCol = brushColor.value
})
brush.addEventListener('click', () => {
    brushCol = brushColor.value
})
eraser.addEventListener('click', () => {
    brushCol = '#fff'
})
clear.addEventListener('click', () => {
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)
})

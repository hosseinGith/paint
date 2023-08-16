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
if(navigator.platform === 'Win32'){
    function drow(e){
        isDrowing = true
    }
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    window.addEventListener('resize',()=>{
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
    })
    function Drowing(e){
        if(!isDrowing)
        return
        let x = e.offsetX
        let y = e.offsetY
        ctx.lineWidth = brushRange.value
        ctx.strokeStyle = brushCol
        ctx.lineTo(x,y)
        ctx.stroke()
    }
    function endDrawing(){
        ctx.beginPath()
        isDrowing = false
    }
    canvas.addEventListener('mousedown',drow)
    canvas.addEventListener('mousemove',Drowing)
    canvas.addEventListener('mouseup',endDrawing)
    canvas.addEventListener('mouseleave',endDrawing)
    brushColor.addEventListener('change',()=>{
        brushCol = brushColor.value
    })
    brush.addEventListener('click',()=>{
        brushCol = brushColor.value
    })
    eraser.addEventListener('click',()=>{
        brushCol = '#fff'
    })
    clear.addEventListener('click',()=>{
        ctx.fillStyle = '#fff'
        ctx.fillRect(0,0,canvas.offsetWidth,canvas.offsetHeight)
    })
}else{
    function drow(){
        isDrowing = true
    }
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    function Drowing(e){
        if(!isDrowing)
        returoffset    
        let x = e.touches[0].clientX - canvas.offsetLeft
        let y = e.touches[0].clientY - canvas.offseTop
        ctx.lineWidth = brushRange.value
        ctx.strokeStyle = brushCol
        ctx.lineTo(x,y)
        ctx.stroke()
    }
    function endDrawing(){
        ctx.beginPath()
        isDrowing = false
    }
    canvas.addEventListener('touchstart',drow)
    canvas.addEventListener('touchmove',Drowing)
    canvas.addEventListener('touchend',endDrawing)
    canvas.addEventListener('mouseleave',endDrawing)
    brushColor.addEventListener('change',()=>{
        brushCol = brushColor.value
    })
    brush.addEventListener('click',()=>{
        brushCol = brushColor.value
    })
    eraser.addEventListener('click',()=>{
        brushCol = '#fff'
    })
    clear.addEventListener('click',()=>{
        ctx.fillStyle = '#fff'
        ctx.fillRect(0,0,canvas.offsetWidth,canvas.offsetHeight)
    })

}

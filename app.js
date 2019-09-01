const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INIT_COLOR = "#2c2c2c";
let painting = false;
let filling = false;

canvas.width = 500;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle = INIT_COLOR;
ctx.lineWidth = "5.0";


// 캔버스 안에서 마우스 클릭 이벤트
function startPainting() {
	painting = true;
}

// 마우스 버튼을 떼거나 캔버스 영역에서 벗어난 이벤트
function stopPainting() {
	painting = false;
}

// 캔버스 안에서 마우스 이동 이벤트
function onMouseMove(event) {
	const offsetX = event.offsetX;
	const offsetY = event.offsetY;
	if (!painting) {
		ctx.beginPath()
		ctx.moveTo(offsetX, offsetY);
	} else {
		ctx.lineTo(offsetX, offsetY);
		ctx.stroke();
	}
}

// 캔버스 안에서 마우스 버튼 클릭 이벤트
function onMouseDown(event) {
	painting = true;
}

// 선택한 색으로 선의 색깔을 변경
function handleColor(event) {
	const colorCode = event.target.style.backgroundColor;
	ctx.strokeStyle = colorCode;
	ctx.fillStyle = colorCode;
}

// 선의 굵기를 변경
function handleRangeSize(event) {
	const currentRangeValue = event.target.value;
	ctx.lineWidth = currentRangeValue;
	console.log(event.target.value);
}

function handleMode(event) {
	if (filling === true) {
		filling = false;
		mode.innerText = "Fill";
	} else {
		filling = true;
		mode.innerText = "Paint";
	}
}

function handleCanvas(event) {
	if (filling) {
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
}

function handleContextMenu(event) {
	event.preventDefault();
}

function handleSave(event) {
	const image = canvas.toDataURL("imgae/jpeg");
	const link = document.createElement("a");
	link.href = image;
	link.download = "canvas.jpg";
	link.click();
}

// canvas 객체가 존재한다면 이벤트를 건다 - 마우스 이동
if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvas);
	canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColor));

if (range) {
	range.addEventListener("input", handleRangeSize);
}

if (mode) {
	mode.addEventListener("click", handleMode);
}

if (save) {
	save.addEventListener("click", handleSave);
}
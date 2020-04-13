// Button Events
function clickButtonAutoFocusEventListener(event)
{
	document.getElementById("label-msg").innerHTML = "AUTO-FOCUS Button clicked!";
}
function clickButtonOrbitEventListener(event)
{
	// First Call RESET
	orbitCamera = true;
}
function clickButtonPauseEventListener(event)
{
	orbitCamera = false;
}
function clickButtonHomeEventListener(event)
{
	home = true;
	orbitCamera = false;
	buffersVBO = [];
	buffersIBO = [];

	//camera transformation
	document.getElementById("range-panX").value = 0;
	document.getElementById("range-panY").value = 0;
	document.getElementById("range-zoom").value = 0;
	document.getElementById("label-range-panX").innerHTML = 0;
	document.getElementById("label-range-panY").innerHTML = 0;
	document.getElementById("label-range-zoom").innerHTML = 0;

	//cube
	document.getElementById("size-cube").value = 1;
	document.getElementById("cube-posx").value = 0;
	document.getElementById("cube-posy").value = 0;
	document.getElementById("cube-posz").value = 0;

	//pyramid
	document.getElementById("pyramid-base").value = 1;
	document.getElementById("pyramid-height").value = 1;
	document.getElementById("pyramid-posx").value = 0
	document.getElementById("pyramid-posy").value = 0;
	document.getElementById("pyramid-posz").value = 0;

	//sphere
	document.getElementById("Sphere-divisions").value = 12;
	document.getElementById("SphereCenter-posx").value = 0;
	document.getElementById("SphereCenter-posy").value = 0;
	document.getElementById("SphereCenter-posz").value = 0;
	
}

// Range Events
function inputRangePanXEventListener(event)
{
	var sliderValue = Number(document.getElementById("range-panX").value);
	// Update Camera
	xEye = xEyeIni + sliderValue;
	xTarget = xTargetIni + sliderValue;
	var eye = [xEye, yEyeIni, zEyeIni];
	var target = [xTarget, yTargetIni, zTargetIni];
	var up = [xUpIni, yUpIni, zUpIni];
	var cameraMatrix = glMatrix.mat4.create();	// M-camera = I
	glMatrix.mat4.lookAt(cameraMatrix, eye, target, up);
	var uCameraMatrixLocation = gl.getUniformLocation(shaderProgram, "uCameraMatrix");
	gl.uniformMatrix4fv(uCameraMatrixLocation, false, cameraMatrix);
	// Update GUI
	document.getElementById("label-range-panX").innerHTML = sliderValue;
	document.getElementById("label-xEye").innerHTML = eye[0].toFixed(1);
	document.getElementById("label-xTarget").innerHTML = target[0].toFixed(1);
}
function inputRangePanYEventListener(event)
{
	var sliderValue = Number(document.getElementById("range-panY").value);
	yEye = yEyeIni + sliderValue;
	yTarget = yTargetIni + sliderValue;
	var eye = [xEyeIni, yEye, zEyeIni];
	var target = [xTargetIni, yTarget, zTargetIni];
	var up = [xUpIni, yUpIni, zUpIni];
	var cameraMatrix = glMatrix.mat4.create();	// M-camera = I
	glMatrix.mat4.lookAt(cameraMatrix, eye, target, up);
	var uCameraMatrixLocation = gl.getUniformLocation(shaderProgram, "uCameraMatrix");
	gl.uniformMatrix4fv(uCameraMatrixLocation, false, cameraMatrix);
	document.getElementById("label-range-panY").innerHTML = sliderValue;
}
function inputRangeZoomEventListener(event)
{
	var sliderValue = Number(document.getElementById("range-zoom").value);
	zEye = zEyeIni + sliderValue;
	zTarget = zTargetIni + sliderValue;
	var eye = [xEyeIni, yEyeIni, zEye];
	var target = [xTargetIni, yTargetIni, zTarget];
	var up = [xUpIni, yUpIni, zUpIni];
	var cameraMatrix = glMatrix.mat4.create();	// M-camera = I
	glMatrix.mat4.lookAt(cameraMatrix, eye, target, up);
	var uCameraMatrixLocation = gl.getUniformLocation(shaderProgram, "uCameraMatrix");
	gl.uniformMatrix4fv(uCameraMatrixLocation, false, cameraMatrix);
	document.getElementById("label-range-zoom").innerHTML = sliderValue;
}

// Buttons Cube
function clickButtonCubeEventListener(event) {
	var size = parseFloat(document.getElementById("size-cube").value);
	var posx = parseFloat(document.getElementById("cube-posx").value);
	var posy = parseFloat(document.getElementById("cube-posy").value);
	var posz = parseFloat(document.getElementById("cube-posz").value);
	console.log("size: ", size);
	console.log("posx: ", posx);
	console.log("posy: ", posy);
	console.log("posz: ", posz);
	var cube = new createCube(size, posx, posy, posz);
	var newVertices = cube.vertices;
	var newIndices = cube.indices;
	buffersVBO.push(newVertices);
	buffersIBO.push(newIndices);
	console.log(newVertices);
	console.log(newIndices);
	console.log("vbo",buffersVBO);
	console.log("ibo",buffersIBO);
	render();
}

// Buttons Pyramid
function clickButtonPyramidEventListener(event) {
	var base = parseFloat(document.getElementById("pyramid-base").value);
	var height = parseFloat(document.getElementById("pyramid-height").value);
	var posx = parseFloat(document.getElementById("pyramid-posx").value);
	var posy = parseFloat(document.getElementById("pyramid-posy").value);
	var posz = parseFloat(document.getElementById("pyramid-posz").value);
	console.log("base: ", base);
	console.log("height: ", height);
	console.log("posx: ", posx);
	console.log("posy: ", posy);
	console.log("posz: ", posz);
	var pyramid = new createPyramid(base, height, posx, posy, posz);
	var newVertices = pyramid.vertices;
	var newIndices = pyramid.indices;
	buffersVBO.push(newVertices);
	buffersIBO.push(newIndices);
	console.log(newVertices);
	console.log(newIndices);
	console.log("vbo",buffersVBO);
	console.log("ibo",buffersIBO);
	render();
}


function clickButtonSphereEventListener(event) {
	var divisions = parseFloat(document.getElementById("Sphere-divisions").value);
	var posx = parseFloat(document.getElementById("SphereCenter-posx").value);
	var posy = parseFloat(document.getElementById("SphereCenter-posy").value);
	var posz = parseFloat(document.getElementById("SphereCenter-posz").value);

	var sphere = new createSphere(divisions,posx,posy,posz);
	var newVertices = sphere.vertices;
	var newIndices = sphere.indices;
	buffersVBO.push(newVertices);
	buffersIBO.push(newIndices);
	console.log(newVertices);
	console.log(newIndices);
	console.log("vbo",buffersVBO);
	console.log("ibo",buffersIBO);
	render();
}

function initEventHandler(event)
{
	// Buttons
	document.getElementById("button-auto-focus").addEventListener("click", clickButtonAutoFocusEventListener, false);
	document.getElementById("button-orbit").addEventListener("click", clickButtonOrbitEventListener, false);
	document.getElementById("button-pause").addEventListener("click", clickButtonPauseEventListener, false);
	document.getElementById("button-home").addEventListener("click", clickButtonHomeEventListener, false);

	// Range Sliders
	document.getElementById("range-panX").addEventListener("input", inputRangePanXEventListener, false);
	document.getElementById("range-panY").addEventListener("input", inputRangePanYEventListener, false);
	document.getElementById("range-zoom").addEventListener("input", inputRangeZoomEventListener, false);

	// Buttons Cube
	document.getElementById("button-cube").addEventListener("click", clickButtonCubeEventListener, false);

	// Buttons Pyramid
	document.getElementById("button-pyramid").addEventListener("click", clickButtonPyramidEventListener, false);

	// Buttons sphere
	document.getElementById("button-sphere").addEventListener("click", clickButtonSphereEventListener, false);

}


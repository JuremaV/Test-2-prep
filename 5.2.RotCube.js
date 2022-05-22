const canvas = document.querySelector(`canvas`);
const webgl = canvas.getContext(`webgl`); 
if(!webgl){throw new Error("WebGL not supported!");}
webgl.clearColor( 1.0, 1.0, 1.0, 1.0,); 
//webgl.clearColor( Math.random(), Math.random(), Math.random(), 1.0,); 
webgl.clear(webgl.COLOR_BUFFER_BIT);
webgl.enable(webgl.DEPTH_TEST);
var r = 0.5; 

var box = new Float32Array([
    
    //1.BACK FACE RED
    -r,r,r, 1,0,0,  -r,-r,r, 1,0,0,  r,-r,r, 1,0,0, //1st Triang
    r,r,r,  1,0,0,  -r,r,r, 1,0,0,   r,-r,r, 1,0,0, //2nd Triang
    
    //2.RIGHT FACE GREEN
    r,r,r,  0,1,0,  r,-r,r, 0,1,0,  r,r,-r,  0,1,0, //1st Triang
    r,-r,r, 0,1,0,  r,r,-r, 0,1,0,  r,-r,-r, 0,1,0, //2nd Triang

    //3.FRONT FACE Magenta
    -r,r,-r, 1,0,1,  -r,-r,-r, 1,0,1,  r,-r,-r, 1,0,1, //1st Triang
    r,r,-r,  1,0,1,  -r,r,-r,  1,0,1,  r,-r,-r, 1,0,1, //2nd Triang

    //4.LEFT FACE YELLOW
    -r,r,r,  1,1,0,  -r,-r,r, 1,1,0,  -r,r,-r,   1,1,0, //1st Triang
    -r,-r,r, 1,1,0,  -r,r,-r, 1,1,0,  -r,-r,-r,  1,1,0, //2nd Triang

   //5.BOTTOM FACE BLUE
   -r,-r,r,  0,0,1,  r,-r,r, 0,0,1,  -r,-r,-r, 0,0,1, //1st Triang
   -r,-r,-r, 0,0,1,  r,-r,-r, 0,0,1,  r,-r,r,   0,0,1, //2nd Triang

    //6.TOP FACE CYAN
    -r,r,r, 0,1,1,   r,r,r, 0,1,1,  -r,r,-r, 0,1,1, //1st Triang
    -r,r,-r, 0,1,1,  r,r,-r, 0,1,1,  r,r,r,  0,1,1  //2nd Triang

]);

//This buffer is for POS (VERTICES)
const buffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, buffer);
webgl.bufferData(webgl.ARRAY_BUFFER, box, webgl.STATIC_DRAW);

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vertexShader,
`attribute vec3 pos;
attribute vec3 colour;
varying vec3 fragcolour;
uniform mat4 model;

void main() { 
    
    
    fragcolour = colour;
    
    gl_Position = model*vec4(0.5*pos,1);

}`);
webgl.compileShader(vertexShader);
if (!webgl.getShaderParameter(vertexShader, webgl.COMPILE_STATUS)){
   console.error("ERROR compiling vertex shader!", webgl.getShaderInfoLog(vertexShader))}

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(fragmentShader,
`precision mediump float; 
varying vec3 fragcolour;
void main() {

     gl_FragColor = vec4(fragcolour,1.0);

     }`);
webgl.compileShader(fragmentShader);
if (!webgl.getShaderParameter(fragmentShader, webgl.COMPILE_STATUS)){
    console.error("ERROR compiling fragment shader!", webgl.getShaderInfoLog(fragmentShader));}

const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);
webgl.useProgram(program);

const positionLocation = webgl.getAttribLocation(program, `pos`);
webgl.enableVertexAttribArray(positionLocation);
webgl.vertexAttribPointer(positionLocation, 3, webgl.FLOAT, false, 6*4, 0);
//Float32Array.BYTES_PER_ELEMENT =4
const coloursLocation = webgl.getAttribLocation(program, `colour`);
webgl.enableVertexAttribArray(coloursLocation);
webgl.vertexAttribPointer(coloursLocation, 3, webgl.FLOAT, false, 6*4, 3*4);
  
 
let model = createmat4();
let b     = Math.PI; 
let out1  = 0;
let out2  = 0;
let out3  = 0;
let out4  = 0;
let out5  = 0;
let tx    = 0;
let ty    = 0;
let tz    = 0;
let a     = 0;
let d     =-1;
let enable1=1;
let enable2=1;
let enable3=1;

//let[utext, dtext, rtext, ltext] =[0, 0, 0, 0, 0];

/*let up        = document.getElementById(`up`);
let down      = document.getElementById(`down`);
let left      = document.getElementById(`left`);
let right     = document.getElementById(`right`);*/
let rotateX = document.getElementById(`rotX`);
let rotateY = document.getElementById(`rotY`);
let rotateZ = document.getElementById(`rotZ`);
let spinX   = document.getElementById(`spinX`);
let spinY   = document.getElementById(`spinY`);
let spinZ   = document.getElementById(`spinZ`);
let spinUp  = document.getElementById(`spinUp`);
let spindown= document.getElementById(`spinDown`);
/*let sup   = document.getElementById(`sup`);
let sdown   = document.getElementById(`sdown`);
let sleft   = document.getElementById(`sleft`);
let sright  = document.getElementById(`sright`);*/

rotX.addEventListener("click", function() {out1 += Math.PI/8;});
rotY.addEventListener("click", function() {out2 += Math.PI/8;});
rotZ.addEventListener("click", function() {out3 += Math.PI/8;});

spinX.addEventListener("click", function() { 

    d*=-1
    if (d == 1) {enable1 = 1;}
    else{enable1 == 0;}

 });

//spinY.addEventListener("click", function() {});
//spinZ.addEventListener("click", function() {});
//spinUp.addEventListener("click", function() {});
//spinDown.addEventListener("click", function() {});


/*rotZ.addEventListener("click", upft);
down.addEventListener("click", downft);
right.addEventListener("click", rightft);
left.addEventListener("click", leftft);*/

/*
function upft(){
    ty +=0.05
    sup.textContent = ++utext;
}

function downft(){
    ty -=0.05
    sup.textContent = ++dtext;
}

function rightft(){
    ty -=0.05
    sup.textContent = ++rtext;
}

function leftft(){
    ty +=0.05
    sup.textContent = ++ltext;
}*/



document.onkeydown = function (event) {
    switch (event.key) {
        case `ArrowUp`: // rotate up along the X-axis
            out1 += Math.PI/8;
            break;
        case `ArrowDown`:  //rotate down along the X-axis
            out1 -= Math.PI/8;
            break;
        case `ArrowLeft`:   //rotate left along the Y-axis
            out2 += Math.PI/8;
            break;
        case `ArrowRight`: //rotate right along the Y-axis
            out2 -= Math.PI/8;
            break;
        case "j":      //rotate clockwise along the Z-axis
            out3 += Math.PI/8;
            break;
        case "k":       //rotate unticlockwise along the Z-axis
            out3 -= Math.PI/8;
            break;
        
    
    }
    
}

draw();

function draw(){
    let spinX = out1
    spinX+= a*enable1;
    //spinY+= a*enable1;
    //spinZ+= a*enable1;

    webgl.clear(webgl.COLOR_BUFFER_BIT);
    model = matmult(createmat4(),rotx(out1));      
    model = matmult(model,roty(out2));           
    model = matmult(model,rotz(out3));
    model = matmult(model,translate(out4, out5, 0));
    webgl.uniformMatrix4fv(webgl.getUniformLocation(program, `model`), false, model);
    webgl.drawArrays(webgl.TRIANGLES, 0, box.length/6);
    window.requestAnimationFrame(draw);
    
}

// Rotation Matrix along X-Axis 
function rotx(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    return new Float32Array([
        1, 0, 0, 0,
        0, c, s, 0,
        0,-s, c, 0,
        0, 0, 0, 1
    ]);
}

// Rotation Matrix along Y-Axis 
function roty(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    return new Float32Array([
        c, 0,-s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1
    ]);
}

// Rotation Matrix along Z-Axis 
function rotz(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);
    return new Float32Array([
        c,-s, 0, 0,
        s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
}

// Translation Matrice along X-Y Axis
function translate(tx, ty, tz) {
    return new Float32Array([
        1,  0,  0,  0,
        0,  1,  0,  0,
        0,  0,  1,  0,
        tx, ty, tz, 1
    ]);
}
 // Identity Matrix
function createmat4(){
    return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1

    //m[1,0,0,0,  0,1,0,0,0, 0,1,0 0,0,0,1]    

    ]);
}

function matmult(model,b) {
    return[
    model[0]*b[0]  + model[1]*b[4]  + model[2]*b[8]   + model[3]*b[12], 
    model[0]*b[1]  + model[1]*b[5]  + model[2]*b[9]   + model[3]*b[13],  
    model[0]*b[2]  + model[1]*b[6]  + model[2]*b[10]  + model[3]*b[14], 
    model[0]*b[3]  + model[1]*b[7]  + model[2]*b[11]  + model[3]*b[15],

    model[4]*b[0]  + model[5]*b[4]  + model[6]*b[8]   + model[7]*b[12],  
    model[4]*b[1]  + model[5]*b[5]  + model[6]*b[9]   + model[7]*b[13],  
    model[4]*b[2]  + model[5]*b[6]  + model[6]*b[10]  + model[7]*b[14],
    model[4]*b[3]  + model[5]*b[7]  + model[6]*b[11]  + model[7]*b[15],

    model[8]*b[0]  + model[9]*b[4]  + model[10]*b[8]  + model[11]*b[12],  
    model[8]*b[1]  + model[9]*b[5]  + model[10]*b[9]  + model[11]*b[13], 
    model[8]*b[2]  + model[9]*b[6]  + model[10]*b[10] + model[11]*b[14],  
    model[8]*b[3]  + model[9]*b[7]  + model[10]*b[11] + model[11]*b[15], 
    
    model[12]*b[0] + model[13]*b[4] + model[14]*b[8]  + model[15]*b[12],  
    model[12]*b[1] + model[13]*b[5] + model[14]*b[9]  + model[15]*b[13],  
    model[12]*b[2] + model[13]*b[6] + model[14]*b[10] + model[15]*b[14], 
    model[12]*b[3] + model[13]*b[7] + model[14]*b[11] + model[15]*b[15],  
]}

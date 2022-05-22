const canvas = document.querySelector(`canvas`);
const webgl = canvas.getContext(`webgl`); 
//const program = webgl.createProgram();
if(!webgl){throw new Error("WebGL not supported!");}
webgl.clearColor( Math.random(), Math.random(), Math.random(), 1.0,); 
webgl.clear(webgl.COLOR_BUFFER_BIT);
//webgl.enable(webgl.DEPTH_TEST);

//var u = 0.5; 

var r = 0.5;
//let image = document.getElementById("Me");

var vertices = new Float32Array([


   r,r, r,-r, -r,r, 
  -r,r, r,-r, -r,-r,

   // -u,u, u,u, -u,-u,
   // -u,-u, u,u, u,-u,
    
 ]);
 const boxvertices = new Float32Array(vertices);

 var colour = new Float32Array([
   
    0.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 0.0, 1.0,
  
    0.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 0.0, 1.0,
    0.0, 0.0, 0.0, 1.0
  
  
]);
const boxcolours = new Float32Array(colour);


//This buffer is for POS (VERTICES)
const positionBuffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(vertexShader,
`attribute vec2 pos;
attribute vec4 colours;
varying vec4 vcolours;
void main() 
{ 
    gl_Position = vec4(pos,0,1);
    vcolours = colours; 

}`);

webgl.compileShader(vertexShader);
if (!webgl.getShaderParameter(vertexShader, webgl.COMPILE_STATUS)) {
  console.error(
    "ERROR compiling vertex shader!",
    webgl.getShaderInfoLog(vertexShader)
  ); }

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(fragmentShader,
`precision mediump float; 
varying vec4 vcolours;
void main() 
{ 
    gl_FragColor = vcolours;

 }`);

webgl.compileShader(fragmentShader);
if (!webgl.getShaderParameter(fragmentShader, webgl.COMPILE_STATUS)) {
  console.error(
    "ERROR compiling fragment shader!",
    webgl.getShaderInfoLog(fragmentShader)
  ); }

const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);
//webgl.useProgram(program);
webgl.enable(webgl.DEPTH_TEST);

// Loc for POS
const positionLocation = webgl.getAttribLocation(program, `pos`);
webgl.enableVertexAttribArray(positionLocation);
webgl.vertexAttribPointer(positionLocation, 2, webgl.FLOAT, false, 0, 0);
//webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer );

//This buffer is for COLOURS
const colourbuffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, colourbuffer);
webgl.bufferData(webgl.ARRAY_BUFFER, colour, webgl.STATIC_DRAW);

// Loc for COLOURS
const colourLocation = webgl.getAttribLocation(program, `colours`);
webgl.enableVertexAttribArray(colourLocation);
//webgl.bindBuffer(webgl.ARRAY_BUFFER, colourbuffer);
webgl.vertexAttribPointer(colourLocation, 4, webgl.FLOAT, false, 0, 0);

webgl.useProgram(program);
webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
webgl.drawArrays(webgl.TRIANGLES, 0, 6);
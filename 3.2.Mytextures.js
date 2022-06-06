const canvas = document.querySelector(`canvas`);
const webgl = canvas.getContext(`webgl`); 
//const program = webgl.createProgram();
if(!webgl){throw new Error("WebGL not supported!");}
webgl.clearColor( Math.random(), Math.random(), Math.random(), 1.0,); 
webgl.clear(webgl.COLOR_BUFFER_BIT);
var r = 0.5; 
let image = document.getElementById("Me");

var vertices = new Float32Array([
     
   r,r,r, r,-r,r, -r,r,r, -r,r,r, r,-r,r, -r,-r,r,
  //r,r,r, -r,r,r, r,-r,r,  r,-r,r,  -r,r,r, -r,-r,r,
    
 ]);

 var texCoords = new Float32Array([
   
   1,1, 1,0, 0,1,   0,1, 1,0, 0,0
  //0,0, 1,0, 0,1, 0,1, 1,0, 1,1,
  
]);

const positionBuffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

const textCoordsBuffer = webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, textCoordsBuffer);
webgl.bufferData(webgl.ARRAY_BUFFER, texCoords, webgl.STATIC_DRAW);

const texturebuffer = webgl.createTexture();
webgl.bindTexture(webgl.TEXTURE_2D, texturebuffer);
webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MAG_FILTER, webgl.LINEAR);
webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_MIN_FILTER, webgl.LINEAR);
webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_S, webgl.CLAMP_TO_EDGE);
webgl.texParameteri(webgl.TEXTURE_2D, webgl.TEXTURE_WRAP_T, webgl.CLAMP_TO_EDGE);
webgl.pixelStorei(webgl.UNPACK_FLIP_Y_WEBGL, true);

webgl.texImage2D(webgl.TEXTURE_2D, 0, webgl.RGBA,webgl.RGBA,webgl.UNSIGNED_BYTE, image);

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(
  vertexShader,
  `attribute vec2 vtexture;
attribute vec3 pos;
varying vec2 fragtexture;

void main() { 
    gl_Position = vec4(pos,1);
    fragtexture = vtexture;

}` );
webgl.compileShader(vertexShader);
if (!webgl.getShaderParameter(vertexShader, webgl.COMPILE_STATUS)) {
  console.error(
    "ERROR compiling vertex shader!",
    webgl.getShaderInfoLog(vertexShader)
  );
}

const fragmentShader = webgl.createShader(webgl.FRAGMENT_SHADER);
webgl.shaderSource(
  fragmentShader,
  `precision mediump float; 
varying vec2 fragtexture;
uniform sampler2D fragsampler;
void main() 
{ 
     gl_FragColor = texture2D(fragsampler, fragtexture);
}` );
webgl.compileShader(fragmentShader);
if (!webgl.getShaderParameter(fragmentShader, webgl.COMPILE_STATUS)) {
  console.error(
    "ERROR compiling fragment shader!",
    webgl.getShaderInfoLog(fragmentShader)
  );
}

const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);
webgl.useProgram(program);
webgl.enable(webgl.DEPTH_TEST);

const positionLocation = webgl.getAttribLocation(program, `pos`);
webgl.enableVertexAttribArray(positionLocation);
webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer);
webgl.vertexAttribPointer(positionLocation, 3, webgl.FLOAT,false, 0, 0);

const textureLocation = webgl.getAttribLocation(program, `vtexture`);
webgl.enableVertexAttribArray(textureLocation );
webgl.bindBuffer(webgl.ARRAY_BUFFER, textCoordsBuffer);
webgl.vertexAttribPointer(textureLocation, 2, webgl.FLOAT, false, 0, 0);

//webgl.clear(webgl.COLOR_BUFFER_BIT);
//webgl.bindBuffer(webgl.ARRAY_BUFFER, textCoordsBuffer);
webgl.activeTexture(webgl.TEXTURE0);
webgl.drawArrays(webgl.TRIANGLES, 0, 6);

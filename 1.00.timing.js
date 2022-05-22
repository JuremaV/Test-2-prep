const canvas = document.querySelector(`canvas`);
const webgl = canvas.getContext(`webgl`); 
if(!webgl){
    throw new Error ("WebGL not supported");
};
webgl.clearColor(1.0, 1.0, 1.0, 1.0);
webgl.clear(webgl.COLOR_BUFFER_BIT);
webgl.enable(webgl.DEPTH_TEST);


var r = 0.5

var vertices = new Float32Array([
 -r, r, r, 1,0,0, -r,-r, r, 1,0,0,  r,-r,r, 1,0,0,   
 -r, r, r, 1,0,0, -r,-r, r, 1,0,0,  r,-r,r, 1,0,0,  

 r, r, r, 1,0,0,  r,-r, r, 1,0,0,  r,r,-r, 1,0,0,   
 r,-r, r, 1,0,0 , r,r, -r, 1,0,0,  r,-r,-r, 1,0,0, 

 -r, r, -r, 1,0,0,  -r,-r,-r, 1,0,0,  r,-r,-r, 1,0,0,   
 r, r,-r, 1,0,0,  -r,-r,-r, 1,0,0,  r,-r,-r, 1,0,0, 

 -r, r, r, 1,0,0,  -r,-r, -r, 1,0,0,  -r,r,-r, 1,0,0,   
 -r, -r, r, 1,0,0,  -r,-r, -r, 1,0,0,  -r,-r,-r, 1,0,0, 
 
 -r,-r, r, 1,0,0,  r,-r, r, 1,0,0,  -r,-r,-r, 1,0,0,   
 -r,-r,-r, 1,0,0,  r,-r,-r, 1,0,0,  r,-r,r, 1,0,0, 

 -r, r, r, 1,0,0,  r,r, r, 1,0,0,  -r,r,-r, 1,0,0,   
 -r, r,-r, 1,0,0,  r,r,-r, 1,0,0,  r,r,r, 1,0,0, 



// // u,u, u,-u, -u,u, 
// // u,-u, -u,u, -u,-u,

// // ]);

// // var colours = new Float32Array([

//  1.0, 0.0, 0.0, 1.0,
//  1.0, 0.0, 0.0, 1.0,
//  1.0, 0.0, 0.0, 1.0,

//  1.0, 0.0, 0.0, 1.0,
//  1.0, 0.0, 0.0, 1.0,
//  1.0, 0.0, 0.0, 1.0
 
    
]);

const cube = new Float32Array( vertices);

const positionBuffer= webgl.createBuffer();
webgl.bindBuffer(webgl.ARRAY_BUFFER, positionBuffer );
webgl.bufferData(webgl.ARRAY_BUFFER, vertices, webgl.STATIC_DRAW);

// const colourBuffer = webgl.createBuffer();
// webgl.bindBuffer(webgl.ARRAY_BUFFER, colourBuffer );
// webgl.bufferData(webgl.ARRAY_BUFFER, colours , webgl.STATIC_DRAW);

const vertexShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(
    vertexShader,
    ` attribute vec3 pos;
    attribute vec3 colour;
    varying vec3 fragcolour;
    uinform mat4 model
    uniform float x;
    uniform float y;
    voind main(){
        fragcolour = colour;

        gl_Position = model*vec4(0.5*pos,1) + vec4(x, y, 0.0, 0.0);

}` );

webgl.compileShader(vertexShader);
if (!webgl.getShaderParameter(vertexShader, webgl.COMPILE_STATUS)){
console.error( 
    "ERROR compiling vertex shader", webgl.getShaderInfoLog(vertexShader)

);}

const fragmentShader = webgl.createShader(webgl.VERTEX_SHADER);
webgl.shaderSource(
    fragmentShader,
    ` precision mediump float;
    varying vec3 fragcolour;

    voind main(){

        gl_FragColor = vec4(fragcolour, 1.0);

}` );

webgl.compileShader(fragmentShader);
if (!webgl.getShaderParameter(fragmentShader, webgl.COMPILE_STATUS)){
console.error( 
    "ERROR compiling vertex shader", webgl.getShaderInfoLog(fragmentShader)

);}

const program = webgl.createProgram();
webgl.attachShader(program, vertexShader);
webgl.attachShader(program, fragmentShader);
webgl.linkProgram(program);
webgl.useProgram(program);

const  positionLocation =  webgl.getAttribLocation(program, `pos`);
webgl.enableVertexAttribArray(positionLocation);
webgl.vertexAttribPointer(positionLocation, 3, webgl.FLOAT, false, 6*4, 0);

const  coloursLocation =  webgl.getAttribLocation(program, `colour`);
webgl.enableVertexAttribArray(coloursLocation);
webgl.vertexAttribPointer(coloursLocation, 3, webgl.FLOAT, false, 6*4, 3*4);


let model = creatmat4();
let model2 = creatmat4();
let b = 0; //Math.PI/8;
let xt = -0.8;
let yt =  0.0;
let zt = 0.0;
let xtt = 0.5;
let ytt = 0.0;
let ztt = 0.0;
let isSpinning = false;
//let interval = null;
let spinningAngle = Math.PI/8;
//let interval = null;

document.querySelectorAll("button").forEach((element) =>{
    element.onclick = function () {
        switch (element.id) {
            case "rtx":
                model2 = matmult(model2, rotx(Math.PI/8));
                break;

            case "rty":
                model2 = matmult(model2, roty(Math.PI/8));
                break;

            case "rtz":
                model2 = matmult(model2, rotz(Math.PI/8));
                break;

            case "spx":
                    model2 = matmult(model2, rotx(Math.PI/8));
                    break;
          
            case "spy":
                model2 = matmult(model2, roty(Math.PI/8));
                break;
          
            case "spz":
                model2 = matmult(model2, rotz(Math.PI/8));
                break;

            case "spup":
                    spinningAngle += Math.PI; //Math.PI / 8;
                    break;

            case "spdw":
                    spinningAngle -= Math.PI;
                    break;
                
            // case "spup":
            //     model2 = matmult(model2, roty(Math.PI/8));
            //     break;
          
            // case "spdw":
            //     model2 = matmult(model2, roty(Math.PI/8));
            //     break;
          
        } 
    };
});

function spin(axis) {
    isSpinning = !isSpinning;
    if(isSpinning) {
        interval = setInterval(() => {
            switch (axis) {
                case "x":
                    model2 = matmult(model2, rotx(spinningAngle));
                    break;
                case "y":
                        model2 = matmult(model2, roty(spinningAngle));
                    break;

                 case "z":
                    model2 = matmult(model2, rotz(spinningAngle));
                    break;
            }

        }, );

    } else clearInterval(interval);
    
}

document.onkeydown = function (event) {
   switch (event.key) {
       case `ArrowRight`:
           xt += 0.01;
           break;

        case `ArrowLeft`:
            xt -= 0.01;
            break;  
        
        case `ArrowUp`:
            yt += 0.01;
            break; 

        case `ArrowDown`:
            yt -= 0.01;
            break;
   
        }
   
};

draw();

function draw() {

    webgl.clear(webgl.COLOR_BUFFER_BIT);
    model= matmult(createmat4(), translate(xt, yt, zt));
    webgl.uniformMatrix4fv(webgl.getUniformLocation(program, `model`), false, model);
    webgl.drawArrays(webgl.TRIANGLES, 0, vertices.length/6);
    webgl.uniformMatrix4fv(webgl.getUniformLocation(program, `model`), false, model2);
    webgl.uniform1f.getUniformLocation((program, "x"), 0.5);
    webgl.uniform1f.getUniformLocation((program, "y"), 0.0);
    webgl.drawArrays(webgl.TRIANGLES, 0, vertices.length/6);
    window.requestAnimationFrame(draw);

};

// function rotx(angle) {
//     var c = Math.cos(angle);
//     var s = Math.sin(angle);
//     return new Float32Array([
//         c,-s, 0, 0,
//         c,-s, 0, 0,
//         0, 0, 1, 0,
//         0, 0, 0, 1,
//     ]);
// }

function rotx(angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return new Float32Array([
        1, 0, 0, 0,
        0, c, s, 0,
        0,-s, c, 0,
        0, 0, 0, 1,
    ]);
}

function roty(angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return new Float32Array([
        c, 0,-s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1,
    ]);
}

function rotz(angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    return new Float32Array([
        c,-s, 0, 0,
        s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]);
}

function translate(tx, ty, tz) {
    return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        tx,ty,tz,1,
    ]);
}

function creatmat4() {
    return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1,
    ]);
}

    

function matmult(model, b) {
    return[
        model[0] * b[0] + model[1] * b[4] + model[2]* b[8] + model[3]* b[12],
        model[0] * b[1] + model[1] * b[5] + model[2]* b[9] + model[3]* b[13],
        model[0] * b[2] + model[1] * b[6] + model[2]* b[10] + model[3]* b[14],
        model[0] * b[3] + model[1] * b[7] + model[2]* b[11] + model[3]* b[15],

        model[4] * b[0] + model[5] * b[4] + model[6]* b[8] + model[7]* b[12],
        model[4] * b[1] + model[5] * b[5] + model[6]* b[9] + model[7]* b[13],
        model[4] * b[2] + model[5] * b[6] + model[6]* b[10] + model[7]* b[14],
        model[4] * b[3] + model[5] * b[7] + model[6]* b[11] + model[7]* b[15],

        model[8]* b[0] + model[9] * b[4] + model[10]* b[8] + model[11]* b[12],
        model[8] * b[1] + model[9] * b[5] + model[10]* b[9] + model[11]* b[13],
        model[8] * b[2] + model[9] * b[6] + model[10]* b[10] + model[11]* b[14],
        model[8] * b[3] + model[9] * b[7] + model[10]* b[11] + model[11]* b[15],

        model[12] * b[0] + model[13] * b[4] + model[14]* b[8] + model[15]* b[12],
        model[12] * b[1] + model[13] * b[5] + model[14]* b[9] + model[15]* b[13],
        model[12] * b[2] + model[13]* b[6] + model[14]* b[10] + model[15]* b[14],
        model[12] * b[3] + model[13]* b[7] + model[14]* b[11] + model[15]* b[15],
        
        

    ];
    
}
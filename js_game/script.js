var socket = io();
var side = 12;
function setup() {
    // noStroke();
    createCanvas(60 * side, 60 * side);
    // background('#D0D0D0');
}

function produce(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("#D0D0D0");    //Field
            }
            else if (matrix[y][x] == 1) {
                fill("#00D100");    //Grass
            }
            else if (matrix[y][x] == 2) {
                fill("#C40233");    //GrassEater
            }
            else if (matrix[y][x] == 3) {
                fill("#E1AC3C");    //Predator
            }
            else if (matrix[y][x] == 4) {
                fill("#007ACC");    //Water
            }
            else if (matrix[y][x] == 5) {
                fill("#000000");    //Bomb
            }
            rect(x * side, y * side, side, side);
        }
    }

}


        socket.on('send matrix', produce)

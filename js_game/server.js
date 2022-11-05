var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require("fs");
app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('./index.html');
});
server.listen(3000, () => {
    console.log('Your Server is running on port 3000');
});

function generateMatrix(matLength, gr, grEat, pre, water, bomb) {
    let matrix = []
    for (let i = 0; i < matLength; i++) {
        matrix.push([])
        for (let j = 0; j < matLength; j++) {
            matrix[i].push(0)
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }

    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }

    for (let i = 0; i < pre; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }

    for (let i = 0; i < water; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }
    }

    for (let i = 0; i < bomb; i++) {
        let x = Math.floor(Math.random() * matLength)
        let y = Math.floor(Math.random() * matLength)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }

    return matrix
}

matrix = generateMatrix(60, 90, 40, 70, 45, 15)

io.sockets.emit('send matrix', matrix)

//arrays
grassArr = [];
grassEaterArr = [];
predatorArr = [];
waterArr = [];
bombArr = [];

//modules
Grass = require("./grass");
GrassEater = require("./grassEater");
Predator = require("./predator");
Water = require("./water");
Bomb = require("./bomb");

//functions
function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            } else if (matrix[y][x] == 2) {
                let gr = new GrassEater(x, y)
                grassEaterArr.push(gr)
            } else if (matrix[y][x] == 3) {
                let gr = new Predator(x, y)
                predatorArr.push(gr)
            } else if (matrix[y][x] == 4) {
                let gr = new Water(x, y)
                waterArr.push(gr)
            } else if (matrix[y][x] == 5) {
                let gr = new Bomb(x, y)
                bombArr.push(gr)
            }
        }
    }

    io.sockets.emit('send matrix', matrix)
}

function game() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul()
    }

    for (let i = 0; i < grassEaterArr.length; i++) {
        grassEaterArr[i].eat()
    }

    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].eat()
    }

    for (let i = 0; i < bombArr.length; i++) {
        bombArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix);
}
setInterval(game, 300)

io.on('connection', function () {
    createObject(matrix)
})

function kill() {
    grassArr = [];
    grassEaterArr = []
    predatorArr = []
    bombArr = []
    waterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addPredator() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new Predator(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addWater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            predatorArr.push(new Water(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addBomb() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            predatorArr.push(new Bomb(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

io.on('connection', (socket) => {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add bomb", addBomb);
    socket.on("add water", addWater);
});

var statistics = {};

setInterval(function() {
  statistics.grass = grassArr.length;
  statistics.grassEater = grassEaterArr.length;
  statistics.Predator = predatorArr.length;
  statistics.Water = waterArr.length;
  statistics.Bomb = bombArr.length;
  fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
      console.log("Your statics is ready")
  })
},1000)
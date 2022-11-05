let LivingCreature = require('./LivingCreature')
module.exports = class Bomb extends LivingCreature {

    constructor(x, y) {
        super(x, y);
        this.energy = 15;
    }

    chooseCell(character1,character2,character3,character4) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1) {
                    found.push(this.directions[i]);
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character3) {
                    found.push(this.directions[i]);
                }
            }
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character4) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    eat() {
        let emptyCells = this.chooseCell(1,2,3,4)
        // console.log(emptyCells);
        if (emptyCells.length != 0) {
            for (var i in emptyCells) {
                let newX = emptyCells[i][0]
                let newY = emptyCells[i][1]
                if (matrix[newY][newX] == 1) {
                    for (var i in grassArr) {
                        if (newX == grassArr[i].x && newY == grassArr[i].y) {
                            grassArr.splice(i, 1);
                            break;
                        }
                    }
                } else if (matrix[newY][newX] == 2) {
                    for (var i in grassEaterArr) {
                        if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1);
                            break;
                        }
                    }
                } else if (matrix[newY][newX] == 3) {
                    for (var i in predatorArr) {
                        if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                            predatorArr.splice(i, 1);
                            break;
                        }
                    }
                } else if (matrix[newY][newX] == 4) {
                    for (var i in waterArr) {
                        if (newX == waterArr[i].x && newY == waterArr[i].y) {
                            waterArr.splice(i, 1);
                            break;
                        }
                    }
                }
                matrix[newY][newX] = 0
            }
        }
    }

}






















// let LivingCreature = require("./LivingCreature")
// module.exports = class Bomb extends LivingCreature {

//     constructor(x, y) {
//         super(x, y);
//         this.energy = 15;
//     }

//     eat() {
//         let emptyCells = this.chooseCell()
//         if (emptyCells.length != 0) {
//             for (var i in emptyCells) {
//                 let newX = emptyCells[i][0]
//                 let newY = emptyCells[i][1]
//                 if (matrix[newY][newX] == 1) {
//                     for (var i in grassArr) {
//                         if (newX == grassArr[i].x && newY == grassArr[i].y) {
//                             grassArr.splice(i, 1);
//                             break;
//                         }
//                     }
//                 } else if (matrix[newY][newX] == 2) {
//                     for (var i in grassEaterArr) {
//                         if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
//                             grassEaterArr.splice(i, 1);
//                             break;
//                         }
//                     }
//                 } else if (matrix[newY][newX] == 3) {
//                     for (var i in predatorArr) {
//                         if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
//                             predatorArr.splice(i, 1);
//                             break;
//                         }
//                     }
//                 } else if (matrix[newY][newX] == 4) {
//                     for (var i in waterArr) {
//                         if (newX == waterArr[i].x && newY == waterArr[i].y) {
//                             waterArr.splice(i, 1);
//                             break;
//                         }
//                     }
//                 }
//                 matrix[newY][newX] = 0
//             }
//         }
//     }
//         die() {
//         matrix[this.y][this.x] = 0
//         for (var i in grassEaterArr) {
//             if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
//                 grassEaterArr.splice(i, 1);
//                 break;
//             }
//         }
//     }

// }
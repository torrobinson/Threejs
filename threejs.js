//HOW DOES I JAVASCRIPT?
            //first attempt at making a game with javascript... uh oh
            //Helpers///////////////////////////////////////////
            if (isNotStupidIE) {
                var pieceTemplate = "<div class='flip-container'><div class='flipper'> <div class='front [CLASS]'>[CONTENTS]</div><div class='[CLASS] back'></div></div><div class='connector goUp' style='display:[UPDISPLAY];'></div><div class='connector goDown' style='display:[DOWNDISPLAY];'></div><div class='connector goLeft' style='display:[LEFTDISPLAY];'></div><div class='connector goRight' style='display:[RIGHTDISPLAY];'></div></div>";
                var emptyTemplate = "<div class='flip-container'><div class='flipper'> <div class='front piece empty'></div><div class='piece empty back'></div></div></div>";
            } else {
                var pieceTemplate = "<span class='[CLASS]'>[CONTENTS]</span>";
                var emptyTemplate = "<span class='empty piece'>&nbsp;</span>";
            }
            
            alert("-Use the arrow keys (desktop) or swipe (mobile) to move every piece around the board.\n-Every time you move, a random piece is added.\n-The upcoming color of this piece is indicated by the strip at the bottom of the play area.\n-Push two numbers together to combine them.\n-1's can only be merged with 2's and vice versa\n-3's and higer can only be merged with duplicates\n-The game ends when the board is full and no further moves can be made.");
            
            
            function randomBetween(start, end) {
                return Math.floor(Math.random() * end) + start;
            }
            
            var highScore = 0;
            //draw the pieces
            function DrawBoard(board) {
                var outputText = "";
                for (var y = 0; y < board.pieces.length; y++) {
                    for (var x = 0; x < board.pieces.length; x++) {
                        if (board.pieces[y][x] == null)
                            outputText += emptyTemplate;
                        else {
                            var leftDisplay = "none";
                            var rightDisplay = "none";
                            var upDisplay = "none";
                            var downDisplay = "none";
            
                            if (board.pieces[y][x].canRight) rightDisplay = "inline-block";
                            if (board.pieces[y][x].canLeft) leftDisplay = "inline-block";
                            if (board.pieces[y][x].canUp) upDisplay = "inline-block";
                            if (board.pieces[y][x].canDown) downDisplay = "inline-block";
                            outputText += pieceTemplate.split("[CLASS]").join(board.pieces[y][x].style).split("[CONTENTS]").join(board.pieces[y][x].value).split("[RIGHTDISPLAY]").join(rightDisplay).split("[LEFTDISPLAY]").join(leftDisplay).split("[UPDISPLAY]").join(upDisplay).split("[DOWNDISPLAY]").join(downDisplay);
                        }
            
            
                    }
                    outputText += "<br/>";
                }
            
                document.getElementById("output").innerHTML = outputText;
            
                $('#output').removeClass("red");
                $('#output').removeClass("blue");
                $('#output').removeClass("white");
            
                if (board.nextNumber == 1)
                    $('#output').addClass("blue");
                if (board.nextNumber == 2)
                    $('#output').addClass("red");
                if (board.nextNumber > 2)
                    $('#output').addClass("white");
            
            
            
                setTimeout(function () {
                    $(".front.flipped,.back.flipped").removeClass("flipped");
                }, 2);
            }
            /////////////////////////////////////////////////////
            
            
            
            //The game board/////////////////////////////////////
            function Board() {
                this.pieces = [
                    [null, null, null, null],
                    [null, null, null, null],
                    [null, null, null, null],
                    [null, null, null, null]
                ];
                this.score = 0;
                this.isDone = false;
                this.nextNumber = randomBetween(1, 3);
            }
            
            Board.prototype.PrepareTurn = function () { //ensure there is a move to make and set score
                var score = 0;
                var highestPiece = 0;
                for (var y = 0; y < this.pieces.length; y++) {
                    for (var x = 0; x < this.pieces.length; x++) {
                        if (this.pieces[y][x] != null) {
                            if (this.pieces[y][x].value > highestPiece) highestPiece = this.pieces[y][x].value;
                            this.pieces[y][x].style = this.pieces[y][x].style.split("redText").join();
                            switch (this.pieces[y][x].value) {
                            case 1:
                                score += 0;
                                break;
                            case 2:
                                score += 0;
                                break;
                            case 3:
                                score += 3;
                                break;
                            case 6:
                                score += 9;
                                break;
                            case 12:
                                score += 27;
                                break;
                            case 24:
                                score += 81;
                                break;
                            case 48:
                                score += 243;
                                break;
                            case 96:
                                score += 729;
                                break;
                            case 192:
                                score += 2187;
                                break;
                            case 384:
                                score += 6561;
                                break;
                            case 768:
                                score += 19683;
                                break;
                            case 1536:
                                score += 59049;
                                break;
                            default:
                                score += 59049;
                                break;
                            }
                        }
                    }
                }
            
                //highlight highest pieces
                $('.piece').removeClass('redText');
                for (var y = 0; y < this.pieces.length; y++)
                    for (var x = 0; x < this.pieces.length; x++)
                        if (this.pieces[y][x] != null)
                            if (this.pieces[y][x].value == highestPiece && highestPiece > 3)
                                this.pieces[y][x].style += " redText";
            
                this.score = score;
                document.title = this.score;
                if (!this.HasPossibleMove()) {
                    this.isDone = true;
                    if (score > highScore) highScore = score;
                    DrawBoard(theBoard);
                    setTimeout(function () {
                        alert("No more moves possible.\n\nFinal score: " + score + ".\nSession's highscore: " + highScore + "\n\nPress OK to reset.");
                        $("#output").fadeOut();
                        setTimeout(function () {
                            theBoard = new Board();
                            theBoard.RandomFill();
                            theBoard.PrepareTurn();
                            DrawBoard(theBoard);
                            $("#output").fadeIn();
                        }, 500);
            
                    }, 500);
            
                }
            }
            
            Board.prototype.HasPossibleMove = function () {
                //clear connectors booleans
                for (var y = 0; y < this.pieces.length; y++) {
                    for (var x = 0; x < this.pieces.length; x++) {
                        if (this.pieces[y][x] != null) {
                            this.pieces[y][x].canRight = false;
                            this.pieces[y][x].canLeft = false;
                            this.pieces[y][x].canUp = false;
                            this.pieces[y][x].canDown = false;
                        }
                    }
                }
            
                var hasmove = false;
                var directions = [
                    [-1, 0],
                    [1, 0],
                    [0, -1],
                    [0, 1]
                ];
                for (var y = 0; y != 4; y += 1) {
                    for (var x = 0; x != 4; x += 1) { //for each piece
            
                        for (var d = 0; d < 4; d++) { //for each direction
                            var merges = false;
                            if (this.pieces[y][x] != null) { //if there's a piece here
                                var xoffset = directions[d][0];
                                var yoffset = directions[d][1];
                                if ( //first if we aren't moving out of bounds
                                    (xoffset != 0 && (x + xoffset >= 0 && x + xoffset <= 3)) ||
                                    (yoffset != 0 && (y + yoffset >= 0 && y + yoffset <= 3))
                                ) {
                                    //Second will I not hit another piece?
                                    if (this.pieces[y + yoffset][x + xoffset] == null) {
                                        hasmove = true; //means there's a free space, so we're not done
                                        merges = false;
                                    } else {
            
                                        if (this.pieces[y][x].value + this.pieces[y + yoffset][x + xoffset].value == 3) {
                                            hasmove = true;
                                            merges = true;
                                        } else if (this.pieces[y][x].value == this.pieces[y + yoffset][x + xoffset].value && this.pieces[y][x].value != 1 && this.pieces[y][x].value != 2) {
                                            hasmove = true;
                                            merges = true;
                                        }
            
                                        if (hasmove && merges) { //piece being moved into can be merged into
                                            if (d == 0) { //left
                                                this.pieces[y][x].canLeft = true;
                                            } else if (d == 1) { //right
                                                this.pieces[y][x].canRight = true;
                                            } else if (d == 2) { //up
                                                this.pieces[y][x].canUp = true;
                                            } else if (d == 3) { //down
                                                this.pieces[y][x].canDown = true;
                                            }
                                        }
                                    }
                                } else {
                                    //we're pushing against a wall.
                                }
                            } else {
                                //no piece? that means a move is possible.
                                hasmove = true;
                            }
            
                        }
                    }
                }
                return hasmove;
            }
            
            Board.prototype.AddPiece = function (newPiece, x, y) {
                if (this.pieces[y][x] == null)
                    this.pieces[y][x] = newPiece;
                else
                    throw "A piece already exists at " + x + "," + y;
            }
            
            Board.prototype.GetPiecePositon = function (piece) {
                for (var y = 0; y < this.pieces.length; y++) {
                    for (var x = 0; x < this.pieces.length; x++) {
                        if (this.pieces[y][x] == piece)
                            return [x, y];
                    }
                }
                throw "Piece does not exist on board. Position unknown.";
            }
            
            Board.prototype.ChangePiecePosition = function (piece, newx, newy) {
                var oldPos = this.GetPiecePositon(piece);
                this.pieces[newy][newx] = piece;
                this.pieces[oldPos[1]][oldPos[0]] = null;
            
            }
            
            Board.prototype.MoveLeft = function () {
                this.Move(-1, 0);
            }
            Board.prototype.MoveRight = function () {
                this.Move(1, 0);
            }
            Board.prototype.MoveUp = function () {
                this.Move(0, -1);
            }
            Board.prototype.MoveDown = function () {
                this.Move(0, 1);
            }
            
            Board.prototype.Move = function (xoffset, yoffset) {
                var didMove = false;
            
                var start = 0;
                var end = 4;
                var step = +1;
                if (xoffset > 0 || yoffset > 0) { //if going down/right, resolve in reverse order
                    start = 3;
                    end = -1;
                    step = -1;
                }
                for (var y = start; y != end; y += step) {
                    for (var x = start; x != end; x += step) {
                        if (this.pieces[y][x] != null) { //if there's a piece here                    
                            this.pieces[y][x].style = this.pieces[y][x].style.replace("flipped", "");
                            if ( //if we aren't moving out of bounds
                                xoffset != 0 && (x + xoffset >= 0 && x + xoffset <= 3) ||
                                yoffset != 0 && (y + yoffset >= 0 && y + yoffset <= 3)
                            ) {
                                //Second will I not hit another piece?
                                if (this.pieces[y + yoffset][x + xoffset] == null) {
                                    //Move to empty space
                                    this.ChangePiecePosition(
                                        this.pieces[y][x],
                                        x + xoffset,
                                        y + yoffset);
                                    didMove = true;
                                } else {
                                    //hits another piece
                                    if (this.pieces[y][x].value + this.pieces[y + yoffset][x + xoffset].value == 3) {
                                        this.Combine(x, y, x + xoffset, y + yoffset, 3);
                                        didMove = true;
                                    } else if (this.pieces[y][x].value == this.pieces[y + yoffset][x + xoffset].value && this.pieces[y][x].value != 1 && this.pieces[y][x].value != 2) {
                                        this.Combine(x, y, x + xoffset, y + yoffset, this.pieces[y][x].value * 2);
                                        didMove = true;
                                    }
                                }
                            } else {
                                //we're against a wall.
                            }
                        }
                    }
                }
                if (didMove) this.AddRandom(xoffset, yoffset);
                //TODO: check for possible moves, if non, end.
            }
            
            Board.prototype.RandomFill = function () {
                //9 random pieces , 3 1s 3 2s 3 3s
            
                //Pick 9 random unique coordinates
                var spots = [];
                var randx;
                var randy;
                var values = [
                    1, 1, 1,
                    2, 2, 2,
                    3, 3, 3
                ];
            
            
                while (spots.length < 9) {
                    randx = randomBetween(0, 4);
                    randy = randomBetween(0, 4);
            
                    var found = false;
                    //check to see if it exists or not
                    for (var i = 0; i < spots.length; i++)
                        if (spots[i][0] == randx && spots[i][1] == randy)
                            found = true;
            
                    if (!found)
                        spots.push([
                            [randx],
                            [randy]
                        ]);
                }
            
                for (var i = 0; i < spots.length; i++) {
                    theBoard.AddPiece(new Piece(values[i], ""), spots[i][0], spots[i][1]);
                }
            
            
            
                //For each space, randomly pull from a 1,2, and 3 pool until empty
            
            
            }
            
            Board.prototype.Combine = function (fromx, fromy, tox, toy, newValue) {
                this.pieces[fromy][fromx] = null;
                this.pieces[toy][tox] = null;
                var extraStyle = "";
                if (newValue > 99) extraStyle += " smallerText";
                this.AddPiece(new Piece(newValue, "piece flipped" + extraStyle), tox, toy);
            }
            
            Board.prototype.GetRandomPieceValue = function () {
                //based on current board values, return an appropriate new value for a new piece
                var options = [];
                var total = 0;
                var count = 0;
                for (var y = 0; y < this.pieces.length; y++) {
                    for (var x = 0; x < this.pieces.length; x++) {
                        if (this.pieces[y][x] != null) {
                            total += this.pieces[y][x].value;
                            count++;
                        }
                    }
                }
                var average = total / count;
                if (average < 3)
                    options = [1, 1, 2, 2, 3, 3];
                if (average >= 3 && average < 6)
                    options = [1, 2, 3, 3];
                if (average >= 6 && average < 12)
                    options = [1, 1, 1, 2, 2, 2, 3, 3, 3, 6, 12];
                if (average >= 12)
                    options = [1, 1, 1, 2, 2, 2, 3, 3, 3, 6, 6, 6, 12, 24];
                var ret = options[randomBetween(0, options.length)];
                return ret;
            }
            
            
            Board.prototype.GetEmpties = function () {
                var empties = [];
                for (var y = 0; y < this.pieces.length; y++) {
                    for (var x = 0; x < this.pieces.length; x++) {
                        if (this.pieces[y][x] == null)
                            empties.push([
                                [x],
                                [y]
                            ]);
                    }
                }
                return empties;
            }
            
            Board.prototype.AddRandom = function (xoffset, yoffset) {
            
                //find all empty spaces
                var allEmpties = this.GetEmpties();
                var empties = [];
                for (var i = 0; i < allEmpties.length; i++) {
            
                    if (xoffset == -1 && yoffset == 0) { //left
                        if (allEmpties[i][0] == 3) //right column
                            empties.push(allEmpties[i]);
                    }
                    if (xoffset == 1 && yoffset == 0) { //right
                        if (allEmpties[i][0] == 0) //left column
                            empties.push(allEmpties[i]);
                    }
                    if (xoffset == 0 && yoffset == -1) { //up
                        if (allEmpties[i][1] == 3) //bottom row
                            empties.push(allEmpties[i]);
                    }
                    if (xoffset == 0 && yoffset == 1) { //down
                        if (allEmpties[i][1] == 0) //top row
                            empties.push(allEmpties[i]);
                    }
            
            
                }
                if (empties.length == 0) {
                    this.BoardFull();
                    return;
                } else {
                    //pick a random empty space and add a random new piece in its place
                    var piecePlace = empties[randomBetween(0, empties.length)];
                    theBoard.AddPiece(
                        new Piece(this.nextNumber, ""),
                        piecePlace[0],
                        piecePlace[1]
                    );
                    this.nextNumber = this.GetRandomPieceValue();
                }
            }
            /////////////////////////////////////////////////////
            
            
            
            
            //Pieces/////////////////////////////////
            function Piece(value, style) {
                this.value = value;
                if (style == "") {
                    this.style = "piece"
                    if (value == 1)
                        this.style = "one piece";
                    if (value == 2)
                        this.style = "two piece";
                    if (value > 99)
                        this.style = "smallerText piece"
                }
                if (style != "") {
                    this.style = style;
                }
                this.canRight = false;
                this.canLeft = false;
                this.canUp = false;
                this.canDown = false;
            }
            /////////////////////////////////////////
            
            
            //Set up game board
            var theBoard = new Board();
            theBoard.RandomFill();
            DrawBoard(theBoard);
            
            
            
            //Bind controls
            document.onkeydown = function (e) {
            
                e = e || event // //because IE8 sucks
            
                if (!theBoard.isDone) {
                    if (e.keyCode == 37)
                        theBoard.MoveLeft();
                    if (e.keyCode == 39)
                        theBoard.MoveRight();
                    if (e.keyCode == 38)
                        theBoard.MoveUp();
                    if (e.keyCode == 40)
                        theBoard.MoveDown();
                    theBoard.PrepareTurn();
                }
            
                DrawBoard(theBoard); //draw the first frame
            };
            
            //handle mobile swiping. Super glitchy for some reason. Iffy. Remove?
            var hammertime = Hammer(document, {
                drag_lock_to_axis: true
            }).on("drag dragup dragdown dragleft dragright swipe swipeup swipedown swipeleft swiperight", function (event) {
                event.gesture.preventDefault();
                if (event.type == "swipeup")
                    theBoard.MoveUp();
                if (event.type == "swipedown")
                    theBoard.MoveDown();
                if (event.type == "swipeleft")
                    theBoard.MoveLeft();
                if (event.type == "swiperight")
                    theBoard.MoveRight();
            
                theBoard.PrepareTurn();
                DrawBoard(theBoard);
            
            });
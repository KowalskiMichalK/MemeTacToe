var tiles = document.getElementsByClassName("tile");
var buttons = document.getElementsByClassName("button");
var registerButton = document.getElementById('dark_space');
var hist = document.getElementById('history')
var boardState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var lorBtn = document.getElementById('log_or_register');
var helloLabel = document.getElementById('hello');
var logOutBtn = document.getElementById('logOut');

var $gamelist = $('#gamelist');
var loggedin = false;
var whoseTurn = null;
var human = null;
var computer = null;

function onload(){
  hidebuttons1("inline");
  if(loggedin === true){
      lorBtn.classList.add('hidden_element');
      logOutBtn.classList.remove('hidden_element');
      getUserName();
      hist.classList.remove('hidden_element');
      refreshGameList();
  }
}

function resetgame(){
  hidebuttons2("none");
  hidebuttons3("none");
  hidebuttons1("inline");
  resetBoard();
  whoseTurn = null;
  human = null;
  computer = null;
}
function resetBoard(){
   for(var i = 0;i < 9;i++){
     buttons[4].style.background="#fff";
     tiles[i].style.background = "#fff";
     boardState[i] = 0;
   }
 }

function start2PlayerGame(){
  selectStartingPlayer();
  hidebuttons1("none");
  hidebuttons3("inline");
}
function startAIGame(){
  hidebuttons1("none");
  hidebuttons2("inline");
  console.log("startAIGame");
}
function SirPick(){
  colorPickFun("Sir");   //"Blue"
}
function BossPick(){
  colorPickFun("Boss");
}
function colorPickFun(pickedmeme){
  hidebuttons2("none");
  hidebuttons3("inline");
  selectStartingPlayer();
  human = pickedmeme;
  if (pickedmeme==="Sir") {
    computer = "Boss";
  }else{
    computer = "Sir";
  }
  if (whoseTurn===computer) {
      console.log("AIMakesSuperMove1");
    AIMakesSuperMove(boardState, 0, computer);
  }
}

function selectStartingPlayer(){
  var rr = Math.random();
  if(rr >= 0.5){
    whoseTurn = "Sir";
    buttons[4].innerText="SIR TURN";
  }else{
    whoseTurn = "Boss";
    buttons[4].innerText="BOSS TURN";
  }
}

function tileclick(clickedTile){
  if (whoseTurn == null) {
    return;
  }
  for(var i = 0;i < 9;i++){
    if (tiles[i] == clickedTile && boardState[i] == 0) {
      setTileMeme(i, whoseTurn);
    }
  }
}
function setTileMeme(index, whose){
  if (whoseTurn == null) {
     return;
  }
  if (boardState[index] === 0) {
    if (whose === "Sir") {
      tiles[index].style.backgroundImage = "url(likeasir.jpg)";
      tiles[index].style.backgroundSize = "contain";
      boardState[index] = "Sir";
    }
    if (whose === "Boss") {
      tiles[index].style.backgroundImage = "url(likeaboss.jpg)";
      tiles[index].style.backgroundSize = "contain";
      boardState[index] = "Boss";
    }
  }
  if (checkWin(boardState, whose)) {
    if (whoseTurn === "Sir") {

      buttons[4].innerText="LIKE A SIR!";

    }else{
      buttons[4].innerText="LIKE A BOSS!";
    }
    if(loggedin) {
        saveGame(whoseTurn, computer === null ? "2 Player G" : "AI G");
    }
    whoseTurn = null;
    return;
  }
  if(whoseTurn === "Sir"){
    whoseTurn = "Boss";
    buttons[4].innerText="BOSS TURN";
  }else{
    whoseTurn = "Sir";
    buttons[4].innerText="SIR TURN";
  }
  if (whoseTurn === computer) {
      AIMakesSuperMove(boardState, 0, computer);
  }
}

function checkWin(state, player){
  var result = false;
  if (chceckRowWin(state,0,1,2, player)||
      chceckRowWin(state,3,4,5, player)||
      chceckRowWin(state,6,7,8, player)||
      chceckRowWin(state,0,3,6, player)||
      chceckRowWin(state,1,4,7, player)||
      chceckRowWin(state,2,5,8, player)||
      chceckRowWin(state,0,4,8, player)||
      chceckRowWin(state,2,4,6, player)) {
    result = true;
  }
  return result;
}
function chceckRowWin(state, a,b,c, player){
  var result = false;
  if (state[a] == player && state[b] == player && state[c] == player ) {
    result = true;
  }
  return result;
}
function checkFull(board){
  for (var i = 0; i < 9; i++) {
    if (board[i]=== 0) {
      return false;
    }
  }
  return true;
}

function hidebuttons1(none){
  buttons[0].style.display = none;
  buttons[1].style.display = none;
}
function hidebuttons2(none){
  buttons[2].style.display = none;
  buttons[3].style.display = none;
}
function hidebuttons3(none){
  buttons[4].style.display = none;
  buttons[5].style.display = none;
}


function AIMakesSuperMove(board, depth, player){
    if (player===computer) {
        var noplayer = human;
    }else {
        var noplayer = computer;
    }
    if (checkWin(board, noplayer)) {
        return -10 + depth;
    }
    if (checkFull(board)) {
        return 0;
    }
    var max = -Infinity;
    var index = 0;
    for (var i = 0; i < 9; i++) {
        if (board[i] === 0) {
            var newboard = board.slice();
            newboard[i] = player;

            var moveval = -AIMakesSuperMove(newboard, depth+1, noplayer);
            if (moveval > max) {
                max = moveval;
                index = i;
            }
        }
    }
    if (depth==0) {
      setTileMeme(index, player);
    }
    return max;
}

// register button

function LorR(){
registerButton.classList.remove('hidden_element');
}

function hideSpace(){
  registerButton.classList.add('hidden_element');
}

function login(){

    var formData= $('form').serialize();
    $.ajax({
        type: 'POST',
        url: '/login',
        data: formData,
        success: function(){
            successLogIn();
        },
        error: function(){
            alert('err post');
        }

    });
    console.log("login");
}

function successLogIn(){
    loggedin = true;
    hideSpace();
    lorBtn.classList.add('hidden_element');
    logOutBtn.classList.remove('hidden_element');
    getUserName();
    hist.classList.remove('hidden_element');
    refreshGameList();
}

function register(){
    var formData= $('form').serialize();
    $.ajax({
        type: 'POST',
        url: '/register',
        data: formData,
        success: function(){
            console.log('registered');
            login();
        },
        error: function(){
            alert('err post register');
        }

    });
}

function getUserName(){
    $.ajax({
        type: 'GET',
        url: '/user',
        success: function(username){
            helloLabel.classList.remove('hidden_element');
            helloLabel.innerHTML = username;
        },
        error: function(){
            alert('err get user');
        }
    });
}

function refreshGameList(){
    $.ajax({
        type: 'GET',
        url: '/user/games',
        success: function(games){
            $.each(games, function(i, game){
                $gamelist.append('<li>Winner: '+ game.winner +', Game Type: '+ game.typeOfGame +', Date: '+ game.date +'</li>');
            });
        },
        error: function(){
            alert('err get user');
        }
    });
}

function logOut(){
    helloLabel.classList.add('hidden_element');
    lorBtn.classList.remove('hidden_element');
    logOutBtn.classList.add('hidden_element');
    hist.classList.add('hidden_element');
    $.ajax({
        type: 'GET',
        url: '/logout',
        success: function(){
            $gamelist.empty();
            resetgame()
            loggedin = false;
            console.log('logout success');
        },
        error: function(){
            alert('err logout');
        }
    });
}

function saveGame(winner, type){
    var game = {
        winner: winner,
        typeOfGame: type
    };

    $.ajax({
        type: 'POST',
        url: '/user/games',
        contentType: 'application/json',
        data: JSON.stringify(game),
        success: function(savedgame){
            $gamelist.append('<li>Winner: '+ savedgame.winner +', Game Type: '+ savedgame.typeOfGame +', Date: '+ savedgame.date +'</li>');
            console.log('post game success');
        },
        error: function(){
            alert('err post game');
        }
    });
}
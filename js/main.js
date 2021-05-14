let lakeNumber;
const margin = 100;
let offset = Math.min( (window.innerWidth-margin)/lakeNumber, (window.innerHeight-margin)/lakeNumber );
let map;
let playerLocation = [0, 0];
let knownMap;
let IsPlaying = true;
let IsShowing = false;
let IsVail = true;
let Epochs = 500;
let IsDebugging = false;
let AllowedMenu = true;

function init(LS) {
    lakeNumber = LS;
    map = MakeMap(lakeNumber);

    knownMap = MakeEmptyArray(lakeNumber, lakeNumber);
    knownMap[0][0] = 1;
    knownMap[lakeNumber-1][lakeNumber-1] = 1;
    
    initDraw();
    initMenu(lakeNumber, Epochs);
}

function initDraw(){
    offset = Math.min( (window.innerWidth-margin)/lakeNumber, (window.innerHeight-margin)/lakeNumber );

    const canvas = document.createElement('canvas');
    canvas.id = "canvas";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = "absolute";
    canvas.style.zIndex = "-1";
    canvas.style.top = "0";
    canvas.style.left = "0";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "BLACK";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if(IsShowing == false){
        Draw(playerLocation);
    }
    else{
        Draw(AILocation);
    }
}

function pause(){
    if(IsPlaying){
        IsPlaying = false;
    }
    else{
        IsPlaying = true;
    }
}

function vail(){
    if(IsVail){
        IsVail = false;
    }
    else{
        IsVail = true;
    }
}

function ClickStartLearningButton(){
    AllowedMenu = false;
    document.getElementById('Menu').style.visibility = "hidden";
    Qinit(lakeNumber,Epochs);
    AllowedMenu = true;
    document.getElementById('Menu').style.visibility = "visible";
}
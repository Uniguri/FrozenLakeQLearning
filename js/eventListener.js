window.onresize = function () {
    document.getElementById('canvas').remove();
    initDraw();
};

window.addEventListener('keypress', (e) => {
    if(IsPlaying) {
        
        /**
         * direction:
         *      left:  0
         *      down:  1
         *      up:    2
         *      right: 3
         * status:
         *      ok: 0
         *      die: 1
         *      goal: 2
         */
        var direction;
        var status;
        switch(e.key.toLowerCase()){
            case "a": //left(0)
                direction = 0;
                break;
                
            case "s": //down(1)
                direction = 1;
                break;

            case "w": //up(2)
                direction = 2;
                break;

            case "d": //right(3)
                direction = 3;
                break;
        }
        
        knownMap = playerPullVail(playerLocation, knownMap, direction, lakeNumber);
        playerLocation = move(playerLocation, direction);

        Draw(playerLocation);
    }
})

window.addEventListener("input", (event) => {
    if(event.target.id == "LakeSizeRange"){
        ChangeLakeSizeRange();
    }
    else if(event.target.id == "LakeSizeNumber"){
        ChangeLakeSizeNumber();
    }

    if(event.target.id == "IsVailRadioT"){
        vail();
        Draw(playerLocation);
    }
    else if(event.target.id == "IsVailRadioF"){
        vail();
        Draw(playerLocation);
    }

    if(event.target.id == "EpochsRange"){
        ChangeEpochsRange();
    }
    else if(event.target.id == "EpochsNumber"){
        ChangeEpochsNumber();
    }
});
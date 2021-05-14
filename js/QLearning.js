let AILocation = [0, 0]; // [x,y]
let QTable = new Array;  // [y][x][direction] direction: 0->right; 1->down

function Qinit(LS, epochs){
    QTable = new Array;
    temp = MakeEmptyArray(LS, 2);
    for(i=0; i<LS; i++){
        var t = cloneObj(temp)
        QTable.push(t);
    }
    AILocation = [0, 0]
    StartQLearning(epochs);
}

function StartQLearning(epochs){
    alert("Q Learning Start!!")
    var success = 0;
    /**
     * direction in QLearning:
     *      0: right
     *      1: down
     * direction in global:
     *      right: 3
     *      down:  1
     * status:
     *      ok: 0
     *      die: 1
     *      goal: 2      
     */
    for(epoch = 0; epoch<epochs; epoch++){
        var temp = get_max_direction(AILocation);
        var QMax = temp[0];
        var MaxDirection = temp[1]
        if(MaxDirection == 0){
            MaxGlobalDirection = 3;
        }
        else{
            MaxGlobalDirection = 1;
        }
        var status = canMove(AILocation, MaxGlobalDirection, map);
        switch(status){
            case 0:
                var movedLocation = move(cloneObj(AILocation), MaxGlobalDirection, status);
                QTable[AILocation[1]][AILocation[0]][MaxDirection] = 0.8*get_max_direction(movedLocation)[0];
                if(isNaN( QTable[AILocation[1]][AILocation[0]][MaxDirection]) ){
                    console.log(AILocation, movedLocation)
                }
                break;
            case 1:
                QTable[AILocation[1]][AILocation[0]][MaxDirection] = -10;
                break;
            case 2:
                QTable[AILocation[1]][AILocation[0]][MaxDirection] = 10;
                success++;
                break;
        }
        AILocation = move(AILocation, MaxGlobalDirection, status);
        if(IsDebugging){
            Draw(AILocation);
        }
    }
    AILocation = [0, 0];
    Draw(AILocation);
    alert(`Q Learning Complete!!(${success}/${epochs})`);
}

function get_max_direction(location){
    if(QTable[location[1]][location[0]][0] >= QTable[location[1]][location[0]][1]){
        var _QMax = QTable[location[1]][location[0]][0];
        var _MaxDirection = 0;
    }
    else{
        var _QMax = QTable[location[1]][location[0]][1];
        var _MaxDirection = 1;
    }
    return [_QMax, _MaxDirection];
}

function show_q_learning(){
    IsShowing = true;
    AllowedMenu = false;
    IsPlaying = false;
    document.getElementById('Menu').style.visibility = "hidden";

    interval = setInterval(()=>{
        var temp = get_max_direction(AILocation);
        var QMax = temp[0];
        var MaxDirection = temp[1]
        if(MaxDirection == 0){
            MaxGlobalDirection = 3;
        }
        else{
            MaxGlobalDirection = 1;
        }
        var status = canMove(AILocation, MaxGlobalDirection, map);
        switch(status){
            case 0:
                var movedLocation = move(cloneObj(AILocation), MaxGlobalDirection, status);
                QTable[AILocation[1]][AILocation[0]][MaxDirection] = 0.8*get_max_direction(movedLocation)[0];
                break;
            case 1:
                QTable[AILocation[1]][AILocation[0]][MaxDirection] = -10;
                clearInterval(interval);
                alert("Required More Learning");
                IsShowing = false;
                AllowedMenu = true;
                break;
            case 2:
                QTable[AILocation[1]][AILocation[0]][MaxDirection] = 10;
                clearInterval(interval);
                alert("Goal!");
                IsShowing = false;
                AllowedMenu = true;
                IsPlaying = true;
                break;
        }
        AILocation = move(AILocation, MaxGlobalDirection, status);
        Draw(AILocation);
    }, 200)
}

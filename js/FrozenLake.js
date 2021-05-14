function MakeMap(LakeNumber){
    /**
     * map:
     *      5 means Start
     *      9 means Goal
     *      0 means Road
     *      1 means Hole
     * roadQue:
     *      1 means right
     *      0 means down
     *      or
     *      1 means left
     *      0 means up
     */
    let map = new Array();
    let roadQue = new Array();
    let temp = new Array();
    for(i=0; i<LakeNumber; i++)
        temp.push(1);

    for(i=0; i<LakeNumber; i++)
        map.push(cloneObj(temp));

    for(i=0; i<LakeNumber-1; i++)
        roadQue.push(0);
    for(i=0; i<LakeNumber-1; i++)
        roadQue.push(1);


    roadQue.Suffle();
    let nowX = 0;
    let nowY = 0;
    roadQue.forEach(e => {
        if(e){ //right
            ++nowX;
            map[nowY][nowX] = 0;
        }
        else{ //down
            ++nowY;
            map[nowY][nowX] = 0;
        }
    });

    roadQue.Suffle();
    var lastedNum = Math.round(Math.random()*roadQue.length)
    for(i=0; i<roadQue.length - lastedNum; i++)
        roadQue.pop();

    for(e = 0; e < LakeNumber/10; e++){
        if(e%3 == 0){
            roadQue.Suffle();
            nowX = LakeNumber-1;
            nowY = LakeNumber-1;
            roadQue.forEach(e => {
                if(e){ //left
                    --nowX;
                    map[nowY][nowX] = 0;
                }
                else{ //up
                    --nowY;
                    map[nowY][nowX] = 0;
                }
            });
            
            roadQue.Suffle();
            nowX = 0;
            nowY = 0;
            roadQue.forEach(e => {
                if(e){ //right
                    ++nowX;
                    map[nowY][nowX] = 0;
                }
                else{ //down
                    ++nowY;
                    map[nowY][nowX] = 0;
                }
            });
        }
        roadQue.Suffle();
        nowX = 0;
        nowY = LakeNumber-1;
        roadQue.forEach(e => {
            if(e){ //right
                ++nowX;
                map[nowY][nowX] = 0;
            }
            else{ //up
                --nowY;
                map[nowY][nowX] = 0;
            }
        });

        roadQue.Suffle();
        nowX = LakeNumber-1;
        nowY = 0;
        roadQue.forEach(e => {
            if(e){ //left
                --nowX;
                map[nowY][nowX] = 0;
            }
            else{ //down
                ++nowY;
                map[nowY][nowX] = 0;
            }
        });

    }

    map[0][0] = 5;
    map[LakeNumber-1][LakeNumber-1] = 9;

    return map;
}

function canMove(playerLocation, direction, map){
    const maxLocation = map.length;
    /**
     * map:
     *      5 means Start
     *      9 means Goal
     *      0 means Road
     *      1 means Hole
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
    var status = 0;
    switch(direction){
        case 0: //left
            if(playerLocation[0]-1 < 0 || map[playerLocation[1]][playerLocation[0]-1] == 1)
                status = 1;
            else if(map[playerLocation[1]][playerLocation[0]-1] == 9)
                status = 2;
            break;

        case 1: //down
            if(playerLocation[1]+1 >= maxLocation || map[playerLocation[1]+1][playerLocation[0]] == 1)
                status = 1;
            else if(map[playerLocation[1]+1][playerLocation[0]] == 9)
                status = 2;
            break;

        case 2: //up
            if(playerLocation[1]-1 < 0 || map[playerLocation[1]-1][playerLocation[0]] == 1)
                status = 1;
            else if(map[playerLocation[1]-1][playerLocation[0]] == 9)
                status = 2;
            break;

        case 3: //right
            if(playerLocation[0]+1 >= maxLocation || map[playerLocation[1]][playerLocation[0]+1] == 1)
                status = 1;
            else if(map[playerLocation[1]][playerLocation[0]+1] == 9)
                status = 2;
            break;
    }
    return status;
}

function move(playerLocation, direction, status = canMove(playerLocation, direction, map)){
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
     
     if(status == 0){
        switch(direction){
            case 0:
                playerLocation[0]--;
                break;
            case 1:
                playerLocation[1]++;
                break;
            case 2:
                playerLocation[1]--;
                break;
            case 3:
                playerLocation[0]++;
                break;
        }
    }
    else if(status == 1) {
        playerLocation = [0,0];
    }
    else if(status == 2) {
        playerLocation = [0,0];
    }

    return playerLocation;
}
function playerPullVail(playerLocation, knownMap, direction, LakeNumber, status = canMove(playerLocation, direction, map)){
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

    switch(direction){
        case 0:
            if(playerLocation[0]-1>=0)
                knownMap[playerLocation[1]][playerLocation[0]-1] = 1;
            break;
        case 1:
            if(playerLocation[1]+1<LakeNumber)
                knownMap[playerLocation[1]+1][playerLocation[0]] = 1;
            break;
        case 2:
            if(playerLocation[1]-1>=0)
                knownMap[playerLocation[1]-1][playerLocation[0]] = 1;
            break;
        case 3:
            if(playerLocation[0]+1<LakeNumber)
                knownMap[playerLocation[1]][playerLocation[0]+1] = 1;
            break;
    }
    
    return knownMap;
}
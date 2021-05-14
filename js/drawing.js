function Draw(Dlocation){
    mapDraw();
    CheckDraw();
    playerDraw(Dlocation);
}

function CheckDraw(){
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.strokeStyle = 'WHITE';
    for(x=0; x < lakeNumber; x++){
        for(y=0; y < lakeNumber; y++){
            ctx.strokeRect(width/2 + x*offset - offset*lakeNumber/2, height/2 + y*offset - offset*lakeNumber/2, offset, offset)
        }
    }
}

function mapDraw(){
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    /**
     * map:
     *      5 means Start
     *      9 means Goal
     *      0 means Road
     *      1 means Hole
     */
    for(x=0; x < lakeNumber; x++){
        for(y=0; y < lakeNumber; y++){
            if(knownMap[y][x] || !IsVail){
                if(map[y][x] == 0){
                    ctx.fillStyle = "BLACK";
                }
                else if(map[y][x] == 1){
                    ctx.fillStyle = "#C0FCFE";
                }
                else if(map[y][x] == 5){
                    ctx.fillStyle = "RED";
                }
                else if(map[y][x] == 9){
                    ctx.fillStyle = "BLUE";
                }
            }
            else{
                ctx.fillStyle = "BLACK";
            }
                
            ctx.fillRect(width/2 + x*offset - offset*lakeNumber/2, height/2 + y*offset - offset*lakeNumber/2, offset, offset)
        }
    }
}

function playerDraw(location){
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    var playerX = width/2 - offset*lakeNumber/2 + location[0]*offset + offset/2;
    var playerY = height/2 - offset*lakeNumber/2 + location[1]*offset + offset/2;

    ctx.beginPath();
    ctx.fillStyle = "#38EA4F";
    ctx.arc(playerX, playerY, offset/3, 0, 2*Math.PI);
    ctx.fill();
}
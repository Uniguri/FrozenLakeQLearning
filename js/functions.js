Array.prototype.Suffle = function(counts = 1){
    for(count = 0; count < counts; count++){
        for(i=0; i < this.length; i++){
            var randnum = Math.round(Math.random()*(this.length-1));
            var temp = this[randnum];
            this[randnum] = this[i];
            this[i] = temp;
        }
    }
}

function cloneObj(obj){
    const result = {};

    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            result[key] = cloneObj(obj[key]);
        } 
        else {
            result[key] = obj[key];
        }
    }

    return result;
}

function MakeEmptyArray(x, y){ //[ [the number of element is y] * x ]
    var ret = new Array();
    var temp = new Array();

    for(i = 0; i < y; i++){
        temp.push(0);
    }
    for(i = 0; i < x; i++){
        var t = cloneObj(temp)
        ret.push(t);
    }

    return ret;
}
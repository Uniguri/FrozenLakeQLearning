function ClickMenuButton(){
    if(AllowedMenu == true){
        var Menu = document.getElementById('Menu');
        if(Menu.style.visibility == "visible"){ // Menu is visible => invisible
            Menu.style.visibility = "hidden";
        }
        else{
            Menu.style.visibility = "visible";
        }
    
        pause();
    }
}

function initMenu(LakeNumber, Epochs){
    var LakeSizeRange = document.getElementById('LakeSizeRange');
    var LakeSizeNumber = document.getElementById('LakeSizeNumber');
    var EpochsRange = document.getElementById('EpochsRange');
    var EpochsNumber = document.getElementById('EpochsNumber');
    
    LakeSizeRange.value = LakeSizeNumber.value = LakeNumber;
    EpochsRange.value = EpochsNumber.value = Epochs;

}

function ChangeLakeSizeRange(){
    var LakeSizeRange = document.getElementById('LakeSizeRange');
    var LakeSizeNumber = document.getElementById('LakeSizeNumber');

    var changedSize = LakeSizeNumber.value = LakeSizeRange.value;

    document.getElementById('canvas').remove();
    init(changedSize);
}

function ChangeLakeSizeNumber(){
    var LakeSizeRange = document.getElementById('LakeSizeRange');
    var LakeSizeNumber = document.getElementById('LakeSizeNumber');

    if(LakeSizeNumber.value < 2)
        LakeSizeNumber.value = 2;
    var changedSize = LakeSizeRange.value = LakeSizeNumber.value;

    document.getElementById('canvas').remove();
    init(changedSize);
}

function ChangeEpochsRange(){
    var EpochsRange = document.getElementById('EpochsRange');
    var EpochsNumber = document.getElementById('EpochsNumber');

    var changedEpochs = EpochsNumber.value = EpochsRange.value;

    Epochs = changedEpochs
}

function ChangeEpochsNumber(){
    var EpochsRange = document.getElementById('EpochsRange');
    var EpochsNumber = document.getElementById('EpochsNumber');

    var changedEpochs = EpochsRange.value = EpochsNumber.value;

    Epochs = changedEpochs
}

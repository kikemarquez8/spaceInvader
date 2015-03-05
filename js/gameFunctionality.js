/**
 * Created by Kike Marquez on 2/28/15.
 */
function mainLoop(){

}
/*drawRow gets the begining (x,y) of the sprite in the row,
the number of sprites to be inserted  and the type of the sprite.*/
function drawRow(begining,number,type,distance){
    var begin = begining;
    var next = number;
    if(next==0){
        return true;
    };
    var sprite = new Sprite(type,begin.x,begin.y);
    if(type.substring(0,type.length-1)=="alien")
        aliens.push(sprite);
    if(type=="barrier")
        barriers.push(sprite);
    if(type=="shooter")
        shooter=sprite;
    begin.x = begin.x+distance;
    var end = drawRow(begin,number-1,type,distance);
    if(end){
        return true;
    }
};
function drawAliens(numrows,numcolumns,types,begining,distancex,distancey){
    var i = 0;
    var begin = begining;
    while((i)!=numrows){
        if(drawRow(begin,numcolumns,types[i],distancex)){
            i++;
            begin.y +=distancey;
            begin.x = aliens[0].getCoordinates().x;
        };
    };
    return true;
};
function moveAliens(movementx,movementy){
    var cw = document.getElementById('gameCanvas').width;
    for(var i = 0; i<aliens.length;i++){
        if((aliens[i].getCoordinates().x + aliens[i].getCoordinates().w+movementx) >= cw && !movement){
            movement = true;
            direction = false;
        }else if(aliens[i].getCoordinates().x-movementx <= 0){
            movement=true;
            direction = true;
        }
    }
    aliens.forEach(function(element,index,array){
        if(movement && !direction){
            aliens[index].updatePosition(-(movementx),movementy);
        }else if(direction && movement){
            aliens[index].updatePosition(movementx,movementy);
        }else if(!direction){
            aliens[index].updatePosition(-(movementx),0);
        }else{
            aliens[index].updatePosition(movementx,0);
        }
    });
    movement=false;
};
function drawBarriers(){
    for(var i = 0; i<barriers.length;i++){
        barriers[i].changeState(true);

    }
};
function drawShooter(){
    shooter.changeState(shooterAlive);
};
window.addEventListener("keydown", function (event) {

    switch (event.keyCode) {
        case 37:
            //Left Arrow.
            if(shooter.getCoordinates().x-8>0)
                shooter.updatePosition(-8,0);
            break;
        case 39:
            //Right Arrow.
            var canvas = document.getElementById('gameCanvas').width;
            if(shooter.getCoordinates().x+shooter.getCoordinates().w < canvas)
               shooter.updatePosition(8,0);
            break;
        case 32:
            if(bullet == null) {
                console.log("newBullet");
                var bulletx = shooter.getCoordinates().x + (shooter.getCoordinates().w / 2);
                bullet = new Sprite("bullet", bulletx, shooter.getCoordinates().h);
            }
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    // Consume the event for suppressing "double action".
    event.preventDefault();
}, true);
function drawBullet(){
    bullet.updatePosition(0,5);
}
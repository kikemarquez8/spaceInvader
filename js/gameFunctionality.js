/**
 * Created by Kike Marquez on 2/28/15.
 */
var aliens = [];
var shooter;
var barriers = [];
var movement = false;
var direction = true;
var created = false;
function mainLoop(){

}
function drawCanvas(){
    var ctx = document.getElementById('gameCanvas').getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,600,600);
    if(!created){
        if(drawAliens(5,10,["alien1","alien2","alien2","alien3","alien3"],{"x":105,"y":30},30,30)){
            created=true;
        }
    }
    if(created){
        moveAliens(5,20);
        setTimeout(drawCanvas,500);
    };
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
}
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

}
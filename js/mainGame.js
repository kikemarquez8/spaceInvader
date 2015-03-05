/**
 * Created by Kike Marquez on 2/28/15.
 */
var aliens = [];
var shooter;
var barriers = [];
var bullet;
var movement = false;
var direction = true;
var created = false;
var shooterAlive = true;
var speed= {"x":20,"y":20};

function drawCanvas(){
    var ctx = document.getElementById('gameCanvas').getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,600,600);
    if(!created){
        if(drawAliens(5,10,["alien1","alien2","alien2","alien3","alien3"],{"x":105,"y":30},30,30)){
            if(drawRow({"x":40,"y":390},4,"barrier",120))
                if(drawRow({"x":233,"y":485},1,"shooter",233))
                    created=true;
        }
    }
    if(created){
        if(bullet) drawBullet();
        drawBarriers();
        moveAliens(speed.x,speed.y);
        drawShooter();
        setTimeout(drawCanvas,200);
    };
};
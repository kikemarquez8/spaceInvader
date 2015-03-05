/**
 * Created by Kike Marquez on 2/28/15.
 */
var spritesConfig= {
    "alien1": {
        width:20,
        height:20,
        path: ['images/alien11.png','images/alien12.png'],
        numberOfStates: 2,
        image: [new Image(),new Image()],
        getImage: function(){
            return this.image;
        }
    },
    "alien2": {
        width:20,
        height:15,
        path: ['images/alien21.png','images/alien22.png'],
        numberOfStates: 2,
        image: [new Image(),new Image()],
        getImage: function(){
            return this.image;
        }
    },
    "alien3": {
        width:20,
        height:15,
        path: ['images/alien31.png','images/alien32.png'],
        numberOfStates: 2,
        image: [new Image(),new Image()],
        getImage: function(){
            return this.image;
        }
    },
    "alienship": {
        width:40,
        height:20,
        path: ['images/alienship.png'],
        numberOfStates: 1,
        image: new Image(),
        getImage: function(){
            return this.image;
        }
    },
    "shooter": {
        width:35,
        height:15,
        path: ['images/shooter1.png','images/shooter2.jpg'],
        numberOfStates: 2,
        image: [new Image(),new Image()],
        getImage: function(){
            return this.image;
        }
    },
    "barrier": {
        width:60,
        height:40,
        path: ['images/barrier1.png','images/barrier2.jpg','images/barrier3.jpg','images/barrier4.jpg','images/barrier5.jpg'],
        numberOfStates: 5,
        image: [new Image(),new Image(),new Image(),new Image()],
        getImage: function(){
            return this.image;
        }
    },
    "bullet":{
        width:60,
        height:40,
        path: ['images/bullet.png'],
        numberOfStates: 1,
        image: new Image(),
        getImage: function(){
            return this.image;
        }
    }
};
loadImages();
function loadImages(){
    for(sprite in spritesConfig){
        for(var i = 0;i<spritesConfig[sprite].image.length;i++){
            spritesConfig[sprite].image[i].src = spritesConfig[sprite].path[i];
            }
        }
}
function Sprite(type,x,y){
    var sprite =spritesConfig[type];
    var image = sprite.getImage();
    var state = 0;
    var maxState = sprite.numberOfStates-1;
    var coordinates = {
        "x": x,
        "y": y,
        "w": sprite.width,
        "h": sprite.height
    };
    var draw = function(image){
        var ctx = document.getElementById('gameCanvas').getContext('2d');
        ctx.drawImage(image,coordinates.x,coordinates.y, coordinates.w,coordinates.h);
    };
    this.changeState = function(current){
        // used to create animation
        if(current== false || current === undefined) {
            state == maxState? state = 0:state++;
            draw(image[state]);
        }else{
            draw(image[state]);
        }
    };
    this.updatePosition = function(incx,incy){
        coordinates.x = coordinates.x+incx;
        coordinates.y = coordinates.y+incy;
        type=="shooter"? this.changeState(true):this.changeState();
    };
    this.getCoordinates = function(){return coordinates;};
    if(image[0].complete) {
        draw(image[0]);
    }
};


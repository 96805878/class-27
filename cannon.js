

class Cannon{

    constructor(x,y,w,h,a){
        this.x=x
        this.y=y
        this.width=w
        this.height=h
        this.angle=a
        
        this.cannonImg=loadImage("assets/canon.png");
        this.cannonBase=loadImage("assets/cannonBase.png");

    }

    display(){
        if(keyIsDown(RIGHT_ARROW)&&this.angle<=60){
            this.angle+=1
        }

        if(keyIsDown(LEFT_ARROW)&&this.angle>=-45){
            this.angle-=1
        }
       
        console.log(this.angle)
        push();
        translate(this.x,this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.cannonImg,0,0,this.width,this.height)
        pop();
  
        image(this.cannonBase,75,30,190,190)


    }



}

/*
ANGLE
Unit - degrees & radians

degress - 0 to 360
radians - 0 to 2pi

360 deg = 2pi rad
180 deg = pi rad
90 deg = pi/2 rad
60 deg = pi/3 rad
45 deg = pi/4 rad
30 deg = pi/6 rad
0 deg = 0 rad

180 deg = pi rad
1 deg = pi/180 rad
pi = 3.14

*/
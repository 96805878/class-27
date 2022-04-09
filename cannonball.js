
class Cannonball{

    constructor(x,y){
     
        this.radius=30
        this.speed=0.05
        this.isSink=false
        this.path=[]

        var cannonballOptions={

            isStatic:true

        }

        //this.x = x;

        this.body=Bodies.circle(x,y,this.radius,cannonballOptions)
        World.add(world,this.body)
        this.image=loadImage("assets/cannonball.png")
        this.animation=[this.image]

    }

    shoot(){
        
        var angle=cannon.angle-30;
        //C0nverting to radians
        var radAngle=angle*(3.14/180);
        var velocity=p5.Vector.fromAngle(radAngle)
        velocity.mult(0.5)
        Body.setStatic(this.body,false);
        Body.setVelocity(this.body,{
            x: velocity.x * (180/3.14),
            y: velocity.y * (180/3.14) });
    }
    
    display(){
        var index=floor(this.speed%this.animation.length)
        
        push();
        imageMode(CENTER)
        image(this.animation[index],this.body.position.x,this.body.position.y,this.radius,this.radius);
        pop();

        //Adding path behind the ball
        /* if(this.body.velocity.x>0 && this.body.position.x>10 && !this.isSink){

        } */

    }
        
    cannonballRemove(index){

        this.isSink=true
        Body.setVelocity(this.body,{x:0,y:0});
        this.animation=splashAnimation
        this.speed=0.5
        this.radius=100
        
        
        setTimeout(()=>{
            World.remove(world,this.body)
            delete cannonballs[index]
        },1000);

    }
    animate(){
        this.speed+=0.05
    }
}

/*
Arrow function - Binds the property/function to the original object & not to the immediate object that called it.
name = () => {}
() => {}

function(para1, para2){}
*/

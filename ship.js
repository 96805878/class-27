class Ship{

    constructor(x,y,w,h, boatPos, boatAnimation){
        this.width=w
        this.height=h
        this.body=Bodies.rectangle(x,y,w,h)
        this.boatPosition=boatPos
        this.image=loadImage("assets/boat.png")
        this.animation=boatAnimation
        this.speed=0.05
        World.add(world,this.body)
    }


    display(){

        //round - nearest integer & floor - to the smaller integer
        var index=floor(this.speed%this.animation.length);

        push();
        translate(this.body.position.x,this.body.position.y)
        rotate(this.body.angle)
        imageMode(CENTER)
        image(this.animation[index],0,this.boatPosition,this.width,this.height)
        pop();
        
    }

    boatRemove(index){
        this.animation=brokenboatAnimation;
        this.speed=0.05
        this.width=300
        this.height=300
        setTimeout(()=>{
            World.remove(world,boats[index].body);
            delete boats[index]
        }, 2000)

    }


    animate(){
        this.speed+=0.05   
    }
}

//Local function - Can be used only where its created
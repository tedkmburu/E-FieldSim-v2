function createConductor(charge, shape, position)
{
    let canvas = foreGroundCanvas;

    if (position == undefined) 
    {
        position = canvas.createVector(((innerWidth - sidePanelWidth) / 2) - 50, (innerHeight / 2) - 50);
    }
    if (shape == "rect") 
    {
        conductors.push(new Conductor({position: position, shape: shape, width: 100, height: 100, charge: charge}))
    }
    else
    {
        conductors.push(new Conductor({position: position, shape: shape, radius: 100, charge: charge}))
    }
    
}

function displayConductors()
{
    if (conductors.length > 0) 
    {
        conductors.forEach(conductor => {
            conductor.display();
        })
        conductors.forEach(conductor => {
            conductor.particles = [];
        })
        particles.forEach(particle => {
            
            particle.moveMetal();
            particle.display();
        })

        
        createDataFromSidePanel();
    }
}

function removeParticle(i)
{
    particles.splice(i,1);
}

class Conductor
{
    constructor(props)
    {
        this.position = props.position;
        this.previousPosition = props.position;
        this.draggedPosition = props.position

        this.shape = props.shape;

        if (this.shape == "circle") 
        {
            this.radius = props.radius;
            this.width = props.radius;
            this.height = props.radius;
        }
        else
        {
            this.width = props.width;
            this.height = props.height;
            
            this.leftEnd = this.position.x - (this.width / 2); 
            this.rightEnd = this.position.x + (this.width / 2);
            this.topEnd = this.position.y - (this.height / 2); 
            this.bottomEnd = this.position.y + (this.height / 2);
        }
        this.selected = false;
        this.dragging = false;
        this.charge = props.charge;


        let canvas = foreGroundCanvas;

        this.particles = []
    
        if (this.charge == "+") 
        {
            for (let x = this.leftEnd; x < this.rightEnd + 1; x+= gridSize * 2) 
            {
                for (let y = this.topEnd; y < this.bottomEnd + 1; y+= gridSize * 2) 
                {
                    particles.push(new ConductorParticle(canvas.createVector(x, y), conductorParticleCharge))
                } 
            }
        }
        else if (this.charge == "-") 
        {
            for (let x = this.leftEnd; x < this.rightEnd + 1; x+= gridSize * 2) 
            {
                for (let y = this.topEnd; y < this.bottomEnd + 1; y+= gridSize * 2) 
                {
                    particles.push(new ConductorParticle(canvas.createVector(x, y), -conductorParticleCharge))
                } 
            }
        }
        else
        {
            for (let x = this.leftEnd; x < this.rightEnd + 1; x+= gridSize * 2) 
            {
                for (let y = this.topEnd; y < this.bottomEnd + 1; y+= gridSize * 2) 
                {
                    particles.push(new ConductorParticle(canvas.createVector(x, y), conductorParticleCharge))
                } 
            }
            for (let x = this.leftEnd; x < this.rightEnd + 1; x+= gridSize * 2) 
            {
                for (let y = this.topEnd; y < this.bottomEnd + 1; y+= gridSize * 2) 
                {
                    particles.push(new ConductorParticle(canvas.createVector(x, y), -conductorParticleCharge))
                } 
            }
        }
        
    }
    


    display = function()
    {
        let canvas = foreGroundCanvas;
        let conductor = this;

        this.leftEnd = this.position.x - (this.width / 2); 
        this.rightEnd = this.position.x + (this.width / 2);
        this.topEnd = this.position.y - (this.height / 2); 
        this.bottomEnd = this.position.y + (this.height / 2);
        

        canvas.push();
            
            let particleStroke = (conductor.selected) ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)" ;
            canvas.fill("rgb(128,128,128)");
            // canvas.fill("rgba(255, 255, 255, 0.5)");
            canvas.stroke(particleStroke);
            canvas.strokeWeight(4);

            // draw the gray background for the conductor
            if (conductor.shape == "circle")
            {
                canvas.ellipseMode(canvas.CORNER)
                canvas.ellipse(conductor.position.x, conductor.position.y, conductor.radius + 10, conductor.radius + 10);
                canvas.ellipseMode(canvas.CENTER);
            } 
            // else canvas.rect(conductor.position.x - 10, conductor.position.y - 10, conductor.width + 20, conductor.height + 20);
            else canvas.rect(conductor.position.x - (conductor.width / 2) - 10, conductor.position.y - (conductor.height / 2) - 10, conductor.width + 20, conductor.height + 20);
            



            this.particles.forEach(particle => {

                let displacmentVector = p5.Vector.sub(conductor.position, conductor.previousPosition);
                particles[particle].position.add(displacmentVector);

                
            })

        canvas.pop();
        this.previousPosition = this.position;
    }
  
}



class ConductorParticle extends TestCharge
{
    constructor(position, charge, velocity, acceleration, color)
    {
        super(position, charge, velocity, acceleration, color) // inherited from the TestCharge class
        this.conductor;
    }

    display()
    {
        let canvas = foreGroundCanvas;
        let particle = this;

        canvas.push();
            canvas.noStroke();
            canvas.fill(particle.color);
            let x = particle.position.x;
            let y = particle.position.y;

            if (particle.charge > 0) 
            {
                canvas.ellipse(x + 2, y + 2, testChargeDiameter, testChargeDiameter);
            }
            else
            {
                canvas.ellipse(x - 1, y - 1, testChargeDiameter, testChargeDiameter);
            }
            
        canvas.pop();
        
    }

    moveMetal()
    {
        let particle = this;
        let canvas = foreGroundCanvas;

        

        let conductorContainsParticle = conductors.find(conductor => {
            let conductorRect = {position: canvas.createVector(conductor.leftEnd, conductor.topEnd), width: conductor.width, height: conductor.height}
            return circleIsInRect(particle, conductorRect)
        })
        let conductor = conductors[conductors.indexOf(conductorContainsParticle)];

        if (conductor != null) 
        {
            // console.log(particles.indexOf(this));
            conductor.particles.push(particles.indexOf(this));
        }
        



        let particleToConductorDistance = [];
        conductors.forEach(conductor => {
            let distance = p5.Vector.dist(particle.position, conductor.position);
            particleToConductorDistance.push(distance);
        })

        let closestConductor = Math.min(...particleToConductorDistance)
        let indexOfClosestConductor = particleToConductorDistance.indexOf(closestConductor);
        closestConductor = conductors[indexOfClosestConductor];



        if (!conductorContainsParticle) 
        {
            // console.log("edge");
            // particle.velocity = canvas.createVector(0, 0);
            particle.acceleration = canvas.createVector(0, 0);
            
            let centerOfConductor = closestConductor.position;
            let angle = p5.Vector.sub(centerOfConductor, particle.position).heading() * -1;

            let moveDistance = p5.Vector.fromAngle( canvas.degrees(-angle), 2);
            particle.velocity = (moveDistance);

            // particle.acceleration = force.mult(particle.charge);
            // particle.velocity.add(particle.acceleration);
            particle.position.add(particle.velocity);
        }
        else if (particle.charge < 0 && conductorContainsParticle != null)
        {
            
            let force = netForceAtPoint(particle.position).div(30000);

            if (force.mag() != Infinity)
            {
                // F  = qE
                // ma = qE
                // a  = (qE)/m
                // m = 1
                // a  = q*E
                particle.acceleration = force.mult(particle.charge);
                particle.velocity.add(particle.acceleration);
                particle.position.add(particle.velocity);
            }
        }


        
        
        // this.particles.forEach(particle => {
        //     // this will move all the particles as the conductor is dragged around
            // let displacmentVector = p5.Vector.sub(this.position, this.previousPosition)
            // particle.position.add(displacmentVector);


        //     // the boundary for particles inside a rectangle and cirlce are different
        //     if (particle.charge < 0 && conductor.shape == "rect") 
        //     {
        //         let conductorRect = {position: canvas.createVector(conductor.leftEnd, conductor.topEnd), width: conductor.width, height: conductor.height}
        //         if (circleIsInRect(particle, conductorRect)) 
        //         {
        //             particle.moveMetal();
        //         }
        //         else
        //         {
        //             particle.velocity = canvas.createVector(0, 0);
        //             particle.acceleration = canvas.createVector(0, 0);
                    
        //             let centerOfConductor = this.position;
        //             let angle = p5.Vector.sub(centerOfConductor, particle.position).heading() * -1;

        //             let moveDistance = p5.Vector.fromAngle( canvas.degrees(-angle), 3);
        //             particle.position.add(moveDistance);
        //         }
        //     }
        //     else if (particle.charge < 0)
        //     {
        //         if (circleIsInCircle(particle, this)) 
        //         {
        //             particle.moveMetal();
        //         }
        //         else
        //         {
        //             particle.velocity = canvas.createVector(0, 0)
        //             particle.acceleration = canvas.createVector(0, 0)
                    
        //             let centerOfConductor = canvas.createVector(this.position.x + (this.width / 2), this.position.y + (this.height / 2));
        //             let angle = p5.Vector.sub(centerOfConductor, particle.position).heading() * -1;

        //             let moveDistance = p5.Vector.fromAngle( canvas.degrees(-angle), 2);
        //             particle.position.add(moveDistance);
        //         }
        //     }
        //     particle.display();
        // })
    }

    brownian(magnitude)
    {
        let rand1 = (Math.random() * 2) - 1
        let rand2 = (Math.random() * 2) - 1
        this.position.x += rand1 * magnitude;
        this.position.y += rand2 * magnitude;
    }
}
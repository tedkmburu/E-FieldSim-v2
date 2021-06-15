function createConductor(charge, shape, position)
{
    let canvas = foreGroundCanvas;

    if (position == undefined)
    {
        position = canvas.createVector(Math.round(Math.random() * (innerWidth - sidePanelWidth) + 50), Math.round(Math.random() * innerHeight - 50));
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
        createGroups()
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

function createGroups()
{
    groups = []
    conductors.forEach((conductor, i) => 
    {
        conductors.forEach((otherConductor, j) => 
        { 
            if (i != j)
            {
                if (conductor.topEnd == otherConductor.bottomEnd || 
                    conductor.rightEnd == otherConductor.leftEnd) 
                {
                    groups.push([i,j])
                }
            }
            
        })
    })
}

function removeParticle(i)
{
    particles.splice(i,1);
}

function fillRectWithParticles(conductor, charge)
{
    let canvas = foreGroundCanvas;
    for (let x = conductor.leftEnd + 12; x < conductor.rightEnd + 1; x+= gridSize * 1.5) 
    {
        for (let y = conductor.topEnd + 12; y < conductor.bottomEnd + 1; y+= gridSize * 1.5) 
        {
            particles.push(new ConductorParticle(canvas.createVector(x, y), charge))
        } 
    }
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
            fillRectWithParticles(this, conductorParticleCharge)
        }
        else if (this.charge == "-") 
        {
            fillRectWithParticles(this, -conductorParticleCharge)
        }
        else
        {
            fillRectWithParticles(this, conductorParticleCharge)
            fillRectWithParticles(this, -conductorParticleCharge)
        }
        
    }
    


    display = function()
    {
        let canvas = foreGroundCanvas;
        let conductor = this;

        this.leftEnd = this.position.x - (this.width / 2) - 0; 
        this.rightEnd = this.position.x + (this.width / 2) + 0;
        this.topEnd = this.position.y - (this.height / 2) - 0; 
        this.bottomEnd = this.position.y + (this.height / 2) + 0;
        

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
                canvas.ellipse(conductor.position.x, conductor.position.y, conductor.radius + 0, conductor.radius + 0);
                canvas.ellipseMode(canvas.CENTER);
            } 
            // else canvas.rect(conductor.position.x - 0, conductor.position.y - 0, conductor.width + 0, conductor.height + 0);
            else canvas.rect(conductor.position.x - (conductor.width / 2) - 0, conductor.position.y - (conductor.height / 2) - 0, conductor.width + 0, conductor.height + 0);
            


            let conductorIndex = conductors.indexOf(this)
            

            particles.forEach(particle => {

                conductors.forEach((conductor, i) => {
                    let conductorRect = {position: canvas.createVector(conductor.leftEnd + testChargeRadius, conductor.topEnd + testChargeRadius) , width: conductor.width - testChargeDiameter, height: conductor.height - testChargeDiameter}
                    if (circleIsInRect(particle, conductorRect) && conductorIndex == i) 
                    {
                        particle.conductor = i;

                    }
                })       
            })

            


            this.particles.forEach(particle => {
                
                let displacmentVector = p5.Vector.sub(conductor.position, conductor.previousPosition);
                particles[particle].position.add(displacmentVector);

                

                
            })
            
            // canvas.strokeWeight(1);
            // canvas.noFill()
            // canvas.stroke("blue")
            // let width = conductor.rightEnd - conductor.leftEnd;
            // let height = conductor.bottomEnd - conductor.topEnd;

            // canvas.rect(conductor.leftEnd, conductor.topEnd, width, height)

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
            canvas.ellipseMode(canvas.CENTER)
            let x = particle.position.x;
            let y = particle.position.y;

            if (particle.charge > 0) 
            {
                canvas.ellipse(x + 1, y + 1, testChargeDiameter, testChargeDiameter);
            }
            else
            {
                canvas.ellipse(x - 1, y - 1, testChargeDiameter, testChargeDiameter);
            }

            // let chargeStringLength = this.conductor;
            // let textPositionX = x;
            // let textPositionY = y;
            // canvas.fill(0);
            // canvas.noStroke();
            // canvas.text(chargeStringLength, textPositionX, textPositionY);
        canvas.pop();
        
    }

    moveMetal()
    {
        let particle = this;
        let canvas = foreGroundCanvas;

        

        let conductorContainsParticle = conductors.find(conductor => {
            let conductorRect = {position: canvas.createVector(conductor.leftEnd + testChargeRadius, conductor.topEnd + testChargeRadius) , width: conductor.width - testChargeDiameter, height: conductor.height - testChargeDiameter}
            return circleIsInRect(particle, conductorRect)
        })
        let conductorIndex = conductors.indexOf(conductorContainsParticle)
        let conductor = conductors[conductorIndex];

        groups.forEach(group => {
            group.forEach(conductorInGroup => {
                let conductorRect = {position: canvas.createVector(conductorInGroup.leftEnd + testChargeRadius, conductorInGroup.topEnd + testChargeRadius) , width: conductorInGroup.width - testChargeDiameter, height: conductorInGroup.height - testChargeDiameter}
                if (circleIsInRect(particle, conductorRect)) 
                {
                    conductorContainsParticle = true;
                }

                canvas.strokeWeight(1);
                canvas.noFill()
                canvas.stroke("red")
                let width = conductorRect.rightEnd - conductorRect.leftEnd;
                let height = conductorRect.bottomEnd - conductorRect.topEnd;

                canvas.rect(conductorRect.leftEnd , conductorRect.topEnd, width, height)
            })
            
        })



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


        let damping = 1.01;
        particle.velocity = canvas.createVector(particle.velocity.x / damping, particle.velocity.y / damping);

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
            
            let force = netForceAtPoint(particle.position).div(3000);

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

        particle.position.x = canvas.constrain(particle.position.x, closestConductor.leftEnd, closestConductor.rightEnd)
        particle.position.y = canvas.constrain(particle.position.y, closestConductor.topEnd, closestConductor.bottomEnd)
    }

    brownian(magnitude)
    {
        let rand1 = (Math.random() * 2) - 1
        let rand2 = (Math.random() * 2) - 1
        this.position.x += rand1 * magnitude;
        this.position.y += rand2 * magnitude;
    }
}
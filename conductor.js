function createConductor(charge, shape)
{
    let canvas = foreGroundCanvas;

    let position = canvas.createVector(((innerWidth - sidePanelWidth) / 2) - 50, (innerHeight / 2) - 50);
    conductors.push(new Conductor({position: position, shape: shape, width: 100, height: 100, charge: charge}))
}

function displayConductors()
{
    if (conductors.length > 0) 
    {
        conductors.forEach(conductor =>
        {
            conductor.display();
        })
        createDataFromSidePanel();
    }
}

function removeParticle(conductor, i) // deletes a charge from the charges array and removes its slider
{
    conductor.particles.splice(i,1);
}

class Conductor
{
    constructor(props)
    {
        this.position = props.position;
        this.previousPosition = props.position;
        this.shape = props.shape;
        this.width = props.width;
        this.height = props.height;
        this.selected = false;
        this.dragging = false;
        this.charge = props.charge;


        this.particles = []

        let canvas = foreGroundCanvas;

        if (this.charge == "+") 
        {
            for (let x = 0; x < (this.width / gridSize) + 1; x++) 
            {
                for (let y = 0; y < (this.height / gridSize) + 1; y++) 
                {
                    this.particles.push(new ConductorParticle(canvas.createVector(this.position.x + (x * gridSize), this.position.y + (y * gridSize) ) , conductorParticleCharge))
                } 
            }
        }
        else if (this.charge == "-") 
        {
            for (let x = 0; x < (this.width / gridSize) + 1; x++) 
            {
                for (let y = 0; y < (this.height / gridSize) + 1; y++) 
                {
                    this.particles.push(new ConductorParticle(canvas.createVector(this.position.x + (x * gridSize), this.position.y + (y * gridSize) ) , -conductorParticleCharge))
                } 
            }
        }
        else
        {
            for (let x = 0; x < (this.width / gridSize) + 1; x++) 
            {
                for (let y = 0; y < (this.height / gridSize) + 1; y++) 
                {
                    this.particles.push(new ConductorParticle(canvas.createVector(this.position.x + (x * gridSize), this.position.y + (y * gridSize) ) , conductorParticleCharge))
                    this.particles.push(new ConductorParticle(canvas.createVector(this.position.x + (x * gridSize), this.position.y + (y * gridSize) ) , -conductorParticleCharge))
                } 
            }
        }
        
    }
    


    display = function()
    {
        let canvas = foreGroundCanvas;

        

        canvas.push();
        canvas.fill("rgba(255,255,255,0.5)")
            let particleStroke = (this.selected) ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)"
            canvas.stroke(particleStroke)
            canvas.strokeWeight(4)
            canvas.rect(this.position.x - 10, this.position.y - 10, this.width + 20, this.height + 20)


            // canvas.fill("yellow")
            // canvas.ellipse(this.position.x, this.position.y, 20 ,20)
            // if (this.selected) 
            // {
            //     createDataFromSidePanel(canvas);
            //     canvas.noStroke()
            //     canvas.fill(255)
            //     canvas.ellipse(this.position.x + this.size.x + 10, this.position.y + this.size.y + 10, 10, 10)
            // }

            // if (this.dragging) 
            // {
            //     createDataFromSidePanel()   
            // }

            let bumpWhenHitEdge = 1


            canvas.noStroke();

            this.particles.forEach(particle => {
                let fillColor = (particle.charge > 0) ? positiveChargeColor : negativeChargeColor;
                canvas.fill(fillColor)

                let displacmentVector = p5.Vector.sub(this.position, this.previousPosition)
                particle.position.add(displacmentVector);
                
                if (particle.charge < 0 ) 
                {
                    canvas.ellipse(particle.position.x, particle.position.y, testChargeDiameter, testChargeDiameter);
                    
                
                    if (circleIsInRect(particle, this)) 
                    {
                        // particle.move()
                        particle.moveMetal();
                        particle.position.x = canvas.constrain(particle.position.x, this.position.x + bumpWhenHitEdge, this.position.x + this.width - bumpWhenHitEdge)
                        particle.position.y = canvas.constrain(particle.position.y, this.position.y + bumpWhenHitEdge, this.position.y + this.height - bumpWhenHitEdge)
                        
                        // particle.brownian(2)
                    }
                    else
                    {
                        console.log("asdf");
                    }
                    // if (particle.position.x < this.position.x) 
                    // {
                    //     particle.position.x += bumpWhenHitEdge
                    //     particle.acceleration.x = 0
                    //     particle.velocity.x = 0
                    // }
                    // if (particle.position.x > this.position.x + this.width) 
                    // {
                    //     particle.position.x-=bumpWhenHitEdge
                    //     particle.acceleration.x = 0
                    //     particle.velocity.x = 0
                    // }
                    // if (particle.position.y < this.position.y) 
                    // {
                    //     particle.position.y+=bumpWhenHitEdge
                    //     particle.acceleration.y = 0
                    //     particle.velocity.y = 0
                    // }
                    // if (particle.position.y > this.position.y + this.height) 
                    // {
                    //     particle.position.y-=bumpWhenHitEdge
                    //     particle.acceleration.y = 0
                    //     particle.velocity.y = 0
                    // }
                }
                else
                {
                    // canvas.ellipse(particle.position.x + 5, particle.position.y + 5, testChargeDiameter, testChargeDiameter);

                    canvas.ellipse(particle.position.x, particle.position.y, testChargeDiameter, testChargeDiameter);
                }
                
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
    }

    display()
    {
        let canvas = foreGroundCanvas;
        let particle = this;

        canvas.push();
        canvas.stroke(0);
            canvas.fill(particle.color);
            let x = particle.position.x;
            let y = particle.position.y;
            canvas.ellipse(x, y, testChargeDiameter, testChargeDiameter);
        canvas.pop();
    }

    move()
    {
        let particle = this;
        let force = netForceAtPoint(particle.position);

        if (force.mag() != Infinity)
        {
            // F  = qE
            // ma = qE
            // a  = (qE)/m
            // m = 1
            // a  = q*E
            particle.acceleration = force.mult(particle.charge);
            testCharge.velocity.add(particle.acceleration);
            particle.position.add(particle.velocity);
        }
    }
}
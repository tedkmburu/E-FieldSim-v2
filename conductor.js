function createConductor(type)
{
    conductors.push(new Conductor(createVector(100,100), createVector(100, 100), type))
}

function displayConductors()
{
    conductors.forEach(conductor =>
    {
        conductor.display()
    })
}

class Conductor
{
    constructor(position, size, charge)
    {
        this.position = position;
        this.size = size;
        this.selected = false;
        this.dragging = false;
        this.charge = charge;


        this.particles = []

        if (this.charge == "+") 
        {

            for (let x = 0; x < (this.size.x / gridSize) + 1; x++) 
            {
                for (let y = 0; y < (this.size.y / gridSize) + 1; y++) 
                {
                    this.particles.push(new TestCharge(createVector(this.position.x + (x * gridSize), this.position.y + (y * gridSize) ) , conductorParticleCharge ))
                } 
            }
        }
        else if (this.charge == "-") 
        {
            for (let x = 0; x < (this.size.x / gridSize) + 1; x++) 
            {
                for (let y = 0; y < (this.size.y / gridSize) + 1; y++) 
                {
                    this.particles.push(new TestCharge(createVector(this.position.x + (x * gridSize), this.position.y + (y * gridSize) ) , -conductorParticleCharge ))
                } 
            }
        }
        else
        {
            for (let x = 0; x < (this.size.x / gridSize) + 1; x++) 
            {
                for (let y = 0; y < (this.size.y / gridSize) + 1; y++) 
                {
                    this.particles.push(new TestCharge(createVector(this.position.x + (x * gridSize), this.position.y + (y * gridSize) ) , conductorParticleCharge ))
                    this.particles.push(new TestCharge(createVector(this.position.x + (x * gridSize), this.position.y + (y * gridSize) ) , -conductorParticleCharge ))
                } 
            }
        }
        
    }
    


    display = function()
    {
        push();
            fill("rgba(255,255,255,0.5)")
            let particleStroke = (this.selected) ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)"
            stroke(particleStroke)
            strokeWeight(4)
            rect(this.position.x - 10, this.position.y - 10, this.size.x + 20, this.size.y + 20)
            // if (this.selected) 
            // {
            //     createDataFromMenu();
            //     noStroke()
            //     fill(255)
            //     ellipse(this.position.x + this.size.x + 10, this.position.y + this.size.y + 10, 10, 10)
            // }

            if (this.dragging) 
            {
                createDataFromMenu()   
            }

            let bumpWhenHitEdge = 1


            noStroke();
            this.particles.forEach(particle => {
                let fillColor = (particle.charge > 0) ? "rgb(255,0,0)" : "rgb(0,0,255)";
                fill(fillColor)
                
                if (particle.charge < 0 ) 
                {
                    ellipse(particle.position.x, particle.position.y, testChargeDiameter, testChargeDiameter);
                
                if (particle.position.x + testChargeDiameter > this.position.x && 
                    particle.position.x - testChargeDiameter < this.position.x + this.size.x && 
                    particle.position.y + testChargeDiameter > this.position.y &&
                    particle.position.y - testChargeDiameter < this.position.y + this.size.y) 
                    {
                        // particle.move()
                        particle.moveMetal()
                        // particle.position.x = constrain(particle.position.x, this.position.x, this.position.x + this.size.x)
                        // particle.position.y = constrain(particle.position.y, this.position.y, this.position.y + this.size.y)
                        // particle.brownian(2)
                    }
                    if (particle.position.x < this.position.x) 
                    {
                        particle.position.x+=bumpWhenHitEdge
                        particle.acceleration.x = 0
                        particle.velocity.x = 0
                    }
                    if (particle.position.x > this.position.x + this.size.x) 
                    {
                        particle.position.x-=bumpWhenHitEdge
                        particle.acceleration.x = 0
                        particle.velocity.x = 0
                    }
                    if (particle.position.y < this.position.y) 
                    {
                        particle.position.y+=bumpWhenHitEdge
                        particle.acceleration.y = 0
                        particle.velocity.y = 0
                    }
                    if (particle.position.y > this.position.y + this.size.y) 
                    {
                        particle.position.y-=bumpWhenHitEdge
                        particle.acceleration.y = 0
                        particle.velocity.y = 0
                    }
                }
                else
                {
                    // ellipse(particle.position.x + 5, particle.position.y + 5, testChargeDiameter, testChargeDiameter);
                    ellipse(particle.position.x, particle.position.y, testChargeDiameter, testChargeDiameter);
                }
                
            })
        pop();
    }


    reset = function()
    {
      this.position = createVector(200, 200);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.opacity = 1;
      this.color ="rgba(255,0,0," + this.opacity.toString() + ")";
      this.moving = true;
      this.show = true;
      this.trail = [this.position];
    }
  
}
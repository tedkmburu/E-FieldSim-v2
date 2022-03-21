function displayCursor()  
{
    let canvas = foreGroundCanvas;
    if (testChargeMode && mousePosition.x < innerWidth - sidePanelWidth)  // if testcharge mode is on, this wil show a test charge instead of the cursor
    {
        canvas.push();
            canvas.fill(255);
            canvas.stroke(0);
            canvas.ellipse(mousePosition.x, mousePosition.y, testChargeDiameter, testChargeDiameter); // creates ellipse the size of a test Charge
            canvas.fill(0);
        canvas.pop();
    
        canvas.noCursor(); // hides the cursor
    }
    else
    {
        canvas.cursor(); // displays the cursor
    }
}



function displayTestCharges() // this displays all testcharges in the testCharges array
{
    let canvas = foreGroundCanvas;
    testCharges.forEach(testCharge => {
        let isTouchingPointCharge = charges.some(charge => { // this loops through all the point charges on the screen and is true if any one of the conditions are true
            
            let distance = p5.Vector.dist(testCharge.position, charge.position); // the distance from the point charge to the test charge
            return (distance - (testChargeDiameter/2) < chargeRadius && charge.charge < 0) // if the two intersect, this is true
        })

        if (!isTouchingPointCharge) // if the testcharge is not touching a negative charge
        {
            testCharge.move();
        }
        testCharge.display();
    });
}



function createTestChargeMap() // removes all test charges then fills the screen with testcharges
{
    let canvas = foreGroundCanvas;

    testCharges = []; // clears all test charges currently on screen
    let incriment = gridSize * 2; // vertical and horizontal space between test charges

    for (let y = 0; y < innerHeight; y += incriment)
    {
        let stoppingPoint = (innerWidth > 500) ? innerWidth - sidePanelWidth : innerWidth;
        
        for (let x = 0; x < stoppingPoint; x += incriment)
        {
            testCharges.push(new TestCharge(canvas.createVector(x, y), testChargeCharge)); // creates test charges where they're supposed to go
        }
    }
}


class TestCharge extends Charge
{
    constructor(position, charge)
    {
        let canvas = foreGroundCanvas;
        super(position, charge) // inherited from the Charge class

        this.velocity = canvas.createVector(0, 0);
        this.acceleration = canvas.createVector(0, 0);
        this.radius = testChargeRadius; 

        if (this.charge > 0) this.color = positiveChargeColor;
        if (this.charge < 0) this.color = negativeChargeColor;
        if (this.charge == 0) this.color = neutralChargeColor;
    }   

    display()
    {
        let canvas = foreGroundCanvas;
        let testCharge = this;

        canvas.push();
        canvas.stroke(0);
            canvas.fill(testCharge.color);
            let x = testCharge.position.x;
            let y = testCharge.position.y;
            canvas.ellipse(x, y, testChargeDiameter, testChargeDiameter);
        canvas.pop();
    }

    move()
    {
        let testCharge = this;
        let force = netForceAtPoint(testCharge.position);

        if (force.mag() != Infinity)
        {
            // F  = qE
            // ma = qE
            // a  = (qE)/m
            // m = 1
            // a  = q*E
            testCharge.acceleration = force.mult(testCharge.charge);
            testCharge.velocity.add(testCharge.acceleration);
            testCharge.position.add(testCharge.velocity);
        }
    }

    moveMetal()
    {
        let force = netForceAtPoint(this.position).div(1000);

        if (force.mag() != Infinity)
        {
            // F  = qE
            // ma = qE
            // a  = (qE)/m
            // m = 1
            // a  = q*E
            this.acceleration = force.mult(this.charge);
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
        }
    }

    brownian(magnitude)
    {
        let rand1 = Math.round(Math.random() * 2) - 1
        let rand2 = Math.round(Math.random() * 2) - 1
        this.position.x += rand1 * magnitude;
        this.position.y += rand2 * magnitude;
    }

    checkWallCollision()
    {
        for (let i = 0; i < walls.length; i++)
        {
            if (collideRectCircle(walls[i].x, walls[i].y, walls[i].width * gridSize, walls[i].height * gridSize, this.position.x, this.position.y, testChargeDiameter))
            {
                this.velocity = createVector(0, 0);
            }
        }
    }


}
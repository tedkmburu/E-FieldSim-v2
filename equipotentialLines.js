function createEquipotentialLines()
{
    equiLines = [];

    charges.forEach(charge => {
        if (charge.charge != 0) {
            let originPoint = p5.Vector.add(charge.position, createVector(100,0))
            let originPoint2 = p5.Vector.add(charge.position, createVector(200,0))
            let originPoint3 = p5.Vector.add(charge.position, createVector(300,0))
            let originPoint4 = p5.Vector.add(charge.position, createVector(400,0))
            getEquiLinePoints(originPoint);
            // getEquiLinePoints(originPoint2);
            // getEquiLinePoints(originPoint3);
            // getEquiLinePoints(originPoint4);
        }
    })
}



function displayEquipotentialLines()
{
    equiLines.forEach(equiLine => {
        equiLine.display()
    });
}



function getEquiLinePoints(originPoint, currentPoint, numberOfLoops, arrayOfPoints)
{
    if (arrayOfPoints == undefined) 
    {
        arrayOfPoints = [originPoint, originPoint]
        currentPoint = originPoint;
        numberOfLoops = 0;
    }

    let forceVector = netForceAtPoint(currentPoint).setMag(5).rotate(90);
    let nextPoint = p5.Vector.add(forceVector, currentPoint);
    

    
    let voltageAtOrigin = voltageAtPoint(originPoint)
    let voltateAtCurrentNextPoint = voltageAtPoint(nextPoint)

    let angleToOrigin = currentPoint.angleBetween(originPoint)

    //console.log(voltageAtOrigin + "  " + voltateAtCurrentNextPoint);
    //console.log(angleToOrigin);

    if (voltageAtOrigin > voltateAtCurrentNextPoint) 
    {
        //nextPoint = p5.Vector.fromAngle(angleToOrigin, -5).add(nextPoint)
        //let a = p5.Vector.sub(currentPoint, nextPoint)
        let ab = currentPoint.angleBetween(nextPoint) 

        console.log(ab);
    }



    arrayOfPoints.push(nextPoint)
    //let distanceToOriginPoint = p5.Vector.dist(originPoint, nextPoint);

    //if (numberOfLoops < 400 && (distanceToOriginPoint < chargeDiameter || numberOfLoops < 200)) 
    if (numberOfLoops < 200) 
    {
        getEquiLinePoints(originPoint, nextPoint, numberOfLoops + 1, arrayOfPoints)
    }
    else
    {
        equiLines.push(new EquiLine(arrayOfPoints));
    }

    
}



class EquiLine
{
    constructor(equiLinePoints)
    {
        this.equiLinePoints = equiLinePoints;
    }

    display()
    {
        push()

            beginShape();
            //beginShape(POINTS);
            
                fill("red")
                circle(this.equiLinePoints[0].x, this.equiLinePoints[0].y, 10, 10)
                noFill();
                stroke(255);
                strokeWeight(1)

                this.equiLinePoints.forEach(point => {
                    curveVertex(point.x, point.y);
                });
            endShape();
        
        pop()

    }
  
}
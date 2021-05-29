function createEquipotentialLines()
{

}





function displayEquipotentialLines()
{
    equiLines = []
    let mousePostition = createVector(mouseX, mouseY);
    getEquiLinePoints(mousePostition);
    getEquiLinePoints2(mousePostition);

    equiLines.forEach(equiLine => {
        equiLine.display()
    });
}



function getEquiLinePoints(originPoint, currentPoint, numberOfLoops, arrayOfPoints)
{
    if (arrayOfPoints == undefined) 
    {
        arrayOfPoints = [originPoint]
        currentPoint = originPoint;
        numberOfLoops = 0;
    }

    let forceVector = netForceAtPoint(currentPoint);
    forceVector.rotate(90);
    forceVector.setMag(2);

    let nextPoint = p5.Vector.add(forceVector, currentPoint);
    arrayOfPoints.push(nextPoint);
    
    if (numberOfLoops < 4000) 
    {
        getEquiLinePoints(originPoint, nextPoint, numberOfLoops + 1, arrayOfPoints)
    }
    else
    {
        equiLines.push(new EquiLine(arrayOfPoints));
    }

    
}
function getEquiLinePoints2(originPoint, currentPoint, numberOfLoops, arrayOfPoints)
{
    if (arrayOfPoints == undefined) 
    {
        arrayOfPoints = [originPoint]
        currentPoint = originPoint;
        numberOfLoops = 0;
    }

    let forceVector = netForceAtPoint(currentPoint);
    forceVector.mult(-1);
    forceVector.rotate(90);
    forceVector.setMag(2);

    let nextPoint = p5.Vector.add(forceVector, currentPoint);
    arrayOfPoints.push(nextPoint);
    
    if (numberOfLoops < 4000) 
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
            
                // fill("red")
                // circle(this.equiLinePoints[0].x, this.equiLinePoints[0].y, 10, 10)
                noFill();
                stroke("rgba(255,255,255,0.5)");
                strokeWeight(1)

                this.equiLinePoints.forEach((point, i) => {
                    curveVertex(point.x, point.y);
                    // if (i % 10 == 0) 
                    // {
                    //     let distanceToOriginPoint = p5.Vector.dist(point, this.equiLinePoints[0])
                    //     let voltage = voltageAtPoint(point)
                    //     text(Math.round(distanceToOriginPoint), point.x - 15, point.y)    
                    // }
                });
            endShape();
        
        pop()

    }
  
}
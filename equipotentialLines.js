function displayEquipotentialLines()
{
    equiLines = []
    let mousePostition = createVector(mouseX, mouseY);
    getEquiLinePoints(mousePostition, -1);
    getEquiLinePoints(mousePostition, 1);

    equiLines.forEach(equiLine => {
        equiLine.display()
    });
}



function getEquiLinePoints(originPoint, direction, currentPoint, numberOfLoops, arrayOfPoints)
{
    if (arrayOfPoints == undefined) 
    {
        arrayOfPoints = [originPoint, originPoint]
        currentPoint = originPoint;
        numberOfLoops = 0;
    }

    let forceVector = netForceAtPoint(currentPoint);
    forceVector.mult(direction);
    forceVector.rotate(90);
    forceVector.setMag(equiLinesAccuracy);


    let nextPoint = p5.Vector.add(currentPoint, forceVector);
    arrayOfPoints.push(nextPoint);


    let distanceToOriginPoint = p5.Vector.dist(currentPoint, originPoint)
    if (distanceToOriginPoint < 10 && numberOfLoops > 100) numberOfLoops = equiLinesLimit;
        
    
    if (numberOfLoops < equiLinesLimit) getEquiLinePoints(originPoint, direction, nextPoint, numberOfLoops + 1, arrayOfPoints)
    else equiLines.push(new EquiLine(arrayOfPoints));
}



class EquiLine
{
    constructor(equiLinePoints)
    {
        this.equiLinePoints = equiLinePoints;
    }

    display()
    {
        let points = this.equiLinePoints
        push()
            beginShape();
                noFill()
                let strokeColor = voltageAtPoint(points[0]) > 0 ? positiveChargeColor : negativeChargeColor ;
                stroke(strokeColor);
                strokeWeight(3)

                points.forEach(point => curveVertex(point.x, point.y));
            endShape();
        
        pop()

    }
  
}
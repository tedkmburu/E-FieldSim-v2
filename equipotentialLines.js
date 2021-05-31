function displayEquipotentialLines(canvas)
{
    equiLines = []
    getEquiLinePoints(mousePosition, canvas, -1);
    getEquiLinePoints(mousePosition, canvas, 1);

    equiLines.forEach(equiLine => {
        equiLine.display(canvas);
    });
}



function getEquiLinePoints(originPoint, canvas, direction, currentPoint, numberOfLoops, arrayOfPoints)
{
    if (arrayOfPoints == undefined) 
    {
        arrayOfPoints = [originPoint, originPoint]
        currentPoint = originPoint;
        numberOfLoops = 0;
    }

    let forceVector = netForceAtPoint(currentPoint, canvas);
    forceVector.mult(direction);
    forceVector.rotate(Math.PI / 2);
    forceVector.setMag(equiLinesAccuracy);


    let nextPoint = p5.Vector.add(currentPoint, forceVector);
    arrayOfPoints.push(nextPoint);


    let distanceToOriginPoint = p5.Vector.dist(currentPoint, originPoint)
    if (distanceToOriginPoint < 10 && numberOfLoops > 100) numberOfLoops = equiLinesLimit;
        
    
    if (numberOfLoops < equiLinesLimit) getEquiLinePoints(originPoint, canvas, direction, nextPoint, numberOfLoops + 1, arrayOfPoints)
    else equiLines.push(new EquiLine(arrayOfPoints));
}



class EquiLine
{
    constructor(equiLinePoints)
    {
        this.equiLinePoints = equiLinePoints;
    }

    display(canvas)
    {
        let points = this.equiLinePoints
        canvas.push()
            canvas.beginShape();
            canvas.noFill()
                let strokeColor = voltageAtPoint(points[0], canvas) > 0 ? positiveChargeColor : negativeChargeColor ;
                canvas.stroke(strokeColor);
                canvas.strokeWeight(3)

                points.forEach(point => canvas.curveVertex(point.x, point.y));
            canvas.endShape();
        
        canvas.pop()

    }
  
}
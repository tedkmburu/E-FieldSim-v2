function displayEquipotentialLines()
{
    
    equiLines = []

    getEquiLinePoints(mousePosition);

    equiLines.forEach(equiLine => {
        equiLine.display();
    });
    
}



function getEquiLinePoints(originPoint, leftPoint, rightPoint, numberOfLoops, arrayOfLeftPoints, arrayOfRightPoints)
{
    if (arrayOfLeftPoints == undefined) 
    {
        arrayOfLeftPoints = [originPoint, originPoint]
        arrayOfRightPoints = [originPoint, originPoint]
        leftPoint = originPoint;
        rightPoint = originPoint;
        numberOfLoops = 0;
    }

    let forceVector = netForceAtPoint(leftPoint);
    forceVector.rotate(Math.PI / 2);
    forceVector.setMag(equiLinesAccuracy);

    let nextLeftPoint = p5.Vector.add(leftPoint, forceVector);
    arrayOfLeftPoints.push(nextLeftPoint);





    forceVector = netForceAtPoint(rightPoint);
    forceVector.mult(-1);
    forceVector.rotate(Math.PI / 2);
    forceVector.setMag(equiLinesAccuracy);

    let nextRightPoint = p5.Vector.add(rightPoint, forceVector);
    arrayOfRightPoints.push(nextRightPoint);


    if (numberOfLoops % 5 == 0) {
        arrayOfRightPoints.forEach(point => {
            if (p5.Vector.dist(leftPoint, point) < 10 && numberOfLoops > 100) 
            {
                numberOfLoops = equiLinesLimit;
            }
        })
    }
    
    
    
    if (numberOfLoops < equiLinesLimit)
    {
        getEquiLinePoints(originPoint, nextLeftPoint, nextRightPoint, numberOfLoops + 1, arrayOfLeftPoints, arrayOfRightPoints);
    } 
    else
    {
        //equiLines.push(new EquiLine(arrayOfLeftPoints.concat(arrayOfRightPoints.reverse())));
        //.reverse()
        // equiLines.push(new EquiLine(arrayOfRightPoints));

        equiLines.push(new EquiLine(arrayOfLeftPoints));
        equiLines.push(new EquiLine(arrayOfRightPoints));
    } 
}

// 2000 - 0.25

class EquiLine
{
    constructor(equiLinePoints)
    {
        this.equiLinePoints = equiLinePoints;
    }

    display()
    {
        let canvas = foreGroundCanvas;
        let points = this.equiLinePoints
        canvas.push()
            canvas.beginShape();
            canvas.noFill()
                let strokeColor = voltageAtPoint(points[0]) > 0 ? positiveChargeColor : negativeChargeColor ;
                canvas.stroke(strokeColor);
                canvas.strokeWeight(3)

                points.forEach(point => canvas.curveVertex(point.x, point.y));
            canvas.endShape();
        
        canvas.pop()

    }
  
}
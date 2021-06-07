function displayEquipotentialLines()
{
    equiLines.forEach(equiLine => {
        equiLine.display();
    });
}

function createEquipotentialLine(position)
{
    getEquiLinePoints(position);    
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


    for (let i = 0; i < 100; i++) 
    {
        let forceVector = netForceAtPoint(leftPoint);
        forceVector.rotate(Math.PI / 2);
        forceVector.setMag(equiLinesAccuracy);
        leftPoint = p5.Vector.add(leftPoint, forceVector);
    }
    arrayOfLeftPoints.push(leftPoint);


    for (let i = 0; i < 100; i++) 
    {
        let forceVector = netForceAtPoint(rightPoint);
        forceVector.mult(-1);
        forceVector.rotate(Math.PI / 2);
        forceVector.setMag(equiLinesAccuracy);
        rightPoint = p5.Vector.add(rightPoint, forceVector);
    }
    arrayOfRightPoints.push(rightPoint);



    if (numberOfLoops > 10) 
    {
        arrayOfRightPoints.forEach(point => {
            let pointToCheck = arrayOfLeftPoints[arrayOfLeftPoints.length - 5]
            if (p5.Vector.dist(pointToCheck, point) < 20) 
            {
                numberOfLoops = equiLinesLimit;
            }
        })
    }
    
    
    
    
    
    if (numberOfLoops < equiLinesLimit)
    {
        getEquiLinePoints(originPoint, leftPoint, rightPoint, numberOfLoops + 1, arrayOfLeftPoints, arrayOfRightPoints);
    } 
    else
    {
        let distanceBetweenLines = p5.Vector.dist(arrayOfLeftPoints[arrayOfLeftPoints.length - 1], arrayOfRightPoints[arrayOfRightPoints.length - 1])
        if (distanceBetweenLines < 10) 
        {
            arrayOfLeftPoints.push(arrayOfRightPoints[arrayOfRightPoints.length - 1])
            arrayOfRightPoints.push(arrayOfLeftPoints[arrayOfLeftPoints.length - 1])
        }
        

        equiLines.push(new EquiLine(arrayOfLeftPoints));
        equiLines.push(new EquiLine(arrayOfRightPoints));
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
        let canvas = foreGroundCanvas;
        let points = this.equiLinePoints
        canvas.push()
            canvas.beginShape();
            canvas.noFill()

                let strokeColor;
                let voltageOfLine = voltageAtPoint(points[0]);
                if (voltageOfLine == 0) strokeColor = neutralChargeColor;
                if (voltageOfLine > 0)  strokeColor = positiveChargeColor;
                if (voltageOfLine < 0)  strokeColor = negativeChargeColor;

                canvas.stroke(strokeColor);
                canvas.strokeWeight(2)

                //points.forEach(point => canvas.vertex(point.x, point.y));
                points.forEach(point => canvas.curveVertex(point.x, point.y));
            canvas.endShape();
        
        canvas.pop()

    }
  
}
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


    for (let i = 0; i < 10; i++) 
    {
        let forceVector = netForceAtPoint(leftPoint);
        forceVector.rotate(Math.PI / 2);
        forceVector.setMag(equiLinesAccuracy);
        leftPoint = p5.Vector.add(leftPoint, forceVector);
    }
    arrayOfLeftPoints.push(leftPoint);


    for (let i = 0; i < 10; i++) 
    {
        let forceVector = netForceAtPoint(rightPoint);
        forceVector.mult(-1);
        forceVector.rotate(Math.PI / 2);
        forceVector.setMag(equiLinesAccuracy);
        rightPoint = p5.Vector.add(rightPoint, forceVector);
    }
    arrayOfRightPoints.push(rightPoint);



    arrayOfRightPoints.forEach(point => {
        if (p5.Vector.dist(leftPoint, point) < 20 & numberOfLoops > 10) 
        {
            numberOfLoops = equiLinesLimit;
        }
    })
    
    
    
    
    if (numberOfLoops < equiLinesLimit)
    {
        getEquiLinePoints(originPoint, leftPoint, rightPoint, numberOfLoops + 1, arrayOfLeftPoints, arrayOfRightPoints);
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
                canvas.strokeWeight(2)

                //points.forEach(point => canvas.vertex(point.x, point.y));
                points.forEach(point => canvas.curveVertex(point.x, point.y));
            canvas.endShape();
        
        canvas.pop()

    }
  
}
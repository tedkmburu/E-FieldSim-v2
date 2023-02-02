function displayEquipotentialLines()
{
    equiLines.forEach(equiLine => {
        equiLine.display();
    });

    // showMouseEquiLinePoints(mousePosition.copy())
}

function createEquipotentialLine(position)
{
    if (charges.length != 0) 
    {
        let newEquiLines = getEquiLinePoints(position);  
        // console.log(newEquiLines);
        // equiLines.push(newEquiLines[0]);
        // equiLines.push(newEquiLines[1]);
    }
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
        
        let leftPoints = new EquiLine(arrayOfLeftPoints)
        let rightPoints = new EquiLine(arrayOfRightPoints)

        // console.log(leftPoints, rightPoints);

        // return {left: leftPoints, right: rightPoints}
        equiLines.push(leftPoints);
        equiLines.push(rightPoints);
    } 
}




function showMouseEquiLinePoints(originPoint, leftPoint, rightPoint, numberOfLoops, arrayOfLeftPoints, arrayOfRightPoints)
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
        showMouseEquiLinePoints(originPoint, leftPoint, rightPoint, numberOfLoops + 1, arrayOfLeftPoints, arrayOfRightPoints);
    } 
    else
    {
        let distanceBetweenLines = p5.Vector.dist(arrayOfLeftPoints[arrayOfLeftPoints.length - 1], arrayOfRightPoints[arrayOfRightPoints.length - 1])
        if (distanceBetweenLines < 10) 
        {
            arrayOfLeftPoints.push(arrayOfRightPoints[arrayOfRightPoints.length - 1])
            arrayOfRightPoints.push(arrayOfLeftPoints[arrayOfLeftPoints.length - 1])
        }
        
        new EquiLine(arrayOfLeftPoints).display()
        new EquiLine(arrayOfRightPoints).display()

        // console.log(leftPoints, rightPoints);

        // return {left: leftPoints, right: rightPoints}
        // equiLines.push(leftPoints);
        // equiLines.push(rightPoints);
    } 
}

class EquiLine
{
    constructor(equiLinePoints)
    {
        this.equiLinePoints = equiLinePoints;

        let canvas = foreGroundCanvas;

        let voltageOfLine = voltageAtPoint(equiLinePoints[0]);
        // let intensity = Math.round(canvas.map(Math.abs(voltageOfLine), 0, 5475, 0, 255));
        let intensity = Math.round(canvas.map(Math.abs(voltageOfLine), 0, 475, 0, 255));

        let red = 0;
        let blue = 0;
        let alpha = intensity * 10;

        if (voltageOfLine > 0) red = intensity;
        else if (voltageOfLine < 0) blue = intensity;

        let voltageColor = canvas.color(red, 0, blue, alpha);

        if (voltageOfLine == 0) 
        {
            voltageColor = canvas.color(255,255,255,255)  
        }

        this.strokeColor = voltageColor;
    }

    display()
    {
        let canvas = foreGroundCanvas;
        let points = this.equiLinePoints
        canvas.push()
            canvas.beginShape();
            canvas.noFill()

                // let strokeColor;
                // let voltageOfLine = voltageAtPoint(points[0]);
                // if (voltageOfLine == 0) strokeColor = neutralChargeColor;
                // if (voltageOfLine > 0)  strokeColor = positiveChargeColor;
                // if (voltageOfLine < 0)  strokeColor = negativeChargeColor;

                canvas.stroke(this.strokeColor);
                canvas.strokeWeight(2)

                //points.forEach(point => canvas.vertex(point.x, point.y));
                points.forEach(point => canvas.curveVertex(point.x, point.y));
            canvas.endShape();
        
        canvas.pop()

    }
  
}
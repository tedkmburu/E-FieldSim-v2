function displayFieldLines(canvas)
{
    fieldLines.forEach(fieldLine => {
        fieldLine.display(canvas);
    });

    fieldLineArrows.forEach(fieldLineArrow => {
        fieldLineArrow.display(canvas);
    });
}



function createFieldLines(canvas)
{
    fieldLines = [];
    fieldLineArrows = []

    charges.forEach(charge => {

        let radius = chargeRadius / 2;
        let times = Math.abs(charge.charge) * fieldLinesPerCoulomb;
        let origin = charge.position;

        let point = canvas.createVector(radius,radius);
        for (let a = 0; a < times; a++)
        {
            let startingPosition = canvas.createVector(point.x + origin.x, point.y + origin.y)
            getFieldLinePoints(startingPosition, canvas);

            //point = p5.Vector.add(point, canvas.createVector(0,0));
            point.rotate((2 * Math.PI) / times);
        }
        
    });
}



function getFieldLinePoints(startingPosition, canvas, numberOfLoops, listOfPoints)
{
    if (listOfPoints == undefined) 
    {
        listOfPoints = [startingPosition]   
        numberOfLoops = 0; 
    }

    if (numberOfLoops % 7 == 0) 
    {
        let arrowPosition = startingPosition;
        let arrowAngle = noPositiveCharges ? netForceAtPoint(startingPosition, canvas).mult(-1).heading() : netForceAtPoint(startingPosition, canvas).heading();

        fieldLineArrows.push(new FieldLineArrow(arrowPosition, arrowAngle));
    }

    let forceVector = noPositiveCharges ? netForceAtPoint(startingPosition, canvas).setMag(chargeRadius).mult(-1) : netForceAtPoint(startingPosition, canvas).setMag(chargeRadius);
    let forceVectorFinalPosition = p5.Vector.add(forceVector, startingPosition);

    let finalPositionToChargesDistance = [];
    charges.forEach(charge => {
        let finalPositionToChargeDistance = p5.Vector.dist(startingPosition, charge.position)
        finalPositionToChargesDistance.push(finalPositionToChargeDistance)
    })

    let closestChargeDistance = Math.min(...finalPositionToChargesDistance)
    if (closestChargeDistance > chargeRadius / 2 && numberOfLoops < 100) 
    {
        listOfPoints.push(forceVectorFinalPosition);
        getFieldLinePoints(forceVectorFinalPosition, canvas, numberOfLoops + 1, listOfPoints);
    }
    else if (closestChargeDistance < chargeRadius / 2)
    {
        let index = finalPositionToChargesDistance.indexOf(closestChargeDistance)

        listOfPoints.push(charges[index].position)

        fieldLines.push(new FieldLine(listOfPoints));
    }
    else
    {
        fieldLines.push(new FieldLine(listOfPoints));
    }


}



class FieldLine
{
    constructor(fieldLinePoints)
    {
        this.fieldLinePoints = fieldLinePoints;
    }
    
    display(canvas)
    {
        canvas.beginShape();
        //beginShape(POINTS);
        canvas.noFill();
            canvas.stroke(255);
            canvas.vertex(this.fieldLinePoints[0].x, this.fieldLinePoints[0].y)
            this.fieldLinePoints.forEach(point => {
                canvas.curveVertex(point.x, point.y);
            })
        canvas.endShape();
        
    }
}



class FieldLineArrow
{
    constructor(position, direction)
    {
        this.position = position;
        this.direction = direction;
    }

    display(canvas)
    {
        canvas.push();
            canvas.stroke(255);
            canvas.translate(this.position.x, this.position.y)
            canvas.rotate(this.direction);
            canvas.fill(255);
            canvas.triangle(0, 0, -10, -5, -10, 5);
        canvas.pop();
    }
}
function displayFieldLines()
{
    fieldLines.forEach(fieldLine => {
        fieldLine.display()
    });

    fieldLineArrows.forEach(fieldLineArrow => {
        fieldLineArrow.display()
    });
}



function createFieldLines()
{
    fieldLines = [];
    fieldLineArrows = []

    charges.forEach(charge => {

        let radius = chargeRadius / 2;
        let times = Math.abs(charge.charge) * fieldLinesPerCoulomb;
        let origin = charge.position;

        let point = createVector(radius,radius);
        for (let a = 0; a < times; a++)
        {
            let startingPosition = createVector(point.x + origin.x, point.y + origin.y)
            getFieldLinePoints(startingPosition);

            point = p5.Vector.add(point, createVector(0,0));
            point.rotate(362 / times);
        }
        
    });
}



function getFieldLinePoints(startingPosition, numberOfLoops, listOfPoints)
{
    if (listOfPoints == undefined) 
    {
        listOfPoints = [startingPosition]   
        numberOfLoops = 1; 
    }

    if (numberOfLoops % 7 == 0) 
    {
        let arrowPosition = startingPosition;
        let arrowAngle = noPositiveCharges ? netForceAtPoint(startingPosition).mult(-1).heading() : netForceAtPoint(startingPosition).heading();

        fieldLineArrows.push(new FieldLineArrow(arrowPosition, arrowAngle));
    }

    let forceVector = noPositiveCharges ? netForceAtPoint(startingPosition).setMag(chargeRadius).mult(-1) : netForceAtPoint(startingPosition).setMag(chargeRadius);
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
        getFieldLinePoints(forceVectorFinalPosition, numberOfLoops + 1, listOfPoints);
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
    
    display()
    {
        beginShape();
        //beginShape(POINTS);
            noFill();
            stroke(255);
            vertex(this.fieldLinePoints[0].x, this.fieldLinePoints[0].y)
            this.fieldLinePoints.forEach(point => {
                curveVertex(point.x, point.y);
            })
        endShape();
        
    }
}



class FieldLineArrow
{
    constructor(position, direction)
    {
        this.position = position;
        this.direction = direction;
    }

    display()
    {
      push();
        stroke(255);
        translate(this.position.x, this.position.y)
        rotate(this.direction);
        fill(255);
        triangle(0, 0, -10, -5, -10, 5);
      pop();
    }
}
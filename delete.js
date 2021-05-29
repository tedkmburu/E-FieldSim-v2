function createEquipotentialLines()
{
    equiLines = [];
    let originPoints = []

    charges.forEach(charge => {
        if (charge.charge != 0) {
            
            originPoints.push(p5.Vector.add(charge.position, createVector(50,0)))
            originPoints.push(p5.Vector.add(charge.position, createVector(100,0)))
            originPoints.push(p5.Vector.add(charge.position, createVector(200,0)))
            originPoints.push(p5.Vector.add(charge.position, createVector(400,0)))

            originPoints.push(p5.Vector.sub(charge.position, createVector(50,0)))
            originPoints.push(p5.Vector.sub(charge.position, createVector(100,0)))
            originPoints.push(p5.Vector.sub(charge.position, createVector(200,0)))
            originPoints.push(p5.Vector.sub(charge.position, createVector(400,0)))

            originPoints.push(p5.Vector.add(charge.position, createVector(0, 50)))
            originPoints.push(p5.Vector.add(charge.position, createVector(0, 100)))
            originPoints.push(p5.Vector.add(charge.position, createVector(0, 200)))
            originPoints.push(p5.Vector.add(charge.position, createVector(0, 400)))

            originPoints.push(p5.Vector.sub(charge.position, createVector(0, 50)))
            originPoints.push(p5.Vector.sub(charge.position, createVector(0, 100)))
            originPoints.push(p5.Vector.sub(charge.position, createVector(0, 200)))
            originPoints.push(p5.Vector.sub(charge.position, createVector(0, 400)))

            
            
        }
    })
    
    originPoints.forEach((point, index) => {
        originPoints.forEach((otherPoint, otherIndex) => {
            if (p5.Vector.dist(point, otherPoint) < chargeDiameter * 2 && otherIndex != index) 
            {
                originPoints.splice(index, 1);
            }
        })
    })

    originPoints.forEach(point => {
        getEquiLinePoints(point, originPoints);
    })

}





function displayEquipotentialLines()
{
    equiLines.forEach(equiLine => {
        equiLine.display()
    });
}



function getEquiLinePoints(originPoint, allOriginPoints, currentPoint, numberOfLoops, arrayOfPoints)
{
    if (arrayOfPoints == undefined) 
    {
        arrayOfPoints = [originPoint, originPoint]
        currentPoint = originPoint;
        numberOfLoops = 0;
    }

    let forceVector = netForceAtPoint(currentPoint).setMag(0.5).rotate(90);
    let nextPoint = p5.Vector.add(forceVector, currentPoint);
    arrayOfPoints.push(nextPoint);
    
    allOriginPoints.forEach(point => {
        if (p5.Vector.dist(point, currentPoint) < 5 && numberOfLoops > 10) 
        {
            numberOfLoops = 1000;
            arrayOfPoints.push(point);
            arrayOfPoints.push(point);
        }
    })


    // let originToCurrentPoint = p5.Vector.dist(originPoint, currentPoint);
    // let originToNextPoint = p5.Vector.dist(originPoint, nextPoint);
    
    

    //if (numberOfLoops < 400 && (originToCurrentPoint < originToNextPoint)) 
    if (numberOfLoops < 1000) 
    {
        getEquiLinePoints(originPoint, allOriginPoints, nextPoint, numberOfLoops + 1, arrayOfPoints)
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
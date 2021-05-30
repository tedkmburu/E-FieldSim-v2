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





function displayEquipotentialLines(canvas)
{
    equiLines.forEach(equiLine => {
        equiLine.display(canvas);
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

    display(canvas)
    {
        canvas.push()

            beginShape();
            //beginShape(POINTS);
            
                // canvas.fill("red")
                // circle(this.equiLinePoints[0].x, this.equiLinePoints[0].y, 10, 10)
                canvas.noFill();
                canvas.stroke("rgba(255,255,255,0.5)");
                canvas.strokeWeight(1)

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
        
        canvas.pop()

    }
  
}






















////////////////////////////////////////////////// new voltage


function voltageAtPoint(point)
{
    let voltage = 0;

    charges.forEach(charge => {
        let kq = (charge.charge / 10) * k;
        let r = p5.Vector.dist(point, charge.position) / gridSize;
        let v = kq / r;

        voltage += v;
    })


    return voltage;
}


function displayVoltage(canvas)
{
    charges.forEach(charge => {
        let radius = chargeRadius / 2;
        let times = Math.abs(charge.charge) * fieldLinesPerCoulomb * 2;
        let origin = charge.position;

        let point = createVector(radius,radius);
        for (let a = 0; a < times; a++)
        {
            let newPosition = p5.Vector.add(point, origin)
            let voltage = voltageAtPoint(newPosition);
            let gradientRadius = Math.abs(voltage) / 500
            let gradientColor =  voltage > 0 ? "rgba(210, 41, 45, 0.5)" : "rgba(23, 97, 176, 0.5)";
            
            createGradient(newPosition, gradientRadius, gradientColor)
            canvas.ellipse(newPosition.x, newPosition.y, 10, 10)

            point = p5.Vector.add(point, createVector(0,0));
            point.rotate(360/times);
        }
    })
}

function createVoltage()
{

}


function createGradient(position, radius, color)
{
    let ctx = document.getElementById('defaultCanvas0').getContext("2d");
    ctx.globalCompositeOperation = 'source-over';
    let grd = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, radius);
    grd.addColorStop(0, color);
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(position.x - (width / 2), position.y - (height / 2), innerWidth, innerHeight);
    ctx.globalCompositeOperation = 'source-over';
}


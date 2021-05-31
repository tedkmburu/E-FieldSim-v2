function createFieldVectors()
{
    let canvas = foreGroundCanvas;
    fieldVectors = [];

    charges.forEach(charge => {

        let reach = ((Math.abs(charge.charge) + 4) * gridSize)
        let startX = charge.position.x - reach
        let startY = charge.position.y - reach

        let endX = charge.position.x + reach
        let endY = charge.position.y + reach

        for (let y = startY; y < endY; y += gridSize) 
        {
            for (let x = startX; x < endX; x += gridSize)
            {
                let arrowLocation = roundVectorToNearestGrid(canvas.createVector(x, y)); // this is the starting location of all the field vectors 

                let noChargesNearby = !charges.some(charge => { // if no charges are very clode to the vector, it will be drawn
                    return p5.Vector.dist(arrowLocation, charge.position) < chargeDiameter
                })
        
                if (noChargesNearby)
                {
                    // this field vector object is added to an array and everything in the array
                    // will be stored in a variable so they don't need to be recalculated every frame
                    let forceVector = netForceAtPoint(arrowLocation).div(fieldVectorScale);

                    fieldVectors.push(new FieldVector(arrowLocation, forceVector)); 
                }
            }
        }
        
    });
    
    // for (let y = 0; y < height; y += gridSize) 
    // {
    //   for (let x = 0; x < width - sidePanelWidth; x += gridSize)
    //   {
    //     let arrowLocation = canvas.createVector(x, y); // this is the starting location of all the field vectors 

    //     let noChargesNearby = !charges.some(charge => { // if no charges are very clode to the vector, it will be drawn
    //         return p5.Vector.dist(arrowLocation, charge.position) < chargeDiameter
    //     })

    //     if (noChargesNearby)
    //     {
    //         // this field vector object is added to an array and everything in the array
    //         // will be stored in a variable so they don't need to be recalculated every frame

    //         fieldVectors.push(new FieldVector(arrowLocation)); 
    //     }
    //   }
    // }
}



function displayFieldVectors()
{
    showForceVectorsOnMouse(); // a field vector will be displayed starting at the cursor's position

    fieldVectors.forEach(forceVector => forceVector.display()) // every field vector object in the array will be displayed
}



function showForceVectorsOnMouse()
{
    let force = netForceAtPoint(mousePosition).div(fieldVectorScale);
    let end = p5.Vector.add(mousePosition, force);
    let color = "rgba(250,250,250,1)";
    let angle = force.heading();
    let scale = force.mag() / 100;

    let noChargesNearby = !charges.some(charge => { // if no charges are very clode to the vector, it will be drawn
        return p5.Vector.dist(mousePosition, charge.position) < chargeRadius
    })

    if (noChargesNearby)
    {
        createArrow(mousePosition, end, angle, color, scale); // this vector is not a saved object and will be recalciulated every frame
    }

}



function createArrow(start, end, angle, color, scale)
{
    let canvas = foreGroundCanvas;
    canvas.push();
        canvas.stroke(color);
        canvas.strokeWeight(scale * 4);
        canvas.noFill();
        canvas.line(start.x, start.y, end.x, end.y);

        canvas.translate(end.x, end.y)
        canvas.rotate(angle);
            canvas.fill(color);

        canvas.triangle(0, 0, -10 * scale, -5 * scale, -10 * scale, 5 * scale);
    canvas.pop();
}



class FieldVector
{
    constructor(position, forceVector)
    {
        this.position = position;
        this.forceVector = forceVector;
        this.forceMag = forceVector.mag();
        this.scale = this.forceMag / 100;
        

        
        this.end = p5.Vector.add(this.position, this.forceVector);

        this.color = "rgba(250, 250, 250, 1)";
    }

    display()
    {
        if (this.forceMag > 3)
        {
            createArrow(this.position, this.end, this.forceVector.heading(), this.color, this.scale);
        }
    }
  
}
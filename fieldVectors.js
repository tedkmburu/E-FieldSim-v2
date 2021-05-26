function createFieldVectors()
{
    fieldVectors = [];
    
    for (let y = 0; y < height; y += 25)
    {
      for (let x = 0; x < width - sidePanelWidth; x += 25)
      {
        let arrowLocation = createVector(x, y);

        let noChargesNearby = !charges.some(charge => {
            return p5.Vector.dist(arrowLocation, charge.position) < chargeDiameter
        })

        if (noChargesNearby)
        {
            fieldVectors.push(new FieldVector(arrowLocation));
        }
      }
    }
}



function displayFieldVectors()
{
    //showForceVectorsOnMouse();

    fieldVectors.forEach(forceVector => forceVector.display())
}



function createArrow(start, end, angle, color, scale)
{
    push();
        stroke(color);
        strokeWeight(scale * 4);
        noFill();
        line(start.x, start.y, end.x, end.y);


        translate(end.x, end.y)
        rotate(angle);
        fill(color);


        triangle(0, 0, -10 * scale, -5 * scale, -10 * scale, 5 * scale);
    pop();
}



class FieldVector
{
    constructor(position)
    {
        this.position = position;

        this.force = netForceAtPoint(position).div(fieldVectorScale);
        this.end = p5.Vector.add(this.position, this.force);

        this.color = "rgba(250, 250, 250, 1)";
    }

    display()
    {
        let forceMag = this.force.mag();
        let scale = forceMag / 100;
        if (forceMag > 1)
        {
            createArrow(this.position, this.end, this.force.heading(), this.color, scale);
        }
    }
  
}
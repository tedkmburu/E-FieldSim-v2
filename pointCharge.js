function createPointCharge(position, charge)
{
    if (charge != null) // this will run when charges are created from the side panel
    {
        charges.push(new PointCharge(position, charge))
    }
    else // this will run when the user creates their own charges
    {
        charges.push(new PointCharge(position, 0))
        charges[charges.length - 1].selected = true;
    }
}


function displayCharges() // this displays all the charges on screen
{
    charges.forEach(charge => {

        charge.display();

        if (charges.dragging) // if a charge is being dragged, recalculate everything that's displayed on screen
        {
            createDataFromSidePanel();
        }
    })
}


function removeCharge(i) // deletes a charge from the charges array and removes its slider
{
    charges[i].slider.remove();
    charges.splice(i,1);
}

function removeAllCharges() // clears the charges array
{
    for (let i = charges.length - 1; i >= 0; i--) 
    {
        removeCharge(i); // from end of array to beginning 
    }
    charges = [];

    createDataFromSidePanel();
}



class PointCharge extends Charge
{
    constructor(position, charge)
    {
        let canvas = foreGroundCanvas;
        super(position, charge)

        this.radius = chargeRadius;

        this.selected = false;
        this.dragging = false;

        this.slider = canvas.createSlider(-5, 5, charge, 1);
        this.slider.style("zIndex", "999");
        this.slider.input( function(){  createDataFromSidePanel(); equiLines = []; } ); // recalculate everything that's displayed on screen
        this.slider.changed( function(){  createDataFromSidePanel(); equiLines = [];  } ); // recalculate everything that's displayed on screen
    }

    display()
    {
        let canvas = foreGroundCanvas;
        let pointCharge = this;

        if (pointCharge.selected)
        {
            pointCharge.slider.position(pointCharge.position.x - 75, pointCharge.position.y + chargeRadius + 10, "fixed");
            pointCharge.charge = pointCharge.slider.value();
        }

        // if a charge is no longer being dragged and is over the trash can, it will be removed
        if (!pointCharge.dragging && pointCharge.position.x < 100 && pointCharge.position.y > innerHeight - 100)
        {
            let index = charges.findIndex(charge => {
                return !charge.dragging && charge.position.x < 100 && charge.position.y > innerHeight - 100;
            });
            
            removeCharge(index);
            createDataFromSidePanel();
        }

        canvas.push();
            if (pointCharge.selected) // if the charge has been selected, create a white stroke around it and display its slider
            {
                canvas.stroke(255);
                pointCharge.slider.style("visibility", "visible");
            }
            else
            {
                canvas.stroke(0);
                pointCharge.slider.style("visibility", "hidden");
            }

            // set the fill color of the charge
            let fillColor;
            if (pointCharge.charge == 0) fillColor = neutralChargeColor;
            if (pointCharge.charge > 0) fillColor = positiveChargeColor;
            if (pointCharge.charge < 0) fillColor = negativeChargeColor;

            // draw the circle
            canvas.fill(fillColor);
            canvas.ellipse(pointCharge.position.x, pointCharge.position.y, chargeDiameter, chargeDiameter);

            // write down the charge of the point charge ontop of it
            canvas.textSize(16);
            canvas.textFont(buttonFont);
            canvas.fill("white");
            canvas.noStroke();
            if (pointCharge.charge > 0) // if the charge > 0, add a "+" sign before the number 
            {
                let chargeStringLength = pointCharge.charge.toString().length + 1.5;
                let chargeToShow = "+" + pointCharge.charge.toString(); 
                let textPositionX = pointCharge.position.x - (chargeStringLength * 4);
                let textPositionY = pointCharge.position.y + 7;

                canvas.text(chargeToShow, textPositionX, textPositionY);
            }
            else
            {
                let chargeStringLength = pointCharge.charge.toString().length;
                let textPositionX = pointCharge.position.x - (chargeStringLength * 4);
                let textPositionY = pointCharge.position.y + 7;
                
                canvas.text(pointCharge.charge, textPositionX, textPositionY);
            }
        canvas.pop();
        
    }
}
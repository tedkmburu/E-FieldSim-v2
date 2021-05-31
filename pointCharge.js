function createPointCharge(position, charge, canvas)
{
    if (charge != null) // this will run when charges are created from the side panel
    {
        charges.push(new PointCharge(position, charge, canvas))
    }
    else // this will run when the use creates their own charges
    {
        charges.push(new PointCharge(position, 0, canvas))
        charges[charges.length - 1].selected = true;
    }
}


function displayCharges(canvas) // this displays all the charges on screen
{
    charges.forEach(charge => {

        charge.display(canvas);

        if (charges.dragging) // if a charge is being dragged, recalculate everything that's displayed on screen
        {
            createDataFromSidePanel(canvas);
        }
    })
}


function removeCharge(i, canvas) // deletes a charge from the charges array and removes its slider
{
    charges[i].selected = false;
    charges[i].slider.style("visibility", "hidden");
    charges[i].slider.remove();

    charges.splice(i,1);

    createDataFromSidePanel(canvas);
}

function removeAllCharges(canvas) // clears the charges array
{
    for (let i = charges.length - 1; i >= 0; i--) // from end of array to beginning 
    {
        removeCharge(i, canvas);
    }

    charges = [];
}

function sliderChanged() // runs when the slider on any charge is moved
{
    createDataFromSidePanel(canvas); // recalculate everything that's displayed on screen
}






class PointCharge extends Charge
{
    constructor(position, charge, canvas)
    {
        super(position, charge, canvas)

        this.radius = chargeRadius;

        this.selected = false;
        this.dragging = false;

        this.slider = canvas.createSlider(-5, 5, charge, 1);

        this.slider.style("zIndex", "999");
        this.slider.style("visibility", "hidden");
        this.slider.addClass("slider");
        this.slider.input(sliderChanged);
        this.slider.changed(sliderChanged);
    }

    display(canvas)
    {
        let pointCharge = this;

        if (pointCharge.selected)
        {
            pointCharge.slider.position(pointCharge.position.x - 75, pointCharge.position.y + chargeRadius + 10, "fixed");
            pointCharge.charge = pointCharge.slider.value();
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
            let fillColor = (pointCharge.charge > 0) ? positiveChargeColor : negativeChargeColor
            if (pointCharge.charge == 0)
            {
                fillColor = neutralChargeColor;
            }
            canvas.fill(fillColor);

            canvas.ellipse(pointCharge.position.x, pointCharge.position.y, chargeDiameter, chargeDiameter);

            canvas.textSize(16);
            canvas.textFont(buttonFont);
            canvas.fill("white");
            canvas.noStroke();
            if (pointCharge.charge > 0)
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
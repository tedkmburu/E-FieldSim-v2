function createCharge(position, charge)
{
    if (charge != null) // this will run when charges are created from the side panel
    {
        charges.push(new PointCharge(position, charge))
    }
    else // this will run when the use creates their own charges
    {
        charges.push(new PointCharge(position, 0))
        charges[charges.length - 1].selected = true;
    }
}

function displayCharges() // this displays all the charges on screen
{
    charges.forEach(charge => {

        charge.display()

        if (charges.dragging) // if a charge is dragged, recalculate everything that's displayed on screen
        {
            createDataFromSidePanel();
        }
    })

    
}

function removeCharge(i) // deletes a charge from the charges array and removes its slider
{
    charges[i].selected = false;
    charges[i].slider.style("visibility", "hidden");
    charges[i].slider.remove();

    charges.splice(i,1);

    createDataFromSidePanel();
}

function removeAllCharges() // clears the charges array
{
    for (let i = charges.length - 1; i >= 0; i--) // from end of array to beginning 
    {
        removeCharge(i);
    }

    charges = [];
}

function sliderChanged() // runs when the slider on any charge is moved
{
    createDataFromSidePanel(); // recalculate everything that's displayed on screen
}






class PointCharge extends Charge
{
    constructor(position, charge)
    {
        super(position, charge)

        this.selected = false;
        this.dragging = false;

        this.slider = createSlider(-5, 5, charge, 1);

        this.slider.style("zIndex", "999");
        this.slider.style("visibility", "hidden");
        this.slider.addClass("slider");
        this.slider.input(sliderChanged);
        this.slider.changed(sliderChanged);
    }

    display()
    {
        let pointCharge = this;

        if (pointCharge.selected)
        {
            pointCharge.slider.position(pointCharge.position.x - 75, pointCharge.position.y + (chargeSize/2) + 10, "fixed");
            pointCharge.charge = pointCharge.slider.value();
        }

        push();
            if (pointCharge.selected) // if the charge has been selected, create a white stroke around it and display its slider
            {
                stroke(255);
                pointCharge.slider.style("visibility", "visible");
            }
            else
            {
                stroke(0);
                pointCharge.slider.style("visibility", "hidden");
            }

            // set the fill color of the charge
            let fillColor = pointCharge.charge > 0 ? positiveChargeColor : negativeChargeColor
            if (pointCharge.charge < 0)
            {
                fillColor = negativeChargeColor;
            }

            ellipse(pointCharge.x, pointCharge.y, chargeSize, chargeSize);
            

            textSize(16);
            fill("white");
            noStroke();
            if (pointCharge.charge > 0)
            {
                let chargeStringLength = pointCharge.charge.toString().length + 1.5;
                let chargeToShow = "+" + pointCharge.charge; 
                let textPositionX = pointCharge.x - (chargeStringLength * 4);
                let textPositionY = pointCharge.y + 7;

                text(chargeToShow, textPositionX, textPositionY);
            }
            else
            {
                let chargeStringLength = pointCharge.charge.toString().length;
                let textPositionX = pointCharge.position.x - (chargeStringLength * 4);
                let textPositionY = pointCharge.position.y + 7;
                
                text(pointCharge.charge, textPositionX, textPositionY);
            }
        pop();
    }
}
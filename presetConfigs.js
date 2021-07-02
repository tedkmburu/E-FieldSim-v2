function createPreset(preset)
{
    let canvas = foreGroundCanvas;

    removeAllCharges();
    equiLines = [];

    let centerXRounded = floorToNearestGrid((innerWidth / 2) - chargeRadius) - 100;
    let centerYRounded = floorToNearestGrid((innerHeight / 2) - chargeRadius);
    let center = canvas.createVector(centerXRounded,centerYRounded);

    if (preset == "single")
    {
        createPointCharge(center, 5, );
    }
    else if (preset == "dipole")
    {
        createPointCharge(canvas.createVector(center.x - 75, center.y), -4,);
        createPointCharge(canvas.createVector(center.x + 75, center.y), 4,);
    }
    else if (preset == "square")
    {
        createPointCharge(canvas.createVector(center.x - 100, center.y - 99), 5,);
        createPointCharge(canvas.createVector(center.x + 100, center.y - 100), 5,);
        createPointCharge(canvas.createVector(center.x - 101, center.y + 100), 5,);
        createPointCharge(canvas.createVector(center.x + 100, center.y + 105), 5,);
    }
    else if (preset == "shield")
    {
        let radius = 100;
        let times = 10;
        let origin = canvas.createVector(center.x, center.y);

        let point = canvas.createVector(radius,radius);
        for (let a = 0; a < times; a++)
        {
            createPointCharge(canvas.createVector(point.x + origin.x, point.y + origin.y), 2,);
            point = p5.Vector.add(point, canvas.createVector(0,0));
            point.rotate( Math.PI * 2 / times);
        }
        createPointCharge(canvas.createVector(center.x, center.y), -2,);
    }
    else if (preset == "row")
    {
        for (let i = 0; i < 4; i++)
        {
            createPointCharge(canvas.createVector(center.x + (i * (chargeDiameter + 35)) - 150, center.y + i), 2,);
        }
    }
    else if (preset == "dipole row")
    {
        for (let i = 0; i < 4; i++)
        {
            createPointCharge(canvas.createVector(center.x + (i * (chargeDiameter + 35)) - 150, center.y - 100 + i), 4);
            createPointCharge(canvas.createVector(center.x + (i * (chargeDiameter + 35)) - 150, center.y + 100 + i), -4);
        }
    }
    else if (preset == "random")
    {
        for (let i = 0; i < 5; i++)
        {
            let x = (Math.random() * (innerWidth - sidePanelWidth - 200)) + 100
            let y = (Math.random() * (innerHeight - 200)) + 100; 
            let charge = Math.round(Math.random() * 10) - 5;
            if (charge == 0) 
            {
                charge++;    
            }
            createPointCharge(canvas.createVector(x, y), charge);
        }
    }
    createDataFromSidePanel();
}

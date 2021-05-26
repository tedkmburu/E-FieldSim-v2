function createPreset(preset)
{
    removeAllCharges();

    let centerXRounded = floorToNearestGrid((width/2) - chargeRadius) - 100;
    let centerYRounded = floorToNearestGrid((height/2) - chargeRadius);
    let center = createVector(centerXRounded,centerYRounded);

    if (preset == "single")
    {
        createCharge(center, 5);
    }
    else if (preset == "dipole")
    {
        createCharge(createVector(center.x - 75, center.y), -4);
        createCharge(createVector(center.x + 75, center.y), 4);
    }
    else if (preset == "square")
    {
        createCharge(createVector(center.x - 100, center.y - 99), 5);
        createCharge(createVector(center.x + 100, center.y - 100), 5);
        createCharge(createVector(center.x - 101, center.y + 100), 5);
        createCharge(createVector(center.x + 100, center.y + 105), 5);
    }
    else if (preset == "shield")
    {
        let radius = 100;
        let times = 10;
        let origin = createVector(center.x, center.y);

        let point = createVector(radius,radius);
        for (let a = 0; a < times; a++)
        {
            createCharge(createVector(point.x + origin.x, point.y + origin.y), 2);
            point = p5.Vector.add(point, createVector(0,0));
            point.rotate(360/times);
        }
        createCharge(createVector(center.x, center.y), -2);
    }
    else if (preset == "row")
    {
        for (let i = 0; i < 4; i++)
        {
            createCharge(createVector(center.x + (i * (chargeDiameter + 35)) - 150, center.y + i), 4);
        }
    }
    else if (preset == "dipole row")
    {
        for (let i = 0; i < 4; i++)
        {
            createCharge(createVector(center.x + (i * (chargeDiameter + 35)) - 150, center.y - 100 + i), 4);
            createCharge(createVector(center.x + (i * (chargeDiameter + 35)) - 150, center.y + 100 + i), -4);
        }
    }
    createDataFromSidePanel();
}

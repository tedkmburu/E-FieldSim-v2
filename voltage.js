
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
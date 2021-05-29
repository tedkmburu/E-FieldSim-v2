
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


function displayVoltage()
{

}

function createVoltage()
{
    
}


function createGradient(position, radius, color)
{
    let ctx = document.getElementById('defaultCanvas0').getContext("2d");
    let grd = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, radius);
    grd.addColorStop(0, color);
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(position.x - (width / 2), position.y - (height / 2), width, height);
}
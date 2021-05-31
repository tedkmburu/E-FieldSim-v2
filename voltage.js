let voltageMap = [];
let voltageBlockSize = 20;


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
  for (var y = 0; y < innerHeight; y+=voltageBlockSize)
  {
    for (var x = 0; x < innerWidth - sidePanelWidth; x+=voltageBlockSize)
    {
      let voltageColor = voltageMap[y/voltageBlockSize][x/voltageBlockSize];

      canvas.push();
        if (voltageColor.levels[3] > 20)
        {
          canvas.fill(voltageColor);
          canvas.noStroke();
          //stroke(100);
          canvas.rect(x, y,voltageBlockSize,voltageBlockSize);
        }
        else {
          //console.log(voltageColor);
        }
      canvas.pop();
    }
  }
}

function createVoltage(canvas)
{

  for (var y = 0; y < innerHeight; y+=voltageBlockSize)
  {
      voltageMap[y/voltageBlockSize] = [];
      for (var x = 0; x < innerWidth - sidePanelWidth; x+=voltageBlockSize)
      {
        let position = canvas.createVector(x + (voltageBlockSize/2), y + (voltageBlockSize/2))
        var voltage = voltageAtPoint(position)
        var intensity = Math.round(canvas.map(Math.abs(voltage), 0, 15475, 0, 200));

        var r = 0;
        var g = 0;
        var b = 0;
        var a = intensity/6;

        if (voltage > 0)
        {
        r = intensity;
        }
        else if (voltage < 0)
        {
        b = intensity;
        }
        var voltageColor = canvas.color(r, g, b, a);
        voltageMap[y/voltageBlockSize][x/voltageBlockSize] = voltageColor;
      }
  }
}


function createGradient(position, radius, color)
{
  let ctx = document.getElementById('defaultCanvas0').getContext("2d");
  ctx.globalCompositeOperation = 'source-over';
  let grd = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, radius);
  grd.addColorStop(0, color);
  grd.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(position.x - (width / 2), position.y - (height / 2), width, height);
  ctx.globalCompositeOperation = 'source-over';
}




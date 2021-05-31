function voltageAtPoint(point)
{
  let voltage = 0;

  charges.forEach(charge => {
      let kq = (charge.charge /2 ) * k;
      let r = p5.Vector.dist(point, charge.position) / gridSize;
      let v = kq / r;

      voltage += v;
  })


  return voltage;
}



function displayVoltage(canvas)
{
  for (let y = 0; y < innerHeight / voltageAccuracy; y++)
  {
    for (let x = 0; x < innerWidth / voltageAccuracy; x++)
    {
      let voltageColor = voltageMap[y][x];

      if (voltageColor.levels[3] > 10)
      {
        canvas.push();
          canvas.fill(voltageColor);
          canvas.noStroke();
          canvas.rect(x * voltageAccuracy, y * voltageAccuracy, voltageAccuracy, voltageAccuracy);
        canvas.pop();
      }
    }
  }
}



function createVoltage(canvas)
{
  for (let y = 0; y < innerHeight / voltageAccuracy; y++)
  {
    voltageMap[y] = [];
    for (let x = 0; x < innerWidth / voltageAccuracy; x++)
    {
      let xPosition = x * voltageAccuracy + (voltageAccuracy/2);
      let yPosition = y * voltageAccuracy + (voltageAccuracy/2);
      
      let position = canvas.createVector(xPosition, yPosition)
      let voltage = voltageAtPoint(position)
      let intensity = Math.round(canvas.map(Math.abs(voltage), 0, 15475, 0, 200));

      let red = 0;
      let blue = 0;
      let alpha = intensity / 6;

      if (voltage > 0) red = intensity;
      else if (voltage < 0) blue = intensity;

      let voltageColor = canvas.color(red, 0, blue, alpha);
      voltageMap[y][x] = voltageColor;
    }
  }
}

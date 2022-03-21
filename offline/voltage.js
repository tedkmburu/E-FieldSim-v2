function voltageAtPoint(point)
{
  let voltage = 0;

  charges.forEach(charge => {
    // V = kq / r 
    let kq = charge.charge * k;
    let r = p5.Vector.dist(point, charge.position);
    let v = kq / r;

    voltage += v;
  })

  return voltage;
}



function displayVoltage()
{
  let canvas = backgroundCanvas;
  for (let y = 0; y < innerHeight / voltageAccuracy; y++)
  {
    for (let x = 0; x < innerWidth / voltageAccuracy; x++)
    {
      let voltageColor = voltageMap[y][x];
    
      canvas.push();
        canvas.fill(voltageColor);
        canvas.noStroke();
        canvas.rect(x * voltageAccuracy, y * voltageAccuracy, voltageAccuracy, voltageAccuracy);
      canvas.pop();
    }
  }
}



function showVoltageValueOnCursor()
{
  let notTouchingACharge = charges.every(charge => {
    let distance = p5.Vector.dist(mousePosition, charge.position);
    return distance > chargeRadius;
  })


  if (notTouchingACharge) 
  {
    let canvas = foreGroundCanvas;

    canvas.push();
      canvas.textSize(16);
      canvas.textFont(buttonFont);
      canvas.fill("white");
      canvas.noStroke();

      let textToShow = Math.round(voltageAtPoint(mousePosition)).toString() + " V";
      let textPositionX = mousePosition.x - ((textToShow.length / 2) * 9);
      let textPositionY = mousePosition.y - 5;
      canvas.text(textToShow, textPositionX, textPositionY);

    canvas.pop();
  }
  
}



function createVoltage()
{
  let canvas = backgroundCanvas;
  for (let y = 0; y < innerHeight / voltageAccuracy; y++)
  {
    voltageMap[y] = [];
    for (let x = 0; x < innerWidth / voltageAccuracy; x++)
    {
      let xPosition = x * voltageAccuracy + (voltageAccuracy/2);
      let yPosition = y * voltageAccuracy + (voltageAccuracy/2);
      
      let position = canvas.createVector(xPosition, yPosition)
      let voltage = voltageAtPoint(position)
      let intensity = Math.round(canvas.map(Math.abs(voltage), 0, 5475, 0, 255));

      let red = 0;
      let blue = 0;
      let alpha = intensity * 10;

      if (voltage > 0) red = intensity;
      else if (voltage < 0) blue = intensity;

      let voltageColor = canvas.color(red, 0, blue, alpha);
      voltageMap[y][x] = voltageColor;
    }
  }
}

function setup()  // This function only runs once when the page first loads. 
{
  createCanvas(windowWidth, windowHeight); // creates the <canvas> that everything runs on.
  angleMode(DEGREES);

  textFont(defaultFont); // the default font

  createSidePanel(); // creates buttons and checkboxes for the side panel
  createContextMenu(); // creates the buttons for the right click menu
  fullscreen = false;
  showPopUp = false;

  document.getElementById("defaultCanvas0").setAttribute("oncontextmenu", "rightClick(); return false"); // disables the right click menu before I create my own
  
  createPreset("dipole"); // creates one charge at the center of the screen when the simulation first starts up

  frameRate(60);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
}



function draw() // this function runs every frame. Everything on screen starts here.
{  
  clear();  
  //background(0); // sets the background color to black
  moveKeys(); // if the arrow keys are pressed, the selected charge moves
  
  displayDataFromSidePanel(); // displays whatever settings are selected in the side panel
  displayConductors();
  displayCharges();
  displayFrameRate();
  displaySidePanel();
  displayCheckBoxes();
  displayButtons();

  if (showContextMenu) displayContextMenu();
  if (!focused) hideContextMenu();

  displayCursor(); // if in test charge mode, replace cursor with test charge. Otherwise, keep it normal


  fill("red")
  rect(mouseX, mouseY, 10,10)
}



function displayGrid() // displays background grid
{
  push();
    stroke(40); // gray color for the grid
    for (let x = 0; x <= windowWidth - sidePanelWidth; x+= gridSize)
    {
      line(x, 0, x, windowHeight);
    }
    for (let y = 0; y < windowHeight; y+= gridSize)
    {
      line(0, y, windowWidth, y);
    }
  pop();
}



function displayFrameRate()
{
  push();
    noStroke();
    fill(100);
    textSize(20);
    text(round(frameRate()),10,25);
  pop();
}




function netForceAtPoint(position)
{
  let finalVector = createVector(0, 0);

  charges.forEach(charge => {
      
    //F = KQ / (r^2)
    let kq = charge.charge  * k;
    let r = p5.Vector.dist(position, charge.position) / 10;

    if (r < 0.5) r = 0.5
    
    let rSquared = Math.pow(r,2);
    let force = kq / rSquared;

    let theta = p5.Vector.sub(charge.position, position).heading();
    let forceX = force * cos(theta);
    let forceY = force * sin(theta);

    let forceVectors = createVector(forceX, forceY).mult(-1);

    finalVector.add(forceVectors);
  });

  return finalVector;
}



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




function pointIsInsideRect(point, rect) // returns true or false based on if the point is inside the rectangle
{
  return (point.x > rect.position.x &&
          point.y > rect.position.y &&
          point.x < rect.position.x + rect.width &&
          point.y < rect.position.y + rect.height)
}


function pointIsInsidCircle(point, cirlce)    // returns true or false based on if the point is inside the circle
{
  let distance = point.dist(cirlce.position);

  return (distance < cirlce.radius)
}




function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
  createSidePanel();
}

function roundToNearestGrid(number) // rounds x or y position ot the nearest grid line
{
  return Math.round(number / gridSize) * gridSize;
}

function roundVectorToNearestGrid(vector) // rounds vector ot the nearest grid intersection
{
  let newX = roundToNearestGrid(vector.x);
  let newY = roundToNearestGrid(vector.y);
  return createVector(newX, newY);
}

function floorToNearestGrid(number) // rounds down x or y position ot the nearest grid line
{
  return Math.floor(number / gridSize) * gridSize;
}












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
    ctx.globalCompositeOperation = 'source-over';
    let grd = ctx.createRadialGradient(position.x, position.y, 0, position.x, position.y, radius);
    grd.addColorStop(0, color);
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(position.x - (width / 2), position.y - (height / 2), width, height);
    ctx.globalCompositeOperation = 'source-over';
}
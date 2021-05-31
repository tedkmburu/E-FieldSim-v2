const foreGround = canvas => {

  canvas.setup = function()  // This function only runs once when the page first loads. 
  {
    canvas.createCanvas(innerWidth, innerHeight); // creates the <canvas> that everything runs on.
    foreGroundCanvas = canvas;

    canvas.angleMode(canvas.RADIANS);

    canvas.textFont(defaultFont); // the default font

    createSidePanel(canvas); // creates buttons and checkboxes for the side panel
    createContextMenu(canvas); // creates the buttons for the right click menu
    fullscreen = false;
    showPopUp = false;

    document.getElementById("defaultCanvas0").setAttribute("oncontextmenu", "rightClick(); return false"); // disables the right click menu before I create my own
    
    createPreset("dipole", canvas); // creates one charge at the center of the screen when the simulation first starts up

    canvas.frameRate(60);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
  }



  canvas.draw = function() // this function runs every frame. Everything on screen starts here.
  {  
    //canvas.clear();  
    mousePosition = canvas.createVector(canvas.mouseX, canvas.mouseY)
    canvas.background(0); // sets the background color to black
    moveKeys(canvas); // if the arrow keys are pressed, the selected charge moves
    
    displayDataFromSidePanel(canvas); // displays whatever settings are selected in the side panel
    displayConductors(canvas);
    displayCharges(canvas);
    displayFrameRate(canvas);
    displaySidePanel(canvas);
    displayCheckBoxes(canvas);
    displayButtons(canvas);

    if (showContextMenu) displayContextMenu(canvas);
    if (!canvas.focused) hideContextMenu(canvas);

    displayCursor(canvas); // if in test charge mode, replace cursor with test charge. Otherwise, keep it normal


    canvas.fill("red")
    canvas.rect(mousePosition.x, mousePosition.y, 10,10)
  }

  canvas.mouseClicked = function() { whenMouseClicked(canvas); } // this is an inbuilt p5 function that runs everytime any mouse button is clicked
  canvas.mouseDragged = function() { whenMouseDragged(canvas); }
  canvas.doubleClicked = function() { whenDoubleClicked(canvas); }
  canvas.keyPressed = function() { whenKeyPressed(canvas); }
  canvas.mouseMoved = function() { whenMouseMoved(canvas); }

  canvas.windowResized = function() 
  {
    canvas.resizeCanvas(innerWidth, innerHeight);
    createSidePanel(canvas);
  }


}

new p5(foreGround); // invoke p5

function displayGrid(canvas) // displays background grid
{
  canvas.push();
  canvas.stroke(40); // gray color for the grid
    for (let x = 0; x <= innerWidth - sidePanelWidth; x+= gridSize)
    {
      canvas.line(x, 0, x, innerHeight);
    }
    for (let y = 0; y < innerHeight; y+= gridSize)
    {
      canvas.line(0, y, innerWidth, y);
    }
  canvas.pop();
}



function displayFrameRate(canvas)
{
  canvas.push();
    canvas.noStroke();
    canvas.fill(100);
    canvas.textSize(20);
    canvas.text(Math.round(canvas.frameRate()), 10, 25);
  canvas.pop();
}




function netForceAtPoint(position, canvas)
{
  let finalVector = canvas.createVector(0, 0);

  charges.forEach(charge => {
      
    //F = KQ / (r^2)
    let kq = charge.charge  * k;
    let r = p5.Vector.dist(position, charge.position) / 10;

    if (r < 0.5) r = 0.5
    
    let rSquared = Math.pow(r,2);
    let force = kq / rSquared;

    let theta = p5.Vector.sub(charge.position, position).heading();
    let forceX = force * Math.cos(theta);
    let forceY = force * Math.sin(theta);

    let forceVectors = canvas.createVector(forceX, forceY).mult(-1);

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






function roundToNearestGrid(number) // rounds x or y position ot the nearest grid line
{
  return Math.round(number / gridSize) * gridSize;
}

function roundVectorToNearestGrid(vector, canvas) // rounds vector ot the nearest grid intersection
{
  let newX = roundToNearestGrid(vector.x);
  let newY = roundToNearestGrid(vector.y);
  return canvas.createVector(newX, newY);
}

function floorToNearestGrid(number) // rounds down x or y position ot the nearest grid line
{
  return Math.floor(number / gridSize) * gridSize;
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
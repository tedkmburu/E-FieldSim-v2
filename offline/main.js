const background = canvas => {

  canvas.setup = function()  // This function only runs once when the page first loads. 
  {
    canvas.createCanvas(innerWidth, innerHeight); // creates the <canvas> that everything runs on.
    backgroundCanvas = canvas;
    canvas.angleMode(canvas.RADIANS);
    canvas.frameRate(60);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
  }

  canvas.draw = function() // this function runs every frame. Everything on the background canvas starts here.
  {  
    canvas.background(0); // sets the background color to black
    if (showVoltage){ displayVoltage(); } // if voltage mode is on, show the gradients in the background
  }

  canvas.windowResized = function() // inbuilt p5 function. runs everytime the window is resized
  {
    canvas.resizeCanvas(innerWidth, innerHeight); // resizes the canvas to fit the new window size
  }
}






const foreGround = canvas => {

  canvas.preload = function()
  {
    QRCode = canvas.loadImage("qrcode.png");

    icons = [
      canvas.loadImage("icons/download.png"), 
      canvas.loadImage("icons/help.png"), 
      //canvas.loadImage("icons/info.png"), 
      canvas.loadImage("icons/share.png"), 
      canvas.loadImage("icons/menu.png"), 
      canvas.loadImage("icons/trashWhite.png") 
    ]
  }

  canvas.setup = function()  // This function only runs once when the page first loads. 
  {
    let firstOpenSimulation = canvas.getItem('firstOpenSimulation')
    if (firstOpenSimulation == null) 
    {
      toggleHelp()
      canvas.storeItem('firstOpenSimulation', false);
    }

    // toggleHelp()

    canvas.createCanvas(innerWidth, innerHeight); // creates the <canvas> that everything runs on.
    foreGroundCanvas = canvas;

    canvas.angleMode(canvas.RADIANS);

    canvas.textFont(defaultFont); // the default font

    createSidePanel(); // creates buttons and checkboxes for the side panel
    createContextMenu(); // creates the buttons for the right click menu
    fullscreen = false;
    // showPopUp = false;
    
    createPreset("dipole"); // creates what is displayed when the simulation first starts up
    createDataFromSidePanel();

    canvas.frameRate(60);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
  }



  canvas.draw = function() // this function runs every frame. Everything on the foreground canvas starts here.
  {  
    canvas.clear(); // clears the canvas so that it's transparent
    mousePosition = canvas.createVector(canvas.mouseX, canvas.mouseY)

    moveKeys(); // if the arrow keys are pressed, the selected charge moves
    
    displayDataFromSidePanel(); // displays whatever settings are selected in the side panel
    displayTrashCan();
    displayCharges();
    // displayFrameRate();
    displaySidePanel();
    displayCheckBoxes();
    displayButtons();
    
    if (showContextMenu) displayContextMenu();
    if (!canvas.focused) hideContextMenu();

    displayCursor(); // if in test charge mode, replace cursor with test charge. Otherwise, keep it normal
  }

  canvas.mouseClicked = function() { whenMouseClicked(); } // inbuilt p5 function. runs everytime any mouse button is clicked
  canvas.mouseDragged = function() { whenMouseDragged(); } // inbuilt p5 function. runs everytime the mosue is dragged (clicked down and moving)
  canvas.doubleClicked = function() { whenDoubleClicked(); } // inbuilt p5 function. runs everytime the mouse is double clicked
  canvas.keyPressed = function() { whenKeyPressed(); } // inbuilt p5 function. runs everytime any keyboard button is clicked
  canvas.mouseMoved = function() { whenMouseMoved(); } // inbuilt p5 function. runs everytime the mouse moves

  canvas.windowResized = function()  // inbuilt p5 function. runs everytime the window is resized
  {
    canvas.resizeCanvas(innerWidth, innerHeight); // resize the canvas to fit the new window
    
    createSidePanel();
    createDataFromSidePanel();
  }


}






new p5(background); // creates the background instance of p5
new p5(foreGround); // creates the foreground instance of p5





function showTutorial()
{

}





function displayGrid() // displays background grid
{
  let canvas = foreGroundCanvas;
  canvas.push();
  canvas.stroke("rgba(255,255,255,0.25)"); // gray color for the grid
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



function displayFrameRate() // displays frame rate at the top left of the screen
{
  let canvas = foreGroundCanvas;
  canvas.push();
    canvas.noStroke();
    canvas.fill(100);
    canvas.textSize(20);
    canvas.text(Math.round(canvas.frameRate()), 10, 25);
  canvas.pop();
}

function displayTrashCan()
{
  let canvas = foreGroundCanvas;
  canvas.image(icons[4], 20, innerHeight - 80, 60, 60);   
}




function netForceAtPoint(position) // given a vector, it will return the net force at that point as a vector
{
  let canvas = foreGroundCanvas;
  let finalVector = canvas.createVector(0, 0);

  // these are all the pointcharges
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





function pointIsInsideRect(point, rect) // returns true or false based on if the point is inside the rectangle
{
  return (point.x > rect.position.x &&
          point.y > rect.position.y &&
          point.x < rect.position.x + rect.width &&
          point.y < rect.position.y + rect.height);
}

function pointIsInsideCircle(point, cirlce)    // returns true or false based on if the point is inside the circle
{
  let distance = point.dist(cirlce.position);

  return (distance < cirlce.radius);
}

function circleIsInRect(circle, rect)
{
  return (circle.position.x + circle.radius > rect.position.x &&
          circle.position.y + circle.radius > rect.position.y &&
          circle.position.x - circle.radius < rect.position.x + rect.width &&
          circle.position.y - circle.radius < rect.position.y + rect.height)
}

function circleIsInCircle(circle1, circle2)
{
  let distance = circle1.position.dist(circle2.position);
  return (distance < circle1.radius + circle2.radius)
}






function roundToNearestGrid(number) // rounds x or y position ot the nearest grid line
{
  return Math.round(number / gridSize) * gridSize;
}

function roundVectorToNearestGrid(vector) // rounds vector ot the nearest grid intersection
{
  let canvas = foreGroundCanvas;
  let newX = roundToNearestGrid(vector.x);
  let newY = roundToNearestGrid(vector.y);
  return canvas.createVector(newX, newY);
}

function floorToNearestGrid(number) // rounds down x or y position ot the nearest grid line
{
  return Math.floor(number / gridSize) * gridSize;
}
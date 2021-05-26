function setup()  // This function only runs once when the page first loads. 
{
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    frameRate(60);

    createSidePanel()
    fullscreen = false;
    showPopUp = false;

    document.getElementById("defaultCanvas0").setAttribute("oncontextmenu", "rightClick(true);return false");
    
    createPreset("single"); // creates one charge at the center of the screen when the simulation first starts up
}



function draw() // this function runs every frame. Everything on screen starts here.
{
    frameRate(60);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
    
    background(0); // sets the background color to black
    moveKeys(); // if the arrow keys are pressed, the selected charge moves
    
    displayDataFromSidePanel(); // displays whatever settings are selected in the side panel
    displayConductors();
    displayCharges();
    
    displayFrameRate();
    displaySidePanel();

    displayCursor(); // if in test charge mode, replace cursor with test charge. Otherwise, keep it normal
}

function displayGrid() // displays background grid
{
  push();
    stroke(50); // gray color for the grid
    for (let x = 0; x <= windowWidth; x+= gridSize)
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



function windowResized()
{
  resizeCanvas(windowWidth, windowHeight);
}

function roundToNearestGrid(number) // rounds x or y position ot the nearest grid line
{
  return Math.round(number / gridSize) * gridSize;
}

function floorToNearestGrid(number) // rounds down x or y position ot the nearest grid line
{
  return Math.floor(number / gridSize) * gridSize;
}
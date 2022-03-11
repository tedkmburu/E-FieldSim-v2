function moveKeys() // if the arrow keys are pressed, the selected charge moves
{
  let canvas = foreGroundCanvas;
  charges.forEach(charge => {
    if (charge.selected) 
    {
      if (canvas.keyIsDown(canvas.RIGHT_ARROW))
      {
        charge.position.x += 3;
      }
      if (canvas.keyIsDown(canvas.LEFT_ARROW))
      {
        charge.position.x -= 3;
      }
      if (canvas.keyIsDown(canvas.DOWN_ARROW))
      {
        charge.position.y += 3;
      }
      if (canvas.keyIsDown(canvas.UP_ARROW))
      {
        charge.position.y -= 3;
      }  
    }
  })
}




function whenMouseClicked() // this is an inbuilt p5 function that runs everytime any mouse button is clicked
{  
  if (document.getElementById("popup").style.visibility == "visible" && mousePosition.x > innerWidth/2 && mousePosition.y < innerHeight / 2) 
  {
    closeHelp();
  }

  buttons.forEach(button => { // this will loop through all the buttons
    if (button.visible) 
    {
      if (pointIsInsideRect(mousePosition, button)) // if the point where the user clicks is inside the button
      {
        button.clicked();
        return;
      }
    }
  })

  checkBoxes.forEach(checkBox => { // these will loop through all the checkBoxes
    if (checkBox.visible) 
    {
      if (pointIsInsideRect(mousePosition, checkBox)) // if the point where the user clicks is inside the checkbox
      {
        checkBox.clicked();
        return;
      }
    }
  })

  if (showContextMenu) 
  {
    contextMenuButtons.forEach(button => { // this will loop through all the buttons
      if (button.visible) 
      {
        if (pointIsInsideRect(mousePosition, button)) // if the point where the user clicks is inside the button
        {
          button.clicked();
          return;
        }
      }
    })
  }

  
  if (showEquipotentialLines && mousePosition.x < innerWidth - sidePanelWidth)
  {
    let mouseClickPosition = new p5.Vector(mousePosition.x, mousePosition.y); 
    createEquipotentialLine(mouseClickPosition);
  }

  if (testChargeMode) // if test charge mode is on, this will create a test charge wherever the user clicks 
  {
    testCharges.push(new TestCharge(mousePosition, testChargeCharge));
  }

  



  charges.forEach(charge => {charge.dragging = false; charge.selected = false;} )

  let selectedCharge = charges.find(charge => pointIsInsideCircle(mousePosition, charge))
  if (selectedCharge != undefined) 
  {
    selectedCharge.selected = true;
  }

  hideContextMenu();
}





function whenMouseMoved() 
{
  buttons.forEach(button => { // this will loop through all the buttons
    if (button.visible) 
    {
      button.hovering = false;
      if (pointIsInsideRect(mousePosition, button)) // if the mouse position is over a button
      {
        button.hovering = true;
      }
    }
  })

  
  checkBoxes.forEach(checkBox => { // this will loop through all the checkBoxes
    if (checkBox.visible) 
    {
      checkBox.hovering = false;
      if (pointIsInsideRect(mousePosition, checkBox)) // if the mouse position is over a checkBox
      {
        checkBox.hovering = true;
      }
    }
  })

  if (showContextMenu) 
  {
    contextMenuButtons.forEach(button => { // this will loop through all the context Menu Buttons
      if (button.visible) 
      {
        button.hovering = false;
        if (pointIsInsideRect(mousePosition, button))
        {
          button.hovering = true;
        }
      }
    })
  }
}






















function whenMouseDragged()
{
  let noChargeIsBeingDragged = !charges.some(charge => charge.dragging) // this will be true if no charge is currently being dragged.

  if (noChargeIsBeingDragged) // if no charge is being dragged, check if the mouse is over a charge and is dragging
  {
    charges.forEach(charge => {
      if (pointIsInsideCircle(mousePosition, charge)) charge.dragging = true;  // if the mouse is hovering over a charge while it's being dragged, set it's dragging property to true
      else charge.dragging = false;
    })
  }
  
  let chargeToMove = charges.find(charge => charge.dragging) // this searches the charges array and finds the first charge with a true dragging property and sets it equal to the variable
  
  if (mousePosition.x < innerWidth - sidePanelWidth && chargeToMove != undefined) // if the mouse isn't over the side panel
  {
    if (!snapToGrid) 
    {
      chargeToMove.position = mousePosition; // make the charges position equal to the mouse position
    }
    else
    {
      chargeToMove.position = roundVectorToNearestGrid(mousePosition)// the charge position will round to the nearest grid
    }

    equiLines = []; // if a charge is being dragged, clear all of the equipotential lines
    createDataFromSidePanel(); // recalculate whatever is toggled in the side panel
  }
}



function whenDoubleClicked()
{
  if (!testChargeMode)
  {
    let notTouching = true;
    charges.forEach(charge => {
      let distance = mousePosition.dist(charge.position);
      if (distance < chargeDiameter)
      {
        notTouching = false;
      }
    })



    if (notTouching && mousePosition.x < innerWidth - sidePanelWidth)
    {
      createPointCharge(mousePosition);
    }
  }
}



function whenKeyPressed()
{
  let canvas = foreGroundCanvas;
  let chargeSelected = charges.some(charge => charge.selected); // if a charge is currently selected, this will be true

  if (chargeSelected)
  {
    charges.forEach((charge, i) => {
      if (charge.selected)
      {
        if (canvas.keyCode === canvas.DELETE)
        {
          removeCharge(i);
          createDataFromSidePanel();
        }
        if (canvas.keyCode === 107) // plus key pressed
        {
          charge.slider.value(charges[i].slider.value() + 1);
        }
        if (canvas.keyCode === 109) // minus key pressed
        {
          charge.slider.value(charges[i].slider.value() - 1);
        }
        
      }
    })

    
  }
  else
  {
    if (canvas.keyCode == 109)
    {
      createPointCharge(mousePosition, -5);
    }
    if (canvas.keyCode == 107)
    {
      createPointCharge(mousePosition, 5);
    }
    if (canvas.keyCode === 27) // escape key pressed
    {
      closeHelp();
    }
  }
  
  createDataFromSidePanel();
}
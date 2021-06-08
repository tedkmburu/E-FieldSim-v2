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
  buttons.forEach(button => { // this will loop through all the buttons
    if (button.visible) 
    {
      if (pointIsInsideRect(mousePosition, button)) // if the point where the user clicks is inside the button
      {
        button.clicked();
      }
    }
  })

  checkBoxes.forEach(checkBox => { // these will loop through all the checkBoxes
    if (checkBox.visible) 
    {
      if (pointIsInsideRect(mousePosition, checkBox)) // if the point where the user clicks is inside the checkbox
      {
        checkBox.clicked();
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
        }
      }
    })
  }

  if (showEquipotentialLines && mousePosition.x < innerWidth - sidePanelWidth)
  {
    createEquipotentialLine(mousePosition);
  }

  if (testChargeMode) // if test charge mode is on, this will create a test charge wherever the user clicks 
  {
    testCharges.push(new TestCharge(mousePosition, testChargeCharge));
  }



  charges.forEach(charge => {charge.dragging = false; charge.selected = false;} )
  conductors.forEach(conductor => {conductor.dragging = false; conductor.selected = false;} )

  let selectedCharge = charges.find(charge => pointIsInsideCircle(mousePosition, charge))
  if (selectedCharge != undefined) 
  {
    selectedCharge.selected = true;
  }

  let selectedConductor = conductors.find(conductor => pointIsInsideCircle(mousePosition, conductor))
  if (selectedConductor != undefined) 
  {
    selectedConductor.selected = true;
    console.log("selected");
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

  // let canvas = foreGroundCanvas;
  // conductors.forEach(conductor => {
  //   let centerOfConductor = canvas.createVector(conductor.position.x + (conductor.width / 2), conductor.position.y + (conductor.height / 2));
  //   //let angle = canvas.degrees(centerOfConductor.angleBetween(mousePosition));
  //   let angle = p5.Vector.sub(centerOfConductor, mousePosition).heading();
  //   let moveDistance = p5.Vector.fromAngle( angle, 50);
  //   let end = p5.Vector.add(moveDistance, mousePosition)

  //   createArrow(mousePosition, end, angle, "white", 1)
  // })
}






















function whenMouseDragged()
{
  let createData = false; 




  let noChargeIsBeingDragged = !charges.some(charge => charge.dragging) // this will be true if no charge is currently being dragged.
  let noConductorIsBeingDragged = !conductors.some(conductor => conductor.dragging) // this will be true if no conductor is currently being dragged.


  if (noChargeIsBeingDragged && noConductorIsBeingDragged) // if no charge is being dragged, check if the mouse is over a charge and is dragging
  {
    charges.forEach(charge => {
      if (pointIsInsideCircle(mousePosition, charge)) charge.dragging = true  // if the mouse is hovering over a charge , set it's dragging property to true
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
    createData = true; 
  }







  

  if (noChargeIsBeingDragged && noConductorIsBeingDragged) // if no conductor is being dragged, check if the mouse is over a conductor and is dragging
  {
    conductors.forEach(conductor => {
      
      let canvas = foreGroundCanvas;
      let conductorRect = {position: canvas.createVector(conductor.leftEnd - 10, conductor.topEnd - 10), width: conductor.width + 20, height: conductor.height + 20}
      if (pointIsInsideRect(mousePosition, conductorRect)) conductor.dragging = true;  // if the mouse is hovering over a conductor , set it's dragging property to true
      else conductor.dragging = false;
    })
  }
  
  let conductorToMove = conductors.find(conductor => conductor.dragging) // this searches the conductors array and finds the first conductor with a true dragging property and sets it equal to the variable
  let conductorToMoveIndex = conductors.indexOf(conductorToMove); // this is the index of the conductor found in the previous line

  let moveConductor = true;
  if (mousePosition.x < innerWidth - sidePanelWidth && conductorToMove != undefined) // if the mouse isn't over the side panel and is currently dragging a conductor
  {
    conductors.forEach((conductor, i) => {
      if (rectIsInsideRect(conductor, conductorToMove) && conductorToMoveIndex != i) 
      {
        moveConductor = false;
      }
    })

    conductors.forEach((conductor, i) => {
      let canvas = foreGroundCanvas;
      let conductorRect = {position: canvas.createVector(mousePosition.x - 20, mousePosition.y - 20), width: conductor.width + 40, height: conductor.height + 40}
      if (rectIsInsideRect(conductor, conductorRect) && conductorToMoveIndex != i) 
      {
        moveConductor = false;
        return;
      }
    })


    if (!snapToGrid && moveConductor) 
    {
      conductorToMove.position = mousePosition; // make the conductors position equal to the mouse position
    }
    else if (moveConductor && snapToGrid)
    {
      conductorToMove.position = roundVectorToNearestGrid(mousePosition)// the conductor position will round to the nearest grid
    }
    else
    {
      // conductors.forEach((conductor, i) => {
      //   if (rectIsInsideRect(conductor, conductorToMove) && conductorToMoveIndex != i) 
      //   {
      //     if (conductorToMove.position.x > conductor.position.x + (3 * conductor.width / 4) && conductorToMove.position.y > conductor.position.y - (3 * conductor.height / 4)) 
      //     {
      //       //console.log("right");
      //       //conductorToMove.previousPosition.x = conductor.position.x + conductor.width + ((1/4) * conductor.width);
      //       conductorToMove.position.x = conductor.position.x + conductor.width;
      //     }
      //     else if (conductorToMove.position.x < conductor.position.x + (3 * conductor.width / 4) && conductorToMove.position.y > conductor.position.y - (3 * conductor.height / 4)) 
      //     {
      //       //console.log("left");
      //       conductorToMove.position.x = conductor.position.x - conductor.width;
      //     }
      //     else if (conductorToMove.position.x > conductor.position.x - (3 * conductor.width / 4) && conductorToMove.position.y > conductor.position.y + (3 * conductor.height / 4)) 
      //     {
      //       console.log("below");
      //     }
      //     else if (conductorToMove.position.x > conductor.position.x && conductorToMove.position.x > conductor.position.x) 
      //     {
      //       console.log("top");
      //     }
      //   }
      // })
    }
   
    equiLines = []; // if a charge is being dragged, clear all of the equipotential lines
    createData = true; 
  }

  if (createData) 
  {
    createDataFromSidePanel();
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

    let onConductor = false
    conductors.forEach(conductor => {
      if (pointIsInsideRect(mousePosition, conductor)) 
      {
        onConductor = true;
      }
    })


    if (notTouching && !onConductor && mousePosition.x < innerWidth - sidePanelWidth)
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
  }
  
  createDataFromSidePanel();
}
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
}






















function whenMouseDragged()
{
  // let chargeDragged = null;

  // charges.forEach(charge => {
  //   if (charge.dragging)
  //   {
  //     chargeDragged = charge;
  //   }
  // })

  

  // if (chargeDragged == null && mousePosition.x <= width - sidePanelWidth)
  // {
  //   for (let i = charges.length - 1; i >= 0; i--)
  //   {
  //     charges[i].dragging = false;
  //     let distance = mousePosition.dist(charges[i].position);
  //     if (distance < (chargeDiameter/2) && chargeDragged == null)
  //     {
  //       chargeDragged = charges[i];
  //       chargeDragged.dragging = true;
  //     }
  //   }
  //   if (chargeDragged != null && chargeDragged.dragging)
  //   {
  //     if (snapToGrid)
  //     {
  //       chargeDragged.position.x = constrain(roundToNearestGrid(mousePosition.x), 0, width - sidePanelWidth);
  //       chargeDragged.position.y = constrain(roundToNearestGrid(mouseY), 0, height);
  //       // chargeDragged.position = createVector(roundToNearestGrid(mousePosition.x), roundToNearestGrid(mouseY));
  //     }
  //     else
  //     {
  //       chargeDragged.x = constrain(mousePosition.x, 0, width - sidePanelWidth);
  //       chargeDragged.y = constrain(mouseY, 0, height);
  //       chargeDragged.position = createVector(mousePosition.x, mouseY);
  //     }
  //     chargeDragged.dragging = true;
  //   }
  //   else
  //   {
  //     conductors.forEach( conductor => {
  //       conductor.selected = false
  //       if (mousePosition.x > conductor.position.x &&
  //         mousePosition.x < conductor.position.x + conductor.size.x && 
  //         mousePosition.y > conductor.position.y &&
  //         mousePosition.y < conductor.position.y + conductor.size.y)
  //       {
  //         conductor.selected = true
  //         conductor.dragging = true
  //         conductor.particles.forEach(particle => {
            
  //           let newPosition = p5.Vector.sub(conductor.position, particle.originalPosition).add(createVector( 2 * conductor.size.x, 2 * conductor.size.y))

  //           particle.position = newPosition
  //         })

  //         conductor.position = p5.Vector.sub(mousePosition, createVector(conductor.size.x / 2, conductor.size.y / 2))


  //       }
  //       else
  //       {
  //         conductor.dragging = false
  //       }
  //       // else if (p5.Vector.dist(mousePosition, createVector(conductor.position.x + conductor.size.x + 10, conductor.position.y + conductor.size.y + 10)) < 10)
  //       // {
  //       //   conductor.size.x = mouseX - conductor.position.x - 10
  //       //   conductor.size.y = mouseY - conductor.position.y - 10
  //       //   conductor.resizing = true
  //       // }
  //     })
  //   }
  // }
  // else if (mousePosition.x <= innerWidth - sidePanelWidth)
  // {
  //   charges.forEach(charge => {
  //     charge.selected = false;
  //   })

  //   if (snapToGrid)
  //   {
  //     chargeDragged.position.x = constrain(roundToNearestGrid(mouseX), 0, width);
  //     chargeDragged.position.y = constrain(roundToNearestGrid(mouseY), 0, height);
  //     // chargeDragged.position = createVector(roundToNearestGrid(mouseX), roundToNearestGrid(mouseY));
  //   }
  //   else
  //   {
  //     chargeDragged.position.x = constrain(mouseX,0,width);
  //     chargeDragged.position.y = constrain(mouseY,0,height);
  //     // chargeDragged.position = createVector(mouseX, mouseY);
  //   }
  //   chargeDragged.dragging = true;
  // }












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

    createData = true; 
  }







  

  if (noChargeIsBeingDragged && noConductorIsBeingDragged) // if no conductor is being dragged, check if the mouse is over a conductor and is dragging
  {
    conductors.forEach(conductor => {
      if (pointIsInsideRect(mousePosition, conductor)) conductor.dragging = true;  // if the mouse is hovering over a conductor , set it's dragging property to true
      else conductor.dragging = false;
    })
  }
  
  let conductorToMove = conductors.find(conductor => conductor.dragging) // this searches the conductors array and finds the first conductor with a true dragging property and sets it equal to the variable
  
  if (mousePosition.x < innerWidth - sidePanelWidth && conductorToMove != undefined) // if the mouse isn't over the side panel
  {
    if (!snapToGrid) 
    {
      let canvas = foreGroundCanvas;
      conductorToMove.position = p5.Vector.sub(mousePosition, canvas.createVector(conductorToMove.width / 2, conductorToMove.height / 2)); // make the conductors position equal to the mouse position
    }
    else
    {
      conductorToMove.position = roundVectorToNearestGrid(mousePosition)// the conductor position will round to the nearest grid
    }

    createData = true; 
  }

  if (createData) {
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
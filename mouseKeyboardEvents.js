function moveKeys() // if the arrow keys are pressed, the selected charge moves
{
    charges.forEach(charge => {
      if (charge.selected) 
      {
        if (keyIsDown(RIGHT_ARROW))
        {
            charge.position.x += 3;
        }
        if (keyIsDown(LEFT_ARROW))
        {
            charge.position.x -= 3;
        }
        if (keyIsDown(DOWN_ARROW))
        {
            charge.position.y += 3;
        }
        if (keyIsDown(UP_ARROW))
        {
            charge.position.y -= 3;
        }  
      }
  })
}



function mouseDragged()
{
  let chargeDragged = null;

  charges.forEach(charge => {
    if (charge.dragging)
    {
      chargeDragged = charge;
    }
  })
  let mousePosition = createVector(mouseX, mouseY);

  if (chargeDragged == null && mousePosition.x <= width - sidePanelWidth)
  {
    for (let i = charges.length - 1; i >= 0; i--)
    {
      charges[i].dragging = false;
      let distance = mousePosition.dist(charges[i].position);
      if (distance < (chargeSize/2) && chargeDragged == null)
      {
        chargeDragged = charges[i];
        chargeDragged.dragging = true;
      }
    }
    if (chargeDragged != null && chargeDragged.dragging)
    {
      if (snapChargeToGrid)
      {
        chargeDragged.x = constrain(roundToNearestGrid(mouseX), 0, width - sidePanelWidth);
        chargeDragged.y = constrain(roundToNearestGrid(mouseY), 0, height);
        chargeDragged.position = createVector(roundToNearestGrid(mouseX), roundToNearestGrid(mouseY));
      }
      else
      {
        chargeDragged.x = constrain(mouseX, 0, width - sidePanelWidth);
        chargeDragged.y = constrain(mouseY, 0, height);
        chargeDragged.position = createVector(mouseX, mouseY);
      }
      chargeDragged.dragging = true;
    }
    else
    {
      conductors.forEach( conductor => {
        conductor.selected = false
        if (mousePosition.x > conductor.position.x &&
          mousePosition.x < conductor.position.x + conductor.size.x && 
          mousePosition.y > conductor.position.y &&
          mousePosition.y < conductor.position.y + conductor.size.y)
        {
          conductor.selected = true
          conductor.dragging = true
          conductor.particles.forEach(particle => {
            
            let newPosition = p5.Vector.sub(conductor.position, particle.originalPosition).add(createVector( 2 * conductor.size.x, 2 * conductor.size.y))

            particle.position = newPosition
          })

          conductor.position = p5.Vector.sub(mousePosition, createVector(conductor.size.x / 2, conductor.size.y / 2))


        }
        else
        {
          conductor.dragging = false
        }
        // else if (p5.Vector.dist(mousePosition, createVector(conductor.position.x + conductor.size.x + 10, conductor.position.y + conductor.size.y + 10)) < 10)
        // {
        //   conductor.size.x = mouseX - conductor.position.x - 10
        //   conductor.size.y = mouseY - conductor.position.y - 10
        //   conductor.resizing = true
        // }
      })
    }
  }
  else if (mousePosition.x <= width - sidePanelWidth)
  {
    charges.forEach(charge => {
      charge.selected = false;
    })

    if (snapChargeToGrid)
    {
      chargeDragged.x = constrain(roundToNearestGrid(mouseX), 0, width);
      chargeDragged.y = constrain(roundToNearestGrid(mouseY), 0, height);
      chargeDragged.position = createVector(roundToNearestGrid(mouseX), roundToNearestGrid(mouseY));
    }
    else
    {
      chargeDragged.x = constrain(mouseX,0,width);
      chargeDragged.y = constrain(mouseY,0,height);
      chargeDragged.position = createVector(mouseX, mouseY);
    }
    chargeDragged.dragging = true;
  }

  // if (createWallsCheckBox)
  // {
  //   let wallThere = false;
  //   for (let wall of walls)
  //   {
  //     if (wall.x == floorToNearestGrid(mouseX) && wall.y == floorToNearestGrid(mouseY))
  //     {
  //         wallThere = true;
  //     }
  //   }
  //   if (!wallThere)
  //   {
  //     walls.push(new Wall(floorToNearestGrid(mouseX), floorToNearestGrid(mouseY), 1, 1));
  //   }
  //
  // }
}



function doubleClicked()
{
  if (!createTestChargeCheckBox)
  {
    let notTouching = true;
    let mousePosition = createVector(mouseX, mouseY);
    for (let charge of charges)
    {
      let distance = mousePosition.dist(charge.position);
      if (distance < chargeSize)
      {
        notTouching = false;
      }
    }

    let onMetal = false
    conductors.forEach(metal => {
      if (mousePosition.x > conductor.position.x &&
        mousePosition.x < conductor.position.x + conductor.size.x && 
        mousePosition.y > conductor.position.y &&
        mousePosition.y < conductor.position.y + conductor.size.y) 
      {
        onMetal = true
      }
    })


    if (notTouching && !onMetal && mouseX < windowWidth - sidePanelWidth)
    {
      createCharge(mousePosition);

    }
  }
}


function keyPressed()
{
  let chargeSelected = charges.some(charge => charge.selected); // if a charge is currently selected, this will be true


  for (let i = 0; i < charges.length; i++)
  {
    if (charges[i].selected)
    {
      chargeSelected = true;
      if (keyCode === DELETE)
      {
        removeCharge(i);
      }
      if (keyCode === 107)
      {
        // plus key pressed
        charges[i].slider.value(charges[i].slider.value() + 1);
      }
      if (keyCode === 109)
      {
        // minus key pressed
        charges[i].slider.value(charges[i].slider.value() - 1);
      }
    }
  }
  if (!chargeSelected)
  {
    if (keyIsDown(SHIFT) && keyIsDown(187))
    {
      createCharge(createVector(mouseX,mouseY),5);
    }
    if (keyIsDown(SHIFT) && keyIsDown(189))
    {
      createCharge(createVector(mouseX,mouseY),-5);
    }
  }

  if (!chargeSelected && keyCode == 109)
  {
    createCharge(createVector(mouseX,mouseY),-5);
  }
  if (!chargeSelected && keyCode == 107)
  {
    createCharge(createVector(mouseX,mouseY),5);
  }
  createDataFromMenu();
}


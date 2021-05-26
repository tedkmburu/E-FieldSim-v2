function displayCursor()
{
    if (createTestChargeCheckBox && mouseX < width - sidePanelWidth)
    {
      push();
        fill(255);
        stroke(0)
        ellipse(mouseX, mouseY, testChargeDiameter, testChargeDiameter);
        fill(0);
      pop();
  
      noCursor();
    }
    else
    {
      cursor();
    }
}


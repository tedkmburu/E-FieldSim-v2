
function createSidePanel()
{
    buttons = []
    checkBoxes = []

    let butonHalfWidth = 125
    let buttonFullWidth = 260
    let buttonHeight = 40

    buttons.push(
        new Button({position: createVector(width - 280, 10), width: buttonHeight / 2, height: buttonHeight / 2, text: "Menu", onClick: function(){ menuOpen = !menuOpen; console.log(menuOpen); } }))

    checkBoxes.push(
        new CheckBox({position: createVector(width - 280, 50), height: 25, text: "Field Lines", value: false, onClick: function(){ showFieldLinesCheckBox = this.value; if(this.value) { createFieldLines() } } }),
        new CheckBox({position: createVector(width - 280, 80), height: 25, text: "Field Vectors", value: false, onClick: function(){ showFieldVectorsCheckBox = this.value; if(this.value) { createFieldVectors() } } }),
        new CheckBox({position: createVector(width - 280, 110), height: 25, text: "Equipotential Lines", value: false, onClick: function(){ showEquipotentialLinesCheckBox = this.value; if(this.value) { createEquipotentialLines() } } }),
        new CheckBox({position: createVector(width - 280, 140), height: 25, text: "Voltage", value: false, onClick: function(){ showVoltageCheckBox = this.value; if(this.value) { createVoltageMap() } } }),
        new CheckBox({position: createVector(width - 280, 170), height: 25, text: "Show Grid", value: true, onClick: function(){ createGridCheckBox = this.value; } }),
        new CheckBox({position: createVector(width - 250, 200), height: 25, text: "Snap to Grid", value: false, onClick: function(){ snapChargeToGrid = this.value; if(this.value) { checkBoxes[4].value = true; createGridCheckBox = true;} } }))

    buttons.push(
        new Button({position: createVector(width - 280, 250), width: butonHalfWidth, height: buttonHeight, text: "Single", onClick: function(){ createPreset('single') } }),
        new Button({position: createVector(width - 145, 250), width: butonHalfWidth, height: buttonHeight, text: "Dipole", onClick: function(){ createPreset('dipole') } }),
        new Button({position: createVector(width - 280, 300), width: butonHalfWidth, height: buttonHeight, text: "Row", onClick: function(){ createPreset('row') } }),
        new Button({position: createVector(width - 145, 300), width: butonHalfWidth, height: buttonHeight, text: "Dipole Row", onClick: function(){ createPreset('dipole row') } }),
        new Button({position: createVector(width - 280, 350), width: buttonFullWidth, height: buttonHeight, text: "Remove All Charges", onClick: function(){ createPreset(); testCharges=[]; equiPoints = []; } }))

    checkBoxes.push(
        new CheckBox({position: createVector(width - 280, 415), height: 25, text: "Test Charge Mode", value: false, onClick: function(){ createTestChargeCheckBox = this.value; } }))

    buttons.push(new Button({position: createVector(width - 280, 450), width: buttonFullWidth, height: buttonHeight, text: "Create Test Charge Map", onClick: function(){ createTestChargeCheckBox = true; createTestChargeMap(); checkBoxes[6].value = true; createTestChargeCheckBox = true;}  }),
        new Button({position: createVector(width - 280, 500), width: buttonFullWidth, height: buttonHeight, text: "Clear Test Charges", onClick: function(){ testCharges = []; } }),
    
        new Button({position: createVector(width - 280, 600), width: buttonFullWidth, height: buttonHeight, text: "Add Conductor", onClick: function(){ createMetal('='); createDataFromSidePanel(); } }),
        new Button({position: createVector(width - 280, 650), width: buttonFullWidth, height: buttonHeight, text: "Add + Conductor", onClick: function(){ createMetal('+'); createDataFromSidePanel(); } }),
        new Button({position: createVector(width - 280, 700), width: buttonFullWidth, height: buttonHeight, text: "Add - Conductor", onClick: function(){ createMetal('-'); createDataFromSidePanel(); } }),
        new Button({position: createVector(width - 280, 750), width: buttonFullWidth, height: buttonHeight, text: "Remove All Conductors", onClick: function(){ metals=[]; createDataFromSidePanel(); } }))
}




function displaySidePanel()
{
    let moveAmmount = 10;
    let moveScale = 1.15;
    let burgerMove = 1.7;

    if (menuOpen) 
    {
        if (sidePanelWidth < 300) 
        {
        sidePanelWidth += moveAmmount;

        buttons.forEach(button => 
        {
            button.x -= moveAmmount * moveScale;
        });
        buttons[0].x += burgerMove;
        
        checkBoxes.forEach(checkBox => {
            checkBox.x -= moveAmmount * moveScale;
        })
        }  
    }
    else
    {
        if (sidePanelWidth > 50) 
        {
        buttons.forEach(button => 
        {
            button.x += moveAmmount * moveScale;
        });
        buttons[0].x -= burgerMove;
        
        checkBoxes.forEach(checkBox => {
            checkBox.x += moveAmmount * moveScale;
        })
        sidePanelWidth -= moveAmmount;
        }  
    }

    // creates white background for side panel
    push()
      fill(255)
      rect(width - sidePanelWidth, 0, sidePanelWidth, height)
    pop()

    // displays all the buttons
    buttons.forEach(button => {
        button.display()
    })

    // displays all the checkboxes
    checkBoxes.forEach(checkBox => {
        checkBox.display()
    })
}




function createDataFromSidePanel() // after reading the checkboxes in the side panel, this is called to update everything on the screen to reflect the side panel checkboxes
{
    noPositiveCharges = !charges.some(charge => charge.charge >= 0); // if a positive charge exists, this will be false

    if (showVoltageCheckBox)
    {
        createVoltageMap();
    }
    if (showFieldLinesCheckBox)
    {
        createFieldLines();
    }
    if (showFieldVectorsCheckBox)
    {
        createFieldVectors();
    }
    if (showEquipotentialLinesCheckBox)
    {
        showEquipotentialLinesAt = [];
        createEquipotentialLines();
    }
}



function displayDataFromSidePanel() // After creating data based off of the side panel, this function will display it. It's called every frame
{
//   if (snapChargeToGridCheckBox)
//   {
//     select("#createGrid").checked(true);
//   }

  if (createGridCheckBox) { displayGrid(); }

  if (showVoltageCheckBox){ displayVoltage(); }

  if (showEquipotentialLinesCheckBox) { displayEquipotentialLines(); }

  if (showFieldLinesCheckBox) { displayFieldLines(); }

  if (showFieldVectorsCheckBox) { displayFieldVectors(); }

  if (createTestChargeCheckBox) { displayTestCharges(); }

  if (createWallsCheckBox) { displayWalls(); }
}
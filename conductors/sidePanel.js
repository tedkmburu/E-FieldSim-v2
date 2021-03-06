
function createSidePanel()
{
    let canvas = foreGroundCanvas;
    buttons = []
    checkBoxes = []

    //let buttonHalfWidth = 100;
    let buttonFullWidth = 205;
    let buttonHeight = 35;

    let checkBoxWidth = 100;

    let col1 = innerWidth - 260;
    let col2 = innerWidth - 155;

    buttons.push(
        new Button({position: canvas.createVector(innerWidth - 280, 10), width: buttonHeight / 2, height: buttonHeight / 2, text: "Menu", onClick: function(){ menuOpen = !menuOpen; } }))

    checkBoxes.push(
        new CheckBox({position: canvas.createVector(col1, 50), height: 20, width: checkBoxWidth, text: "Field Lines", value: false, onClick: function(){ showFieldLines = this.value; if (this.value) { createFieldLines() } } }),
        new CheckBox({position: canvas.createVector(col1, 75), height: 20, width: checkBoxWidth, text: "Field Vectors", value: false, onClick: function(){ showFieldVectors = this.value; if (this.value) { createFieldVectors() } } }),
        new CheckBox({position: canvas.createVector(col1, 100), height: 20, width: checkBoxWidth, text: "Equipotential Lines", value: false, onClick: function(){ showEquipotentialLines = this.value; equiLines = []; } }),
        new CheckBox({position: canvas.createVector(col1, 125), height: 20, width: checkBoxWidth, text: "Voltage", value: false, onClick: function(){ showVoltage = this.value; if (this.value) { createVoltage() } } }),
        new CheckBox({position: canvas.createVector(col1, 150), height: 20, width: checkBoxWidth, text: "Show Grid", value: true, onClick: function(){ createGrid = this.value; } }))

    // buttons.push(
    //     new Button({position: canvas.createVector(col1, 255), width: buttonHalfWidth, height: buttonHeight, text: "Single", onClick: function(){ createPreset('single') } }),
    //     new Button({position: canvas.createVector(col2, 255), width: buttonHalfWidth, height: buttonHeight, text: "Dipole", onClick: function(){ createPreset('dipole') } }),
    //     new Button({position: canvas.createVector(col1, 295), width: buttonHalfWidth, height: buttonHeight, text: "Row", onClick: function(){ createPreset('row') } }),
    //     new Button({position: canvas.createVector(col2, 295), width: buttonHalfWidth, height: buttonHeight, text: "Dipole Row", onClick: function(){ createPreset('dipole row') } }),
    //     new Button({position: canvas.createVector(col1, 335), width: buttonFullWidth, height: buttonHeight, text: "Remove All Charges", onClick: function(){ createPreset(null); testCharges=[]; equiPoints = []; } }))

    checkBoxes.push(
        new CheckBox({position: canvas.createVector(col1, 415), height: 20, width: checkBoxWidth, text: "Test Charge Mode", value: false, onClick: function(){ testChargeMode = this.value; } }))

    buttons.push(
        new Button({position: canvas.createVector(col1, 440), width: buttonFullWidth, height: buttonHeight, text: "Create Test Charge Map", onClick: function(){ testChargeMode = true; createTestChargeMap(); checkBoxes[6].value = true; testChargeMode = true;} }),
        new Button({position: canvas.createVector(col1, 480), width: buttonFullWidth, height: buttonHeight, text: "Clear Test Charges", onClick: function(){ testCharges = []; } }),

        new Button({position: canvas.createVector(col1, 550), width: buttonFullWidth, height: buttonHeight, text: "Add Conductor", onClick: function(){ createConductor('=', "rect"); createDataFromSidePanel(); } }),
        new Button({position: canvas.createVector(col1, 590), width: buttonFullWidth, height: buttonHeight, text: "Add + Conductor", onClick: function(){ createConductor('+', "rect"); createDataFromSidePanel(); } }),
        new Button({position: canvas.createVector(col1, 630), width: buttonFullWidth, height: buttonHeight, text: "Add - Conductor", onClick: function(){ createConductor('-', "rect"); createDataFromSidePanel(); } }),
        new Button({position: canvas.createVector(col1, 670), width: buttonFullWidth, height: buttonHeight, text: "Remove All Conductors", onClick: function(){ conductors = []; particles = []; createDataFromSidePanel(); } }),

        new Button({position: canvas.createVector(col1, 770), width: buttonFullWidth, height: buttonHeight, text: "Point Charges", onClick: function(){ window.open("../index.html") } }))

}




function displaySidePanel()
{
    let canvas = foreGroundCanvas;

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
                button.position.x -= moveAmmount * moveScale;
            });
            buttons[0].position.x += burgerMove;
            
            checkBoxes.forEach(checkBox => {
                checkBox.position.x -= moveAmmount * moveScale;
            })
        }  
    }
    else
    {
        if (sidePanelWidth > 50) 
        {
            buttons.forEach(button => 
            {
                button.position.x += moveAmmount * moveScale;
            });
            buttons[0].position.x -= burgerMove;
            
            checkBoxes.forEach(checkBox => {
                checkBox.position.x += moveAmmount * moveScale;
            })
            sidePanelWidth -= moveAmmount;
        }  
    }

    // creates white background for side panel
    canvas.push()
        canvas.fill(255)
        canvas.rect(innerWidth - sidePanelWidth, 0, sidePanelWidth, innerHeight)

        // canvas.fill(0);
        // canvas.noStroke();
        // canvas.textSize(16);
        
        // canvas.text("Premade Configurations: " , buttons[1].position.x, 250);
    canvas.pop()
}




function createDataFromSidePanel() // after reading the checkboxes in the side panel, this is called to update everything on the screen to reflect the side panel checkboxes
{
    noPositiveCharges = !charges.some(charge => charge.charge >= 0) && !conductors.some(conductor => conductor.charge == "+"); // if a positive charge exists, this will be false

    if (showVoltage) createVoltage();
    
    if (showFieldLines) createFieldLines();
    
    if (showFieldVectors) createFieldVectors();
    
    if (showEquipotentialLines)
    {
        showEquipotentialLinesAt = [];
    }
}



function displayDataFromSidePanel() // After creating data based off of the side panel, this function will display it. It's called every frame
{
  if (createGrid) { displayGrid(); }

  if (showEquipotentialLines) { displayEquipotentialLines(); }

  if (showFieldLines) { displayFieldLines(); }

  if (showFieldVectors) { displayFieldVectors(); }

  if (testChargeMode) { displayTestCharges(); }
}
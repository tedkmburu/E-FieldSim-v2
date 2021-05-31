
function createSidePanel(canvas)
{
    buttons = []
    checkBoxes = []

    let butonHalfWidth = 100;
    let buttonFullWidth = 205;
    let buttonHeight = 35;

    let checkBoxWidth = 100;

    let col1 = innerWidth - 260;
    let col2 = innerWidth - 155;

    buttons.push(
        new Button({position: canvas.createVector(innerWidth - 280, 10), width: buttonHeight / 2, height: buttonHeight / 2, text: "Menu", onClick: function(){ menuOpen = !menuOpen; }, canvas: canvas }))

    checkBoxes.push(
        new CheckBox({position: canvas.createVector(col1, 50), height: 20, width: checkBoxWidth, text: "Field Lines", value: false, onClick: function(){ showFieldLines = this.value; if(this.value) { createFieldLines(canvas) } }, canvas: canvas }),
        new CheckBox({position: canvas.createVector(col1, 75), height: 20, width: checkBoxWidth, text: "Field Vectors", value: false, onClick: function(){ showFieldVectors = this.value; if(this.value) { createFieldVectors(canvas) } }, canvas: canvas }),
        new CheckBox({position: canvas.createVector(col1, 100), height: 20, width: checkBoxWidth, text: "Equipotential Lines", value: false, onClick: function(){ showEquipotentialLines = this.value; }, canvas: canvas }),
        new CheckBox({position: canvas.createVector(col1, 125), height: 20, width: checkBoxWidth, text: "Voltage", value: true, onClick: function(){ showVoltage = this.value; if(this.value) { createVoltage(canvas) } }, canvas: canvas }),
        new CheckBox({position: canvas.createVector(col1, 150), height: 20, width: checkBoxWidth, text: "Show Grid", value: true, onClick: function(){ createGrid = this.value; }, canvas: canvas }),
        new CheckBox({position: canvas.createVector(col1 + 20, 175), height: 20, width: checkBoxWidth, text: "Snap to Grid", value: false, onClick: function(){ snapToGrid = this.value; if(this.value) { checkBoxes[4].value = true; createGrid = true;} }, canvas: canvas }))

    buttons.push(
        new Button({position: canvas.createVector(col1, 255), width: butonHalfWidth, height: buttonHeight, text: "Single", onClick: function(){ createPreset('single', canvas) }, canvas: canvas }),
        new Button({position: canvas.createVector(col2, 255), width: butonHalfWidth, height: buttonHeight, text: "Dipole", onClick: function(){ createPreset('dipole', canvas) }, canvas: canvas }),
        new Button({position: canvas.createVector(col1, 295), width: butonHalfWidth, height: buttonHeight, text: "Row", onClick: function(){ createPreset('row', canvas) }, canvas: canvas }),
        new Button({position: canvas.createVector(col2, 295), width: butonHalfWidth, height: buttonHeight, text: "Dipole Row", onClick: function(){ createPreset('dipole row', canvas) }, canvas: canvas }),
        new Button({position: canvas.createVector(col1, 335), width: buttonFullWidth, height: buttonHeight, text: "Remove All Charges", onClick: function(){ createPreset(null, canvas); testCharges=[]; equiPoints = []; }, canvas: canvas }))

    checkBoxes.push(
        new CheckBox({position: canvas.createVector(col1, 415), height: 20, width: checkBoxWidth, text: "Test Charge Mode", value: false, onClick: function(){ testChargeMode = this.value; }, canvas: canvas }))

    buttons.push(
        new Button({position: canvas.createVector(col1, 440), width: buttonFullWidth, height: buttonHeight, text: "Create Test Charge Map", onClick: function(){ testChargeMode = true; createTestChargeMap(canvas); checkBoxes[6].value = true; testChargeMode = true;}, canvas: canvas  }),
        new Button({position: canvas.createVector(col1, 480), width: buttonFullWidth, height: buttonHeight, text: "Clear Test Charges", onClick: function(){ testCharges = []; }, canvas: canvas }),

        new Button({position: canvas.createVector(col1, 550), width: buttonFullWidth, height: buttonHeight, text: "Add Conductor", onClick: function(){ createMetal('='); createDataFromSidePanel(canvas); }, canvas: canvas }),
        new Button({position: canvas.createVector(col1, 590), width: buttonFullWidth, height: buttonHeight, text: "Add + Conductor", onClick: function(){ createMetal('+'); createDataFromSidePanel(canvas); }, canvas: canvas }),
        new Button({position: canvas.createVector(col1, 630), width: buttonFullWidth, height: buttonHeight, text: "Add - Conductor", onClick: function(){ createMetal('-'); createDataFromSidePanel(canvas); }, canvas: canvas }),
        new Button({position: canvas.createVector(col1, 670), width: buttonFullWidth, height: buttonHeight, text: "Remove All Conductors", onClick: function(){ metals=[]; createDataFromSidePanel(canvas); }, canvas: canvas }))

}




function displaySidePanel(canvas)
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

        canvas.fill(0);
        canvas.noStroke();
        canvas.textSize(16);
        
        canvas.text("Premade Configurations: " , buttons[1].position.x, 250);
    canvas.pop()
}




function createDataFromSidePanel(canvas) // after reading the checkboxes in the side panel, this is called to update everything on the screen to reflect the side panel checkboxes
{
    noPositiveCharges = !charges.some(charge => charge.charge >= 0); // if a positive charge exists, this will be false

    if (showVoltage) createVoltage(canvas);
    
    if (showFieldLines) createFieldLines(canvas);
    
    if (showFieldVectors) createFieldVectors(canvas);
    
    if (showEquipotentialLines)
    {
        showEquipotentialLinesAt = [];
    }
}



function displayDataFromSidePanel(canvas) // After creating data based off of the side panel, this function will display it. It's called every frame
{

  if (createGrid) { displayGrid(canvas); }

  

  if (showEquipotentialLines) { displayEquipotentialLines(canvas); }

  if (showFieldLines) { displayFieldLines(canvas); }

  if (showFieldVectors) { displayFieldVectors(canvas); }

  if (testChargeMode) { displayTestCharges(canvas); }
}
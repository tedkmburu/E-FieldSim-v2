
function createSidePanel()
{
    let canvas = foreGroundCanvas;
    buttons = []
    checkBoxes = []

    let butonHalfWidth = 100;
    let buttonFullWidth = 205;
    let buttonHeight = 35;

    let checkBoxWidth = 100;

    let col1 = innerWidth - 260;
    let col2 = innerWidth - 155;

    buttons.push(
        new Button({position: canvas.createVector(innerWidth - 280, 10), width: buttonHeight / 2, height: buttonHeight / 2, image: icons[3], onClick: function(){ menuOpen = !menuOpen; } }))

    checkBoxes.push(
        new CheckBox({position: canvas.createVector(col1, 50), height: 20, width: checkBoxWidth, text: "Field Lines",          value: true, onClick: function(){ showFieldLines = this.value; if (this.value) { createFieldLines() } } }),
        new CheckBox({position: canvas.createVector(col1, 75), height: 20, width: checkBoxWidth, text: "Field Vectors",        value: false, onClick: function(){ showFieldVectors = this.value; if (this.value) { createFieldVectors() } } }),
        new CheckBox({position: canvas.createVector(col1, 100), height: 20, width: checkBoxWidth, text: "Equipotential Lines", value: false, onClick: function(){ showEquipotentialLines = this.value; equiLines = []; }, hoverText: "Click to Anywhere to Create an Equipotential Line" }),
        new CheckBox({position: canvas.createVector(col1, 125), height: 20, width: checkBoxWidth, text: "Voltage",             value: false, onClick: function(){ showVoltage = this.value; if (this.value) { createVoltage() } } }),
        new CheckBox({position: canvas.createVector(col1, 150), height: 20, width: checkBoxWidth, text: "Show Grid",           value: true,  onClick: function(){ createGrid = this.value; } }),
        new CheckBox({position: canvas.createVector(col1 + 20, 175), height:20, width:checkBoxWidth, text:"Snap to Grid",      value: false, onClick: function(){ snapToGrid = this.value; if (this.value) { checkBoxes[4].value = true; createGrid = true;} } }))

    buttons.push(
        new Button({position: canvas.createVector(col1, 255), width: butonHalfWidth, height: buttonHeight, text: "Single", onClick: function(){ createPreset('single') } }),
        new Button({position: canvas.createVector(col2, 255), width: butonHalfWidth, height: buttonHeight, text: "Dipole", onClick: function(){ createPreset('dipole') } }),
        new Button({position: canvas.createVector(col1, 295), width: butonHalfWidth, height: buttonHeight, text: "Row", onClick: function(){ createPreset('row') } }),
        new Button({position: canvas.createVector(col2, 295), width: butonHalfWidth, height: buttonHeight, text: "Dipole Row", onClick: function(){ createPreset('dipole row') } }),
        new Button({position: canvas.createVector(col1, 335), width: buttonFullWidth, height: buttonHeight, text: "Random", onClick: function(){ createPreset("random"); } }),
        new Button({position: canvas.createVector(col1, 375), width: buttonFullWidth, height: buttonHeight, text: "Remove All Charges", onClick: function(){ createPreset(null); testCharges=[];} }))

    checkBoxes.push(
        new CheckBox({position: canvas.createVector(col1, 465), height: 20, width: checkBoxWidth, text: "Test Charge Mode", value: false, onClick: function(){ testChargeMode = this.value; }, hoverText: "Click to Anywhere to Place a Test Charge" }))

    buttons.push(
        new Button({position: canvas.createVector(col1, 490), width: buttonFullWidth, height: buttonHeight, text: "Create Test Charge Map", onClick: function(){ testChargeMode = true; createTestChargeMap(); checkBoxes[6].value = true; testChargeMode = true;} }),
        new Button({position: canvas.createVector(col1, 530), width: buttonFullWidth, height: buttonHeight, text: "Clear Test Charges", onClick: function(){ testCharges = []; } }),

        // new Button({position: canvas.createVector(col1, 600), width: buttonFullWidth, height: buttonHeight, text: "Conductors", onClick: function(){ window.open("conductors/conductors.html") } })
        )

        for (let i = 0; i < icons.length - 1; i++) 
        {
            let x = innerWidth - 230 + (i * 50); 
            let y = innerHeight - 50; 
            buttons.push(new Button({position: canvas.createVector(x, y), width: 25, height: 25, image: icons[i], onClick: function(){ bottomButtons(i); } }));
        }

}




function bottomButtons(i)
{
    console.log(i);
    if (i == 0) 
    {
        saveAsPNG();
    }
    if (i == 1) 
    {
        console.log("help");
    }
    if (i == 2) 
    {
        console.log("share");   
    }
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

        canvas.fill(0);
        canvas.noStroke();
        canvas.textSize(16);
        
        canvas.text("Premade Configurations: " , buttons[1].position.x, 250);

        canvas.imageMode(canvas.CENTER);
        canvas.image(QRCode, innerWidth - (sidePanelWidth / 2), innerHeight - 200, 200, 200);

        
        // for (let i = 0; i < icons.length - 1; i++) 
        // {
        //     canvas.image(icons[i], innerWidth - 230 + (i * 50), innerHeight - 50, 25, 25);
        // }

    canvas.pop()
}




function createDataFromSidePanel() // after reading the checkboxes in the side panel, this is called to update everything on the screen to reflect the side panel checkboxes
{
    noPositiveCharges = !charges.some(charge => charge.charge > 0); // if a positive charge exists, this will be false

    if (showVoltage) createVoltage();
    
    if (showFieldLines) createFieldLines();
    
    if (showFieldVectors) createFieldVectors();
}



function displayDataFromSidePanel() // After creating data based off of the side panel, this function will display it. It's called every frame
{
  if (createGrid) displayGrid(); 

  if (showEquipotentialLines) displayEquipotentialLines(); 

  if (showFieldLines) displayFieldLines(); 

  if (showFieldVectors) displayFieldVectors(); 

  if (testChargeMode) displayTestCharges(); 

  if (showVoltage) showVoltageOnCursor();
}
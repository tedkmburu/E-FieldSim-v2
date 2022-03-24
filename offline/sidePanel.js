
function createSidePanel()
{
    let canvas = foreGroundCanvas;
    buttons = []
    checkBoxes = []

    let buttonHalfWidth = 100;
    let buttonFullWidth = 205;
    let buttonHeight = 35;

    let checkBoxWidth = 100;

    let col1 = innerWidth - 260;
    let col2 = innerWidth - 155;

    buttons.push(
        new Button({position: canvas.createVector(innerWidth - 280 - (buttonHeight / 4), 10 - (buttonHeight / 4)), width: buttonHeight, height: buttonHeight, image: icons[3], onClick: () => menuOpen = !menuOpen }));

    checkBoxes.push(
        new CheckBox({position: canvas.createVector(col1, 50), height: 20, width: checkBoxWidth, text: "Field Lines",          value: true, onClick: function(){ showFieldLines = this.value; if (this.value) { createFieldLines() } } }),
        new CheckBox({position: canvas.createVector(col1, 75), height: 20, width: checkBoxWidth, text: "Field Vectors",        value: false, onClick: function(){ showFieldVectors = this.value; if (this.value) { createFieldVectors() } } }),
        new CheckBox({position: canvas.createVector(col1, 100), height: 20, width: checkBoxWidth, text: "Equipotential Lines", value: false, onClick: function(){ showEquipotentialLines = this.value; equiLines = []; }, hoverText: "Click to Anywhere to Draw an Equipotential Line" }),
        new CheckBox({position: canvas.createVector(col1, 125), height: 20, width: checkBoxWidth, text: "Voltage",             value: false, onClick: function(){ showVoltage = this.value; if (this.value) { createVoltage() } } }),
        new CheckBox({position: canvas.createVector(col1 + 20, 150), height: 20, width: checkBoxWidth, text: "Numerical Value",     value: false, onClick: function(){ showVoltageValue = this.value } }),
        new CheckBox({position: canvas.createVector(col1, 175), height: 20, width: checkBoxWidth, text: "Show Grid",           value: true,  onClick: function(){ createGrid = this.value; } }),
        new CheckBox({position: canvas.createVector(col1 + 20, 200), height:20, width:checkBoxWidth, text:"Snap to Grid",      value: false, onClick: function(){ snapToGrid = this.value; if (this.value) { checkBoxes[4].value = true; createGrid = true;} } }))

    buttons.push(
        new Button({position: canvas.createVector(col1, 265), width: buttonHalfWidth, height: buttonHeight, text: "Single", onClick: function(){ createPreset('single') } }),
        new Button({position: canvas.createVector(col2, 265), width: buttonHalfWidth, height: buttonHeight, text: "Dipole", onClick: function(){ createPreset('dipole') } }),
        new Button({position: canvas.createVector(col1, 305), width: buttonHalfWidth, height: buttonHeight, text: "Row", onClick: function(){ createPreset('row') } }),
        new Button({position: canvas.createVector(col2, 305), width: buttonHalfWidth, height: buttonHeight, text: "Dipole Row", onClick: function(){ createPreset('dipole row') } }),
        new Button({position: canvas.createVector(col1, 345), width: buttonFullWidth, height: buttonHeight, text: "Random", onClick: function(){ createPreset("random"); } }),
        new Button({position: canvas.createVector(col1, 385), width: buttonFullWidth, height: buttonHeight, text: "Remove All Charges", onClick: function(){ createPreset(null); testCharges=[];} }));

    checkBoxes.push(
        new CheckBox({position: canvas.createVector(col1, 465), height: 20, width: checkBoxWidth, text: "Test Charge Mode", value: false, onClick: function(){ testChargeMode = this.value; }, hoverText: "Click to Anywhere to Place a Test Charge" }))

    buttons.push(
        new Button({position: canvas.createVector(col1, 490), width: buttonFullWidth, height: buttonHeight, text: "Create Test Charge Map", onClick: function(){ testChargeMode = true; createTestChargeMap(); checkBoxes[6].value = true; testChargeMode = true;} }),
        new Button({position: canvas.createVector(col1, 530), width: buttonFullWidth, height: buttonHeight, text: "Clear Test Charges", onClick: function(){ testCharges = []; } }),

        // new Button({position: canvas.createVector(col1, 600), width: buttonFullWidth, height: buttonHeight, text: "Conductors", onClick: function(){ window.open("conductors/conductors.html") } })
        );

    buttons.push(
        //new Button({position: canvas.createVector(innerWidth - 100, innerHeight - 50), width: 25, height: 25, image: icons[0], onClick: function(){ saveAsPNG(); } }),
        new Button({position: canvas.createVector(innerWidth - 140 - (buttonHeight / 4), innerHeight - 50 - (buttonHeight / 4)), width: 50, height: 50, image: icons[1], onClick: function(){ toggleHelp() }, hoverText: "Help" }),
        new Button({position: canvas.createVector(innerWidth - 210 - (buttonHeight / 4), innerHeight - 50 - (buttonHeight / 4)), width: 50, height: 50, image: icons[2], onClick: function(){ showQRCode = !showQRCode;  }, hoverText: "Share" })
        );

    // popUpCloseButton = new Button({position: canvas.createVector(col1, 265), width: butonHalfWidth, height: buttonHeight, text: "Single", onClick: function(){ createPreset('single') } });
    // document.getElementById("popup").style.visibility = "hidden";
}




function bottomButtons(i)
{
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
        showQRCode = !showQRCode; 
    }
}

function toggleHelp()
{
    if (!showHelp) 
    {
        document.getElementById("popup").style.visibility = "hidden";
    }
    else
    {
        document.getElementById("popup").style.visibility = "visible";
    }  
    showHelp = !showHelp;  
}

function closeHelp()
{
    showHelp = false; 
    document.getElementById("popup").style.visibility = "hidden";
      
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

    // creates white background for side panel and writes text
    canvas.push()
        canvas.fill(255)
        canvas.rect(innerWidth - sidePanelWidth, 0, sidePanelWidth, innerHeight)

        canvas.fill(0);
        canvas.noStroke();
        canvas.textSize(16);
        
        canvas.text("Premade Configurations: " , buttons[1].position.x, 260);

        canvas.imageMode(canvas.CENTER);

        if (showQRCode) 
        {
            canvas.image(QRCode, innerWidth - (sidePanelWidth / 2), innerHeight - 200, 200, 200);
        }

        canvas.fill(100);
        canvas.textSize(12);
        canvas.textFont(buttonFont);

        canvas.text("Help" ,  buttons[9].position.x + 10, buttons[9].position.y + 50);
        // canvas.text("Save" ,  buttons[9].position.x  - 2, buttons[9].position.y  + 40);
        canvas.text("Share" , buttons[10].position.x + 10, buttons[10].position.y + 50);
        

    canvas.pop()
}




function createDataFromSidePanel() // after reading the checkboxes in the side panel, this is called to update everything on the screen to reflect the side panel checkboxes
{
    noPositiveCharges = !charges.some(charge => charge.charge > 0); // if a positive charge exists, this will be false
    // numberOfNegativeCharges = charges.filter(charge => { return charge.charge < 0}).length


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

  if (showVoltageValue) showVoltageValueOnCursor();
}
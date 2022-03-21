function createContextMenu()
{
    let canvas = foreGroundCanvas;
    contextMenuButtons = [];
    
    let buttonWidth = 150;
    let buttonHeight = 35; 

    let chargeToDelete; // this will store the index of the charge that the user right clicked

    let rightClickedOnCharge = charges.some((charge, i) => {
        chargeToDelete = i; // the index of the charge to delete is set here
        return pointIsInsideCircle(contextMenuPosition, charge);  // returns true or false based on if the charge is right clicked
    })

    if (rightClickedOnCharge)   // a charge has been right clicked so create a 'delete charge' button
    {
        contextMenuButtons.push(
            new Button({position: canvas.createVector(0, 0 ).add(contextMenuPosition), width: buttonWidth, height: buttonHeight, alignText: canvas.LEFT, text: "Delete Charge", onClick: function(){ removeCharge(chargeToDelete); createDataFromSidePanel(); } }))
    }
    else   // a charge has not been right clicked so create a 'create charge' button
    {
        contextMenuButtons.push(
            new Button({position: canvas.createVector(0, 0 ).add(contextMenuPosition), width: buttonWidth, height: buttonHeight, alignText: canvas.LEFT, text: "Create Charge", onClick: function(){ createPointCharge(contextMenuPosition) } }))
    }
    
    contextMenuButtons.push(
        new Button({position: canvas.createVector(0, 35).add(contextMenuPosition), width: buttonWidth, height: buttonHeight, alignText: canvas.LEFT, text: "Clear Charges", onClick: function(){ createPreset(null); testCharges=[]; equiPoints = []; } }),
        new Button({position: canvas.createVector(0, 70).add(contextMenuPosition), width: buttonWidth, height: buttonHeight, alignText: canvas.LEFT, text: "Refresh", onClick: function(){ location.reload(); } }),
        // new Button({position: canvas.createVector(0, 105).add(contextMenuPosition), width: buttonWidth, height: buttonHeight, alignText: canvas.LEFT, text: "Save As PNG", onClick: function(){ setTimeout(function(){ saveAsPNG(); }, 250); } })
        )

}



function displayContextMenu() // shows the right click menu. runs every frame after the user right clicks
{
    contextMenuButtons.forEach(button => {
        if (button.visible) 
        {
            button.display();
        }
    })
}



function saveAsPNG() 
{ 
    let canvas = foreGroundCanvas;

    let  options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }; // specifies the format to get the date in
    let d = new Date();
    let date = d.toLocaleDateString("en-US", options);
    let time = d.toLocaleTimeString();
    canvas.saveCanvas(`Electric Field - ${date}  ${time}`, 'png'); // saves a screenshot of the page to the user's device with the name inside the parentheses 
}



function rightClick() // called when the user right clicks the page
{
    charges.forEach(charge => {charge.selected = false;} ) // deselect all charges to get rid of sliders

    if (mousePosition.x < innerWidth - sidePanelWidth)    // if they didn't rightclick the side panel, show the right click menu
    {
        showContextMenu = true;

        contextMenuPosition = mousePosition // sets the new position for the right click menu
        createContextMenu();
    }
    else
    {
        hideContextMenu(); // if they did rightclick the side panel, hide the right click menu
    }
}



function hideContextMenu()
{
    showContextMenu = false;
}
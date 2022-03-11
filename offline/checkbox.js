function displayCheckBoxes() // displays all the checkboxes
{
    checkBoxes.forEach(checkBox => {
        if (checkBox.visible) 
        {
            checkBox.display();
        }
    })
}

class CheckBox
{
    constructor(props)
    {
        this.position = props.position;
        this.width = props.width;
        this.height = props.height;

        this.visible = props.visible || true;
        this.hovering = false;
        this.hoverText = props.hoverText;

        this.text = props.text; // text shown beside the checkBox
        this.value = props.value; // boolean value for the checkBox
        this.onClick = props.onClick; // function to run when user clicks the checkBox
        

        this.onClick() // calls the onClick function once when the checkbox is created
    }

    display()
    {
        let canvas = foreGroundCanvas;
        let checkBox = this;
        
        canvas.push();
            
            canvas.strokeWeight(1)
            if (this.value)
            {
                canvas.fill("#0075FF");
                canvas.stroke("#0075FF")
            }
            else 
            {
                canvas.fill(255);
                canvas.stroke("#767676")
            }

            canvas.rect(checkBox.position.x, checkBox.position.y, checkBox.height, checkBox.height, 2);

            canvas.stroke(255)
            canvas.noFill()
            canvas.rect(checkBox.position.x - 1, checkBox.position.y - 1, checkBox.height + 2, checkBox.height + 2, 2);
            
            if (this.value)
            {
                canvas.stroke(255)
                canvas.strokeWeight(4)
                let startX = checkBox.position.x + (checkBox.height / 2.5);
                let startY = checkBox.position.y + checkBox.height - (checkBox.height / 2.85);
                let endX = checkBox.position.x + checkBox.height - (checkBox.height / 4)
                let endY = checkBox.position.y + (checkBox.height / 4)
                canvas.line(startX, startY, endX, endY)

                startX = checkBox.position.x + (checkBox.height / 2.5);
                startY = checkBox.position.y + checkBox.height - (checkBox.height / 2.85);
                endX = checkBox.position.x + (checkBox.height / 4);
                endY = checkBox.position.y + (checkBox.height / 2);
                canvas.line(startX, startY, endX, endY)

                canvas.strokeWeight(1)
            }

            canvas.fill(0);
            canvas.textAlign(canvas.LEFT, canvas.CENTER);
            canvas.textSize(16);
            canvas.noStroke();
            canvas.text(checkBox.text, checkBox.position.x + (1.4 * checkBox.height),  checkBox.position.y + (checkBox.height / 2) );

            if (checkBox.hovering && checkBox.hoverText != null && checkBox.value == true) 
            {
                canvas.fill("rgba(0,0,0,0.75)");
                canvas.rect(0, 0, innerWidth - sidePanelWidth, innerHeight);


                canvas.fill(255);
                
                canvas.textAlign(canvas.CENTER);
                canvas.textSize(24);
                canvas.noStroke();
                canvas.text(checkBox.hoverText, (innerWidth - sidePanelWidth)/2, innerHeight/2);
            }


        canvas.pop();  
        
    }

    clicked()
    {
        let checkBox = this;
        if (checkBox.visible) 
        {
            checkBox.value = !checkBox.value;
            checkBox.onClick()
        }
    }
  
}



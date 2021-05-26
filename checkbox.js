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

        this.text = props.text; // text shown beside the checkBox
        this.value = props.value; // boolean value for the checkBox
        this.onClick = props.onClick; // function to run when user clicks the checkBox

        this.onClick() // calls the onClick function once when the checkbox is created
    }

    display()
    {
        let checkBox = this;
        
        push();
            
            strokeWeight(1)
            if (this.value)
            {
                fill("#0075FF");
                stroke("#0075FF")
            }
            else 
            {
                fill(255);
                stroke("#767676")
            }

            rect(checkBox.position.x, checkBox.position.y, checkBox.height, checkBox.height, 2);

            stroke(255)
            noFill()
            rect(checkBox.position.x - 1, checkBox.position.y - 1, checkBox.height + 2, checkBox.height + 2, 2);
            
            if (this.value)
            {
                stroke(255)
                strokeWeight(4)
                let startX = checkBox.position.x + (checkBox.height / 2.5);
                let startY = checkBox.position.y + checkBox.height - (checkBox.height / 2.85);
                let endX = checkBox.position.x + checkBox.height - (checkBox.height / 4)
                let endY = checkBox.position.y + (checkBox.height / 4)
                line(startX, startY, endX, endY)

                startX = checkBox.position.x + (checkBox.height / 2.5);
                startY = checkBox.position.y + checkBox.height - (checkBox.height / 2.85);
                endX = checkBox.position.x + (checkBox.height / 4);
                endY = checkBox.position.y + (checkBox.height / 2);
                line(startX, startY, endX, endY)

                strokeWeight(1)
            }

            fill(0);
            textAlign(LEFT, CENTER);
            textSize(16);
            noStroke();
            text(checkBox.text, checkBox.position.x + (1.4 * checkBox.height),  checkBox.position.y + (checkBox.height / 2) );
        pop();  
        
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



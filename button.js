
function displayButtons() // displays all the buttons
{
    buttons.forEach(button => {
        if (button.visible) 
        {
            button.display();
        }
    })
}

class Button
{
    constructor(props)
    {
        this.position = props.position;
        this.width = props.width;
        this.height = props.height;

        this.visible = props.visible || true;
        this.hovering = false;
        this.alignText = props.alignText || CENTER;

        this.text = props.text;

        this.onClick = props.onClick;
    }

    display()
    {
        let button = this;
        
        if (button.text != "Menu") // this will be all the normal buttons
        {
            push();
                
                if (button.alignText == CENTER) // this will be all the buttons in the side panel
                {
                    stroke("#4F4F4F")
                    fill("#EFEFEF");

                    if (button.hovering) 
                    {
                        fill("#E5E5E5")    
                    }

                    rect(button.position.x, button.position.y, button.width, button.height, 2);

                    fill(0);
                    textAlign(button.alignText,CENTER);
                    
                    noStroke();

                    textFont(buttonFont);
                    textSize(13);
                    text(button.text, button.position.x + (button.width / 2),  button.position.y + (button.height / 2) );

                    stroke(255)
                    noFill()
                    rect(button.position.x - 1, button.position.y - 1, button.width + 2, button.height + 2, 2);
                }
                else    // this will be all the buttons in the right click menu
                {
                    noStroke()
                    fill(255);
                    if (button.hovering) 
                    {
                        fill("#E5E5E5")    
                    }
                    rect(button.position.x, button.position.y, button.width, button.height + 10, 2);
                    stroke(125)
                    line(button.position.x, button.position.y + button.height, button.position.x + button.width,  button.position.y + button.height)

                    noStroke()
                    fill(0);
                    textAlign(button.alignText,CENTER);
                    textSize(16);
                    text(button.text, button.position.x + 10,  button.position.y + (button.height / 2));
                }
                
            pop();  
        }
        else // this is the three line "burger" at the top of the side panel
        {
            push();
                noStroke();
                fill(0);
                rect(button.position.x, button.position.y, button.width, button.height / 5, 2);

                rect(button.position.x, button.position.y + (button.height / 3), button.width, button.height / 5, 2);

                rect(button.position.x, button.position.y + (2 * button.height / 3), button.width, button.height / 5, 2);
            pop(); 
        }
        
        
    }

    clicked()
    {
        let button = this;
        if (button.visible) 
        {
            button.onClick();
        }
        

        
    }
  
}



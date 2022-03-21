
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
        let canvas = foreGroundCanvas;
        this.position = props.position;
        this.width = props.width;
        this.height = props.height;

        this.visible = props.visible || true;
        this.alignText = props.alignText || canvas.CENTER;
        this.hovering = false;
        this.hoverText = props.hoverText;

        this.text = props.text;
        this.image = props.image;

        this.onClick = props.onClick;
    }

    display()
    {
        let button = this;
        let canvas = foreGroundCanvas;
        
        if (button.image == undefined) // this will be all the normal buttons
        {
            canvas.push();
                
                if (button.alignText == canvas.CENTER) // this will be all the buttons in the side panel
                {
                    canvas.stroke("#4F4F4F")
                    canvas.fill("#EFEFEF");

                    if (button.hovering) 
                    {
                        canvas.fill("#E5E5E5")    
                    }

                    canvas.rect(button.position.x, button.position.y, button.width, button.height, 2);

                    canvas.fill(0);
                    canvas.textAlign(button.alignText, canvas.CENTER);
                    
                    canvas.noStroke();

                    canvas.textFont(buttonFont);
                    canvas.textSize(13);
                    canvas.text(button.text, button.position.x + (button.width / 2),  button.position.y + (button.height / 2) );

                    canvas.stroke(255)
                    canvas.noFill()
                    canvas.rect(button.position.x - 1, button.position.y - 1, button.width + 2, button.height + 2, 2);
                }
                else    // this will be all the buttons in the right click menu
                {
                    canvas.noStroke()
                    canvas.fill(255);
                    if (button.hovering) 
                    {
                        canvas.fill("#E5E5E5")    
                    }
                    canvas.rect(button.position.x, button.position.y, button.width, button.height + 10, 2);
                    canvas.stroke(125)
                    canvas.line(button.position.x, button.position.y + button.height, button.position.x + button.width,  button.position.y + button.height)

                    canvas.noStroke()
                    canvas.fill(0);
                    canvas.textAlign(button.alignText, canvas.CENTER);
                    canvas.textSize(16);
                    canvas.text(button.text, button.position.x + 10,  button.position.y + (button.height / 2));
                }

                if (button.hovering && button.hoverText != null) 
                {
                    canvas.fill("rgba(0,0,0,0.75)");
                    canvas.rect(0, 0, innerWidth - sidePanelWidth, innerHeight);


                    canvas.fill(255);
                    
                    canvas.textAlign(canvas.CENTER);
                    canvas.textSize(24);
                    canvas.noStroke();
                    canvas.text(button.hoverText, (innerWidth - sidePanelWidth)/2, innerHeight/2);

                    // console.log(button.hoverText);
                }
                
            canvas.pop();  
        }
        else // this is the three line "burger" at the top of the side panel and the help and share buttons
        {
            
            // canvas.fill("rgba(255,0,0,0.5)")
            // canvas.rect(button.position.x, button.position.y, button.width, button.height);   

            canvas.image(button.image, button.position.x + (button.width / 4), button.position.y + (button.width / 4), button.width / 2, button.height / 2);
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




class Button
{
    constructor(props)
    {
        this.position = props.position;
        this.width = props.width;
        this.height = props.height;

        this.visibility = props.visibility || "visible";

        this.text = props.text;

        this.onClick = props.onClick;
    }

    display()
    {
        let button = this;
        
        if (button.text != "Menu") 
        {
            push();
                stroke(0)
                fill("#EFEFEF");
                rect(button.position.x, button.position.y, button.width, button.height, 2);

                fill(0);
                textAlign(CENTER,CENTER);
                textSize(13);
                noStroke();
                text(button.text, button.position.x + (button.width / 2),  button.position.y + (button.height / 2) );
            pop();  
        }
        else
        {
            push();
                noStroke()
                fill(0);
                rect(button.x, button.position.y, button.width, button.height / 5, 2);

                rect(button.x, button.position.y + (button.height / 3), button.width, button.height / 5, 2);

                rect(button.x, button.position.y + (2 * button.height / 3), button.width, button.height / 5, 2);
            pop(); 
        }
        
        
    }

    clicked()
    {
        let button = this;
        if (button.visibility != "hidden") 
        {
            button.onClick();
        }
        

        
    }
  
}



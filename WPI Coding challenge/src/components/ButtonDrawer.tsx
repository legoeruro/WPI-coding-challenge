import {
    Button
} from 'react-bootstrap';

import "../styling/styling.css"
import React, { useEffect } from 'react';

import { useState, memo } from 'react';

//import useMeasure from "react-use-measure";

import useWindowDimensions from '../hooks/useWindowDimesions';

const BUTTONCOUNT = 16;

//Look for a way to get this instead of specifying here
//from styling.css
const BUTTONWIDTH = 300;
const BUTTONMARGIN = 10;
const DIVWIDTH = 1600;

const ButtonDrawer = () => {
    // For some reason useMeasure console logging works normally,
    // but using the result from useMeasure cause memory to skyrocket. (took me 2 hours to stop using this :( )
    // that's why i have to use the window width instead of the div width
    // const [ref, rect] = useMeasure();
    // useEffect(() => {
    //     setRowButtonCount(numOfButtonInRow(rect.width, buttonWidth, buttonMargin));
    // }, [rect.width])

    const [buttonChosen, setButtonChosen] = useState(-1);

    const changeStateButtonChose = (buttonIndex: number) => {
        console.log( "buttonIndex: " + buttonIndex + " buttonChosen: " + buttonChosen)
        if (buttonIndex === buttonChosen) setButtonChosen(-1);
        else setButtonChosen(buttonIndex);
    }

    const { width: windowWidth } = useWindowDimensions();

    const width = (windowWidth < DIVWIDTH) ? windowWidth : DIVWIDTH;

    const rowButtonCount = numOfButtonInRow(width, BUTTONWIDTH, BUTTONMARGIN);

    return (
        <>
            <div
                className="buttonDrawer"
            >
                <AllButtons
                    rowButtonCount={rowButtonCount}
                    setButtonChosen={changeStateButtonChose}
                    buttonChosen={buttonChosen}
                />
            </div>
        </>
    );
}

const numOfButtonInRow = (
    divWidth: number, buttonWidth: number, 
    margin: number) =>
{
    const buttonTotalWidth = buttonWidth + margin;
    //BUTTONWIDTH/2 is a magic number, which stops the buttons from prematurely stacking on top of each other.
    //there could possibly be a better option.
    const numbutton = Math.floor((divWidth - BUTTONWIDTH/2) / buttonTotalWidth) || 1
    return numbutton < 5 ? numbutton : 4;
}

interface AllButtonsProps {
    rowButtonCount: number,
    setButtonChosen: (buttonIndex: number) => void,
    buttonChosen: number,
}

//Revision if possible
const AllButtons = memo(({
    rowButtonCount,
    setButtonChosen,
    buttonChosen,
}: AllButtonsProps) => {
    const allButtons: React.JSX.Element[] = [];
    const numRows = BUTTONCOUNT/rowButtonCount;
    
    let buttonIndex = 0;
    for (let i = 0; i<numRows; ++i){
        const rowButtons: React.JSX.Element[] = [];
        
        let chosenButtonFlag = false;

        //add button to a row
        for(let j = 0; j<rowButtonCount; ++j){
            if (buttonIndex === buttonChosen) chosenButtonFlag = true;
            rowButtons.push(
                <Button 
                key={buttonInfo[buttonIndex].id}
                className="customButton"
                onClick={() => setButtonChosen(buttonIndex)}
                > 
                    <div >
                        {buttonInfo[buttonIndex].title}
                    </div>
                </Button>
            );
            ++buttonIndex;
            if (buttonIndex >= 16) {
                break;
            };
        }
        //Add to the whole thing of buttons.
        //If there is a button chosen, add the description
        allButtons.push(
            <>
                {rowButtons}
                <br/>
                {chosenButtonFlag && 
                <>
                    <h4
                    style={{
                        color: "red",
                        textAlign: "left",
                    }}>
                        {buttonInfo[buttonChosen].title}
                    </h4>
                    <p
                        style={{
                            textAlign: "left",
                        }}
                    >
                        {buttonInfo[buttonChosen].desc}
                    </p>
                </>
                }
                <br/>

            </>
        );
    }
    console.log(allButtons)
    return allButtons;
});

const buttonInfo = [...Array(16).keys()]
    .map((i) => {
        return {
            id: i,
            title: (i + " This is a really long title that should be truncated at some point in time hello ehllojef"),
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque id nibh tortor id. Pharetra magna ac placerat vestibulum. At augue eget arcu dictum. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Lectus arcu bibendum at varius vel pharetra vel turpis. Lobortis mattis aliquam faucibus purus in massa. Tempor id eu nisl nunc mi ipsum. Interdum varius sit amet mattis vulputate enim. Odio eu feugiat pretium nibh ipsum consequat nisl vel pretium. Posuere urna nec tincidunt praesent. Donec adipiscing tristique risus nec. Leo integer malesuada nunc vel risus commodo. Nunc pulvinar sapien et ligula ullamcorper. Porttitor rhoncus dolor purus non enim praesent elementum. Massa sed elementum tempus egestas sed sed risus. Risus feugiat in ante metus.Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Nisi est sit amet facilisis magna etiam tempor orci. Eget gravida cum sociis natoque penatibus et magnis dis parturient. At varius vel pharetra vel turpis. Gravida cum sociis natoque penatibus. Urna cursus eget nunc scelerisque. Ornare aenean euismod elementum nisi. Dignissim convallis aenean et tortor at risus viverra adipiscing. Arcu risus quis varius quam quisque id diam vel. Adipiscing elit ut aliquam purus sit. Neque egestas congue quisque egestas diam in."
        }
    });

export default ButtonDrawer;
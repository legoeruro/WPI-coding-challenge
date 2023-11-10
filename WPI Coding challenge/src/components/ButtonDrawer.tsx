import {
    Button
} from 'react-bootstrap';

import "../styling/styling.css"
import React from 'react';

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

type SetButtonFunction = (buttonIndex: number) => void;
//type SetterFunction = React.Dispatch<React.SetStateAction<number>>;

interface AllButtonsProps {
    rowButtonCount: number,
    setButtonChosen: SetButtonFunction,
    buttonChosen: number,
}

//Revision if possible
const AllButtons = memo(({
    rowButtonCount,
    setButtonChosen,
    buttonChosen,
}: AllButtonsProps) => {
    console.log("Button chosen:" + buttonChosen);
    const allButtons: React.JSX.Element[] = [];
    const numRows = BUTTONCOUNT/rowButtonCount;
    console.log("Number of rows: " + numRows)
    
    let buttonIndex = 0;
    //I wanted to use .map here but for loops was easier to read
    for (let i = 0; i<numRows; ++i){
        const rowButtons: React.JSX.Element[] = [];
        
        let chosenButtonFlag = false;

        //add button to a row
        for(let j = 0; j<rowButtonCount; ++j){
            if (buttonIndex === buttonChosen) chosenButtonFlag = true;
            const localButtonIndex = buttonIndex;
            rowButtons.push(
                <Button 
                key={buttonInfo[localButtonIndex].id}
                className={(localButtonIndex === buttonChosen) ? "cuustomButtonClicked" : "customButton"}
                onClick={() => setButtonChosen(localButtonIndex)}
                > 
                    <div >
                        {buttonInfo[localButtonIndex].title}
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
    return allButtons;
});

//Mock data
const buttonInfo = [...Array(16).keys()]
    .map((i) => {
        return {
            id: i,
            title: (i + " This is a really long title that should be truncated at some point in time hello ehllojef"),
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque id nibh tortor id. Pharetra magna ac placerat vestibulum. At augue eget arcu dictum. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Lectus arcu bibendum at varius vel pharetra vel turpis."
        }
    });

export default ButtonDrawer;
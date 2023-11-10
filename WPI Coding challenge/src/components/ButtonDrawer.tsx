import {
    Button
} from 'react-bootstrap';

import "../styling/styling.css"

const ButtonCount = 16;

//Look for a way to 

const ButtonDrawer = () => {
    console.log("haii");
    const nRowButtons = numOfButtonInRow(1000, 100, 10);
    return (
    <div
        className="buttonDrawer"
    >
        {
            [...Array().keys()]
        }
        {
            buttonInfo.map(
                (info) => {
                 return (
                 <Button 
                    key={info.id}
                    className="customButton"
                > 
                        <div >
                            {info.title}
                        </div>
                 </Button>
                 );
            })
        }
    </div>
    );
}

const buttonRow = () => {

}

const numOfButtonInRow = (
    divWidth: number, buttonWidth: number, 
    margin: number) =>
{
    const buttonTotalWidth = buttonWidth + 2*margin;
    return Math.floor(divWidth / buttonTotalWidth);
}

const RowButtons = () => {
    const rows = [];
    const numRows = ButtonCount/numOfButtonInRow();
    for (let i = 0; i<)
}

const buttonInfo = [...Array(16).keys()]
    .map((i) => {
        return {
            id: i,
            title: (i + " This is a really long title that should be truncated at some point in time hello ehllojef"),
            desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque id nibh tortor id. Pharetra magna ac placerat vestibulum. At augue eget arcu dictum. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Lectus arcu bibendum at varius vel pharetra vel turpis. Lobortis mattis aliquam faucibus purus in massa. Tempor id eu nisl nunc mi ipsum. Interdum varius sit amet mattis vulputate enim. Odio eu feugiat pretium nibh ipsum consequat nisl vel pretium. Posuere urna nec tincidunt praesent. Donec adipiscing tristique risus nec. Leo integer malesuada nunc vel risus commodo. Nunc pulvinar sapien et ligula ullamcorper. Porttitor rhoncus dolor purus non enim praesent elementum. Massa sed elementum tempus egestas sed sed risus. Risus feugiat in ante metus.Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Nisi est sit amet facilisis magna etiam tempor orci. Eget gravida cum sociis natoque penatibus et magnis dis parturient. At varius vel pharetra vel turpis. Gravida cum sociis natoque penatibus. Urna cursus eget nunc scelerisque. Ornare aenean euismod elementum nisi. Dignissim convallis aenean et tortor at risus viverra adipiscing. Arcu risus quis varius quam quisque id diam vel. Adipiscing elit ut aliquam purus sit. Neque egestas congue quisque egestas diam in."
        }
    });

export default ButtonDrawer;
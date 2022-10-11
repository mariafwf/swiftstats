import './Button.css';

const Button = ({name, background, color, fontFamily, onClick}) => {

    const onButtonClick = () => {
        if(onClick){
            onClick(name);
        }
    }

    const styleButton = {
        background: background,
        color: color,
        fontFamily: fontFamily,
    }

    return(
        <button className = {"home-btn"} onClick = {onButtonClick} style = {styleButton}>
            {name}
        </button>
    )
}

export default Button;
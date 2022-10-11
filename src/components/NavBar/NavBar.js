import './NavBar.css'
import Button from '../Button/Button';


const NavBar = () => {

    return(
        <div className = 'nav'>
            <Button name = 'Taylor Swift' background = '#00a3ad' color = '#fff' fontFamily = 'Satisfaction'></Button>
            <Button name = 'Fearless' background = '#744f2d' color = '#eccc8c' fontFamily = 'Germany Sans'></Button>
            <Button name = 'Speak Now' background = '#52316b' color = '#fff' fontFamily = 'Satisfaction'></Button>
            <Button name = 'Red' background = '#d4ac9c' color = '#94242c' fontFamily = 'Heading Pro'></Button>
            <Button name = '1989' background = '#d7d8ce' color = '#4d5266' fontFamily = 'Briannes hand'></Button>


        </div>
    )
}

export default NavBar;
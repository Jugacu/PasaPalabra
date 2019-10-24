import 'css/main.scss';
import CircleManager from './circles/CircleManager';


const circleWrapper = document.querySelector<HTMLElement>('#circle-wrapper');
const circleManager = new CircleManager(circleWrapper);


document.querySelector('#next').addEventListener('click', () => {
    circleManager.next();
});

document.querySelector('#play').addEventListener('click', () => {
    circleManager.init('http://localhost:3500/questionary/random');
    document.querySelector<HTMLElement>('#start').style.display = 'none';
});


circleManager.on('end', () => {
    document.querySelector<HTMLElement>('#start').style.display = 'initial';
});

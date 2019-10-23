import 'css/main.scss';
import CircleManager from './circles/CircleManager';


const circleWrapper = document.querySelector<HTMLElement>('#circle-wrapper');
const circleManager = new CircleManager(circleWrapper);

circleManager.generate();

setInterval(() => {
    circleManager.next();
}, 1000);

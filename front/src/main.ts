import 'css/main.scss';
import CircleManager from './circles/CircleManager';


const circleWrapper = document.querySelector<HTMLElement>('#circle-wrapper');
const circleManager = new CircleManager(circleWrapper);

circleManager.init();

document.querySelector('#next').addEventListener('click', () => {
   circleManager.next();
});

setInterval(() => circleManager.next(), 500);

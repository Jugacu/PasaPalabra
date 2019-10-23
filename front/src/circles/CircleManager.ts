import Questionary from '../types/Questionary';
import APIResponse from "../types/APIResponse";

export default class CircleManager {

    private circles: HTMLElement[] = [];
    private activeIndex = 0;
    private time = 0;

    private questionary: Questionary;

    public constructor(
        private readonly container: HTMLElement
    ) {

        if (!container) {
            throw new Error('Container must be an HTMLElement');
        }

    }

    public async init(): Promise<void> {

        const response = await fetch('http://localhost:3500/questionary/random');
        let json: APIResponse<Questionary>;

        try {
            json = await response.json();
            this.questionary = json.response;
        } catch (e) {
            throw new Error('Error while fetching the API');
        }

        console.log(this.questionary.questions)

        this.generate();
        this.initTimer();
        this.setActiveQuestion();
        this.initForm();
    }

    private initTimer(): void {
        this.time = this.questionary.timer;
        this.timer();
    }

    private timer(): void {
        const el = document.querySelector('#time');
        this.time--;
        el.innerHTML = `${this.time}`;

        if (this.time === 0) {
            return;
        }

        setTimeout(() => {
            this.timer();
        }, 1000);
    }

    private generate(): void {
        // CleanUp
        this.circles = [];
        this.container.innerHTML = '';
        this.activeIndex = 0;

        let spanishSet = false;

        for (let i = 65; i < 65 + 27; i++) {
            let letter = String.fromCharCode(spanishSet ? i - 1 : i);

            if (i === 79) {
                letter = 'Ñ';
                spanishSet = true;
            }

            const el = document.createElement('div');

            el.classList.add('circle', 'pending');
            el.innerText = letter;

            this.container.appendChild(el);
            this.circles.push(el);
        }

        this.circles[this.activeIndex].classList.add('active');

    }

    public getActiveLetter(): string {
        return this.circles[this.activeIndex].innerText;
    }

    private setActive(index: number) {
        if (index >= this.circles.length || index < 0) {
            return;
        }

        this.circles.forEach((el: HTMLElement) => {
            el.classList.remove('active');
        });

        this.circles[index].classList.add('active');


        const activeLetter = document.querySelector('#active-letter');
        activeLetter.innerHTML = this.circles[index].innerText;

        this.setActiveQuestion();
    }

    public next(): void {
        if (this.activeIndex === this.circles.length - 1) {
            this.activeIndex = -1;
        }

        for (let i = this.activeIndex + 1; i < this.circles.length; i++) {
            if (this.circles[i].classList.contains('pending')) {
                this.activeIndex = i;
                break;
            }
        }

        this.setActive(this.activeIndex);
    }

    public error(index: number): void {
        if (index >= this.circles.length || index < 0) {
            return;
        }

        const el = this.circles[index];
        el.classList.remove('pending', 'correct');
        el.classList.add('error');

        this.recalculateScore();
    }

    public correct(index: number): void {
        if (index >= this.circles.length || index < 0) {
            return;
        }

        const el = this.circles[index];
        el.classList.remove('pending', 'error');
        el.classList.add('correct');

        this.recalculateScore();
    }

    public activeCorrect() {
        this.correct(this.activeIndex);
    }

    public activeError() {
        this.error(this.activeIndex);
    }

    private recalculateScore(): void {
        let correct = 0;
        let incorrect = 0;
        this.circles.forEach((el: HTMLElement) => {
            if (el.classList.contains('correct')) {
                correct++;
            }

            if (el.classList.contains('error')) {
                incorrect++;
            }
        });

        document.querySelector('#correct').innerHTML = `${correct}`;
        document.querySelector('#incorrect').innerHTML = `${incorrect}`;
    }

    private setActiveQuestion() {
        const element = document.querySelector('#active-question');
        element.innerHTML = `${this.questionary.questions[this.activeIndex].question}`;
    }

    private initForm() {
        const element = document.querySelector('#awnser-form');
        element.addEventListener('submit', e => {
           e.preventDefault();


        });
    }
}

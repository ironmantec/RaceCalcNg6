import { Race } from './race';
import { Time } from './time';

export class Result {
    constructor() {
        this.initPace();
        this.initPlan();
        this.initGraded();
        this.initTreadmill();
    }

    pace: { race: Race, time: Time, perMile: string };
    plan: { race: Race, time: Time, splits: Array<object> };
    graded: { race: Race, time: Time, gender: string, age: number, scoredTime: string, scoredPct: number };
    treadmill: { speed: number, perMile: string };

    public initPace(): void {
        this.pace = {
            race: null,
            time: { hrs: null, min: null, sec: null },
            perMile: null
        };
    }

    public initPlan(): void {
        this.plan = {
            race: null,
            time: { hrs: null, min: null, sec: null },
            splits: null
        };
    }

    public initGraded(): void {
        this.graded = {
            race: null,
            time: { hrs: null, min: null, sec: null },
            gender: null,
            age: null,
            scoredTime: null,
            scoredPct: null
        };
    }

    public initTreadmill(): void {
        this.treadmill = {
            speed: null,
            perMile: null
        };
    }
}

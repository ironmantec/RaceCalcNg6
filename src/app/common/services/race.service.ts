import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {publishReplay, tap, refCount} from 'rxjs/operators';

import { Race } from '../model/race';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class RaceService  {
  result: Result;
  races: Observable<any>;

  constructor (private http: HttpClient) { }

  public getRaces(): Observable<any> {
    if (!this.races) {
     this.races = this.http.get<Race[]>('./assets/data/race-data.json')
                    .pipe(
                        tap(races => console.log('fetched races')),
                        publishReplay(1),
                        refCount()
                    );
    }
    return this.races;
  }

  public getResult(): Result {
    if (!this.result) {
      this.result = new Result();
    }
    return this.result;
  }

  public setPace(): void {
    const miles = this.result.pace.race ? this.result.pace.race.miles : 0;
    const time = this.result.pace.time;

    if (!miles || (!time.hrs && !time.min && !time.sec)) {
      return;
    }

    if (time.hrs === null) { time.hrs = 0; }
    if (time.min === null) { time.min = 0; }
    if (time.sec === null) { time.sec = 0; }

    const secs = ((time.hrs * 3600) + (time.min * 60) + time.sec) / miles;
    this.result.pace.perMile = this.getTimeFromSeconds(secs);
  }

  public setPlan(): void {
    const miles = this.result.plan.race ? this.result.plan.race.miles : 0;
    const time = this.result.plan.time;

    if (!miles || (!time.hrs && !time.min && !time.sec)) {
      return;
    }
    if (time.hrs === null) { time.hrs = 0; }
    if (time.min === null) { time.min = 0; }
    if (time.sec === null) { time.sec = 0; }


    const secs = ((time.min * 60) + time.sec);
    let i = 0;
    this.result.plan.splits = [];
    while (++i <= miles) {
      this.result.plan.splits.push({ mile: i, time: this.getTimeFromSeconds(i * secs) });
    }
    if (i - 1 < miles) {
      this.result.plan.splits.push({ mile: miles.toFixed(1), time: this.getTimeFromSeconds(miles * secs) });
    }
  }

  public setAgeGraded(): void {
    const time = this.result.graded.time;
    console.log('setAgeGraded', this.result.graded);
    if (!this.result.graded.race || !this.result.graded.gender || !this.result.graded.age) {
      return;
    }

    if (time.hrs === null) { time.hrs = 0; }
    if (time.min === null) { time.min = 0; }
    if (time.sec === null) { time.sec = 0; }

    let age = this.result.graded.age;
    if (age < 5) {
      age = 5;
    } else if (age > 100) {
      age = 100;
    }

    const col = age - 4;
    const secs = ((time.hrs * 3600) + (time.min * 60) + time.sec);
    const factor = this.result.graded.race[this.result.graded.gender + 'Graded'][col];
    const oc = this.result.graded.race[this.result.graded.gender + 'Graded'][0];

    // Calculate the age-graded race time in seconds
    const agSecs = factor * secs;
    this.result.graded.scoredTime = this.getTimeFromSeconds(agSecs);

    // Calculate percentile
    this.result.graded.scoredPct = ((oc / agSecs) * 1000) / 10;
  }

  public setTreadmill(): void {
    if (this.result.treadmill.speed) {
      const secs = 3600 / this.result.treadmill.speed;
      this.result.treadmill.perMile = this.getTimeFromSeconds(secs);
    }
  }

  private getTimeFromSeconds(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const min = Math.floor((seconds - (hrs * 3600)) / 60);
    const sec = Math.floor(seconds - (hrs * 3600) - (min * 60));
    if (hrs) {
      return ('00' + hrs).slice(-2) + ':' + ('00' + min).slice(-2) + ':' + ('00' + sec).slice(-2); // + ' hh:mm:ss';
    } else if (min) {
      return ('00' + min).slice(-2) + ':' + ('00' + sec).slice(-2); // + ' mm:ss';
    } else {
      return sec + ' seconds';
    }
  }
}

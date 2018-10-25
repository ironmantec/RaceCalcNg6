import { Component, Input, OnInit } from '@angular/core';
import { Time } from '../../model/time';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss']
})
export class TimeComponent {

  constructor() { }
  @Input() data: Time;
  @Input() skipHour: boolean;

  onUpdateMinutes() {
    if (isNaN(this.data.min)) {
      this.data.min = 0;
    } else if (this.data.min < 0) {
        this.data.min = 0;
        if (this.data.hrs) {
            this.data.hrs--;
            this.data.min = 59;
        }
    } else if (this.data.min > 59) {
        this.data.min = 0;
        if (this.data.hrs !== undefined) {
            this.data.hrs++;
        }
    }
  }

  onUpdateSeconds() {
    if (isNaN(this.data.sec)) {
      this.data.sec = 0;
    } else if (this.data.sec < 0) {
        this.data.sec = 0;
        if (this.data.min || this.data.hrs) {
            this.data.min--;
            this.data.sec = 59;
            this.onUpdateMinutes();
        }

    } else if (this.data.sec > 59) {
        this.data.sec = 0;
        if (this.data.min !== undefined) {
            this.data.min++;
            this.onUpdateMinutes();
        }
    }
  }
}

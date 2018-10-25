import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../common/services/race.service';
import { Result } from '../../common/model/result';

@Component({
  selector: 'app-treadmill',
  templateUrl: './treadmill.component.html',
  styleUrls: ['./treadmill.component.scss']
})
export class TreadmillComponent implements OnInit {
  result: Result;

  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.result = this.raceService.getResult();
  }

  onUpdate() {
    this.raceService.setTreadmill();
  }

  clear() {
    this.result.initTreadmill();
  }
}

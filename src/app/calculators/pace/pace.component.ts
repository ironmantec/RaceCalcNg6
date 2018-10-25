import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../common/services/race.service';
import { Result } from '../../common/model/result';

@Component({
  selector: 'app-pace',
  templateUrl: './pace.component.html',
  styleUrls: ['./pace.component.scss']
})
export class PaceComponent implements OnInit {
  races;
  result: Result;

  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.getRaces();
    this.result = this.raceService.getResult();
  }

  onUpdate() {
    this.raceService.setPace();
  }

  clear() {
    this.result.initPace();
  }

  getRaces() {
    this.raceService.getRaces().subscribe(races => this.races = races);
  }
}

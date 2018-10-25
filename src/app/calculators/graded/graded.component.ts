import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../common/services/race.service';
import { Race } from '../../common/model/race';
import { Result } from '../../common/model/result';

@Component({
  selector: 'app-graded',
  templateUrl: './graded.component.html',
  styleUrls: ['./graded.component.scss']
})
export class GradedComponent implements OnInit {
  races: Race[];
  result: Result;

  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.getRaces();
    this.result = this.raceService.getResult();
  }

  onUpdate() {
    this.raceService.setAgeGraded();
  }

  clear() {
    this.result.initGraded();
  }

  getRaces(): void {
    this.raceService.getRaces().subscribe(races => this.races = races);
  }
}

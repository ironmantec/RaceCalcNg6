import { Component, OnInit } from '@angular/core';
import { RaceService } from '../../common/services/race.service';
import { Race } from '../../common/model/race';
import { Result } from '../../common/model/result';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  races: Race[];
  result: Result;

  constructor(private raceService: RaceService) { }

  ngOnInit() {
    this.getRaces();
    this.result = this.raceService.getResult();
  }

  onUpdate() {
    this.raceService.setPlan();
  }

  clear() {
    this.result.initPlan();
  }

  getRaces(): void {
    this.raceService.getRaces().subscribe(races => this.races = races);
  }
}

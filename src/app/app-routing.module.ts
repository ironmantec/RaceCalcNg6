import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PaceComponent } from './calculators/pace/pace.component';
import { PlanComponent } from './calculators/plan/plan.component';
import { GradedComponent } from './calculators/graded/graded.component';
import { TreadmillComponent } from './calculators/treadmill/treadmill.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pace', component: PaceComponent },
  { path: 'plan', component: PlanComponent },
  { path: 'graded', component: GradedComponent },
  { path: 'treadmill', component: TreadmillComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

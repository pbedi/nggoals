import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  private goals = new BehaviorSubject<any>([{id:1,goal:'The initial goal'},{id:2,goal:'My first life goal'}, {id:3,goal:'I want to climb a mountain'}, {id:4,goal:'Go ice skiing'}]);
  goal = this.goals.asObservable();

  constructor() { }

  changeGoal(goal) {
    this.goals.next(goal)
  }

}

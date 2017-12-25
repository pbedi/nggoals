import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Goal } from '../services/goal.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals', [
      transition('* => *', [
        
                query(':enter', style({ opacity: 0 }), {optional: true}),
        
                query(':enter', stagger('300ms', [
                  animate('.6s ease-in', keyframes([
                    style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
                    style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
                    style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
                  ]))]), {optional: true}),
                  query(':leave', stagger('300ms', [
                    animate('.6s ease-in', keyframes([
                      style({opacity: 1, transform: 'translateY(0)', offset: 0}),
                      style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
                      style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
                    ]))]), {optional: true})
                ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  itemCount: number = 4;
  btnText: string = 'Add an Item';    // Add this line
  placeholderTxt: string = 'Life goal...';
  goalText: string = 'My first life goal';    // Add this
  goals:Goal[];
  
  constructor(private _data: DataService) { 

  }

  ngOnInit() {
    this._data.goal.subscribe(res => {
      this.goals = res;
    });
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  addItem() {
    let no:number = this.goals.length + 1;
    this.goals.push({id:no,goal:this.goalText});
    this.goalText = '';
    this.itemCount = this.goals.length;
  }
  removeItem(i) {
    this.goals.splice(i,1);
    //re-number the array items
    let n:number = 1;
    this.goals.forEach(element => {
      element.id = n;
      n++;
    });
  }
}

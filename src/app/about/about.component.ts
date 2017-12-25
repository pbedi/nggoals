import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Goal } from '../services/goal.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  itemId:number;
  goals:Goal[];

  constructor(private route: ActivatedRoute, private router: Router, private _data: DataService) { 
    this.route.params.subscribe(res =>{
      //console.log(res.id);
      this.itemId = res.id;
    } );
  }

  ngOnInit() {
    this._data.goal.subscribe(res => {
      this.goals = res;
    });
  }

  sendMeHome() {
    this.router.navigate(['']);
  }

}

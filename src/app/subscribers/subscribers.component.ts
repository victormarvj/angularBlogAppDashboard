import { Component, OnInit } from '@angular/core';
import { SubscribersService } from '../services/subscribers.service';
import { ISubscribers } from '../models/subscribers';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  subscribersArray: ISubscribers<any>[] = [];

  constructor( private subService: SubscribersService ) {}

  ngOnInit(): void {
      this.subService.loadData().subscribe(val => {
        this.subscribersArray = val;
      })
  }


  onDelete(id: string) {
    this.subService.deleteData(id);
  }

}

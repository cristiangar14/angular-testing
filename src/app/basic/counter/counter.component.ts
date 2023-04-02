import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {
  counter:number = 10;


  increaseBy(value: number){
    this.counter += value;

    //TODO:
    // console.log({newValue: this.counter})
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todos';
  delTaskId: number;

  receivedTask($event){
    this.delTaskId = $event;
    console.log($event);
  }
}

import { Component, OnInit } from '@angular/core';
import { AdminService } from './services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private service: AdminService){}

  ngOnInit(): void {
    this.service.autoAuthUser(); 
  }
  title = 'clientside';
}

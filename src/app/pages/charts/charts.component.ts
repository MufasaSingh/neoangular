import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void { alert("ngOnInit"); }

  ngOnChanges(): void {alert("ngOnChanges");}
  ngDoCheck(): void {alert("ngDoCheck");}
  ngAfterContentInit(): void {alert("ngAfterContentInit");}
  ngAfterContentChecked(): void {alert("ngAfterContentChecked");}
  ngAfterViewInit(): void {alert("ngAfterViewInit");}
  ngAfterViewChecked(): void {alert("ngAfterViewChecked");}
  ngonDestroy(): void {alert("ngonDestroy");}
}

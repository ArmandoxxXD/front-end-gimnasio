import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('card') destino!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    
  }

  irCard(): void{
    this.destino.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('card') destino!: ElementRef;

  constructor() {

    document.addEventListener("DOMContentLoaded", function() {
      // Obtén una referencia al elemento de video
      var video = document.getElementById("Header_video") as HTMLVideoElement;
      
      // Escucha el evento "loadedmetadata" que se dispara cuando el video está cargado
      video.addEventListener("loadedmetadata", function() {
        // Una vez que el video esté cargado, reproducirlo
        video.muted = true;
        video.play();
      });
    });

  }

  

  ngOnInit(): void {
    
  }

  irCard(): void{
    this.destino.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}

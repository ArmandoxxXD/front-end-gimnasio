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

    document.addEventListener('DOMContentLoaded', () => {
      const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('fade_top');
            entrada.target.classList.remove('opacity-0');
            observador.unobserve(entrada.target); // Opcional: deja de observar una vez visible
          }
        });
      }, {
        rootMargin: '0px',
        threshold: 0.05 // Ajusta según necesidad, porcentaje de visibilidad para activar
      });
    
      const elementos = document.querySelectorAll('.home__Body_animation');
      elementos.forEach((el) => {
        observador.observe(el);
      });
    });

    document.addEventListener('DOMContentLoaded', () => {
      const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('shake');
            entrada.target.classList.remove('opacity-0');
            observador.unobserve(entrada.target); // Opcional: deja de observar una vez visible
          }
        });
      }, {
        rootMargin: '0px',
        threshold: 0.05 // Ajusta según necesidad, porcentaje de visibilidad para activar
      });
    
      const elementos = document.querySelectorAll('.btn_animation');
      elementos.forEach((el) => {
        observador.observe(el);
      });
    });

  }

  

  ngOnInit(): void {

  }

  irCard(): void{
    this.destino.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  
}

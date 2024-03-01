import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BuscadorService } from './service/buscador.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit  {
  title = 'Client';
  constructor(private router: Router, private buscadorService: BuscadorService) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.applyHighlightAndScroll();
    });
  }
  
  private applyHighlightAndScroll(): void {
    setTimeout(() => {
      const highlightedWord = this.buscadorService.getHighlightedWord();
      if (highlightedWord) {
        // Aquí es donde aplicarías el resaltado y el scroll
        // Necesitas seleccionar el elemento contenedor del texto donde deseas aplicar el resaltado.
        const container = document.querySelector('.content'); // Asegúrate de que '.content' seleccione el contenedor correcto
        if (container) {
          this.buscadorService.highlight(container as HTMLElement);
        }
      }
    });
  }
}


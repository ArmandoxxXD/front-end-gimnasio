import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuscadorService } from 'src/app/service/buscador.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [ // void => *
        style({ opacity: 0, visibility: 'hidden' }),
        animate('0.5s', style({ opacity: 1, visibility: 'visible' })),
      ]),
      transition(':leave', [ // * => void
        animate('0.5s', style({ opacity: 0, visibility: 'hidden' })),
      ]),
    ]),
  ],
})
export class SearchComponent implements OnInit {
  searchText: string = "";
  searchResults: { label: string, path: string, text:string }[] = [];
  highlightedWord: string = "";
  constructor(
    private router: Router,
    private searchService: BuscadorService
  ) { }

  ngOnInit(): void {
  }


  search(): void {
    if (this.searchText?.length >= 4) {
      this.searchService.search(this.searchText).subscribe(results => {
        this.searchResults = results.map(item => ({
          label: item.Label,
          path: item.path,
          text: item.data.find((word: string) => word.toLowerCase().includes(this.searchText.toLowerCase()))
        }));
      });
    } else {
      this.searchResults = [];
      this.searchService.setHighlightedWord('');
      const contentElement = document.querySelector('.content');
        if (contentElement) {
          this.searchService.clearHighlights(contentElement as HTMLElement);
        }
    }
  }

  onResultClick(result: { label: string, path: string, text: string }): void {
    this.searchService.setHighlightedWord(this.searchText);
    this.router.navigateByUrl(result.path).then(() => {
      // Espera a que la navegación se complete antes de aplicar el resaltado y el scroll
      setTimeout(() => {
        const contentElement = document.querySelector('.content'); // Asegúrate de que este selector seleccione el contenedor correcto en tu componente de destino
        if (contentElement) {
          this.searchService.highlight(contentElement as HTMLElement);
        }
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { BuscadorService } from 'src/app/service/buscador.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
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

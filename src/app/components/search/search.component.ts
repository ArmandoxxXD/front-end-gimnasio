import { Component, OnInit } from '@angular/core';
import { BuscadorService } from 'src/app/service/buscador.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchText: string = "";
  searchResults: { label: string, path: string, text:String }[] = [];
  constructor(
    private searchService: BuscadorService
  ) { }

  ngOnInit(): void {
  }


  search(): void {
    if (this.searchText?.length >= 4) {
      this.searchService.search(this.searchText).subscribe(results => {
        this.searchResults = results.map(item => ({ label: item.Label, path: item.path, text: item.data.find((word: string) => word.toLowerCase().includes(this.searchText.toLowerCase())) }));
      });
    } else {
      this.searchResults = [];
    }
  }
}

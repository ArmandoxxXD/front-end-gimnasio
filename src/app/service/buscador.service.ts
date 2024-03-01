import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {
  private searchUrl = 'assets/json/textos_por_modulo.json'; 
  private highlightedWord: string = "";
  constructor(
    private http: HttpClient
  ) { }

  search(text: string): Observable<any[]> {
    return this.http.get<any[]>(this.searchUrl).pipe(
      map(data => {
        const searchText = text.toLowerCase();
        return data.filter(item => item.data.some((word: string) => word.toLowerCase().includes(searchText)));
      })
    );
  }

  setHighlightedWord(word: string): void {
    this.highlightedWord = word;
  }

  getHighlightedWord(): string {
    return this.highlightedWord;
  }

  highlight(element: HTMLElement): void {
    if (!this.highlightedWord) return;

    const nodes = element.childNodes;
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue) {
        const text = node.nodeValue;
        const regex = new RegExp(`(${this.highlightedWord})`, 'gi');
        if (regex.test(text)) { // Verificar si el texto contiene la palabra resaltada
          const replacedText = text.replace(regex, `<span class="highlighted">$1</span>`);
          const span = document.createElement('span');
          span.innerHTML = replacedText;
          node.parentNode?.replaceChild(span, node); // Verificar si parentNode no es null antes de llamar a replaceChild
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        this.highlight(node as HTMLElement); // Llamada recursiva para elementos
      }
    });

    // Encontrar el primer elemento resaltado y hacer scroll hasta él
    const firstHighlighted = element.querySelector('.highlighted');
    firstHighlighted?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  
  clearHighlights(element: HTMLElement): void {
    const highlightedElements = element.querySelectorAll('.highlighted');
    highlightedElements.forEach(highlightedElement => {
      const parent = highlightedElement.parentNode;
      if (parent && highlightedElement.textContent !== null) {
        const textNode = document.createTextNode(highlightedElement.textContent);
        parent.replaceChild(textNode, highlightedElement);
        parent.normalize();
      }
    });
  }
}

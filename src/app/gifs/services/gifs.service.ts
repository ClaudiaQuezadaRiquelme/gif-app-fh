import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'fpBLP0AcrZUrTX7aczQWnaWPrRFic8TF';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(
    private http: HttpClient
  ) {
    // if (localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')! );
    // }
    this._historial = JSON.parse(localStorage.getItem('historial')! ) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')! )|| [];
  }

  buscarGifs( query: string = '' ) {
    query = query.trim().toLocaleLowerCase();
    if ( !this._historial.includes(query) ) { // si el elemento ya está en el historial, no hay que volver a incluirlo
      this._historial.unshift( query ); // inserto elemento en historial
      this._historial = this._historial.splice(0,10); // acoto el historial en 10 elementos
      console.log('buscarGifs', this._historial);
      localStorage.setItem('historial', JSON.stringify(this._historial) );
    }
    
    // así lo haríamos con JS puro 
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=fpBLP0AcrZUrTX7aczQWnaWPrRFic8TF&q=dragon%20ball%20z&limit=10')
    // .then( resp => {
    //   resp.json().then( data => console.log('fetch data', data) )
    // })

    // con http y subscripe realizamos la misma consulta
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=fpBLP0AcrZUrTX7aczQWnaWPrRFic8TF&q=${ query }&limit=10`)
    .subscribe( ( resp ) => {
      console.log('http resp', resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados) );
    });
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // private _apiKey: string = 'fpBLP0AcrZUrTX7aczQWnaWPrRFic8TF';
  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs( query: string = '' ) {
    query = query.trim().toLocaleLowerCase();
    if ( this._historial.includes(query) ) return; // si el elemento ya está en el historial, no hay que volver a incluirlo
    this._historial.unshift( query ); // inserto elemento en historial
    this._historial = this._historial.splice(0,10); // acoto el historial en 10 elementos
    console.log('buscarGifs', this._historial);
    
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=fpBLP0AcrZUrTX7aczQWnaWPrRFic8TF&q=dragon%20ball%20z&limit=10')
    // .then( resp => {
    //   resp.json().then( data => console.log('fetch data', data) )
    // })
  }

}

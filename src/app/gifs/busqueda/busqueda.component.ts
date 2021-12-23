import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  @ViewChild('txtBuscar')
  txtBuscar!: ElementRef<HTMLInputElement>; // NOT NULL ASSERTION OPERATOR

  constructor(
    private gifsService: GifsService
  ) { }

  ngOnInit(): void {
  }

  buscar() {
    console.log('buscar', this.txtBuscar);
    const valor = this.txtBuscar.nativeElement.value;

    if (valor.trim().length === 0) return; // validar si el elemento no viene vacío
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value = '';
  }
}

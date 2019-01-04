import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent  {

  listaDatos: string[] = ['dato a', 'dato b', 'dato c'];
  habilitar: boolean = true;
  constructor() { }

  setHabilitar(): void{
    this.habilitar = (this.habilitar==true)? false: true;
  }

}

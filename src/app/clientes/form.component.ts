import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente: Cliente = new Cliente();
  regiones: Region[];
  private titulo: string = "Crear cliente";

  private errores: string[];

  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
      }
    });
    
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);

  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal('Cliente guardado', `El cliente ${cliente.nombre} se registro con exito!`, 'success')
      }, err => {
        this.errores = err.error.errors as string[];
      }
    )
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        swal('Cliente guardado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
      }, err => {
        this.errores = err.error.errors as string[];
      }
    )
  }

  compararRegion(c1:Region, c2:Region): boolean{
    //return c1 && c2 ? c1.id === c2.id : c1 === c2;
    
    if (c1 === undefined && c2 === undefined){
      return true;
    }

    return c1 === null || c2 === null || c1 === undefined || c2 === undefined ? false: c1.id === c2.id;
  }
}

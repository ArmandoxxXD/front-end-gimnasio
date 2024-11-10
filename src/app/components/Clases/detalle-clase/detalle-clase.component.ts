import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/service/cliente.service';
import { ClaseService } from 'src/app/service/clase.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detalle-clase',
  templateUrl: './detalle-clase.component.html',
  styleUrls: ['./detalle-clase.component.css'],
})
export class DetalleClaseComponent implements OnInit {
  listClases: any;
  listClientes: any;

  constructor(
    private claseService: ClaseService,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
  ) {
    document.body.style.height = '100vh';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.obtenerClases(params.id);
    });
  }

  obtenerClases(id: any) {
    this.claseService.detail(id).subscribe(
      (data) => {
        console.log(data);
        this.listClases = data;
        this.listaClientes();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  listaClientes(): void {
    this.clienteService
      .listByNombreClase(this.listClases.nombreClase)
      .subscribe(
        (data) => {
          this.listClientes = data;
          console.log('Clientes:');
          console.log(this.listClientes);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}

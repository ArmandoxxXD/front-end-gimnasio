import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EditProveedor, Proveedor } from 'src/app/models/proveedor';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { TokenService } from 'src/app/service/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent implements OnInit {
  isAdmin: boolean=false;
  id!:number;
  proveedor!:Proveedor;
  previewUrl: any = null;
  isPhotoDeleted: boolean = false;
  originalProvedorData!: EditProveedor;

  constructor(
    private proveedorService:ProveedorService,
    private toast:ToastrService, 
    private token:TokenService,
    private router:Router, 
    private activateRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.isAdmin = this.token.isAdmin();
    this.getProvedor();
  }

  onUpdate():void{
    const dto=new EditProveedor(this.proveedor.nombreProvedor,this.proveedor.telefono,this.proveedor.email,this.proveedor.logo,this.proveedor.pais,this.proveedor.estado,this.proveedor.municipio,this.proveedor.calle, this.isPhotoDeleted);
    Swal.fire({
      title: 'Loading...',
      allowOutsideClick: false,
      position: 'top',
      didOpen: () => {
        Swal.showLoading(); // Muestra el spinner de SweetAlert2
      },
    });
    this.proveedorService.update(this.id,dto).subscribe(
      data=>{
        Swal.close();
        this.toast.success(data.mensaje,'OK',{timeOut:3000});
        this.router.navigate(['/proveedor/lista'])
      },
      err=>{
        Swal.close();
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    );
  }

  getProvedor(){
    this.id= this.activateRoute.snapshot.params['id'];
    this.proveedorService.detail(this.id).subscribe(
      data=>{
        this.proveedor=data;
        this.originalProvedorData =JSON.parse(JSON.stringify(data));
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
        this.router.navigate(['/proveedor/lista'])
      }
    );
  }

  hasChanges(): boolean {
    return JSON.stringify(this.originalProvedorData) !== JSON.stringify(this.proveedor);
  }

  onFileChange(event: any): void {
    console.log(this.hasChanges())
    if (event.target.files.length > 0) {
      this.proveedor.logo = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
  
      reader.readAsDataURL(this.proveedor.logo);
    }
  }

  cancelNewImage(): void {
    this.previewUrl = null;
    if (!this.isPhotoDeleted) {
      this.proveedor.logo = this.originalProvedorData.logo;
    }
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    fileInput.value = "";
  }
  
  deleteImage(): void {
    this.isPhotoDeleted = true;
    this.proveedor.logo =  new File([], "");
    this.previewUrl = null;
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    fileInput.value = "";
  }
}

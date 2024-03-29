import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clase, EditClase } from 'src/app/models/clase';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/service/auth.service';
import { ClaseService } from 'src/app/service/clase.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-editar-clases',
  templateUrl: './editar-clases.component.html',
  styleUrls: ['./editar-clases.component.css']
})
export class EditarClasesComponent implements OnInit {

  isAdmin: boolean=false;
  clase!:Clase;
  id!:number;
  instructores:User[]=[];
  previewUrl: any = null;
  isPhotoDeleted: boolean = false;
  originalClassData!: Clase;
  constructor(
    private claseService:ClaseService,
    private empleadoService:AuthService,
    private toast:ToastrService, 
    private token:TokenService,
    private router:Router, 
    private activateRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.token.isAdmin();
    this.getClases();
    this.getInstructores();
  }

  onUpdate():void{
    const dto=new EditClase(this.clase.nombreClase,this.clase.descripcion,this.clase.costo,this.clase.nombreInstructor,this.clase.fecha,this.clase.hora,this.clase.cupo,this.clase.fotoClase,this.isPhotoDeleted);
    this.claseService.update(this.id,dto).subscribe(
      data=>{
        this.toast.success(data.mensaje,'OK',{timeOut:3000});
        this.router.navigate(['/clase/lista'])
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    );
  }


  getInstructores():void{
    this.empleadoService.listByRol("ROLE_INSTRUCTOR").subscribe(
      data=>{
        this.instructores=data;
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
      }
    )
  }

  getClases(){
    this.id= this.activateRoute.snapshot.params['id'];
    this.claseService.detail(this.id).subscribe(
      data=>{
        this.clase=data;
        this.originalClassData = JSON.parse(JSON.stringify(data));
      },
      err=>{
        this.toast.error(err.error.mensaje,'Error',{timeOut:3000});
        this.router.navigate(['/clase/lista'])
      }
    );
  }

  hasChanges(): boolean {
    return JSON.stringify(this.originalClassData) !== JSON.stringify(this.clase);
  }

  
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.clase.fotoClase = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
  
      reader.readAsDataURL(this.clase.fotoClase);
    }
  }

  cancelNewImage(): void {
    this.previewUrl = null;
    if (!this.isPhotoDeleted) {
      this.clase.fotoClase = this.originalClassData.fotoClase;
    }
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    fileInput.value = "";
  }
  
  deleteImage(): void {
    this.isPhotoDeleted = true;
    this.clase.fotoClase =  new File([], "");
    this.previewUrl = null;
    const fileInput = document.getElementById('foto') as HTMLInputElement;
    fileInput.value = "";
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmpleadoComponent } from './components/Auth/edit-empleado/edit-empleado.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { VerEmpleadoComponent } from './components/Auth/ver-empleado/ver-empleado.component';
import { CheckInComponent } from './components/CheckIn/check-in/check-in.component';
import { ControlCheckInComponent } from './components/CheckIn/control-check-in/control-check-in.component';
import { EmpleadoCheckInComponent } from './components/CheckIn/empleado-check-in/empleado-check-in.component';
import { EditarClienteComponent } from './components/Clientes/editar-cliente/editar-cliente.component';
import { NuevoClienteComponent } from './components/Clientes/nuevo-cliente/nuevo-cliente.component';
import { VerClienteComponent } from './components/Clientes/ver-cliente/ver-cliente.component';
import { HomeComponent } from './components/home/home.component';
import { EditarProductoComponent } from './components/Productos/editar-producto/editar-producto.component';
import { NuevoProductoComponent } from './components/Productos/nuevo-producto/nuevo-producto.component';
import { VerProductoComponent } from './components/Productos/ver-producto/ver-producto.component';
import { DetalleProveedorComponent } from './components/Proveedores/detalle-proveedor/detalle-proveedor.component';
import { EditarProveedorComponent } from './components/Proveedores/editar-proveedor/editar-proveedor.component';
import { NuevoProveedorComponent } from './components/Proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { VerProveedoresComponent } from './components/Proveedores/ver-proveedores/ver-proveedores.component';
import { ClientesGuard } from './guards/clientes.guard';
import { HomeGuard } from './guards/home.guard';
import { LoginGuard } from './guards/login.guard';
import { NuevaVentaComponent } from './components/nueva-venta/nueva-venta.component';
import { ListaVentasComponent } from './components/lista-ventas/lista-ventas.component';
import { CortesComponent } from './components/cortes/cortes.component';
import { VerClasesComponent } from './components/Clases/ver-clases/ver-clases.component';
import { NuevaClaseComponent } from './components/Clases/nueva-clase/nueva-clase.component';
import { EditarClasesComponent } from './components/Clases/editar-clases/editar-clases.component';
import { DetalleClaseComponent } from './components/Clases/detalle-clase/detalle-clase.component';
import { ErrorComponent } from './components/error/error.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent},

  //Cliente
  {
    path: 'cliente/lista',
    component: VerClienteComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin', 'user', 'instructor', 'mantenimiento'] },
  },
  {
    path: 'cliente/nuevo',
    component: NuevoClienteComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin'] },
  },
  {
    path: 'cliente/editar/:id',
    component: EditarClienteComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin'] },
  },

  //Clases
  {
    path: 'clase/lista',
    component: VerClasesComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: {
      expectedRoles: [
        'admin',
        'user',
        'instructor',
        'mantenimiento',
        'recepcionista',
      ],
    },
  },
  {
    path: 'clase/detalle/:id',
    component: DetalleClaseComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: {
      expectedRoles: [
        'admin',
        'user',
        'instructor',
        'mantenimiento',
        'recepcionista',
      ],
    },
  },
  {
    path: 'clase/nuevo',
    component: NuevaClaseComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin'] },
  },
  {
    path: 'clase/editar/:id',
    component: EditarClasesComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin'] },
  },

  //proveedor
  {
    path: 'proveedor/lista',
    component: VerProveedoresComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: {
      expectedRoles: [
        'admin',
        'user',
        'instructor',
        'mantenimiento',
        'recepcionista',
      ],
    },
  },
  {
    path: 'proveedor/lista/:id/:nombreProvedor',
    component: DetalleProveedorComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: {
      expectedRoles: [
        'admin',
        'user',
        'instructor',
        'mantenimiento',
        'recepcionista',
      ],
    },
  },
  {
    path: 'proveedor/nuevo',
    component: NuevoProveedorComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin'] },
  },
  {
    path: 'proveedor/editar/:id',
    component: EditarProveedorComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin'] },
  },

  //Producto
  {
    path: 'producto/lista',
    component: VerProductoComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: {
      expectedRoles: [
        'admin',
        'user',
        'instructor',
        'mantenimiento',
        'recepcionista',
      ],
    },
  },
  {
    path: 'poducto/lista/:nombreProvedor',
    component: VerProductoComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: {
      expectedRoles: [
        'admin',
        'user',
        'instructor',
        'mantenimiento',
        'recepcionista',
      ],
    },
  },
  {
    path: 'producto/nuevo',
    component: NuevoProductoComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin'] },
  },
  {
    path: 'producto/editar/:id',
    component: EditarProductoComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin'] },
  },

  //Empleados
  {
    path: 'empelado/lista',
    component: VerEmpleadoComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: {
      expectedRoles: [
        'admin',
        'user',
        'instructor',
        'mantenimiento',
        'recepcionista',
      ],
    },
  },
  {
    path: 'empelado/editar/:id',
    component: EditEmpleadoComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin'] },
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ClientesGuard],
    data: { expectedRoles: ['admin'] },
  },

  //CheckIn
  {
    path: 'chekcIn',
    component: CheckInComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: {
      expectedRoles: [
        'admin',
        'user',
        'instructor',
        'mantenimiento',
        'recepcionista',
      ],
    },
  },
  {
    path: 'control-checkIn',
    component: ControlCheckInComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: {
      expectedRoles: [
        'admin',
        'user',
        'instructor',
        'mantenimiento',
        'recepcionista',
      ],
    },
  },
  {
    path: 'checkIn-empleado/:id',
    component: EmpleadoCheckInComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: {
      expectedRoles: [
        'admin',
        'user',
        'instructor',
        'mantenimiento',
        'recepcionista',
      ],
    },
  },

  //Venta
  {
    path: 'nuevaVenta',
    component: NuevaVentaComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin'] },
  },
  {
    path: 'listaVentas',
    component: ListaVentasComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin'] },
  },
  {
    path: 'cortes',
    component: CortesComponent,
    canActivate: [ClientesGuard, HomeGuard],
    data: { expectedRoles: ['admin'] },
  },

  { path: 'error', component: ErrorComponent },

  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

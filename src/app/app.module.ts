import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VerClienteComponent } from './components/Clientes/ver-cliente/ver-cliente.component';
import { NuevoClienteComponent } from './components/Clientes/nuevo-cliente/nuevo-cliente.component';
import { EditarClienteComponent } from './components/Clientes/editar-cliente/editar-cliente.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { ClientesInterceptor } from './interceptors/clientes.interceptor';
import { VerProveedoresComponent } from './components/Proveedores/ver-proveedores/ver-proveedores.component';
import { NuevoProveedorComponent } from './components/Proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { DetalleProveedorComponent } from './components/Proveedores/detalle-proveedor/detalle-proveedor.component';
import { EditarProveedorComponent } from './components/Proveedores/editar-proveedor/editar-proveedor.component';
import { VerProductoComponent } from './components/Productos/ver-producto/ver-producto.component';
import { NuevoProductoComponent } from './components/Productos/nuevo-producto/nuevo-producto.component';
import { EditarProductoComponent } from './components/Productos/editar-producto/editar-producto.component';
//Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { FilterProvedorPipe } from './pipes/filter-provedor.pipe';
//external
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { VerEmpleadoComponent } from './components/Auth/ver-empleado/ver-empleado.component';
import { EditEmpleadoComponent } from './components/Auth/edit-empleado/edit-empleado.component';
import { EmpleadoCheckInComponent } from './components/CheckIn/empleado-check-in/empleado-check-in.component';
import { CheckInComponent } from './components/CheckIn/check-in/check-in.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NuevaVentaComponent } from './components/nueva-venta/nueva-venta.component';
import { ListaVentasComponent } from './components/lista-ventas/lista-ventas.component';
import { CortesComponent } from './components/cortes/cortes.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { FilterClientePipe } from './pipes/filter-cliente.pipe';
import { VerClasesComponent } from './components/Clases/ver-clases/ver-clases.component';
import { EditarClasesComponent } from './components/Clases/editar-clases/editar-clases.component';
import { NuevaClaseComponent } from './components/Clases/nueva-clase/nueva-clase.component';
import { FilterClasePipe } from './pipes/filter-clase.pipe';
import { DetalleClaseComponent } from './components/Clases/detalle-clase/detalle-clase.component';
import { FilterEmployeesPipe } from './pipes/filter-employees.pipe';
import { RecaptchaModule } from 'ng-recaptcha';
import { ErrorComponent } from './components/error/error.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { SearchComponent } from './components/search/search.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { OrganizationChartModule } from 'primeng/organizationchart';
import { DialogModule } from 'primeng/dialog';
import { PrivacyPoliciesComponent } from './components/privacy-policies/privacy-policies.component';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VerClienteComponent,
    NuevoClienteComponent,
    EditarClienteComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    VerProveedoresComponent,
    NuevoProveedorComponent,
    DetalleProveedorComponent,
    EditarProveedorComponent,
    VerProductoComponent,
    NuevoProductoComponent,
    EditarProductoComponent,
    FilterPipe,
    FilterProvedorPipe,
    VerEmpleadoComponent,
    EditEmpleadoComponent,
    EmpleadoCheckInComponent,
    CheckInComponent,
    NuevaVentaComponent,
    ListaVentasComponent,
    CortesComponent,
    FilterClientePipe,
    VerClasesComponent,
    EditarClasesComponent,
    NuevaClaseComponent,
    FilterClasePipe,
    DetalleClaseComponent,
    FilterEmployeesPipe,
    ErrorComponent,
    SearchComponent,
    AboutUsComponent,
    PrivacyPoliciesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPayPalModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added, Alertas de exepciones
    SweetAlert2Module.forRoot(), //Alertas de confirmacion
    HttpClientModule,
    FormsModule,
    ZXingScannerModule,
    RecaptchaModule,
    OrganizationChartModule,
    DialogModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ClientesInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

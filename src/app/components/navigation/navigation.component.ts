import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { TreeNode } from 'primeng/api';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isLogged: boolean = false;
  isAdmin: boolean = false;
  isInstructor: boolean = false;
  isRecepcionista: boolean = false;
  isUser: boolean = false;
  userName: string = '';
  displayModal: boolean = false;
  data: TreeNode[]; 
  selectedNode?: TreeNode;

  constructor(
     private token: TokenService,
     private router: Router,
     ) {
      this.data = [{
        label: 'Home',
        data: {route: '/home', icon: 'fas fa-home'},
        expanded: true,
        children: [
          {
            label: 'Login',
            data: {route: '/login', icon: 'fa-solid fa-right-to-bracket'},
            expanded: true,
            children: [
              {
                label: 'Class',
                data: {route: '/clase/lista', icon: 'fa-solid fa-person-chalkboard'},
                children: [
                  {
                    label: 'New',
                    data: {icon: 'fa-solid fa-circle-plus'}
                  },
                  {
                    label: 'Details',
                    data: {icon: 'fa-solid fa-eye'}
                  },
                  {
                    label: 'Edit',
                    data: {icon: 'fa-solid fa-pen-to-square'}
                  }
                ]
              },
              {
                label: 'Customers',
                data: {route: '/cliente/lista', icon: 'fa-solid fa-user-group'},
                children: [
                  {
                    label: 'New',
                    data: {icon: 'fa-solid fa-circle-plus'}
                  },
                  {
                    label: 'Edit',
                    data: {icon: 'fa-solid fa-pen-to-square'}
                  }
                ]
              },
              {
                label: 'Providers',
                data: {route: '/proveedor/lista', icon: 'fa-solid fa-truck-field'},
                children: [
                  {
                    label: 'New',
                    data: {icon: 'fa-solid fa-circle-plus'}
                  },
                  {
                    label: 'Details',
                    data: {icon: 'fa-solid fa-eye'}
                  },
                  {
                    label: 'Edit',
                    data: {icon: 'fa-solid fa-pen-to-square'}
                  }
                ]
              },
              {
                label: 'Inventory',
                data: {route: '/producto/lista', icon: 'fa-solid fa-clipboard'},
                children: [
                  {
                    label: 'New',
                    data: {icon: 'fa-solid fa-circle-plus'}
                  },
                  {
                    label: 'Edit',
                    data: {icon: 'fa-solid fa-pen-to-square'}
                  }
                ]
              },
              {
                label: 'Sale',
                data: {route: '/nuevaVenta', icon: 'fa-solid fa-money-check-dollar'},
                children: [
                  {
                    label: 'See Sales',
                    data: {icon: 'fa-solid fa-eye'}
                  },
                  {
                    label: 'Cuts',
                    data: {icon: 'fa-solid fa-book'}
                  }
                ]
              },
              {
                label: 'Employees',
                data: {route: '/empelado/lista', icon: 'fa-solid fa-users'},
                children: [
                  {
                    label: 'New',
                    data: {icon: 'fa-solid fa-circle-plus'}
                  },
                  {
                    label: 'Edit',
                    data: {icon: 'fa-solid fa-pen-to-square'}
                  }
                ]
              },
              {
                label: 'CheckIn',
                data: {route: '/chekcIn', icon: 'fa-solid fa-user-check'}
              },
              {
                label: 'Employees Control',
                data: {route: '/control-checkIn', icon: 'fa-solid fa-address-book'},
                children: [
                  {
                    label: 'Employee',
                    data: {icon: 'fa-solid fa-user'}
                  }
                ]
              }
            ]
          },
          {
            label: 'About Us',
            data: {route: '/about', icon: 'fa-solid fa-dumbbell'}
          },
          {
            label: 'Privacy policies',
            data: {route: '/#', icon: 'fa-solid fa-shield-halved'}
          }
        ]
      }
    ];
  }

  ngOnInit(): void {
    this.isLogged = this.token.isLogged();
    this.isAdmin = this.token.isAdmin();
    this.isInstructor = this.token.isInstructor();
    this.isRecepcionista = this.token.isRecepcionista();
    this.isUser = this.token.isUser();
    this.userName = this.token.getDatesUser();
  }

  logOut(): void {
    this.token.logOut();
    location.reload();
    this.router.navigate(['localhost:4200/home']);
  }

  showModalDialog() {
    this.displayModal = true;
  }

  onNodeSelect(event:any) {
    console.log(event.node.label);
    this.router.navigate([event.node.data.route]);
  }


}

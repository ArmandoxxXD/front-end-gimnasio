import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { TreeNode } from 'primeng/api';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { ConfigUser, User } from 'src/app/models/users';
import { ToastrService } from 'ngx-toastr';

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
  user!: User;
  userID?: number | null;
  displayModal: boolean = false;
  data: TreeNode[];
  selectedNode?: TreeNode;
  notificationsEnabled:Boolean=false;

  private eventListenerNavbarShow: any;
  private eventListenerNavbarHide: any;

  constructor(
     private token: TokenService,
     private router: Router,
     private el: ElementRef,
     private authService: AuthService,
     private afMessaging: AngularFireMessaging,
     private toast: ToastrService
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
                label: 'CheckIn',
                data: {route: '/chekcIn', icon: 'fa-solid fa-user-check'}
              }
            ]
          },
          {
            label: 'About Us',
            data: {route: '/about', icon: 'fa-solid fa-dumbbell'}
          },
          {
            label: 'Privacy policies',
            data: {route: '/privacity_polices', icon: 'fa-solid fa-shield-halved'}
          }
        ]
      }
    ];
  }

  ngOnInit(): void {

    if (!this.isLogged) {
      const navbar = this.el.nativeElement.querySelector('.navbar-collapse');
      const elementLogout = document.getElementById("navbar__logout") as HTMLDivElement;

      this.eventListenerNavbarShow = () => {
        elementLogout.style.margin = "0 auto";
      };

      this.eventListenerNavbarHide = () => {
        elementLogout.style.margin = "0 25px 0 0";
      }

      navbar.addEventListener('show.bs.collapse', this.eventListenerNavbarShow);
      navbar.addEventListener('hidden.bs.collapse', this.eventListenerNavbarHide);
      this.authService.detail(this.token.getDatesId()).subscribe(
        (data) => {
          this.user = data;
          this.notificationsEnabled=this.user.notificationsEnabled;
        },
        (error) => {
          console.error(error);
        }
      );
    }

    this.isLogged = this.token.isLogged();
    this.isAdmin = this.token.isAdmin();
    this.isInstructor = this.token.isInstructor();
    this.isRecepcionista = this.token.isRecepcionista();
    this.isUser = this.token.isUser();
    this.userID = this.token.getDatesId();
    if (this.isUser) {
      const loginNode = this.data[0].children?.find(node => node.label === 'Login');
      if (loginNode) {
        loginNode.children = loginNode.children?.filter(child => ['Class', 'Inventory', 'Sale'].includes(child.label!));
        const classNode = loginNode.children?.find(child => child.label === 'Class');
        if (classNode) {
          classNode.children = classNode.children?.filter(subChild => subChild.label === 'Details');
        }
        const inventoryNode = loginNode.children?.find(child => child.label === 'Inventory');
        if (inventoryNode) {
          delete inventoryNode.children;
        }
        const saleNode = loginNode.children?.find(child => child.label === 'Sale');
        if (saleNode) {
          saleNode.label = 'Buy';
          delete saleNode.children;
        }
      }
    }
    if (this.isInstructor) {
      const loginNode = this.data[0].children?.find(node => node.label === 'Login');
      if (loginNode) {
        loginNode.children = loginNode.children?.filter(child =>
          ['Class', 'Inventory', 'Sale', 'Customers', 'Employees', 'CheckIn'].includes(child.label!)
        );
      }
    }
    if (this.isRecepcionista) {
      const loginNode = this.data[0].children?.find(node => node.label === 'Login');
      if (loginNode) {
        loginNode.children = loginNode.children?.filter(child =>
          ['Class', 'Inventory', 'Sale', 'Customers', 'Employees', 'CheckIn'].includes(child.label!)
        );
      }
    }
  }

  ngOnDestroy(): void {
    const navbar = this.el.nativeElement.querySelector('.navbar-collapse');
    if (navbar) {
      navbar.removeEventListener('show.bs.collapse', this.eventListenerNavbarShow);      
      navbar.removeEventListener('hidden.bs.collapse', this.eventListenerNavbarHide);
    }
  }

  logOut(): void {
    this.token.logOut();
    this.router.navigate(['localhost:4200/home']);
  }

  showModalDialog() {
    this.displayModal = true;
  }

  onNodeSelect(event: any) {
    console.log(event.node.label);
    this.router.navigate([event.node.data.route]);
  }

  toggleNotifications(): void {
    this.notificationsEnabled = !this.notificationsEnabled;
    this.requestPermissionAndGetToken();
    const message = this.notificationsEnabled ? 'Notifications enabled' : 'Notifications disabled';
    this.toast.info(message, 'Notifications', { timeOut: 3000 });
  }
  
  requestPermissionAndGetToken(): void {
    this.afMessaging.requestToken.subscribe(
      (token) => {
        this.updateNotificationPreference(this.notificationsEnabled, token);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  updateNotificationPreference(enabled: Boolean, fcmToken: string|null): void {
    if (fcmToken) {
      const config = new ConfigUser(fcmToken, enabled);
      this.authService.configUser(this.token.getDatesId(), config).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.error('Error updating notification preference', error);
        }
      });
    }
  }

}

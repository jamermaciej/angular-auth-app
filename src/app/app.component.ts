import { AuthenticationService } from './_services/authentication.service';
import { Component } from '@angular/core';
import { User } from './_models';
import { Router } from '@angular/router';
import { Role } from './_models/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}

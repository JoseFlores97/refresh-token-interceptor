import { Component, OnInit } from '@angular/core';
import { RoleService } from './roles/role.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test';

  constructor(
    private roleService: RoleService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.autoLogin();
  }

  autoLogin(): void {
    this.authService.login().subscribe(response => {
      this.authService.token = response;
    });
  }

  getRoles(): void {
    this.roleService.index().subscribe(roles => {
      console.log(roles);
      console.log('llega a roles');
    });
  }
}

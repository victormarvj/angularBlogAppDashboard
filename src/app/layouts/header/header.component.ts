import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail: string = '';
  isLoggedIn$: Observable<boolean> = new Observable<boolean>;

  constructor( private authService: AuthService ) {}

  ngOnInit(): void {
      const ls = localStorage.getItem('user') as string;

      this.userEmail = JSON.parse(ls).email;

      this.isLoggedIn$ = this.authService.isLoggedIn();

  }


  onLogOut() {
    this.authService.logOut();
  }
}

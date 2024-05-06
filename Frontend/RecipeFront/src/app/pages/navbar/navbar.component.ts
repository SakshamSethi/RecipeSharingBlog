import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AuthserviceService } from '../../services/Auth/authservice.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet,MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  user:any=null;
  constructor(public authservice:AuthserviceService , public router:Router){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.authservice.getUserProfile().subscribe();
    this.authservice.authSubject.subscribe( (auth)=>
      {
         this.user = auth.user;
      }
    )
   }
    hangleLogout()
   {
    this.authservice.logout();
     
   }
}

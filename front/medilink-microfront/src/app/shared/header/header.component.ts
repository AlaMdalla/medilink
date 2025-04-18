import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen = false;
  constructor(private readonly userService:UsersService,
    private readonly router: Router){}

    profileInitial: string = 'A'; // Default initial
    profileInfo: any;
    errorMessage: string = ''
    isAuth: boolean=false;

  async ngOnInit() {
    try {
      const token = localStorage.getItem('token')
      this.isAuth=true;

      if(!token){
        throw new Error("No Token Found")
        this.isAuth=false;

      }

      this.profileInfo = await this.userService.getYourProfile(token);
      if (this.profileInfo && this.profileInfo.name) {
        this.profileInitial = this.profileInfo.name.charAt(0).toUpperCase();
    } else if (this.profileInfo && this.profileInfo.email) {
        this.profileInitial = this.profileInfo.email.charAt(0).toUpperCase();
    }
 
    } catch (error:any) {
      this.showError(error.message)
    }}
      
  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
  async logout() {
    this.userService.logOut();
    this.isAuth=false

  }
  // Method to toggle the menu
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    const navList = document.querySelector('.nav-list');
    if (navList) {
      if (this.menuOpen) {
        navList.classList.add('show');
      } else {
        navList.classList.remove('show');
      }
    }
  }
  goToProfile() {
    this.router.navigate(['/profile']);
}
}

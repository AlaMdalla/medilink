import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';
 import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})


export class UpdateuserComponent implements OnInit {


  constructor(private readonly userService:UsersService,
    private readonly router: Router,
    private readonly route:ActivatedRoute){}


    userId: any;
    userData: any = {}
    errorMessage:string = ''
isAdmin:boolean =false;

  ngOnInit(): void {
    this.getUserById()
      
  }
  
  isLoading = false;

/*
  async getUserById(){
      this.userId = this.route.snapshot.paramMap.get('id')
      const token = localStorage.getItem('token')
      if(!this.userId || !token){
          this.showError("User ID or TOken is Required")
          return;
      }

      try {
        let userDataResponse = await this.userService.getUsersById(this.userId, token)
        const {name, email, role, city} = userDataResponse.ourUsers
        this.userData = {name, email, role, city};
        
      } catch (error:any) {
        this.showError(error.message);
      }
  }
  

  async updateUser(){
    const confitm = confirm("Are you sure you wanna update this user")
    if(!confirm) return
    try{
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error("Token not found")
      }
      const res = await this.userService.updateOwnUser(this.userId, this.userData);
      console.log(res)

      if(res.statusCode === 200){
        this.router.navigate(['/users'])
      }else{
        this.showError(res.message)
      }

    }catch(error:any){
      this.showError(error.message)
    }

  }*/
    async getUserById() {
      this.userId = this.route.snapshot.paramMap.get('id');
    
      // Check if localStorage is available
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
      if (!this.userId || !token) {
        this.showError("User ID or Token is required");
        return;
      }
    
      try {
        let userDataResponse = await this.userService.getOwnUsersById(this.userId);
        const { name, email, role, city } = userDataResponse.ourUsers;
        this.userData = { name, email, role, city };
        if(role==='ADMIN')
        {
          this.isAdmin=true
        }
      } catch (error: any) {
        this.showError(error.message);
      }
    }
    
    async updateUser() {
      const confirmUpdate = confirm("Are you sure you want to update this user?");
      if (!confirmUpdate) return;
    
      try {
        // Check if localStorage is available
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
        if (!token) {
          throw new Error("Token not found");
        }
    
        const res = await this.userService.updateOwnUser(this.userId, this.userData);
        console.log(res);
    
        if (res.statusCode === 200) {
          this.router.navigate(['/home']);
        } else {
          this.showError(res.message);
        }
      } catch (error: any) {
        this.showError(error.message);
      }
    }
    


  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }
}

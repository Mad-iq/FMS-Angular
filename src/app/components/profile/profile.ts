import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, Navbar],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  username= '';
  email= '';
  role= '';
  showPasswordDialog = false;
  oldPassword= '';
  newPassword= '';
  confirmPassword= '';
  isLoading= false;
  showMessageDialog= false;
  msgTitle= '';
  msgText= '';
  msgType:'success'|'error' = 'success';
  //for password strength
  pswdStrength =0;


  constructor(private authService: AuthService) {}
  ngOnInit(): void{
    this.username = this.authService.getUsername() || '';
    this.email = this.authService.getUserEmail() || '';
    this.role = this.authService.getUserRole() || '';
    if(!this.username || !this.email){
      this.openMessageDialog('Session Error','User details not found. Please login again.','error');
    }
  }
  openPasswordDialog(): void{
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.showPasswordDialog = true;
  }
  closePasswordDialog(): void {
    this.showPasswordDialog = false;
   }

  confirmChangePassword(): void {
    if (!this.oldPassword || !this.newPassword || !this.confirmPassword){
      this.openMessageDialog('Error', 'All fields are required', 'error');
      return;
     }
    if (this.newPassword !== this.confirmPassword){
      this.openMessageDialog('Error', 'Passwords do not match', 'error');
      return;
    }
    this.isLoading = true;
    this.authService.changePassword(this.oldPassword,this.newPassword).subscribe({
      next: (response)=>{
        this.isLoading = false;
        this.closePasswordDialog();
        this.openMessageDialog('Success',response.message ||'Password changed successfully','success');
       },
      error: (error) => {
        this.isLoading = false;
        this.openMessageDialog('Error',error?.error?.error ||'Failed to change password','error');
      }
    });
  }

  openMessageDialog(title: string,message: string,type: 'success' | 'error'):void{
    this.msgTitle = title;
    this.msgText = message;
    this.msgType = type;
    this.showMessageDialog = true;
  }

  closeMessageDialog(): void{
    this.showMessageDialog = false;
  }

}

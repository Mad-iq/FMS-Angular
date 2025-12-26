import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../navbar/navbar';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

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
  isForcedChange = false;
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
  pswdErrors: string[]=[];


  constructor(private authService: AuthService, private route: ActivatedRoute) {}
  ngOnInit(): void{
    this.username = this.authService.getUsername() || '';
    this.email = this.authService.getUserEmail() || '';
    this.role = this.authService.getUserRole() || '';
    const force = this.route.snapshot.queryParamMap.get('forceChange');
     if (force === 'true'){
    this.openPasswordDialog();
     }
    if(!this.username || !this.email){
      this.openMessageDialog('Session Error','User details not found. Please login again.','error');
    }
  }
  openPasswordDialog(): void{
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.pswdErrors=[];
    this.pswdStrength=0;
     this.showPasswordDialog = true;
  }
  closePasswordDialog(): void {
    if (this.isForcedChange){
    return; 
    }
    this.showPasswordDialog = false;
   }

  confirmChangePassword(): void {
    if(!this.oldPassword || !this.newPassword || !this.confirmPassword){
      this.openMessageDialog('Error', 'All fields are required', 'error');
      return;
     }
    if(this.newPassword !== this.confirmPassword){
      this.openMessageDialog('Error', 'Passwords do not match', 'error');
      return;
    }
    if(this.pswdStrength<5){
      this.openMessageDialog('Weak Password', 'New password doesnt match security requirements', 'error');
      return;
    }
    this.isLoading = true;
    this.authService.changePassword(this.oldPassword,this.newPassword).subscribe({
      next: (response)=>{
        this.isLoading = false;
        this.authService.clearPasswordExpired();
        this.isForcedChange = false;
        this.showPasswordDialog = false;
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

  checkPswdStrength(password: string){
    const pswdError: string[]= [];
    let strength= 0;
    if(password.length >= 8) strength++;
    else pswdError.push("Password should be of atleast 8 characters");

    if(/[A-Z]/.test(password)) strength++;
    else pswdError.push("Password must contain atleast one uppercase letter");

    if(/[a-z]/.test(password)) strength++;
    else pswdError.push("Password must contain atleast one uppercase letter");

    if(/[0-9]/.test(password))  strength++;
    else pswdError.push("Password must contain atleast one uppercase letter");

    if(/[@#$%&*!?]/.test(password)) strength++;
    else pswdError.push("Password must contain atleast one uppercase letter");

    this.pswdStrength=strength;
    this.pswdErrors=pswdError;
  }

  onNewPswdChange(value: string):void{
    this.newPassword=value;
    this.checkPswdStrength(value);
  }

}

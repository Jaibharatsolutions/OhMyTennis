import { Component, OnInit } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';
@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
  providers:[AuthService]
})
export class SocialLoginComponent implements OnInit {

  constructor(private socialAuthService: AuthService,private router: Router) 
  { 
    console.log(this.router.url);
  }

  public userPostData = {
    email: '',
    name: '',
    provider: '',
    provider_id: '',
    provider_pic: '',
    token: ''
    };

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    console.log(socialPlatform);
    let socialPlatformProvider;
    if (socialPlatform === 'facebook') {
       socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
       socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
      this.apiConnection(userData);
   });
    
    }
    
    apiConnection(data) {
      console.log(data);
       this.userPostData.email = data.email;
       this.userPostData.name = data.name;
       this.userPostData.provider = data.provider;
       this.userPostData.provider_id = data.id;
       this.userPostData.provider_pic = data.image;
       this.userPostData.token = data.token;
    
    
}
}

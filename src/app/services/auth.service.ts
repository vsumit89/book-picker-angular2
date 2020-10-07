import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
export class WindowService {

  constructor() { }
  get windowRef() {
    return window
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  URL = 'https://8eb46a698f52.ngrok.io'
  win = new WindowService();
  windowRef;
  loggedIn = false;
  token: string;
  constructor( public http_ : HttpClient) {
    this.windowRef = this.win.windowRef;
  }
  ngOnInit() {
  }
  async SendOtp(ph_num, appVerifier) {
    await firebase.auth().signInWithPhoneNumber(ph_num, appVerifier).then(result => {
      this.windowRef.recaptchaVerifier = appVerifier;
      this.windowRef.confirmationResult = result;
    }).catch(error => {
      console.log(error);
    });
  }
  async VerifyOtp(otp) {
    await this.windowRef.confirmationResult.confirm(otp).then(
      user => {
        this.loggedIn = true;
        localStorage.setItem('IsLoggedIn', 'true');
        this.login()
      }
    ).catch(error => {
      window.alert("Incorrect OTP");
    })
  }
  LogOut() {
    firebase.auth().signOut()
    localStorage.removeItem('IsLoggedIn');
    localStorage.removeItem('nickname');
  }
  GetToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          user.getIdToken().then(idToken => {
            resolve(idToken);    
          });
        }
      },
      error => {
        console.log(error);
        reject(error);
      }
      );
    })
  }
  async login() {
    // await this.GetToken().then(token => { this.token = token})
    // const headers = new HttpHeaders({'content-type': 'application/json','Authorization':`Bearer ${this.token}`})
    const headers = new HttpHeaders()
    this.http_.post(this.URL + '/login', JSON.stringify({ 'mobile' : localStorage.getItem('number')}), {headers : headers}).subscribe (
      Response => console.log(Response),
      error => console.log(error)
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService} from "../services/auth.service";
import { User } from "../models/User.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authForm : FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initAuthForm();
  }

  initAuthForm() {
    this.authForm = this.formBuilder.group(
      {
        email:["", [Validators.required, Validators.email]],
        password:["", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    )
  }

  onLogIn() {
    const formValue = this.authForm.value;
    const signingUser : new User = {email:formValue["email"], password: formValue["password"]};
    this.authService.signIn(signingUser).then(
      () => {
        console.log("Utilisateur connecté avec succès !");
        this.router.navigate(["/list"]);
      },
      (error) => {this.errorMessage = error;}
    );
  }

  onLogOut() {
    this.authService.logOut();
  }

}

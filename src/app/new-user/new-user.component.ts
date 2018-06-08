import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { User } from "../models/User.model";
import { Router } from "@angular/router"

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  newUserForm: FormGroup;
  errorMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.newUserForm = this.formBuilder.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    );
  }

  onCreateNewUser() {
    const formValue = this.newUserForm.value;
    var newUser: User = {email: formValue["email"], password: formValue["password"]};
    this.authService.newUser(newUser).then(
      () => {
        console.log("Utilisateur " + newUser.email + " créé avec succès !");
        this.router.navigate(["/auth"]);
      },
      (error) => {this.errorMessage = error}
    );
  }

}

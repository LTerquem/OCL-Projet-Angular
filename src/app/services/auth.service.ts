import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/User.model";

import * as firebase from "firebase";

@Injectable()
export class AuthService {

  constructor(private router: Router, private httpClient: HttpClient) {}

  newUser(newUser: User) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password).then(
          () => {resolve();},
          (error) => {reject(error);}
        )
      }
    );
  }

  signIn(loggingUser: User) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(loggingUser.email, loggingUser.password).then(
          () => {resolve();},
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOut() {
    firebase.auth().signOut();
    console.log("Utilisateur déconnecté !");
  }

}

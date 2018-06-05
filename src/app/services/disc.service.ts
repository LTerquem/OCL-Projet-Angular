import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Disc } from "../models/Disc.model";
import * as firebase from "firebase";

@Injectable()
export class DiscService {

  discs : Disc[] = this.getCdsFromServer();

  discSubject = new Subject<Disc[]>();

  emitDiscSubject() {
    this.discSubject.next(this.discs);
  }

  constructor() {}

  addNewDisc(newDisc: Disc) {
    this.discs.push(newDisc);
    this.saveCdsOnServer();
    this.emitDiscSubject();
  }

  saveCdsOnServer() {
    firebase.database().ref("/discs").set(this.discs);
  }

  getCdsFromServer() {
    firebase.database().ref("/discs").on("value", (data:DataSnapShot) => {
      this.discs = data.val() ? data.val() : [];
      this.emitDiscSubject();
      }
    );
  }

  getSingleCd(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref("/discs/"+id).once("value").then(
          (data: DataSnapShot) => {
            resolve(data.val());
          },
          (error) => {reject(error);}
        );
      }
    );
  }

  deleteCd(cd: Disc) {
    if(cd.cover) {
      const storageRef = firebase.storage().refFromURL(cd.cover);
      storageRef.delete().then(
        () => {console.log("Couverture d'album supprimée !");},
        (error) => {console.log("Erreur rencontrée durant la suppression de l'image : " + error);}
      );
    }
    const cdIndexToRemove = this.discs.findIndex(
      (cdInDiscs) => {return (cdInDiscs.title === cd.title && cdInDiscs.author === cd.author);} //Pas beau mais les objets ne correspondent pas
    );

    console.log("cdIndexToRemove = " + cdIndexToRemove);
    this.discs.splice(cdIndexToRemove, 1);
    this.saveCdsOnServer();
    this.emitDiscSubject();
  }

  uploadFile(file: File) {
      return new Promise(
        (resolve, reject) => {
          const almostUniqueFileName = Date.now().toString();
          const upload = firebase.storage().ref()
            .child('images/'+ almostUniqueFileName + file.name).put(file);
            upload.on('state_changed', function(snapshot){
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
              }
            }, function(error) {
              // Handle unsuccessful uploads
              console.log("Upload failed : " + error);
            }, function() {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                resolve(downloadURL);
              });
            });
        }
      );
  }
}

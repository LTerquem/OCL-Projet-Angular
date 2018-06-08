import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from "@angular/router";
import { DiscService } from "../services/disc.service";
import { Disc } from "../models/Disc.model";

@Component({
  selector: 'app-new-cd',
  templateUrl: './new-cd.component.html',
  styleUrls: ['./new-cd.component.css']
})
export class NewCdComponent implements OnInit {

  cdForm : FormGroup;
  fileIsUploading: boolean = false;
  fileUploaded: boolean = false;
  fileUrl: string;

  constructor(
    private discService: DiscService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.cdForm = this.formBuilder.group(
      {
        title:["", Validators.required],
        author:["", Validators.required]
      }
    )
  }

  onSubmitForm() {
    const formValue = this.cdForm.value
    var newDisc = new Disc(formValue["title"],formValue["author"]);
    if(this.fileUrl) {newDisc.cover = this.fileUrl;}
    this.discService.addNewDisc(newDisc);
    this.router.navigate(["/list"]);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.discService.uploadFile(file).then(
      (url : string) => {
        this.fileUrl = url;
        this.fileUploaded = true;
        this.fileIsUploading = false;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}

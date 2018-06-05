import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

import { DiscService } from "../services/disc.service";
import { Disc } from "../models/Disc.model";

@Component({
  selector: 'app-cd-details',
  templateUrl: './cd-details.component.html',
  styleUrls: ['./cd-details.component.css']
})
export class CdDetailsComponent implements OnInit {

  cd : Disc = {title: "", author: ""};

  constructor(
    private route: ActivatedRoute,
    private discService: DiscService,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.discService.getSingleCd(+id).then(
      (cd: Disc) => {this.cd = cd;}
    );
  }

  onDeleteThisCd() {
    this.discService.deleteCd(this.cd);
    this.router.navigate(["/list"]);
  }

}

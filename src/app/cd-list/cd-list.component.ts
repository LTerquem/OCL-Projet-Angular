import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";

import { Router } from "@angular/router";

import { DiscService } from "src/app/services/disc.service";

@Component({
  selector: 'app-cd-list',
  templateUrl: './cd-list.component.html',
  styleUrls: ['./cd-list.component.css']
})
export class CdListComponent implements OnInit, OnDestroy {

  discSubscription : Subscription;
  cds = this.discService.discs;

  constructor(private router: Router, private discService: DiscService) { }

  ngOnInit() {
    this.discSubscription = this.discService.discSubject.subscribe(
      (data) => {this.cds = data;},
      (error) => {console.log(error)}
    );
  }

  ngOnDestroy () {
    this.discSubscription.unsubscribe;
  }

  onSeeDetails(id: number) {
      this.router.navigate(["/disc/"+id]);
  }

  onNewCd() {
    this.router.navigate(["/new-disc"]);
  }

}

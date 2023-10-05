import { Component, OnInit } from '@angular/core';
import { DaumList } from 'src/app/models/sponsors';
import { SponsorsService } from 'src/app/services/sponsors.service';

@Component({
  selector: 'app-sponsors-list',
  templateUrl: './sponsors-list.component.html',
  styleUrls: ['./sponsors-list.component.scss']
})
export class SponsorsListComponent implements OnInit {

  sponsorsList!: DaumList

  constructor(private sponsorService: SponsorsService) {}

  ngOnInit(): void {
    this.getSponsorsList()
  }

  getSponsorsList() {
    this.sponsorService.getSponsorsList().subscribe(sponsors => {
      console.log(sponsors);
      this.sponsorsList = sponsors
      console.log(this.sponsorsList);
    })
  }

}

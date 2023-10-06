import { Component, OnInit } from '@angular/core';
import { SortEvent } from 'primeng/api';
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

  customSort(event: SortEvent) {
    event.data?.sort((data1, data2) => {
        let value1 = data1[event.field!];
        let value2 = data2[event.field!];
        let result = null;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return event.order! * result;
    });
}

}

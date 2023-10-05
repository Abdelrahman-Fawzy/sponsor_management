import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DaumList, Sponsor } from '../models/sponsors';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  baseUrl = environment.baseUrl

  constructor(private http: HttpClient) { }

  // this for get list
  getSponsorsList(): Observable<DaumList> {
    return this.http.get<DaumList>(`${this.baseUrl}/sponsors`);
  }

  // this for create
  createSponsor(sponsor: Sponsor) {
    return this .http.post(`${this.baseUrl}/sponsors`, sponsor)
  }
}

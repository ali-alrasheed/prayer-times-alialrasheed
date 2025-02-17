import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PrayerTimesService {
  //الرابط الخاص بمواقيت الصلاة
  private Url = 'https://api.aladhan.com/v1/timings';
//حقن من اجل جلب المواقيت
  constructor(private http: HttpClient) {}
//دالة جلب المواقيت
  getPrayerTimes(latitude: number, longitude: number): Observable<any> {
    const today = new Date();
    const date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      //من اجل ان يكون التاريخ والرقم مكون من محرفين 
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const url = `${this.Url}/${date}?latitude=${latitude}&longitude=${longitude}`;

    return this.http.get<any>(url).pipe(
      map((response) => response.data.timings)
    );
  }
}

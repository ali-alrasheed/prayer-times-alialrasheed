import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  private Url = 'https://geocoding-api.open-meteo.com/v1/search';
//حقن الhttp من اجل الجلب
  constructor(private http: HttpClient) {}
//دالة لجلب المدينة وموقعها وطولها وعرضها 
  getTimes(city: string): Observable<{ latitude: number; longitude: number; country: string }> {
    const url = `${this.Url}?name=${city}&count=1`;
//ارجاع المدينة
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log(response); 
        if (response.results && response.results.length > 0) {
          const { latitude, longitude, country } = response.results[0];
          return { latitude, longitude, country };
        } else {
          throw new Error('لم يتم العثور على المدينة');
        }
      })
    );
  }
}

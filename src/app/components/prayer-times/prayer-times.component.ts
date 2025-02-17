import { Component } from '@angular/core';
import { GeocodingService } from '../../services/geocoding.service';
import { PrayerTimesService } from '../../services/prayer-times.service';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  //الواجهة الاسسية بالتنفيذ
  selector: 'app-prayer-times',
  standalone: true,
  //استدعاء المكونات من angular
  imports: [CommonModule, FormsModule],
  //قالب واجهة العرض المستحدم
  templateUrl: './prayer-times.component.html',
  styleUrls: ['./prayer-times.component.css']
})
export class PrayerTimesComponent {
  //المتيرات اللازمة
  cityName: string = '';
  country: string = '';
  latitude: number | null = null;
  longitude: number | null = null;
  prayerTimes: any = null;
  errorMessage: string = '';

  constructor(
    //حقن السيرفرات 
    private geocodingService: GeocodingService,
    private prayerTimesService: PrayerTimesService
  ) {}
//دالة البحث عن ماقيت الصلاة للمدينة وجلبها البيانات
  searchPrayerTimes() {
    if (!this.cityName.trim()) {
      this.errorMessage = 'يرجى إدخال اسم المدينة';
      return;
    }

    this.errorMessage = '⏳ جاري جلب البيانات...';
//استدعاء دالة الجلب عن طريق الapi من السيرفر 
    this.geocodingService.getTimes(this.cityName)
      .pipe(
        switchMap(({ latitude, longitude, country }) => {
          //اذا الطول او العرض خطأ اي لايوجد مكان مثل هذا على الرابط
          if (!latitude || !longitude) {
            this.errorMessage = 'لم يتم العثور على الموقع';
            return of(null);
          }
          this.latitude = latitude;
          this.longitude = longitude;
          this.country = country || 'غير معروف';
          //ارجاع الطول والعرض الموافق للمدينة
          return this.prayerTimesService.getPrayerTimes(latitude, longitude);
        }),
        catchError(() => {
          this.errorMessage = 'لم يتم العثور على المدينة أو حدث خطأ أثناء جلب البيانات';
          return of(null);
        })
      )
      //ارجاع الوقت
      .subscribe((times) => {
        if (!times) {
          this.prayerTimes = null;
          return;
        }
        this.prayerTimes = times;
        this.errorMessage = ''; 
      });
  }
}

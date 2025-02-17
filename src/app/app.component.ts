import { Component } from '@angular/core';
import { PrayerTimesComponent } from './components/prayer-times/prayer-times.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PrayerTimesComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prayer-times';
}

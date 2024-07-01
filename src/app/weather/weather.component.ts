// weather.component.ts
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: string = '';
  city: string = '';
  units: string = 'imperial';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather('London'); // Default city when component initializes
  }

  getWeather(city: string) {
    this.weatherService.getWeather(city, this.units).subscribe({
      next: (res) => {
        this.myWeather = res;
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;
        this.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png';
      },
      error: (error) => console.log(error.message),
      complete: () => console.info('API call completed')
    });
  }

  onCitySubmit(event: Event) {
    event.preventDefault(); // Prevent default form submission
    this.getWeather(this.city); // Call getWeather method with user-provided city
  }

  onRadioButtonChange() {
    if (this.units == 'imperial') {
      this.units = 'metric';
    } else {
      this.units = 'imperial';
    }

    this.getWeather(this.city); // Refresh weather data with updated units
  }

}

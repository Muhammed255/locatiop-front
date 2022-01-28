import { Component, OnInit} from '@angular/core';
import { AppSettings } from './app.settings';
import { Settings } from './app.settings.model';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public settings: Settings;
  constructor(public appSettings:AppSettings, private authService: AuthService){
      this.settings = this.appSettings.settings;
  } 

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
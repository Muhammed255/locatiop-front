import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
    public settings = new Settings(
        'Locatiop',   //theme name
        true,       //loadingSpinner
        true,      //fixedHeader
        true,      //fixedSidenav
        false,      //fixedSidenavUserContent
        false,      //fixedFooter
        true,       //sidenavIsOpened
        true,       //sidenavIsPinned  
        'vertical', //horizontal , vertical
        'default',  //default, compact, mini
        'blue-dark',   //indigo-light, teal-light, red-light, gray-light, blue-dark, green-dark, pink-dark, gray-dark
        false       // true = rtl, false = ltr
    )

    public user_settings = new Settings(
        'Locatiop',   //theme name
        true,       //loadingSpinner
        true,      //fixedHeader
        false,      //fixedSidenav
        false,      //fixedSidenavUserContent
        false,      //fixedFooter
        true,       //sidenavIsOpened
        true,       //sidenavIsPinned  
        'horizontal', //horizontal , vertical
        'compact',  //default, compact, mini
        'blue-dark',   //indigo-light, teal-light, red-light, gray-light, blue-dark, green-dark, pink-dark, gray-dark
        false       // true = rtl, false = ltr
    )
}


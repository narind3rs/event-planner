import { Component, OnInit } from '@angular/core'
import { AuthService } from './user/auth.service'

@Component({
    selector: 'events-app',
    template: `
                <nav-bar></nav-bar>
                <router-outlet></router-outlet>`
})
export class EventsAppComponent implements OnInit {
    constructor(private auth: AuthService) {}

    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.auth.checkAuthenticationStatus()
    }
}
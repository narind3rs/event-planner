import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import {    
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventResolver,
    EventListResolver,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe,
    UpvoteComponent,
    VoterService,
    LocationValidator
} from './events/index'

import { EventsAppComponent } from './events-app-component'
import { NavBarComponent } from './nav/navbar.component'

import { CollapsibleWellComponent,
        IToastr,
        TOASTR_TOKEN,
        JQ_TOKEN,
        SimpleModalComponent,
        ModalTriggerDirective
} from './common/index'

import { appRoutes } from './routes'
import { Error404Component } from "./errors/404.component";
import { AuthService } from "./user/auth.service";

// Define window interface
declare const window: any;

// Initialize toastr if not available
if (typeof window !== 'undefined') {
    window.toastr = window.toastr || {
        success: (msg: string) => console.log('Success:', msg),
        error: (msg: string) => console.error('Error:', msg),
        info: (msg: string) => console.log('Info:', msg),
        warning: (msg: string) => console.warn('Warning:', msg)
    };
    
    // Simple jQuery mock for Bootstrap modal
    window.jQuery = function(selector: any) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        return {
            modal: (action: any) => {
                if (element && typeof bootstrap !== 'undefined') {
                    const bsModal = bootstrap.Modal.getInstance(element) || new bootstrap.Modal(element);
                    if (typeof action === 'string') {
                        if (action === 'hide') bsModal.hide();
                        else if (action === 'show') bsModal.show();
                    } else if (typeof action === 'object') {
                        bsModal.show();
                    }
                }
            }
        };
    };
}

const toastr: IToastr = window.toastr;
const jQuery: any = window.jQuery;

declare let bootstrap: any;

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        EventsAppComponent,
        CreateEventComponent,
        EventsListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        NavBarComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        SimpleModalComponent,
        ModalTriggerDirective,
        DurationPipe,
        UpvoteComponent,
        LocationValidator
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        EventService,
        { provide: TOASTR_TOKEN, useValue: toastr },
        { provide: JQ_TOKEN, useValue: jQuery },
        EventResolver, 
        EventListResolver,
        AuthService,
        VoterService,        
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule { }

//Should Move it to another file
function checkDirtyState(component:CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('You have unsaved changes, do you want to cancel?')
    }
    return true
}
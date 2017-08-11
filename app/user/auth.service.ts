import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class AuthService {
    currentUser: IUser

    constructor(private http: Http) {}

    loginUser(userName: string, password: string) {
       let headers = new Headers({ 'Content-Type': 'application/json' })

       let options = new RequestOptions({ headers: headers })

       let loginInfo = { username: userName, password: password }

       return this.http.post('/api/login', JSON.stringify(loginInfo), options)
        .do( resp => {
            if (resp) {
                this.currentUser = <IUser>resp.json().user
            }
        }).catch(error => {
            return Observable.of(false)
        })
    }

    isAuthenticated() {
        return !!this.currentUser
    }

    checkAuthenticationStatus() {
        return this.http.get('/api/currentidentity').map( (response: any) => {
            if(response._body) {
                return response.json()
            } else {
                return {}
            }
        }).do(currentUser => {
            if (!!currentUser.userName) {
                this.currentUser = currentUser
            }
        })
        .subscribe()
    }

    logout() {
        this.currentUser = undefined

        let headers = new Headers({ 'Content-Type': 'application/json' })
        let options = new RequestOptions({ headers: headers })

        return this.http.post('/api/logout', JSON.stringify({}), options)
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName

        let headers = new Headers({ 'Content-Type': 'application/json' })

       let options = new RequestOptions({ headers: headers })

       return this.http.put(`/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), options)

    }
}
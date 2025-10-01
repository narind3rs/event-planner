import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { tap, map, catchError } from 'rxjs/operators'

@Injectable()
export class AuthService {
    currentUser: IUser | undefined

    constructor(private http: HttpClient) {}

    loginUser(userName: string, password: string) {
       let headers = new HttpHeaders({ 'Content-Type': 'application/json' })

       let loginInfo = { username: userName, password: password }

       return this.http.post<{user: IUser}>('/api/login', JSON.stringify(loginInfo), { headers: headers })
        .pipe(
            tap(resp => {
                if (resp) {
                    this.currentUser = resp.user
                }
            }),
            catchError(error => {
                return of(false)
            })
        )
    }

    isAuthenticated() {
        return !!this.currentUser
    }

    checkAuthenticationStatus() {
        return this.http.get<IUser>('/api/currentidentity').pipe(
            map((currentUser: any) => {
                return currentUser || {}
            }),
            tap(currentUser => {
                if (!!currentUser.userName) {
                    this.currentUser = currentUser
                }
            })
        )
        .subscribe()
    }

    logout() {
        this.currentUser = undefined

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' })

        return this.http.post('/api/logout', JSON.stringify({}), { headers: headers })
    }

    updateCurrentUser(firstName: string, lastName: string) {
        if (this.currentUser) {
            this.currentUser.firstName = firstName
            this.currentUser.lastName = lastName

            let headers = new HttpHeaders({ 'Content-Type': 'application/json' })

            return this.http.put(`/api/users/${this.currentUser.id}`, JSON.stringify(this.currentUser), { headers: headers })
        }
        return of(null)
    }
}
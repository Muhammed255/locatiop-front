import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData, Token, ResendEmail } from 'src/app/classes/auth-data.model';

const SERVER_API_URL = `${environment.apiUrl}/user`;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();
    private userId: string;
    private role: string;

    constructor(private http: HttpClient, private router: Router) {}

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getAuthRole() {
        return this.role;
    }

    login(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http
            .post<{
                role: string;
                token: string;
                expiresIn: number;
                userId: string;
                msg: string;
            }>(`${SERVER_API_URL}/login`, authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                this.role = response.role;
                console.log(this.role);
                if (token) {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.userId = response.userId;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(
                        now.getTime() + expiresInDuration * 1000
                    );
                    this.saveAuthData(
                        token,
                        expirationDate,
                        this.userId,
                        this.role
                    );
                    if (response.role === 'mainadmin') {
                        this.router.navigate(['/main-admin/dashboard']);
                    } else if (response.role === 'storeadmin') {
                        this.router.navigate(['/home']);
                    } else {
                        this.router.navigate(['/account/homepage']);
                    }
                }
            });
    }

    signup(
        name: string,
        username: string,
        email: string,
        password: string,
        bio: string,
        phone_number: string
    ) {
        const authData: AuthData = {
            name: name,
            email: email,
            username: username,
            password: password,
            bio: bio,
            phone_number: phone_number
        };
        return this.http.post(`${SERVER_API_URL}/signup`, authData);
    }

    admin_signup(
        name: string,
        username: string,
        email: string,
        password: string,
        bio: string,
        phone_number: string,
        storeId: string,
        job_concern: boolean,
        postalCode: string
    ) {
        const authData: AuthData = {
            name,
            email,
            username,
            password,
            bio,
            phone_number,
            storeId,
            job_concern,
            postalCode
        };
        return this.http.post(`${SERVER_API_URL}/storeadmin/signup`, authData);
    }

    editProfile(
        name: string,
        email: string,
        username: string,
        password: string,
        user_image: File | string,
        bio: string,
        job_concern: boolean,
        postalCode: string,
        phone_number: string
    ) {
        let userData: FormData | AuthData;
        if (typeof user_image === 'object') {
            userData = new FormData();
            userData.append('name', name);
            userData.append('email', email);
            userData.append('username', username);
            userData.append('password', password);
            userData.append('user_image', user_image, name);
            userData.append('bio', bio);
            userData.append('job_concern', job_concern.toString());
            userData.append('postalCode', postalCode);
            userData.append('phone_number', phone_number);
        } else {
            userData = {
                name: name,
                email: email,
                username: username,
                password: password,
                user_image: user_image,
                phone_number: phone_number,
                job_concern: job_concern,
                postalCode: postalCode
            };
        }
        return this.http.put(`${SERVER_API_URL}/edit_profile`, userData);
    }

    findOneUser(id: string) {
        return this.http.get<{ user: any }>(`${SERVER_API_URL}/` + id);
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.userId = null;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/user/landing']);
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn =
            authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.userId = authInformation.userId;
            this.role = authInformation.role;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    private setAuthTimer(duration: number) {
        console.log('Setting timer: ' + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(
        token: string,
        expirationDate: Date,
        userId: string,
        role: string
    ) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');
        const role = localStorage.getItem('role');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId,
            role: role
        };
    }

    getOneStore(id: string) {
        return this.http.get<{ store: any }>(`${SERVER_API_URL}/store/` + id);
    }

    getStoresNames() {
        return this.http.get<{listNames: any[]}>(`${SERVER_API_URL}/list-stores-names`);
    }

    confirm_email(token: string) {
        const tokenData: Token = {token: token};
        return this.http.post<{msg: string}>(`${SERVER_API_URL}/confirmation`, tokenData);
    }

    resend_confirmation(email: string) {
        const emailData: ResendEmail = {email: email};
        return this.http.post<{msg: string, result: any}>(`${SERVER_API_URL}/resend_confirmation`, emailData);
    }
}

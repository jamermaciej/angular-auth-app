import { Observable, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                if([401, 403].indexOf(err.status) !== -1) {
                    // auto logout if 401 Unauthorize or 401 Forbidden response returned from api
                    this.authService.logout();
                    //location.reload(true);
                }

                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }
}
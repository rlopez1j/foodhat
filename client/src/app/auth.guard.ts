import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { ApiService } from './api.service'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private api: ApiService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.api.getSignInStatus().pipe(map((signedIn)=>{
      console.log('sign-in status: ', signedIn)
      if(!signedIn){
        this.router.navigate(['/signup'])
        return false
      } else{
        return true
      }
    }))
  }
}

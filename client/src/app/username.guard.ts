import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class UsernameGuard implements CanActivate {
  constructor(private api: ApiService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.api.getProfile().pipe(map((user: any)=>{
      if(user.username == null){
        return true
      } else{
        console.log('username already exists')
        this.router.navigate(['/'])
        return false
      }
    }))
  }
}

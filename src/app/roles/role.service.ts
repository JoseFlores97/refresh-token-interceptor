import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@enviroment/environment';

import { IRole } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  index(): Observable<IRole> {
    return this.http.get<IRole>(`${environment.endPoint}/roles`);
  }
}

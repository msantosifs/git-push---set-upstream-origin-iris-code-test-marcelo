import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Subdivision} from "../models/subdivision.model";

@Injectable({
    providedIn: 'root'
})
export class SubdivisionService {
    private apiURL = 'http://localhost:3000/v1/subdivisions';

    constructor(private http: HttpClient) { }

    getSubdivisions(): Observable<Array<Subdivision>> {
        return this.http.get<any>(this.apiURL).pipe(map(res => res.subdivisions));
    }
}

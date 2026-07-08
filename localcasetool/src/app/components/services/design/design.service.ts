import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  preset():boolean {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}

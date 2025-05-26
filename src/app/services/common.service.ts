import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})

export class CommonService {


  constructor(

  ) {
  }

  setItem = async (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  getItem = async (key: string) => {
    return localStorage.getItem(key);
  };

  removeItem = async (key: string) => {
    localStorage.removeItem(key);
  };

}

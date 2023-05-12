import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceCache {

  constructor() { }

  private cache = new Map<string, any>();

  getDataFromCache(key: string): any {
    return this.cache.get(key);
  }

  setDataInCache(key: string, data: any) {
    this.cache.set(key, data);
  }
}

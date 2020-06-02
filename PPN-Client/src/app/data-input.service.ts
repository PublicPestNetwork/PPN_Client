import { Injectable } from '@angular/core';
import { Bug } from './bug'
import { BUGLIST } from './mock-bugs'

@Injectable({
  providedIn: 'root'
})
export class DataInputService {

  getBugs(): Bug[]{
    return BUGLIST;
  }

  constructor() { }
}

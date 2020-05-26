import { Component, OnInit } from '@angular/core';
import { Bug } from '../bug';
import { BUGS } from '../buglist';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  
  bug: Bug = {
    id: 1,
    name: 'Whitefly'
  };

  bug_list = BUGS;

  selectedBug: Bug;
  onSelect(bug: Bug): void {
    this.selectedBug = bug;
  }

  constructor() { }
 
  ngOnInit(): void {
  }
  
  
}


import { Component, OnInit } from '@angular/core';
import { Bug } from '../bug'
import { BUGLIST } from '../mock-bugs'
import { DataInputService } from '../data-input.service';


@Component({
  selector: 'app-data-input',
  templateUrl: './data-input.component.html',
  styleUrls: ['./data-input.component.css']
})
export class DataInputComponent implements OnInit {

  bugs: Bug[];
  selectedBug: Bug;
  
  constructor(private datainputservice: DataInputService) { }

  ngOnInit(): void {
    this.getBugs();
  }

  onSelect(bug: Bug): void {
    this.selectedBug = bug;
  }

  getBugs(): void { 
    this.bugs = this.datainputservice.getBugs();
  }
}

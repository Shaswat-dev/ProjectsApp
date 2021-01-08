import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../_services/project.service';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  model: any ={}
  constructor(private projectservice: ProjectService) { }

  ngOnInit() {
  }

  addproject() {
    this.projectservice.createproject(this.model).subscribe(response => {
      console.log(response);
    }, error => {console.log(error);})
  }

  getallprojects() {
    this.projectservice.getprojects().subscribe(response => {
      this.model = response;
    }, error => {console.log(error);})
  }
  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' }
  ];
  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];

  
}

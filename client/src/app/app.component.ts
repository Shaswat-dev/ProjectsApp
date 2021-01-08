import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The Projects App';
  projects: any;

  constructor(private http: HttpClient) {}

  ngOnInit(){
    this.getProjects();
    this.getcountries();
  
  }

  getProjects() {

    this.http.get('https://localhost:5001/API/Projects').subscribe(response => {
     this.projects = response;
  }, error => {
     console.log(error);

  })
  }

  columnDefs = [
    { field: 'id' },
    { field: 'code' },
    { field: 'description' },
    { field: 'cityId'},
    { field: 'isActive'},
  
];
private gridApi;
getSelectedRowData() {
	let selectedNodes = this.gridApi.getSelectedNodes();
	let selectedData = selectedNodes.map(node => node.data);
	alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    return selectedData;
}
countries : any
getcountries() {

  this.http.get('https://localhost:5001/API/Countries').subscribe(response => {
   this.countries = response;
}, error => {
   console.log(error);

})
}
selectedCountry: String = "--Choose Country--";
cityid : number = 0;
states: Array<any>;

	cities: Array<any>;
	
	changeCountry(country) {
    console.log("hi");
		this.cities = this.countries.find(cntry => cntry.description == country).cities;
	}

	changeCity(cityid) {
    console.log("hello");
    this.projects = this.projects.find(cntry => cntry.id == cityid).projects;
    alert(this.projects);
	}

}

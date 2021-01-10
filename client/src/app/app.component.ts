import { Component, OnInit, Input, TemplateRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from './_services/project.service';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


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
  projectsmain: any;
  model: any ={}

  frameworkComponents: any;
  rowDataClicked1 = {};
  rowDataClicked2 = {};

  constructor(private http: HttpClient,private projectservice: ProjectService,private modalService: BsModalService) {

    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    }
  }

  ngOnInit(){
    this.getProjects();
    this.getcountries();
  
  }

  getProjects() {

    this.http.get('https://localhost:5001/API/Projects').subscribe(response => {
     this.projectsmain = response;
     this.projects = response;
  }, error => {
     console.log(error);

  })
  }
  template: TemplateRef<any>;
  columnDefs = [
    { field: 'id' },
    { field: 'code' },
    { field: 'description' },
    { field: 'cityId'},
    { field: 'isActive'},
    { field: 'edit',
    cellRenderer: 'buttonRenderer',
    width: 20,
    cellRendererParams: {
      onClick: this.onBtnClick1.bind(this),
      label: 'Click 1'
    }
  },
  { field: 'delete',
   cellRenderer: 'buttonRenderer',
    width: 20,
    cellRendererParams: {
      onClick: this.onBtnClick2.bind(this),
      label: 'Click 2'
    }
  }
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
cityidval : any
states: Array<any>;

	cities: any;
	
	changeCountry(country) {
    console.log("hi");
    if(country != "--Choose Country--"){
    this.cities = this.countries.find(cntry => cntry.description == country).cities;}
    console.log(this.cities);
	}

	changeCity(cityval : any) {
    console.log(cityval);
    console.log(this.projectsmain);
    if(cityval.description != "--Choose City--"){
    this.model.cityId = cityval.id;
    this.projects = this.projectsmain.filter(cntry => cntry.cityId == cityval.id);
     //console.log(this.projects);
    }
  }
  
  addproject() {

    
    this.projectservice.createproject(this.model).subscribe(response => {
      console.log(response);
    }, error => {console.log(error);})

    //this.ngOnInit();
    window.location.reload();

  }

  editproject() {

    
    this.projectservice.putproject(this.model).subscribe(response => {
      console.log(response);
    }, error => {console.log(error);})



    this.show=false;

    //this.ngOnInit();
    window.location.reload();

  }

  



  modalRef: BsModalRef;
  show: boolean = true

  onBtnClick1(e) {
    this.rowDataClicked1 = e.rowData;
    this.model = this.rowDataClicked1;
    console.log(this.model);
    this.show = false;
    //this.modalRef = this.modalService.show();


  }
  
  onBtnClick2(e) {
    this.rowDataClicked2 = e.rowData;
    this.model = this.rowDataClicked2;
    console.log(this.model);
    this.projectservice.deleteproject(this.model).subscribe(response => {
      console.log(response);
    }, error => {console.log(error);})
   window.location.reload();
  }

}

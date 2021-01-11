import { Component, OnInit, Input, TemplateRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProjectService } from './_services/project.service';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


//import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { promise } from 'protractor';

import * as alertify from 'alertifyjs';

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
  myForm : any

 async  ngOnInit(){
    this.dbcalls()

   

    //console.log(this.projects);



    this.myForm = new FormGroup({
      nam: new FormControl(this.model, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  
  }

  CityName :any
   dbcalls()
  {
   this.getProjects().then(x => this.getcountries()).then
    ( x => {
      console.log('fgw'); var i
      this.projects.forEach( z => {
        //console.log(z.cityId);
       //this.cityformat = this.countries.filter(x => x.cities.id == y.cityId).cities

    //this.cityformat =  this.countries.filter(x => x.cities.find( y => y.id == (z.cityId))).cities;
      this.countries.forEach(x => {
      // console.log(x.cities);
        
        x.cities.forEach(y => {
          //console.log(y.id);
          if(z.cityId == y.id)
          {
            z.CityName = y.description;
            //console.log(this.projects.CityName);
          }
        });
      });
     
     // this.cityformat =  this.countries.filter(x => x.id == 1);
      //console.log(  this.cityformat);
      // this.projects.cityname = this.cityformat.description;
       
      }); //this.gridApi.refreshCells({  columnDefs: ['CityName'] });
      
      
    },(err) => console.error(err)
      );
    

   
  
  }

  getcityname(){

    this.projects.forEach( z => {
     
    this.countries.forEach(x => {
    
      x.cities.forEach(y => {
     
        if(z.cityId == y.id)
        {
          z.CityName = y.description;
       
        }
      });
    });
   
 
     
    }); 
  }

 getProjects() {
  return new Promise((resolve, reject) => {
    this.http.get('https://localhost:5001/API/Projects').subscribe(response => {
     this.projectsmain = response;
     this.projects = response;
     
     console.log('projects---');
     resolve();
  }, error => {
     console.log(error);
     reject();
  });
   
  
  });
}

   myCellRenderer (params) {
    return '<span style="color: ' + params.color + '">' + params.value + '</span>';
}


 cityValueGetter(params) {
  var name = 'tes'
  // params.countries.find(x => x == params.data.cityId);
  //this.cities.find(cntry => cntry.id == params.data.cityId).description;
  return name;
}

  template: TemplateRef<any>;
  columnDefs = [
    { field: 'id' },
    { field: 'code' },
    { field: 'description' },
    //{ field: 'cityId'},
    //{ field: 'CityName'},
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


cityformat : any = {}

private gridApi;
getSelectedRowData() {
	let selectedNodes = this.gridApi.getSelectedNodes();
	let selectedData = selectedNodes.map(node => node.data);
	alert(`Selected Nodes:\n${JSON.stringify(selectedData)}`);
    return selectedData;
}
countries : any
getcountries() {

  return new Promise((resolve, reject) => {
    
  this.http.get('https://localhost:5001/API/Countries').subscribe(response => {
    this.countries = response;
    //this.cities = this.countries.all.cities;
    var i = 0;
   /* this.projects.forEach( y => {
      console.log(y.cityId);
     this.cityformat = this.countries.find(x => x.cities.id == y.cityId).cities;
     this.projects.cityname = this.cityformat.description;
     i++;
    });*/
    
    //this.projects.cityformat = this.countries.filter(x => x.cities.id == this.projects.cityId).cities.description;
 
    console.log(this.countries);
  resolve();
 }, error => {
    console.log(error);
 reject();
 });
});
}

selectedCountry: String = "--Choose Country--";
cityidval : any
states: Array<any>;

  cities: any;
  search: any;

  searchby()
  {
    if(this.search != null){
    this.projects = this.projectsmain.filter(cntry => cntry.description.includes(this.search));
    }
  }
	
	changeCountry(country) {
    console.log("hi");
    if(country != "--Choose Country--"){
    this.cities = this.countries.find(cntry => cntry.description == country).cities;}
    else{
      this.projects = this.projectsmain;
      this.cityidval = "--Choose City--";
    }
    
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

    console.log("from addproject");
    this.projectservice.createproject(this.model).subscribe(response => {
      console.log(response); alertify.success('successfully added the project!');
     // window.location.reload();
     this.getProjects();
    
    }, error => {console.log(error);})

    //this.ngOnInit();
    //window.location.reload();

  }

  editproject() {

    
    this.projectservice.putproject(this.model).subscribe(response => {
      console.log(response);alertify.success('edited the record!');
     // window.location.reload();
     this.model = {};
     this.getProjects();
     this.cityidval =  "--Choose City--"
     this.show=true;
    }, error => {console.log(error);})



   

    //this.ngOnInit();
    //

  }

  



  modalRef: BsModalRef;
  show: boolean = true

  onBtnClick1(e) {
    
    this.rowDataClicked1 = e.rowData;
    this.model = this.rowDataClicked1;
    //this.cityidval =  this.model.cityId;
    console.log(this.model);
    this.show = false;
    //this.modalRef = this.modalService.show();


  }
  
  onBtnClick2(e) {
    this.rowDataClicked2 = e.rowData;
    this.model = this.rowDataClicked2;
    console.log(this.model);
    this.projectservice.deleteproject(this.model).subscribe(response => {
      alertify.error('Deleted!');
      this.cityidval =  "--Choose City--"
      this.model = {};
      this.getProjects();
      console.log(response);
    }, error => {console.log(error);alertify.error('Failed to Delete, retry!');})
   //window.location.reload();
  }

}

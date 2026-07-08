import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataStorageService } from './titleCase/data-storage.service';
import { CaseStudyService } from '../services/case-study/case-study.service';
import { KeyCloakService } from '../services/keycloak.service';



@Component({
  selector: 'app-case-study-tool',
  templateUrl: './case-study-tool.component.html',
  styleUrls: ['./case-study-tool.component.css']
})
export class CaseStudyToolComponent  implements OnInit{
  constructor(private translate: TranslateService,private dataStorageService: DataStorageService,private caseStudyService:CaseStudyService,private keycloakToken: KeyCloakService) {
    translate.setDefaultLang('EN');
  }

    ngOnInit(){
    this.caseStudyService.getCaseStudies().subscribe(data => this.caseStudiesReceived =JSON.parse(data));
    // console.log(this.caseStudiesReceived);
    // console.log(typeof(this.caseStudiesReceived));

      // const thekeycloakToken =this.keycloakToken.getToken().then(data => console.log(data));
      // console.log(typeof(thekeycloakToken));

    
  }

  checkTrentinoSwitch(value: string): string {
  return value === 'CS2 Trento' ? 'CS2 Trentino' : value;
}

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  selected_title_case: string = '';
  

  caseName_1: string = 'CS1- Crete'


  routeForCS1: string = 'CS1-Crete_Island';
  routeForCS2: string = 'CS2-Trentino_region';
  routeForCS3: string = 'CS3-Norrbotten_country';
  routeForCS4: string = 'CS4-Murcia_region';
  routeForCS5: string = 'CS5-Danube_delta';

  enabledButton: boolean = true;

  selectedCaseRoute: string = '';

  choosingCase(value: string) {
    return value;
  }

  theChosedCase(value: string) {
    // this.selectedCaseRoute = this.choosingCase(value);
    this.selected_title_case = this.choosingCase(value);
    console.log(`You chose: ${value}`);
    console.log(this.selected_title_case);
    console.log(typeof(this.selected_title_case))
    // console.log(this.selectedCaseRoute);
    this.enabledButton = false;
  }

  // case_title_selected() {
  //   if (this.selected_title_case == "CS1") {
  //     this.selectedCaseRoute == 'CS1-Crete_Island';
  //     console.log(this.selectedCaseRoute);
  //   } else if (this.selected_title_case == 'CS1') {
  //     this.selectedCaseRoute = 'CS2-Trentino_region';
  //     console.log(this.selectedCaseRoute);
  //   } else if (this.selected_title_case == 'CS3-Norrbotten_country') {
  //     this.selectedCaseRoute = 'CS3-Norrbotten_country';
  //     console.log(this.selectedCaseRoute);
  //   } else if (this.selected_title_case == 'CS4-Murcia_region') {
  //     this.selectedCaseRoute = 'CS4-Murcia_region';
  //     console.log(this.selectedCaseRoute);
  //   }
  //   else if (this.selected_title_case == 'CS5-Danube_delta') {
  //     this.selectedCaseRoute = 'CS5_DANUBE_DELTA';
  //     console.log(this.selectedCaseRoute);
  //   }
  //   console.log("hi");
  //   console.log(this.selected_title_case);
  //   this.dataStorageService.setSelectedTitleCase(this.selected_title_case);
  //   console.log(this.selectedCaseRoute);
  // }


  case_title_selected() {
    if (this.selected_title_case == 'CS1 Sitia') {
      this.selected_title_case = 'CS1_CRETE_ISLAND';
      this.selectedCaseRoute = 'CS1-Crete_Island';
      console.log(this.selectedCaseRoute);
    } else if (this.selected_title_case == 'CS2 Trento') {
      this.selectedCaseRoute = 'CS2-Trentino_region';
      this.selected_title_case = 'CS2_TRENTINO_REGION';

      console.log(this.selectedCaseRoute);
    } else if (this.selected_title_case == 'CS3 Norrbotten') {
      this.selectedCaseRoute = 'CS3-Norrbotten_country';
      this.selected_title_case = 'CS3_NORRBOTTEN_COUNTRY';

      console.log(this.selectedCaseRoute);
    } else if (this.selected_title_case == 'CS4 Murcia') {
      this.selectedCaseRoute = 'CS4-Murcia_region';
      this.selected_title_case = 'CS4_MURCIA_REGION';

      console.log(this.selectedCaseRoute);
    }
    else if (this.selected_title_case == 'CS5 Tulcea') {
      this.selectedCaseRoute = 'CS5-Danube_delta';
      this.selected_title_case = 'CS5_DANUBE_DELTA';

      console.log(this.selectedCaseRoute);
    }
    // console.log("hi");
    // console.log(this.selected_title_case);
    this.dataStorageService.setSelectedTitleCase(this.selected_title_case);
    // console.log(this.selectedCaseRoute);
  }

  caseStudyTitleDisplayed(){
    return this.selected_title_case;
  }

caseNameByCode:string='';

checkCaseCode(code:string){
   if (code == 'CS1') {
    this.caseNameByCode = 'CS1 Sitia';
    } else if (code == 'CS2') {
    this.caseNameByCode = 'CS2 Trento';

    } else if (code == 'CS3') {
    this.caseNameByCode = 'CS3 Norrbotten';

    } else if (code == 'CS4') {
    this.caseNameByCode = 'CS4 Murcia';

    }
    else if (code == 'CS5') {
    this.caseNameByCode = 'CS5 Tulcea';

    }
  }


  message:string ="";
  caseStudiesReceived:any  = [];


  // ngAfterViewInit(){
  //   console.log(this.caseStudiesReceived);

  // }

  showType(code:string){
    console.log(typeof(code))
  }

selectedCase:string = "";
imageList = ["assets/images/cs1-case-image.jpg", "assets/images/cs2-case-image.jpg", "assets/images/cs3-case-image.jpg","assets/images/cs4-case-image.jpg", "assets/images/cs5-case-image.jpg"]

}


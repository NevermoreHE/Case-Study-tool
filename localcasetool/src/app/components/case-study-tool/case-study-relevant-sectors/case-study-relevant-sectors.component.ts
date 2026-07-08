import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SectorsService } from '../../services/sectors/sectors.service';
import { DataStorageService } from '../titleCase/data-storage.service';

@Component({
  selector: 'app-case-study-relevant-sectors',
  templateUrl: './case-study-relevant-sectors.component.html',
  styleUrls: ['./case-study-relevant-sectors.component.css']
})
export class CaseStudyRelevantSectorsComponent {
title_case: string = '';
title_case_url:string ='';
  selectedTitleCase: string = '';
  selectedSectorData: string = '';

  constructor(private translate: TranslateService,private dataStorageService: DataStorageService,private sectorService:SectorsService) {
    translate.setDefaultLang('EN');
  }

sectorsReceived :any[] = [];
the_title_case:string = '';

  ngOnInit(): void {
    this.selectedSectorData = this.dataStorageService.getSelectedSector();
    // this.the_title_case = this.dataStorageService.getTitleCase();
    // console.log(this.the_title_case);
    console.log(this.selectedSectorData);
    this.selectedTitleCase = this.dataStorageService.getSelectedTitleCase();
    console.log("Selected Title Case from service:", this.selectedTitleCase); 
    this.sectorService.getSectorsForSpecificCaseStudy(this.selectedTitleCase).subscribe(data => this.sectorsReceived =JSON.parse(data));
 
    //  if (this.selectedTitleCase == 'CS1_CRETE_ISLAND') {
    //   this.title_case = 'CS1-Crete_Island';
    // } else if (this.selectedTitleCase == 'CS2_TRENTINO_REGION') {
    //   this.title_case = 'CS2-Trentino_region';
    // } else if (this.selectedTitleCase == 'CS3_NORRBOTTEN_COUNTRY') {
    //   this.title_case = 'CS3-Norrbotten_country';
    // } else if (this.selectedTitleCase == 'CS4_MURCIA_REGION') {
    //   this.title_case = 'CS4-Murcia_region';
    // } else if (this.selectedTitleCase == 'CS5_DANUBE_DELTA') {
    //   this.title_case = 'CS5-Danube_delta';
    // }

         if (this.selectedTitleCase == 'CS1_CRETE_ISLAND') {
      this.title_case = 'CS1 - Sitia Municipality';
      this.title_case_url = 'CS1-Crete_Island';
    } else if (this.selectedTitleCase == 'CS2_TRENTINO_REGION') {
      this.title_case = 'CS2 - Trentino Province';
      this.title_case_url = 'CS2-Trentino_province';
    } else if (this.selectedTitleCase == 'CS3_NORRBOTTEN_COUNTRY') {
      this.title_case = 'CS3 - Norrbotten County';
      this.title_case_url = 'CS3-Norrbotten_country';
    } else if (this.selectedTitleCase == 'CS4_MURCIA_REGION') {
      this.title_case = 'CS4 - Murcia Region';
      this.title_case_url = 'CS4-Murcia_region';
    } else if (this.selectedTitleCase == 'CS5_DANUBE_DELTA') {
      this.title_case = 'CS5 - Danube Delta';
      this.title_case_url = 'CS5-Danube_delta';
    }

    // this.title_case = "/" +this.title_case;
        this.title_case = this.title_case;

    console.log(this.title_case);
  }
  





  switchLanguage(language: string) {
    this.translate.use(language);
  }

  defaultSector:string = 'INDUSTRY';
  the_main_challenges = this.sectorService.getChallengesForChosedSector(this.defaultSector).subscribe(data => this.main_challenges_list =JSON.parse(data));



  selectSectorForInfo: string = '';

  image_source: string[] = [];

  specific_challenges: any = [];

  choosingSector(value: string) {
    return value;
  }

  //in functie de ce se va alege ca sector sa vor afisa provocarile concludente 
  //nu conteaza cum se coreleaaza scrisul cu imageinea deoarece la acest moment este totul hardcodat

  main_challenges_list:string[] = [];


theSelectedSector:string = '';

  chosedSector(value: string) {
    this.selectSectorForInfo = this.choosingSector(value);
    console.log(this.selectSectorForInfo);

    if(this.selectSectorForInfo == "Industry and commerce"){
      this.selectSectorForInfo = "INDUSTRY";
    }else if(this.selectSectorForInfo == "Energy"){
      this.selectSectorForInfo = "ENERGY";
    }else if(this.selectSectorForInfo == "Agriculture, forest and fishing"){
      this.selectSectorForInfo = "AGRICULTURE";
    }else if(this.selectSectorForInfo == "Water and waste"){
      this.selectSectorForInfo = "WATER";
    }else if(this.selectSectorForInfo == "Tourism, leisure and cultural heritage"){
      this.selectSectorForInfo = "TOURISM";
    }
    this.sectorService.getChallengesForChosedSector(this.selectSectorForInfo).subscribe(data => this.main_challenges_list =JSON.parse(data));
    console.log(this.the_main_challenges);
    console.log("You chose this sector: " , this.selectSectorForInfo);
    return this.selectSectorForInfo;
  }

  
image_for_challenge:string ='';
challenge_name:string = '';
challenge_selected:string = '';

imagesForChallenges(challenge_selected:string){
  this.challenge_name = challenge_selected;
  if (this.challenge_name == "Manage the loss of biodiversity"){
    this.image_for_challenge = "/assets/images/biodiversity_loss_icon.png"
  }else if (this.challenge_name == "Better water management"){
    this.image_for_challenge = "/assets/images/water_management_img.png"
  }else if (this.challenge_name == "Adjustment and preparation for changing water level"){
    this.image_for_challenge = "assets/images/water_level_management_icon.png"
  }else if (this.challenge_name == "Barriers for droughts focus on infrastructures"){
    this.image_for_challenge = "/assets/images/draught_focus_img.png"
  }
  // console.log("You have the challenge:", this.challenge_name)
  // console.log("challenge: ",challenge_selected)
  // console.log("Your path for image:",this.image_for_challenge)
  return this.image_for_challenge
}

checkChallenge(challenger:string){
  console.log(challenger)
}

  selectedSector: string = '';
  selectedChallenge: string = '';

  selectTheSector(sector: string) {
    this.selectedSector = sector;
    console.log(this.selectedSector)
  }

  selectTheChallenge(challenge: string) {
    this.selectedChallenge = challenge;
    console.log(this.selectedChallenge);
  }

  enableNextButton: boolean = true;

  checkNeddedSelections(){
    if(this.selectedSector!=''  &&  this.selectedChallenge != '' ){
      this.enableNextButton = false;
    }

  }


  image_for_sector:string = '';

  imagesForSectors(sector:string){
    console.log(sector);
    if(sector == "Agriculture, forest and fishing"){
      this.image_for_sector = "assets/images/murcia-agriculture-sector.png";
    }else if(sector == "Energy"){
      this.image_for_sector = "assets/images/energy_expert.png";
    }else if(sector == "Water and waste"){
      this.image_for_sector = "assets/images/murcia-water-sector.png";
    }else if(sector == "Tourism, leisure and cultural heritage"){
      this.image_for_sector = "assets/images/murcia-turism-sector.png";
    }
    return this.image_for_sector;
  }

  

}

import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CaseStudyToolComponent } from '../../case-study-tool.component';
import { DataStorageService } from '../../titleCase/data-storage.service';
import { SectorsService } from 'src/app/components/services/sectors/sectors.service';

@Component({
  selector: 'app-general-description',
  templateUrl: './general-description.component.html',
  styleUrls: ['./general-description.component.css'],
})
export class GeneralDescriptionComponent implements OnInit{

  selectedTitleCase: string = '';

  constructor(private translate: TranslateService,private dataStorageService: DataStorageService,private sectorService:SectorsService) {
    translate.setDefaultLang('EN');
  }

sectorsReceived :any[] = [];

theRoutingTitleCase:string = '';

  ngOnInit(): void {
    this.selectedTitleCase = this.dataStorageService.getSelectedTitleCase();
    console.log("Selected Title Case from service:", this.selectedTitleCase); 
    this.sectorService.getSectorsForSpecificCaseStudy(this.selectedTitleCase).subscribe(data => this.sectorsReceived =JSON.parse(data));


            if(this.selectedTitleCase == "CS1_CRETE_ISLAND"){
      this.theRoutingTitleCase = "CS1-Crete_Island";
    }else if(this.selectedTitleCase == "CS2_TRENTINO_REGION"){
      this.theRoutingTitleCase = "CS2-Trentino_region";
    }else if(this.selectedTitleCase == "CS3_NORRBOTTEN_COUNTRY"){
      this.theRoutingTitleCase = "CS3-Norrbotten_country";
    }else if(this.selectedTitleCase == "CS4_MURCIA_REGION"){
      this.theRoutingTitleCase = "CS4-Murcia_region";
    }else if(this.selectedTitleCase == "CS5_DANUBE_DELTA"){
      this.theRoutingTitleCase = "CS5-Danube_delta";
    }
  }





  switchLanguage(language: string) {
    this.translate.use(language);
  }

  the_main_challenges: string[] = [];

  selectSectorForInfo: string = '';

  // sector_list = [
  //   {
  //     the_sector: 'AGRICULTURE_FORESTRY_AND_FISHING',
  //   },
  //   {
  //     the_sector: 'WATER_AND_WASTE',
  //   },
  //   {
  //     the_sector: 'INDUSTRY_AND_COMMERCE',
  //   },
  //   {
  //     the_sector: 'TOURISM',
  //   },
  //   {
  //     the_sector: 'ENERGY'
  //   }
  // ]


  image_source: string[] = [];

  specific_challenges: any = [];

  choosingSector(value: string) {
    return value;
  }

  //in functie de ce se va alege ca sector sa vor afisa provocarile concludente 
  //nu conteaza cum se coreleaaza scrisul cu imageinea deoarece la acest moment este totul hardcodat

  main_challenges_list:string[] = [];




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


};
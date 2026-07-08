import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataStorageService } from '../titleCase/data-storage.service';
import { SectorsService } from '../../services/sectors/sectors.service';

@Component({
  selector: 'app-case-study-challenges-sectors',
  templateUrl: './case-study-challenges-sectors.component.html',
  styleUrls: ['./case-study-challenges-sectors.component.css'],
})
export class CaseStudyChallengesSectorsComponent implements OnInit {
  title_case: string = '';

  selectedTitleCase: string = '';

  constructor(
    private translate: TranslateService,
    private dataStorageService: DataStorageService,
    private sectorService: SectorsService
  ) {
    translate.setDefaultLang('EN');
  }

  sectorsReceived: any[] = [];

  ngOnInit(): void {
    this.selectedTitleCase = this.dataStorageService.getSelectedTitleCase();
    console.log('Selected Title Case from service:', this.selectedTitleCase);
    this.sectorService
  .getSectorsForSpecificCaseStudy(this.selectedTitleCase)
  .subscribe((data) => {
    const sectors = JSON.parse(data);

    this.sectorsReceived = sectors.map((s: string) => {
      if (s === 'Water and waste') return 'Water and wastewater';
      return s;
      
    });
     console.log('Sectors received:', this.sectorsReceived);
  });

      
    if (this.selectedTitleCase == 'CS1_CRETE_ISLAND') {
      this.title_case = 'CS1-Crete_Island';
    } else if (this.selectedTitleCase == 'CS2_TRENTINO_REGION') {
      this.title_case = 'CS2-Trentino_region';
    } else if (this.selectedTitleCase == 'CS3_NORRBOTTEN_COUNTRY') {
      this.title_case = 'CS3-Norrbotten_country';
    } else if (this.selectedTitleCase == 'CS4_MURCIA_REGION') {
      this.title_case = 'CS4-Murcia_region';
    } else if (this.selectedTitleCase == 'CS5_DANUBE_DELTA') {
      this.title_case = 'CS5-Danube_delta';
    }
    this.title_case = '/' + this.title_case;
    console.log(this.title_case);
  }

  main_challenges_for_sitia = [{ challenge_image: '/assets/images/cs1-sitia-water-challenge.png', challenge_name: "Maintain sufficient and sustainable freshwater resources,of high environmental quality" },
    { challenge_image: '/assets/images/cs1-sitia-fire-awarness.png', challenge_name: 'Awareness and management of fires' },
    { challenge_image: '/assets/images/cs1-sitia-economic-models.png', challenge_name: 'Change or create new socio-economic models' },

  ];

  main_challenges_for_trentino=[{ challenge_image:'/assets/images/cs2-cultural-change-image.png',challenge_name:'Collective cultural change that can trigger personal and general awareness of climate change issues'},
    { challenge_image:'/assets/images/cs2-economic-models-image.png',challenge_name:'Redefinition of transformation of socio-economic models'},
    { challenge_image:'/assets/images/cs2-energy-efficiency.png',challenge_name:'Increasing energy efficiency'},
    { challenge_image:'/assets/images/cs2-ski-resort-image.png',challenge_name:'Ski resorts more resilient to climate change and becoming efficiency in terms of energy consumption'},
    { challenge_image:'/assets/images/cs2-sustainable-way-of-moving-image.png',challenge_name:'New and sustainable way of moving around the area'}
  ];

  main_challenges_for_norbotten=[{ challenge_image:'/assets/images/cs3-biodiversity-loss.png',challenge_name:'Manage the loss of biodiversity'},
    { challenge_image:'/assets/images/cs3-better-water-management.png',challenge_name:'Better water management'},
    { challenge_image:'/assets/images/cs3-reindeer-herding-image.png',challenge_name:'Reindeer herding'},
    { challenge_image:'/assets/images/cs2-energy-efficiency.png',challenge_name:'Manage the demand for increased production of renewable energy at the expense of other interest'},
  ];

  main_challenges_for_murcia=[];

  main_challenges_for_danube=[{ challenge_image:'/assets/images/cs5-biodiversity-challenge.png',challenge_name:'Manage the loss of biodiversity'},
    { challenge_image:'/assets/images/cs3-better-water-management.png',challenge_name:'Better water management'},
    { challenge_image:'/assets/images/cs5-changing-water-level.png',challenge_name:'Adjustment and preparation for changing water level'},
    { challenge_image:'/assets/images/cs5-barriers-for-draughts.png',challenge_name:'Barriers for droughts focus on infrastructures'},
  ];
  switchLanguage(language: string) {
    this.translate.use(language);
  }

  defaultSector: string = 'INDUSTRY';
  the_main_challenges = this.sectorService
    .getChallengesForChosedSector(this.defaultSector)
    .subscribe((data) => (this.main_challenges_list = JSON.parse(data)));

  selectSectorForInfo: string = '';

  image_source: string[] = [];

  specific_challenges: any = [];

  choosingSector(value: string) {
    return value;
  }

  //in functie de ce se va alege ca sector sa vor afisa provocarile concludente
  //nu conteaza cum se coreleaaza scrisul cu imageinea deoarece la acest moment este totul hardcodat

  main_challenges_list: string[] = [];

  theSelectedSector: string = '';

  chosedSector(value: string) {
    this.selectSectorForInfo = this.choosingSector(value);
    console.log(this.selectSectorForInfo);

    if (this.selectSectorForInfo == 'Industry and commerce') {
      this.selectSectorForInfo = 'INDUSTRY';
    } else if (this.selectSectorForInfo == 'Energy') {
      this.selectSectorForInfo = 'ENERGY';
    } else if (this.selectSectorForInfo == 'Agriculture, forest and fishing') {
      this.selectSectorForInfo = 'AGRICULTURE';
    } else if (
  this.selectSectorForInfo == 'Water and waste' ||
  this.selectSectorForInfo == 'Water and wastewater'
) {
  this.selectSectorForInfo = 'WATER';
} else if (
      this.selectSectorForInfo == 'Tourism, leisure and cultural heritage'
    ) {
      this.selectSectorForInfo = 'TOURISM';
    }
    this.sectorService
      .getChallengesForChosedSector(this.selectSectorForInfo)
      .subscribe((data) => (this.main_challenges_list = JSON.parse(data)));
    console.log(this.the_main_challenges);
    console.log('You chose this sector: ', this.selectSectorForInfo);
    return this.selectSectorForInfo;
  }

  image_for_challenge: string = '';
  challenge_name: string = '';
  challenge_selected: string = '';

  imagesForChallenges(challenge_selected: string) {
    this.challenge_name = challenge_selected;
    if (this.challenge_name == 'Manage the loss of biodiversity') {
      this.image_for_challenge = '/assets/images/biodiversity_loss_icon.png';
    } else if (this.challenge_name == 'Better water management') {
      this.image_for_challenge = '/assets/images/water_management_img.png';
    } else if (
      this.challenge_name ==
      'Adjustment and preparation for changing water level'
    ) {
      this.image_for_challenge =
        'assets/images/water_level_management_icon.png';
    } else if (
      this.challenge_name == 'Barriers for droughts focus on infrastructures'
    ) {
      this.image_for_challenge = '/assets/images/draught_focus_img.png';
    }
    // console.log("You have the challenge:", this.challenge_name)
    // console.log("challenge: ",challenge_selected)
    // console.log("Your path for image:",this.image_for_challenge)
    return this.image_for_challenge;
  }

  checkChallenge(challenger: string) {
    console.log(challenger);
  }

  selectedSector: string = '';
  selectedChallenge: string = '';
  check: string = '';

  selectTheSector(sector: string) {
    this.selectedSector = sector;
    console.log(this.selectedSector);

    console.log('Sector chosed:', sector);
  }

  chooseSector(sector: string) {
    this.dataStorageService.setSelectedSector(sector);
    console.log(
      'From serverice:',
      this.dataStorageService.getSelectedSector(),
      'pause'
    );
    // this.dataStorageService.setSelectedTitleCase(this.title_case);
  }

  selectTheChallenge(challenge: string) {
    this.selectedChallenge = challenge;
    console.log(this.selectedChallenge);
  }

  enableNextButton: boolean = true;

  checkNeddedSelections() {
    if (this.selectedSector != '' && this.selectedChallenge != '') {
      this.enableNextButton = false;
    }
  }

  image_for_sector: string = '';

  imagesForSectors(sector: string) {
    // console.log(sector);
    if (sector == 'Agriculture, forest and fishing') {
      this.image_for_sector = 'assets/images/murcia-agriculture-sector.png';
    } else if (sector == 'Energy') {
      this.image_for_sector = 'assets/images/energy-sector.png';
   } else if (sector == 'Water and waste' || sector == 'Water and wastewater') {
  this.image_for_sector = 'assets/images/murcia-water-sector.png';
}else if (sector == 'Tourism, leisure and cultural heritage') {
      this.image_for_sector = 'assets/images/murcia-turism-sector.png';
    }else if (sector == 'biodiversity'){
      this.image_for_sector = 'assets/images/cs1-biodiversity.png'
    }else if (sector == 'mining'){
      this.image_for_sector = 'assets/images/mining-image.png'
    }else if (sector == 'Industry and commerce'){
      this.image_for_sector = 'assets/images/industry-image-sector.png'
    }
    return this.image_for_sector;
  }
}

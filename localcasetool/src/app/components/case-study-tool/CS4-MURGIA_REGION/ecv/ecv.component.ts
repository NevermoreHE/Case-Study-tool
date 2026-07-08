import {AfterViewInit,Component,OnInit,ViewChild,ElementRef,AfterViewChecked, OnDestroy,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataStorageService } from '../../titleCase/data-storage.service';
import { ChangeDetectorRef } from '@angular/core'; // Import ChangeDetectorRef
import {Chart as ChartJS,CategoryScale,LinearScale,LineElement,PointElement,Title,Tooltip,Legend, BarElement, BarController,  LineController, } from 'chart.js';
import { Chart } from 'chart.js';
import { HazardsService } from 'src/app/components/services/hazards/hazards.service';
import { ChartDataServiceService } from 'src/app/components/services/chartService/chart-data-service.service';
import { forkJoin } from 'rxjs';

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale,LineElement, PointElement, Title, Tooltip, Legend,BarController,  LineController  )
@Component({
  selector: 'app-ecv',
  templateUrl: './ecv.component.html',
  styleUrls: ['./ecv.component.css'],
})
export class ECVComponent
  implements OnInit, AfterViewInit, OnDestroy
{


chartReady = false;

popupOpen = false;
popupTitle = '';
popupRows: { year: string; value: any }[] = [];

  selectedVariable: string = '';
  selectedScenario: string = '';
  defaultChart: boolean = true;
  showWindSpeedChart: boolean = false;
  showTemperatureChart: boolean = false;

  selectedTitleCase: string = '';
  @ViewChild('myChart') myChartElement!: ElementRef;
  @ViewChild('myDefaultChart') defaultChartElement!: ElementRef;
  @ViewChild('myWindSpeedChart') myWindSpeedChartElement!: ElementRef;


  selectedChart: string = '';

  chart: Chart | undefined;

  isDefaultChartRendered = false;
  isTemperatureChartRendered = false;
  isWindSpeedChartRendered = false;


  constructor(
    private translate: TranslateService,
    private dataStorageService: DataStorageService,
    private hazardService: HazardsService,
    private chartService: ChartDataServiceService,
    private cdr: ChangeDetectorRef 

  ) {
    translate.setDefaultLang('EN');
  }

  caseId: string = '';
theRoutingTitleCase:string = '';
  ngOnInit(): void {
    this.selectedTitleCase = this.dataStorageService.getSelectedTitleCase();
    console.log('Selected Title Case from service:', this.selectedTitleCase);
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
    

    

     if(this.selectedTitleCase == "CS1_CRETE_ISLAND"){
      this.displayableTitleCase = "CS1 - Sitia municipality";
    }else if(this.selectedTitleCase == "CS2_TRENTINO_REGION"){
      this.displayableTitleCase = "CS2 - Trentino Municipality";
    }else if(this.selectedTitleCase == "CS3_NORRBOTTEN_COUNTRY"){
      this.displayableTitleCase = "CS3 - Norrbotten County";
    }else if(this.selectedTitleCase == "CS4_MURCIA_REGION"){
      this.displayableTitleCase = "CS4 - Murcia Region";
    }else if(this.selectedTitleCase == "CS5_DANUBE_DELTA"){
      this.displayableTitleCase = "CS5 - Danube Delta";
    }

       if(this.selectedTitleCase == "CS1_CRETE_ISLAND"){
      this.caseId = "CS1";
    }else if(this.selectedTitleCase == "CS2_TRENTINO_REGION"){
      this.caseId = "CS2";
    }else if(this.selectedTitleCase == "CS3_NORRBOTTEN_COUNTRY"){
      this.caseId = "CS3";
    }else if(this.selectedTitleCase == "CS4_MURCIA_REGION"){
      this.caseId = "CS4";
    }else if(this.selectedTitleCase == "CS5_DANUBE_DELTA"){
      this.caseId = "CS5";
    }
    // this.caseId = "CS5";
      console.log(this.rezValueReceivedForChart);
      console.log(this.yearsReceivedForChart);
    this.hazardService
      .getSpecificHazardsForSelectedCaseStudy(this.selectedTitleCase)
      .subscribe((data) => (this.hazardsReceived = JSON.parse(data)));

    // this.getTestRezValue('CS2', 'PREC', 'ssp245', 'ACCESS-CM2');
    // this.getYearsValue('CS2', 'PREC', 'ssp245', 'ACCESS-CM2');

      // Fetch years first
  console.log("NgOnInit  years: ")

  
    
  }


  ngAfterViewInit(): void {

}

    displayableTitleCase:string = ''


  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
      console.log('Chart destroyed');
    }
  }
  

yearsRendered = false;
rezValuesRendered = false;

getYearsValue() {
  if (!this.caseId) return;

  const variable = this.selectedVariable || 'PREC';
  const scenario = this.selectedScenario || 'ssp245';

  this.chartService
    .getYearsForSelectedChartAndCaseStudy(this.caseId, variable, scenario, 'ACCESS-CM2')
    .subscribe({
      next: (response: string[]) => {
        this.yearsReceivedForChart = response;
        console.log('Years value:', this.yearsReceivedForChart);
      },
      error: (err) => console.error('Error fetching data:', err),
    });
}


corraRezValue:any = [];
HadGEM3_GC31_LLRezValue:any=[];
EC_Earth3_Veg_LRRezValue:any = [];
MIROC6RezValue:any = [];
CNRM_ESM2_1RezValue:any = [];
CESM2RezValue:any = [];
IPSL_CM6A_LRRezValue:any = [];
NorESM2_MMRezValue:any = [];
ACCESS_CM2RezValue:any = [];


getRezValueForCorra(caseId:string,ecvCode:string,scenarioCode:string,modelName:string) {
  // console.log("Case id used: ",caseId);
  // console.log("Ecv Variable used: ",ecvCode);
  // console.log("Scenario Code: ",scenarioCode);
  // console.log("Model name used: ",modelName);
  this.chartService.getcerraRezValue(caseId, ecvCode, scenarioCode)
    .subscribe({
      next: (response: string[]) => {
        this.corraRezValue = response;
        // console.log("Rez value for Corra:", this.corraRezValue);

      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
    return this.corraRezValue;
}


getRezValueForHadGEM3(caseId:string,ecvCode:string,scenarioCode:string,modelName:string) {
  //   console.log("Case id used: ",caseId);
  // console.log("Ecv Variable used: ",ecvCode);
  // console.log("Scenario Code: ",scenarioCode);
  // console.log("Model name used: ",modelName);
  this.chartService.getHadGEM3_GC31_LLRezValue(caseId, ecvCode, scenarioCode)
    .subscribe({
      next: (response: string[]) => {
        this.HadGEM3_GC31_LLRezValue = response;
        // console.log("Rez value for HadGEM3:", this.HadGEM3_GC31_LLRezValue);
      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
    return this.HadGEM3_GC31_LLRezValue;
}

getRezValueForEC_Earth3_Veg_LRRezValue(caseId:string,ecvCode:string,scenarioCode:string,modelName:string) {
  //   console.log("Case id used: ",caseId);
  // console.log("Ecv Variable used: ",ecvCode);
  // console.log("Scenario Code: ",scenarioCode);
  // console.log("Model name used: ",modelName);
  this.chartService.getEC_Earth3_Veg_LRRezValue(caseId, ecvCode, scenarioCode)
    .subscribe({
      next: (response: string[]) => {
        this.EC_Earth3_Veg_LRRezValue = response;
        // console.log("Rez value for EC_Earth3_Veg_LRRezValue:", this.EC_Earth3_Veg_LRRezValue);
      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
    return this.EC_Earth3_Veg_LRRezValue;
}

getRezValueForMIROC6RezValue(caseId:string,ecvCode:string,scenarioCode:string,modelName:string) {
  //   console.log("Case id used: ",caseId);
  // console.log("Ecv Variable used: ",ecvCode);
  // console.log("Scenario Code: ",scenarioCode);
  // console.log("Model name used: ",modelName);
  this.chartService.getMIROC6RezValue(caseId, ecvCode, scenarioCode)
    .subscribe({
      next: (response: string[]) => {
        this.MIROC6RezValue = response;
        // console.log("Rez value for MIROC6RezValue:", this.MIROC6RezValue);
      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
    return this.MIROC6RezValue;
}

getRezValueForCNRM_ESM2_1RezValue(caseId:string,ecvCode:string,scenarioCode:string,modelName:string) {
  //   console.log("Case id used: ",caseId);
  // console.log("Ecv Variable used: ",ecvCode);
  // console.log("Scenario Code: ",scenarioCode);
  // console.log("Model name used: ",modelName);
  this.chartService.getCNRM_ESM2_1RezValue(caseId, ecvCode, scenarioCode)
    .subscribe({
      next: (response: string[]) => {
        this.CNRM_ESM2_1RezValue = response;
        // console.log("Rez value for CNRM_ESM2_1RezValue:", this.CNRM_ESM2_1RezValue);
      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
    return this.CNRM_ESM2_1RezValue;
}

getRezValueForCESM2RezValue(caseId:string,ecvCode:string,scenarioCode:string,modelName:string) {
  //   console.log("Case id used: ",caseId);
  // console.log("Ecv Variable used: ",ecvCode);
  // console.log("Scenario Code: ",scenarioCode);
  // console.log("Model name used: ",modelName);
  this.chartService.getCESM2RRezValue(caseId, ecvCode, scenarioCode)
    .subscribe({
      next: (response: string[]) => {
        this.CESM2RezValue = response;
        // console.log("Rez value for CESM2RezValue:", this.CESM2RezValue);
      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
    return this.CESM2RezValue;
}

getRezValueForIPSL_CM6A_LRRezValue(caseId:string,ecvCode:string,scenarioCode:string,modelName:string) {
  //   console.log("Case id used: ",caseId);
  // console.log("Ecv Variable used: ",ecvCode);
  // console.log("Scenario Code: ",scenarioCode);
  // console.log("Model name used: ",modelName);
  this.chartService.getIPSL_CM6A_LRRezValue(caseId, ecvCode, scenarioCode)
    .subscribe({
      next: (response: string[]) => {
        this.IPSL_CM6A_LRRezValue = response;
        // console.log("Rez value for IPSL_CM6A_LRRezValue:", this.IPSL_CM6A_LRRezValue);
      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
    return this.IPSL_CM6A_LRRezValue;
}

getRezValueForNorESM2_MMRezValue(caseId:string,ecvCode:string,scenarioCode:string,modelName:string) {
  //   console.log("Case id used: ",caseId);
  // console.log("Ecv Variable used: ",ecvCode);
  // console.log("Scenario Code: ",scenarioCode);
  // console.log("Model name used: ",modelName);
  this.chartService.getNorESM2_MMRezValue(caseId, ecvCode, scenarioCode)
    .subscribe({
      next: (response: string[]) => {
        this.NorESM2_MMRezValue = response;
        // console.log("Rez value for NorESM2_MMRezValue:", this.NorESM2_MMRezValue);
      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
    return this.NorESM2_MMRezValue;
}



getRezValueForACCESS_CM2RezValue(caseId:string,ecvCode:string,scenarioCode:string,modelName:string) {
  //   console.log("Case id used: ",caseId);
  // console.log("Ecv Variable used: ",ecvCode);
  // console.log("Scenario Code: ",scenarioCode);
  // console.log("Model name used: ",modelName);
  this.chartService.getACCESS_CM2RezValue(caseId, ecvCode, scenarioCode)
    .subscribe({
      next: (response: string[]) => {
        this.ACCESS_CM2RezValue = response;
        // console.log("Rez value for ACCESS_CM2RezValue:", this.ACCESS_CM2RezValue);
      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
    return this.ACCESS_CM2RezValue;
}


models = [
  'HadGEM3-GC31-LL',
  'CERRA',
  'EC-Earth3-Veg-LR',
  'MIROC6',
  'CNRM-ESM2-1',
  'CESM2',
  'IPSL-CM6A-LR',
  'NorESM2-MM',
  'ACCESS-CM2',
];

modelColors: Record<string, string> = {
  'HadGEM3-GC31-LL': 'rgba(75, 192, 192, 1)',
  'CERRA': 'rgba(192, 79, 75, 1)',
  'EC-Earth3-Veg-LR': 'rgba(147, 192, 75, 1)',
  'MIROC6': 'rgba(75, 87, 192, 1)',
  'CNRM-ESM2-1': 'rgba(192, 75, 178, 1)',
  'CESM2': 'rgba(180, 192, 75, 1)',
  'IPSL-CM6A-LR': 'rgba(240, 188, 0, 1)',
  'NorESM2-MM': 'rgba(237, 149, 210, 1)',
  'ACCESS-CM2': 'rgba(75, 192, 159, 1)',
};

ecvUnits: Record<string, string> = {
  PREC: 'mm',
  PREC_MAX: 'mm',
  TEMP: '°C',
  TEMP_MIN: '°C',
  TEMP_MAX: '°C',
  WIND: 'm/s',
};

getYAxisUnit(): string {
  return this.ecvUnits[this.selectedVariable] ?? '';
}

getYAxisTitle(): string {
  const unit = this.getYAxisUnit();
  return unit ? `Value (${unit})` : 'Value';
}

selectedModels: Set<string> = new Set(); // default: none selected
toggleModel(model: string, checked: boolean) {
  if (checked) this.selectedModels.add(model);
  else this.selectedModels.delete(model);

  this.applyModelVisibilityToChart();
}

isModelSelected(model: string): boolean {
  return this.selectedModels.has(model);
}

private applyModelVisibilityToChart() {
  if (!this.chart) return;

  this.chart.data.datasets.forEach((ds: any, idx: number) => {
    const shouldShow = this.selectedModels.has(ds.label);
    // setDatasetVisibility expects "true = visible"
    this.chart!.setDatasetVisibility(idx, shouldShow);
  });

  this.chart.update();
}

chartStatus:boolean = false;




  yearsReceivedForChart: any = [];
  rezValueReceivedForChart: any = [];

  // onSelectComponents() {
  //   // Set your flags to hide or show the appropriate charts
  //   console.log("Selected Variable:",this.selectedVariable);
  //   console.log("Selected Scenario: ",this.selectedScenario);


  //   if (this.selectedVariable !== '' && this.selectedScenario !=='') {
  //     this.defaultChart = false;
  //     this.showWindSpeedChart = true;
  //   setTimeout(() => {
  //     this.renderWindSpeedChart();
  //   }, 0); 
  //   }

  //   return true;
  // }

 onSelectComponents() {
  if (this.selectedVariable && this.selectedScenario) {
    this.defaultChart = false;
    this.showWindSpeedChart = true;

    this.chartReady = true; 
    this.fetchDataAndRenderChart();
  } else {
    this.chartReady = false;
    this.closePopup();
    if (this.chart) this.chart.destroy();
  }
  return true;
}


closePopup() {
  this.popupOpen = false;
  this.popupTitle = '';
  this.popupRows = [];
}

openPopupForDataset(label: string, data: any[]) {
  this.popupTitle = label;

  // pair years + values for display
  this.popupRows = (this.yearsReceivedForChart || []).map((y: any, i: number) => ({
    year: String(y),
    value: data?.[i] ?? '-',
  }));

  this.popupOpen = true;
}


fetchDataAndRenderChart() {
  const { caseId, selectedVariable, selectedScenario } = this;
  if (!caseId || !selectedVariable || !selectedScenario) return;

  // Combine all observables into a single forkJoin
  forkJoin({
    years: this.chartService.getYearsForSelectedChartAndCaseStudy(caseId, selectedVariable, selectedScenario, 'ACCESS-CM2'),
    corra: this.chartService.getcerraRezValue(caseId, selectedVariable, selectedScenario),
    hadgem: this.chartService.getHadGEM3_GC31_LLRezValue(caseId, selectedVariable, selectedScenario),
    ecEarth: this.chartService.getEC_Earth3_Veg_LRRezValue(caseId, selectedVariable, selectedScenario),
    miroc6: this.chartService.getMIROC6RezValue(caseId, selectedVariable, selectedScenario),
    cnrm: this.chartService.getCNRM_ESM2_1RezValue(caseId, selectedVariable, selectedScenario),
    cesm2: this.chartService.getCESM2RRezValue(caseId, selectedVariable, selectedScenario),
    ipsl: this.chartService.getIPSL_CM6A_LRRezValue(caseId, selectedVariable, selectedScenario),
    noresm: this.chartService.getNorESM2_MMRezValue(caseId, selectedVariable, selectedScenario),
    access: this.chartService.getACCESS_CM2RezValue(caseId, selectedVariable, selectedScenario),
  }).subscribe({
    next: (data) => {
      // Convert and assign everything
      this.yearsReceivedForChart = data.years;
      this.corraRezValue = data.corra;
      this.HadGEM3_GC31_LLRezValue = data.hadgem
      this.EC_Earth3_Veg_LRRezValue = data.ecEarth;
      this.MIROC6RezValue = data.miroc6;
      this.CNRM_ESM2_1RezValue = data.cnrm;
      this.CESM2RezValue = data.cesm2;
      this.IPSL_CM6A_LRRezValue = data.ipsl;
      this.NorESM2_MMRezValue = data.noresm;
      this.ACCESS_CM2RezValue = data.access;

      // All done, now render chart
this.selectedModels.clear();
      this.renderWindSpeedChart();
    },
    error: (err) => {
      console.error('Error fetching chart data', err);
    },
  });
}


renderWindSpeedChart(): void {
  const canvasElement = this.myWindSpeedChartElement?.nativeElement as HTMLCanvasElement;
  if (!canvasElement) return;

  const ctx = canvasElement.getContext('2d');
  if (!ctx) return;

  if (this.chart) this.chart.destroy();

  // build datasets (all hidden at start)
  const datasets = [
    {
      label: 'HadGEM3-GC31-LL',
      data: this.HadGEM3_GC31_LLRezValue,
      borderWidth: 2,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: false,
      tension: 0.4,
      // hidden: true, // << IMPORTANT
    },
    {
      label: 'CERRA',
      data: this.corraRezValue,
      borderWidth: 2,
      borderColor: 'rgba(192, 79, 75, 1)',
      backgroundColor: 'rgba(192, 79, 75, 0.2)',
      fill: false,
      tension: 0.4,
      // hidden: true,
    },
    {
      label: 'EC-Earth3-Veg-LR',
      data: this.EC_Earth3_Veg_LRRezValue,
      borderWidth: 2,
      borderColor: 'rgba(147, 192, 75, 1)',
      backgroundColor: 'rgba(147, 192, 75, 0.2)',
      fill: false,
      tension: 0.4,
      // hidden: true,
    },
    {
      label: 'MIROC6',
      data: this.MIROC6RezValue,
      borderWidth: 2,
      borderColor: 'rgba(75, 87, 192, 1)',
      backgroundColor: 'rgba(75, 87, 192, 0.2)',
      fill: false,
      tension: 0.4,
      // hidden: true,
    },
    {
      label: 'CNRM-ESM2-1',
      data: this.CNRM_ESM2_1RezValue,
      borderWidth: 2,
      borderColor: 'rgba(192, 75, 178, 1)',
      backgroundColor: 'rgba(192, 75, 178, 0.2)',
      fill: false,
      tension: 0.4,
      // hidden: true,
    },
    {
      label: 'CESM2',
      data: this.CESM2RezValue,
      borderWidth: 2,
      borderColor: 'rgba(180, 192, 75, 1)',
      backgroundColor: 'rgba(180, 192, 75, 0.2)',
      fill: false,
      tension: 0.4,
      // hidden: true,
    },
    {
      label: 'IPSL-CM6A-LR',
      data: this.IPSL_CM6A_LRRezValue,
      borderWidth: 2,
      borderColor: 'rgba(240, 188, 0, 1)',
      backgroundColor: 'rgba(240, 188, 0, 0.2)',
      fill: false,
      tension: 0.4,
      // hidden: true,
    },
    {
      label: 'NorESM2-MM',
      data: this.NorESM2_MMRezValue,
      borderWidth: 2,
      borderColor: 'rgba(237, 149, 210, 1)',
      backgroundColor: 'rgba(237, 149, 210, 0.2)',
      fill: false,
      tension: 0.4,
      // hidden: true,
    },
    {
      label: 'ACCESS-CM2',
      data: this.ACCESS_CM2RezValue,
      borderWidth: 2,
      borderColor: 'rgba(75, 192, 159, 1)',
      backgroundColor: 'rgba(75, 192, 159, 0.2)',
      fill: false,
      tension: 0.4,
      // hidden: true,
    },
  ];

  this.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.yearsReceivedForChart,
      datasets,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
  legend: {
    display: false,   // << hide chart.js legend entirely
  },
  tooltip: { enabled: true },
  title: { display: false },
},

      scales: {
        y: {
    beginAtZero: true,
    title: {
      display: true,
      text: this.getYAxisTitle(), // <-- units here (dynamic)
    },
  },
        
      },
    },
  });

    this.applyModelVisibilityToChart();

}

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  hazardsReceived: string[] = [];
  selectedHazard: string = '';

  selectedItem: string | null = null;

  selectItem(item: string): void {
    this.selectedItem = item;
    console.log('You have selected : ', item);
  }

  selectTheHazard(hazard: string) {
    this.selectedHazard = hazard;
    console.log(
      'You have selected the following hazard: ',
      this.selectedHazard
    );
    this.dataStorageService.setSelectedHazardFromEcv(hazard);
    console.log("You have selected the following hazard:", hazard);
  }

  imageForHazard: string = '';
onModelCheckboxChange(model: string, event: Event) {
  const input = event.target as HTMLInputElement;
  this.toggleModel(model, input.checked);
}
  imagesForHazards(hazard: string) {
    if (hazard == 'Heavy Rain') {
      this.imageForHazard = '/assets/images/heavy_rain_icon.png';
    } else if (hazard == 'Flood') {
      this.imageForHazard = '/assets/images/flooding.png';
    } else if (hazard == 'Drought Days') {
      this.imageForHazard = '/assets/images/draught_focus_img.png';
    } else if (hazard == 'Heatwave') {
      this.imageForHazard = '/assets/images/heat_wave_icon.png';
    } else if (hazard == 'Strong Winds') {
      this.imageForHazard = '/assets/images/strong_winds_icon.png';
    } else if (hazard == 'Cold Spell') {
      this.imageForHazard = '/assets/images/cold_spell_icon.png';
    } else if (hazard == 'Snow Season') {
      this.imageForHazard = '/assets/images/snow_season_icon.png';
    } else if (hazard == 'Sea Level Raise') {
      this.imageForHazard = '/assets/images/snow_season_icon.png';
    }

    return this.imageForHazard;
  }

  hazardSelectedStatus: boolean = false;
  hazardSelectedName: string = '';

  // checkIfHazardIsSelected(hazard: string) {
  //   this.hazardSelectedStatus = true;
  //   this.hazardSelectedName = hazard;
  //   console.log("You have chosen the hazard: ", this.hazardSelectedName, "\nFor the case study:  ",this.selectedTitleCase)
  // }
}

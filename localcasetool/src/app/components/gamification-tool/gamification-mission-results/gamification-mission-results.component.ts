import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartDataServiceService } from '../../services/chartService/chart-data-service.service';
import { QuestionaireService } from '../../services/questionaire/questionaire.service';
import {Chart as ChartJS,CategoryScale,LinearScale,LineElement,PointElement,Title,Tooltip,Legend, BarElement, BarController,  LineController, } from 'chart.js';
import { Chart } from 'chart.js';
import { forkJoin } from 'rxjs';
import { GamificationMissionsService } from '../../services/gamificationMissions/gamification-missions.service';
ChartJS.register(CategoryScale, LinearScale,LineElement, PointElement, Title, Tooltip, Legend,BarController,  LineController  )

@Component({
  selector: 'app-gamification-mission-results',
  templateUrl: './gamification-mission-results.component.html',
  styleUrls: ['./gamification-mission-results.component.css']
})
export class GamificationMissionResultsComponent implements OnInit {
constructor(private translate: TranslateService,private questionaireService:QuestionaireService,private chartService: ChartDataServiceService,private userProgress: GamificationMissionsService) {

    translate.setDefaultLang('EN');



  }
@ViewChild('myScenaryChart') myScenaryChartElement!: ElementRef;
@ViewChild('myTempChart') myTempElement!: ElementRef;

 resetToCCgame():any{
    this.userProgress.setUserProgressMission1(false);
  }


  userGotToGraphStatusMission1:boolean = false;
  answers:any = [];
  scenaryName:string = '';
  ngOnInit() {

    this.userProgress.setUserProgressMission1(true);
  // Get answers from QuestionaireService
  this.answers = this.questionaireService.getAnswerList();
  console.log('Received answers on new page:', this.answers);

  // Compute which scenario applies
  this.scenaryName = this.computeResults(this.answers);
  console.log('Computed scenario:', this.scenaryName);

  // Fetch data and render the scenario chart immediately
  this.fetchDataAndRenderChart(this.scenaryName);

  }

  getYearsValue() {
  this.chartService.getYearsForSelectedChartAndCaseStudy('CS2', 'PREC', 'ssp245', 'ACCESS-CM2')
    .subscribe({
      next: (response: string[]) => {
        this.yearsReceivedForChart = response;
        console.log("Years value:", this.yearsReceivedForChart);
      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
    return this.yearsReceivedForChart;
}

baseLineRezValue:any[]= [];
scenaryNameRezValue:any[] = [];
temperatureRezValue:any[] = [];
getRezValueForCorra(caseId:string,ecvCode:string,scenarioCode:string,modelName:string) {
  // console.log("Case id used: ",caseId);
  // console.log("Ecv Variable used: ",ecvCode);
  // console.log("Scenario Code: ",scenarioCode);
  // console.log("Model name used: ",modelName);
  this.chartService.getcerraRezValue(caseId, ecvCode, scenarioCode)
    .subscribe({
      next: (response: string[]) => {
        this.baseLineRezValue = response;
        // console.log("Rez value for Corra:", this.corraRezValue);

      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });
    return this.baseLineRezValue;
}



fetchDataAndRenderChart(scenary_name:string) {


  // Combine all observables into a single forkJoin
  forkJoin({
    years: this.chartService.getGamificationYears(),
    scenaryNAME:this.chartService.getGamificationRezValue(scenary_name),
    baseLine:this.chartService.getGamificationRezValueForBaseline(),
    temperature:this.chartService.getTempGraphRezValues(scenary_name)

  }).subscribe({
    next: (data) => {
      // Convert and assign everything
      this.yearsReceivedForChart = data.years;
      this.baseLineRezValue = data.baseLine;
      this.scenaryNameRezValue = data.scenaryNAME;
      this.temperatureRezValue = data.temperature;


      // All done, now render chart
      this.renderScenaryChart();
      this.renderTempChart();
    },
    error: (err) => {
      console.error('Error fetching chart data', err);
    },
  });
}

scenarioChart: Chart | undefined;
temperatureChart: Chart | undefined;


renderTempChart(): void {
    console.log('Rendering Wind Speed Chart...');
    console.log('Years: ',this.yearsReceivedForChart);

  const canvasElement = this.myTempElement
    .nativeElement as HTMLCanvasElement;

  if (canvasElement) {
    const ctx = canvasElement.getContext('2d');

    if (ctx) {
      if (this.temperatureChart) {
        this.temperatureChart.destroy();
      }

      this.temperatureChart = new Chart(ctx, {
        type: 'line', // Change the chart type to 'line'
        data: {
          labels: this.yearsReceivedForChart, // x-axis labels
          datasets: [
            {
              label: 'temperature', // Dataset label
              data: this.temperatureRezValue, // Data values
              borderWidth: 2, // Line thickness
              borderColor: 'rgba(75, 192, 192, 1)', // Line color
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area fill under the line
              fill: true, // Enable area fill under the line
              tension: 0.4, // Smooth line (you can adjust this value for more/less smoothness)
            },
            {
              label: this.scenaryName, // Dataset label
              data: this.scenaryNameRezValue, // Data values
              borderWidth: 2, // Line thickness
              borderColor: 'rgba(192, 79, 75, 1)', // Line color
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area fill under the line
              fill: true, // Enable area fill under the line
              tension: 0.4, // Smooth line (you can adjust this value for more/less smoothness)
            },
          ],
        },
        options: {
          responsive: true, // Make the chart responsive
          scales: {
            y: {
              beginAtZero: true, // Start the y-axis at 0
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'Temperature Chart', // Chart title
            },
            tooltip: {
              enabled: true, // Enable tooltips
            },
          },
        },
      });
    } else {
      console.error('Failed to get the 2d context for the chart');
    }
  }
}


renderScenaryChart(): void {
    console.log('Rendering Wind Speed Chart...');
    console.log('Years: ',this.yearsReceivedForChart);

  const canvasElement = this.myScenaryChartElement
    .nativeElement as HTMLCanvasElement;

  if (canvasElement) {
    const ctx = canvasElement.getContext('2d');

    if (ctx) {
      if (this.scenarioChart) {
        this.scenarioChart.destroy();
      }

      this.scenarioChart = new Chart(ctx, {
        type: 'line', // Change the chart type to 'line'
        data: {
          labels: this.yearsReceivedForChart, // x-axis labels
          datasets: [
            {
              label: 'baseline', // Dataset label
              data: this.baseLineRezValue, // Data values
              borderWidth: 2, // Line thickness
              borderColor: 'rgba(75, 192, 192, 1)', // Line color
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area fill under the line
              fill: true, // Enable area fill under the line
              tension: 0.4, // Smooth line (you can adjust this value for more/less smoothness)
            },
            {
              label: this.scenaryName, // Dataset label
              data: this.scenaryNameRezValue, // Data values
              borderWidth: 2, // Line thickness
              borderColor: 'rgba(192, 79, 75, 1)', // Line color
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Area fill under the line
              fill: true, // Enable area fill under the line
              tension: 0.4, // Smooth line (you can adjust this value for more/less smoothness)
            },
          ],
        },
        options: {
          responsive: true, // Make the chart responsive
          scales: {
            y: {
              beginAtZero: true, // Start the y-axis at 0
            },
          },
          plugins: {
            title: {
              display: true,
              text: 'CO2 Emissions Per Capita', // Chart title
            },
            tooltip: {
              enabled: true, // Enable tooltips
            },
          },
        },
      });
    } else {
      console.error('Failed to get the 2d context for the chart');
    }
  }
}
  // yearsReceivedForChart(arg0: string, yearsReceivedForChart: any) {
  //   throw new Error('Method not implemented.');
  // }

  yearsReceivedForChart: string[] = [];   




  switchLanguage(language: string) {
    this.translate.use(language);
  }

   computeResults(input: string | string[]): string {
    // Normalize input to a char array (strings of length 1)
    const answers: string[] = Array.isArray(input) ? input : input.split("");

    // Scenario templates (exactly as in your Java code, length 11)
    const s3601 = ['a', 'b', 'a', 'b', 'b', 'a', 'a', 'a', 'a', 'b', 'a'];
    const s3603 = ['a', 'b', 'a', 'b', 'b', 'a', 'a', 'b', 'a', 'b', 'a'];
    const s3593 = ['a', 'b', 'a', 'b', 'b', 'b', 'a', 'a', 'a', 'a', 'a'];
    const s3373 = ['b', 'b', 'a', 'b', 'b', 'b', 'a', 'a', 'a', 'b', 'a'];

    // NOTE: Your Java code assumes answers.length == 11 and will throw if longer.
    // To mirror behavior strictly, ensure input is length 11:
    if (answers.length !== 11) {
      throw new Error(`answers must have length 11; got ${answers.length}`);
    }

    let rez3373 = 0;
    let rez3593 = 0;
    let rez3603 = 0;
    let rez3601 = 0;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === s3593[i]) rez3593++;
      if (answers[i] === s3373[i]) rez3373++;
      if (answers[i] === s3601[i]) rez3601++;
      if (answers[i] === s3603[i]) rez3603++;
    }

    // Tie-breaking exactly like Java:
    // first compare 3593 vs 3373, then possibly override with 3601, then 3603
    let rezmax: number;
    let scenario: string;

    if (rez3593 > rez3373) {
      rezmax = rez3593;
      scenario = "escenario_3593";
    } else {
      rezmax = rez3373;
      scenario = "escenario_3373";
    }

    if (rez3601 > rezmax) {
      rezmax = rez3601;
      scenario = "escenario_3601";
    }

    if (rez3603 > rezmax) {
      rezmax = rez3603;
      scenario = "escenario_3603";
    }

    console.log("rez3373 = " + rez3373);
    console.log("rez3593 = " + rez3593);
    console.log("rez3601 = " + rez3601);
    console.log("rez3603 = " + rez3603);

    return scenario;
  }
}



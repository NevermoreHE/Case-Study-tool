import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PolicySelectedService } from '../../services/policy/policy-selected.service';
import { SectorsService } from '../../services/sectors/sectors.service';
import { DataStorageService } from '../titleCase/data-storage.service';
import { PolicyRecommandationsService } from '../../services/policy_recommandations/policy-recommandations.service';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Title } from 'chart.js';
import { forkJoin } from 'rxjs';
type IndicatorOption = { label: string; code: string };
ChartJS.defaults.color = '#465c95'; 
ChartJS.defaults.font.family = 'Inter, sans-serif';
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Title);



@Component({
  selector: 'app-scenario-applied-results',

  templateUrl: './scenario-applied-results.component.html',
  styleUrls: ['./scenario-applied-results.component.css']
})
export class ScenarioAppliedResultsComponent {
title_case: string = '';
private readonly CHART_COLORS = {
  policy: '#465c95',     // blue
  baseline: '#2e7d32',   // green (nice professional green)
};

private readonly SERIES_COLORS = [
  '#465c95', // blue
  '#2e7d32', // green
  '#f9a825', // amber
  '#8e24aa', // purple
  '#00838f', // teal
];

private formatLegendLabel(code: string): string {
  return (code ?? '')
    .replace(/_/g, ' ')
    .replace(/\bh2\b/gi, 'H2')
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .trim();
}


  selectedTitleCase: string = '';
  selectedSectorData: string = '';
selectedIndicator: string = '';




  constructor(private translate: TranslateService,private dataStorageService: DataStorageService,private sectorService:SectorsService,private thePolicySelected:PolicySelectedService,private policyRecommendation:PolicyRecommandationsService) {
    translate.setDefaultLang('EN');
  }
    caseStudyName:string = '';

  theSelectedScenarioCode:string = '';

  policyAlternativeLevelSelected:string = '';
sectorsReceived :any[] = [];
the_title_case:string = '';
scenarioResultsSelectedPreviously:string = '';
policyPreviouslySelected:string = '';
indicatorsForSelectedPolicyReceived:any = [];

dataAndYearsReceviedForGraphByPolicies:any = [];
storyLineCode:any = '';

  ngOnInit(): void {
    this.selectedSectorData = this.dataStorageService.getSelectedSector();
    // this.the_title_case = this.dataStorageService.getTitleCase();
    // console.log(this.the_title_case);
    console.log(this.selectedSectorData);
    this.selectedTitleCase = this.dataStorageService.getSelectedTitleCase();
    console.log("Selected Title Case from service:", this.selectedTitleCase); 
    this.sectorService.getSectorsForSpecificCaseStudy(this.selectedTitleCase).subscribe(data => this.sectorsReceived =JSON.parse(data));
    

this.policyAlternativeLevelSelected = this.policyRecommendation.getPolicyAlternativeLevel();
if (this.policyAlternativeLevelSelected == 'Low policy application'){
  this.policyAlternativeLevelSelected = "LOW";
}else if (this.policyAlternativeLevelSelected == 'Medium policy application'){
  this.policyAlternativeLevelSelected = "MEDIUM";
}else if (this.policyAlternativeLevelSelected == 'High policy application'){
    this.policyAlternativeLevelSelected = "HIGH";
}

    this.scenarioResultsSelectedPreviously = this.thePolicySelected.getScenarioResult();
    this.policyPreviouslySelected = this.thePolicySelected.getPolicySelected();
    this.theSelectedScenarioCode = this.policyRecommendation.getSelectedScenarioCode();
    if (this.theSelectedScenarioCode == "SSP245"){
      this.theSelectedScenarioCode = "SSP2";
    }else if (this.theSelectedScenarioCode == "SSP585"){
      this.theSelectedScenarioCode = "SSP5";
    }
    console.log("The scenario code selected is: ", this.theSelectedScenarioCode);
    

         if (this.selectedTitleCase == 'CS1_CRETE_ISLAND') {
      this.title_case = 'CS1 - Sitia municipality';
    } else if (this.selectedTitleCase == 'CS2_TRENTINO_REGION') {
      this.title_case = 'CS2 - Trentino Province';
    } else if (this.selectedTitleCase == 'CS3_NORRBOTTEN_COUNTRY') {
      this.title_case = 'CS3 - Norrbotten County';
    } else if (this.selectedTitleCase == 'CS4_MURCIA_REGION') {
      this.title_case = 'CS4 - Murcia Region';
    } else if (this.selectedTitleCase == 'CS5_DANUBE_DELTA') {
      this.title_case = 'CS5 - Danube Delta';
    }


    if (this.selectedTitleCase == 'CS1_CRETE_ISLAND') {
      this.caseStudyName = 'CS1';
    } else if (this.selectedTitleCase == 'CS2_TRENTINO_REGION') {
      this.caseStudyName = 'CS2';
    } else if (this.selectedTitleCase == 'CS3_NORRBOTTEN_COUNTRY') {
      this.caseStudyName = 'CS3';
    } else if (this.selectedTitleCase == 'CS4_MURCIA_REGION') {
      this.caseStudyName = 'CS4';
    } else if (this.selectedTitleCase == 'CS5_DANUBE_DELTA') {
      this.caseStudyName = 'CS5';
    }

    // this.title_case = "/" +this.title_case;
        this.title_case = this.title_case;

    console.log(this.title_case);


    this.storyLineCode = "S" + this.thePolicySelected.getPolicyIndex();

    this.policyRecommendation.getIndicatorsForPolicies(this.caseStudyName, this.storyLineCode)
  .subscribe((data: any[]) => {
    this.indicatorsForSelectedPolicyReceived = data;

    // Expand backend indicators into real options (including the floods 3 variants)
    this.indicatorOptions = this.expandIndicatorsToOptions(data);

    console.log("Backend indicators:", data);
    console.log("Expanded dropdown options:", this.indicatorOptions);
  });

  //   this.policyRecommendation.getYearAndDataForPoliciesAndLevelsImplemented("expected_losses_by_floods_ten",this.caseStudyName,this.storyLineCode,this.theSelectedScenarioCode,this.policyAlternativeLevelSelected)
  // .subscribe((data: any[]) => {
  //   this.dataAndYearsReceviedForGraphByPolicies = data;
  //   console.log('received:', this.dataAndYearsReceviedForGraphByPolicies);
  // });    console.log(this.dataAndYearsReceviedForGraphByPolicies);
  };


  compareWithBaseline = false;

  onBaselineToggle(event: Event) {
  this.compareWithBaseline = (event.target as HTMLInputElement).checked;

  // if user already selected an indicator, re-load and re-render with the new mode
  if (this.selectedIndicator) {
    if (this.isEnergyShare(this.selectedIndicator)) {
      this.loadAndRenderEnergyShare();
    } else {
      this.loadAndRenderSingleIndicator(this.selectedIndicator);
    }
  }
}

 isPopupVisibleAbove: boolean = false;
  isPopupVisibleRight: boolean = false;

indicatorOptions: IndicatorOption[] = [];

@ViewChild('resultsChart', { static: true }) resultsChartEl!: ElementRef<HTMLCanvasElement>;
private chart?: Chart;

private destroyChart() {
  if (this.chart) {
    this.chart.destroy();
    this.chart = undefined;
  }
}
private expandIndicatorsToOptions(raw: any[]): IndicatorOption[] {
  const out: IndicatorOption[] = [];

  for (const item of raw ?? []) {
    const rawLabel = item?.indicator;
    if (!rawLabel) continue;

    const label = this.normalizeIndicatorLabel(rawLabel);

    const mapped = this.INDICATOR_MAP[label];

    if (!mapped?.length) {
      console.warn("No INDICATOR_MAP entry for:", label);
      continue; // don't guess; prevents wrong DB calls
    }

    out.push(...mapped);
  }

  return out.filter((x, i, arr) => arr.findIndex(y => y.code === x.code) === i);
}

private toSnakeCase(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\[.*?\]/g, "")            // remove bracket parts if any
    .replace(/[^a-z0-9]+/g, "_")        // non-alphanum -> _
    .replace(/^_+|_+$/g, "");           // trim underscores
}

private normalizeIndicatorLabel(label: string): string {
  return label
    .trim()
    .replace(/^Compare with baseline:\s*/i, "");
}



// Map backend "indicator" labels -> list of options (label+db column code)
private readonly INDICATOR_MAP: Record<string, IndicatorOption[]> = {
  // --- Floods (3 variants -> 3 DB columns) ---
  "Expected losses by floods": [
    { label: "EXPECTED LOSSES BY FLOODS [TEN]", code: "expected_losses_by_floods_ten" },
    { label: "EXPECTED LOSSES BY FLOODS [FIFTY]", code: "expected_losses_by_floods_fifty" },
    { label: "EXPECTED LOSSES BY FLOODS [HUNDRED]", code: "expected_losses_by_floods_hundred" },
  ],

  // --- Population ---
  "Sensitivity for population": [{ label: "SENSITIVITY FOR POPULATION", code: "sensitivity_for_population" }],
  "Adaptation for population": [{ label: "ADAPTATION FOR POPULATION", code: "adaptation_for_population" }],
  "Risk index population": [{ label: "RISK INDEX POPULATION", code: "risk_index_population" }],

  // --- Agriculture / crops / groundwater ---
  // Fix you asked for: "Agricultural area" must call "agriculture"
  "Agricultural area": [{ label: "AGRICULTURAL AREA", code: "agriculture" }],
  "Agriculture": [{ label: "AGRICULTURE", code: "agriculture" }],

  "Crops adaptation": [{ label: "CROPS ADAPTATION", code: "crops_adaptation" }],
  "Crops sensitivity": [{ label: "CROPS SENSITIVITY", code: "crops_sensitivity" }],
  "Risk index crops": [{ label: "RISK INDEX CROPS", code: "risk_index_crops" }],
  "Groundwater resources": [{ label: "GROUNDWATER RESOURCES", code: "groundwater_resources" }],
  "Storage water": [{ label: "STORAGE WATER", code: "storage_water" }],
  "Request from groundwater extraction": [
    { label: "REQUEST FROM GROUNDWATER EXTRACTION", code: "request_from_groundwater_extraction" }
  ],

  // --- Water ---
  "Water demand": [{ label: "WATER DEMAND", code: "water_demand" }],
  "Water supply": [{ label: "WATER SUPPLY", code: "water_supply" }],
  "Water security": [{ label: "WATER SECURITY", code: "water_security" }],
  "Water demand from agriculture": [{ label: "WATER DEMAND FROM AGRICULTURE", code: "water_demand_from_agriculture" }],
  "Water demand from urban": [{ label: "WATER DEMAND FROM URBAN", code: "water_demand_from_urban" }],

  // You have this DB column but it didn't appear clearly in your human list
  "Water demand from industry": [{ label: "WATER DEMAND FROM INDUSTRY", code: "water_demand_from_industry" }],

  // --- Tourism ---
  "Attractiveness for tourism": [{ label: "ATTRACTIVENESS FOR TOURISM", code: "attractiveness_for_tourism" }],
  "Infrastructure capacity": [{ label: "INFRASTRUCTURE CAPACITY", code: "infrastructure_capacity" }],
  "Risk index tourism": [{ label: "RISK INDEX TOURISM", code: "risk_index_tourism" }],

  // Your DB does NOT have "tourism_index" — so map it to the closest real metric(s).
  // Pick ONE. I mapped it to tourism_income because it's a single series.
  "Tourism index": [{ label: "TOURISM INDEX", code: "tourism_income" }],

  // These exist in DB but may not be in your dropdown list today
  "Tourism income": [{ label: "TOURISM INCOME", code: "tourism_income" }],
  "Total international visitors": [{ label: "TOTAL INTERNATIONAL VISITORS", code: "total_international_visitors" }],
  "Total national visitors": [{ label: "TOTAL NATIONAL VISITORS", code: "total_national_visitors" }],

  // --- Energy ---
  "Energy consumption": [{ label: "ENERGY CONSUMPTION", code: "energy_consumption" }],

  // For the grouped “share” chart, you are already using getEnergyShareIndicators().
  // But if backend sends "Energy consumption share" as an indicator, let it show one option
  // that triggers your grouped chart (you can keep code as a marker).
  "Energy consumption share": [{ label: "ENERGY CONSUMPTION SHARE", code: "energy_consumption_share" }],

  // Your DB column is "total_carbon_emissions_from_energy"
  "Total carbon emissions": [{ label: "TOTAL CARBON EMISSIONS", code: "total_carbon_emissions_from_energy" }],
  "Total carbon emissions from energy": [
    { label: "TOTAL CARBON EMISSIONS FROM ENERGY", code: "total_carbon_emissions_from_energy" }
  ],

  "Energy consumption water treatment": [
    { label: "ENERGY CONSUMPTION WATER TREATMENT", code: "energy_consumption_water_treatment" }
  ],
  "Energy used for snow production": [
    { label: "ENERGY USED FOR SNOW PRODUCTION", code: "energy_used_for_snow_production" }
  ],
  "Energy requested from H2 production": [
    { label: "ENERGY REQUESTED FROM H2 PRODUCTION", code: "energy_requested_from_h2_production" }
  ],

  // --- Snow / ski ---
  "Water used for snow production": [{ label: "WATER USED FOR SNOW PRODUCTION", code: "water_used_for_snow_production" }],
  "Artificial snow production yearly": [
    { label: "ARTIFICIAL SNOW PRODUCTION YEARLY", code: "artificial_snow_production_yearly" }
  ],
  "Water requirements from H2 production": [
    { label: "WATER REQUIREMENTS FROM H2 PRODUCTION", code: "water_requirements_from_h2_production" }
  ],

  // --- Land / ecosystems ---
  "Forest": [{ label: "FOREST", code: "forest" }],
  "Wetland": [{ label: "WETLAND", code: "wetlands" }],       // your DB uses plural
  "Wetlands": [{ label: "WETLANDS", code: "wetlands" }],
  "Irrigated crop area": [{ label: "IRRIGATED CROP AREA", code: "irrigated_crop_area" }],

  "Protected forest": [{ label: "PROTECTED FOREST", code: "protected_forest_land" }],
  "Protected wetlands": [{ label: "PROTECTED WETLANDS", code: "protected_wetlands" }],
  "Biomass stock": [{ label: "BIOMASS STOCK", code: "biomass_stock" }],
  "Total carbon stock": [{ label: "TOTAL CARBON STOCK", code: "total_carbon_stock" }],
  "Solar land": [{ label: "SOLAR LAND", code: "solar_land" }],

  // --- Production / trade / energy system ---
  "Total production": [{ label: "TOTAL PRODUCTION", code: "total_production" }],
  "Total production considering H2": [{ label: "TOTAL PRODUCTION CONSIDERING H2", code: "total_production_considering_h2" }],
  "Import": [{ label: "IMPORT", code: "import" }],
  "Export": [{ label: "EXPORT", code: "export" }],
  "Import with H2": [{ label: "IMPORT WITH H2", code: "import_with_h2" }],
  "Export with H2": [{ label: "EXPORT WITH H2", code: "export_with_h2" }],

  // These exist in DB (if you later add them as indicators in UI)
  "Solar production": [{ label: "SOLAR PRODUCTION", code: "solar_production" }],
  "Wind production": [{ label: "WIND PRODUCTION", code: "wind_production" }],
  "Non renewable production": [{ label: "NON RENEWABLE PRODUCTION", code: "non_renewable_production" }],
  "Rooftop production": [{ label: "ROOFTOP PRODUCTION", code: "rooftop_production" }],
  "Biomass production": [{ label: "BIOMASS PRODUCTION", code: "biomass_production" }],
  "Hydro production": [{ label: "HYDRO PRODUCTION", code: "hydro_production" }],
  "H2 production": [{ label: "H2 PRODUCTION", code: "h2_production" }],

  // Transport emissions / vehicles (if they appear in your dropdown later)
  "Total emissions from transport": [{ label: "TOTAL EMISSIONS FROM TRANSPORT", code: "total_emissions_from_transport" }],
};

private isExpectedLosses(indicator: string): boolean {
  return indicator === 'expected_losses_by_floods_ten'
      || indicator === 'expected_losses_by_floods_fifty'
      || indicator === 'expected_losses_by_floods_hundred';
}

private isEnergyShare(indicator: string): boolean {
  return indicator === "energy_consumption_share" || indicator.startsWith("energy_consumption_share_");
}



private isEnergyIndicator(indicator: string): boolean {
  return indicator === 'energy_consumption'
      || indicator === 'total_carbon_emissions_from_energy'
      || indicator === 'energy_consumption_water_treatment'
      || indicator === 'energy_used_for_snow_production'
      || indicator === 'energy_requested_from_h2_production'
      || indicator.startsWith('energy_consumption_share_');
}


private getEnergyShareIndicators(): string[] {
  return [
    "energy_consumption_share_coal",
    "energy_consumption_share_gas",
    "energy_consumption_share_oil",
    "energy_consumption_share_renewables",
  ];
}


private chartTypeFor(indicator: string): 'bar' | 'line' {
  if (this.isExpectedLosses(indicator)) return 'bar';
  if (this.isEnergyIndicator(indicator)) return 'bar';
  return 'line';
}


private toXY(data: any[]): { labels: string[]; values: number[] } {
  const labels = data.map(d => String(d.anul ?? d.year));

  const values = data.map(d => {
    const raw = d.theIndicatorSelectedCode ?? d.value ?? d.val ?? d.result;
    const n = Number(String(raw).replace(',', '.')); // safe if backend ever sends comma decimals
    return Number.isFinite(n) ? n : null;
  }).filter((v): v is number => v !== null);

  return { labels, values };
}
onIndicatorChange(event: Event) {
  const indicator = (event.target as HTMLSelectElement).value;

  this.selectedIndicator = indicator;

  // If user re-selects placeholder, clear chart
  if (!indicator) {
    this.destroyChart();
    return;
  }

  if (this.isEnergyShare(indicator)) {
    this.loadAndRenderEnergyShare();
  } else {
    this.loadAndRenderSingleIndicator(indicator);
  }
}

private loadAndRenderSingleIndicator(indicatorCode: string) {

  // 🔵 If baseline OFF → normal chart
  if (!this.compareWithBaseline) {
    this.policyRecommendation
      .getYearAndDataForPoliciesAndLevelsImplemented(
        indicatorCode,
        this.caseStudyName,
        this.storyLineCode,
        this.theSelectedScenarioCode,
        this.policyAlternativeLevelSelected
      )
      .subscribe((data: any[]) => {
        const { labels, values } = this.toXY(data);
        this.renderSingleSeriesChart(
          indicatorCode,
          labels,
          values,
          this.chartTypeFor(indicatorCode)
        );
      });

    return;
  }

  // 🟢 If baseline ON → call BOTH services
  forkJoin([
    this.policyRecommendation.getYearAndDataForPoliciesAndLevelsImplemented(
      indicatorCode,
      this.caseStudyName,
      this.storyLineCode,
      this.theSelectedScenarioCode,
      this.policyAlternativeLevelSelected
    ),
    this.policyRecommendation.getYearAndDataForPoliciesAndLevelsImplementedBaseline(
      indicatorCode,
      this.caseStudyName,
      this.storyLineCode
    )
  ]).subscribe(([policyData, baselineData]) => {

    const policyXY = this.toXY(policyData);
    const baselineXY = this.toXY(baselineData);

    this.renderComparisonChart(
      indicatorCode,
      policyXY.labels,
      policyXY.values,
      baselineXY.values,
      this.chartTypeFor(indicatorCode)
    );
  });
}

private renderTwoSeriesChart(
  title: string,
  labels: string[],
  policyValues: number[],
  baselineValues: number[],
  type: 'bar' | 'line'
) {
  const ctx = this.resultsChartEl?.nativeElement?.getContext('2d');
  if (!ctx) return;

  this.destroyChart();

  this.chart = new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [
        { label: `${title} (Policy)`, data: policyValues, borderWidth: 2, tension: 0.3 },
        { label: `${title} (Baseline)`, data: baselineValues, borderWidth: 2, tension: 0.3 },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        title: { display: true, text: this.formatLegendLabel(title) }
      },
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}

private loadAndRenderEnergyShare() {
  const indicators = this.getEnergyShareIndicators();

  const calls = indicators.map(code =>
    this.policyRecommendation.getYearAndDataForPoliciesAndLevelsImplemented(
      code,
      this.caseStudyName,
      this.storyLineCode,
      this.theSelectedScenarioCode,
      this.policyAlternativeLevelSelected
    )
  );

  const toNumber = (d: any) => {
    const raw = d.theIndicatorSelectedCode ?? d.value ?? d.val ?? d.result;
    const n = Number(String(raw).replace(',', '.'));
    return Number.isFinite(n) ? n : 0;
  };

  forkJoin(calls).subscribe((allSeries: any[][]) => {
    if (!allSeries.length || !allSeries[0]?.length) {
      this.destroyChart();
      return;
    }

    const labels = allSeries[0].map(d => String(d.anul ?? d.year));

    const datasets = allSeries.map((series, idx) => ({
      label: indicators[idx].replace('energy_consumption_share_', '').toUpperCase(),
      data: series.map(toNumber),
    }));

    this.renderMultiSeriesBarChart('Energy Consumption Share', labels, datasets);
  });
}

private renderSingleSeriesChart(
  title: string,
  labels: string[],
  values: number[],
  type: 'bar' | 'line'
) {
  const ctx = this.resultsChartEl?.nativeElement?.getContext('2d');
  if (!ctx) return;

  this.destroyChart();

  this.chart = new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [{
  label: this.formatLegendLabel(title),
  data: values,
  backgroundColor: this.CHART_COLORS.policy,
  borderColor: this.CHART_COLORS.policy,
  borderWidth: 2,
  tension: 0.3,
}]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        title: { display: true, text: this.formatLegendLabel(title) }
      },
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}



private renderComparisonChart(
  title: string,
  labels: string[],
  policyValues: number[],
  baselineValues: number[],
  type: 'bar' | 'line'
) {
  const ctx = this.resultsChartEl?.nativeElement?.getContext('2d');
  if (!ctx) return;

  this.destroyChart();

  this.chart = new Chart(ctx, {
    type,
    data: {
      labels,
      datasets: [
        {
          label: `${this.formatLegendLabel(title)} (POLICY)`,
          data: policyValues,
          backgroundColor: this.CHART_COLORS.policy,
          borderColor: this.CHART_COLORS.policy,
          borderWidth: 2,
          tension: 0.3,
        },
        {
          label: `${this.formatLegendLabel(title)} (BASELINE)`,
          data: baselineValues,
          backgroundColor: this.CHART_COLORS.baseline,
          borderColor: this.CHART_COLORS.baseline,
          borderWidth: 2,
          tension: 0.3,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

private renderMultiSeriesBarChart(
  title: string,
  labels: string[],
  datasets: { label: string; data: number[] }[]
) {
  const ctx = this.resultsChartEl?.nativeElement?.getContext('2d');
  if (!ctx) return;

  this.destroyChart();

  this.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: datasets.map((ds, idx) => {
  const color = this.SERIES_COLORS[idx % this.SERIES_COLORS.length];
  return {
    label: this.formatLegendLabel(ds.label),
    data: ds.data,
    backgroundColor: color,
    borderColor: color,
    borderWidth: 1,
  };
})
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
        title: { display: true, text: this.formatLegendLabel(title) }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}



  // Method to toggle the visibility of the popups
  togglePopup(position: string): void {
    if (position === 'above') {
      this.isPopupVisibleAbove = !this.isPopupVisibleAbove;
    } else if (position === 'right') {
      this.isPopupVisibleRight = !this.isPopupVisibleRight;
      console.log("hi");
    }
  }

  

inputSelected:string = '';
execute_button:boolean  = true;

  checkInputValue(inputSelected:string){
    this.thePolicySelected.setScenario(inputSelected);
    this.execute_button = false;
    
  }
}

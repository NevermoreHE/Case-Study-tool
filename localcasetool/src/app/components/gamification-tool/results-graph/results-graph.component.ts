import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'chart.js';
import { GamificationMission2Service } from '../../services/gamification_mission_2/gamification-mission-2.service';
import { GamificationMissionsService } from '../../services/gamificationMissions/gamification-missions.service';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type KpiKey = 'budget' | 'energy' | 'water' | 'health' | 'transport' | 'cobenefit' | 'totalRisk';

@Component({
  selector: 'app-results-graph',
  templateUrl: './results-graph.component.html',
  styleUrls: ['./results-graph.component.css'],
})
export class ResultsGraphComponent implements OnInit, AfterViewInit {
  @ViewChild('kpiChart') kpiChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('summaryChart') summaryChartRef!: ElementRef<HTMLCanvasElement>;

  private kpiChart?: Chart;
  private summaryChart?: Chart;

  // -----------------------------
  // Your icons (same as you already have)
  // -----------------------------
  coinsList = [
    'assets/images/risk-by-budget.png',   // 0
    'assets/images/kpi-energy.png',       // 1
    'assets/images/kpi-water.png',        // 2
    'assets/images/kpi-health.png',       // 3
    'assets/images/kpi-transport.png',    // 4
    'assets/images/kpi-cobenefit.png',    // 5
    'assets/images/kpi-globarRisk.png',   // 6
  ];

  selectedIndex: number = 3; // default selection = health
  selectedKpi: KpiKey = 'health';

  // map icon index -> KPI key
  private indexToKpi: Record<number, KpiKey> = {
    0: 'budget',
    1: 'energy',
    2: 'water',
    3: 'health',
    4: 'transport',
    5: 'cobenefit',
    6: 'totalRisk',
  };

  // -----------------------------
  // Round keys (must match what you store)
  // -----------------------------
  private roundKeys = ['Round 1: 2030', 'Round 2: 2040', 'Round 3: 2050', 'Round 4: 2060'];
  private roundLabels = ['initial(2030)', 'round 2 (2040)', 'round 3 (2050)', 'round 4 (2060)'];

  // -----------------------------
  // Data coming from service (or localStorage)
  // -----------------------------
  budgetRounds: Record<string, number> = {};
  transportRiskRounds: Record<string, number> = {};
  waterRiskRounds: Record<string, number> = {};
  healthRiskRounds: Record<string, number> = {};
  energyRiskRounds: Record<string, number> = {};
  cobenefitRounds: Record<string, number> = {};
  totalRiskRounds: Record<string, number> = {}; // optional, if you store it

  constructor(private mission2Service: GamificationMission2Service, private userProgress: GamificationMissionsService) {}

  ngOnInit(): void {


    const data = this.mission2Service.getRoundData?.() ?? {};

    this.budgetRounds = data.budgetRounds ?? {};
    this.transportRiskRounds = data.transportRiskRounds ?? {};
    this.waterRiskRounds = data.waterRiskRounds ?? {};
    this.healthRiskRounds = data.healthRiskRounds ?? {};
    this.energyRiskRounds = data.energyRiskRounds ?? {};
    this.cobenefitRounds = data.cobenefitRounds ?? {};
    this.totalRiskRounds = data.totalRiskRounds ?? {};

    // If you prefer localStorage instead of service:
    // const raw = localStorage.getItem('mission2RoundData');
    // const ls = raw ? JSON.parse(raw) : {};
    // ...assign from ls...
  }

  resetToCCgame():any{
    this.userProgress.setUserProgressMission1(false);
  }

  ngAfterViewInit(): void {
    this.renderKpiBarChart();
    this.renderSummaryBarChart();
  }

  // -----------------------------
  // Click KPI icon
  // -----------------------------
  selectImage(index: number): void {
    this.selectedIndex = index;
    this.selectedKpi = this.indexToKpi[index] ?? 'health';
    this.renderKpiBarChart();
  }

  // -----------------------------
  // Helpers
  // -----------------------------
  private getRoundValue(map: Record<string, number>, roundKey: string): number {
    return Number(map?.[roundKey] ?? 0);
  }

  // If you don’t store totalRiskRounds, compute it (example: average of 4 sector risks)
  private computeTotalRisk(roundKey: string): number {
    const t = this.getRoundValue(this.transportRiskRounds, roundKey);
    const w = this.getRoundValue(this.waterRiskRounds, roundKey);
    const h = this.getRoundValue(this.healthRiskRounds, roundKey);
    const e = this.getRoundValue(this.energyRiskRounds, roundKey);
    return Math.round((t + w + h + e) / 4);
  }

  private getKpiColor(kpi: KpiKey): string {
  switch (kpi) {
    case 'budget': return '#67c587';
    case 'energy': return '#ffcc66';
    case 'water': return '#5dade2';
    case 'health': return '#58d68d';
    case 'transport': return '#f1948a';
    case 'cobenefit': return '#a569bd';
    case 'totalRisk': return '#5d6d7e';
  }
}

  private getKpiLabel(kpi: KpiKey): string {
    switch (kpi) {
      case 'budget': return 'Budget';
      case 'energy': return 'Energy risk';
      case 'water': return 'Water risk';
      case 'health': return 'Health risk';
      case 'transport': return 'Transport risk';
      case 'cobenefit': return 'Co-benefit';
      case 'totalRisk': return 'Total risk';
    }
  }

  private roundColors = ['#67c587', '#5dade2', '#f7dc6f', '#1e8449'];

  // -----------------------------
  // LEFT chart: selected KPI across rounds
  // -----------------------------
  private renderKpiBarChart(): void {
    const ctx = this.kpiChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;

    if (this.kpiChart) this.kpiChart.destroy();

    const values = this.roundKeys.map((rk) => {
      switch (this.selectedKpi) {
        case 'budget': return this.getRoundValue(this.budgetRounds, rk);
        case 'energy': return this.getRoundValue(this.energyRiskRounds, rk);
        case 'water': return this.getRoundValue(this.waterRiskRounds, rk);
        case 'health': return this.getRoundValue(this.healthRiskRounds, rk);
        case 'transport': return this.getRoundValue(this.transportRiskRounds, rk);
        case 'cobenefit': return this.getRoundValue(this.cobenefitRounds, rk);
        case 'totalRisk':
          return Object.keys(this.totalRiskRounds).length
            ? this.getRoundValue(this.totalRiskRounds, rk)
            : this.computeTotalRisk(rk);
      }
    });

    this.kpiChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.roundLabels,
        datasets: [{
  label: this.getKpiLabel(this.selectedKpi),
  data: values,
  backgroundColor: this.getKpiColor(this.selectedKpi),
  borderColor: this.getKpiColor(this.selectedKpi),
  borderWidth: 1,
}],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          title: { display: true, text: this.getKpiLabel(this.selectedKpi) },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

  // -----------------------------
  // RIGHT chart: grouped bars (KPIs on X axis, rounds = datasets)
  // -----------------------------
  private renderSummaryBarChart(): void {

    

    const ctx = this.summaryChartRef?.nativeElement?.getContext('2d');
    if (!ctx) return;

    if (this.summaryChart) this.summaryChart.destroy();

    const kpiLabels = ['BUDGET', 'ENERGY', 'WATER', 'HEALTH', 'TRANSPORT', 'CO-BENEFIT', 'TOTAL RISK'];

    const datasets = this.roundKeys.map((rk, idx) => ({
      label: this.roundLabels[idx],
      data: [
        this.getRoundValue(this.budgetRounds, rk),
        this.getRoundValue(this.energyRiskRounds, rk),
        this.getRoundValue(this.waterRiskRounds, rk),
        this.getRoundValue(this.healthRiskRounds, rk),
        this.getRoundValue(this.transportRiskRounds, rk),
        this.getRoundValue(this.cobenefitRounds, rk),
        Object.keys(this.totalRiskRounds).length
          ? this.getRoundValue(this.totalRiskRounds, rk)
          : this.computeTotalRisk(rk),
      ],
      backgroundColor: this.roundColors[idx],
  borderColor: this.roundColors[idx],
      borderWidth: 1,
    }));

    this.summaryChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: kpiLabels,
        datasets,
      },
      options: {
        responsive: true,
        
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Summary results' },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
}

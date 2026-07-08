import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HelpComponent } from './components/help/help.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { GamificationToolComponent } from './components/gamification-tool/gamification-tool.component';
import { CatalogueExplorerComponent } from './components/catalogue-explorer/catalogue-explorer.component';
import { EuScaleToolComponent } from './components/eu-scale-tool/eu-scale-tool.component';
import { CaseStudyToolComponent } from './components/case-study-tool/case-study-tool.component';
import { AuthGuard } from './components/services/guard/auth.guard';
import { AppComponent } from './app.component';
import { KeycloakGuard } from './auth/keycloak.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GeneralDescriptionComponent } from './components/case-study-tool/CS4-MURGIA_REGION/general-description/general-description.component';
import { ECVComponent } from './components/case-study-tool/CS4-MURGIA_REGION/ecv/ecv.component';
import { AssetsAndRisksComponent } from './components/case-study-tool/CS4-MURGIA_REGION/assets-and-risks/assets-and-risks.component';
import { SectoralComparisonComponent } from './components/case-study-tool/CS4-MURGIA_REGION/sectoral-comparison/sectoral-comparison.component';
import { PolicyPrioritiesComponent } from './components/case-study-tool/CS4-MURGIA_REGION/policy-priorities/policy-priorities.component';
import { RecommendedPoliciesComponent } from './components/case-study-tool/CS4-MURGIA_REGION/recommended-policies/recommended-policies.component';
import { SinglePlayerComponent } from './components/gamification-tool/single-player/single-player.component';
import { GroupsComponent } from './components/gamification-tool/groups/groups.component';
import { PolicyRecommendationsComponent } from './components/gamification-tool/single-player/policy-recommendations/policy-recommendations.component';
import { GraphsComponent } from './components/gamification-tool/single-player/graphs/graphs.component';
import { Mission2Component } from './components/gamification-tool/single-player/mission-2/mission-2.component';
import { ClimateChangeAdaptationComponent } from './components/gamification-tool/single-player/climate-change-adaptation/climate-change-adaptation.component';
import { AdaptationIndicatorsComponent } from './components/gamification-tool/single-player/adaptation-indicators/adaptation-indicators.component';
import { PolicyRecommendationsForGroupComponent } from './components/gamification-tool/groups/policy-recommendations-for-group/policy-recommendations-for-group.component';
import { GraphsForGroupComponent } from './components/gamification-tool/groups/graphs-for-group/graphs-for-group.component';
import { ComparisonOfResultsComponent } from './components/gamification-tool/groups/comparison-of-results/comparison-of-results.component';
import { Mission2ForGroupsComponent } from './components/gamification-tool/groups/mission-2-for-groups/mission-2-for-groups.component';
import { ClimateChangeGameForGroupsComponent } from './components/gamification-tool/groups/climate-change-game-for-groups/climate-change-game-for-groups.component';
import { FinalResultsForGroupsComponent } from './components/gamification-tool/groups/final-results-for-groups/final-results-for-groups.component';
import { CaseStudyToolInfoComponent } from './components/case-study-tool/case-study-tool-info/case-study-tool-info.component';
import { CaseStudySelectedInfoComponent } from './components/case-study-tool/case-study-selected-info/case-study-selected-info.component';
import { CaseStudyChallengesSectorsComponent } from './components/case-study-tool/case-study-challenges-sectors/case-study-challenges-sectors.component';
import { CaseStudyRelevantSectorsComponent } from './components/case-study-tool/case-study-relevant-sectors/case-study-relevant-sectors.component';
import { CaseStudyHazardDataComponent } from './components/case-study-tool/case-study-hazard-data/case-study-hazard-data.component';
import { GamificationIntroPageComponent } from './components/gamification-tool/gamification-intro-page/gamification-intro-page.component';
import { GamificationMissionResultsComponent } from './components/gamification-tool/gamification-mission-results/gamification-mission-results.component';
import { GamificationMissionSelectPageComponent } from './components/gamification-tool/gamification-mission-select-page/gamification-mission-select-page.component';
import { PolicyScenariosComponent } from './components/case-study-tool/policy-scenarios/policy-scenarios.component';
import { ScenarioAndResultsComponent } from './components/case-study-tool/scenario-and-results/scenario-and-results.component';
import { ScenarioAppliedResultsComponent } from './components/case-study-tool/scenario-applied-results/scenario-applied-results.component';
import { ClimateChangeGameComponent } from './components/gamification-tool/climate-change-game/climate-change-game.component';
import { KeyDefinitionsComponent } from './components/gamification-tool/key-definitions/key-definitions.component';
import { ResultsGraphComponent } from './components/gamification-tool/results-graph/results-graph.component';
import { GamificationClimateChangeGameComponent } from './components/gamification-tool/gamification-climate-change-game/gamification-climate-change-game.component';
import { CaseStudyInfoComponent } from './components/case-study-tool/case-study-info/case-study-info.component';
import { CatalogueExplorerInfoComponent } from './components/case-study-tool/catalogue-explorer-info/catalogue-explorer-info.component';
import { EuScaleToolInfoComponent } from './components/case-study-tool/eu-scale-tool-info/eu-scale-tool-info.component';
import { GamificationToolInfoComponent } from './components/case-study-tool/gamification-tool-info/gamification-tool-info.component';
import { AuthRedirectComponent } from './components/case-study-tool/auth-redirect/auth-redirect.component';
import { HelpInfoComponent } from './components/case-study-tool/help-info/help-info.component';
import { AboutUsInfoComponent } from './components/case-study-tool/about-us-info/about-us-info.component';
const routes: Routes = [  
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent}, 
  { path: 'aboutUsInfo', component: AboutUsInfoComponent, canActivate: [AuthGuard] }, 
  { path: 'helpInfo', component: HelpInfoComponent, canActivate: [AuthGuard] }, 
  { path: 'aboutUs', component: AboutUsComponent, canActivate: [AuthGuard] }, 
  { path: 'help', component: HelpComponent, canActivate: [AuthGuard] }, 
  { path: 'catalogue_explorer_info', component: CatalogueExplorerInfoComponent }, 
  { path: 'eu_scale_info', component: EuScaleToolInfoComponent}, 
  { path: 'case_study_info', component: CaseStudyInfoComponent }, 
  { path: 'gamification_info', component: GamificationToolInfoComponent }, 
 { path: 'auth', component: AuthRedirectComponent },
   { path: 'home', component: HomePageComponent, canActivate: [AuthGuard]}, 
  { path: 'gamification', component: GamificationToolComponent, canActivate: [AuthGuard]},
  { path: 'gamification/single_player',component:SinglePlayerComponent},
  { path: 'single_player/Policy_Recommendations',component:PolicyRecommendationsComponent} ,
  { path: 'single_player/Recommendations_GraphData',component:GraphsComponent},
  { path: 'single_player/MISSION_2',component:Mission2Component},
  { path: 'single_player/Climate_Change_Adaptation',component:ClimateChangeAdaptationComponent},
  { path: 'single_player/Adaptation_Indicators',component:AdaptationIndicatorsComponent},
  { path: 'by_group',component:GroupsComponent},
  { path: 'Policy_Recommendations_For_Group', component:PolicyRecommendationsForGroupComponent},
  { path: 'by_group/Recommendations_GraphData',component:RecommendedPoliciesComponent},
  { path: 'by_group/MISSION_2',component:Mission2Component},
  { path: 'by_group/Climate_Change_Adaptation',component:ClimateChangeAdaptationComponent},
  { path: 'by_group/Adaptation_Indicators',component:AdaptationIndicatorsComponent},
  { path: 'by_group/Policy_Recommendations_For_Group',component:PolicyRecommendationsForGroupComponent},
  { path: 'by_group/Recommendations_GraphData_For_Group',component:GraphsForGroupComponent},
  { path: 'by_group/Comparison_of_results',component:ComparisonOfResultsComponent},
  { path: 'by_group/Climate_Change_Adaptation_For_Groups',component:Mission2ForGroupsComponent},
  { path: 'by_group/Climate_Change_Game_For_Groups',component:ClimateChangeGameForGroupsComponent},
  { path: 'by_group/Final_Results_For_Groups',component:FinalResultsForGroupsComponent},
  { path: 'catalogueExplorer', component: CatalogueExplorerComponent, canActivate: [AuthGuard]}, 
  { path: 'euScale', component: EuScaleToolComponent, canActivate: [AuthGuard]}, 
  { path: 'caseStudy', component: CaseStudyToolComponent, canActivate: [AuthGuard]},
  { path: 'caseStudyToolInfo', component:CaseStudyToolInfoComponent,canActivate: [AuthGuard]},
  { path: 'forgot_password', component:ForgotPasswordComponent} ,
  { path: 'caseStudySelected_Info',component:CaseStudySelectedInfoComponent, canActivate:[AuthGuard]},
  // { path: '', component: AppComponent, canActivate: [KeycloakGuard]},
  { path: 'moreSectorInfo',component:CaseStudyRelevantSectorsComponent,canActivate:[AuthGuard]},
  { path: 'moreHazardInfo',component:CaseStudyHazardDataComponent,canActivate:[AuthGuard]},
  { path: 'gamificationInfo', component:GamificationIntroPageComponent,canActivate:[AuthGuard]},
  { path: 'gamificationMissionResults',component:GamificationMissionResultsComponent, canActivate:[AuthGuard]},
  { path: 'gamificationMissionSelect',component:GamificationMissionSelectPageComponent, canActivate:[AuthGuard]},
  { path: 'policyScenarios', component:PolicyScenariosComponent, canActivate:[AuthGuard]},
  { path: 'scenariosAndResults', component:ScenarioAndResultsComponent, canActivate:[AuthGuard]},
  { path: 'scenariosAppliedResults', component:ScenarioAppliedResultsComponent, canActivate:[AuthGuard]},
  { path: 'climateChangeGame', component:ClimateChangeGameComponent, canActivate:[AuthGuard]},
  { path: 'keyDefinitions', component:KeyDefinitionsComponent, canActivate:[AuthGuard]},
  { path: 'resultsGraphs', component:ResultsGraphComponent, canActivate:[AuthGuard]},
  { path: 'gamificationClimateChangeGame', component:GamificationClimateChangeGameComponent, canActivate:[AuthGuard]},

  { path: 'register',component:RegisterComponent},


  { path: 'CS1-Crete_Island',component:CaseStudyChallengesSectorsComponent},
  { path: 'CS1-Crete_Island/Visualize_ECVs_and_climate_hazards',component:ECVComponent},
  { path: 'CS1-Crete_Island/Explore_assets_and_vulnerabilities',component:AssetsAndRisksComponent},
  { path: 'CS1-Crete_Island/Sectoral_Comparison', component:SectoralComparisonComponent},
  { path: 'CS1-Crete_Island/Policy_Priorities',component:PolicyPrioritiesComponent},
  { path: 'CS1-Crete_Island/Recommended_Policies',component:RecommendedPoliciesComponent},

  { path: 'CS2-Trentino_region',component:CaseStudyChallengesSectorsComponent},
  { path: 'CS2-Trentino_region/Visualize_ECVs_and_climate_hazards',component:ECVComponent},
  { path: 'CS2-Trentino_region/Explore_assets_and_vulnerabilities',component:AssetsAndRisksComponent},
  { path: 'CS2-Trentino_region/Sectoral_Comparison', component:SectoralComparisonComponent},
  { path: 'CS2-Trentino_region/Policy_Priorities',component:PolicyPrioritiesComponent},
  { path: 'CS2-Trentino_region/Recommended_Policies',component:RecommendedPoliciesComponent},

  { path: 'CS3-Norrbotten_country',component:CaseStudyChallengesSectorsComponent},
  { path: 'CS3-Norrbotten_country/Visualize_ECVs_and_climate_hazards',component:ECVComponent},
  { path: 'CS3-Norrbotten_country/Explore_assets_and_vulnerabilities',component:AssetsAndRisksComponent},
  { path: 'CS3-Norrbotten_country/Sectoral_Comparison', component:SectoralComparisonComponent},
  { path: 'CS3-Norrbotten_country/Policy_Priorities',component:PolicyPrioritiesComponent},
  { path: 'CS3-Norrbotten_country/Recommended_Policies',component:RecommendedPoliciesComponent},

  { path: 'CS4-Murcia_region',component:CaseStudyChallengesSectorsComponent},
  { path: 'CS4-Murcia_region/Visualize_ECVs_and_climate_hazards',component:ECVComponent},
  { path: 'CS4-Murcia_region/Explore_assets_and_vulnerabilities',component:AssetsAndRisksComponent},
  { path: 'CS4-Murcia_region/Sectoral_Comparison', component:SectoralComparisonComponent},
  { path: 'CS4-Murcia_region/Policy_Priorities',component:PolicyPrioritiesComponent},
  { path: 'CS4-Murcia_region/Recommended_Policies',component:RecommendedPoliciesComponent},

  { path: 'CS5-Danube_delta',component:CaseStudyChallengesSectorsComponent},
  { path: 'CS5-Danube_delta/Visualize_ECVs_and_climate_hazards',component:ECVComponent},
  { path: 'CS5-Danube_delta/Explore_assets_and_vulnerabilities',component:AssetsAndRisksComponent},
  { path: 'CS5-Danube_delta/Sectoral_Comparison', component:SectoralComparisonComponent},
  { path: 'CS5-Danube_delta/Policy_Priorities',component:PolicyPrioritiesComponent},
  { path: 'CS5-Danube_delta/Recommended_Policies',component:RecommendedPoliciesComponent},

  
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

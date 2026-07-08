import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNeverMoreComponent } from './components/app-never-more/app-never-more.component';
import { LoginComponent } from './components/login/login.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { LogoutComponent } from './components/logout/logout.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpComponent } from './components/help/help.component';
import { RegisterComponent } from './components/register/register.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ToolSelectionComponent } from './components/tool-selection/tool-selection.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ClimateQuestion } from './climate_questions/climate-questions';
import {MatRadioModule} from '@angular/material/radio';
import { GamificationIntroPageComponent } from './components/gamification-tool/gamification-intro-page/gamification-intro-page.component';
import { RouterModule } from '@angular/router';
import { CatalogueExplorerComponent } from './components/catalogue-explorer/catalogue-explorer.component';
import { EuScaleToolComponent } from './components/eu-scale-tool/eu-scale-tool.component';
import { GamificationToolComponent } from './components/gamification-tool/gamification-tool.component';
import { CaseStudyToolComponent } from './components/case-study-tool/case-study-tool.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './keycloak-init';
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
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComparisonOfResultsComponent } from './components/gamification-tool/groups/comparison-of-results/comparison-of-results.component';
import { Mission2ForGroupsComponent } from './components/gamification-tool/groups/mission-2-for-groups/mission-2-for-groups.component';
import { ClimateChangeGameForGroupsComponent } from './components/gamification-tool/groups/climate-change-game-for-groups/climate-change-game-for-groups.component';
import { FinalResultsForGroupsComponent } from './components/gamification-tool/groups/final-results-for-groups/final-results-for-groups.component';
import { CaseStudyToolInfoComponent } from './components/case-study-tool/case-study-tool-info/case-study-tool-info.component';
import { CaseStudySelectedInfoComponent } from './components/case-study-tool/case-study-selected-info/case-study-selected-info.component';
import { CaseStudyChallengesSectorsComponent } from './components/case-study-tool/case-study-challenges-sectors/case-study-challenges-sectors.component';
import { CaseStudyRelevantSectorsComponent } from './components/case-study-tool/case-study-relevant-sectors/case-study-relevant-sectors.component';
import { CaseStudyHazardDataComponent } from './components/case-study-tool/case-study-hazard-data/case-study-hazard-data.component';
import { GamificationMissionResultsComponent } from './components/gamification-tool/gamification-mission-results/gamification-mission-results.component';
import { GamificationMissionSelectPageComponent } from './components/gamification-tool/gamification-mission-select-page/gamification-mission-select-page.component';
import { PolicyScenariosComponent } from './components/case-study-tool/policy-scenarios/policy-scenarios.component';
import { ScenarioAndResultsComponent } from './components/case-study-tool/scenario-and-results/scenario-and-results.component';
import { ScenarioAppliedResultsComponent } from './components/case-study-tool/scenario-applied-results/scenario-applied-results.component';
import { ClimateChangeGameComponent } from './components/gamification-tool/climate-change-game/climate-change-game.component';
import { KeyDefinitionsComponent } from './components/gamification-tool/key-definitions/key-definitions.component';
import { ResultsGraphComponent } from './components/gamification-tool/results-graph/results-graph.component';
import { GamificationClimateChangeGameComponent } from './components/gamification-tool/gamification-climate-change-game/gamification-climate-change-game.component';
import { GamificationToolInfoComponent } from './components/case-study-tool/gamification-tool-info/gamification-tool-info.component';
import { CatalogueExplorerInfoComponent } from './components/case-study-tool/catalogue-explorer-info/catalogue-explorer-info.component';
import { EuScaleToolInfoComponent } from './components/case-study-tool/eu-scale-tool-info/eu-scale-tool-info.component';
import { CaseStudyInfoComponent } from './components/case-study-tool/case-study-info/case-study-info.component';
import { AuthRedirectComponent } from './components/case-study-tool/auth-redirect/auth-redirect.component';
import { AboutUsInfoComponent } from './components/case-study-tool/about-us-info/about-us-info.component';
import { HelpInfoComponent } from './components/case-study-tool/help-info/help-info.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({ declarations: [
        AppComponent,
        AppNeverMoreComponent,
        LoginComponent,
        LogoutComponent,
        HeaderComponent,
        GamificationToolInfoComponent,
        CatalogueExplorerInfoComponent,
        EuScaleToolInfoComponent,
        CaseStudyInfoComponent,
        AuthRedirectComponent,
        AboutUsInfoComponent,
        HelpInfoComponent,
        AboutUsComponent,
        HelpComponent,
        RegisterComponent,
        HomePageComponent,
        ToolSelectionComponent,
        GamificationMissionSelectPageComponent,
        FooterComponent,
        CatalogueExplorerComponent,
        EuScaleToolComponent,
        GamificationToolComponent,
        CaseStudyToolComponent,
        ForgotPasswordComponent,
        GeneralDescriptionComponent,
        GamificationIntroPageComponent,
        ECVComponent,
        AssetsAndRisksComponent,
        SectoralComparisonComponent,
        PolicyPrioritiesComponent,
        RecommendedPoliciesComponent,
        SinglePlayerComponent,
        GroupsComponent,
        PolicyRecommendationsComponent,
        GraphsComponent,
        Mission2Component,
        ClimateChangeAdaptationComponent,
        AdaptationIndicatorsComponent,
        PolicyRecommendationsForGroupComponent,
        GraphsForGroupComponent,
        ComparisonOfResultsComponent,
        Mission2ForGroupsComponent,
        ClimateChangeGameForGroupsComponent,
        FinalResultsForGroupsComponent,
        CaseStudyToolInfoComponent,
        CaseStudySelectedInfoComponent,
        CaseStudyChallengesSectorsComponent,
        CaseStudyRelevantSectorsComponent,
        CaseStudyHazardDataComponent,
        PolicyScenariosComponent,
        ScenarioAndResultsComponent,
        ScenarioAppliedResultsComponent,
        ClimateChangeGameComponent,
        KeyDefinitionsComponent,
        ResultsGraphComponent,
        GamificationMissionResultsComponent,
        GamificationClimateChangeGameComponent,
        
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent], imports: [MatRadioModule,
        MatProgressBarModule,
        KeycloakAngularModule,
        BrowserModule,
        AppRoutingModule,
        AngularMaterialModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        RouterModule,
        TranslateModule.forRoot({
            defaultLanguage: 'EN',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        })], providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService]
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{

  constructor(private router: Router, private authService:AuthService,private translate: TranslateService,private keycloakService:KeycloakService) {
    translate.setDefaultLang('EN');
    }
  
    switchLanguage(language: string) {
      this.translate.use(language);
    }
   


ngOnInit(): void {
  this.authService.login();
  console.log(this.keycloakService.getUsername());
}

  // tools = [
  //   { name: 'Gamification tool', image: '/assets/images/gamification-tool.png',
  //     description:'The main objective of NEVERMORE gamification tool is to create awareness about climate change. It is developed as an educational simulation game where players explore different solutions to fight  and adapt to the impacts of climate change. The game teaches players about the impacts of climate change while inspiring hope and motivating users to act and find effective solutions that will help to define a greener, better adapted and safer future. The game players must complete two different missions to finish the game. ' },
  //   { name: 'Catalogue Explorer', image: '/assets/images/catalogue_explorer.png',
  //     description:'The Adaptation and Mitigation ( A&M) Catalogue Tool is an integral component of the NEVERMORE ICT toolkit. This user-friendly tool aligns with the core principles of the ICT toolkit, aiming to empower users in understanding the intricate interplay between climate change and adaptation and mitigation policies through a user-friendly and interactive interface. The tool is designed to provide a catalogue of solutions related to climate change mitigation and adaptation. It encompasses a review of cross-sectoral measures that have already been put into action, potential solutions identified through literature research, and scenarios collaboratively developed with local councils and stakeholders.' 
  //    },
  //   { name: 'EU-SCALE Tool', image: '/assets/images/eu-scale-tool.png',
  //     description:'The goal of the tool is to become a “policy-making tool”  that could offer relevant policy recommendations. The tool will be using pre-simulated data results from an Integrated Assessment Model (IAM), in order to decrease the complexity through the means of lowering the degree of freedom of the client input variables. This filtering and reduction of inputs will be done using the stakeholders’ knowledge.' 
  //    },
  //   { name: 'Case Study Tool', image: '/assets/images/case-study-tool.png',
  //     description:'The NEVERMORE Case Study tool will be a software component that allows users to select a case study and display the main climate change impacts, vulnerabilities and risks.  The information provided will be useful in order to create different adaptation and mitigation policy action scenarios based on measures selected by the user from the A&M catalogue at local scale. ' 
  //    }
  // ];

  tools = [
    { name: 'GAMIFICATION_TOOL_TITLE', image: '/assets/images/gamification-tool.png',
      description:'GAMIFICATION_TOOL_DESCRIPTION' },
    { name: 'CATALOGUE_EXPLORER_TITLE', image: '/assets/images/catalogue_explorer.png',
      description:'CATALOGUE_EXPLORER_TOOL_DESCRIPTION' 
     },
    { name: 'EU_SCALE_TOOL_TITLE', image: '/assets/images/eu-scale-tool.png',
      description:'EU_SCALE_TOOL' 
     },
    { name: 'CASE_STUDY_TOOL_TITLE', image: '/assets/images/case-study-tool.png',
      description:'CASE_STUDY_TOOL_DESCRIPTION' 
     }
  ];

  selectedToolIndex: number = 1; 
  getVisibleTools(): any[] {
    const total = this.tools.length;
    const leftIndex = (this.selectedToolIndex - 1 + total) % total;
    const rightIndex = (this.selectedToolIndex + 1) % total;

    return [this.tools[leftIndex], this.tools[this.selectedToolIndex], this.tools[rightIndex]];
  }


  getSpecificToolInfo():any{
    return this.tools[this.selectedToolIndex];
  }

  navigateLeft(): void {
    this.selectedToolIndex = (this.selectedToolIndex - 1 + this.tools.length) % this.tools.length;
  }

  navigateRight(): void {
    this.selectedToolIndex = (this.selectedToolIndex + 1) % this.tools.length;
  }
  selectTool(): void {
    const selectedTool = this.tools[this.selectedToolIndex];

    switch (selectedTool.name) {
      case 'GAMIFICATION_TOOL_TITLE':
        this.router.navigate(['/gamificationInfo']);
        break;
      case 'CATALOGUE_EXPLORER_TITLE': 
        this.router.navigate(['/catalogueExplorer']);
        break;
      case 'EU_SCALE_TOOL_TITLE':
        this.router.navigate(['/euScale']);
        break;
      case 'CASE_STUDY_TOOL_TITLE':
        this.router.navigate(['/caseStudyToolInfo']);
        break;
      default:
        console.log('No route found for this tool');
        break; 
    }
  }
}

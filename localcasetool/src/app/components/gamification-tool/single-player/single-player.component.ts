import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css'],
})
export class SinglePlayerComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('EN');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  checkRoleSelectedStatus: boolean = true;

  rolesList = [
    {
      roleName: 'ENERGY_EXPERT',
      status: false,
      roleImage: 'assets/images/energy_expert.png',
    },
    {
      roleName: 'ENVIRONMENTAL_EXPERT',
      status: true,
      roleImage: 'assets/images/enviromental_expert.png',
    },
    {
      roleName: 'ECONOMY_EXPERT',
      status: true,
      roleImage: 'assets/images/economy_expert.png',
    },
    {
      roleName: 'SOCIAL_EXPERT',
      status: true,
      roleImage: 'assets/images/social_expert.png',
    },
  ];

  // energyImg = 'assets/images/energy_expert.png';
  // environmentalImage = 'assets/images/enviromental_expert.png';
  // economyImage = 'assets/images/economy_expert.png';
  // socialImage = 'assets/images/social_expert.png';

  role = '';
  roleImage = '';

  checkRoleSelected(roleSelected: string) {
    if (roleSelected == 'ENERGY_EXPERT') {
      this.checkRoleSelectedStatus = false;
      // this.roleImage = this.energyImg;
    } else if (roleSelected == 'ENVIRONMENTAL_EXPERT') {
      this.checkRoleSelectedStatus = true;
      // this.roleImage = this.environmentalImage;
    } else if (roleSelected == 'ECONOMY_EXPERT') {
      this.checkRoleSelectedStatus = true;
      // this.roleImage = this.economyImage;
    } else if (roleSelected == 'SOCIAL_EXPERT') {
      this.checkRoleSelectedStatus = true;
      // this.roleImage = this.socialImage;
    }
    console.log(roleSelected);
  }

  selectedRole: string = '';
}

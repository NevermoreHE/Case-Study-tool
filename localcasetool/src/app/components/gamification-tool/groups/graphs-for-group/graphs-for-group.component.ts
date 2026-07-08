import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
interface ClimateMitigationGraphs{
  graphImage:string;
  graphInfo:string;
  graphTemp:string;
}


@Component({
  selector: 'app-graphs-for-group',
  templateUrl: './graphs-for-group.component.html',
  styleUrls: ['./graphs-for-group.component.css']
})
export class GraphsForGroupComponent {

  selectedGraph!: string;
  graphsForClimateMitigation: ClimateMitigationGraphs[]= [
    {graphInfo: 'OPTION_1',graphImage:'assets/images/increasing_temp_graph.png',graphTemp:'assets/images/increasing_temp.png'},
    {graphInfo: 'OPTION_2',graphImage:'',graphTemp:''}

  ]


  constructor(private translate: TranslateService) {
      translate.setDefaultLang('EN');
    }
  
    switchLanguage(language: string) {
      this.translate.use(language);
    }

}

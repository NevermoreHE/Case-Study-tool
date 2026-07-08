import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This makes the service globally available
})
export class DataStorageService {
  private selected_title_case: string = ''; // Store the selected title
  private selected_sector: string = '';
  private title_case:string = '';
  private selectedHazard_In_ECV:string = '';

  // Getter method to retrieve the selected title
  getSelectedTitleCase(): string {
    return this.selected_title_case;
  }

  // Setter method to update the selected title
  setSelectedTitleCase(value: string): void {
    console.log('You have chosen:', value);
    this.selected_title_case = value;
  }

  getSelectedSector(): string {
    return this.selected_sector;
  }

  setSelectedSector(value: string): void {
    console.log('You have chosen:', value);
    this.selected_sector = value;
  }

  getSelectedHazardFromEcv(){
    return this.selectedHazard_In_ECV;
  }

  setSelectedHazardFromEcv(value:string):void{
    console.log('You have chosen the value for the hazard in the ECV :',value);
    this.selectedHazard_In_ECV = value;
  }



  // getTitleCase():string{
  //   return this.title_case;
  // }

  // setTitleCase(value:string):void{
  //   this.title_case = value;
  // }
}

import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataStorageService } from '../../titleCase/data-storage.service';
import { fromLonLat } from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Map, View } from 'ol';
import { Icon, Style } from 'ol/style';
import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { HazardsService } from 'src/app/components/services/hazards/hazards.service';
import { SectorsService } from 'src/app/components/services/sectors/sectors.service';

@Component({
  selector: 'app-assets-and-risks',
  templateUrl: './assets-and-risks.component.html',
  styleUrls: ['./assets-and-risks.component.css'],
})
export class AssetsAndRisksComponent implements OnInit, AfterViewInit, AfterViewChecked {

  
  @ViewChild('mapdiv', { static: false }) mapDiv!: ElementRef;
  selectedTitleCase: string = '';
  selectedTopic: string = '';
  selectedHazard: string = '';
  selectedSector: string = '';


  // optionsPreselectedForDifferentCaseStudyies(){
  //   if (this.selectedTitleCase == "CS1_CRETE_ISLAND"){
  //       this.selectedTopic= 'vulnerability';
  //       this.selectedHazard= 'hazard-options-Drought Days';
  //       this.selectedSector = 'sector-options-Agriculture, forest and fishing';
  //   }else if (this.selectedTitleCase == "CS2_TRENTINO_REGION"){
  //       this.selectedTopic= 'vulnerability';
  //       this.selectedHazard= 'hazard-options-Heatwave';
  //       this.selectedSector = 'sector-options-Agriculture, forest and fishing';
  //   }else if (this.selectedTitleCase == "CS3_NORRBOTTEN_COUNTRY"){
  //       this.selectedTopic= 'vulnerability';
  //       this.selectedHazard= 'hazard-options-Flood';
  //       this.selectedSector = 'sector-options-Agriculture, forest and fishing';
  //   }else if (this.selectedTitleCase == "CS4_MURCIA_REGION"){
  //       this.selectedTopic= 'vulnerability';
  //       this.selectedHazard= 'hazard-options-Flood';
  //       this.selectedSector = 'sector-options-Agriculture, forest and fishing';
  //   }else if (this.selectedTitleCase == "CS5_DANUBE_DELTA"){
  //       this.selectedTopic= 'vulnerability';
  //       this.selectedHazard= 'hazard-options-Drought Days';
  //       this.selectedSector = 'sector-options-Water and waste';
  //   }
  // }


  olNeedsChecked: boolean = false;
  showMap: boolean = false;
  openLayerMapImage: string = '';

  CS1_Crete_Island = {
   case_latitude : 35.130172,
   case_longitude : 26.054294
  }

  CS2_Trentino_Region = {
    case_latitude : 46.0671025,
    case_longitude : 11.1235709
   }

   CS3_Norbotten_country = {
    case_latitude : 67.062337,
    case_longitude : 21.095334
   }

   CS4_Murcia_Region = {
    case_latitude : 37.9816728,
    case_longitude : -1.1280051
   }

   CS5_Danube_Delta = {
    case_latitude : 45.178046,
    case_longitude : 29.227718
   }


  latitude: number = 44.9404846;
  longitude: number = 26.0262464;
  choices_image: string = '';
  choices_counter: number = 0;
  choices_description: string = '';

  constructor(
    private translate: TranslateService,
    private dataStorageService: DataStorageService,
    private hazardService:HazardsService,
    private sectorService:SectorsService
  ) {
    translate.setDefaultLang('EN');
  }

sectorsReceived:any[] = [];
hazardsReceived:any[] = [];
theRoutingTitleCase:string = '';

  ngOnInit(): void {
    this.selectedTitleCase = this.dataStorageService.getSelectedTitleCase();
    console.log('Selected Title Case from service:', this.selectedTitleCase);
    this.sectorService.getSectorsForSpecificCaseStudy(this.selectedTitleCase).subscribe(data => this.sectorsReceived =JSON.parse(data));
    this.hazardService.getSpecificHazardsForSelectedCaseStudy(this.selectedTitleCase).subscribe(data => this.hazardsReceived =JSON.parse(data));

    if (this.selectedTitleCase == "CS1_CRETE_ISLAND"){
        this.selectedTopic= 'vulnerability';
        this.selectedHazard= 'hazard-options-Drought Days';
        this.selectedSector = 'sector-options-Agriculture, forest and fishing';
    }else if (this.selectedTitleCase == "CS2_TRENTINO_REGION"){
        this.selectedTopic= 'vulnerability';
        this.selectedHazard= 'hazard-options-Heatwave';
        this.selectedSector = 'sector-options-Agriculture, forest and fishing';
    }else if (this.selectedTitleCase == "CS3_NORRBOTTEN_COUNTRY"){
        this.selectedTopic= 'vulnerability';
        this.selectedHazard= 'hazard-options-Flood';
        this.selectedSector = 'sector-options-Agriculture, forest and fishing';
    }else if (this.selectedTitleCase == "CS4_MURCIA_REGION"){
        this.selectedTopic= 'vulnerability';
        this.selectedHazard= 'hazard-options-Flood';
        this.selectedSector = 'sector-options-Agriculture, forest and fishing';
    }else if (this.selectedTitleCase == "CS5_DANUBE_DELTA"){
        this.selectedTopic= 'vulnerability';
        this.selectedHazard= 'hazard-options-Drought Days';
        this.selectedSector = 'sector-options-Water and waste';
    }

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

    this.showMap = true;
    this.olNeedsChecked = true;
    this.default_description =
    'CASE_STUDY_TOOL_COMPONENT.MURCIA_REGION_COMPONENT.ASSETS_AND_RISKS_COMPONENT.DESCRIPTION_BOX';
  }

  ngAfterViewInit(): void {
    // This is where we initialize the map, but we wait for the container to be visible first
    if (this.showMap && this.mapDiv) {
      this.initMap();
    }
  }

  ngAfterViewChecked(): void {
    if (this.showMap && this.mapDiv && !this.mapDiv.nativeElement.hasChildNodes()) {
      this.initMap();  // Ensure we initialize the map if not initialized yet
    }
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  default_description: string =
    'CASE_STUDY_TOOL_COMPONENT.MURCIA_REGION_COMPONENT.ASSETS_AND_RISKS_COMPONENT.DESCRIPTION_BOX';

  image_for_exploring_choices() {
    if (this.choices_counter == 3) {
      this.choices_image = 'assets/images/point_on_map.png';
    }
  }

  specific_description() {
    this.choices_counter += 1;
    if (this.choices_counter == 3) {
      this.choices_description =
        'Here we will put the specific description for all the choices you made';
    }
    console.log(this.choices_counter);
    console.log(this.selectedTitleCase);
  }


  // Initialize OpenLayers map
  public initMap(): void {
    if(this.selectedTitleCase == 'CS1_CRETE_ISLAND'){
      const coordinates = fromLonLat([this.CS1_Crete_Island.case_longitude, this.CS1_Crete_Island.case_latitude]);
      console.log(`the longitude for ${this.selectedTitleCase} is : ${this.CS1_Crete_Island.case_longitude} \n`, `The latitude for ${this.selectedTitleCase} is : ${this.CS1_Crete_Island.case_latitude}` )
       const map = new Map({
        target: this.mapDiv.nativeElement, // The div where the map will be displayed
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: coordinates,
          zoom: 16,
        }),
      });
  
      const marker = new Feature({
        geometry: new Point(coordinates),
      });
  
      marker.setStyle(
        new Style({
          image: new Icon({
            src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png', 
          }),
        })
      );
  
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [marker],
        }),
      });
  
      map.addLayer(vectorLayer);
      map.once('postrender', () => {
        const canvas = map.getViewport().querySelector('canvas');
        if (canvas) {
          this.openLayerMapImage = canvas.toDataURL('image/png');
        }
      });
  
      console.log('Map initialized');
    }else if(this.selectedTitleCase == 'CS2_TRENTINO_REGION'){
      const coordinates = fromLonLat([this.CS2_Trentino_Region.case_longitude, this.CS2_Trentino_Region.case_latitude]);
      console.log(`the longitude for ${this.selectedTitleCase} is : ${this.CS2_Trentino_Region.case_longitude} \n`, `The latitude for ${this.selectedTitleCase} is : ${this.CS2_Trentino_Region.case_latitude}` )
        const map = new Map({
        target: this.mapDiv.nativeElement, // The div where the map will be displayed
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: coordinates,
          zoom: 16,
        }),
      });
  
      const marker = new Feature({
        geometry: new Point(coordinates),
      });
  
      marker.setStyle(
        new Style({
          image: new Icon({
            src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png', 
          }),
        })
      );
  
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [marker],
        }),
      });
  
      map.addLayer(vectorLayer);
      map.once('postrender', () => {
        const canvas = map.getViewport().querySelector('canvas');
        if (canvas) {
          this.openLayerMapImage = canvas.toDataURL('image/png');
        }
      });
  
      console.log('Map initialized');
    }else if(this.selectedTitleCase == 'CS3_NORRBOTTEN_COUNTRY'){
      const coordinates = fromLonLat([this.CS3_Norbotten_country.case_longitude, this.CS3_Norbotten_country.case_latitude]);
      console.log(`the longitude for ${this.selectedTitleCase} is : ${this.CS3_Norbotten_country.case_longitude} \n`, `The latitude for ${this.selectedTitleCase} is : ${this.CS3_Norbotten_country.case_latitude}` )
        const map = new Map({
        target: this.mapDiv.nativeElement, // The div where the map will be displayed
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: coordinates,
          zoom: 16,
        }),
      });
  
      const marker = new Feature({
        geometry: new Point(coordinates),
      });
  
      marker.setStyle(
        new Style({
          image: new Icon({
            src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png', 
          }),
        })
      );
  
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [marker],
        }),
      });
  
      map.addLayer(vectorLayer);
      map.once('postrender', () => {
        const canvas = map.getViewport().querySelector('canvas');
        if (canvas) {
          this.openLayerMapImage = canvas.toDataURL('image/png');
        }
      });
  
      console.log('Map initialized');
    }else if(this.selectedTitleCase == 'CS4_MURCIA_REGION'){
      const coordinates = fromLonLat([this.CS4_Murcia_Region.case_longitude, this.CS4_Murcia_Region.case_latitude]);
      console.log(`the longitude for ${this.selectedTitleCase} is : ${this.CS4_Murcia_Region.case_longitude} \n`, `The latitude for ${this.selectedTitleCase} is : ${this.CS4_Murcia_Region.case_latitude}` )
        const map = new Map({
        target: this.mapDiv.nativeElement, // The div where the map will be displayed
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: coordinates,
          zoom: 16,
        }),
      });
  
      const marker = new Feature({
        geometry: new Point(coordinates),
      });
  
      marker.setStyle(
        new Style({
          image: new Icon({
            src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png', 
          }),
        })
      );
  
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [marker],
        }),
      });
  
      map.addLayer(vectorLayer);
      map.once('postrender', () => {
        const canvas = map.getViewport().querySelector('canvas');
        if (canvas) {
          this.openLayerMapImage = canvas.toDataURL('image/png');
        }
      });
  
      console.log('Map initialized');
    }else if(this.selectedTitleCase == 'CS5_DANUBE_DELTA'){
      const coordinates = fromLonLat([this.CS5_Danube_Delta.case_longitude, this.CS5_Danube_Delta.case_latitude]);
      console.log(`the longitude for ${this.selectedTitleCase} is : ${this.CS5_Danube_Delta.case_longitude} \n`, `The latitude for ${this.selectedTitleCase} is : ${this.CS5_Danube_Delta.case_latitude}` )
      const map = new Map({
        target: this.mapDiv.nativeElement, // The div where the map will be displayed
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: coordinates,
          zoom: 16,
        }),
      });
  
      const marker = new Feature({
        geometry: new Point(coordinates),
      });
  
      marker.setStyle(
        new Style({
          image: new Icon({
            src: 'https://openlayers.org/en/v4.6.5/examples/data/icon.png', 
          }),
        })
      );
  
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [marker],
        }),
      });
  
      map.addLayer(vectorLayer);
      map.once('postrender', () => {
        const canvas = map.getViewport().querySelector('canvas');
        if (canvas) {
          this.openLayerMapImage = canvas.toDataURL('image/png');
        }
      });
  
      console.log('Map initialized');
    }
    
  }

  checkOLNeeds() {
    // if (
    //   (this.selectedHazard === 'droughts'|| this.selectedHazard === 'flood'|| this.selectedHazard === 'heavy_rain'|| this.selectedHazard === 'heatwave'|| this.selectedHazard === 'cold_spell') &&
    //   (this.selectedSector === 'energy' ||this.selectedSector === 'agriculture' || this.selectedSector === 'water_and_waste'  || this.selectedSector === 'tourism' || this.selectedSector === 'industry_and_commerce')&&
    //   this.selectedTopic === 'vulnerability'
    // ) {
    //   this.olNeedsChecked = true;
    //   this.showMap = true;
    //   this.choices_description = 'Here is the description for the options you chose' // Show map after selecting the right options
    // } else {
    //   this.showMap = false;
    // }
      if (
      (this.selectedHazard != '') &&
      (this.selectedSector !='')&&
      this.selectedTopic === 'vulnerability'
    ) {
      this.olNeedsChecked = true;
      this.showMap = true;
      this.choices_description = 'Here is the description for the options you chose' // Show map after selecting the right options
    } else {
      this.showMap = false;
    }
  }

  onSubmit() {
    console.log('Selected value:', this.selectedHazard);
    alert(`You selected: ${this.selectedHazard}`);
  }

  // Trigger check when any of the select options change
  onSelectChange() {
    this.checkOLNeeds();
  }

  checkTheTopicValue() {
    console.log(this.selectedTopic);
  }

  checkTheHazardValue() {
    console.log(this.selectedHazard);
  }

  checkTheSectorValue() {
    console.log(this.selectedSector);
  }
}

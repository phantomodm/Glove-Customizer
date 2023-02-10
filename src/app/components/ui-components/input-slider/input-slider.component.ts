import { Component, Input, OnInit } from '@angular/core';
import { CarouselTile } from 'src/app/services/global.configs';
import { GloveApiService } from 'src/app/services/glove-api.service';

@Component({
  selector: 'app-input-slider',
  templateUrl: './input-slider.component.html',
  styleUrls: ['./input-slider.component.scss']
})
export class InputSliderComponent implements OnInit {
  @Input() dataSource: any;
  @Input() currentAttribute!: any;
  carouselTile = CarouselTile;
  custom: any;

  constructor(private gloveApi: GloveApiService) { }

  ngOnInit(): void {
    this.dataSource.forEach((data:any) => {
      if (data.imageUrl) {
        data.img = data.imageUrl;
        delete data.imageUrl
        return data;
      }
    return data;
    })

    this.custom = this.gloveApi.gloveCustom$.subscribe((result: any) => {
      if(this.custom != undefined) {
        this.custom = result;
      }
    })
  }

  addVariation(data: any) {
    try {
      if(data.attribute_pewc) {
        this.gloveApi.applyFormValue({ attribute_pewc: data.attribute_pewc, name: data.name})
        return
      }

      if(this.currentAttribute.title.toLowerCase() === 'webs') {
        this.gloveApi.applyFormValue({attribute_pewc: 'pewc_group_89335_89358', name: data.name});
        this.custom['pewc_group_89335_89358'] = data.name;
        this.gloveApi.gloveCustom.next(this.custom)
      }
    } catch (error) {
      console.log(error)
    }


  }

}

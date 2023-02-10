import { NguCarouselConfig } from "@ngu/carousel";

export const CarouselTile: NguCarouselConfig =
{
  grid: {xs: 1, sm: 2, md: 2 , lg: 3, all: 0},
  slide: 2,
  speed: 400,
  animation: 'lazy',
  loop: true,
  point: {
    visible: true
  },
  load: 2,
  touch: true,
  easing: 'ease'
};

export const filterGloveWebs = (db:any,payload:any) => {
  let collection = [];
  if(db != undefined) {
    collection = db.filter((f:any) => {
      return f.gloveType.find((m: any) => {
        if (m === payload.name.toLowerCase()) {
          return true;
        }
        return false;
      });
    });
  }
  return collection;
}

export const filterGloveSections = ( section?: any, glovePart?:any ): boolean => {
  let db = [];
  if (!section) {
    return false;
  }

  return section.includes(glovePart);
}

export const get_day_between_2day = (d1: Date, d2: Date): number => {
  let ms1: number = d1.getTime();
  let ms2: number = d2.getTime();
  return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
};

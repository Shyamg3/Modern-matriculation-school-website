import heroPlay from './assets/hero-play.webp';
import campus from './assets/campus.webp';
import gate from './assets/gate.webp';
import juniorRedCross from './assets/junior-red-cross.webp';
import sportsDay from './assets/sports-day.webp';
import awards from './assets/awards.webp';

export const photos = {
  campus,
  gate,
  jrc: juniorRedCross,
  sports: sportsDay,
  play: heroPlay,
  awards,
};

export const gallery = [
  { key: 'campus', src: photos.campus },
  { key: 'gate', src: photos.gate },
  { key: 'jrc', src: photos.jrc },
  { key: 'sports', src: photos.sports },
  { key: 'play', src: photos.play },
  { key: 'awards', src: photos.awards },
];

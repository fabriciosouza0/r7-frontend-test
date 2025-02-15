/*
  card width        = 360px
  tooltip width     = 183.7px
  image width       = 75px
  card padding-left = 16px
  gap               = 4px

  the formula is equal to (360px - 183.7px - 75px - 16px - 4px => 81.3px) for medium/large devices(desktops)
  the formula is equal to (300px - 183.7px - 75px - 16px - 4px => 21.3px) for mobile devices
*/
export const TOOLTIP_OFFSETS = {
  DESKTOP: 81.3,
  MOBILE: 21.3,
  CARP_P_L: 16,
  GAP: 4,
  RIGHT_GAP: 24,
};

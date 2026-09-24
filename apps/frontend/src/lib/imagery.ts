const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  lounge: unsplash('1585747860715-2ba37e788b70', 2400),
  chair: unsplash('1503951914875-452162b0f3f1'),
  fade: unsplash('1622286342621-4bd786c2447c'),
  beard: unsplash('1512690459411-b9245aed614b'),
  towel: unsplash('1599351431202-1e0f0137899a'),
  duo: unsplash('1517832606589-7157aff08e70'),
};

export const SERVICE_IMAGES: Record<string, string> = {
  'srv-classic': IMAGES.chair,
  'srv-fade': IMAGES.fade,
  'srv-gentleman': IMAGES.towel,
  'srv-beard-sculpt': IMAGES.beard,
  'srv-ritual': IMAGES.lounge,
  'srv-father-son': IMAGES.duo,
};

export const serviceImage = (id: string) => SERVICE_IMAGES[id] ?? IMAGES.chair;

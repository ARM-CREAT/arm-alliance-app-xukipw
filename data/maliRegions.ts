
export interface Region {
  id: string;
  name: string;
  capital: string;
  cercles: string[];
}

export const maliRegions: Region[] = [
  {
    id: 'kayes',
    name: 'Kayes',
    capital: 'Kayes',
    cercles: ['Bafoulabé', 'Diéma', 'Kayes', 'Kéniéba', 'Kita', 'Nioro du Sahel', 'Yélimané']
  },
  {
    id: 'koulikoro',
    name: 'Koulikoro',
    capital: 'Koulikoro',
    cercles: ['Banamba', 'Dioïla', 'Kangaba', 'Kati', 'Kolokani', 'Koulikoro', 'Nara']
  },
  {
    id: 'sikasso',
    name: 'Sikasso',
    capital: 'Sikasso',
    cercles: ['Bougouni', 'Kadiolo', 'Kolondiéba', 'Koutiala', 'Sikasso', 'Yanfolila', 'Yorosso']
  },
  {
    id: 'segou',
    name: 'Ségou',
    capital: 'Ségou',
    cercles: ['Barouéli', 'Bla', 'Macina', 'Niono', 'San', 'Ségou', 'Tominian']
  },
  {
    id: 'mopti',
    name: 'Mopti',
    capital: 'Mopti',
    cercles: ['Bandiagara', 'Bankass', 'Djenné', 'Douentza', 'Koro', 'Mopti', 'Ténenkou', 'Youwarou']
  },
  {
    id: 'tombouctou',
    name: 'Tombouctou',
    capital: 'Tombouctou',
    cercles: ['Diré', 'Goundam', 'Gourma-Rharous', 'Niafunké', 'Tombouctou']
  },
  {
    id: 'gao',
    name: 'Gao',
    capital: 'Gao',
    cercles: ['Ansongo', 'Bourem', 'Gao', 'Ménaka']
  },
  {
    id: 'kidal',
    name: 'Kidal',
    capital: 'Kidal',
    cercles: ['Abeïbara', 'Kidal', 'Tessalit', 'Tin-Essako']
  },
  {
    id: 'bamako',
    name: 'Bamako',
    capital: 'Bamako',
    cercles: ['Commune I', 'Commune II', 'Commune III', 'Commune IV', 'Commune V', 'Commune VI']
  },
  {
    id: 'taoudenit',
    name: 'Taoudénit',
    capital: 'Taoudénit',
    cercles: ['Araouane', 'Foum el Alba', 'Taoudénit']
  },
  {
    id: 'menaka',
    name: 'Ménaka',
    capital: 'Ménaka',
    cercles: ['Alata', 'Anderamboukane', 'Ménaka', 'Tidermène']
  }
];

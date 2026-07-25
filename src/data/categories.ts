import { Category, CategoryId } from '../types';
import { LANG } from '../i18n/locale';

type CatText = { title: string; subtitle: string; toWhom: string };

// Sabit alanlar (id/emoji/renk) + dile göre metinler.
const BASE: { id: CategoryId; emoji: string; color: string }[] = [
  { id: 'sevgili', emoji: '❤️', color: '#FF4D6D' },
  { id: 'anne', emoji: '👩', color: '#C77DFF' },
  { id: 'baba', emoji: '👨', color: '#4CC9F0' },
  { id: 'bff', emoji: '👯', color: '#FFB703' },
  { id: 'kardes', emoji: '👫', color: '#5C7CFA' },
  { id: 'eski', emoji: '💔', color: '#8D99AE' },
  { id: 'anonim', emoji: '🤫', color: '#06D6A0' },
];

const TEXT_TR: Record<CategoryId, CatText> = {
  sevgili: { title: 'Sevgilim', subtitle: 'Beni gerçekten tanıyor mu?', toWhom: 'sevgiline' },
  anne: { title: 'Annem', subtitle: 'Anne radarı çalışıyor mu?', toWhom: 'annene' },
  baba: { title: 'Babam', subtitle: 'Beni hâlâ ilkokulda mı sanıyor?', toWhom: 'babana' },
  bff: { title: 'En Yakın Arkadaşım', subtitle: 'Mezara kadar mı, Instagram arkadaşı mı?', toWhom: 'en yakın arkadaşına' },
  kardes: { title: 'Kardeşim', subtitle: 'Aynı evde büyüdük, bakalım tanıyor mu?', toWhom: 'kardeşine' },
  eski: { title: 'Eski Sevgilim', subtitle: 'Bazı şeyler unutulmuyor mu?', toWhom: 'eski sevgiline' },
  anonim: { title: 'Anonim', subtitle: 'Kim olduğumu söylemeden test et.', toWhom: 'test edeceğin kişiye' },
};

const TEXT_EN: Record<CategoryId, CatText> = {
  sevgili: { title: 'My Partner', subtitle: 'Do they really know me?', toWhom: 'partner' },
  anne: { title: 'My Mom', subtitle: 'Is the mom radar working?', toWhom: 'mom' },
  baba: { title: 'My Dad', subtitle: 'Does he still think I\'m in grade school?', toWhom: 'dad' },
  bff: { title: 'My Best Friend', subtitle: 'Ride or die, or just an Instagram friend?', toWhom: 'best friend' },
  kardes: { title: 'My Sibling', subtitle: 'Same house, but do they really know me?', toWhom: 'sibling' },
  eski: { title: 'My Ex', subtitle: 'Some things never fade, right?', toWhom: 'ex' },
  anonim: { title: 'Anonymous', subtitle: 'Test them without saying who you are.', toWhom: 'someone' },
};

const TEXT = LANG === 'tr' ? TEXT_TR : TEXT_EN;

export const CATEGORIES: Category[] = BASE.map((b) => ({
  ...b,
  ...TEXT[b.id],
}));

export function getCategory(id: string): Category {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

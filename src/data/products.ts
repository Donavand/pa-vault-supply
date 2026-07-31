export type PriceTier = {
  qty: number | string
  total: number | null
  each: number | null
  note?: string
}

export type Product = {
  id: number
  slug: string
  name: string
  brand: string
  quantity: number | 'sold'
  priceBook: 'cologne' | 'lv' | 'dm'
  image?: string
  description: string
}

export const cologneTiers: PriceTier[] = [
  { qty: 1, total: 40, each: 40 },
  { qty: 5, total: 170, each: 34 },
  { qty: 10, total: 300, each: 30 },
  { qty: 20, total: 540, each: 27 },
  { qty: 30, total: 750, each: 25 },
  { qty: 50, total: 1150, each: 23 },
  { qty: 100, total: 2000, each: 20 },
  { qty: 200, total: 3800, each: 19 },
  { qty: 500, total: 9000, each: 18 },
  { qty: '1k+', total: null, each: null, note: 'Must DM' },
]

export const lvTiers: PriceTier[] = [
  { qty: 1, total: 65, each: 65 },
  { qty: 2, total: 124, each: 62 },
  { qty: 3, total: 180, each: 60 },
  { qty: 4, total: 232, each: 58 },
  { qty: 5, total: 275, each: 55 },
  { qty: 6, total: 294, each: 49 },
  { qty: 7, total: 336, each: 48 },
  { qty: 8, total: 376, each: 47 },
  { qty: 9, total: 414, each: 46 },
  { qty: 10, total: 450, each: 45 },
  { qty: 20, total: 860, each: 43 },
  { qty: 50, total: 2050, each: 41 },
  { qty: 100, total: 3900, each: 39 },
  { qty: 200, total: 7200, each: 36 },
]

function p(
  id: number,
  slug: string,
  name: string,
  brand: string,
  quantity: number | 'sold',
  priceBook: Product['priceBook'],
  description: string,
  image?: string,
): Product {
  return { id, slug, name, brand, quantity, priceBook, description, image }
}

export const products: Product[] = [
  p(1, 'baccarat-rouge-540', 'Red Baccarat Rouge 540', 'Maison Francis Kurkdjian', 40, 'cologne', 'A radiant amber floral on saffron, jasmine, and ambergris — warm, airy, and instantly recognizable.', '/products/baccarat.png'),
  p(2, 'lv-imagination', 'Imagination', 'Louis Vuitton', 'sold', 'lv', 'Bright citrus and tea over clean amber woods. Fresh, polished daytime energy.', '/products/lv-imagination.png'),
  p(3, 'baccarat-rouge-540-white', 'Baccarat Rouge 540 (White)', 'Maison Francis Kurkdjian', 'sold', 'cologne', 'The white-bottle Baccarat DNA — softer glow with the same signature trail.', '/products/baccarat-white.png'),
  p(4, 'creed-aventus', 'Aventus', 'Creed', 'sold', 'cologne', 'Pineapple, birch, and musk — smoky fruit up top with a woody night dry-down.', '/products/aventus.png'),
  p(5, 'lv-california-dream', 'California Dream', 'Louis Vuitton', 'sold', 'lv', 'Sunny citrus and soft florals with easy California heat.', '/products/lv-california.png'),
  p(6, 'dior-sauvage-elixir', 'Sauvage Elixir', 'Dior', 'sold', 'cologne', 'Concentrated spice and lavender with serious cold-weather projection.', '/products/sauvage-elixir.png'),
  p(7, 'jpg-le-male-elixir', 'Le Male Elixir', 'Jean Paul Gaultier', 'sold', 'cologne', 'Honeyed tobacco and lavender — sweet, strong, and club-ready.', '/products/le-male-elixir.png'),
  p(8, 'valentino-intense', 'Born in Roma Intense', 'Valentino', 'sold', 'cologne', 'Deeper Roma with vanilla, vetiver, and extra nighttime heat.', '/products/valentino-intense.png'),
  p(9, 'tom-ford-lost-cherry', 'Lost Cherry', 'Tom Ford', 1, 'cologne', 'Candied cherry, almond, and tonka — loud, sweet, and unforgettable.', '/products/lost-cherry.png'),
  p(10, 'tom-ford-bitter-peach', 'Bitter Peach', 'Tom Ford', 21, 'cologne', 'Juicy peach with a bitter edge over cognac and vanilla.', '/products/bitter-peach.png'),
  p(11, 'valentino-green-stravaganza', 'Green Stravaganza', 'Valentino', 'sold', 'cologne', 'Green, vibrant Roma energy with floral lift.', '/products/valentino-green-strav.png'),
  p(12, 'valentino-donna-green-stravaganza', 'Donna Green Stravaganza', 'Valentino', 4, 'cologne', 'A green floral twist on Donna Born in Roma — bright and versatile.', '/products/valentino-green.png'),
  p(13, 'dior-sauvage-edp', 'Sauvage EDP', 'Dior', 'sold', 'cologne', 'Bergamot, pepper, and ambroxan — the modern mass-appeal classic.', '/products/sauvage-edp.png'),
  p(14, 'xerjoff-erba-pura', 'Erba Pura', 'Xerjoff', 14, 'cologne', 'Bright Mediterranean fruit over soft musk — sunny niche energy.', '/products/erba-pura.png'),
  p(17, 'tom-ford-oud-wood', 'Oud Wood', 'Tom Ford', 'sold', 'cologne', 'Smooth oud, rosewood, and cardamom — rare woods done clean.', '/products/oud-wood.png'),
  p(18, 'valentino-coral-fantasy', 'Coral Fantasy', 'Valentino', 'sold', 'cologne', 'Coral-toned sweetness with citrus and amber warmth.', '/products/coral-fantasy.png'),
  p(19, 'ysl-y-edp', 'Y EDP', 'Yves Saint Laurent', 'sold', 'cologne', 'Fresh apple and sage over warm woods — office to weekend.', '/products/ysl-y.png'),
  p(20, 'creed-silver-mountain-water', 'Silver Mountain Water', 'Creed', 9, 'cologne', 'Crisp bergamot, green tea, and musk — cold mountain air freshness.', '/products/silver-mountain.png'),
  p(21, 'ysl-myself', 'Myself', 'Yves Saint Laurent', 'sold', 'cologne', 'Bergamot, orange blossom, and warm woods with a skin-close dry-down.', '/products/ysl-myself.png'),
  p(22, 'tom-ford-fucking-fabulous', 'Fucking Fabulous', 'Tom Ford', 'sold', 'cologne', 'Leather, clary sage, and tonka — soft suede luxury with a bold name.', '/products/fucking-fabulous.png'),
  p(23, 'tom-ford-tobacco-vanille', 'Tobacco Vanille', 'Tom Ford', 3, 'cologne', 'Rich tobacco leaf wrapped in vanilla and spice — cold-weather staple.', '/products/tobacco-vanille.png'),
  p(24, 'valentino-donna-pink', 'Donna Born in Roma', 'Valentino', 'sold', 'cologne', 'Blackcurrant, vanilla, and jasmine — sweet floral nights-out energy.', '/products/donna-pink.png'),

  p(25, 'chanel-coco-mademoiselle', 'Coco Mademoiselle', 'Chanel', 'sold', 'cologne', 'Orange, rose, and patchouli — bright, feminine, and endlessly wearable.', '/products/coco-mademoiselle.png'),
  p(26, 'bleu-de-chanel-edp', 'Bleu de Chanel EDP', 'Chanel', 'sold', 'cologne', 'Citrus woods and incense — clean, sharp, and modern masculine.', '/products/bleu-edp.png'),
  p(27, 'acqua-di-gio-profumo', 'Acqua di Gio Profumo', 'Giorgio Armani', 'sold', 'cologne', 'Mineral aquatic with incense depth — fresher Gio with darker edge.', '/products/acqua-profumo.png'),
  p(28, 'prada-paradoxe-intense', 'Paradoxe Intense', 'Prada', 'sold', 'cologne', 'Richer floral amber Paradoxe — sweet, bold, and designer-loud.', '/products/paradoxe-intense.png'),
  p(29, 'acqua-di-gio-edt', 'Acqua di Gio EDT', 'Giorgio Armani', 3, 'cologne', 'Classic marine citrus freshness — clean summer staple.', '/products/acqua-gio-edt.png'),
  p(30, 'ysl-mon-paris', 'Mon Paris', 'Yves Saint Laurent', 'sold', 'cologne', 'Sweet berry floral with a modern YSL punch.', '/products/mon-paris.png'),
  p(31, 'good-girl-blush', 'Good Girl Blush', 'Carolina Herrera', 'sold', 'cologne', 'Playful blush take on Good Girl — sweet, floral, and flirty.', '/products/good-girl-blush.png'),
  p(32, 'miss-dior', 'Miss Dior', 'Dior', 'sold', 'cologne', 'Fresh rose and peony elegance — soft, romantic daytime floral.', '/products/miss-dior.png'),
  p(33, 'initio-side-effect', 'Side Effect', 'Initio', 2, 'cologne', 'Rum, vanilla, and tobacco — boozy niche heat for night.', '/products/side-effect.png'),
  p(34, 'le-labo-santal-33', 'Santal 33', 'Le Labo', 'sold', 'cologne', 'Iconic sandalwood and leather — creamy, woody cult classic.', '/products/santal-33.png'),
  p(35, 'paco-1-million', '1 Million', 'Paco Rabanne', 'sold', 'cologne', 'Spicy cinnamon sweetness in the gold bar bottle energy.', '/products/one-million.png'),
  p(36, 'pdm-delina-exclusif', 'Delina Exclusif', 'Parfums de Marly', 'sold', 'cologne', 'Richer Delina — rose, vanilla, and oud depth.', '/products/delina-exclusif.png'),
  p(37, 'tom-ford-ombre-leather', 'Ombré Leather', 'Tom Ford', 'sold', 'cologne', 'Smooth leather and jasmine — desert heat in a bottle.', '/products/ombre-leather.png'),
  p(38, 'versace-eros', 'Eros', 'Versace', 'sold', 'cologne', 'Mint, apple, and vanilla — loud blue-bottle club scent.', '/products/versace-eros.png'),
  p(39, 'valentino-extradose', 'Extradose', 'Valentino', 'sold', 'cologne', 'Concentrated Valentino intensity — bold designer projection.', '/products/valentino-extradose.png'),
  p(40, 'versace-eros-flame', 'Eros Flame', 'Versace', 'sold', 'cologne', 'Peppery, warmer Eros — spicy and sweet for colder nights.', '/products/eros-flame.png'),
  p(41, 'paco-1-million-elixir', '1 Million Elixir', 'Paco Rabanne', 'sold', 'cologne', 'Thicker, sweeter Million — tonic and woody spice.', '/products/one-million-elixir.png'),
  p(42, 'bad-boy-elixir', 'Bad Boy Elixir', 'Carolina Herrera', 'sold', 'cologne', 'Concentrated Bad Boy — cocoa, amber, and night heat.', '/products/bad-boy-elixir.png'),
  p(43, 'jpg-le-male-le-parfum-intense', 'Le Male Le Parfum Intense', 'Jean Paul Gaultier', 'sold', 'cologne', 'Deeper Le Male oriental — cardamom, lavender, and woods.', '/products/le-male-parfum.png'),
  p(44, 'bond-greenwich-village', 'Greenwich Village', 'Bond No. 9', 'sold', 'cologne', 'NYC niche blend — green, woody city energy.', '/products/greenwich-village.png'),
  p(45, 'jpg-ultra-male', 'Ultra Male', 'Jean Paul Gaultier', 48, 'cologne', 'Pear and vanilla bomb — sweet, loud, and ultra wearable.', '/products/ultra-male.png'),
  p(46, 'jpg-le-beau-le-parfum', 'Le Beau Le Parfum', 'Jean Paul Gaultier', 'sold', 'cologne', 'Coconut woods Le Beau — tropical, smooth, and bold.', '/products/le-beau.png'),
  p(47, 'valentino-pink-pp', 'Pink PP', 'Valentino', 10, 'cologne', 'Pink Valentino designer energy — sweet, bright, and playful.', '/products/valentino-pink-pp.png'),
  p(48, 'gucci-bloom', 'Bloom', 'Gucci', 'sold', 'cologne', 'White floral tuberose and jasmine — lush and feminine.', '/products/gucci-bloom.png'),
  p(49, 'armaf-club-de-nuit', 'Club de Nuit', 'Armaf', 32, 'cologne', 'Sharp citrus woods — crowd-favorite Aventus-adjacent energy.', '/products/club-de-nuit.png'),
  p(50, 'ysl-libre', 'Libre', 'Yves Saint Laurent', 'sold', 'cologne', 'Lavender orange blossom — bold, modern, and feminine.', '/products/ysl-libre.png'),
  p(51, 'chanel-no5-leau', "No. 5 L'Eau", 'Chanel', 17, 'cologne', 'Fresher take on No. 5 — citrus aldehydes with classic Chanel polish.', '/products/chanel-5-leau.png'),
  p(52, 'bleu-de-chanel-parfum', 'Bleu de Chanel Parfum', 'Chanel', 'sold', 'cologne', 'Richest Bleu — cedar, incense, and smooth projection.', '/products/bleu-parfum.png'),
  p(53, 'chance-chanel-edt', 'Chance EDT', 'Chanel', 24, 'cologne', 'Bright pink pepper and jasmine — playful Chanel freshness.', '/products/chance-edt.png'),
  p(54, 'chance-eau-splendide', 'Chance Eau Splendide', 'Chanel', 'sold', 'cologne', 'Berry-rose Chance twist — soft, sparkling, and feminine.', '/products/chance-splendide.png'),
  p(55, 'burberry-her-elixir', 'Her Elixir', 'Burberry', 33, 'cologne', 'Sweeter, denser Her — strawberry and woody warmth.', '/products/burberry-her-elixir.png'),
  p(56, 'burberry-her-edp', 'Her EDP', 'Burberry', 'sold', 'cologne', 'Berry and jasmine London polish — bright and fruity.', '/products/burberry-her-edp.png'),
  p(57, 'versace-bright-crystal', 'Bright Crystal', 'Versace', 'sold', 'cologne', 'Yuzu peony freshness — light, sparkling, and easy.', '/products/bright-crystal.png'),
  p(58, 'dior-jadore-edp', "J'adore EDP", 'Dior', 'sold', 'cologne', 'Lush floral bouquet — elegant, golden, and classic Dior.', '/products/jadore.png'),
  p(59, 'dg-light-blue-pour-homme', 'Light Blue Pour Homme', 'Dolce & Gabbana', 4, 'cologne', 'Icy citrus aquatic — sharp Mediterranean summer clean.', '/products/light-blue-homme.png'),
  p(60, 'dg-light-blue', 'Light Blue', 'Dolce & Gabbana', 'sold', 'cologne', 'Apple and cedar freshness — iconic sunny classic.', '/products/light-blue.png'),
  p(61, 'lv-city-of-stars', 'City of Stars', 'Louis Vuitton', 'sold', 'lv', 'Musky LA night glow — soft, luminous LV polish.', '/products/lv-city-stars.png'),
  p(62, 'lv-pacific-chill', 'Pacific Chill', 'Louis Vuitton', 'sold', 'lv', 'Citrus blackcurrant chill — bright coastal LV freshness.', '/products/lv-pacific-chill.png'),
  p(63, 'pdm-layton', 'Layton', 'Parfums de Marly', 'sold', 'cologne', 'Apple spice and vanilla woods — sweet powerhouse niche.', '/products/layton.png'),
  p(64, 'gucci-flora-jasmine', 'Flora Gorgeous Jasmine', 'Gucci', 'sold', 'cologne', 'Bright jasmine floral — fresh, pretty, and modern Gucci.', '/products/gucci-flora.png'),
  p(65, 'prada-ocean-edp', 'Luna Rossa Ocean EDP', 'Prada', 15, 'cologne', 'Fresh aromatic marine — clean, sharp, and modern Prada.', '/products/prada-ocean.png'),
  p(66, 'spicebomb-extreme', 'Spicebomb Extreme', 'Viktor & Rolf', 'sold', 'cologne', 'Tobacco vanilla spice — louder, sweeter Spicebomb heat.', '/products/spicebomb-extreme.png'),
  p(67, 'tom-ford-vanilla-sex', 'Vanilla Sex', 'Tom Ford', 'sold', 'cologne', 'Creamy vanilla skin scent — soft, intimate, and addictive.', '/products/vanilla-sex.png'),
  p(68, 'azzaro-most-wanted', 'The Most Wanted', 'Azzaro', 'sold', 'cologne', 'Toffee woods sweetness — bold, modern, and night-ready.', '/products/most-wanted.png'),
  p(69, 'kilian-angels-share', "Angels' Share", 'By Kilian', 12, 'cologne', 'Cognac, cinnamon, and wood — boozy gourmand luxury.', '/products/angels-share.png'),
  p(70, 'invictus-edt', 'Invictus EDT', 'Paco Rabanne', 'sold', 'cologne', 'Fresh aquatic grapefruit — sporty, clean, and loud.', '/products/invictus.png'),
  p(71, 'pdm-delina', 'Delina', 'Parfums de Marly', 15, 'cologne', 'Turkish rose and lychee — royal feminine niche classic.', '/products/delina.png'),
  p(72, 'pdm-layton-royal-essence', 'Layton Royal Essence', 'Parfums de Marly', 'sold', 'cologne', 'Richer Layton royal cut — spice, woods, and cream.', '/products/layton-royal.png'),
  p(73, 'chance-eau-fraiche', 'Chance Eau Fraîche', 'Chanel', 15, 'cologne', 'Green citrus Chance — airy, sparkling, and light.', '/products/chance-fraiche.png'),
  p(74, 'carolina-212-men', '212 Men', 'Carolina Herrera', 'sold', 'cologne', 'Urban green freshness — sharp, simple, and classic.', '/products/212-men.png'),
  p(75, 'my-burberry-blush', 'My Burberry Blush', 'Burberry', 17, 'cologne', 'Peach rose blush — soft, fruity, and feminine.', '/products/burberry-blush.png'),
  p(76, 'gucci-guilty', 'Guilty', 'Gucci', 'sold', 'cologne', 'Pink pepper lilac — stylish, clean, and modern.', '/products/gucci-guilty.png'),
  p(77, 'creed-millesime-imperial', 'Millésime Impérial', 'Creed', 'sold', 'cologne', 'Salty melon musk — bright imperial aquatic Creed.', '/products/millesime-imperial.png'),
  p(78, 'stronger-with-you', 'Stronger With You', 'Emporio Armani', 'sold', 'cologne', 'Chestnut vanilla warmth — sweet, cozy, and popular.', '/products/stronger-with-you.png'),
  p(79, 'very-good-girl', 'Very Good Girl', 'Carolina Herrera', 'sold', 'cologne', 'Red currant rose twist — playful Good Girl energy.', '/products/very-good-girl.png'),
  p(80, 'bad-boy-cobalt-elixir', 'Bad Boy Cobalt Elixir', 'Carolina Herrera', 'sold', 'cologne', 'Cool cobalt intensity — aromatic, spicy, and sharp.', '/products/bad-boy-cobalt.png'),
  p(81, 'dior-homme-parfum', 'Dior Homme Parfum', 'Dior', 'sold', 'cologne', 'Iris leather richness — elegant, powdery, and refined.', '/products/dior-homme-parfum.png'),
  p(82, 'initio-absolute-aphrodisiac', 'Absolute Aphrodisiac', 'Initio', 'sold', 'cologne', 'Vanilla animalic niche — bold, intimate, and addictive.', '/products/absolute-aphrodisiac.png'),
  p(83, 'initio-oud-for-greatness', 'Oud for Greatness', 'Initio', 2, 'cologne', 'Saffron oud powerhouse — dark, spicy, and commanding.', '/products/oud-greatness.png'),
  p(84, 'paco-phantom', 'Phantom', 'Paco Rabanne', 'sold', 'cologne', 'Lavender lemon futurism — quirky, sweet, and modern.', '/products/phantom.png'),
  p(85, 'good-girl', 'Good Girl', 'Carolina Herrera', 1, 'cologne', 'Cocoa tonka stiletto classic — sweet, bold, and iconic.', '/products/good-girl.png'),
  p(86, 'gabrielle-chanel', 'Gabrielle', 'Chanel', 'sold', 'cologne', 'White floral quartet — luminous, clean Chanel elegance.', '/products/gabrielle.png'),
  p(87, 'baccarat-oud-silk-mood', 'Oud Silk Mood', 'Maison Francis Kurkdjian', 3, 'cologne', 'Silky oud rose — soft, luxurious Baccarat-line depth.', '/products/oud-silk-mood.png'),
  p(88, 'tom-ford-black-orchid', 'Black Orchid', 'Tom Ford', 'sold', 'cologne', 'Dark chocolate floral — rich, mysterious, and dramatic.', '/products/black-orchid.png'),
  p(89, 'tom-ford-rose-prick', 'Rose Prick', 'Tom Ford', 3, 'cologne', 'Spicy rose with thorns — bold, peppery, and unisex.', '/products/rose-prick.png'),
  p(90, 'baccarat-grand-soir', 'Grand Soir', 'Maison Francis Kurkdjian', 'sold', 'cologne', 'Amber vanilla evening glow — smooth, warm, and elegant.', '/products/grand-soir.png'),
  p(91, 'jpg-divine', 'Divine', 'Jean Paul Gaultier', 'sold', 'cologne', 'Soft floral JPG femininity — luminous and modern.', '/products/jpg-divine.png'),
  p(92, 'jpg-eau-de-toilette', 'Le Male EDT', 'Jean Paul Gaultier', 'sold', 'cologne', 'Classic mint lavender Le Male — fresh barbershop DNA.', '/products/le-male-edt.png'),
  p(93, 'byredo-rose-of-no-mans-land', "Rose of No Man's Land", 'Byredo', 2, 'cologne', 'Pink pepper rose — soft, modern, and skin-close.', '/products/rose-no-mans.png'),
  p(94, 'jpg-paradise-garden', 'Paradise Garden', 'Jean Paul Gaultier', 'sold', 'cologne', 'Tropical floral JPG freshness — green, bright, and lively.', '/products/paradise-garden.png'),
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function productImage(product: Product): string {
  return product.image ?? '/products/placeholder.png'
}

export function tiersFor(product: Product): PriceTier[] {
  if (product.priceBook === 'lv') return lvTiers
  return cologneTiers
}

export function startingPrice(product: Product): string {
  const tiers = tiersFor(product)
  const first = tiers.find((t) => t.each != null)
  if (!first?.each) return 'DM for price'
  return `From $${first.each}`
}

export function unitPrice(product: Product): number | null {
  const tiers = tiersFor(product)
  return tiers.find((t) => t.each != null)?.each ?? null
}

export function isLowStock(product: Product): boolean {
  return typeof product.quantity === 'number' && product.quantity < 5
}

export function isActFast(product: Product): boolean {
  return typeof product.quantity === 'number' && product.quantity < 2
}

export function maxOrderQty(product: Product): number {
  if (product.quantity === 'sold') return 20
  return Math.max(1, product.quantity)
}

export function priceForQty(
  product: Product,
  qty: number,
): { total: number | null; each: number | null } {
  const numericTiers = tiersFor(product).filter(
    (t): t is PriceTier & { qty: number; total: number; each: number } =>
      typeof t.qty === 'number' && t.total != null && t.each != null,
  )

  const exact = numericTiers.find((t) => t.qty === qty)
  if (exact) return { total: exact.total, each: exact.each }

  const best = [...numericTiers].reverse().find((t) => t.qty <= qty)
  if (best) {
    return { total: best.each * qty, each: best.each }
  }

  const unit = unitPrice(product)
  if (unit == null) return { total: null, each: null }
  return { total: unit * qty, each: unit }
}

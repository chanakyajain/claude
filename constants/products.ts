/**
 * Guru Granites — stone catalogue.
 * 80 varieties across 7 colour groups, matching the printed client catalogue.
 */

export type CategoryKey =
  | 'blue'
  | 'black-grey'
  | 'gold'
  | 'green'
  | 'red-brown-maroon'
  | 'white'
  | 'exotic';

export type StoneType = 'granite' | 'marble' | 'onyx';

export interface Category {
  key: CategoryKey;
  label: string;
  /** Short line shown under the category name on the home screen. */
  blurb: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategoryKey;
  type: StoneType;
  description: string;
}

export const categories: Category[] = [
  { key: 'black-grey', label: 'Black & Grey', blurb: 'Deep, dramatic and timeless' },
  { key: 'white', label: 'White', blurb: 'Bright, clean and versatile' },
  { key: 'gold', label: 'Gold', blurb: 'Warm creams and honeyed tones' },
  { key: 'green', label: 'Green', blurb: 'Natural, lush and calming' },
  { key: 'red-brown-maroon', label: 'Red, Brown & Maroon', blurb: 'Rich, earthy and bold' },
  { key: 'blue', label: 'Blue', blurb: 'Cool, deep and distinctive' },
  { key: 'exotic', label: 'Exotic', blurb: 'Rare and statement-making' },
];

/** Care note appended for softer, more porous stones. */
export const CARE_NOTE =
  'This is a softer, more porous stone than granite. It benefits from sealing and gentle, acid-free cleaning to keep it looking its best.';

export const products: Product[] = [
  // ─────────────────────────── BLUE ───────────────────────────
  {
    slug: 'deep-blue',
    name: 'Deep Blue',
    category: 'blue',
    type: 'granite',
    description:
      'Deep Blue is a bold, dramatic granite defined by rich indigo and midnight tones that shift and deepen as the light moves across the surface. Fine mineral flecks add quiet depth without breaking the overall darkness, giving the stone a calm, luxurious presence. It is a natural choice for feature walls, kitchen islands, reception counters and any space that wants a confident centrepiece. Hard-wearing and easy to maintain, Deep Blue pairs beautifully with light cabinetry, brass fittings and warm timber for a striking, high-end finish.',
  },
  {
    slug: 'kingfisher-blue',
    name: 'Kingfisher Blue',
    category: 'blue',
    type: 'granite',
    description:
      'Named for the brilliant bird, Kingfisher Blue carries vivid flashes of blue and teal scattered across a darker base, creating a surface that genuinely sparkles in changing light. The contrast between the deep ground and the bright crystals makes every slab unique and full of movement. It is best reserved for statement pieces — an island top, a bar front or a feature wall — where its colour can be fully appreciated. Durable and dense, it resists everyday wear while delivering a truly luxurious, eye-catching look.',
  },
  {
    slug: 'crystal-blue',
    name: 'Crystal Blue',
    category: 'blue',
    type: 'granite',
    description:
      'Crystal Blue blends cool blue-grey tones with a fine crystalline sparkle that keeps the surface feeling light and fresh. Its soft, even pattern works as easily in a busy kitchen as it does in a serene bathroom, lending a clean, airy quality to the room. The gentle blue undertone pairs naturally with whites, pale greys and chrome for a contemporary scheme. As a hard-wearing granite, it stands up well to daily use while staying elegant, making it a versatile choice for both worktops and flooring.',
  },
  {
    slug: 'lavender',
    name: 'Lavender',
    category: 'blue',
    type: 'granite',
    description:
      'Lavender is a refined, understated granite in soft violet and grey tones that blend into a gentle, soothing surface. There are no harsh contrasts here — instead the colours flow quietly, giving the stone a calm, sophisticated character. It suits spaces designed to feel restful, such as bathrooms, vanities and bedroom features, and works beautifully alongside white, cream and muted metallic accents. Easy to live with and easy to maintain, Lavender brings a touch of quiet luxury without ever overpowering the room.',
  },
  {
    slug: 'romantic-blue',
    name: 'Romantic Blue',
    category: 'blue',
    type: 'granite',
    description:
      'Romantic Blue layers warm blue and soft mauve tones into a flowing, gentle pattern that feels both elegant and inviting. The colours melt into one another rather than clashing, giving the surface a soft, romantic mood that flatters classic and contemporary interiors alike. It is well suited to vanities, feature counters and accent surfaces where its subtle movement can be enjoyed up close. Hard-wearing and forgiving in daily use, it offers a distinctive yet liveable alternative to plainer stones.',
  },
  {
    slug: 'sk-blue',
    name: 'SK Blue',
    category: 'blue',
    type: 'granite',
    description:
      'SK Blue is a versatile, dependable blue-grey granite with subtle veining and a consistent, even finish across the slab. Its restrained pattern makes it easy to design around, complementing almost any cabinetry colour and a wide range of fittings. This is a practical everyday stone — equally at home on kitchen worktops, floors and cladding — that quietly does its job without demanding attention. Dense and durable, SK Blue resists scratches and stains with simple care, making it a reliable workhorse for busy homes.',
  },

  // ──────────────────────── BLACK & GREY ───────────────────────
  {
    slug: 'charcoal-grey',
    name: 'Charcoal Grey',
    category: 'black-grey',
    type: 'granite',
    description:
      'Charcoal Grey is a deep, smoky grey granite with a fine, even grain that reads as smooth and contemporary from across the room. Its neutral tone is endlessly flexible, sitting comfortably with both warm woods and cool metallics, which makes it a favourite for modern kitchens and minimalist interiors. The subtle texture hides everyday marks well, so it stays looking clean with little effort. Strong and dense, Charcoal Grey works equally well as worktops, flooring and wall cladding for a sleek, cohesive finish.',
  },
  {
    slug: 'diamond-black',
    name: 'Diamond Black',
    category: 'black-grey',
    type: 'granite',
    description:
      'Diamond Black is a pure, jet-black granite with a delicate sparkle that catches the light like fine diamond dust. The depth of its colour gives interiors an instant sense of drama and luxury, while the subtle shimmer keeps it from feeling flat. It is a timeless choice for islands, worktops and feature walls, pairing strikingly with white cabinetry, marble and warm brass. Hard and highly durable, it resists heat and scratching and, with simple sealing and cleaning, holds its rich, glossy look for years.',
  },
  {
    slug: 'bagera-black',
    name: 'Bagera Black',
    category: 'black-grey',
    type: 'granite',
    description:
      'Bagera Black is a dense black granite threaded with delicate grey and white veining that adds quiet movement to its dark field. The result is a stone that feels both strong and elegant, with enough detail to stay interesting without becoming busy. It is well suited to countertops, flooring and cladding where a refined dark surface is wanted. Tough and long-lasting, Bagera Black handles the demands of daily life with ease and pairs beautifully with lighter tones for a balanced, sophisticated scheme.',
  },
  {
    slug: 'black-marquino',
    name: 'Black Marquino',
    category: 'black-grey',
    type: 'granite',
    description:
      'Inspired by the classic dark marble look, Black Marquino offers a rich black field crossed by crisp, bright white veins for high-contrast drama. The bold veining gives each slab a unique, sculptural quality that instantly elevates a space. It shines as a statement surface — an island, a feature wall or a luxurious bathroom — where its pattern can take centre stage. With the durability of granite behind that marble-style beauty, it delivers a premium look while standing up to everyday use.',
  },
  {
    slug: 'black-rose',
    name: 'Black Rose',
    category: 'black-grey',
    type: 'granite',
    description:
      'Black Rose pairs a deep black base with soft rose-toned flecks scattered across the surface, creating a stone that is dramatic yet quietly warm. The gentle pink highlights catch the eye without overwhelming the dark ground, giving the granite real character. It works beautifully on worktops, vanities and feature panels where its subtle warmth can be appreciated. Dense and hard-wearing, Black Rose offers the strength of a classic dark granite with a distinctive twist that sets it apart.',
  },
  {
    slug: 'black-forest',
    name: 'Black Forest',
    category: 'black-grey',
    type: 'granite',
    description:
      'Black Forest is a deep black granite with flowing dark-green and brown movement reminiscent of a shaded forest floor. The organic, earthy pattern gives the stone a rich, natural feel that adds depth to any room. It suits both classic and contemporary interiors and looks especially handsome on islands, feature walls and flooring. Durable and dense, Black Forest wears well over time and pairs naturally with timber, greenery and warm metals for a grounded, characterful look.',
  },
  {
    slug: 'black-galaxy-small-flower',
    name: 'Black Galaxy (Small Flower)',
    category: 'black-grey',
    type: 'granite',
    description:
      "Black Galaxy is one of the world's most loved granites — a deep, true black scattered with tiny golden flecks that glitter like a starry night sky. The finer “small flower” pattern gives a refined, even sparkle that flatters both modern and traditional settings. It is a perennial favourite for kitchen worktops, islands and floors, pairing effortlessly with white, grey and timber. Exceptionally hard and stain-resistant, Black Galaxy is as practical as it is beautiful, holding its dramatic shimmer for decades with minimal care.",
  },
  {
    slug: 'black-galaxy-big-flower',
    name: 'Black Galaxy (Big Flower)',
    category: 'black-grey',
    type: 'granite',
    description:
      'This is the same iconic deep-black granite, here with larger golden specks that deliver a bolder, more luminous sparkle. The bigger “flowers” make the surface feel rich and lively, catching the light from across the room. It is ideal for islands, feature counters and floors where that premium glitter can shine. Like all Black Galaxy, it is extremely hard, heat-resistant and easy to maintain, combining standout looks with the everyday toughness a busy kitchen needs.',
  },
  {
    slug: 'black-pearl',
    name: 'Black Pearl',
    category: 'black-grey',
    type: 'granite',
    description:
      'Black Pearl is a versatile granite that shifts between black and deep grey, lifted by a soft, shimmering pearl-like fleck. Understated yet elegant, it brings subtle depth to a surface without the drama of a pure black, making it easy to design around. It works beautifully on kitchen worktops, floors and cladding alongside both light and dark cabinetry. Dense and hard-wearing, Black Pearl resists everyday marks and keeps its quiet shimmer with simple cleaning, offering reliable good looks for years.',
  },
  {
    slug: 'cats-eye',
    name: "Cat's Eye",
    category: 'black-grey',
    type: 'granite',
    description:
      "Cat's Eye is a flowing blend of grey, black and gold that shimmers and shifts like the eye of a cat as you move around it. The lively, swirling pattern gives every slab a one-of-a-kind character full of movement and warmth. It is best used where it can be seen and admired — an island, a feature wall or a vanity top. Hard-wearing and dense, Cat's Eye combines its striking, individual looks with the practical durability expected of a quality granite.",
  },
  {
    slug: 'coin-black',
    name: 'Coin Black',
    category: 'black-grey',
    type: 'granite',
    description:
      'Coin Black is a distinctive granite with a black base patterned by rounded, coin-like clusters that give the surface an unusual, eye-catching rhythm. The repeating motifs make it a real talking point, ideal for clients who want something out of the ordinary. It works well on feature counters, bar tops and accent surfaces where its pattern can be appreciated. Strong and durable like all dark granites, Coin Black delivers standout character alongside everyday practicality.',
  },
  {
    slug: 'impala-black',
    name: 'Impala Black',
    category: 'black-grey',
    type: 'granite',
    description:
      'Impala Black is a classic dense black-grey granite with fine, uniform speckling that reads as smooth and consistent across the slab. Its even, neutral character makes it endlessly versatile, suiting everything from traditional kitchens to sleek modern designs. It performs beautifully as worktops, flooring and cladding and pairs with almost any colour scheme. Exceptionally hard-wearing and easy to maintain, Impala Black is a dependable, timeless choice that never goes out of style.',
  },
  {
    slug: 'luxury-black',
    name: 'Luxury Black',
    category: 'black-grey',
    type: 'granite',
    description:
      'Luxury Black lives up to its name with a deep, refined black surface and a smooth, premium appearance that instantly elevates a space. With minimal pattern to distract, the focus stays on the richness of the colour, making it a sophisticated backdrop for high-end interiors. It is ideal for islands, worktops and feature walls paired with marble, brass or pale cabinetry. Dense and durable, it resists everyday wear while keeping its sleek, elegant finish.',
  },
  {
    slug: 'river-black',
    name: 'River Black',
    category: 'black-grey',
    type: 'granite',
    description:
      "River Black is a black granite laced with soft, flowing grey lines that move across the surface like the gentle course of a river. The result is a calm, elegant pattern that adds interest without disrupting the stone's dark, restful base. It suits worktops, vanities and feature surfaces where its quiet movement can be enjoyed. Hard-wearing and dense, River Black offers timeless dark-granite durability with a graceful, natural flow.",
  },
  {
    slug: 'steel-grey',
    name: 'Steel Grey',
    category: 'black-grey',
    type: 'granite',
    description:
      'Steel Grey is a cool, industrial-toned granite with fine dark grain that gives it a crisp, contemporary edge. Its neutral, slightly metallic feel makes it a natural fit for modern kitchens, offices and minimalist interiors. The fine texture conceals everyday marks, so the surface stays looking sharp with little effort. Strong and versatile, Steel Grey works across worktops, floors and cladding and pairs cleanly with white, black and stainless-steel accents.',
  },
  {
    slug: 'white-dots-black',
    name: 'White Dots Black',
    category: 'black-grey',
    type: 'granite',
    description:
      'White Dots Black is a bold, high-contrast granite — a deep black field evenly sprinkled with bright white dots for a crisp, graphic effect. The striking pattern makes a confident statement and brings energy to a space. It is best on feature surfaces such as islands, bar fronts and accent walls where the contrast can stand out. Dense and hard-wearing, it offers the practical strength of a dark granite with a distinctive, memorable look.',
  },

  // ─────────────────────────── GOLD ───────────────────────────
  {
    slug: 'astoria',
    name: 'Astoria',
    category: 'gold',
    type: 'granite',
    description:
      'Astoria is a warm beige-gold granite with flowing brown and cream movement that gives kitchens and living spaces an inviting, lived-in glow. The gentle, golden pattern feels both elegant and homely, working as easily in classic schemes as in modern ones. It is a popular choice for worktops, islands and flooring, pairing naturally with cream cabinetry, warm woods and bronze fittings. Durable and easy to care for, Astoria brings a soft, welcoming warmth that stands the test of time.',
  },
  {
    slug: 'beige-castle',
    name: 'Beige Castle',
    category: 'gold',
    type: 'granite',
    description:
      'Beige Castle offers soft beige and cream tones with gentle veining, creating a light, neutral surface that brightens and opens up a room. Its calm, understated pattern makes it wonderfully easy to design around, complementing almost any colour palette. It works beautifully on kitchen worktops, vanities and floors where a warm, airy feel is wanted. Hard-wearing and low-maintenance, Beige Castle is a versatile everyday stone with a quiet, timeless elegance.',
  },
  {
    slug: 'colonial-gold',
    name: 'Colonial Gold',
    category: 'gold',
    type: 'granite',
    description:
      'Colonial Gold is a much-loved golden-beige granite flecked with delicate burgundy and grey, giving it warmth and gentle depth. Its consistent, friendly pattern has made it a long-standing favourite for kitchens of every style. It pairs effortlessly with cream, white and dark cabinetry alike and looks equally good as worktops or flooring. Tough and easy to maintain, Colonial Gold delivers dependable good looks and a warm, classic character that never feels dated.',
  },
  {
    slug: 'gold-dust',
    name: 'Gold Dust',
    category: 'gold',
    type: 'granite',
    description:
      'Gold Dust is a creamy granite dusted with sparkling golden specks that lend a subtle touch of luxury to its soft, neutral base. The gentle shimmer catches the light beautifully without overwhelming the room, making it both warm and refined. It suits worktops, islands and bathrooms where a hint of glamour is welcome. Durable and easy to live with, Gold Dust pairs naturally with warm woods and brass for an inviting, elegant finish.',
  },
  {
    slug: 'golden-forest',
    name: 'Golden Forest',
    category: 'gold',
    type: 'granite',
    description:
      'Golden Forest brings together rich gold and brown tones with leafy, forest-like movement that gives the surface real warmth and character. The flowing, organic pattern makes each slab distinctive and full of life. It looks especially handsome on islands, feature counters and floors in both traditional and rustic interiors. Hard-wearing and dense, Golden Forest combines its characterful, natural appearance with the everyday durability a busy home demands.',
  },
  {
    slug: 'ivory-brown',
    name: 'Ivory Brown',
    category: 'gold',
    type: 'granite',
    description:
      'Ivory Brown features a creamy ivory base softened with gentle brown veining, striking an easy balance between light and warm. Its refined, versatile pattern suits both traditional and modern settings and pairs comfortably with a wide range of cabinetry and fittings. It works well as worktops, vanities and flooring where a soft, elegant neutral is wanted. Durable and low-maintenance, Ivory Brown offers timeless warmth with a clean, understated finish.',
  },
  {
    slug: 'jaggery-gold',
    name: 'Jaggery Gold',
    category: 'gold',
    type: 'granite',
    description:
      'Jaggery Gold glows with warm caramel and gold tones reminiscent of raw jaggery, giving interiors a cosy, rich character. The deep, honeyed colour makes a space feel welcoming and full of warmth. It is well suited to kitchens, islands and feature surfaces in homes that favour inviting, earthy palettes. Hard-wearing and easy to care for, Jaggery Gold pairs beautifully with timber and bronze for a snug, characterful look that wears well over time.',
  },
  {
    slug: 'jubilee-rich',
    name: 'Jubilee Rich',
    category: 'gold',
    type: 'granite',
    description:
      'Jubilee Rich is a luxurious blend of gold, cream and brown with deep, flowing movement that makes every slab a statement of warmth. The bold, generous pattern brings richness and depth to larger surfaces in particular. It is ideal for islands, feature counters and floors where its character can spread out and shine. Durable and dense, Jubilee Rich combines its opulent appearance with reliable everyday strength, anchoring a room with confident warmth.',
  },
  {
    slug: 'shiva-gold',
    name: 'Shiva Gold',
    category: 'gold',
    type: 'granite',
    description:
      'Shiva Gold is a bright golden-cream granite with fine grey and gold flecks that keep the surface light and easy to pair. Its consistent, gentle pattern flatters both classic and contemporary kitchens and works with almost any cabinetry colour. It performs beautifully as worktops, islands and flooring, lifting a room with a soft, warm glow. Hard-wearing and low-maintenance, Shiva Gold is an elegant, versatile choice for everyday living.',
  },

  // ─────────────────────────── GREEN ───────────────────────────
  {
    slug: 'emerald-marble',
    name: 'Emerald Marble',
    category: 'green',
    type: 'marble',
    description:
      'Emerald Marble is a rich green stone laced with marble-like white veining that gives it a lush, luxurious presence. The bold contrast between deep green and bright veins makes every slab feel like a work of art. It is best reserved for statement surfaces — feature walls, vanities and accent counters — where its drama can be fully enjoyed.',
  },
  {
    slug: 'aqua-green',
    name: 'Aqua Green',
    category: 'green',
    type: 'granite',
    description:
      'Aqua Green carries cool aqua and sea-green tones with gentle movement that brings a fresh, calming feel to a room. Its soft, watery palette is soothing and easy to live with, working beautifully in bathrooms, kitchens and lighter interiors. It pairs naturally with white, cream and pale timber for a serene, coastal-inspired scheme. Hard-wearing and dense, Aqua Green offers everyday granite durability alongside its refreshing, restful colour.',
  },
  {
    slug: 'asian-green',
    name: 'Asian Green',
    category: 'green',
    type: 'granite',
    description:
      'Asian Green is a deep green granite with fine dark speckling that gives the surface a bold yet natural character. The rich colour makes a confident statement while the even grain keeps it grounded and versatile. It works well on floors, worktops and cladding where a strong, earthy green is wanted. Tough and long-lasting, Asian Green stands up to daily use and pairs handsomely with timber, brass and warm neutrals.',
  },
  {
    slug: 'green-marble',
    name: 'Green Marble',
    category: 'green',
    type: 'marble',
    description:
      'Green Marble is a classic deep-green stone veined with white and lighter green streaks, prized for its rich, natural colour and elegant movement. Each slab carries a unique pattern that brings warmth and character to a space. It is beautiful on feature walls, temple flooring, vanities and accent surfaces where its colour can be admired.',
  },
  {
    slug: 'green-sparkle',
    name: 'Green Sparkle',
    category: 'green',
    type: 'granite',
    description:
      'Green Sparkle pairs a dark green base with reflective mineral flecks that catch the light for a dramatic, luminous effect. The shimmer adds real depth and movement, making the stone feel alive as you move around it. It is ideal for feature counters, islands and accent walls where its sparkle can take centre stage. Dense and hard-wearing, Green Sparkle combines standout looks with the practical strength expected of a quality granite.',
  },
  {
    slug: 'hassan-green',
    name: 'Hassan Green',
    category: 'green',
    type: 'granite',
    description:
      'Hassan Green is a classic Indian granite in soft grey-green tones with an even, consistent grain that makes it wonderfully versatile. Its restrained, natural colour suits a wide range of styles, from traditional kitchens to calmer modern spaces. It works beautifully as worktops, flooring and cladding and pairs easily with cream, white and wood. Durable and low-maintenance, Hassan Green is a dependable, timeless choice that quietly complements its surroundings.',
  },
  {
    slug: 'navy-green-waterfall',
    name: 'Navy Green Waterfall',
    category: 'green',
    type: 'granite',
    description:
      'Navy Green Waterfall combines deep green and navy tones flowing in a striking, cascading pattern that genuinely resembles falling water. The dramatic movement makes every slab unique and full of energy. It is best used as a feature — an island end, a waterfall counter or an accent wall — where the pattern can run uninterrupted. Hard-wearing and dense, it pairs its bold, sculptural looks with the everyday durability of a fine granite.',
  },
  {
    slug: 'peacock-green',
    name: 'Peacock Green',
    category: 'green',
    type: 'granite',
    description:
      'Peacock Green is a rich green granite shot through with hints of blue and gold, echoing the iridescent plumage of a peacock. The vibrant, jewel-like colours give the stone a luxurious, eye-catching quality. It shines on feature surfaces such as islands, bar tops and vanities where its colour can be admired up close. Dense and durable, Peacock Green offers a truly distinctive look backed by reliable everyday strength.',
  },
  {
    slug: 'pebbles',
    name: 'Pebbles',
    category: 'green',
    type: 'granite',
    description:
      'Pebbles features a soft, pebble-like pattern in muted green and grey tones that feels natural and beautifully understated. The gentle, rounded motifs give the surface a calm, organic texture without any harsh contrast. It suits floors, worktops and cladding in relaxed, nature-inspired interiors. Hard-wearing and easy to maintain, Pebbles brings quiet character to a space while standing up to the demands of everyday life.',
  },
  {
    slug: 'pista-green',
    name: 'Pista Green',
    category: 'green',
    type: 'granite',
    description:
      'Pista Green is a light pistachio-green granite with a gentle, even tone that feels soft and refreshing. Its bright, easy colour lifts a room and works especially well in kitchens and bathrooms that want a cheerful, airy feel. It pairs naturally with white, cream and pale wood for a fresh, light scheme. Durable and low-maintenance, Pista Green offers everyday practicality alongside its soothing, sunny character.',
  },

  // ──────────────────── RED, BROWN & MAROON ───────────────────
  {
    slug: 'cheetah-brown',
    name: 'Cheetah Brown',
    category: 'red-brown-maroon',
    type: 'granite',
    description:
      'Cheetah Brown is a warm brown granite marked by a spotted, cheetah-like pattern that gives it wild, distinctive character. The lively markings make every slab feel individual and full of energy. It works best on feature surfaces such as islands, bar fronts and accent counters where its pattern can stand out. Hard-wearing and dense, Cheetah Brown pairs its bold, natural looks with the reliable durability expected of a quality granite, complementing warm woods and bronze beautifully.',
  },
  {
    slug: 'asian-top',
    name: 'Asian Top',
    category: 'red-brown-maroon',
    type: 'granite',
    description:
      'Asian Top is a warm, richly toned granite with flowing brown movement that makes it a solid, versatile choice for everyday surfaces. Its consistent, friendly pattern is easy to design around and complements a wide range of cabinetry and fittings. It works well on worktops, flooring and cladding in both traditional and modern interiors. Tough and low-maintenance, Asian Top delivers dependable warmth and quiet good looks that wear well over time.',
  },
  {
    slug: 'boss-paradise',
    name: 'Boss Paradise',
    category: 'red-brown-maroon',
    type: 'granite',
    description:
      'Boss Paradise is a rich blend of brown, gold and burgundy with flowing movement that makes the surface feel bold and luxurious. The warm, layered colours give it real depth and a confident presence in any room. It is ideal for islands, feature counters and floors where its generous pattern can spread out and shine. Durable and dense, Boss Paradise combines its opulent looks with everyday strength, anchoring a space with warmth and character.',
  },
  {
    slug: 'cats-eye-brown',
    name: "Cat's Eye (Brown)",
    category: 'red-brown-maroon',
    type: 'granite',
    description:
      "Cat's Eye is a shimmering swirl of brown, gold and grey that catches and shifts the light like the eye of a cat. The flowing, lustrous pattern gives each slab a one-of-a-kind, characterful quality full of warmth. It is best where it can be seen and enjoyed — an island, a vanity or a feature wall. Hard-wearing and dense, Cat's Eye marries its striking, individual looks with the practical durability of a fine granite.",
  },
  {
    slug: 'colombo',
    name: 'Colombo',
    category: 'red-brown-maroon',
    type: 'granite',
    description:
      'Colombo is a warm brown granite with fine speckling and gentle tonal variation that gives it a versatile, timeless feel. Its even, friendly pattern makes it easy to design around, complementing a wide range of cabinetry and fittings. It works beautifully on worktops, flooring and cladding in both traditional and modern settings. Tough and low-maintenance, Colombo offers dependable warmth and quiet good looks that never go out of fashion.',
  },
  {
    slug: 'himalayan-brown',
    name: 'Himalayan Brown',
    category: 'red-brown-maroon',
    type: 'granite',
    description:
      'Himalayan Brown brings earthy brown tones lifted by subtle pink and grey flecks for a warm, grounded character. The gentle variation gives the surface depth while keeping it calm and easy to live with. It suits worktops, floors and cladding in homes that favour warm, natural palettes. Hard-wearing and dense, Himalayan Brown pairs handsomely with timber and cream and delivers classic, comforting warmth that wears well over the years.',
  },
  {
    slug: 'lakha-red',
    name: 'Lakha Red',
    category: 'red-brown-maroon',
    type: 'granite',
    description:
      'Lakha Red is a deep, vivid red granite punctuated by dark speckling, making it one of the boldest statement stones available. The rich, saturated colour brings instant drama and energy to a space. It is best reserved for feature surfaces — an island, a bar top or an accent wall — where its colour can truly command attention. Dense and hard-wearing, Lakha Red combines its dramatic looks with the everyday strength of a quality granite.',
  },
  {
    slug: 'multi-red',
    name: 'Multi Red',
    category: 'red-brown-maroon',
    type: 'granite',
    description:
      'Multi Red blends rich red tones with brown and grey for a lively, multi-coloured surface full of warmth and energy. The varied palette gives the stone character and movement, making each slab distinctive. It works well on worktops, islands and feature counters where its colour can be appreciated. Hard-wearing and easy to maintain, Multi Red pairs its warm, energetic looks with reliable everyday durability, adding life to traditional and eclectic interiors alike.',
  },
  {
    slug: 'riviera',
    name: 'Riviera',
    category: 'red-brown-maroon',
    type: 'granite',
    description:
      'Riviera offers soft brown and cream tones with flowing movement that gives the surface an elegant, easy-to-style character. The gentle pattern feels warm and refined without ever being busy, making it simple to design around. It works beautifully on worktops, vanities and flooring in both classic and contemporary schemes. Durable and low-maintenance, Riviera pairs naturally with cream, white and timber for a soft, sophisticated finish that stands the test of time.',
  },
  {
    slug: 'swan-rose',
    name: 'Swan Rose',
    category: 'red-brown-maroon',
    type: 'granite',
    description:
      'Swan Rose is a delicate rose-pink and cream granite with gentle veining that gives it a soft, romantic quality. The subtle blush tones bring quiet warmth to a space, making it a lovely choice for spaces designed to feel calm and refined. It suits vanities, feature counters and lighter interiors where its softness can be appreciated. Hard-wearing and easy to care for, Swan Rose offers gentle charm alongside dependable everyday durability.',
  },
  {
    slug: 'tan-brown',
    name: 'Tan Brown',
    category: 'red-brown-maroon',
    type: 'granite',
    description:
      'Tan Brown is one of the most popular granites in the world — a deep brown-to-black base scattered with reddish and black grains that read as rich and consistent. Its versatile, hard-wearing nature suits virtually any style, from traditional kitchens to sleek modern designs. It is a go-to for worktops, islands and flooring, pairing effortlessly with cream, white and timber. Exceptionally durable, heat-resistant and easy to maintain, Tan Brown delivers timeless good looks with proven everyday performance.',
  },
  {
    slug: 'wooden',
    name: 'Wooden',
    category: 'red-brown-maroon',
    type: 'granite',
    description:
      "Wooden granite carries warm tones and a grain that echoes natural timber, giving you the cosy look of wood with the strength of stone. The flowing, linear pattern brings warmth and character to a surface while remaining hard-wearing and practical. It works beautifully on worktops, floors and feature walls in homes that love a natural, organic feel. Durable and low-maintenance, Wooden offers the best of both worlds — timber's charm and granite's resilience.",
  },

  // ─────────────────────────── WHITE ───────────────────────────
  {
    slug: 'china-white',
    name: 'China White',
    category: 'white',
    type: 'granite',
    description:
      'China White is a clean, bright white granite with subtle grey flecks that keep the surface feeling light and contemporary. Its crisp, neutral character opens up a room and pairs beautifully with almost any colour scheme. It works wonderfully on worktops, islands and bathrooms where a fresh, modern look is wanted. Hard-wearing and easy to maintain with simple sealing, China White brings a clean, airy elegance that suits both minimalist and classic interiors.',
  },
  {
    slug: 'era-white',
    name: 'Era White',
    category: 'white',
    type: 'granite',
    description:
      'Era White features a soft white base with fine grey and pearl speckling that gives it a fresh, elegant feel. The gentle pattern keeps the surface calm and versatile, making it easy to design around. It looks beautiful on kitchen worktops, vanities and floors in light, airy schemes. Durable and low-maintenance with regular sealing, Era White pairs naturally with pale cabinetry and chrome for a clean, refined finish that brightens any space.',
  },
  {
    slug: 'burgundy-white',
    name: 'Burgundy White',
    category: 'white',
    type: 'granite',
    description:
      'Burgundy White is a bright white granite accented with warm burgundy flecks that add delicate contrast and character. The subtle pops of colour keep the surface interesting without disrupting its light, fresh base. It works well on worktops, vanities and feature surfaces where the detail can be appreciated up close. Hard-wearing and easy to care for with simple sealing, Burgundy White offers a clean, elegant look with a distinctive, warming twist.',
  },
  {
    slug: 'chida-white',
    name: 'Chida White',
    category: 'white',
    type: 'granite',
    description:
      'Chida White is a bright white granite with gentle grey veining that gives it a crisp, versatile character. The soft movement adds quiet interest while keeping the surface light and easy to pair. It works beautifully on worktops, islands and bathrooms in both modern and classic schemes. Durable and low-maintenance with regular sealing, Chida White brings a fresh, clean elegance that complements almost any cabinetry and fitting.',
  },
  {
    slug: 'diana-white',
    name: 'Diana White',
    category: 'white',
    type: 'granite',
    description:
      'Diana White is a pure white granite with soft grey movement that feels calm, clean and quietly luxurious. The gentle veining lends just enough character to keep the surface from feeling plain while staying bright and airy. It looks stunning on islands, worktops and feature walls paired with marble, brass or pale cabinetry. Hard-wearing and easy to maintain with simple sealing, Diana White delivers an elegant, timeless look for high-end interiors.',
  },
  {
    slug: 'fantasy-white',
    name: 'Fantasy White',
    category: 'white',
    type: 'granite',
    description:
      'Fantasy White is a creamy white granite with flowing grey and gold veins that give it elegance and natural character. The soft, marble-like movement makes each slab distinctive and full of interest. It is a beautiful choice for islands, worktops and feature surfaces where its pattern can be enjoyed. Durable and low-maintenance with regular sealing, Fantasy White pairs warmth and brightness in equal measure, suiting both classic and contemporary kitchens.',
  },
  {
    slug: 'gelatic-white',
    name: 'Gelatic White',
    category: 'white',
    type: 'granite',
    description:
      'Gelatic White is a smooth, snow-toned white granite with subtle speckling that keeps the surface bright and minimal. Its clean, even character makes it endlessly versatile, opening up a room and complementing any palette. It works wonderfully on worktops, islands and bathrooms in light, modern schemes. Hard-wearing and easy to maintain with simple sealing, Gelatic White offers a fresh, crisp look that feels both calm and contemporary.',
  },
  {
    slug: 'ice-white',
    name: 'Ice White',
    category: 'white',
    type: 'granite',
    description:
      'Ice White is a crisp, cool white granite with fine grey grain that gives it a clean, modern edge. The subtle texture keeps the surface interesting while staying bright and neutral. It pairs beautifully with chrome, glass and pale cabinetry for a sleek, contemporary scheme and works well on worktops, floors and cladding. Durable and low-maintenance with regular sealing, Ice White brings a fresh, icy clarity to kitchens and bathrooms alike.',
  },
  {
    slug: 'maharaja-white',
    name: 'Maharaja White',
    category: 'white',
    type: 'granite',
    description:
      'Maharaja White is a regal white granite with bold grey veining that gives it a luxurious, grand presence. The dramatic movement makes every slab a statement, evoking the elegance of fine marble with the strength of granite. It is ideal for islands, feature walls and high-end kitchens where its pattern can take centre stage. Hard-wearing and easy to maintain with simple sealing, Maharaja White delivers opulent good looks alongside everyday durability.',
  },
  {
    slug: 'moon-white',
    name: 'Moon White',
    category: 'white',
    type: 'granite',
    description:
      'Moon White is a soft white-grey granite with a gentle, moonlit glow and faint blue undertones that give it a serene, elegant character. The calm, even pattern makes it wonderfully easy to live with and design around. It looks beautiful on worktops, islands and bathrooms in light, restful schemes. Durable and low-maintenance with regular sealing, Moon White pairs naturally with cool greys, whites and chrome for a clean, tranquil finish.',
  },
  {
    slug: 'parvati-white',
    name: 'Parvati White',
    category: 'white',
    type: 'granite',
    description:
      'Parvati White is a bright white granite with delicate grey and black flecks that keep the surface fresh and refined. The fine speckling adds subtle interest while staying light and versatile. It works beautifully on worktops, islands and vanities in both modern and classic interiors. Hard-wearing and easy to maintain with simple sealing, Parvati White brings a clean, crisp elegance that complements almost any cabinetry and colour scheme.',
  },
  {
    slug: 'river-white',
    name: 'River White',
    category: 'white',
    type: 'granite',
    description:
      'River White is a soft white granite laced with flowing grey and burgundy veining that gives it a calm, graceful character. The gentle movement adds elegance and depth while keeping the surface light and airy. It looks lovely on worktops, islands and feature surfaces in refined, classic schemes. Durable and low-maintenance with regular sealing, River White pairs naturally with cream, grey and timber for a soft, sophisticated finish.',
  },
  {
    slug: 'snow-white',
    name: 'Snow White',
    category: 'white',
    type: 'granite',
    description:
      'Snow White is a pure, bright white granite with fine, even speckling that keeps it clean and timeless. Its crisp neutrality opens up a room and pairs effortlessly with any colour, making it endlessly versatile. It works beautifully on worktops, islands and bathrooms in both minimalist and traditional settings. Hard-wearing and easy to maintain with simple sealing, Snow White delivers a fresh, classic look that never dates.',
  },
  {
    slug: 'star-white',
    name: 'Star White',
    category: 'white',
    type: 'granite',
    description:
      'Star White is a white granite sprinkled with sparkling, star-like flecks that catch the light for a bright, luminous effect. The gentle shimmer adds a touch of glamour while keeping the surface light and fresh. It works wonderfully on worktops, islands and bathrooms where the sparkle can be enjoyed. Durable and low-maintenance with regular sealing, Star White pairs naturally with pale cabinetry and chrome for a clean, radiant finish.',
  },
  {
    slug: 'supreme-white',
    name: 'Supreme White',
    category: 'white',
    type: 'granite',
    description:
      'Supreme White is a premium white granite with elegant grey movement that gives it a luxurious, versatile character. The soft, marble-like veining makes each slab distinctive while staying bright and refined. It is a beautiful choice for islands, worktops and feature walls in high-end interiors. Hard-wearing and easy to maintain with simple sealing, Supreme White delivers upscale good looks alongside the dependable strength of a fine granite.',
  },
  {
    slug: 'white-fantasy',
    name: 'White Fantasy',
    category: 'white',
    type: 'granite',
    description:
      'White Fantasy is a creamy white granite with flowing grey-gold veins that give it a soft, elegant character full of movement. The marble-like pattern makes every slab unique and full of warmth. It looks stunning on islands, worktops and feature surfaces where its veining can be appreciated. Durable and low-maintenance with regular sealing, White Fantasy balances brightness and warmth beautifully, suiting both classic and contemporary kitchens.',
  },
  {
    slug: 'white-pearl',
    name: 'White Pearl',
    category: 'white',
    type: 'granite',
    description:
      'White Pearl is a white granite lifted by a shimmering, pearl-like fleck that adds subtle depth and refinement. The gentle shimmer keeps the surface elegant without ever feeling busy, making it easy to design around. It works beautifully on worktops, vanities and floors in light, airy schemes. Hard-wearing and easy to maintain with simple sealing, White Pearl pairs naturally with pale cabinetry and soft metals for a clean, refined finish.',
  },
  {
    slug: 'white-galaxy',
    name: 'White Galaxy',
    category: 'white',
    type: 'granite',
    description:
      'White Galaxy is a white granite scattered with dark, galaxy-like specks that create a striking, high-contrast pattern. The bold flecking gives the surface energy and a distinctive, graphic character. It works well on worktops, islands and feature surfaces where the contrast can stand out. Durable and easy to maintain with regular sealing, White Galaxy pairs its eye-catching looks with the everyday strength of a quality granite, suiting modern and statement interiors.',
  },

  // ─────────────────────────── EXOTIC ──────────────────────────
  {
    slug: 'scorpio-brown',
    name: 'Scorpio Brown',
    category: 'exotic',
    type: 'granite',
    description:
      'Scorpio Brown is a dramatic dark-brown granite with bold, flowing movement that gives it a rich, luxurious presence. The deep, layered tones make every slab a statement, full of depth and character. It is ideal for islands, feature walls and high-end kitchens where its drama can take centre stage. Hard-wearing and dense, Scorpio Brown pairs its opulent looks with the everyday durability of a fine granite, complementing cream, gold and timber beautifully.',
  },
  {
    slug: 'alaska-pink',
    name: 'Alaska Pink',
    category: 'exotic',
    type: 'granite',
    description:
      'Alaska Pink is a warm pink-and-cream granite with gentle grain that feels soft, inviting and distinctive. The subtle blush tones bring quiet warmth to a space, making it a lovely choice for interiors that want a gentle, characterful neutral. It works well on worktops, vanities and feature surfaces in both classic and relaxed settings. Durable and low-maintenance, Alaska Pink pairs naturally with cream, white and warm woods for a soft, welcoming finish.',
  },
  {
    slug: 'alaska-white',
    name: 'Alaska White',
    category: 'exotic',
    type: 'granite',
    description:
      'Alaska White is a creamy white granite with flowing grey and burgundy veins that give it an elegant, exotic character. The soft, marble-like movement makes each slab distinctive and full of interest. It looks beautiful on islands, worktops and feature surfaces in refined interiors. Hard-wearing and easy to maintain with regular sealing, Alaska White balances brightness and warmth, pairing naturally with cream, grey and timber for a sophisticated, upscale finish.',
  },
  {
    slug: 'blue-in-the-night',
    name: 'Blue in the Night',
    category: 'exotic',
    type: 'granite',
    description:
      'Blue in the Night is a deep, dark granite with flashes of midnight blue that emerge as the light shifts across the surface. The mysterious, brooding colour gives it a luxurious, dramatic quality reserved for special spaces. It is best used as a feature — an island, a bar front or an accent wall — where its depth can be appreciated. Dense and hard-wearing, it combines its striking looks with the everyday strength of a quality granite.',
  },
  {
    slug: 'blue-pearl',
    name: 'Blue Pearl',
    category: 'exotic',
    type: 'granite',
    description:
      'Blue Pearl is a famous, premium granite filled with shimmering blue-grey crystals that flash like pearls as the light moves. The luminous, jewel-like sparkle gives it a truly luxurious, eye-catching presence. It is ideal for islands, feature counters and high-end interiors where its shimmer can shine. Exceptionally hard and durable, Blue Pearl pairs its standout good looks with dependable everyday performance, complementing white, grey and chrome beautifully.',
  },
  {
    slug: 'emerald-green',
    name: 'Emerald Green',
    category: 'exotic',
    type: 'granite',
    description:
      'Emerald Green is a rich, deep-green granite scattered with luminous mineral flecks that give it a lush, luxurious character. The jewel-like colour and subtle sparkle make every slab a statement of depth and warmth. It shines on feature surfaces such as islands, vanities and accent walls where its colour can be admired. Dense and hard-wearing, Emerald Green offers a truly distinctive look backed by the reliable durability of a fine granite.',
  },
  {
    slug: 'silver-pearl',
    name: 'Silver Pearl',
    category: 'exotic',
    type: 'granite',
    description:
      'Silver Pearl is a silvery-grey granite with a soft, pearlescent shimmer that gives it a modern, elegant feel. The gentle, reflective sheen adds quiet depth to the surface without overwhelming the room. It works beautifully on worktops, islands and feature surfaces in contemporary schemes. Hard-wearing and easy to maintain, Silver Pearl pairs naturally with white, black and stainless steel for a sleek, refined finish that suits modern interiors.',
  },
  {
    slug: 'white-marble',
    name: 'White Marble',
    category: 'exotic',
    type: 'marble',
    description:
      'White Marble offers a classic white surface with soft grey veining for a timeless, luxurious look that has graced fine interiors for centuries. The gentle, flowing veins give each slab a unique, elegant character. It is beautiful on feature walls, vanities and statement surfaces where its softness can shine.',
  },
  {
    slug: 'white-onyx',
    name: 'White Onyx',
    category: 'exotic',
    type: 'onyx',
    description:
      'White Onyx is a translucent, creamy stone threaded with delicate flowing veins, prized as a premium, exotic material. Its standout quality is its translucency — when backlit, it glows beautifully, making it spectacular for feature walls, bar fronts and reception panels. It is best used as a showpiece rather than a hard-working surface, and is ideally suited to low-traffic statement applications.',
  },
];

/** Products belonging to a category, in catalogue order. */
export function productsByCategory(key: CategoryKey): Product[] {
  return products.filter((p) => p.category === key);
}

export function countByCategory(key: CategoryKey): number {
  return productsByCategory(key).length;
}

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function categoryLabel(key: CategoryKey): string {
  return categories.find((c) => c.key === key)?.label ?? key;
}

/** Case-insensitive search across stone name and category label. */
export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      categoryLabel(p.category).toLowerCase().includes(q)
  );
}

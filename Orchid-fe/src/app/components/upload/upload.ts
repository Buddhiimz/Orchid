import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface OrchidDetails {
  scientificName: string;
  commonName: string;
  genus: string;
  origin: string;
  bloomSeason: string;
  description: string;
  careTips: string[];
}

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './upload.html',
  styleUrls: ['./upload.scss']
})
export class UploadComponent {
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  prediction: string | null = null;
  orchidDetails: OrchidDetails | null = null;
  error: string | null = null;
  isLoading: boolean = false;

  // Orchid database with detailed information
  private orchidDatabase: { [key: string]: OrchidDetails } = {
    "Anoectochilus burmanicus rolfe orchid": {
      scientificName: "Anoectochilus burmanicus Rolfe",
      commonName: "Burmese Jewel Orchid",
      genus: "Anoectochilus",
      origin: "Myanmar, Thailand, Southeast Asia",
      bloomSeason: "Late Winter to Spring",
      description: "A terrestrial jewel orchid prized for its beautiful foliage with intricate gold and silver veining on dark green leaves. Produces delicate white flowers with distinctive petals.",
      careTips: [
        "Prefers low to medium indirect light",
        "Keep soil consistently moist but not waterlogged",
        "Requires high humidity (70-80%)",
        "Grow in well-draining orchid substrate with leaf litter"
      ]
    },
    "Bulbophyllum auricomum lindl orchid": {
      scientificName: "Bulbophyllum auricomum Lindl.",
      commonName: "Golden Hair Bulbophyllum",
      genus: "Bulbophyllum",
      origin: "India, Myanmar, Thailand",
      bloomSeason: "Spring to Summer",
      description: "Features clusters of small flowers with golden-yellow hairs, giving them a distinctive fuzzy appearance. Known for its unusual fragrance and compact growth habit.",
      careTips: [
        "Bright, indirect light with good air circulation",
        "Water frequently during growing season",
        "Mount on bark or grow in small pots",
        "Moderate to high humidity (60-80%)"
      ]
    },
    "Bulbophyllum dayanum rchb orchid": {
      scientificName: "Bulbophyllum dayanum Rchb.f.",
      commonName: "Day's Bulbophyllum",
      genus: "Bulbophyllum",
      origin: "Borneo, Malaysia",
      bloomSeason: "Year-round bloomer",
      description: "A miniature species with creeping rhizomes and small white flowers marked with purple spots. Forms attractive colonies when mounted.",
      careTips: [
        "Bright shade to filtered sunlight",
        "Keep mounted substrate moist year-round",
        "High humidity essential (70-85%)",
        "Good air movement prevents fungal issues"
      ]
    },
    "Bulbophyllum lasiochilum par. & rchb orchid": {
      scientificName: "Bulbophyllum lasiochilum Par. & Rchb.f.",
      commonName: "Hairy Lip Bulbophyllum",
      genus: "Bulbophyllum",
      origin: "Thailand, Myanmar",
      bloomSeason: "Summer",
      description: "Distinctive for its hairy labellum (lip) and elongated sepals. Produces chains of flowers along pendulous inflorescences.",
      careTips: [
        "Medium to bright indirect light",
        "Water regularly, allow slight drying between waterings",
        "Best grown mounted to accommodate pendulous flowers",
        "Moderate humidity (60-70%)"
      ]
    },
    "Bulbophyllum limbatum orchid": {
      scientificName: "Bulbophyllum limbatum Lindl.",
      commonName: "Bordered Bulbophyllum",
      genus: "Bulbophyllum",
      origin: "Java, Sumatra, Borneo",
      bloomSeason: "Spring to Early Summer",
      description: "Features small yellowish flowers with distinctive red-brown borders. Compact species suitable for small growing spaces.",
      careTips: [
        "Moderate light levels",
        "Regular watering with good drainage",
        "Grows well in small pots or mounted",
        "Moderate to high humidity (65-80%)"
      ]
    },
    "Bulbophyllum longissimum (ridl.) ridl orchid": {
      scientificName: "Bulbophyllum longissimum (Ridl.) Ridl.",
      commonName: "Longest Bulbophyllum",
      genus: "Bulbophyllum",
      origin: "Borneo, Malaysia",
      bloomSeason: "Summer to Fall",
      description: "Named for its exceptionally long lateral sepals that can extend up to 15cm. One of the most dramatic Bulbophyllum species.",
      careTips: [
        "Bright, filtered light",
        "Keep consistently moist during active growth",
        "Mount to showcase long sepals",
        "High humidity (75-85%)"
      ]
    },
    "Bulbophyllum medusae (lindl.) rchb orchid": {
      scientificName: "Bulbophyllum medusae (Lindl.) Rchb.f.",
      commonName: "Medusa Orchid",
      genus: "Bulbophyllum",
      origin: "Malaysia, Borneo, Sumatra",
      bloomSeason: "Year-round",
      description: "Spectacular species with cream-colored flowers bearing numerous thread-like sepals radiating from the center, resembling Medusa's hair. Highly sought after by collectors.",
      careTips: [
        "Bright indirect light",
        "High humidity essential (75-90%)",
        "Water frequently, never allow to dry completely",
        "Excellent air circulation required"
      ]
    },
    "Bulbophyllum patens king ex hk.f. orchid": {
      scientificName: "Bulbophyllum patens King ex Hook.f.",
      commonName: "Spreading Bulbophyllum",
      genus: "Bulbophyllum",
      origin: "India, Myanmar, Thailand",
      bloomSeason: "Spring",
      description: "Features spreading lateral sepals and a mobile labellum. Flowers are typically yellow-green with purple markings.",
      careTips: [
        "Moderate to bright indirect light",
        "Regular watering during growth period",
        "Can be potted or mounted",
        "Moderate humidity (60-75%)"
      ]
    },
    "Bulbophyllum rufuslabrum orchid": {
      scientificName: "Bulbophyllum rufuslabrum",
      commonName: "Red Lip Bulbophyllum",
      genus: "Bulbophyllum",
      origin: "Southeast Asia",
      bloomSeason: "Spring to Summer",
      description: "Notable for its distinctive red-brown labellum contrasting with lighter colored sepals. Compact grower suitable for small collections.",
      careTips: [
        "Medium light levels",
        "Keep evenly moist",
        "Small pots or mounts work well",
        "Moderate humidity (65-75%)"
      ]
    },
    "Bulbophyllum siamensis rchb orchid": {
      scientificName: "Bulbophyllum siamensis Rchb.f.",
      commonName: "Siamese Bulbophyllum",
      genus: "Bulbophyllum",
      origin: "Thailand, Cambodia",
      bloomSeason: "Summer",
      description: "Endemic to Thailand with small but numerous flowers arranged in umbels. Greenish-yellow flowers with red spots.",
      careTips: [
        "Bright shade to filtered sun",
        "Regular watering year-round",
        "Mounted cultivation recommended",
        "High humidity (70-85%)"
      ]
    },
    "Calenthe rubens orchid": {
      scientificName: "Calanthe rubens Ridl.",
      commonName: "Red Calanthe",
      genus: "Calanthe",
      origin: "Malaysia, Sumatra, Borneo",
      bloomSeason: "Winter to Spring",
      description: "Terrestrial orchid with broad, pleated leaves and tall spikes of pink to red flowers. Deciduous species requiring winter dormancy.",
      careTips: [
        "Partial shade to filtered light",
        "Water heavily during growing season",
        "Reduce watering during dormancy",
        "Rich, well-draining terrestrial mix"
      ]
    },
    "Chiloschista parishii seidenf. orchid": {
      scientificName: "Chiloschista parishii Seidenf.",
      commonName: "Parish's Chiloschista",
      genus: "Chiloschista",
      origin: "Myanmar, Thailand",
      bloomSeason: "Spring to Summer",
      description: "Leafless orchid with photosynthetic roots. Produces clusters of fragrant white flowers. Unique appearance makes it a collector's favorite.",
      careTips: [
        "Bright, indirect light for the roots",
        "Mist roots daily in growing season",
        "Must be mounted on bark or in basket",
        "High humidity critical (80-90%)"
      ]
    },
    "Chiloschista viridiflora seidenf. orchid": {
      scientificName: "Chiloschista viridiflora Seidenf.",
      commonName: "Green-flowered Chiloschista",
      genus: "Chiloschista",
      origin: "Thailand",
      bloomSeason: "Late Spring to Summer",
      description: "Another leafless species with green-tinted flowers. Fascinating growth habit with exposed silvery-green roots.",
      careTips: [
        "Bright light essential for photosynthetic roots",
        "Daily misting required",
        "Mount on cork or tree fern",
        "Very high humidity (85-95%)"
      ]
    },
    "Cymbidium aloifolium (l.) sw. orchid": {
      scientificName: "Cymbidium aloifolium (L.) Sw.",
      commonName: "Aloe-leaf Cymbidium",
      genus: "Cymbidium",
      origin: "India, Southeast Asia, China",
      bloomSeason: "Spring to Summer",
      description: "Epiphytic Cymbidium with aloe-like leaves. Produces long, pendulous inflorescences with many small, fragrant flowers in shades of yellow and burgundy.",
      careTips: [
        "Bright light, can tolerate some direct sun",
        "Water regularly, reduce in winter",
        "Grows well in pots or baskets",
        "Moderate humidity (50-70%)"
      ]
    },
    "Dendrobium chrysotoxum lindl orchid": {
      scientificName: "Dendrobium chrysotoxum Lindl.",
      commonName: "Golden Bow Dendrobium",
      genus: "Dendrobium",
      origin: "India, Myanmar, Thailand, China",
      bloomSeason: "Late Winter to Spring",
      description: "Stunning species with pendulous racemes of bright golden-yellow flowers with orange-red labellum. One of the most beautiful Dendrobiums.",
      careTips: [
        "Bright light, some morning sun beneficial",
        "Water heavily during growth, reduce in winter",
        "Requires cool, dry winter rest period",
        "Moderate humidity (60-70%)"
      ]
    },
    "Dendrobium farmeri paxt. orchid": {
      scientificName: "Dendrobium farmeri Paxt.",
      commonName: "Farmer's Dendrobium",
      genus: "Dendrobium",
      origin: "India, Nepal, Myanmar, Thailand",
      bloomSeason: "Spring",
      description: "Produces spectacular drooping clusters of white to pale pink flowers with golden-yellow throat. Highly fragrant and long-lasting blooms.",
      careTips: [
        "Bright, indirect light",
        "Heavy watering during growth season",
        "Dry winter rest essential for blooming",
        "Moderate humidity (55-70%)"
      ]
    },
    "Dendrobium fimbriatum hook orchid": {
      scientificName: "Dendrobium fimbriatum Hook.",
      commonName: "Fringed Dendrobium",
      genus: "Dendrobium",
      origin: "India, Nepal, China, Southeast Asia",
      bloomSeason: "Spring to Early Summer",
      description: "Features bright orange-yellow flowers with distinctive fringed labellum. Produces pendulous clusters along old canes.",
      careTips: [
        "Bright light with some direct sun",
        "Water abundantly during active growth",
        "Cool, dry rest period in winter",
        "Moderate to high humidity (60-75%)"
      ]
    },
    "Dendrobium lindleyi steud orchid": {
      scientificName: "Dendrobium lindleyi Steud.",
      commonName: "Lindley's Dendrobium, Honey Orchid",
      genus: "Dendrobium",
      origin: "India, Myanmar, Thailand, China",
      bloomSeason: "Spring",
      description: "Compact species producing masses of golden-yellow, honey-scented flowers. Flowers appear in drooping clusters from leafless pseudobulbs.",
      careTips: [
        "Very bright light, tolerates direct sun",
        "Water regularly during growth",
        "Must have dry winter rest",
        "Can tolerate lower humidity (50-65%)"
      ]
    },
    "Dendrobium pulchellum roxb orchid": {
      scientificName: "Dendrobium pulchellum Roxb.",
      commonName: "Beautiful Dendrobium",
      genus: "Dendrobium",
      origin: "India, Myanmar, Thailand, China",
      bloomSeason: "Late Winter to Spring",
      description: "Produces delicate pink to lavender flowers with darker markings on the lip. Flowers emerge from nodes along leafless canes.",
      careTips: [
        "Bright, filtered light",
        "Regular watering during growing season",
        "Reduce watering after leaf drop",
        "Moderate humidity (60-70%)"
      ]
    },
    "Dendrobium pulchellum orchid": {
      scientificName: "Dendrobium pulchellum",
      commonName: "Pretty Dendrobium",
      genus: "Dendrobium",
      origin: "Southeast Asia",
      bloomSeason: "Spring",
      description: "Variant of D. pulchellum with slightly different coloration. Features graceful flowers in shades of pink and white.",
      careTips: [
        "Bright, indirect light",
        "Water well during active growth",
        "Winter rest with reduced watering",
        "Moderate humidity (60-70%)"
      ]
    },
    "Dendrobium secundum bl-lindl orchid": {
      scientificName: "Dendrobium secundum (Blume) Lindl.",
      commonName: "Toothbrush Orchid",
      genus: "Dendrobium",
      origin: "Southeast Asia, Philippines",
      bloomSeason: "Spring to Summer",
      description: "Distinctive flowers arranged in a brush-like formation, all facing one direction. Pink to purple flowers with pleasant fragrance.",
      careTips: [
        "Bright light, can take some direct sun",
        "Keep moist year-round",
        "No distinct rest period required",
        "High humidity (70-80%)"
      ]
    },
    "Dendrobium senile par. & rchb.f. orchid": {
      scientificName: "Dendrobium senile Par. & Rchb.f.",
      commonName: "Old Man Dendrobium",
      genus: "Dendrobium",
      origin: "Thailand, Myanmar",
      bloomSeason: "Spring",
      description: "Named for the white hairy covering on its stems. Produces bright golden-yellow flowers with orange markings.",
      careTips: [
        "Very bright light essential",
        "Water heavily in growing season",
        "Cool, dry winter rest critical",
        "Moderate humidity (55-70%)"
      ]
    },
    "Dendrobium signatum rchb. f orchid": {
      scientificName: "Dendrobium signatum Rchb.f.",
      commonName: "Marked Dendrobium",
      genus: "Dendrobium",
      origin: "India, Myanmar, Thailand",
      bloomSeason: "Late Spring",
      description: "Features creamy-yellow flowers with distinctive brown markings on the lip. Compact grower suitable for small spaces.",
      careTips: [
        "Bright, filtered light",
        "Regular watering during growth",
        "Brief rest period after blooming",
        "Moderate humidity (60-70%)"
      ]
    },
    "Dendrobium thyrsiflorum rchb. f. orchid": {
      scientificName: "Dendrobium thyrsiflorum Rchb.f.",
      commonName: "Pine-cone Orchid",
      genus: "Dendrobium",
      origin: "Myanmar, Thailand, Vietnam, China",
      bloomSeason: "Spring",
      description: "Spectacular species with dense, pendulous clusters of white flowers with golden-orange lips. Resembles hanging pine cones when in bloom.",
      careTips: [
        "Bright light with some morning sun",
        "Heavy watering during growth",
        "Cool, dry winter rest essential",
        "Moderate humidity (60-75%)"
      ]
    },
    "Dendrobium tortile lindl orchid": {
      scientificName: "Dendrobium tortile Lindl.",
      commonName: "Twisted Dendrobium",
      genus: "Dendrobium",
      origin: "India, Myanmar, Thailand, Vietnam",
      bloomSeason: "Spring",
      description: "Features twisted petals and sepals, giving flowers a unique appearance. Pale pink to white flowers with pleasant fragrance.",
      careTips: [
        "Bright, indirect light",
        "Water regularly during growing season",
        "Reduce watering in winter",
        "Moderate humidity (60-70%)"
      ]
    },
    "Dendrobium tortile orchid": {
      scientificName: "Dendrobium tortile",
      commonName: "Twisted Petal Orchid",
      genus: "Dendrobium",
      origin: "Southeast Asia",
      bloomSeason: "Spring to Summer",
      description: "Similar to D. tortile lindl with characteristic twisted floral segments. Delicate appearance with fragrant blooms.",
      careTips: [
        "Bright, filtered sunlight",
        "Keep moist during active growth",
        "Brief winter rest beneficial",
        "Moderate humidity (60-70%)"
      ]
    },
    "Hygrochillus parishii var. marrioftiana (rchb.f.) orchid": {
      scientificName: "Hygrochilus parishii var. marriottiana (Rchb.f.)",
      commonName: "Marriott's Hygrochilus",
      genus: "Hygrochilus",
      origin: "Myanmar, Thailand",
      bloomSeason: "Spring",
      description: "Monopodial orchid with terete leaves and white flowers spotted with red-purple. Requires very high humidity.",
      careTips: [
        "Very bright light, morning sun beneficial",
        "Mist or water daily",
        "Must have excellent air circulation",
        "Very high humidity essential (80-95%)"
      ]
    },
    "Paphiopedilum bellatulum orchid": {
      scientificName: "Paphiopedilum bellatulum (Rchb.f.) Stein",
      commonName: "Pretty Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "Myanmar, Thailand",
      bloomSeason: "Spring to Summer",
      description: "Compact species with beautiful mottled foliage and round, white flowers heavily spotted with purple. Highly prized by collectors.",
      careTips: [
        "Low to medium light",
        "Keep evenly moist, never soggy",
        "Warm to intermediate temperatures",
        "Moderate to high humidity (60-80%)"
      ]
    },
    "Paphiopedilum callosum orchid": {
      scientificName: "Paphiopedilum callosum (Rchb.f.) Stein",
      commonName: "Beautiful Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "Thailand, Cambodia, Vietnam",
      bloomSeason: "Spring to Summer",
      description: "Features mottled leaves and large flowers with green and white striped dorsal sepal with purple spots. One of the classic Paphiopedilums.",
      careTips: [
        "Medium, indirect light",
        "Water when surface becomes slightly dry",
        "Warm-growing species",
        "Moderate to high humidity (65-80%)"
      ]
    },
    "Paphiopedilum charlesworthii orchid": {
      scientificName: "Paphiopedilum charlesworthii (Rolfe) Pfitzer",
      commonName: "Charlesworth's Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "Myanmar, Thailand",
      bloomSeason: "Fall to Winter",
      description: "Produces pink to rose-colored flowers with darker veining. Plain green leaves distinguish it from mottled-leaf species.",
      careTips: [
        "Medium light levels",
        "Keep consistently moist",
        "Intermediate to warm temperatures",
        "Moderate humidity (60-75%)"
      ]
    },
    "Paphiopedilum concolor orchid": {
      scientificName: "Paphiopedilum concolor (Bateman) Pfitzer",
      commonName: "Concolor Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "Myanmar, Thailand, China, Vietnam",
      bloomSeason: "Spring to Summer",
      description: "Features mottled foliage and pale yellow flowers densely covered with purple spots. Can produce multiple flowers per stem.",
      careTips: [
        "Low to medium light",
        "Water regularly, allow slight drying",
        "Warm-growing, cannot tolerate cold",
        "Moderate to high humidity (65-80%)"
      ]
    },
    "Paphiopedilum exul orchid": {
      scientificName: "Paphiopedilum exul (O.Gruss) Braem",
      commonName: "Exiled Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "Thailand",
      bloomSeason: "Spring",
      description: "Rare species with compact growth habit. Produces small flowers with distinctive coloration patterns.",
      careTips: [
        "Low to medium light",
        "Keep evenly moist",
        "Warm to intermediate temperatures",
        "High humidity (70-85%)"
      ]
    },
    "Paphiopedilum godefroyae orchid": {
      scientificName: "Paphiopedilum godefroyae (Godefroy-Lebeuf) Stein",
      commonName: "Godefroy's Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "Thailand, Vietnam",
      bloomSeason: "Summer",
      description: "Miniature species with mottled leaves and white flowers heavily spotted with purple-red. Excellent for small growing areas.",
      careTips: [
        "Low to medium, indirect light",
        "Water when slightly dry",
        "Warm-growing species",
        "Moderate to high humidity (65-80%)"
      ]
    },
    "Paphiopedilum gratrixianum orchid": {
      scientificName: "Paphiopedilum gratrixianum (Mast.) Guillaumin",
      commonName: "Gratrix's Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "Vietnam, Laos",
      bloomSeason: "Fall to Winter",
      description: "Features mottled foliage and yellowish-green flowers with brown spots and striping. Robust grower.",
      careTips: [
        "Medium light",
        "Keep consistently moist",
        "Intermediate to warm temperatures",
        "Moderate humidity (60-75%)"
      ]
    },
    "Paphiopedilum henryanum orchid": {
      scientificName: "Paphiopedilum henryanum Braem",
      commonName: "Henry's Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "China, Vietnam",
      bloomSeason: "Spring",
      description: "Distinctive mottled foliage with flowers featuring prominent spotting and veining. Sequential bloomer.",
      careTips: [
        "Low to medium light",
        "Regular watering, slight drying between",
        "Intermediate temperatures preferred",
        "Moderate to high humidity (65-80%)"
      ]
    },
    "Paphiopedilum intanon-villosum orchid": {
      scientificName: "Paphiopedilum intanon-villosum",
      commonName: "Intanon Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "Thailand",
      bloomSeason: "Winter",
      description: "Rare species from high elevations with plain green leaves and brownish flowers. Cool-growing requirements.",
      careTips: [
        "Medium light levels",
        "Keep consistently moist",
        "Cool to intermediate temperatures essential",
        "High humidity (70-85%)"
      ]
    },
    "Paphiopedilum niveum (rchb.f.) stein orchid": {
      scientificName: "Paphiopedilum niveum (Rchb.f.) Stein",
      commonName: "Snowy Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "Thailand, Malaysia",
      bloomSeason: "Spring to Summer",
      description: "Compact species with mottled leaves and pristine white flowers lightly spotted with purple. One of the most beautiful Paphs.",
      careTips: [
        "Low to medium light",
        "Water when slightly dry, avoid overwatering",
        "Warm-growing, needs good drainage",
        "Moderate to high humidity (65-80%)"
      ]
    },
    "Paphiopedilum parishii orchid": {
      scientificName: "Paphiopedilum parishii (Rchb.f.) Stein",
      commonName: "Parish's Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "Myanmar, Thailand, China",
      bloomSeason: "Fall",
      description: "Multi-floral species producing up to 7 flowers per stem. Twisted petals and green-purple coloration.",
      careTips: [
        "Medium light",
        "Keep evenly moist year-round",
        "Intermediate temperatures",
        "Moderate to high humidity (65-80%)"
      ]
    },
    "Paphiopedilum spicerianum orchid": {
      scientificName: "Paphiopedilum spicerianum (Rchb.f.) Pfitzer",
      commonName: "Spicer's Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "India (Assam)",
      bloomSeason: "Fall to Winter",
      description: "Historic species with plain green leaves and distinctive white dorsal sepal with central purple stripe. Easy to grow.",
      careTips: [
        "Medium light levels",
        "Water regularly, allow slight drying",
        "Cool to intermediate temperatures",
        "Moderate humidity (60-70%)"
      ]
    },
    "Paphiopedilum sukhakulii orchid": {
      scientificName: "Paphiopedilum sukhakulii Schoser & Senghas",
      commonName: "Sukhakul's Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "Thailand",
      bloomSeason: "Fall to Winter",
      description: "Stunning mottled foliage and large green flowers with heavy spotting. Sought after for its impressive appearance.",
      careTips: [
        "Low to medium light",
        "Keep evenly moist",
        "Warm-growing species",
        "High humidity (70-85%)"
      ]
    },
    "Pelatantheria bicuspidata (rolfe ex downie) tang & wang orchid": {
      scientificName: "Pelatantheria bicuspidata (Rolfe ex Downie) Tang & F.T.Wang",
      commonName: "Two-pointed Pelatantheria",
      genus: "Pelatantheria",
      origin: "Southeast Asia",
      bloomSeason: "Summer",
      description: "Miniature orchid with small, delicate flowers. Grows well mounted with exposed roots.",
      careTips: [
        "Bright, indirect light",
        "Mist frequently or water daily",
        "Must be mounted",
        "Very high humidity (80-90%)"
      ]
    },
    "Pelatantheria insectiflora (rchb.f.) ridl. orchid": {
      scientificName: "Pelatantheria insectiflora (Rchb.f.) Ridl.",
      commonName: "Insect-flowered Pelatantheria",
      genus: "Pelatantheria",
      origin: "Malaysia, Thailand",
      bloomSeason: "Spring to Summer",
      description: "Tiny flowers resembling small insects. Fascinating miniature species for mounted culture.",
      careTips: [
        "Bright light with air movement",
        "Daily misting essential",
        "Mount on small piece of bark",
        "Very high humidity (85-95%)"
      ]
    },
    "Phaius tankervilleae (banks ex i' heritier) blume orchid": {
      scientificName: "Phaius tankervilleae (Banks ex l'Héritier) Blume",
      commonName: "Nun's Orchid, Swamp Orchid",
      genus: "Phaius",
      origin: "India, Southeast Asia, Australia",
      bloomSeason: "Winter to Spring",
      description: "Large terrestrial orchid with impressive flower spikes bearing brown and white flowers. Robust and easy to grow.",
      careTips: [
        "Partial shade to filtered light",
        "Keep well-watered during growing season",
        "Grow in terrestrial orchid mix",
        "Moderate humidity (60-75%)"
      ]
    },
    "Phalaenopsis cornucervi (breda) bl. & rchb.f. orchid": {
      scientificName: "Phalaenopsis cornu-cervi (Breda) Bl. & Rchb.f.",
      commonName: "Deer-horned Phalaenopsis",
      genus: "Phalaenopsis",
      origin: "Southeast Asia",
      bloomSeason: "Year-round",
      description: "Unique Phalaenopsis with flattened, antler-like flower stems. Sequential bloomer with yellow-green flowers spotted with red-brown.",
      careTips: [
        "Bright, indirect light",
        "Water when potting mix becomes dry",
        "Warm-growing species",
        "Moderate to high humidity (60-80%)"
      ]
    },
    "Rhynchostylis gigantea (lindl.) ridl. orchid": {
      scientificName: "Rhynchostylis gigantea (Lindl.) Ridl.",
      commonName: "Giant Rhynchostylis, Foxtail Orchid",
      genus: "Rhynchostylis",
      origin: "Myanmar, Thailand, Malaysia",
      bloomSeason: "Winter to Spring",
      description: "Spectacular species with dense, cylindrical flower spikes covered in fragrant white, pink, or spotted flowers. Highly fragrant.",
      careTips: [
        "Very bright light, some direct sun beneficial",
        "Water daily in warm weather",
        "Best grown in baskets for pendulous roots",
        "High humidity (70-85%)"
      ]
    },
    "Trichoglottis orchideae (koern) garay. orchid": {
      scientificName: "Trichoglottis orchideae (Koern.) Garay",
      commonName: "Orchid-like Trichoglottis",
      genus: "Trichoglottis",
      origin: "Southeast Asia",
      bloomSeason: "Summer to Fall",
      description: "Scrambling orchid with small but numerous fragrant flowers. Can form large specimens over time.",
      careTips: [
        "Bright, indirect to filtered sun",
        "Water frequently, keep roots moist",
        "Grow mounted or in baskets",
        "High humidity (75-85%)"
      ]
    },
    "Bulbophyllum auratum Lindl. orchid": {
      scientificName: "Bulbophyllum auratum Lindl.",
      commonName: "Golden Bulbophyllum",
      genus: "Bulbophyllum",
      origin: "India, Southeast Asia",
      bloomSeason: "Spring to Summer",
      description: "Features golden-yellow flowers with distinctive appearance. Compact species suitable for small collections.",
      careTips: [
        "Moderate to bright indirect light",
        "Regular watering with good drainage",
        "Can be potted or mounted",
        "Moderate to high humidity (65-80%)"
      ]
    },
    "Bulbophyllum morphologorum F.Kranzl. orchid": {
      scientificName: "Bulbophyllum morphologorum F.Kränzl.",
      commonName: "Morphologist's Bulbophyllum",
      genus: "Bulbophyllum",
      origin: "Papua New Guinea",
      bloomSeason: "Summer",
      description: "Rare species with unique flower structure. Highly sought after by Bulbophyllum specialists.",
      careTips: [
        "Bright, filtered light",
        "Keep consistently moist",
        "Mounted culture preferred",
        "High humidity essential (75-85%)"
      ]
    },
    "Dendrobium cumulatum Lindl. orchid": {
      scientificName: "Dendrobium cumulatum Lindl.",
      commonName: "Clustered Dendrobium",
      genus: "Dendrobium",
      origin: "India, Myanmar, Thailand",
      bloomSeason: "Spring",
      description: "Produces clusters of white to cream flowers with yellow throat. Sweetly fragrant blooms.",
      careTips: [
        "Bright light with some morning sun",
        "Water regularly during growth",
        "Cool, dry winter rest required",
        "Moderate humidity (60-75%)"
      ]
    },
    "Maxiralia tenui folia orchid": {
      scientificName: "Maxillaria tenuifolia Lindl.",
      commonName: "Coconut Orchid",
      genus: "Maxillaria",
      origin: "Mexico, Central America",
      bloomSeason: "Spring to Summer",
      description: "Famous for its coconut fragrance. Small dark red flowers with yellow center. Easy to grow and bloom.",
      careTips: [
        "Bright, indirect light",
        "Water regularly, allow slight drying",
        "Can tolerate cooler temperatures",
        "Moderate humidity (60-70%)"
      ]
    },
    "Paphiopedilum vejvarutianum O. Gruss & Roellke orchid": {
      scientificName: "Paphiopedilum vejvarutianum O.Gruss & Roellke",
      commonName: "Vejvarut's Slipper Orchid",
      genus: "Paphiopedilum",
      origin: "Thailand",
      bloomSeason: "Spring",
      description: "Recently described species with mottled foliage and attractive flowers. Endemic to Thailand.",
      careTips: [
        "Low to medium light",
        "Keep evenly moist",
        "Warm-growing species",
        "High humidity (70-85%)"
      ]
    },
    "Oncidium goldiana orchid": {
      scientificName: "Oncidium goldiana",
      commonName: "Golden Oncidium",
      genus: "Oncidium",
      origin: "Central/South America",
      bloomSeason: "Fall to Winter",
      description: "Produces branching sprays of golden-yellow flowers. Easy to grow and floriferous.",
      careTips: [
        "Bright light, tolerates some direct sun",
        "Water when potting mix dries slightly",
        "Intermediate to warm temperatures",
        "Moderate humidity (50-70%)"
      ]
    }
  };

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.error = 'Please select a valid image file';
        return;
      }

      // Validate file size (e.g., max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        this.error = 'Image size should be less than 10MB';
        return;
      }

      this.selectedFile = file;
      this.error = null;
      this.prediction = null;
      this.orchidDetails = null;

      // Create image preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.imagePreview = null;
    this.prediction = null;
    this.orchidDetails = null;
    this.error = null;
    
    // Reset file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onUpload() {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.error = null;
    this.prediction = null;
    this.orchidDetails = null;

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post<any>('http://localhost:3000/predict', formData)
      .subscribe({
        next: (res) => {
          this.prediction = res.prediction;
          
          // Get detailed information from database
          this.orchidDetails = this.orchidDatabase[res.prediction] || {
            scientificName: res.prediction,
            commonName: "Information not available",
            genus: "Unknown",
            origin: "Data not available",
            bloomSeason: "Unknown",
            description: "Detailed information for this orchid species is currently unavailable.",
            careTips: ["General orchid care guidelines apply"]
          };
          
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error:', err);
          this.error = err.error?.message || 'Failed to classify image. Please try again.';
          this.isLoading = false;
        }
      });
  }
}
import pokiriImg from '../assets/pokiri_action.png';
import businessmanImg from '../assets/businessman_sit.png';
import khalejaImg from '../assets/khaleja_duo.png';
import athaduImg from '../assets/athadu_style.png';

export const movies = [
    {
        id: 'pokiri',
        title: 'POKIRI',
        color: '#00d2ff', // Electric Blue
        image: pokiriImg,
        shortDialogue: "Evadu kodithe dimma thirigi...",
        dialogue: "Evadu kodithe dimma thirigi mind block aypothado… aade pandugadu",
        conversation: [
            "Bhayapade Vade Beraniki Ostadu...Manadaggara Beralu Levamma",
            "Ramanaa Load Yettali Raa Check Post Padthadi",
            "Okkasari commit aythe na maata nene vinanu",
            "Yeppudochamannadi kaadu annaya, bullet diginda ledha annadhi point…",
            "Okadu taagamante nenu taaganu. Naaku taagalanipisthe taagutaanu",
            "Nenu entha yedhavano naake thelidhu",
            "Family Family Upma thini brathikesthunarama",
            "Tiles esthunarantaga…"
        ],
        songs: [
            "Gudumba gudumba...",
            "Dole dole dil jara...",
            "Devudaa devudaa...",
            "Gala gala paruthuna Godavari..."
        ]
    },
    {
        id: 'okkadu',
        title: 'OKKADU',
        color: '#ff3c00', // Intense Action Orange
        image: pokiriImg, // Fallback/Placeholder if specific img missing
        shortDialogue: "Idi Kurnool kadu ra, paathabasti",
        dialogue: "Yuddham modhalayaka madhyalone vadileyatam magathanam anipinchukodu",
        conversation: [
            "Mee ooru kabaddi aadatanki vacha, vachaka telsindhi aadalsindhi ground lo kaadu ikada ani",
            "Abbey o battebazz, bayaniki meaning eh teliani blood ra naadi"
        ],
        songs: [
            "Hare rama...",
            "Nuvvemmaya...",
            "Sahasam swasaga..."
        ]
    },
    {
        id: 'khaleja',
        title: 'KHALEJA',
        color: '#c5a059', // Desert Gold
        image: khalejaImg,
        shortDialogue: "Kallu unnodu mundumatrame chustadu...",
        dialogue: "Kallu unnodu mundumatrame chustadu, dimak unnodu duniya motham chustadu",
        conversation: [
            "Niku Baga Madhamekkindi Ra Govardhana",
            "Aadadhi kanapadagaane magaadu…kathi kanapadagaane devudu",
            "Ontariga puttav.. Ontariga pothav.. ee Ontariga Jogging chesukoleva"
        ],
        songs: [
            "Sada shiva...",
            "Piliche...",
            "Taxi..."
        ]
    },
    {
        id: 'business',
        title: 'BUSINESSMAN',
        color: '#ff0055', // Neon Pink/Red
        image: businessmanImg,
        shortDialogue: "Surya bhai is a brand...",
        dialogue: "Yuddam chethakanode dharmam gurinchi matladatadu sir",
        conversation: [
            "Gurthupettuko neekante thop evadu ledikkada",
            "Ila round up chesi confuse cheyoduu endukante confusion lo ekkuva kottestanu",
            "Nenu Mellaga elagola bathikeyyataniki Raledhu....Mumbai ni Ucha Poinchataniki vachanu."
        ],
        songs: [
            "Sir Osthara...",
            "Mumbai police...",
            "Pilla chao..."
        ]
    },
    { // Merged Group for other movies
        id: 'others',
        title: 'LEGACY',
        color: '#ffffff',
        image: athaduImg,
        shortDialogue: "JAI BABU",
        dialogue: "JAI BABU", // Placeholder
        conversation: [
            "Aagadu: Dikki balsina kodi chicken shop mundukochi thoda kottindanta",
            "1 Nenokkadine: Andharu ane abadhaniki... Nenu namme nijaaniki dhagaraga velthuna",
            "1 Nenokkadine: Naaku kavalsindhi naaku telisina kadha kaadhu…teliyani kadha",
            "1 Nenokkadine: Nirupinchalenidantha abadham kaadhu… nirupinchindhi antha nijam kaadhu",
            "Bharat Ane Nenu: Thappu jarigithe koncham katinanga undi danni correct cheste miku racharikam rajulu gurthocharu",
            "Spyder: Parichayam leni manishiki ashinchakunda chese sahayame manavatvam.",
            "Athidi: Nilantonni kotti matladatam naku alavatu , kottaanu happy matladukundamaa.",
            "Bobby: Ammani preminchataniki deshanni preminchataniki qualifications akkarledu…. premunte chalu.",
            "Athadu: Nijam cheppakapovadam abadham…Abadhaani nijam cheyalanukovadam mosam",
            "Athadu: Gun ni choodalanuko tappuleddu …. kani bullet ni choodalanukoku chachipothav",
            "Athadu: Manalni champalai anukune vaadini champadam yuddham... Manalni mosam chesevaadini champadam nyaayam"
        ],
        songs: []
    }
];

// Flattened list for the Home Page Stream
export const extraDialogues = [
    // POKIRI
    "Bhayapade Vade Beraniki Ostadu...Manadaggara Beralu Levamma",
    "Ramanaa Load Yettali Raa Check Post Padthadi",
    "Evadu kodithe dimma thirigi mind block aypothado… aade pandugadu",
    "Okkasari commit aythe na maata nene vinanu",
    "Yeppudochamannadi kaadu annaya, bullet diginda ledha annadhi point…",
    "Okadu taagamante nenu taaganu. Naaku taagalanipisthe taagutaanu",
    "Nenu entha yedhavano naake thelidhu",
    "Family Family Upma thini brathikesthunarama",
    "Tiles esthunarantaga…",
    // OKKADU
    "Idi Kurnool kadu ra, paathabasti",
    "Yuddham modhalayaka madhyalone vadileyatam magathanam anipinchukodu",
    "Mee ooru kabaddi aadatanki vacha, vachaka telsindhi aadalsindhi ground lo kaadu ikada ani",
    "Abbey o battebazz, bayaniki meaning eh teliani blood ra naadi",
    // KHALEJA
    "Kallu unnodu mundumatrame chustadu, dimak unnodu duniya motham chustadu",
    "Niku Baga Madhamekkindi Ra Govardhana",
    "Aadadhi kanapadagaane magaadu…kathi kanapadagaane devudu",
    "Ontariga puttav.. Ontariga pothav.. ee Ontariga Jogging chesukoleva",
    // AAGADU
    "Dikki balsina kodi chicken shop mundukochi thoda kottindanta",
    // BUSINESSMAN
    "Gurthupettuko neekante thop evadu ledikkada",
    "Yuddam chethakanode dharmam gurinchi matladatadu sir",
    "Ila round up chesi confuse cheyoduu endukante confusion lo ekkuva kottestanu",
    "Nenu Mellaga elagola bathikeyyataniki Raledhu....Mumbai ni Ucha Poinchataniki vachanu.",
    // 1 NENOKKADINE
    "Andharu ane abadhaniki... Nenu namme nijaaniki dhagaraga velthuna",
    "Naaku kavalsindhi naaku telisina kadha kaadhu…teliyani kadha",
    "Nirupinchalenidantha abadham kaadhu… nirupinchindhi antha nijam kaadhu",
    // BHARAT ANE NENU
    "Thappu jarigithe koncham katinanga undi danni correct cheste miku racharikam rajulu gurthocharu",
    // SPYDER
    "Parichayam leni manishiki ashinchakunda chese sahayame manavatvam.",
    // ATHIDI
    "Nilantonni kotti matladatam naku alavatu , kottaanu happy matladukundamaa.",
    // BOBBY
    "Ammani preminchataniki deshanni preminchataniki qualifications akkarledu…. premunte chalu.",
    // ATHADU
    "Nijam cheppakapovadam abadham…Abadhaani nijam cheyalanukovadam mosam",
    "Gun ni choodalanuko tappuleddu …. kani bullet ni choodalanukoku chachipothav",
    "Manalni champalai anukune vaadini champadam yuddham... Manalni mosam chesevaadini champadam nyaayam",
    // JAI BABU TRIBUTES
    "JAI BABU",
    "JAI BABU",
    "JAI BABU"
];

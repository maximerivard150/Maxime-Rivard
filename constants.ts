import type { ElectroStock, Countries, Vehicle, Jobs, GroceryStock } from './types';

export const WEAPON_TYPES = [ "Pistolet", "Fusil", "Batte", "Couteau", "Mitraillette", "Shotgun", "Machette", "Carabine" ];
export const ARMOR_TYPES = [ "Veste", "Casque", "Gants", "Pants", "Bottes", "Manteau" ];
export const MAGIC_ITEMS = [ "Anneau", "Bague", "Chaîne", "Montre", "Amulette", "Bracelet" ];

export const GROCERY_STOCK: GroceryStock = {
    "🍎 Fruits": [
        "Pomme", "Bleuet", "Orange", "Cerise", "Raisin", "Kiwi", "Banane", "Mangue",
        "Ananas", "Fraise", "Poire", "Pêche", "Melon", "Pastèque", "Abricot", "Prune",
        "Framboise", "Mûre", "Coco", "Grenade", "Papaye", "Litchi"
    ],
    "🥦 Légumes": [
        "Carotte", "Brocoli", "Concombre", "Tomate", "Laitue", "Épinard", "Poivron",
        "Oignon", "Ail", "Chou-fleur", "Courgette", "Betterave", "Haricot vert",
        "Asperge", "Artichaut", "Navet", "Radis", "Patate douce", "Chou", "Kale"
    ],
    "🍞 Céréales & féculents": [
        "Pain", "Céréales", "Riz", "Pâtes", "Quinoa", "Orge", "Maïs",
        "Pommes de terre", "Boulgour", "Couscous", "Flocons d’avoine"
    ],
    "🥩 Protéines animales": [
        "Viande", "Poulet", "Bœuf", "Porc", "Poisson", "Œufs", "Fruits de mer",
        "Jambon", "Saucisse", "Bacon", "Dinde"
    ],
    "🌱 Substituts végétaux": [
        "Tofu", "Tempeh", "Lentilles", "Pois chiches", "Haricots noirs",
        "Edamame", "Seitan", "Haricots rouges", "Fèves", "Pois cassés"
    ],
    "🧀 Produits laitiers": [
        "Lait", "Fromage", "Yogourt", "Crème", "Beurre", "Kéfir", "Crème glacée"
    ],
    "🥜 Noix, graines & huiles": [
        "Noix", "Amandes", "Noisettes", "Cacahuètes", "Pistaches", "Noix de cajou",
        "Graines de chia", "Graines de lin", "Graines de tournesol", "Graines de courge",
        "Huile d'olive", "Huile de coco", "Huile de canola"
    ],
    "🧂 Condiments & divers": [
        "Miel", "Sucre", "Sel", "Épices", "Vinaigre", "Sauce soja", "Ketchup", "Moutarde",
        "Mayonnaise", "Chocolat", "Soda"
    ],
    "🥤 Jus de fruits": [
        "Jus de pomme", "Jus d'orange", "Jus de mangue", "Jus d'ananas", "Jus de raisin",
        "Jus de pastèque", "Jus de fraise", "Jus de kiwi", "Jus de poire"
    ]
};

export const CONSUMABLES = [
    "Bandage+1", "Bandage+2", "Kit de soins", "Antidote", "Potion de santé", "Potion d’énergie",
    "Weed", "Mush", "Speed", "LSD", "Coke", "MDMA", "Opium", "Kétamine",
    "Cigarettes", "Bière", "Vin", "Whisky", "Boisson énergisante",
    "Nourriture en conserve", "Barre énergétique", "Eau", "Ration militaire", "Chips", "Butane"
];

export const RESOURCES = {
    "Métaux": ["Cuivre", "Fer", "Or", "Argent", "Titane", "Aluminium", "Platine", "Zinc", "Plomb"],
    "Minéraux": ["Charbon", "Pierre", "Granit", "Marbre", "Quartz", "Sel", "Argile", "Obsidienne"],
    "Organiques": ["Bois", "Tissu", "Cuir", "Coton", "Soie", "Laine", "Fibre", "Os"],
    "Synthétiques": ["Kevlar", "Plastique", "Caoutchouc", "Verre", "Céramique", "Fibre de carbone", "Nylon"],
    "Rares": ["Uranium", "Cristal", "Ambre", "Mythril", "Adamantium", "Éther", "Matière noire"]
};

export const ITEM_ICONS: Record<string, string> = {
    "Pistolet": "🔫", "Fusil": " rifle", "Batte": "🏏", "Couteau": "🔪", 
    "Veste": "🧥", "Casque": "⛑️", "Gants": "🧤", "Pants": "👖", "Bottes": "👢", "Manteau": "🧥",
    "Anneau": "💍", "Bague": "💍", "Chaîne": "⛓️", "Montre": "⌚", "Amulette": "🧿", "Bracelet": "📿",
    "Sandwich": "🥪", "Burger": "🍔", "Pizza": "🍕", "Poulet": "🍗", "Hot-Dog": "🌭",
    "Sous-Marin Subway": "🥖", "Frite": "🍟", "Poutine": "🥔🧀", "Café": "☕",
    "Pomme": "🍎", "Bleuet": "🫐", "Orange": "🍊", "Cerise": "🍒", "Raisin": "🍇", "Kiwi": "🥝", "Banane": "🍌", "Mangue": "🥭", "Ananas": "🍍", "Fraise": "🍓", "Poire": "🍐", "Pêche": "🍑", "Melon": "🍈", "Pastèque": "🍉", "Abricot": "🍑", "Prune": "🍑", "Framboise": "🍇", "Mûre": "🍇", "Coco": "🥥", "Grenade": "🍈", "Papaye": "🧡", "Litchi": "🍒",
    "Carotte": "🥕", "Brocoli": "🥦", "Concombre": "🥒", "Tomate": "🍅", "Laitue": "🥬", "Épinard": "🥬", "Poivron": "🫑", "Oignon": "🧅", "Ail": "🧄", "Chou-fleur": "🥦", "Courgette": "🥒", "Betterave": "🟣", "Haricot vert": "🟢", "Asperge": "🌱", "Artichaut": "🫛", "Navet": "⚪", "Radis": "🔴", "Patate douce": "🍠", "Chou": "🥬", "Kale": "🥬",
    "Pain": "🍞", "Céréales": "🥣", "Riz": "🍚", "Pâtes": "🍝", "Quinoa": "🌾", "Orge": "🌾", "Maïs": "🌽", "Pommes de terre": "🥔", "Boulgour": "🌾", "Couscous": "🌾", "Flocons d’avoine": "🥣",
    "Viande": "🥩", "Bœuf": "🥩", "Porc": "🥓", "Poisson": "🐟", "Œufs": "🥚", "Fruits de mer": "🦐", "Jambon": "🥓", "Saucisse": "🌭", "Bacon": "🥓", "Dinde": "🦃",
    "Tofu": "🟦", "Tempeh": "🟫", "Lentilles": "🟤", "Pois chiches": "🟡", "Haricots noirs": "⚫", "Edamame": "🟢", "Seitan": "🟤", "Haricots rouges": "🟥", "Fèves": "🟩", "Pois cassés": "🟨",
    "Lait": "🥛", "Fromage": "🧀", "Yogourt": "🥛", "Crème": "🥛", "Beurre": "🧈", "Kéfir": "🥛", "Crème glacée": "🍨",
    "Noix": "🥜", "Amandes": "🌰", "Noisettes": "🌰", "Cacahuètes": "🥜", "Pistaches": "🥜", "Noix de cajou": "🥜", "Graines de chia": "🌱", "Graines de lin": "🌱", "Graines de tournesol": "🌻", "Graines de courge": "🎃", "Huile d'olive": "🫒", "Huile de coco": "🥥", "Huile de canola": "🌻",
    "Miel": "🍯", "Sucre": "🍬", "Sel": "🧂", "Épices": "🧂", "Vinaigre": "🥫", "Sauce soja": "🥫", "Ketchup": "🍅", "Moutarde": "🥫", "Mayonnaise": "🥫", "Chocolat": "🍫",
    "Jus de pomme": "🍎🥤", "Jus d'orange": "🍊🥤", "Jus de mangue": "🥭🥤", "Jus d'ananas": "🍍🥤", "Jus de raisin": "🍇🥤", "Jus de pastèque": "🍉🥤", "Jus de fraise": "🍓🥤", "Jus de kiwi": "🥝🥤", "Jus de poire": "🍐🥤",
    "Bandage": "🩹", "Bandage+1": "🩹", "Médicament": "💊", "Kit de soins": "🧰", "Butane": "🧯",
    "Cigarettes": "🚬", "Bière": "🍺", "Chips": "🍟", "Boisson énergisante": "⚡🥤", "Vin": "🍷", "Whisky": "🥃", "Nourriture en conserve": "🥫", "Barre énergétique": "🍫", "Eau": "💧", "Soda": "🥤",
    "Weed": "🍁", "Mush": "🍄", "Speed": "⚡️", "LSD": "🌈",
    "Cuivre": "🥉", "Fer": "🔩", "Or": "🥇", "Argent": "🥈", "Bois": "🪵", "Pierre": "🪨", "Tissu": "🧶", "Cuir": "👜", "Plastique": "🧴", "Verre": "🥃",
    "default": "📦"
};

export const ELECTRO_STOCK: ElectroStock = {
    "PC": { "PC Gamer": 2175, "Clavier Mécanique": 130.50, "Souris Gaming": 87, "Écran PC 27''": 507.50, "Carte Graphique RTX 4070": 870, "RAM 32GB DDR5": 290, "SSD NVMe 1TB": 217.50 },
    "Consoles": { "Console Xbox Series X": 1087.50, "Steam Deck 512GB": 870, "Console PS5": 1160, "Nintendo Switch OLED": 580, "PlayStation VR2": 725, "Meta Quest 3": 1015 },
    "Manettes": { "Manette PS5": 101.50, "Manette Xbox": 94.25, "Manette Switch Pro": 101.50, "Manette Xbox Elite": 174, "Manette Razer Wolverine": 174 },
    "Téléphones": { "iPhone 15 Pro Max": 2175, "Samsung Galaxy S24 Ultra": 2030, "Google Pixel 8 Pro": 1740, "iPad Pro 12.9''": 1740, "Asus ROG Phone 7": 1595 },
    "TV": { "TV OLED 65''": 1740, "TV QLED 75''": 2030, "Barre de son Dolby Atmos": 507.50, "Projecteur 4K": 1740, "TV Samsung Frame": 1740 },
    "Accessoires": { "Casque Gaming": 174, "Enceinte Bluetooth": 217.50, "Chargeur Rapide": 58, "Microphone USB": 116, "Répéteur Wi-Fi": 87, "Prise connectée smart home": 72.50 }
};

export const COUNTRIES: Countries = {
    "Canada": {
        "Grandes Villes": ["Montreal", "Toronto", "Vancouver", "Calgary", "Ottawa"],
        "Villes": {
            "Montreal": ["Laval", "Longueuil", "Brossard", "Terrebonne", "Repentigny", "Saint-Jérôme", "Sorel-Tracy", "Trois-Rivières"],
            "Toronto": ["Mississauga", "Brampton", "Markham", "Vaughan", "Richmond Hill", "Pickering", "Ajax", "Whitby", "Oshawa"],
            "Vancouver": ["Burnaby", "Surrey", "Richmond", "Coquitlam", "North Vancouver", "Langley", "Delta"],
            "Calgary": ["Airdrie", "Okotoks", "Chestermere", "Cochrane"],
            "Ottawa": ["Gatineau", "Kanata", "Orléans", "Nepean"]
        }
    },
    "Etats-Unis": {
        "Grandes Villes": ["New York", "Los Angeles", "Chicago", "Miami", "Houston"],
        "Villes": {
            "New York": ["Brooklyn", "Queens", "Bronx", "Staten Island", "Newark", "Jersey City"],
            "Los Angeles": ["Santa Monica", "Pasadena", "Long Beach", "Burbank", "Glendale"],
            "Chicago": ["Evanston", "Oak Park", "Naperville", "Schaumburg"],
            "Miami": ["Hialeah", "Coral Gables", "Fort Lauderdale", "Hollywood"],
            "Houston": ["Sugar Land", "Pasadena", "Baytown", "The Woodlands"]
        }
    },
    "France": {
        "Grandes Villes": ["Paris", "Lyon", "Marseille", "Bordeaux", "Nice"],
        "Villes": {
            "Paris": ["Versailles", "Boulogne-Billancourt", "Saint-Denis", "Nanterre", "Créteil"],
            "Lyon": ["Villeurbanne", "Vénissieux", "Bron", "Caluire-et-Cuire"],
            "Marseille": ["Aubagne", "La Ciotat", "Martigues", "Vitrolles"],
            "Bordeaux": ["Mérignac", "Pessac", "Talence", "Gradignan"],
            "Nice": ["Cagnes-sur-Mer", "Antibes", "Saint-Laurent-du-Var", "Grasse"]
        }
    },
    "Japon": {
        "Grandes Villes": ["Tokyo", "Osaka", "Kyoto", "Hiroshima", "Sapporo"],
        "Villes": {
            "Tokyo": ["Yokohama", "Kawasaki", "Chiba", "Saitama"],
            "Osaka": ["Sakai", "Higashiosaka", "Toyonaka"],
            "Kyoto": ["Uji", "Kameoka", "Fushimi"],
            "Hiroshima": ["Kure", "Fukuyama"],
            "Sapporo": ["Otaru", "Ebetsu"]
        }
    },
    "Bresil": {
        "Grandes Villes": ["Rio de Janeiro", "Sao Paulo", "Brasilia", "Salvador", "Fortaleza"],
        "Villes": {
            "Rio de Janeiro": ["Niterói", "Duque de Caxias", "Nova Iguaçu"],
            "Sao Paulo": ["Guarulhos", "Santo André", "São Bernardo do Campo"],
            "Brasilia": ["Taguatinga", "Ceilândia"],
            "Salvador": ["Lauro de Freitas", "Camaçari"],
            "Fortaleza": ["Caucaia", "Maracanaú"]
        }
    },
    "Allemagne": {
        "Grandes Villes": ["Berlin", "Munich", "Hambourg", "Francfort", "Cologne"],
        "Villes": {
            "Berlin": ["Potsdam", "Cottbus", "Oranienburg"],
            "Munich": ["Augsburg", "Freising", "Erding"],
            "Hambourg": ["Lübeck", "Norderstedt", "Elmshorn"],
            "Francfort": ["Offenbach", "Darmstadt", "Wiesbaden"],
            "Cologne": ["Bonn", "Leverkusen", "Bergisch Gladbach"]
        }
    },
    "Australie": {
        "Grandes Villes": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
        "Villes": {
            "Sydney": ["Parramatta", "Penrith", "Liverpool"],
            "Melbourne": ["Geelong", "Ballarat", "Frankston"],
            "Brisbane": ["Ipswich", "Logan City", "Redland"],
            "Perth": ["Fremantle", "Joondalup", "Mandurah"],
            "Adelaide": ["Mount Barker", "Gawler", "Murray Bridge"]
        }
    },
    "Italie": {
        "Grandes Villes": ["Rome", "Milan", "Venise", "Florence", "Naples"],
        "Villes": {
            "Rome": ["Fiumicino", "Ciampino", "Tivoli"],
            "Milan": ["Monza", "Sesto San Giovanni", "Bergamo"],
            "Venise": ["Mestre", "Padoue", "Treviso"],
            "Florence": ["Prato", "Pistoia", "Empoli"],
            "Naples": ["Pompei", "Caserta", "Salerno"]
        }
    },
    "Espagne": {
        "Grandes Villes": ["Madrid", "Barcelone", "Valence", "Seville", "Bilbao"],
        "Villes": {
            "Madrid": ["Alcalá de Henares", "Getafe", "Leganés"],
            "Barcelone": ["Badalona", "Terrassa", "Sabadell"],
            "Valence": ["Torrent", "Gandia", "Paterna"],
            "Seville": ["Dos Hermanas", "Alcalá de Guadaíra", "Utrera"],
            "Bilbao": ["Barakaldo", "Getxo", "Santurtzi"]
        }
    },
    "Mexique": {
        "Grandes Villes": ["Mexico", "Guadalajara", "Cancun", "Monterrey", "Puebla"],
        "Villes": {
            "Mexico": ["Ecatepec", "Naucalpan", "Tlalnepantla"],
            "Guadalajara": ["Zapopan", "Tlaquepaque", "Tonalá"],
            "Cancun": ["Playa del Carmen", "Puerto Morelos"],
            "Monterrey": ["San Nicolás", "Apodaca", "Guadalupe"],
            "Puebla": ["San Pedro Cholula", "Atlixco", "Tehuacán"]
        }
    },
    "Royaume-Uni": {
        "Grandes Villes": ["Londres", "Manchester", "Liverpool", "Birmingham", "Edimbourg"],
        "Villes": {
            "Londres": ["Croydon", "Watford", "Slough", "Romford"],
            "Manchester": ["Salford", "Stockport", "Bolton", "Oldham"],
            "Liverpool": ["Birkenhead", "St Helens", "Bootle"],
            "Birmingham": ["Wolverhampton", "Solihull", "Walsall"],
            "Edimbourg": ["Livingston", "Dunfermline", "Musselburgh"]
        }
    },
    "Chine": {
        "Grandes Villes": ["Pekin", "Shanghai", "Guangzhou", "Shenzhen", "Chengdu"],
        "Villes": {
            "Pekin": ["Tianjin", "Langfang", "Zhangjiakou"],
            "Shanghai": ["Suzhou", "Hangzhou", "Nantong"],
            "Guangzhou": ["Foshan", "Dongguan", "Zhongshan"],
            "Shenzhen": ["Huizhou", "Zhuhai"],
            "Chengdu": ["Mianyang", "Deyang", "Leshan"]
        }
    },
    "Inde": {
        "Grandes Villes": ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"],
        "Villes": {
            "Delhi": ["Noida", "Gurgaon", "Faridabad", "Ghaziabad"],
            "Mumbai": ["Thane", "Navi Mumbai", "Kalyan"],
            "Bangalore": ["Mysore", "Tumkur", "Hosur"],
            "Chennai": ["Tambaram", "Avadi", "Kanchipuram"],
            "Kolkata": ["Howrah", "Salt Lake", "Barrackpore"]
        }
    },
    "Russie": {
        "Grandes Villes": ["Moscou", "Saint-Petersbourg", "Kazan", "Novossibirsk", "Sotchi"],
        "Villes": {
            "Moscou": ["Khimki", "Balashikha", "Podolsk"],
            "Saint-Petersbourg": ["Pushkin", "Kolpino", "Gatchina"],
            "Kazan": ["Zelenodolsk", "Vysokaya Gora"],
            "Novossibirsk": ["Berdsk", "Iskitim"],
            "Sotchi": ["Adler", "Khosta"]
        }
    },
    "Egypte": {
        "Grandes Villes": ["Le Caire", "Alexandrie", "Gizeh", "Louxor", "Assouan"],
        "Villes": {
            "Le Caire": ["Nasr City", "Heliopolis", "Maadi"],
            "Alexandrie": ["Borg El Arab", "El Amreya"],
            "Gizeh": ["6th of October City", "Sheikh Zayed"],
            "Louxor": ["Armant", "Esna"],
            "Assouan": ["Kom Ombo", "Edfou"]
        }
    },
    "Afrique du Sud": {
        "Grandes Villes": ["Johannesburg", "Le Cap", "Durban", "Pretoria", "Port Elizabeth"],
        "Villes": {
            "Johannesburg": ["Soweto", "Sandton", "Randburg", "Benoni"],
            "Le Cap": ["Stellenbosch", "Paarl", "Somerset West"],
            "Durban": ["Pinetown", "Umhlanga", "KwaMashu"],
            "Pretoria": ["Centurion", "Mamelodi", "Akasia"],
            "Port Elizabeth": ["Uitenhage", "Despatch"]
        }
    },
    "Turquie": {
        "Grandes Villes": ["Istanbul", "Ankara", "Izmir", "Antalya", "Bursa"],
        "Villes": {
            "Istanbul": ["Üsküdar", "Kadıköy", "Bakırköy", "Beylikdüzü"],
            "Ankara": ["Çankaya", "Keçiören", "Etimesgut"],
            "Izmir": ["Karşıyaka", "Bornova", "Konak"],
            "Antalya": ["Alanya", "Manavgat", "Kemer"],
            "Bursa": ["Osmangazi", "Yıldırım", "Nilüfer"]
        }
    },
    "Coree du Sud": {
        "Grandes Villes": ["Seoul", "Busan", "Incheon", "Daegu", "Gwangju"],
        "Villes": {
            "Seoul": ["Gangnam", "Jongno", "Mapo", "Yongsan"],
            "Busan": ["Haeundae", "Yeonje", "Dongnae"],
            "Incheon": ["Namdong", "Bupyeong", "Yeonsu"],
            "Daegu": ["Suseong", "Dalseo", "Buk"],
            "Gwangju": ["Nam", "Dong", "Buk"]
        }
    },
    "Grece": {
        "Grandes Villes": ["Athenes", "Thessalonique", "Patras", "Rhodes", "Heraklion"],
        "Villes": {
            "Athenes": ["Piraeus", "Kallithea", "Marousi"],
            "Thessalonique": ["Kalamaria", "Pylaia", "Neapoli"],
            "Patras": ["Rio", "Paralia", "Vrachnaiika"],
            "Rhodes": ["Ialyssos", "Faliraki", "Kremasti"],
            "Heraklion": ["Gazi", "Archanes", "Malia"]
        }
    },
    "Argentine": {
        "Grandes Villes": ["Buenos Aires", "Cordoba", "Rosario", "Mendoza", "La Plata"],
        "Villes": {
            "Buenos Aires": ["Avellaneda", "Lanús", "Quilmes", "San Isidro"],
            "Cordoba": ["Villa Carlos Paz", "Alta Gracia", "Río Cuarto"],
            "Rosario": ["Villa Gobernador Gálvez", "San Lorenzo", "Funes"],
            "Mendoza": ["Godoy Cruz", "Luján de Cuyo", "Maipú"],
            "La Plata": ["Berisso", "Ensenada"]
        }
    }
};

export const CAR_LIST: Vehicle[] = [
    {"marque": "Toyota", "modèles": ["Corolla", "Camry", "RAV4"]},
    {"marque": "Honda", "modèles": ["Civic", "Accord", "CR-V"]},
    {"marque": "Ford", "modèles": ["Mustang", "F-150", "Escape"]},
    {"marque": "BMW", "modèles": ["X5", "3 Series", "M4"]},
    {"marque": "Tesla", "modèles": ["Model 3", "Model S", "Model Y"]},
    {"marque": "Ferrari", "modèles": ["488 GTB", "Portofino", "Roma"]},
    {"marque": "Lamborghini", "modèles": ["Huracán", "Aventador", "Urus"]},
];

export const JOBS: Jobs = {
    "Services et logistique": {
        "1": {"nom": "Livreur", "salaire": 200, "xp": 200},
        "2": {"nom": "Chauffeur (Taxi/VTC)", "salaire": 400, "xp": 400},
        "4": {"nom": "Barman / Tavernier", "salaire": 400, "xp": 400},
        "7": {"nom": "Cuisinier", "salaire": 500, "xp": 500},
    },
    "Métiers techniques et industriels": {
        "16": {"nom": "Mineur", "salaire": 350, "xp": 350},
        "17": {"nom": "Artisan / Forgeron", "salaire": 450, "xp": 450},
        "20": {"nom": "Électricien", "salaire": 500, "xp": 500},
        "33": {"nom": "Garagiste", "salaire": 450, "xp": 450}
    },
    "Technologie et cyberspace": {
        "34": {"nom": "Informaticien / Hacker", "salaire": 675, "xp": 675},
        "35": {"nom": "Analyste de données", "salaire": 625, "xp": 625},
        "41": {"nom": "Technicien spatial", "salaire": 800, "xp": 800},
        "42": {"nom": "Pilote de drone", "salaire": 550, "xp": 550}
    },
     "Santé et soins": {
        "70": {"nom": "Médecin / Infirmier", "salaire": 585, "xp": 585},
        "74": {"nom": "Dentiste", "salaire": 630, "xp": 630},
        "77": {"nom": "Chirurgien cybernétique", "salaire": 720, "xp": 720},
    },
    "Activités illégales ou marginales": {
        "90": {"nom": "Dealer", "salaire": 900, "xp": 900},
        "92": {"nom": "Pilleur / Voleur", "salaire": 450, "xp": 450},
        "97": {"nom": "Pirate spatial", "salaire": 1125, "xp": 1125},
        "98": {"nom": "Espion corporatiste", "salaire": 1035, "xp": 1035},
    }
};
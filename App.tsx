import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Player, Enemy, Message, GameView, JobData, SaveSlot, Skill, Skills } from './types';
import { COUNTRIES, ELECTRO_STOCK, JOBS, ITEM_ICONS, GROCERY_STOCK } from './constants';
import { generateDynamicDescription } from './services/geminiService';
import TypewriterText from './components/TypewriterText';

const createSkillAtLevel = (level: number): Skill => {
    if (level <= 0) {
      return { level: 0, xp: 0, xpMax: 100 };
    }
    return {
      level: level,
      xp: 0,
      xpMax: Math.floor(100 * Math.pow(1.2, level - 1))
    };
};

const initialPlayer: Player = {
  name: "Joueur",
  level: 1,
  hp: 100,
  maxHp: 100,
  attack: 10,
  xp: 0,
  xpMax: 100,
  money: 500,
  bankMoney: 1000,
  inventory: ["Bandage+1", "Pistolet", "Pomme"],
  equippedWeapons: [],
  equippedArmor: { Veste: null, Casque: null, Gants: null, Pants: null, Bottes: null, Manteau: null },
  equippedMagic: { Anneau1: null, Anneau2: null, Montre: null },
  currentCity: "Montreal",
  country: "Canada",
  stats: {
    force: 5,
    intelligence: 5,
    charisme: 5,
    dexterite: 5,
    constitution: 5,
    sagesse: 5,
    chance: 5,
  },
  skills: {
    intellectual: {
        programmation: createSkillAtLevel(0),
        mathematiques: createSkillAtLevel(0),
        logique: createSkillAtLevel(0),
        analyse_de_donnees: createSkillAtLevel(0),
        cryptographie: createSkillAtLevel(0),
        electronique: createSkillAtLevel(0),
        ingenierie: createSkillAtLevel(0),
        robotique: createSkillAtLevel(0),
        sciences_physiques: createSkillAtLevel(0),
        biologie: createSkillAtLevel(0),
        chimie: createSkillAtLevel(0),
        medecine: createSkillAtLevel(0),
        psychologie: createSkillAtLevel(0),
        cartographie: createSkillAtLevel(0),
        archeologie: createSkillAtLevel(0),
        linguistique: createSkillAtLevel(0),
        erudition: createSkillAtLevel(0),
        strategie: createSkillAtLevel(0),
        recherche: createSkillAtLevel(0),
    },
    artistic: {
        dessin: createSkillAtLevel(0),
        peinture: createSkillAtLevel(0),
        sculpture: createSkillAtLevel(0),
        photographie: createSkillAtLevel(0),
        cinema: createSkillAtLevel(0),
        animation: createSkillAtLevel(0),
        design_graphique: createSkillAtLevel(0),
        design_de_mode: createSkillAtLevel(0),
        architecture: createSkillAtLevel(0),
        calligraphie: createSkillAtLevel(0),
        tatouage: createSkillAtLevel(0),
        graffiti: createSkillAtLevel(0),
        ecriture_creative: createSkillAtLevel(0),
        poesie: createSkillAtLevel(0),
        narration: createSkillAtLevel(0),
        improvisation: createSkillAtLevel(0),
    },
    musical: {
        composition: createSkillAtLevel(3),
        improvisation_musicale: createSkillAtLevel(0),
        theorie_musicale: createSkillAtLevel(0),
        chant: createSkillAtLevel(0),
        beatmaking: createSkillAtLevel(0),
        mixage_audio: createSkillAtLevel(0),
        mao: createSkillAtLevel(0),
        djing: createSkillAtLevel(0),
        instruments_a_cordes: createSkillAtLevel(0),
        guitare: createSkillAtLevel(5),
        basse: createSkillAtLevel(0),
        instruments_a_vent: createSkillAtLevel(0),
        instruments_a_percussion: createSkillAtLevel(0),
        batterie: createSkillAtLevel(0),
        claviers: createSkillAtLevel(0),
    },
    manual: {
        menuiserie: createSkillAtLevel(0),
        forge: createSkillAtLevel(0),
        couture: createSkillAtLevel(0),
        cuisine: createSkillAtLevel(3),
        jardinage: createSkillAtLevel(0),
        mecanique: createSkillAtLevel(0),
        ebenisterie: createSkillAtLevel(0),
        construction: createSkillAtLevel(0),
        reparation: createSkillAtLevel(0),
        chasse: createSkillAtLevel(0),
        peche: createSkillAtLevel(0),
        survie: createSkillAtLevel(0),
    },
    social: {
        charisme: createSkillAtLevel(0),
        persuasion: createSkillAtLevel(0),
        negociation: createSkillAtLevel(0),
        leadership: createSkillAtLevel(1),
        empathie: createSkillAtLevel(0),
        eloquence: createSkillAtLevel(0),
        comedie: createSkillAtLevel(1),
        seduction: createSkillAtLevel(1),
        langues_etrangeres: createSkillAtLevel(0),
        diplomatie: createSkillAtLevel(0),
        enseignement: createSkillAtLevel(0),
        mentorat: createSkillAtLevel(0),
        intimidation: createSkillAtLevel(0),
        tromperie: createSkillAtLevel(0),
    },
    physical: {
        athletisme: createSkillAtLevel(0),
        endurance: createSkillAtLevel(0),
        force_brute: createSkillAtLevel(0),
        dexterite: createSkillAtLevel(0),
        discretion: createSkillAtLevel(0),
        escalade: createSkillAtLevel(0),
        natation: createSkillAtLevel(0),
        equitation: createSkillAtLevel(0),
        tir_a_larc: createSkillAtLevel(0),
        combat_a_mains_nues: createSkillAtLevel(0),
        escrime: createSkillAtLevel(0),
        tir_armes_a_feu: createSkillAtLevel(0),
        conduite_vehicule: createSkillAtLevel(0),
        pilotage_aeronef: createSkillAtLevel(0),
        acrobaties: createSkillAtLevel(0),
        escamotage: createSkillAtLevel(0),
        entrainement_physique: createSkillAtLevel(1),
    },
    misc: {
        premiers_soins: createSkillAtLevel(0),
        guerison: createSkillAtLevel(0),
        alchimie: createSkillAtLevel(0),
        jonglerie: createSkillAtLevel(0),
        crochetage: createSkillAtLevel(0),
    },
  },
  time: { hour: 8, day: 1, month: 3, year: 2025 },
  season: "Printemps",
  weather: "Ensoleillé",
};

const SKILL_CATEGORY_NAMES = {
    intellectual: "🧠 INTELLECTUELLES & TECHNIQUES",
    artistic: "🎨 ARTISTIQUES & CRÉATIVES",
    musical: "🎵 MUSICALES",
    manual: "🛠️ MANUELLES & ARTISANALES",
    social: "🧍 SOCIALES & COMMUNICATION",
    physical: "🕵️ PHYSIQUES & PRATIQUES",
    misc: "DIVERS"
};

const SKILL_NAMES: Record<string, string> = {
    // Intellectual
    programmation: "Programmation",
    mathematiques: "Mathématiques",
    logique: "Logique",
    analyse_de_donnees: "Analyse de données",
    cryptographie: "Cryptographie",
    electronique: "Électronique",
    ingenierie: "Ingénierie",
    robotique: "Robotique",
    sciences_physiques: "Sciences physiques",
    biologie: "Biologie",
    chimie: "Chimie",
    medecine: "Médecine",
    psychologie: "Psychologie",
    cartographie: "Cartographie",
    archeologie: "Archéologie",
    linguistique: "Linguistique",
    erudition: "Érudition",
    strategie: "Stratégie",
    recherche: "Recherche",
    // Artistic
    dessin: "Dessin",
    peinture: "Peinture",
    sculpture: "Sculpture",
    photographie: "Photographie",
    cinema: "Cinéma",
    animation: "Animation",
    design_graphique: "Design graphique",
    design_de_mode: "Design de mode",
    architecture: "Architecture",
    calligraphie: "Calligraphie",
    tatouage: "Tatouage",
    graffiti: "Graffiti",
    ecriture_creative: "Écriture créative",
    poesie: "Poésie",
    narration: "Narration",
    improvisation: "Improvisation",
    // Musical
    composition: "Composition",
    improvisation_musicale: "Improvisation musicale",
    theorie_musicale: "Théorie musicale",
    chant: "Chant",
    beatmaking: "Beatmaking",
    mixage_audio: "Mixage audio",
    mao: "MAO (musique assistée par ordinateur)",
    djing: "DJing",
    instruments_a_cordes: "Instruments à cordes",
    guitare: "Guitare",
    basse: "Basse",
    instruments_a_vent: "Instruments à vent",
    instruments_a_percussion: "Instruments à percussion",
    batterie: "Batterie",
    claviers: "Claviers",
    // Manual
    menuiserie: "Menuiserie",
    forge: "Forge",
    couture: "Couture",
    cuisine: "Cuisine",
    jardinage: "Jardinage",
    mecanique: "Mécanique",
    ebenisterie: "Ébénisterie",
    construction: "Construction",
    reparation: "Réparation",
    chasse: "Chasse",
    peche: "Pêche",
    survie: "Survie",
    // Social
    charisme: "Charisme",
    persuasion: "Persuasion",
    negociation: "Négociation",
    leadership: "Leadership",
    empathie: "Empathie",
    eloquence: "Éloquence",
    comedie: "Comédie",
    seduction: "Séduction",
    langues_etrangeres: "Langues étrangères",
    diplomatie: "Diplomatie",
    enseignement: "Enseignement",
    mentorat: "Mentorat",
    intimidation: "Intimidation",
    tromperie: "Tromperie",
    // Physical
    athletisme: "Athlétisme",
    endurance: "Endurance",
    force_brute: "Force brute",
    dexterite: "Dextérité",
    discretion: "Discrétion",
    escalade: "Escalade",
    natation: "Natation",
    equitation: "Équitation",
    tir_a_larc: "Tir à l’arc",
    combat_a_mains_nues: "Combat à mains nues",
    escrime: "Escrime",
    tir_armes_a_feu: "Tir (armes à feu)",
    conduite_vehicule: "Conduite (véhicule)",
    pilotage_aeronef: "Pilotage (aéronef)",
    acrobaties: "Acrobaties",
    escamotage: "Escamotage",
    entrainement_physique: "Entraînement Physique",
    // Misc
    premiers_soins: "Premiers Soins",
    guerison: "Guérison",
    alchimie: "Alchimie",
    jonglerie: "Jonglerie",
    crochetage: "Crochetage",
};


const App: React.FC = () => {
  const [player, setPlayer] = useState<Player>(initialPlayer);
  const [messages, setMessages] = useState<Message[]>([{ text: "Bienvenue dans Life.py: Le RPG React. Que ferez-vous ?", sender: 'system', typewriter: true }]);
  const [view, setView] = useState<GameView>('main');
  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playerInput, setPlayerInput] = useState('');


  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  const addMessage = useCallback((text: string, sender: Message['sender'], typewriter = false) => {
    setMessages(prev => [...prev, { text, sender, typewriter }]);
  }, []);
  
  const gainXp = useCallback((amount: number) => {
    setPlayer(p => {
      let newXp = p.xp + amount;
      let newLevel = p.level;
      let newXpMax = p.xpMax;
      let newMaxHp = p.maxHp;
      let newAttack = p.attack;
      let newHp = p.hp;

      while (newXp >= newXpMax) {
        newXp -= newXpMax;
        newLevel++;
        newMaxHp += 10;
        newHp = newMaxHp;
        newAttack += 2;
        newXpMax = Math.floor(newXpMax * 1.2);
        addMessage(`NIVEAU SUPÉRIEUR ! Vous êtes maintenant niveau ${newLevel} !`, 'system');
      }
      return { ...p, xp: newXp, level: newLevel, xpMax: newXpMax, maxHp: newMaxHp, attack: newAttack, hp: newHp };
    });
     addMessage(`Vous avez gagné ${amount} XP.`, 'system');
  }, [addMessage]);


  const startCombat = useCallback(() => {
    const enemyName = ["Bandit", "Gangster", "Voleur", "Flic Corrompu"][Math.floor(Math.random() * 4)];
    const enemyLevel = Math.max(1, player.level + Math.floor(Math.random() * 3) - 1);
    const newEnemy: Enemy = {
      name: enemyName,
      level: enemyLevel,
      maxHp: 20 + enemyLevel * 5,
      hp: 20 + enemyLevel * 5,
      attack: 5 + enemyLevel * 2,
      rewardMoney: enemyLevel * 20,
      rewardXp: enemyLevel * 50
    };
    setEnemy(newEnemy);
    setView('combat');
    addMessage(`Un(e) ${enemyName} sauvage (Niv ${enemyLevel}) apparaît !`, 'combat');
  }, [player.level, addMessage]);
  
  const handleAiAction = useCallback(async () => {
        setIsLoading(true);
        addMessage("Analyse de l'environnement...", 'player');
        const prompt = `Tu es le Maître du Jeu pour un RPG moderne. Décris la scène actuelle pour un joueur à ${player.currentCity}, ${player.country}. Il est ${player.time.hour}:00, par temps ${player.weather} en ${player.season}. Reste bref (moins de 50 mots), avec une ambiance sombre et immersive.`;
        try {
            const description = await generateDynamicDescription(prompt);
            addMessage(description, 'ai', true);
        } catch (error) {
            addMessage("Erreur lors de la récupération de la description de l'IA.", 'system');
        } finally {
            setIsLoading(false);
        }
    }, [player.currentCity, player.country, player.time.hour, player.weather, player.season, addMessage]);

  const handlePlayerSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!playerInput.trim() || isLoading) return;

      setIsLoading(true);
      addMessage(playerInput, 'player');
      
      const currentInput = playerInput;
      setPlayerInput(''); 

      const prompt = `Tu es le Maître du Jeu pour un RPG textuel moderne. Le joueur, nommé ${player.name}, se trouve à ${player.currentCity}, ${player.country}. Il est ${player.time.hour}:00, par temps ${player.weather}. Le joueur te dit : "${currentInput}". Réponds de manière immersive, concise et en tant que Maître du Jeu. Tu peux décrire le résultat de son action, faire parler un PNJ, ou décrire une évolution de la situation.`;

      try {
        const description = await generateDynamicDescription(prompt);
        addMessage(description, 'ai', true);
      } catch (error) {
        addMessage("L'IA semble confuse par votre demande. Une étrange interférence perturbe la communication.", 'system');
      } finally {
        setIsLoading(false);
      }
    };


  const handleAction = useCallback((action: string, payload?: any) => {
    switch (action) {
      case 'setView':
        setView(payload);
        break;
      case 'addMessage':
        addMessage(payload.text, payload.sender);
        break;
      case 'startCombat':
        startCombat();
        break;
       case 'aiAction':
        handleAiAction();
        break;
      case 'work':
        const { job, categoryName } = payload;
        addMessage(`Vous avez travaillé comme ${job.nom} dans la catégorie ${categoryName}.`, 'system');
        setPlayer(p => ({...p, money: p.money + job.salaire}));
        gainXp(job.xp);
        break;
      case 'combat:attack':
        if (!enemy) return;
        const playerDamage = Math.max(1, player.attack + Math.floor(Math.random() * 5) - 2);
        const newEnemyHp = Math.max(0, enemy.hp - playerDamage);
        addMessage(`Vous attaquez ${enemy.name} et infligez ${playerDamage} dégâts.`, 'combat');

        if (newEnemyHp <= 0) {
            addMessage(`Vous avez vaincu ${enemy.name} !`, 'combat');
            setPlayer(p => ({ ...p, money: p.money + enemy.rewardMoney }));
            gainXp(enemy.rewardXp);
            setEnemy(null);
            setView('main');
        } else {
            setEnemy(e => e ? ({ ...e, hp: newEnemyHp }) : null);
            const enemyDamage = Math.max(1, enemy.attack + Math.floor(Math.random() * 5) - 2);
            const newPlayerHp = Math.max(0, player.hp - enemyDamage);
            addMessage(`${enemy.name} vous attaque et inflige ${enemyDamage} dégâts.`, 'combat');
            if (newPlayerHp <= 0) {
                addMessage('Vous avez été vaincu(e)...', 'combat');
                setPlayer(initialPlayer); // Reset on defeat
                setEnemy(null);
                setView('main');
            } else {
                setPlayer(p => ({ ...p, hp: newPlayerHp }));
            }
        }
        break;
    }
  }, [player, enemy, addMessage, startCombat, gainXp, handleAiAction]);

  const renderView = () => {
    switch (view) {
      case 'inventory':
        return <InventoryView player={player} setPlayer={setPlayer} setView={setView} />;
      case 'combat':
        return <CombatView player={player} enemy={enemy} handleAction={handleAction} />;
      case 'shopHub':
        return <ShopHubView setView={setView} />;
      case 'shop':
        return <ShopView player={player} setPlayer={setPlayer} setView={setView} addMessage={addMessage} />;
      case 'grocery':
        return <GroceryView player={player} setPlayer={setPlayer} setView={setView} addMessage={addMessage} />;
      case 'job':
        return <JobView handleAction={handleAction} />;
       case 'travel':
        return <TravelView player={player} setPlayer={setPlayer} setView={setView} addMessage={addMessage} />;
      case 'stats':
        return <StatsView player={player} setView={setView} />;
      case 'skills':
        return <SkillsView player={player} setView={setView} />;
      case 'saveLoad':
        return <SaveLoadView player={player} setPlayer={setPlayer} setView={setView} addMessage={addMessage} />;
      default:
        return <MainView 
            handleAction={handleAction} 
            isLoading={isLoading} 
            playerInput={playerInput}
            setPlayerInput={setPlayerInput}
            handlePlayerSubmit={handlePlayerSubmit}
        />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-2 md:p-4 max-w-5xl mx-auto">
      <header className="border-2 border-green-500 p-2 mb-4 font-display text-lg">
        <div className="flex justify-between items-center flex-wrap gap-2">
            <span>{player.name} // Niv: {player.level}</span>
            <span>{player.currentCity}, {player.country}</span>
            <span>{`${String(player.time.hour).padStart(2, '0')}:00 // Jour ${player.time.day}`}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
            <div>HP: {player.hp}/{player.maxHp}</div>
            <div>XP: {player.xp}/{player.xpMax}</div>
            <div>$ Liquide: {player.money}</div>
            <div>$ Banque: {player.bankMoney}</div>
        </div>
         <div className="w-full bg-gray-700 h-2 mt-2 border border-green-800">
            <div className="bg-green-400 h-full" style={{ width: `${(player.xp / player.xpMax) * 100}%` }}></div>
        </div>
      </header>

      <main className="flex-grow flex flex-col border-2 border-green-500 min-h-0">
        <div className="bg-black bg-opacity-50 p-4 flex-grow overflow-y-auto h-96">
            {messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === 'player' ? 'text-cyan-400' : ''} ${msg.sender === 'ai' ? 'text-yellow-300 italic' : ''}  ${msg.sender === 'combat' ? 'text-red-400' : ''}`}>
                   <span className='font-bold'>{msg.sender.toUpperCase()}: </span>
                   {msg.typewriter ? <TypewriterText text={msg.text} /> : msg.text}
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
        <div className="border-t-2 border-green-500 p-2 bg-gray-800">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

// --- VUES ---

const MainView: React.FC<{ 
    handleAction: (action: string, payload?: any) => void; 
    isLoading: boolean;
    playerInput: string;
    setPlayerInput: (input: string) => void;
    handlePlayerSubmit: (e: React.FormEvent) => void;
}> = ({ handleAction, isLoading, playerInput, setPlayerInput, handlePlayerSubmit }) => (
  <div>
    <div className="grid grid-cols-3 gap-2 mb-4">
        <button onClick={() => handleAction('aiAction')} disabled={isLoading} className="border p-2 hover:bg-green-700 disabled:bg-gray-600 disabled:text-gray-400">{isLoading ? 'Réflexion...' : 'Scanner'}</button>
        <button onClick={() => handleAction('setView', 'inventory')} className="border p-2 hover:bg-green-700">Inventaire</button>
        <button onClick={() => handleAction('setView', 'stats')} className="border p-2 hover:bg-green-700">Stats</button>
        <button onClick={() => handleAction('setView', 'skills')} className="border p-2 hover:bg-green-700">Compétences</button>
        <button onClick={() => handleAction('setView', 'job')} className="border p-2 hover:bg-green-700">Travail</button>
        <button onClick={() => handleAction('setView', 'shopHub')} className="border p-2 hover:bg-green-700">Magasins</button>
        <button onClick={() => handleAction('setView', 'travel')} className="border p-2 hover:bg-green-700">Voyager</button>
        <button onClick={() => handleAction('startCombat')} className="border p-2 hover:bg-green-700">Combat</button>
        <button onClick={() => handleAction('setView', 'saveLoad')} className="border p-2 hover:bg-green-700">Sauvegarder</button>
    </div>
    <form onSubmit={handlePlayerSubmit} className="flex gap-2">
        <input
            type="text"
            value={playerInput}
            onChange={(e) => setPlayerInput(e.target.value)}
            className="flex-grow bg-gray-900 border border-green-500 p-2 focus:outline-none focus:ring-1 focus:ring-green-300 text-green-300 placeholder-green-700"
            placeholder="Que faites-vous ?"
            disabled={isLoading}
            aria-label="Action input"
        />
        <button type="submit" disabled={isLoading || !playerInput.trim()} className="border p-2 hover:bg-green-700 disabled:bg-gray-600 disabled:text-gray-400">
            Envoyer
        </button>
    </form>
  </div>
);

const InventoryView: React.FC<{ player: Player, setPlayer: React.Dispatch<React.SetStateAction<Player>>, setView: (view: GameView) => void }> = ({ player, setPlayer, setView }) => {
    const countedInventory: Record<string, number> = player.inventory.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div>
            <h2 className="font-display text-xl mb-2">Inventaire</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {Object.entries(countedInventory).map(([item, count]) => (
                    <div key={item} className="border border-green-700 p-2 flex items-center">
                        <span className="text-2xl mr-2">{ITEM_ICONS[item] || ITEM_ICONS.default}</span>
                        <span>{item} (x{count})</span>
                    </div>
                ))}
            </div>
            <button onClick={() => setView('main')} className="border p-2 mt-4 hover:bg-green-700">Fermer</button>
        </div>
    );
};

const CombatView: React.FC<{ player: Player, enemy: Enemy | null, handleAction: (action: string, payload?: any) => void }> = ({ player, enemy, handleAction }) => (
  <div>
    <h2 className="font-display text-xl mb-2 text-red-500">COMBAT</h2>
    {enemy && (
        <div>
            <p>{enemy.name} (Niv {enemy.level}) - HP: {enemy.hp}/{enemy.maxHp}</p>
        </div>
    )}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        <button onClick={() => handleAction('combat:attack')} className="border p-2 hover:bg-red-700">Attaquer</button>
        <button className="border p-2 hover:bg-yellow-700 disabled:opacity-50" disabled>Défendre</button>
        <button className="border p-2 hover:bg-blue-700 disabled:opacity-50" disabled>Objet</button>
        <button onClick={() => handleAction('setView', 'main')} className="border p-2 hover:bg-gray-700">Fuir</button>
    </div>
  </div>
);

const ShopHubView: React.FC<{ setView: (view: GameView) => void }> = ({ setView }) => {
    return (
        <div>
            <h2 className="font-display text-xl mb-4">Magasins</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <button onClick={() => setView('shop')} className="border p-4 text-left hover:bg-green-800">
                    <h3 className="font-bold text-lg">Magasin d'Électronique</h3>
                    <p className="text-sm text-gray-400">Pour tous vos besoins en gadgets et en technologie.</p>
                </button>
                 <button onClick={() => setView('grocery')} className="border p-4 text-left hover:bg-green-800">
                    <h3 className="font-bold text-lg">Épicerie</h3>
                    <p className="text-sm text-gray-400">Achetez de la nourriture pour reprendre des forces.</p>
                </button>
            </div>
            <button onClick={() => setView('main')} className="border p-2 mt-4 hover:bg-green-700">Retour</button>
        </div>
    );
};

const GroceryView: React.FC<{ player: Player, setPlayer: React.Dispatch<React.SetStateAction<Player>>, setView: (view: GameView) => void, addMessage: (text: string, sender: Message['sender']) => void }> = ({ player, setPlayer, setView, addMessage }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const getFoodPrice = (item: string): number => {
        return (item.length % 10) + 5;
    };

    const buyItem = (item: string, price: number) => {
        if (player.money >= price) {
            setPlayer(p => ({
                ...p,
                money: p.money - price,
                inventory: [...p.inventory, item]
            }));
            addMessage(`Vous avez acheté ${item} pour ${price}$.`, 'system');
        } else {
            addMessage(`Pas assez d'argent pour acheter ${item}.`, 'system');
        }
    };

    if (selectedCategory) {
        const items = GROCERY_STOCK[selectedCategory] || [];
        return (
            <div>
                <h2 className="font-display text-xl mb-2">Épicerie - {selectedCategory}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-2">
                    {items.map(item => {
                        const price = getFoodPrice(item);
                        return (
                            <button key={item} onClick={() => buyItem(item, price)} className="border p-2 text-left hover:bg-green-800 flex items-center">
                                <span className="text-xl mr-2">{ITEM_ICONS[item] || ITEM_ICONS.default}</span>
                                <div>
                                    {item}
                                    <br />
                                    <span className="text-yellow-400">${price}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
                <button onClick={() => setSelectedCategory(null)} className="border p-2 mt-4 hover:bg-yellow-700">Retour aux catégories</button>
                 <button onClick={() => setView('shopHub')} className="border p-2 mt-4 ml-2 hover:bg-green-700">Retour aux magasins</button>
            </div>
        );
    }

    return (
        <div>
            <h2 className="font-display text-xl mb-2">Épicerie - Catégories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-2">
                {Object.keys(GROCERY_STOCK).map(category => (
                    <button key={category} onClick={() => setSelectedCategory(category)} className="border p-2 text-left hover:bg-green-800">
                        {category}
                    </button>
                ))}
            </div>
            <button onClick={() => setView('shopHub')} className="border p-2 mt-4 hover:bg-green-700">Retour aux magasins</button>
        </div>
    );
};


const ShopView: React.FC<{ player: Player, setPlayer: React.Dispatch<React.SetStateAction<Player>>, setView: (view: GameView) => void, addMessage: (text: string, sender: Message['sender']) => void }> = ({ player, setPlayer, setView, addMessage }) => {
    const buyItem = (item: string, price: number) => {
        if (player.money >= price) {
            setPlayer(p => ({
                ...p,
                money: p.money - price,
                inventory: [...p.inventory, item]
            }));
            addMessage(`Vous avez acheté ${item} pour ${price}$.`, 'system');
        } else {
            addMessage(`Pas assez d'argent pour acheter ${item}.`, 'system');
        }
    };

    return (
        <div>
            <h2 className="font-display text-xl mb-2">Magasin d'Électronique</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {Object.entries(ELECTRO_STOCK.PC).map(([item, price]) => (
                    <button key={item} onClick={() => buyItem(item, price)} className="border p-2 text-left hover:bg-green-800">
                        {item} <span className="text-yellow-400">${price}</span>
                    </button>
                ))}
                 {Object.entries(ELECTRO_STOCK.Consoles).map(([item, price]) => (
                    <button key={item} onClick={() => buyItem(item, price)} className="border p-2 text-left hover:bg-green-800">
                        {item} <span className="text-yellow-400">${price}</span>
                    </button>
                ))}
            </div>
             <button onClick={() => setView('shopHub')} className="border p-2 mt-4 hover:bg-green-700">Retour aux magasins</button>
        </div>
    );
};

const JobView: React.FC<{ handleAction: (action: string, payload?: any) => void; }> = ({ handleAction }) => {
    return (
        <div>
            <h2 className="font-display text-xl mb-2">Tableau des Emplois</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {Object.entries(JOBS).map(([categoryName, categoryJobs]) =>
                    Object.values(categoryJobs).map((job: JobData) => (
                        <button key={job.nom} onClick={() => handleAction('work', { job, categoryName })} className="border p-2 text-left hover:bg-green-800">
                            {job.nom} <span className="text-yellow-400">${job.salaire}</span> | <span className="text-blue-400">{job.xp} XP</span>
                        </button>
                    ))
                )}
            </div>
            <button onClick={() => handleAction('setView', 'main')} className="border p-2 mt-4 hover:bg-green-700">Retour</button>
        </div>
    );
};

const TravelView: React.FC<{ player: Player, setPlayer: React.Dispatch<React.SetStateAction<Player>>, setView: (view: GameView) => void, addMessage: (text: string, sender: Message['sender']) => void }> = ({ player, setPlayer, setView, addMessage }) => {
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [selectedMajorCity, setSelectedMajorCity] = useState<string | null>(null);

    const travelTo = (country: string, city: string) => {
        if (player.currentCity === city && player.country === country) {
            addMessage(`Vous êtes déjà à ${city}.`, 'system');
            return;
        }
        const cost = 100; // Coût fixe pour le voyage
        if (player.money >= cost) {
            setPlayer(p => ({
                ...p,
                money: p.money - cost,
                currentCity: city,
                country: country
            }));
            addMessage(`Vous avez payé ${cost}$ et voyagé à ${city}, ${country}.`, 'system');
            setView('main');
        } else {
            addMessage(`Vous avez besoin de ${cost}$ pour voyager.`, 'system');
        }
    };

    const renderContent = () => {
        // Étape 3: Afficher les villes secondaires
        if (selectedCountry && selectedMajorCity) {
            const countryData = COUNTRIES[selectedCountry];
            const subCities = countryData.Villes[selectedMajorCity] || [];
            return (
                <div>
                    <h3 className="font-bold text-lg mb-2">Destination à/autour de {selectedMajorCity}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                        <button onClick={() => travelTo(selectedCountry, selectedMajorCity)} className="block w-full text-left p-1 hover:bg-green-800">
                            - {selectedMajorCity} (Centre)
                        </button>
                        {subCities.map(city => (
                            <button key={city} onClick={() => travelTo(selectedCountry, city)} className="block w-full text-left p-1 hover:bg-green-800">
                               - {city}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setSelectedMajorCity(null)} className="border p-2 mt-4 hover:bg-yellow-700">Retour aux grandes villes</button>
                </div>
            );
        }
        
        // Étape 2: Afficher les grandes villes du pays sélectionné
        if (selectedCountry) {
            const countryData = COUNTRIES[selectedCountry];
            return (
                <div>
                    <h3 className="font-bold text-lg mb-2">Grandes villes en {selectedCountry}</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                        {countryData["Grandes Villes"].map(city => (
                            <button key={city} onClick={() => setSelectedMajorCity(city)} className="block w-full text-left p-1 hover:bg-green-800">
                               - {city}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setSelectedCountry(null)} className="border p-2 mt-4 hover:bg-yellow-700">Retour aux pays</button>
                </div>
            );
        }

        // Étape 1: Afficher la liste des pays
        return (
            <div>
                 <h3 className="font-bold text-lg mb-2">Choisissez un pays</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                    {Object.keys(COUNTRIES).map(country => (
                        <button key={country} onClick={() => setSelectedCountry(country)} className="block w-full text-left p-1 hover:bg-green-800">
                           - {country}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <h2 className="font-display text-xl mb-2">Agence de Voyage (Tarif: 100$)</h2>
            {renderContent()}
            <button onClick={() => setView('main')} className="border p-2 mt-4 hover:bg-green-700">Annuler le Voyage</button>
        </div>
    );
};

const StatsView: React.FC<{ player: Player, setView: (view: GameView) => void }> = ({ player, setView }) => {
    return (
        <div>
            <h2 className="font-display text-xl mb-4">Statistiques du Joueur</h2>
            <div className="max-h-48 overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 ">
                    {/* General Stats */}
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg text-green-300 border-b border-green-700 mb-2">Général</h3>
                        <p><strong>Nom:</strong> {player.name}</p>
                        <p><strong>Niveau:</strong> {player.level}</p>
                        <p><strong>HP:</strong> {player.hp} / {player.maxHp}</p>
                        <p><strong>Attaque:</strong> {player.attack}</p>
                        <p><strong>XP:</strong> {player.xp} / {player.xpMax}</p>
                        <p><strong>Argent Liquide:</strong> ${player.money}</p>
                        <p><strong>Compte en Banque:</strong> ${player.bankMoney}</p>
                    </div>

                    {/* Equipment Stats */}
                    <div className="space-y-1">
                        <h3 className="font-bold text-lg text-green-300 border-b border-green-700 mb-2">Équipement</h3>
                        <p><strong>Arme(s):</strong> {player.equippedWeapons.length > 0 ? player.equippedWeapons.join(', ') : 'Vide'}</p>
                        <div>
                            <p className="font-bold">Armure:</p>
                            <ul className="list-disc list-inside pl-2 text-sm">
                                {Object.entries(player.equippedArmor).map(([slot, item]) => (
                                    <li key={slot}><strong>{slot}:</strong> {item || 'Vide'}</li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <p className="font-bold">Accessoires:</p>
                            <ul className="list-disc list-inside pl-2 text-sm">
                                 {Object.entries(player.equippedMagic).map(([slot, item]) => (
                                    <li key={slot}><strong>{slot}:</strong> {item || 'Vide'}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Attributes */}
                <div className="mt-4">
                    <h3 className="font-bold text-lg text-green-300 border-b border-green-700 mb-2">Attributs</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-1">
                        <p><strong>Force:</strong> {player.stats.force}</p>
                        <p><strong>Intelligence:</strong> {player.stats.intelligence}</p>
                        <p><strong>Charisme:</strong> {player.stats.charisme}</p>
                        <p><strong>Dextérité:</strong> {player.stats.dexterite}</p>
                        <p><strong>Constitution:</strong> {player.stats.constitution}</p>
                        <p><strong>Sagesse:</strong> {player.stats.sagesse}</p>
                        <p><strong>Chance:</strong> {player.stats.chance}</p>
                    </div>
                </div>
            </div>
            <button onClick={() => setView('main')} className="border p-2 mt-4 hover:bg-green-700">Retour</button>
        </div>
    );
};

const SkillsView: React.FC<{ player: Player, setView: (view: GameView) => void }> = ({ player, setView }) => {
    return (
        <div>
            <h2 className="font-display text-xl mb-4">Compétences du Joueur</h2>
            <div className="max-h-64 overflow-y-auto pr-2">
                {Object.entries(player.skills).map(([category, skills]) => (
                    <div key={category} className="mb-4">
                        <h3 className="font-bold text-lg text-green-300 border-b border-green-700 mb-2">
                            {SKILL_CATEGORY_NAMES[category as keyof Skills]}
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2">
                            {Object.entries(skills).map(([skillName, skillData]) => (
                                <div key={skillName}>
                                    <p><strong>{SKILL_NAMES[skillName] || skillName}:</strong> Niv {skillData.level}</p>
                                    <div className="w-full bg-gray-700 h-2 border border-green-800">
                                        <div className="bg-cyan-400 h-full" style={{ width: `${(skillData.xp / skillData.xpMax) * 100}%` }}></div>
                                    </div>
                                    <p className="text-xs text-gray-400">{skillData.xp} / {skillData.xpMax} XP</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => setView('main')} className="border p-2 mt-4 hover:bg-green-700">Retour</button>
        </div>
    );
};


const SaveLoadView: React.FC<{ player: Player, setPlayer: React.Dispatch<React.SetStateAction<Player>>, setView: (view: GameView) => void, addMessage: (text: string, sender: Message['sender']) => void }> = ({ player, setPlayer, setView, addMessage }) => {
    const SAVE_KEY_PREFIX = 'lifeRPG.save.';
    const [saveSlots, setSaveSlots] = useState<(SaveSlot | null)[]>(new Array(5).fill(null));
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadSlotsFromLocalStorage = useCallback(() => {
        const loadedSlots = [];
        for (let i = 0; i < 5; i++) {
            try {
                const savedData = localStorage.getItem(`${SAVE_KEY_PREFIX}${i}`);
                if (savedData) {
                    const parsedData = JSON.parse(savedData) as SaveSlot;
                    // Basic validation
                    if (parsedData.timestamp && parsedData.player && parsedData.player.name) {
                        loadedSlots.push(parsedData);
                    } else {
                        loadedSlots.push(null);
                    }
                } else {
                    loadedSlots.push(null);
                }
            } catch (error) {
                console.error(`Erreur de chargement du slot ${i}:`, error);
                loadedSlots.push(null);
                 localStorage.removeItem(`${SAVE_KEY_PREFIX}${i}`);
            }
        }
        setSaveSlots(loadedSlots);
    }, []);

    useEffect(() => {
        loadSlotsFromLocalStorage();
    }, [loadSlotsFromLocalStorage]);

    const handleSave = (slotIndex: number) => {
        try {
            const newSave: SaveSlot = {
                timestamp: Date.now(),
                player: player
            };
            localStorage.setItem(`${SAVE_KEY_PREFIX}${slotIndex}`, JSON.stringify(newSave));
            loadSlotsFromLocalStorage();
            addMessage(`Partie sauvegardée dans l'emplacement ${slotIndex + 1}.`, 'system');
        } catch (error) {
            addMessage(`Erreur lors de la sauvegarde: ${error instanceof Error ? error.message : 'Erreur inconnue'}`, 'system');
        }
    };

    const handleLoad = (slotIndex: number) => {
        const slotData = saveSlots[slotIndex];
        if (slotData) {
            // Hydrate player data to ensure compatibility with old saves.
            // This merges the loaded data with defaults from initialPlayer.
            const hydratedPlayer: Player = {
                ...initialPlayer,
                ...slotData.player,
                // Deep merge nested objects to ensure all their properties exist.
                stats: { ...initialPlayer.stats, ...(slotData.player.stats || {}) },
                 skills: {
                    intellectual: { ...initialPlayer.skills.intellectual, ...(slotData.player.skills?.intellectual || {}) },
                    artistic: { ...initialPlayer.skills.artistic, ...(slotData.player.skills?.artistic || {}) },
                    musical: { ...initialPlayer.skills.musical, ...(slotData.player.skills?.musical || {}) },
                    manual: { ...initialPlayer.skills.manual, ...(slotData.player.skills?.manual || {}) },
                    social: { ...initialPlayer.skills.social, ...(slotData.player.skills?.social || {}) },
                    physical: { ...initialPlayer.skills.physical, ...(slotData.player.skills?.physical || {}) },
                    misc: { ...initialPlayer.skills.misc, ...(slotData.player.skills?.misc || {}) },
                },
                time: { ...initialPlayer.time, ...(slotData.player.time || {}) },
                equippedArmor: { ...initialPlayer.equippedArmor, ...(slotData.player.equippedArmor || {}) },
                equippedMagic: { ...initialPlayer.equippedMagic, ...(slotData.player.equippedMagic || {}) },
            };
            setPlayer(hydratedPlayer);
            addMessage(`Partie chargée depuis l'emplacement ${slotIndex + 1}.`, 'system');
            setView('main');
        } else {
            addMessage("Cet emplacement de sauvegarde est vide.", 'system');
        }
    };

    const handleExport = (slotIndex: number) => {
        const slotData = saveSlots[slotIndex];
        if (slotData) {
            const dataStr = JSON.stringify(slotData, null, 2);
            const dataBlob = new Blob([dataStr], { type: "application/json" });
            const url = URL.createObjectURL(dataBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `lifeRPG_save_slot_${slotIndex + 1}_${new Date(slotData.timestamp).toISOString()}.json`;
            a.click();
            URL.revokeObjectURL(url);
            addMessage(`Sauvegarde de l'emplacement ${slotIndex + 1} exportée.`, 'system');
        }
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== 'string') throw new Error("Impossible de lire le fichier.");
                
                const importedData = JSON.parse(text) as SaveSlot;
                if (!importedData.timestamp || !importedData.player || !importedData.player.name) {
                    throw new Error("Fichier de sauvegarde invalide ou corrompu.");
                }

                const targetSlot = parseInt(prompt(`Dans quel emplacement (1-5) voulez-vous importer cette sauvegarde ?\nFichier: ${file.name}\nSauvegardé le: ${new Date(importedData.timestamp).toLocaleString('fr-FR')}`, "1") || "1", 10) - 1;

                if (isNaN(targetSlot) || targetSlot < 0 || targetSlot > 4) {
                    addMessage("Emplacement d'importation invalide.", "system");
                    return;
                }
                
                if (saveSlots[targetSlot] && !window.confirm(`L'emplacement ${targetSlot + 1} contient déjà une sauvegarde. Voulez-vous l'écraser ?`)) {
                    addMessage("Importation annulée.", "system");
                    return;
                }

                localStorage.setItem(`${SAVE_KEY_PREFIX}${targetSlot}`, JSON.stringify(importedData));
                loadSlotsFromLocalStorage();
                addMessage(`Sauvegarde importée avec succès dans l'emplacement ${targetSlot + 1}.`, 'system');

            } catch (error) {
                addMessage(`Erreur d'importation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`, 'system');
            } finally {
                if(fileInputRef.current) fileInputRef.current.value = "";
            }
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <h2 className="font-display text-xl mb-4">Sauvegarder / Charger une Partie</h2>
            <div className="space-y-2 mb-4">
                {saveSlots.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between gap-2 p-2 border border-green-700">
                        <div className="flex-grow">
                            <p className="font-bold">Emplacement {index + 1}</p>
                            <p className="text-sm text-gray-400">{slot ? new Date(slot.timestamp).toLocaleString('fr-FR') : 'Vide'}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => handleSave(index)} className="border text-sm p-1 hover:bg-green-700">Sauver</button>
                            <button onClick={() => handleLoad(index)} disabled={!slot} className="border text-sm p-1 hover:bg-blue-700 disabled:opacity-50">Charger</button>
                            <button onClick={() => handleExport(index)} disabled={!slot} className="border text-sm p-1 hover:bg-yellow-700 disabled:opacity-50">Exporter</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 border-t-2 border-green-500 pt-4">
                 <input type="file" id="import-file" accept=".json" onChange={handleImport} className="hidden" ref={fileInputRef} />
                 <button onClick={() => fileInputRef.current?.click()} className="border p-2 hover:bg-purple-700">Importer une Sauvegarde...</button>
                 <button onClick={() => setView('main')} className="border p-2 hover:bg-green-700">Retour</button>
            </div>
        </div>
    );
};

export default App;
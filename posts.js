// The catalog: every post on the site lives in this one file.
// The home page, "Latest" section, fandom cards and Browse search all read from here.
// Released posts have a date and a url. Planned posts have soon: true instead.

window.SITE = {
  types: ["Subclass", "Adventure", "Setting", "Optional Rules", "Magic Item", "Spell", "Monster"],

  classes: ["Artificer", "Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin",
            "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"],

  // planned = how many subclasses are in the queue for this fandom (the big gold number).
  // The card shows whichever is higher: planned, or the subclasses actually listed below.
  fandoms: [
    { name: "Hollow Knight & Silksong",    planned: 16, blurb: "Soul, silk, charms, and crests, one for every class" },
    { name: "Destiny",                     planned: 15, blurb: "Light-wielding Guardians" },
    { name: "Final Fantasy",               planned: 15, blurb: "Classic jobs, reforged for the 2024 rules" },
    { name: "Elden Ring",                  planned: 2,  blurb: "Knights and hunters of the Lands Between" },
    { name: "Dishonored",                  planned: 6,  blurb: "The Outsider's marked and the Empire's inventors" },
    { name: "Book & Anime",                planned: 2,  blurb: "Soulstamp forgers and sworn slayers" },
    { name: "Standalones",                 planned: 3,  blurb: "Grid-runners, portal-throwers, and legendary arcanists" }
  ],

  posts: [
    // ---- Released ----
    {
      title: "Warrior of the Void",
      type: "Subclass",
      class: "Monk",
      fandom: "Hollow Knight & Silksong",
      inspired: "Hollow Knight",
      date: "2026-10-15",
      version: "Release 1 · v0.1 Playtest",
      url: "warrior-of-the-void.html",
      image: "",
      summary: "A silent warrior who tears Soul from enemies with every nail strike, then spends it to heal or to unleash screaming spirits, with charms that change how you fight and hidden resonances to discover."
    },

    // ---- Launch set (released together; same-day posts appear on the home page in this order) ----
    { title: "Silk Hunter",          type: "Subclass", class: "Ranger",    fandom: "Hollow Knight & Silksong", inspired: "Hornet Silksong crests Bind needle", date: "2026-10-22", version: "v0.1 Playtest", url: "silk-hunter.html", image: "",
      summary: "A swift hunter who fights with a thread-bound needle, weaves Silk from every strike, crafts deadly tools, and changes her whole fighting style by the crest she wears." },
    { title: "Voidwalker",           type: "Subclass", class: "Wizard",    fandom: "Destiny", guide: "destiny-overview.html", inspired: "Destiny 2 Warlock Void Nova Bomb Nova Warp Devour", date: "2026-10-22", version: "v0.1 Playtest", url: "voidwalker.html", image: "",
      summary: "A glass cannon who survives by consuming enemies: a lingering Vortex Grenade, a life-draining melee cantrip, and Nova Bomb or Nova Warp." },
    { title: "Oath of the Wyrmguard", type: "Subclass", class: "Paladin",  fandom: "Final Fantasy", inspired: "Dragoon Final Fantasy Tactics FFT FFTA lance wyvern jump", date: "2026-10-22", version: "v0.1 Playtest", url: "oath-of-the-wyrmguard.html", image: "",
      summary: "The Dragoon reimagined: dragon-bonded knights who leap into battle on wyvern-back, and the order's executioners when one of their own falls to corruption." },
    { title: "The Outsider",         type: "Subclass", class: "Warlock",   fandom: "Dishonored", inspired: "Outsider patron Corvo Emily Daud Billie Blink Bend Time", date: "2026-10-22", version: "v0.1 Playtest", url: "the-outsider.html", image: "",
      summary: "A bored god in a pale suit marks you. Blink, see through walls, stop time, and build Corvo, Emily, Daud, or Billie through invocations." },
    { title: "Machinist",            type: "Subclass", class: "Artificer", fandom: "Final Fantasy", inspired: "Final Fantasy FFXIV FFVI Edgar firearms gun", date: "2026-10-22", version: "v0.1 Playtest", url: "machinist.html", image: "",
      summary: "Every shot builds Heat, spent on gadgets or unleashed in a rapid-fire Hypercharge, at the risk of overheating. Build, spend, overheat, repeat." },
    { title: "Striker",              type: "Subclass", class: "Barbarian", fandom: "Destiny", guide: "destiny-overview.html", inspired: "Destiny 2 Titan Arc Fists of Havoc Thundercrash", date: "2026-10-22", version: "v0.1 Playtest", url: "striker.html", image: "",
      summary: "The storm given fists. Close the distance with a Shoulder Charge, hit like a thunderclap, and get faster with every enemy that drops." },
    { title: "Red Magic Sorcery",    type: "Subclass", class: "Sorcerer",  fandom: "Final Fantasy", inspired: "Red Mage Final Fantasy FFTA2 FFXIV rapier Dualcast", date: "2026-10-22", version: "v0.1 Playtest", url: "red-magic-sorcery.html", image: "",
      summary: "The Red Mage: rapier and spell together, fencing in close and leaping back out to cast. Twin spells early, stack Metamagic later, then cast two at once." },
    { title: "Gearwright",           type: "Subclass", class: "Rogue",     fandom: "Dishonored", inspired: "gadgets crossbow sleep dart mines grenades blueprints Daud Corvo Emily", date: "2026-10-22", version: "v0.1 Playtest", url: "gearwright.html", image: "",
      summary: "An underworld inventor with a pocket full of sleep darts, mines, and grenades, plus blueprints and masterwork weapons found in safes and vaults." },
    { title: "Gunslinger",           type: "Subclass", class: "Rogue",     fandom: "Destiny", guide: "destiny-overview.html", inspired: "Destiny 2 Hunter Solar Golden Gun Blade Barrage", date: "2026-10-22", version: "v0.1 Playtest", url: "gunslinger.html", image: "",
      summary: "The Light's sharpshooter: tripmines, fans of Solar knives, and a Golden Bow of three devastating shots." },
    { title: "Energy Drain",         type: "Spell", kindLabel: "Evocation cantrip", class: "Wizard", fandom: "Destiny", inspired: "Voidwalker cantrip Void Force temporary hit points melee spell attack Destiny 2", date: "2026-10-22", version: "v0.1 Playtest", url: "energy-drain.html", image: "",
      summary: "The Voidwalker's life-draining melee cantrip. A touch of Void deals Force damage, and you gain Temporary Hit Points equal to the damage dealt." },

    {
      title: "Destiny Overview & Chassis",
      kindLabel: "Shared subclass rules",
      reference: true, // a rules page, not a release: kept out of the home page's "Latest" section
      type: "Subclass",
      fandom: "Destiny",
      inspired: "Destiny 2 Guardians Light grenade super Rift Barricade Dodge Void Arc Solar Stasis Strand",
      date: "2026-10-22",
      version: "v0.1 Playtest",
      url: "destiny-overview.html",
      image: "",
      summary: "The rules every Destiny subclass shares: grenades, charged melee, Rift, Barricade and Dodge, Supers, and the element keywords from Volatile to Woven Mail."
    },

    {
      title: "Playing a Dishonored-Style Game",
      type: "Optional Rules",
      fandom: "Dishonored",
      reference: true, // a GM guide, not a release: kept out of the home page's "Latest" section
      inspired: "GM guide stealth infiltration map guards patrols mission turns timeline alarm",
      date: "2026-10-22",
      version: "v0.1 Playtest",
      url: "dishonored-style-game.html",
      image: "",
      summary: "GM guidance for planning-heavy stealth: a map with hidden routes, guards tracked by facing, mission turns with a ticking timeline, and frantic alarms when things go wrong."
    },

    // ---- Coming soon: Hollow Knight & Silksong ----
    // "inspired" isn't shown on cards, but search matches it (e.g. "hornet" finds Silk Hunter).
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Ranger",    inspired: "Garmond Zaza Silksong",           title: "Wandering Rider",                 summary: "A clever bug-steed, trampling charges, and a booming battle cry." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Bard",      inspired: "Grimm Troupe Grimmchild",         title: "College of the Nightmare Troupe", summary: "A growing flame-child and a final choice: continue the Ritual or banish the Troupe." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Fighter",   inspired: "Nailmasters Oro Mato Sheo",       title: "Nailmaster",                      summary: "Plant your feet and unleash charged Nail Arts taught by one of three brothers." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Fighter",   inspired: "Mantis Lords",                    title: "Mantis Lord",                     summary: "Strike from the walls, fight as one with allies, and call the sisters back." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Paladin",   inspired: "Pinstress Silksong",              title: "Oath of the Last Pin",            summary: "The last of a fallen order: thrown pins that carry your smites." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Paladin",   inspired: "Pale King Five Great Knights",    title: "Oath of the Pale Throne",         summary: "The vows of five Great Knights, and a king's terrible creed." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Cleric",    inspired: "Shrine Guardian Seth Silksong",   title: "Shrine Guardian Domain",          summary: "A cymbal shield, a fair warning, and a second phase when bloodied." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Barbarian", inspired: "Hive Knight Hiveblood",           title: "Path of the Hive",                summary: "Rage inside a storm of bees and mend on royal Hiveblood." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Rogue",     inspired: "Shakra Silksong",                 title: "Wayfinder",                       summary: "Returning throwing rings, blink steps, and a cartographer's eye." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Warlock",   inspired: "Radiance Infection",              title: "The Radiance",                    summary: "Spread an orange Infection, dream of what's coming, and grow moth wings." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Wizard",    inspired: "Soul Sanctum Soul Master",        title: "School of the Soul Sanctum",      summary: "Harvest Soul for homing orbs, blink between spells, and pay for hubris." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Druid",     inspired: "Unn Greenpath",                   title: "Circle of Unn",                   summary: "A healing moss-slug form, mosskin ambushes, and a goddess's dream." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Sorcerer",  inspired: "Void Abyss Shade",                title: "Void Sorcery",                    summary: "Tendrils of the Abyss, a shade that cheats death, and a Lord of Shades." },
    { soon: true, type: "Subclass", fandom: "Hollow Knight & Silksong", class: "Artificer", inspired: "Architects Cogwork Silksong",     title: "Cogwork Architect",               summary: "Swarms of cogflies, a Cogwork Sentinel, and the Architect's Melody." },

    // ---- Coming soon: Final Fantasy (playtest drafts) ----
    { soon: true, type: "Subclass", fandom: "Final Fantasy",class: "Barbarian", inspired: "Final Fantasy Tactics A2 FFTA2",        title: "Defender",     summary: "A heavy-armored Rage, an unbreakable Bulwark, and a last-stand Meltdown." },
    { soon: true, type: "Subclass", fandom: "Final Fantasy",class: "Bard",      inspired: "Final Fantasy Tactics A2 FFTA2",        title: "Green Mage",   summary: "A support caster who Amplifies allies, shares wards, and holds two concentration spells at once." },
    { soon: true, type: "Subclass", fandom: "Final Fantasy",class: "Cleric",    inspired: "Final Fantasy",                         title: "Time Mage",    summary: "Bend time itself: Gravity, Quick, and a Time Stop capstone." },
    { soon: true, type: "Subclass", fandom: "Final Fantasy",class: "Druid",     inspired: "Final Fantasy Tactics Advance FFTA",    title: "Elementalist", summary: "Shift between the elements and rise to Elemental Dominion." },
    { soon: true, type: "Subclass", fandom: "Final Fantasy",class: "Fighter",   inspired: "Final Fantasy Tactics A2 FFTA2",        title: "Templar",      summary: "A holy warrior with Rasp, Astra, and Battle Haste." },
    { soon: true, type: "Subclass", fandom: "Final Fantasy",class: "Fighter",   inspired: "Final Fantasy Tactics Advance FFTA",    title: "Fencer",       summary: "A duelist who builds Tempo, strikes with Swallowtail, and finishes with Checkmate." },
    { soon: true, type: "Subclass", fandom: "Final Fantasy",class: "Monk",      inspired: "Final Fantasy Tactics A2 FFTA2 samurai", title: "Parivir",      summary: "A sword-dancer of Wind Slash and Elemental Edge who can Unburden their Soul." },
    { soon: true, type: "Subclass", fandom: "Final Fantasy",class: "Ranger",    inspired: "Final Fantasy Tactics FFT",              title: "Geomancer",    summary: "Terrain-based Geomancy that turns the ground into a weapon, and a Lava Walker's stride." },
    { soon: true, type: "Subclass", fandom: "Final Fantasy",class: "Rogue",     inspired: "Final Fantasy Tactics A2 FFTA2",        title: "Sniper",       summary: "Doubleshot, Vanish, and a Death Sickle that strikes from afar." },
    { soon: true, type: "Subclass", fandom: "Final Fantasy",class: "Warlock",   inspired: "Final Fantasy FFIV FFXIV FFT Cecil",    title: "Dark Knight",  summary: "Fell Sword, The Blackest Night, and the Living Dead." },
    { soon: true, type: "Subclass", fandom: "Final Fantasy",class: "Wizard",    inspired: "Final Fantasy Tactics A2 FFTA2",        title: "Blue Mage",    summary: "Learn monster abilities and grow your own Blue Magic table." },
    { soon: true, type: "Subclass", fandom: "Final Fantasy",class: "Wizard",    inspired: "Final Fantasy FFT FFXIV",               title: "Black Mage",   summary: "Charge Spell, Elemental Rhythm, and the ultimate spell: Ultima." },
    { soon: true, type: "Optional Rules", fandom: "Final Fantasy",inspired: "Final Fantasy Tactics Advance Judges", title: "Clans",    summary: "Rules for clans, rivals, and Judge-refereed engagements." },

    // ---- Coming soon: Elden Ring (playtest drafts) ----
    { soon: true, type: "Subclass", fandom: "Elden Ring", class: "Ranger", inspired: "Elden Ring Bloodhound Knight Darriwil claws greatsword", title: "Bloodhound Knight", summary: "A relentless hunter who blinks to their quarry, builds Blood Loss with every hit, and bursts it in a spray of necrotic damage. Fight with a curved greatsword or the new Bloodhound Claws." },

    { soon: true, type: "Subclass", fandom: "Elden Ring", class: "Paladin", inspired: "Elden Ring Crucible Knight Ordovis shield tail horns wings", title: "Oath of the Crucible", summary: "A shield-and-counter knight of the primeval Crucible. Manifest a sweeping tail, then horns, then wings, and finally a breath of radiant fire." },

    { soon: true, type: "Optional Rules", fandom: "Elden Ring", inspired: "Elden Ring weapon skills loot unique weapons Moonveil Dark Moon Greatsword Blasphemous Blade", title: "Ashes of War", summary: "Magical techniques bound to a weapon or shield. Martial characters find them as loot and gain a limited supply of special moves, plus rules for unique weapons like Moonveil and the Dark Moon Greatsword." },

    // ---- Coming soon: Destiny (playtest drafts) ----
    // guide = the shared rules page, linked from each card and (later) each subclass page.
    { soon: true, type: "Subclass", fandom: "Destiny", class: "Sorcerer",  guide: "destiny-overview.html", inspired: "Destiny 2 Warlock Arc",    title: "Stormcaller",  summary: "A Destiny Warlock of Arc, built on the Sorcerer. Lightning grenades, a Rift, and an Arc Super." },
    { soon: true, type: "Subclass", fandom: "Destiny", class: "Warlock",   guide: "destiny-overview.html", inspired: "Destiny 2 Warlock Solar",  title: "Dawnblade",    summary: "A Destiny Warlock of Solar, built on the Warlock. Fire grenades, a Rift, and a Solar Super." },
    { soon: true, type: "Subclass", fandom: "Destiny", class: "Druid",     guide: "destiny-overview.html", inspired: "Destiny 2 Warlock Stasis", title: "Shadebinder",  summary: "A Destiny Warlock of Stasis, built on the Druid. Cold grenades, a Rift, and a Stasis Super." },
    { soon: true, type: "Subclass", fandom: "Destiny", class: "Bard",      guide: "destiny-overview.html", inspired: "Destiny 2 Warlock Strand", title: "Broodweaver",  summary: "A Destiny Warlock of Strand, built on the Bard. Psychic grenades, a Rift, and a Strand Super." },
    { soon: true, type: "Subclass", fandom: "Destiny", class: "Cleric",    guide: "destiny-overview.html", inspired: "Destiny 2 Titan Solar",    title: "Sunbreaker",   summary: "A Titan of Solar, built on the Cleric. Fire grenades, a Barricade, and a Solar Super." },
    { soon: true, type: "Subclass", fandom: "Destiny", class: "Paladin",   guide: "destiny-overview.html", inspired: "Destiny 2 Titan Void",     title: "Sentinel",     summary: "A Titan of Void, built on the Paladin. Force-damage grenades, a Barricade, and a Void Super." },
    { soon: true, type: "Subclass", fandom: "Destiny", class: "Artificer", guide: "destiny-overview.html", inspired: "Destiny 2 Titan Stasis",   title: "Behemoth",     summary: "A Titan of Stasis, built on the Artificer. Cold grenades, Stasis Crystals, a Barricade, and a Stasis Super." },
    { soon: true, type: "Subclass", fandom: "Destiny", class: "Fighter",   guide: "destiny-overview.html", inspired: "Destiny 2 Titan Strand",   title: "Berserker",    summary: "A Titan of Strand, built on the Fighter. Psychic grenades, a Barricade, and a Strand Super." },
    { soon: true, type: "Subclass", fandom: "Destiny", class: "Monk",      guide: "destiny-overview.html", inspired: "Destiny 2 Hunter Arc",     title: "Arcstrider",   summary: "A Hunter of Arc, built on the Monk. Lightning grenades, Dodge, and an Arc Super." },
    { soon: true, type: "Subclass", fandom: "Destiny", class: "Ranger",    guide: "destiny-overview.html", inspired: "Destiny 2 Hunter Void",    title: "Nightstalker", summary: "A Hunter of Void, built on the Ranger. Force-damage grenades, Dodge, and a Void Super." },
    { soon: true, type: "Subclass", fandom: "Destiny", class: "Rogue",     guide: "destiny-overview.html", inspired: "Destiny 2 Hunter Stasis",  title: "Revenant",     summary: "A Hunter of Stasis, built on the Rogue. Cold grenades, Dodge, and a Stasis Super." },
    { soon: true, type: "Subclass", fandom: "Destiny", class: "Ranger",    guide: "destiny-overview.html", inspired: "Destiny 2 Hunter Strand",  title: "Threadrunner", summary: "A Hunter of Strand, built on the Ranger. Psychic grenades, Dodge, and a Strand Super." },

    // ---- Coming soon: Dishonored ----
    { soon: true, type: "Subclass", fandom: "Dishonored", class: "Paladin",   inspired: "Overseer",                title: "Oath of the Broken Mask", summary: "A disgraced Overseer: an anti-magic zealot with a war hound." },
    { soon: true, type: "Subclass", fandom: "Dishonored", class: "Artificer", title: "Natural Philosopher",   summary: "An inventor who equips the party: elixirs, arc mines, Walls of Light, and a clockwork soldier." },
    { soon: true, type: "Subclass", fandom: "Dishonored", class: "Ranger",    inspired: "Daud",                    title: "Whaler",                summary: "A masked pack assassin with borrowed Void power: Transversal, Chokedust, and contracts." },
    { soon: true, type: "Subclass", fandom: "Dishonored", class: "Paladin",   inspired: "Brigmore witches Delilah", title: "Oath of the Coven",    summary: "A Brigmore witch: gravehounds, briars, bonecarving, and the Painted Shadow." },
    { soon: true, type: "Optional Rules", fandom: "Dishonored", inspired: "high chaos low chaos stealth ghost run",          title: "Chaos Tracker",          summary: "A two-layer meter of how bloody the party's methods are, per mission and across the campaign, and how the world reacts." },
    { soon: true, type: "Optional Rules", fandom: "Dishonored", inspired: "runes bone charms bonecarving shrines Outsider loot Void", title: "Runes & Bone Charms", summary: "Carved whalebone humming with the Void: runes that grant boons, bone charms with strange traits, bonecarving, and sample Outsider shrines." },
    { soon: true, type: "Adventure",      fandom: "Dishonored", inspired: "sample mission stealth heist assassination Pendrake Manor masked gala", title: "The Quiet Gala", summary: "A masked gala at a cliffside manor and a baron who deserves what's coming. Two hours, a hundred witnesses, and no one who knows your face." },

    // ---- Coming soon: Book & Anime ----
    { soon: true, type: "Subclass", fandom: "Book & Anime", class: "Artificer", inspired: "The Emperor's Soul Brandon Sanderson Cosmere novel", title: "Soulstamp Forger", summary: "Soulstamps rewrite an object's past, limited only by plausibility, and Essence Marks shift your role each day." },
    { soon: true, type: "Subclass", fandom: "Book & Anime", class: "Fighter",   inspired: "Goblin Slayer anime manga light novel",               title: "Sworn Slayer",     summary: "Choose a Sworn Foe, spend Preparation Points in flashback for the perfect tool, and unleash a battlefield-scale plan." },

    // ---- Coming soon: Standalones ----
    { soon: true, type: "Subclass", fandom: "Standalones", class: "Artificer", inspired: "Tron",             title: "Gridrunner",        summary: "A disc-throwing engineer who fights with a bonded Identity Disc and conjures hard-light constructs, from racing cycles to towering walls." },
    { soon: true, type: "Subclass", fandom: "Standalones", class: "Rogue",     inspired: "Portal Portal 2",  title: "Test Subject",      summary: "A rogue who wins by being clever: linked portals for impossible angles, gels that change the ground, and enemies' momentum turned against them." },
    { soon: true, type: "Subclass", fandom: "Standalones", class: "Sorcerer",  inspired: "Wizard of Legend", title: "Legendary Sorcery", summary: "A highly mobile caster who blinks around the battlefield, fires spells in rapid succession, and survives by never being where the hit lands." },
    { soon: true, type: "Subclass", fandom: "Standalones", class: "Warlock", inspired: "Shadow of Mordor Shadow of War Middle-earth Talion Celebrimbor wraith patron brand orcs", title: "The Wraith Within", summary: "A patron that shares your body: the spirit of a long-dead lord bound to you at the moment you should have died. Shadow Strike and Brand build Wrath, and the capstone unleashes it all at once." },
    { soon: true, type: "Optional Rules", fandom: "Standalones", inspired: "The Last Spell roguelike Draw Steel", title: "Siege Mode", summary: "A roguelike siege for D&D 2024 and Draw Steel: defend a ruined town for five nights, rebuilding by day and holding off escalating hordes by night." }
  ]
};

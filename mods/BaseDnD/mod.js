(async function () {
  const manifest = JSON.parse(await zip.file("manifest.json").async("string"));

  const zip = window.mods;
  
  if (!zip) throw new Error("currentModZip is not set.");
  if (typeof ModAPI === "undefined") throw new Error("ModAPI is not defined.");

  MOD = {
    id: "dnd"
  }
  function id(str) {
    return MOD.id+":"+str
  }

  ModAPI.registerStat(MOD, { id: id("strength"), name: "Strength" });
  ModAPI.registerStat(MOD, { id: id("dexterity"), name: "Dexterity" });
  ModAPI.registerStat(MOD, { id: id("constitution"), name: "Constitution" });
  ModAPI.registerStat(MOD, { id: id("intelligence"), name: "Intelligence" });
  ModAPI.registerStat(MOD, { id: id("wisdom"), name: "Wisdom" });
  ModAPI.registerStat(MOD, { id: id("charisma"), name: "Charisma" });

  ModAPI.registerSkill(MOD, { id: id("athletics"), name: "Athletics", stat: id("strength") });

  ModAPI.registerSkill(MOD, { id: id("acrobatics"), name: "Acrobatics", stat: id("dexterity") });
  ModAPI.registerSkill(MOD, { id: id("sleight_of_hand"), name: "Sleight of Hand", stat: id("dexterity") });
  ModAPI.registerSkill(MOD, { id: id("stealth"), name: "Stealth", stat: id("dexterity") });

  ModAPI.registerSkill(MOD, { id: id("arcana"), name: "Arcana", stat: id("intelligence") });
  ModAPI.registerSkill(MOD, { id: id("history"), name: "History", stat: id("intelligence") });
  ModAPI.registerSkill(MOD, { id: id("investigation"), name: "Investigation", stat: id("intelligence") });
  ModAPI.registerSkill(MOD, { id: id("nature"), name: "Nature", stat: id("intelligence") });
  ModAPI.registerSkill(MOD, { id: id("religion"), name: "Religion", stat: id("intelligence") });

  ModAPI.registerSkill(MOD, { id: id("animal_handling"), name: "Animal Handling", stat: id("wisdom") });
  ModAPI.registerSkill(MOD, { id: id("insight"), name: "Insight", stat: id("wisdom") });
  ModAPI.registerSkill(MOD, { id: id("medicine"), name: "Medicine", stat: id("wisdom") });
  ModAPI.registerSkill(MOD, { id: id("perception"), name: "Perception", stat: id("wisdom") });
  ModAPI.registerSkill(MOD, { id: id("survival"), name: "Survival", stat: id("wisdom") });

  ModAPI.registerSkill(MOD, { id: id("deception"), name: "Deception", stat: id("charisma") });
  ModAPI.registerSkill(MOD, { id: id("intimidation"), name: "Intimidation", stat: id("charisma") });
  ModAPI.registerSkill(MOD, { id: id("performance"), name: "Performance", stat: id("charisma") });
  ModAPI.registerSkill(MOD, { id: id("persuasion"), name: "Persuasion", stat: id("charisma") });

  // Load and register all race files
  const raceFiles = Object.keys(zip.files).filter(name => name.startsWith("data/races/") && name.endsWith(".json"));
  for (const fileName of raceFiles) {
    const data = JSON.parse(await zip.file(fileName).async("string"));
    data.id = id(data.id);
    ModAPI.registerRace(MOD, data);
  }

  // Load and register all class files
  const classFiles = Object.keys(zip.files).filter(name => name.startsWith("data/classes/") && name.endsWith(".json"));
  for (const fileName of classFiles) {
    const data = JSON.parse(await zip.file(fileName).async("string"));
    //ModAPI.registerClass(MOD, data);
  }

  // Optional: Add a UI component
  ModAPI.registerContainerType(MOD, "raceClassSelector", (container) => {
    const raceSelect = document.createElement("select");
    (window.races || []).forEach(race => {
      const opt = document.createElement("option");
      opt.value = race.name;
      opt.textContent = race.name;
      raceSelect.appendChild(opt);
    });

    const classSelect = document.createElement("select");
    (window.classes || []).forEach(cls => {
      const opt = document.createElement("option");
      opt.value = cls.name;
      opt.textContent = cls.name;
      classSelect.appendChild(opt);
    });

    container.appendChild(document.createTextNode("Race: "));
    container.appendChild(raceSelect);
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createTextNode("Class: "));
    container.appendChild(classSelect);
  });

  ModAPI.log(MOD, "All races and classes loaded from individual files.");
})();

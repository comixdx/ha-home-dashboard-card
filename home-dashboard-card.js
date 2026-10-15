/*!
 * Home Dashboard Card for Home Assistant — v1.0.0
 * Floor-plan home dashboard: lights, air conditioning, floor heating, energy and scenes.
 * Follows the Home Assistant user language (Profile → Language) and number/time format.
 * No build step, no dependencies. Add as a dashboard resource (type: module).
 */
(() => {
  const VERSION = "1.0.0";
  const AMBER = "#e6b45c", COOL = "#6fa8dc", WARM = "#e08b5a", BASE = "#1b1f26";
  const CIRCUIT_COLORS = [AMBER, COOL, WARM, "#8fbfa4", "#b48ead", "#d08770", "#88c0d0"];
  const LANG_NAMES = { en: "English", ro: "Română", de: "Deutsch", fr: "Français", es: "Español", it: "Italiano" };

  // Wall segments of the original design (600 × 500 plan units). Use with `walls: design`.
  const DESIGN_WALLS = [
    [7.5,26.5,438,13],[7.5,26.5,13,236],[7.5,249.5,13,169],[7.5,405.5,121,13],
    [115.5,405.5,13,49],[115.5,441.5,107,13],[209.5,441.5,13,31],[209.5,459.5,280,13],
    [476.5,419.5,13,53],[476.5,419.5,68,13],[531.5,80.5,13,352],[432.5,80.5,112,13],[432.5,26.5,13,67],
    [222.5,29.5,7,187],[212.5,206.5,17,55.5],[212.5,308,17,21.5],
    [7.5,249.5,124,13],[118.5,209.5,39.5,7],[208,209.5,21.5,7],
    [115.5,206.5,13,93.5],[115.5,346,13,72.5],
    [212.5,326,7,34],[212.5,406,7,45.5],
    [212.5,322.5,230,7],[435.5,322.5,51,7],
    [435.5,83.5,7,66.5],[435.5,196,7,133.5],
    [479.5,322.5,7,37.5],[479.5,406,7,23.5]
  ];

  /* ------------------------------------------------------------------ i18n */
  const T = {
    en: {
      good_morning: "Good morning", good_afternoon: "Good afternoon", good_evening: "Good evening",
      inside: "Inside", lights_on: "Lights on", of: "of", using_now: "Using now", all_lights_off: "All lights off",
      quick_scenes: "Quick scenes", active: "Active", your_home: "Your home", tap_room: "Tap a room to control it",
      layer_lights: "Lights", layer_temp: "Temperature", layer_floor: "Floor heating", layer_power: "Energy",
      lg_lights: "Lights on", lg_ac: "AC running", lg_floor: "Floor heating on",
      lg_off: "off", lg_bright: "bright", lg_cool: "cool", lg_warm: "warm", lg_low: "low", lg_high: "high", m_off: "off",
      energy_today: "Energy today", busiest_hour: "Busiest hour", used_so_far: "used so far", est_cost: "estimated cost",
      now: "Now", using_power: "What's using power right now", no_energy: "No energy statistics yet",
      lights: "Lights", turn_all_off: "Turn all off", turn_all_on: "Turn all on", no_lights: "This room has no lights.",
      n_of_m_lights: "{n} of {m} lights on", lights_off: "Lights off", humidity: "humidity",
      ac: "Air conditioning", no_ac: "This room has no air conditioner.",
      floor: "Floor heating", no_floor: "This room has no floor heating.",
      target: "target", floor_target: "floor target",
      floor_is: "Floor is {t}", heating_to: "heating to {t}", off_floor_is: "Off · floor is {t}",
      st_on: "On", st_off: "Off", st_unavail: "Unavailable", dim: "Dim", bright_lbl: "Bright", n_on: "{n} on",
      cooler: "Cooler", warmer: "Warmer", not_found: "Entity not found",
      m_cool: "Cooling to {t}", m_heat: "Heating to {t}", m_dry: "Drying the air", m_fan_only: "Fan only",
      m_auto: "Keeping the room at {t}", m_heat_cool: "Keeping the room at {t}",
      hv_cool: "Cool", hv_heat: "Heat", hv_dry: "Dry", hv_fan_only: "Fan", hv_auto: "Auto", hv_heat_cool: "Heat/Cool",
      e_general: "General", e_rooms: "Rooms", e_add_room: "Add room", e_remove: "Remove room", e_new_room: "New room",
      e_title: "Title (optional)", e_language: "Language", e_auto: "Home Assistant language",
      e_power_entity: "Total power sensor (W)", e_energy_entity: "Total energy sensor (kWh, hourly chart)",
      e_energy_today_entity: "Energy today sensor (optional)", e_cost_entity: "Cost today sensor (optional)",
      e_price: "Price per kWh (if no cost sensor)", e_scenes: "Quick scenes (scenes, scripts, buttons)",
      e_circuits: "Power breakdown sensors (W)", e_plan_width: "Floor plan width (units)", e_plan_height: "Floor plan height (units)",
      e_name: "Name", e_area: "Area (auto-fills entities)", e_lights: "Lights", e_temperature: "Temperature sensor",
      e_humidity: "Humidity sensor", e_power: "Power sensor (W)", e_climate: "Air conditioner",
      e_floor_heating: "Floor heating (climate or switch)", e_floor_temperature: "Floor temperature sensor",
      e_plan: "Position on floor plan", e_annex: "Extra area on floor plan (L-shaped rooms)",
      e_x: "X", e_y: "Y", e_w: "Width", e_h: "Height",
      e_yaml_hint: "Walls, colours and custom entity names can be set in the YAML editor."
    },
    ro: {
      good_morning: "Bună dimineața", good_afternoon: "Bună ziua", good_evening: "Bună seara",
      inside: "Interior", lights_on: "Lumini aprinse", of: "din", using_now: "Consum acum", all_lights_off: "Stinge toate luminile",
      quick_scenes: "Scene rapide", active: "Activă", your_home: "Casa ta", tap_room: "Atinge o cameră pentru a o controla",
      layer_lights: "Lumini", layer_temp: "Temperatură", layer_floor: "Încălzire pardoseală", layer_power: "Energie",
      lg_lights: "Lumini aprinse", lg_ac: "AC pornit", lg_floor: "Încălzire pardoseală pornită",
      lg_off: "stins", lg_bright: "puternic", lg_cool: "rece", lg_warm: "cald", lg_low: "scăzut", lg_high: "ridicat", m_off: "oprit",
      energy_today: "Energie azi", busiest_hour: "Ora de vârf", used_so_far: "consumat până acum", est_cost: "cost estimat",
      now: "Acum", using_power: "Ce consumă acum", no_energy: "Încă nu există statistici de energie",
      lights: "Lumini", turn_all_off: "Stinge tot", turn_all_on: "Aprinde tot", no_lights: "Camera nu are lumini.",
      n_of_m_lights: "{n} din {m} lumini aprinse", lights_off: "Lumini stinse", humidity: "umiditate",
      ac: "Aer condiționat", no_ac: "Camera nu are aer condiționat.",
      floor: "Încălzire în pardoseală", no_floor: "Camera nu are încălzire în pardoseală.",
      target: "țintă", floor_target: "țintă pardoseală",
      floor_is: "Pardoseala are {t}", heating_to: "încălzește la {t}", off_floor_is: "Oprită · pardoseala are {t}",
      st_on: "Pornit", st_off: "Oprit", st_unavail: "Indisponibil", dim: "Slab", bright_lbl: "Puternic", n_on: "{n} aprinse",
      cooler: "Mai rece", warmer: "Mai cald", not_found: "Entitate negăsită",
      m_cool: "Răcește la {t}", m_heat: "Încălzește la {t}", m_dry: "Dezumidifică", m_fan_only: "Doar ventilator",
      m_auto: "Menține camera la {t}", m_heat_cool: "Menține camera la {t}",
      hv_cool: "Răcire", hv_heat: "Încălzire", hv_dry: "Uscare", hv_fan_only: "Ventilator", hv_auto: "Auto", hv_heat_cool: "Încălz./Răcire",
      e_general: "General", e_rooms: "Camere", e_add_room: "Adaugă cameră", e_remove: "Șterge camera", e_new_room: "Cameră nouă",
      e_title: "Titlu (opțional)", e_language: "Limbă", e_auto: "Limba Home Assistant",
      e_power_entity: "Senzor putere totală (W)", e_energy_entity: "Senzor energie totală (kWh, grafic orar)",
      e_energy_today_entity: "Senzor energie azi (opțional)", e_cost_entity: "Senzor cost azi (opțional)",
      e_price: "Preț pe kWh (fără senzor de cost)", e_scenes: "Scene rapide (scene, scripturi, butoane)",
      e_circuits: "Senzori putere pe circuite (W)", e_plan_width: "Lățime plan (unități)", e_plan_height: "Înălțime plan (unități)",
      e_name: "Nume", e_area: "Zonă (completează automat entitățile)", e_lights: "Lumini", e_temperature: "Senzor temperatură",
      e_humidity: "Senzor umiditate", e_power: "Senzor putere (W)", e_climate: "Aer condiționat",
      e_floor_heating: "Încălzire pardoseală (climate sau switch)", e_floor_temperature: "Senzor temperatură pardoseală",
      e_plan: "Poziție pe plan", e_annex: "Zonă suplimentară pe plan (camere în L)",
      e_x: "X", e_y: "Y", e_w: "Lățime", e_h: "Înălțime",
      e_yaml_hint: "Pereții, culorile și numele entităților se pot seta din editorul YAML."
    },
    de: {
      good_morning: "Guten Morgen", good_afternoon: "Guten Tag", good_evening: "Guten Abend",
      inside: "Innen", lights_on: "Lichter an", of: "von", using_now: "Verbrauch jetzt", all_lights_off: "Alle Lichter aus",
      quick_scenes: "Schnellszenen", active: "Aktiv", your_home: "Dein Zuhause", tap_room: "Tippe auf einen Raum, um ihn zu steuern",
      layer_lights: "Licht", layer_temp: "Temperatur", layer_floor: "Fußbodenheizung", layer_power: "Energie",
      lg_lights: "Licht an", lg_ac: "Klima läuft", lg_floor: "Fußbodenheizung an",
      lg_off: "aus", lg_bright: "hell", lg_cool: "kühl", lg_warm: "warm", lg_low: "niedrig", lg_high: "hoch", m_off: "aus",
      energy_today: "Energie heute", busiest_hour: "Spitzenstunde", used_so_far: "bisher verbraucht", est_cost: "geschätzte Kosten",
      now: "Jetzt", using_power: "Was gerade Strom verbraucht", no_energy: "Noch keine Energiestatistik",
      lights: "Licht", turn_all_off: "Alle aus", turn_all_on: "Alle an", no_lights: "Dieser Raum hat keine Lichter.",
      n_of_m_lights: "{n} von {m} Lichtern an", lights_off: "Licht aus", humidity: "Luftfeuchte",
      ac: "Klimaanlage", no_ac: "Dieser Raum hat keine Klimaanlage.",
      floor: "Fußbodenheizung", no_floor: "Dieser Raum hat keine Fußbodenheizung.",
      target: "Ziel", floor_target: "Bodenziel",
      floor_is: "Boden hat {t}", heating_to: "heizt auf {t}", off_floor_is: "Aus · Boden hat {t}",
      st_on: "An", st_off: "Aus", st_unavail: "Nicht verfügbar", dim: "Dunkel", bright_lbl: "Hell", n_on: "{n} an",
      cooler: "Kühler", warmer: "Wärmer", not_found: "Entität nicht gefunden",
      m_cool: "Kühlt auf {t}", m_heat: "Heizt auf {t}", m_dry: "Entfeuchtet", m_fan_only: "Nur Lüfter",
      m_auto: "Hält den Raum bei {t}", m_heat_cool: "Hält den Raum bei {t}",
      hv_cool: "Kühlen", hv_heat: "Heizen", hv_dry: "Trocknen", hv_fan_only: "Lüfter", hv_auto: "Auto", hv_heat_cool: "Heizen/Kühlen",
      e_general: "Allgemein", e_rooms: "Räume", e_add_room: "Raum hinzufügen", e_remove: "Raum entfernen", e_new_room: "Neuer Raum",
      e_title: "Titel (optional)", e_language: "Sprache", e_auto: "Home-Assistant-Sprache",
      e_power_entity: "Gesamtleistung (W)", e_energy_entity: "Gesamtenergie (kWh, Stundendiagramm)",
      e_energy_today_entity: "Energie heute (optional)", e_cost_entity: "Kosten heute (optional)",
      e_price: "Preis pro kWh (ohne Kostensensor)", e_scenes: "Schnellszenen (Szenen, Skripte, Tasten)",
      e_circuits: "Leistungs-Aufschlüsselung (W)", e_plan_width: "Grundrissbreite (Einheiten)", e_plan_height: "Grundrisshöhe (Einheiten)",
      e_name: "Name", e_area: "Bereich (füllt Entitäten automatisch)", e_lights: "Lichter", e_temperature: "Temperatursensor",
      e_humidity: "Feuchtesensor", e_power: "Leistungssensor (W)", e_climate: "Klimaanlage",
      e_floor_heating: "Fußbodenheizung (Climate oder Schalter)", e_floor_temperature: "Bodentemperatur-Sensor",
      e_plan: "Position im Grundriss", e_annex: "Zusatzfläche im Grundriss (L-förmige Räume)",
      e_x: "X", e_y: "Y", e_w: "Breite", e_h: "Höhe",
      e_yaml_hint: "Wände, Farben und eigene Namen lassen sich im YAML-Editor setzen."
    },
    fr: {
      good_morning: "Bonjour", good_afternoon: "Bon après-midi", good_evening: "Bonsoir",
      inside: "Intérieur", lights_on: "Lumières allumées", of: "sur", using_now: "Consommation", all_lights_off: "Tout éteindre",
      quick_scenes: "Scènes rapides", active: "Active", your_home: "Votre maison", tap_room: "Touchez une pièce pour la contrôler",
      layer_lights: "Lumières", layer_temp: "Température", layer_floor: "Plancher chauffant", layer_power: "Énergie",
      lg_lights: "Lumières allumées", lg_ac: "Clim en marche", lg_floor: "Plancher chauffant allumé",
      lg_off: "éteint", lg_bright: "lumineux", lg_cool: "frais", lg_warm: "chaud", lg_low: "faible", lg_high: "élevé", m_off: "éteint",
      energy_today: "Énergie aujourd'hui", busiest_hour: "Heure de pointe", used_so_far: "consommés", est_cost: "coût estimé",
      now: "Maintenant", using_power: "Ce qui consomme en ce moment", no_energy: "Pas encore de statistiques d'énergie",
      lights: "Lumières", turn_all_off: "Tout éteindre", turn_all_on: "Tout allumer", no_lights: "Cette pièce n'a pas de lumières.",
      n_of_m_lights: "{n} sur {m} lumières allumées", lights_off: "Lumières éteintes", humidity: "humidité",
      ac: "Climatisation", no_ac: "Cette pièce n'a pas de climatiseur.",
      floor: "Plancher chauffant", no_floor: "Cette pièce n'a pas de plancher chauffant.",
      target: "consigne", floor_target: "consigne sol",
      floor_is: "Sol à {t}", heating_to: "chauffe à {t}", off_floor_is: "Éteint · sol à {t}",
      st_on: "Allumé", st_off: "Éteint", st_unavail: "Indisponible", dim: "Faible", bright_lbl: "Fort", n_on: "{n} allumées",
      cooler: "Plus frais", warmer: "Plus chaud", not_found: "Entité introuvable",
      m_cool: "Refroidit à {t}", m_heat: "Chauffe à {t}", m_dry: "Déshumidifie", m_fan_only: "Ventilation seule",
      m_auto: "Maintient la pièce à {t}", m_heat_cool: "Maintient la pièce à {t}",
      hv_cool: "Froid", hv_heat: "Chaud", hv_dry: "Déshum.", hv_fan_only: "Ventil.", hv_auto: "Auto", hv_heat_cool: "Chaud/Froid",
      e_general: "Général", e_rooms: "Pièces", e_add_room: "Ajouter une pièce", e_remove: "Supprimer la pièce", e_new_room: "Nouvelle pièce",
      e_title: "Titre (facultatif)", e_language: "Langue", e_auto: "Langue de Home Assistant",
      e_power_entity: "Capteur de puissance totale (W)", e_energy_entity: "Capteur d'énergie totale (kWh, graphique horaire)",
      e_energy_today_entity: "Énergie du jour (facultatif)", e_cost_entity: "Coût du jour (facultatif)",
      e_price: "Prix par kWh (sans capteur de coût)", e_scenes: "Scènes rapides (scènes, scripts, boutons)",
      e_circuits: "Répartition de puissance (W)", e_plan_width: "Largeur du plan (unités)", e_plan_height: "Hauteur du plan (unités)",
      e_name: "Nom", e_area: "Pièce HA (remplit les entités)", e_lights: "Lumières", e_temperature: "Capteur de température",
      e_humidity: "Capteur d'humidité", e_power: "Capteur de puissance (W)", e_climate: "Climatiseur",
      e_floor_heating: "Plancher chauffant (climate ou interrupteur)", e_floor_temperature: "Capteur de température du sol",
      e_plan: "Position sur le plan", e_annex: "Zone supplémentaire (pièces en L)",
      e_x: "X", e_y: "Y", e_w: "Largeur", e_h: "Hauteur",
      e_yaml_hint: "Murs, couleurs et noms personnalisés se règlent dans l'éditeur YAML."
    },
    es: {
      good_morning: "Buenos días", good_afternoon: "Buenas tardes", good_evening: "Buenas noches",
      inside: "Interior", lights_on: "Luces encendidas", of: "de", using_now: "Consumo ahora", all_lights_off: "Apagar todas las luces",
      quick_scenes: "Escenas rápidas", active: "Activa", your_home: "Tu casa", tap_room: "Toca una habitación para controlarla",
      layer_lights: "Luces", layer_temp: "Temperatura", layer_floor: "Suelo radiante", layer_power: "Energía",
      lg_lights: "Luces encendidas", lg_ac: "AC en marcha", lg_floor: "Suelo radiante encendido",
      lg_off: "apagado", lg_bright: "brillante", lg_cool: "fresco", lg_warm: "cálido", lg_low: "bajo", lg_high: "alto", m_off: "apagado",
      energy_today: "Energía hoy", busiest_hour: "Hora punta", used_so_far: "consumido hasta ahora", est_cost: "coste estimado",
      now: "Ahora", using_power: "Qué consume ahora mismo", no_energy: "Aún no hay estadísticas de energía",
      lights: "Luces", turn_all_off: "Apagar todo", turn_all_on: "Encender todo", no_lights: "Esta habitación no tiene luces.",
      n_of_m_lights: "{n} de {m} luces encendidas", lights_off: "Luces apagadas", humidity: "humedad",
      ac: "Aire acondicionado", no_ac: "Esta habitación no tiene aire acondicionado.",
      floor: "Suelo radiante", no_floor: "Esta habitación no tiene suelo radiante.",
      target: "objetivo", floor_target: "objetivo suelo",
      floor_is: "Suelo a {t}", heating_to: "calentando a {t}", off_floor_is: "Apagado · suelo a {t}",
      st_on: "Encendido", st_off: "Apagado", st_unavail: "No disponible", dim: "Tenue", bright_lbl: "Brillante", n_on: "{n} encendidas",
      cooler: "Más fresco", warmer: "Más cálido", not_found: "Entidad no encontrada",
      m_cool: "Enfriando a {t}", m_heat: "Calentando a {t}", m_dry: "Deshumidificando", m_fan_only: "Solo ventilador",
      m_auto: "Manteniendo a {t}", m_heat_cool: "Manteniendo a {t}",
      hv_cool: "Frío", hv_heat: "Calor", hv_dry: "Seco", hv_fan_only: "Ventilador", hv_auto: "Auto", hv_heat_cool: "Calor/Frío",
      e_general: "General", e_rooms: "Habitaciones", e_add_room: "Añadir habitación", e_remove: "Quitar habitación", e_new_room: "Nueva habitación",
      e_title: "Título (opcional)", e_language: "Idioma", e_auto: "Idioma de Home Assistant",
      e_power_entity: "Sensor de potencia total (W)", e_energy_entity: "Sensor de energía total (kWh, gráfico por horas)",
      e_energy_today_entity: "Energía de hoy (opcional)", e_cost_entity: "Coste de hoy (opcional)",
      e_price: "Precio por kWh (sin sensor de coste)", e_scenes: "Escenas rápidas (escenas, scripts, botones)",
      e_circuits: "Desglose de potencia (W)", e_plan_width: "Ancho del plano (unidades)", e_plan_height: "Alto del plano (unidades)",
      e_name: "Nombre", e_area: "Área (rellena las entidades)", e_lights: "Luces", e_temperature: "Sensor de temperatura",
      e_humidity: "Sensor de humedad", e_power: "Sensor de potencia (W)", e_climate: "Aire acondicionado",
      e_floor_heating: "Suelo radiante (climate o interruptor)", e_floor_temperature: "Sensor de temperatura del suelo",
      e_plan: "Posición en el plano", e_annex: "Zona extra en el plano (habitaciones en L)",
      e_x: "X", e_y: "Y", e_w: "Ancho", e_h: "Alto",
      e_yaml_hint: "Paredes, colores y nombres personalizados se configuran en el editor YAML."
    },
    it: {
      good_morning: "Buongiorno", good_afternoon: "Buon pomeriggio", good_evening: "Buonasera",
      inside: "Interno", lights_on: "Luci accese", of: "di", using_now: "Consumo attuale", all_lights_off: "Spegni tutte le luci",
      quick_scenes: "Scene rapide", active: "Attiva", your_home: "La tua casa", tap_room: "Tocca una stanza per controllarla",
      layer_lights: "Luci", layer_temp: "Temperatura", layer_floor: "Pavimento radiante", layer_power: "Energia",
      lg_lights: "Luci accese", lg_ac: "Clima acceso", lg_floor: "Pavimento acceso",
      lg_off: "spento", lg_bright: "luminoso", lg_cool: "fresco", lg_warm: "caldo", lg_low: "basso", lg_high: "alto", m_off: "spento",
      energy_today: "Energia oggi", busiest_hour: "Ora di picco", used_so_far: "consumati finora", est_cost: "costo stimato",
      now: "Ora", using_power: "Cosa consuma adesso", no_energy: "Ancora nessuna statistica energetica",
      lights: "Luci", turn_all_off: "Spegni tutto", turn_all_on: "Accendi tutto", no_lights: "Questa stanza non ha luci.",
      n_of_m_lights: "{n} di {m} luci accese", lights_off: "Luci spente", humidity: "umidità",
      ac: "Aria condizionata", no_ac: "Questa stanza non ha condizionatore.",
      floor: "Riscaldamento a pavimento", no_floor: "Questa stanza non ha riscaldamento a pavimento.",
      target: "obiettivo", floor_target: "obiettivo pavimento",
      floor_is: "Pavimento a {t}", heating_to: "riscalda a {t}", off_floor_is: "Spento · pavimento a {t}",
      st_on: "Acceso", st_off: "Spento", st_unavail: "Non disponibile", dim: "Tenue", bright_lbl: "Intensa", n_on: "{n} accese",
      cooler: "Più fresco", warmer: "Più caldo", not_found: "Entità non trovata",
      m_cool: "Raffredda a {t}", m_heat: "Riscalda a {t}", m_dry: "Deumidifica", m_fan_only: "Solo ventola",
      m_auto: "Mantiene la stanza a {t}", m_heat_cool: "Mantiene la stanza a {t}",
      hv_cool: "Freddo", hv_heat: "Caldo", hv_dry: "Deumid.", hv_fan_only: "Ventola", hv_auto: "Auto", hv_heat_cool: "Caldo/Freddo",
      e_general: "Generale", e_rooms: "Stanze", e_add_room: "Aggiungi stanza", e_remove: "Rimuovi stanza", e_new_room: "Nuova stanza",
      e_title: "Titolo (facoltativo)", e_language: "Lingua", e_auto: "Lingua di Home Assistant",
      e_power_entity: "Sensore potenza totale (W)", e_energy_entity: "Sensore energia totale (kWh, grafico orario)",
      e_energy_today_entity: "Energia di oggi (facoltativo)", e_cost_entity: "Costo di oggi (facoltativo)",
      e_price: "Prezzo per kWh (senza sensore costo)", e_scenes: "Scene rapide (scene, script, pulsanti)",
      e_circuits: "Ripartizione potenza (W)", e_plan_width: "Larghezza pianta (unità)", e_plan_height: "Altezza pianta (unità)",
      e_name: "Nome", e_area: "Area (compila le entità)", e_lights: "Luci", e_temperature: "Sensore temperatura",
      e_humidity: "Sensore umidità", e_power: "Sensore potenza (W)", e_climate: "Condizionatore",
      e_floor_heating: "Pavimento radiante (climate o interruttore)", e_floor_temperature: "Sensore temperatura pavimento",
      e_plan: "Posizione sulla pianta", e_annex: "Area extra sulla pianta (stanze a L)",
      e_x: "X", e_y: "Y", e_w: "Larghezza", e_h: "Altezza",
      e_yaml_hint: "Muri, colori e nomi personalizzati si impostano nell'editor YAML."
    }
  };

  /* --------------------------------------------------------------- helpers */
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const toNum = v => { const n = parseFloat(v); return Number.isFinite(n) ? n : null; };
  const domainOf = id => (id || "").split(".")[0];
  const hexRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  function mix(a, b, t) {
    t = clamp(Number.isFinite(t) ? t : 0, 0, 1);
    const A = hexRgb(a), B = hexRgb(b);
    return "#" + A.map((x, i) => Math.round(x + (B[i] - x) * t).toString(16).padStart(2, "0")).join("");
  }
  const luminance = h => { const [r, g, b] = hexRgb(h); return r * 0.299 + g * 0.587 + b * 0.114; };
  const fire = (node, type, detail) => node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));

  function langOf(hass, config) {
    if (config && config.language && config.language !== "auto") return config.language;
    return (hass && ((hass.locale && hass.locale.language) || hass.language)) || navigator.language || "en";
  }
  function makeT(lang, overrides) {
    const full = String(lang || "en").toLowerCase(), short = full.split("-")[0];
    const dict = T[full] || T[short] || T.en;
    const ov = (overrides && (overrides[full] || overrides[short])) || {};
    return (k, vars) => {
      let s = ov[k] ?? dict[k] ?? T.en[k] ?? k;
      if (vars) for (const v in vars) s = s.split("{" + v + "}").join(vars[v]);
      return s;
    };
  }

  let fontInjected = false;
  function ensureFont() {
    if (fontInjected || document.querySelector("link[data-hdc-font]")) return;
    fontInjected = true;
    const l = document.createElement("link");
    l.rel = "stylesheet"; l.dataset.hdcFont = "1";
    l.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap";
    document.head.appendChild(l);
  }

  const normEnt = e => !e ? null : typeof e === "string" ? { entity: e } : e.entity ? { ...e } : null;
  function normalizeConfig(c) {
    const cfg = { plan_width: 600, plan_height: 500, temp_range: [19, 25], floor_range: [21, 29], ...c };
    cfg.rooms = (c.rooms || []).map(r => ({ ...r, lights: (r.lights || []).map(normEnt).filter(Boolean) }));
    cfg.scenes = (c.scenes || []).map(normEnt).filter(Boolean);
    cfg.circuits = (c.circuits || []).map(normEnt).filter(Boolean);
    cfg.walls = c.walls === "design" ? DESIGN_WALLS : Array.isArray(c.walls) ? c.walls : [];
    return cfg;
  }

  /* Entities of one HA area, sorted into dashboard roles. */
  function areaEntities(hass, areaId) {
    const ents = hass.entities || {}, devs = hass.devices || {};
    const out = { lights: [], climates: [], temperature: null, humidity: null, power: null };
    for (const id of Object.keys(hass.states)) {
      const reg = ents[id];
      if (!reg || reg.hidden || reg.entity_category) continue;
      const area = reg.area_id || (reg.device_id && devs[reg.device_id] && devs[reg.device_id].area_id);
      if (area !== areaId) continue;
      const s = hass.states[id], d = domainOf(id), dc = s.attributes.device_class;
      if (d === "light") out.lights.push(id);
      else if (d === "climate") out.climates.push(s);
      else if (d === "sensor" && dc === "temperature" && !out.temperature) out.temperature = id;
      else if (d === "sensor" && dc === "humidity" && !out.humidity) out.humidity = id;
      else if (d === "sensor" && dc === "power" && !out.power) out.power = id;
    }
    const room = { lights: out.lights };
    if (out.temperature) room.temperature = out.temperature;
    if (out.humidity) room.humidity = out.humidity;
    if (out.power) room.power = out.power;
    for (const s of out.climates) {
      const cools = (s.attributes.hvac_modes || []).some(m => m === "cool" || m === "heat_cool" || m === "dry");
      if (cools && !room.climate) room.climate = s.entity_id;
      else if (!room.floor_heating) room.floor_heating = s.entity_id;
      else if (!room.climate) room.climate = s.entity_id;
    }
    return room;
  }

  function autoConfig(hass) {
    const cfg = { type: "custom:home-dashboard-card", rooms: [], scenes: [] };
    if (!hass) return { ...cfg, rooms: [{ name: "Living Room", lights: [] }] };
    const areas = Object.values(hass.areas || {});
    for (const a of areas) {
      const r = areaEntities(hass, a.area_id);
      if (r.lights.length || r.climate || r.floor_heating || r.temperature) cfg.rooms.push({ name: a.name, area: a.area_id, ...r });
    }
    if (!cfg.rooms.length) cfg.rooms.push({ name: "Living Room", lights: [] });
    const total = /total|house|home|grid|consum|cas[aă]|load|import/i;
    for (const s of Object.values(hass.states)) {
      const id = s.entity_id, dc = s.attributes.device_class, n = s.attributes.friendly_name || id;
      if (domainOf(id) === "sensor" && dc === "power" && !cfg.power_entity && total.test(n)) cfg.power_entity = id;
      if (domainOf(id) === "sensor" && dc === "energy" && s.attributes.state_class === "total_increasing" && !cfg.energy_entity && total.test(n)) cfg.energy_entity = id;
    }
    cfg.scenes = Object.keys(hass.states).filter(id => domainOf(id) === "scene").slice(0, 4);
    return cfg;
  }

  /* ------------------------------------------------------------------- CSS */
  const CSS = `
  :host{display:block;--a:${AMBER};--cool:${COOL};--warm:${WARM};--bg:#0e1013;--card:#14171c;--raised:#191d23;--raised-h:#232830;
    --line:rgba(255,255,255,.07);--line2:rgba(255,255,255,.1);--tx:#e9ecf1;--tx2:#c2cad6;--mut:#9aa4b4;--fnt:#7d8697;
    --mono:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;}
  ha-card{background:var(--bg);color:var(--tx);border:none;border-radius:var(--ha-card-border-radius,12px);overflow:visible;
    -webkit-tap-highlight-color:transparent;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;}
  *{box-sizing:border-box}
  .root{display:flex;flex-direction:column;gap:20px;padding:24px 28px 32px;max-width:1440px;margin:0 auto}
  .narrow .root{gap:14px;padding:16px 14px calc(24px + env(safe-area-inset-bottom))}
  .mono{font-family:var(--mono);font-variant-numeric:tabular-nums}
  .hdr{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px 24px}
  .greet{font-size:clamp(22px,6vw,28px);font-weight:600;letter-spacing:-.02em}
  .sub{font-size:14px;color:var(--mut)}
  .hdr-r{display:flex;flex-wrap:wrap;align-items:center;gap:10px}
  .narrow .hdr-r{flex:1 1 100%}
  .stats{display:flex;flex:1 1 280px;background:var(--card);border:1px solid var(--line);border-radius:14px}
  .stat{flex:1 1 0;min-width:0;display:flex;flex-direction:column;gap:4px;padding:10px 16px}
  .narrow .stat{padding:10px 12px}
  .stat+.stat{border-left:1px solid var(--line)}
  .stat .l{font-size:12px;color:var(--mut);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .stat .v{font-size:20px;font-weight:500;white-space:nowrap}
  .stat .v small{font-size:13px;color:var(--fnt)}
  .stat .v.a{color:var(--a)} .stat .v.a small{color:var(--a)}
  .btn{display:flex;align-items:center;justify-content:center;height:52px;padding:0 20px;border-radius:14px;background:var(--raised);
    border:1px solid var(--line2);font-size:14px;font-weight:500;cursor:pointer;user-select:none;color:var(--tx);text-align:center}
  .narrow .btn.wide{flex:1 1 100%}
  .btn.sm{height:auto;padding:9px 14px;border-radius:10px;font-size:13px;font-weight:400;border-color:rgba(255,255,255,.08)}
  @media(hover:hover){.btn:hover{background:var(--raised-h);border-color:rgba(230,180,92,.5)}
    .scene:hover{border-color:rgba(230,180,92,.45)} .rtab:hover{filter:brightness(1.15)} .round:hover{background:var(--raised-h)}}
  .btn:active,.scene:active,.round:active,.rm:active{transform:scale(.98)}
  .h2{font-size:15px;font-weight:600}
  .sec{display:flex;flex-direction:column;gap:10px}
  .scenes{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
  .narrow .scenes{grid-template-columns:repeat(2,minmax(0,1fr))}
  .scene{display:flex;flex-direction:column;gap:6px;padding:16px;border-radius:14px;cursor:pointer;user-select:none;background:var(--card);
    border:1px solid var(--line);transition:border-color .15s,background .15s;min-width:0}
  .narrow .scene{padding:14px}
  .scene.on{background:#221f19;border-color:rgba(230,180,92,.6)}
  .scene .top{display:flex;align-items:center;justify-content:space-between;gap:8px;min-width:0}
  .scene .n{font-size:15px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .scene .b{font-size:12px;color:var(--a);flex:none}
  .scene .d{font-size:13px;color:var(--mut);line-height:1.35}
  .main{display:grid;gap:20px;align-items:start;grid-template-columns:minmax(0,1.15fr) minmax(340px,1fr);
    grid-template-areas:"plan room" "energy room"}
  .main.noenergy{grid-template-areas:"plan room"}
  .narrow .main{gap:14px;grid-template-columns:minmax(0,1fr);grid-template-areas:"plan" "room" "energy"}
  .narrow .main.noenergy{grid-template-areas:"plan" "room"}
  .card{min-width:0;background:var(--card);border:1px solid var(--line);border-radius:18px;padding:20px}
  .narrow .card{padding:16px}
  .cardhead{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px 16px;padding-bottom:16px}
  .t17{font-size:17px;font-weight:600} .m13{font-size:13px;color:var(--mut)}
  .seg{display:flex;gap:4px;padding:4px;max-width:100%;overflow-x:auto;scrollbar-width:none;background:var(--bg);border-radius:12px}
  .seg::-webkit-scrollbar,.rtabs::-webkit-scrollbar{display:none}
  .seg div{flex:none;white-space:nowrap;min-height:40px;display:flex;align-items:center;padding:0 14px;border-radius:9px;font-size:13px;
    font-weight:500;cursor:pointer;user-select:none;color:#aab2c0}
  .seg div.on{color:#12141a;background:#e9ecf1}
  .plan{position:relative;width:100%;background:var(--bg);overflow:hidden;border-radius:10px;container-type:inline-size}
  .rm{position:absolute;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;
    padding:clamp(3px,1.6cqw,10px);overflow:hidden;transition:background .25s,box-shadow .2s;user-select:none}
  .rm .n{font-size:clamp(9px,2.5cqw,14px);font-weight:600;letter-spacing:-.01em;text-align:center;line-height:1.15}
  .rm .m{font-size:clamp(9px,2.3cqw,13px);font-weight:500;text-align:center}
  .tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px}
  .tiles .rm{position:relative;min-height:92px;border-radius:12px;padding:10px}
  .tiles .rm .n{font-size:14px} .tiles .rm .m{font-size:13px}
  .dots{display:flex;gap:4px;padding-top:3px;min-height:10px}
  .dot{width:7px;height:7px;border-radius:99px;box-shadow:0 0 0 1px rgba(0,0,0,.35)}
  .wall{position:absolute;z-index:3;background:#dfe4ec;pointer-events:none}
  .legend{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;padding-top:14px}
  .lg{display:flex;align-items:center;gap:14px;flex-wrap:wrap;font-size:12px;color:var(--mut)}
  .lg>div{display:flex;align-items:center;gap:6px}
  .lg i{width:8px;height:8px;border-radius:99px;display:block}
  .grad{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--fnt)}
  .grad b{width:110px;height:8px;border-radius:99px;display:block}
  .big{display:flex;flex-wrap:wrap;gap:28px;padding-top:14px}
  .big>div{display:flex;flex-direction:column;gap:2px}
  .big .v{font-size:24px;font-weight:500} .big .v small{font-size:13px;color:var(--fnt)}
  .big .l{font-size:12px;color:var(--mut)}
  .chart{position:relative;margin-top:18px;height:110px}
  .grid3{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:space-between;pointer-events:none}
  .grid3 div{border-top:1px dashed rgba(255,255,255,.06)} .grid3 div:last-child{border-top:1px solid rgba(255,255,255,.1)}
  .bars{position:relative;display:flex;align-items:flex-end;gap:3px;height:100%}
  .narrow .bars{gap:2px}
  .bar{flex:1;display:flex;flex-direction:column;justify-content:flex-end;height:100%}
  .bar i{display:block;width:100%;border-radius:2px 2px 0 0}
  .axis{position:relative;height:14px;margin-top:8px;font-size:11px;color:var(--fnt)}
  .axis span{position:absolute;top:0;white-space:nowrap}
  .circ{display:grid;grid-template-columns:minmax(0,8em) minmax(0,1fr) auto;align-items:center;gap:12px}
  .circ .n{font-size:13px;color:var(--tx2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .track{height:8px;border-radius:99px;background:rgba(255,255,255,.06);overflow:hidden}
  .track i{display:block;height:100%;border-radius:99px}
  .circ .w{font-size:13px;text-align:right;min-width:60px}
  .roomcard{grid-area:room;display:flex;flex-direction:column;gap:20px;scroll-margin-top:calc(var(--header-height,56px) + 8px)}
  .rtabs{position:sticky;top:calc(var(--header-height,56px) + env(safe-area-inset-top,0px));z-index:5;display:flex;gap:8px;overflow-x:auto;
    scrollbar-width:none;background:var(--card);padding:6px 0;margin-top:-6px}
  .rtab{flex:none;white-space:nowrap;min-height:44px;display:flex;align-items:center;gap:8px;padding:0 16px;border-radius:99px;font-size:14px;
    font-weight:500;cursor:pointer;user-select:none;background:var(--raised);color:#d4d9e1;border:1px solid rgba(255,255,255,.08)}
  .rtab.on{background:#e9ecf1;color:#12141a;border-color:#e9ecf1}
  .rtab i{width:7px;height:7px;border-radius:99px;display:block}
  .rhead{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:12px}
  .rname{font-size:24px;font-weight:600;letter-spacing:-.02em}
  .rtemp{font-size:34px;font-weight:500;line-height:1}
  .blk{display:flex;flex-direction:column;gap:12px;padding-top:18px;border-top:1px solid var(--line)}
  .row{display:flex;align-items:center;justify-content:space-between;gap:12px}
  .tap{cursor:pointer;user-select:none}
  .lt{background:var(--bg);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:14px 16px;display:flex;flex-direction:column;gap:12px}
  .lt .n{font-size:15px;font-weight:500} .lt .s{font-size:12px}
  .col{display:flex;flex-direction:column;gap:2px;min-width:0}
  .sw{flex:none;width:52px;height:30px;border-radius:99px;padding:3px;display:flex;justify-content:flex-start;background:rgba(255,255,255,.16);transition:background .18s}
  .sw.on{justify-content:flex-end;background:var(--c)}
  .sw.na{opacity:.35}
  .sw i{display:block;width:24px;height:24px;border-radius:99px;background:#e9ecf1;box-shadow:0 1px 3px rgba(0,0,0,.5)}
  .sw.on i{background:#12141a}
  .dim{display:flex;align-items:center;gap:12px;font-size:12px;color:var(--fnt)}
  .dim span:first-child{min-width:30px} .dim span:last-child{min-width:42px;text-align:right}
  input[type=range]{-webkit-appearance:none;appearance:none;background:transparent;cursor:pointer;flex:1;height:28px;margin:0;touch-action:pan-y}
  input[type=range]::-webkit-slider-runnable-track{height:8px;border-radius:99px;background:rgba(255,255,255,.14)}
  input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:24px;height:24px;margin-top:-8px;border-radius:99px;background:#f0f2f5;border:none;box-shadow:0 2px 8px rgba(0,0,0,.55)}
  input[type=range]::-moz-range-track{height:8px;border-radius:99px;background:rgba(255,255,255,.14)}
  input[type=range]::-moz-range-thumb{width:24px;height:24px;border-radius:99px;background:#f0f2f5;border:none}
  .body{display:flex;flex-direction:column;transition:opacity .2s}
  .body.off{opacity:.45}
  .stepper{display:flex;align-items:center;justify-content:center;gap:20px;padding:6px 0}
  .round{width:52px;height:52px;border-radius:99px;background:var(--raised);border:1px solid var(--line2);display:flex;align-items:center;
    justify-content:center;font-size:24px;cursor:pointer;user-select:none;color:var(--tx)}
  .setv{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:110px}
  .setv .v{font-size:40px;font-weight:500;line-height:1} .setv .l{font-size:12px;color:var(--fnt)}
  .modes{display:grid;gap:6px;padding-top:14px}
  .modes div{text-align:center;padding:12px 2px;border-radius:10px;font-size:13px;font-weight:500;cursor:pointer;user-select:none;color:var(--tx2);
    background:var(--raised);border:1px solid rgba(255,255,255,.08);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .modes div.on{color:#0e1013;background:var(--cool);border-color:var(--cool)}
  .muted{font-size:14px;color:var(--fnt)}
  .empty{font-size:13px;color:var(--fnt);padding:24px 0;text-align:center}
  `;

  /* ------------------------------------------------------------------ card */
  class HomeDashboardCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._sel = 0; this._layer = null; this._pending = {}; this._timers = {};
      this._stats = null; this._statsAt = 0; this._statsKey = null; this._w = 0;
      const sr = this.shadowRoot;
      sr.innerHTML = `<style>${CSS}</style><ha-card><div class="wrap"></div></ha-card>`;
      this._wrap = sr.querySelector(".wrap");
      sr.addEventListener("click", e => this._onClick(e));
      sr.addEventListener("change", e => this._onChange(e));
      sr.addEventListener("pointerdown", e => this._onDown(e));
      sr.addEventListener("contextmenu", e => {
        const el = e.target.closest && e.target.closest("[data-more]");
        if (!el) return;
        e.preventDefault();
        if (Date.now() - (this._lpAt || 0) > 800) this._more(el.dataset.more);
      });
      this._onUp = () => {
        clearTimeout(this._lpTimer);
        if (!this._hold) return;
        this._hold = false;
        if (this._dirty) { this._dirty = false; setTimeout(() => this._update(true), 80); }
      };
      this._onMove = e => {
        if (this._lpStart && Math.hypot(e.clientX - this._lpStart[0], e.clientY - this._lpStart[1]) > 10) clearTimeout(this._lpTimer);
      };
    }

    static getConfigElement() { return document.createElement("home-dashboard-card-editor"); }
    static getStubConfig(hass) { return autoConfig(hass); }

    setConfig(config) {
      if (!config) throw new Error("Invalid configuration");
      if (!Array.isArray(config.rooms) || !config.rooms.length) throw new Error("home-dashboard-card: add at least one room under `rooms:`");
      this._raw = config;
      this._config = normalizeConfig(config);
      this._sel = Math.min(this._sel, this._config.rooms.length - 1);
      this._statsKey = null;
      if (this._config.load_font !== false) ensureFont();
      if (this._hass) this._update(true);
    }

    set hass(hass) {
      this._hass = hass;
      this._update(false);
    }
    get hass() { return this._hass; }

    getCardSize() { return 14; }
    getGridOptions() { return { columns: "full", rows: "auto" }; }

    connectedCallback() {
      window.addEventListener("pointerup", this._onUp);
      window.addEventListener("pointercancel", this._onUp);
      window.addEventListener("pointermove", this._onMove, { passive: true });
      this._clock = setInterval(() => this._update(true), 30000);
      this._statsTimer = setInterval(() => this._maybeFetch(true), 300000);
      if (window.ResizeObserver) {
        this._ro = new ResizeObserver(e => {
          const w = Math.round(e[0].contentRect.width);
          if (!w) return;
          const was = this._narrow;
          this._w = w;
          if (was === undefined || (w < 820) !== was) this._update(true);
        });
        this._ro.observe(this);
      }
      if (this._hass) this._update(true);
    }
    disconnectedCallback() {
      window.removeEventListener("pointerup", this._onUp);
      window.removeEventListener("pointercancel", this._onUp);
      window.removeEventListener("pointermove", this._onMove);
      clearInterval(this._clock); clearInterval(this._statsTimer);
      if (this._ro) this._ro.disconnect();
    }

    /* ---------- state helpers */
    _st(id) { return id ? this._hass.states[id] : undefined; }
    _avail(s) { return !!s && s.state !== "unavailable" && s.state !== "unknown"; }
    _num(id) { const s = this._st(id); return this._avail(s) ? toNum(s.state) : null; }
    _watts(id) {
      const s = this._st(id), v = this._num(id);
      if (v == null) return null;
      const u = s.attributes.unit_of_measurement || "W";
      return u === "kW" ? v * 1000 : u === "MW" ? v * 1e6 : v;
    }
    _kwh(id) {
      const s = this._st(id), v = this._num(id);
      if (v == null) return null;
      const u = s.attributes.unit_of_measurement || "kWh";
      return u === "Wh" ? v / 1000 : u === "MWh" ? v * 1000 : v;
    }
    _isOn(id) { const s = this._st(id); return !!s && s.state === "on"; }
    _bri(id) {
      const s = this._st(id);
      if (!s || s.state !== "on") return 0;
      return s.attributes.brightness != null ? Math.max(1, Math.round(s.attributes.brightness / 2.55)) : 100;
    }
    _dimmable(id) {
      const s = this._st(id);
      if (!s || domainOf(id) !== "light") return false;
      const m = s.attributes.supported_color_modes;
      if (Array.isArray(m)) return m.some(x => x !== "onoff");
      return !!(s.attributes.supported_features & 1);
    }
    _climOn(s) {
      if (!this._avail(s)) return false;
      return domainOf(s.entity_id) === "climate" ? s.state !== "off" : s.state === "on";
    }
    _roomName(r, i) {
      return r.name || (r.area && this._hass.areas && this._hass.areas[r.area] && this._hass.areas[r.area].name) || `Room ${i + 1}`;
    }
    _name(id, override, roomName) {
      if (override) return override;
      const s = this._st(id), reg = this._hass.entities && this._hass.entities[id];
      let n = (reg && reg.name) || (s && s.attributes.friendly_name) || id;
      if (roomName && n.toLowerCase().startsWith(roomName.toLowerCase() + " ")) n = n.slice(roomName.length + 1);
      return n.charAt(0).toUpperCase() + n.slice(1);
    }
    _info(r) {
      const ids = r.lights.map(l => l.entity);
      const on = ids.filter(id => this._isOn(id));
      const ac = r.climate ? this._st(r.climate) : null;
      const fl = r.floor_heating ? this._st(r.floor_heating) : null;
      let temp = this._num(r.temperature);
      if (temp == null && ac) temp = toNum(ac.attributes.current_temperature);
      let hum = this._num(r.humidity);
      if (hum == null && ac) hum = toNum(ac.attributes.current_humidity);
      let floorTemp = this._num(r.floor_temperature);
      if (floorTemp == null && fl && domainOf(fl.entity_id) === "climate") floorTemp = toNum(fl.attributes.current_temperature);
      return {
        lightsOn: on.length, lightsTotal: ids.length,
        avgBri: on.length ? on.reduce((a, id) => a + this._bri(id), 0) / on.length : 0,
        temp, hum, power: this._watts(r.power), ac, fl,
        acOn: this._climOn(ac), floorOn: this._climOn(fl), floorTemp
      };
    }

    /* ---------- locale */
    _setupLocale() {
      const h = this._hass, loc = h.locale || {};
      const lang = langOf(h, this._config);
      this._lang = lang;
      this._t = makeT(lang, this._config.translations);
      const nf = loc.number_format;
      this._nloc = nf === "comma_decimal" ? "en-US" : nf === "decimal_comma" ? "de-DE" : nf === "space_comma" ? "fr-FR" : nf === "system" ? undefined : lang;
      this._grp = nf !== "none";
      const tf = loc.time_format;
      this._h12 = tf === "12" ? true : tf === "24" ? false : undefined;
      this._tloc = tf === "system" ? undefined : lang;
    }
    _fmt(v, d = 0) {
      if (v == null || !Number.isFinite(v)) return "—";
      try { return new Intl.NumberFormat(this._nloc, { minimumFractionDigits: d, maximumFractionDigits: d, useGrouping: this._grp }).format(v); }
      catch (e) { return v.toFixed(d); }
    }
    _money(v) {
      const cur = (this._hass.config && this._hass.config.currency) || "EUR";
      try { return new Intl.NumberFormat(this._nloc, { style: "currency", currency: cur }).format(v); }
      catch (e) { return this._fmt(v, 2) + " " + cur; }
    }
    _time(d, opts) {
      try { return d.toLocaleTimeString(this._tloc, { ...opts, hour12: this._h12 }); } catch (e) { return d.toLocaleTimeString(); }
    }
    _hourLabel(h) {
      const d = new Date(); d.setHours(h, 0, 0, 0);
      return this._h12 ? this._time(d, { hour: "numeric" }) : this._time(d, { hour: "2-digit", minute: "2-digit" });
    }
    _tempStr(v, d = 1) { return v == null ? "—" : this._fmt(v, d) + "°"; }
    _modeLabel(s, m) {
      const h = this._hass;
      try {
        if (h.formatEntityState) { const r = h.formatEntityState(s, m); if (r && r !== m) return r; }
      } catch (e) { /* older HA */ }
      const l = h.localize && h.localize(`component.climate.entity_component._.state.${m}`);
      if (l) return l;
      const own = this._t("hv_" + m);
      return own !== "hv_" + m ? own : m;
    }

    /* ---------- update cycle */
    _entityIds() {
      const c = this._config, ids = [c.power_entity, c.energy_entity, c.energy_today_entity, c.cost_entity];
      c.rooms.forEach(r => { ids.push(r.temperature, r.humidity, r.power, r.climate, r.floor_heating, r.floor_temperature); r.lights.forEach(l => ids.push(l.entity)); });
      c.scenes.forEach(s => ids.push(s.entity));
      c.circuits.forEach(s => ids.push(s.entity));
      return ids.filter(Boolean);
    }
    _signature() {
      const st = this._hass.states;
      const lc = this._hass.locale || {};
      return this._entityIds().map(id => id + (st[id] ? st[id].last_updated + st[id].state : "-")).join("|") +
        `#${this._hass.language}${lc.language}${lc.number_format}${lc.time_format}`;
    }
    _update(force) {
      if (!this._config || !this._hass) return;
      this._maybeFetch(false);
      const sig = this._signature();
      if (!force && sig === this._sig) return;
      if (this._hold) { this._dirty = true; return; }
      this._sig = sig;
      this._render();
    }

    async _maybeFetch(force) {
      const c = this._config, id = c.energy_entity || c.power_entity;
      if (!id || !this._hass || !this._hass.callWS) return;
      const day = new Date().toDateString();
      if (!force && this._statsKey === id + day && Date.now() - this._statsAt < 300000) return;
      this._statsKey = id + day; this._statsAt = Date.now();
      const isEnergy = !!c.energy_entity;
      const now = new Date(), start = new Date(now); start.setHours(0, 0, 0, 0);
      const hourStart = new Date(now); hourStart.setMinutes(0, 0, 0);
      const base = { type: "recorder/statistics_during_period", statistic_ids: [id], end_time: now.toISOString(),
        types: isEnergy ? ["change"] : ["mean"], units: isEnergy ? { energy: "kWh" } : { power: "W" } };
      try {
        const [hourly, short] = await Promise.all([
          this._hass.callWS({ ...base, start_time: start.toISOString(), period: "hour" }),
          isEnergy ? this._hass.callWS({ ...base, start_time: hourStart.toISOString(), period: "5minute" }) : Promise.resolve({})
        ]);
        const bars = new Array(24).fill(null);
        for (const r of (hourly[id] || [])) {
          const t = new Date(r.start);
          if (t < start) continue;
          const v = isEnergy ? (r.change ?? 0) * 1000 : r.mean;
          if (v != null) bars[t.getHours()] = Math.max(0, v);
        }
        const curWh = isEnergy ? (short[id] || []).reduce((a, r) => a + (r.change || 0) * 1000, 0) : 0;
        this._stats = { bars, curWh, isEnergy, hour: now.getHours() };
      } catch (e) {
        console.warn("home-dashboard-card: statistics unavailable", e);
        this._stats = { error: true };
      }
      this._sig = null;
      this._update(true);
    }

    /* ---------- events */
    _onDown(e) {
      this._hold = true;
      const el = e.target.closest && e.target.closest("[data-more]");
      if (el) {
        this._lpStart = [e.clientX, e.clientY];
        clearTimeout(this._lpTimer);
        this._lpTimer = setTimeout(() => { this._lpFired = true; this._lpAt = Date.now(); this._more(el.dataset.more); }, 550);
      }
    }
    _more(id) { if (id) fire(this, "hass-more-info", { entityId: id }); }
    _haptic() { fire(this, "haptic", "light"); }
    _call(domain, service, data) {
      this._haptic();
      return this._hass.callService(domain, service, data).catch(err => {
        console.error("home-dashboard-card:", err);
        fire(this, "hass-notification", { message: err && err.message ? err.message : String(err) });
      });
    }
    _onClick(e) {
      if (this._lpFired) { this._lpFired = false; return; }
      const el = e.target.closest && e.target.closest("[data-act]");
      if (!el) return;
      const a = el.dataset.act, id = el.dataset.id, c = this._config;
      switch (a) {
        case "room":
          this._sel = +el.dataset.i; this._update(true);
          if (this._narrow) requestAnimationFrame(() => {
            const rc = this.shadowRoot.querySelector(".roomcard");
            if (rc) rc.scrollIntoView({ behavior: "smooth", block: "start" });
          });
          break;
        case "rtab": this._sel = +el.dataset.i; this._update(true); break;
        case "layer": this._layer = el.dataset.l; this._update(true); break;
        case "scene": {
          const d = domainOf(id);
          if (d === "scene") this._call("scene", "turn_on", { entity_id: id });
          else if (d === "script") this._call("script", "turn_on", { entity_id: id });
          else if (d === "button" || d === "input_button") this._call(d, "press", { entity_id: id });
          else this._call("homeassistant", "turn_on", { entity_id: id });
          this._lastScene = id; this._lastSceneAt = Date.now();
          break;
        }
        case "alloff": {
          const ids = c.rooms.flatMap(r => r.lights.map(l => l.entity)).filter(x => this._isOn(x));
          if (ids.length) this._call("homeassistant", "turn_off", { entity_id: ids });
          break;
        }
        case "light": this._call("homeassistant", "toggle", { entity_id: id }); break;
        case "roomlights": {
          const r = c.rooms[this._sel], ids = r.lights.map(l => l.entity);
          const anyOn = ids.some(x => this._isOn(x));
          if (ids.length) this._call("homeassistant", anyOn ? "turn_off" : "turn_on", { entity_id: ids });
          break;
        }
        case "clim-toggle": this._climToggle(id, el.dataset.k); break;
        case "clim-step": this._climStep(id, +el.dataset.d, el.dataset.k); break;
        case "clim-mode": this._call("climate", "set_hvac_mode", { entity_id: id, hvac_mode: el.dataset.m }); break;
      }
    }
    _onChange(e) {
      const el = e.target;
      if (el.dataset && el.dataset.bri) {
        this._call("light", "turn_on", { entity_id: el.dataset.bri, brightness_pct: clamp(+el.value, 1, 100) });
      }
    }
    _preferredMode(s, kind) {
      const modes = (s.attributes.hvac_modes || []).filter(m => m !== "off");
      if (kind === "floor" && modes.includes("heat")) return "heat";
      return modes[0];
    }
    _climToggle(id, kind) {
      const s = this._st(id);
      if (!this._avail(s)) return;
      if (domainOf(id) !== "climate") return this._call("homeassistant", "toggle", { entity_id: id });
      if (s.state !== "off") return this._call("climate", "turn_off", { entity_id: id });
      const mode = this._preferredMode(s, kind);
      this._call("climate", "turn_on", { entity_id: id }).catch(() => mode && this._call("climate", "set_hvac_mode", { entity_id: id, hvac_mode: mode }));
    }
    _target(s) {
      const p = this._pending[s.entity_id], cur = toNum(s.attributes.temperature);
      if (p && Date.now() - p.t < 6000 && (cur == null || Math.abs(cur - p.v) > 1e-6)) return p.v;
      delete this._pending[s.entity_id];
      return cur;
    }
    _climStep(id, dir, kind) {
      const s = this._st(id);
      if (!this._avail(s)) return;
      const cur = this._target(s);
      if (cur == null) return;
      const step = toNum(s.attributes.target_temp_step) || (this._hass.config && this._hass.config.unit_system && this._hass.config.unit_system.temperature === "°F" ? 1 : 0.5);
      const min = toNum(s.attributes.min_temp) ?? 5, max = toNum(s.attributes.max_temp) ?? 35;
      const v = clamp(Math.round((cur + dir * step) / step) * step, min, max);
      this._pending[id] = { v: +v.toFixed(2), t: Date.now() };
      this._haptic();
      this._update(true);
      clearTimeout(this._timers[id]);
      this._timers[id] = setTimeout(() => {
        const s2 = this._st(id), data = { entity_id: id, temperature: this._pending[id] ? this._pending[id].v : v };
        if (s2 && s2.state === "off") { const m = this._preferredMode(s2, kind); if (m) data.hvac_mode = m; }
        if (this._pending[id]) this._pending[id].t = Date.now();
        this._hass.callService("climate", "set_temperature", data).catch(err => fire(this, "hass-notification", { message: String(err && err.message || err) }));
      }, 700);
    }

    /* ---------- rendering */
    _layers(infos) {
      const L = [];
      if (infos.some(i => i.lightsTotal)) L.push("lights");
      if (infos.some(i => i.temp != null)) L.push("temp");
      if (this._config.rooms.some(r => r.floor_heating)) L.push("floor");
      if (infos.some(i => i.power != null)) L.push("power");
      return L.length ? L : ["lights"];
    }
    _fill(r, i, maxP) {
      const c = this._config;
      switch (this._layer) {
        case "lights": return i.lightsOn ? mix(BASE, AMBER, 0.18 + i.avgBri / 190) : BASE;
        case "temp": return i.temp == null ? BASE : mix("#3d6a92", "#8a4a35", (i.temp - c.temp_range[0]) / (c.temp_range[1] - c.temp_range[0]));
        case "floor":
          if (!r.floor_heating) return BASE;
          if (!i.floorOn) return "#221c19";
          return mix("#2a2118", WARM, i.floorTemp == null ? 0.6 : (i.floorTemp - c.floor_range[0]) / (c.floor_range[1] - c.floor_range[0]));
        default: return i.power == null ? BASE : mix(BASE, "#4f7a63", i.power / maxP);
      }
    }
    _metric(r, i) {
      const t = this._t;
      switch (this._layer) {
        case "lights": return i.lightsTotal ? (i.lightsOn ? t("n_on", { n: i.lightsOn }) : t("m_off")) : "—";
        case "temp": return this._tempStr(i.temp);
        case "floor": return r.floor_heating ? (i.floorOn ? this._tempStr(i.floorTemp) : t("m_off")) : "—";
        default: return i.power == null ? "—" : this._fmt(i.power) + " W";
      }
    }
    _dot(i) { return i.lightsOn ? AMBER : i.acOn ? COOL : i.floorOn ? WARM : "#3a4049"; }
    _rect(g) {
      const c = this._config;
      return `left:${(g.x / c.plan_width * 100).toFixed(3)}%;top:${(g.y / c.plan_height * 100).toFixed(3)}%;width:${(g.w / c.plan_width * 100).toFixed(3)}%;height:${(g.h / c.plan_height * 100).toFixed(3)}%;`;
    }
    _roomStyle(fill, active, geo) {
      return (geo ? this._rect(geo) : "") + `background:${fill};` +
        (active ? `box-shadow:inset 0 0 0 clamp(5px,1.6cqw,9px) ${fill},inset 0 0 0 calc(clamp(5px,1.6cqw,9px) + 3px) ${AMBER};` : "");
    }
    _switch(on, color, avail = true) { return `<div class="sw${on ? " on" : ""}${avail ? "" : " na"}" style="--c:${color}"><i></i></div>`; }

    _render() {
      this._setupLocale();
      const c = this._config, h = this._hass, t = this._t;
      const narrow = (this._w || this.clientWidth || window.innerWidth) < 820;
      this._narrow = narrow;
      const rooms = c.rooms;
      const infos = rooms.map(r => this._info(r));
      const layers = this._layers(infos);
      if (!layers.includes(this._layer)) this._layer = layers[0];
      const selIdx = clamp(this._sel, 0, rooms.length - 1);
      const now = new Date(), hr = now.getHours();
      const maxP = Math.max(1, c.power_max || 0, ...infos.map(i => i.power || 0));
      const names = rooms.map((r, i) => this._roomName(r, i));

      // preserve horizontal scroll positions
      const keep = {};
      ["rtabs", "seg"].forEach(k => { const el = this._wrap.querySelector("." + k); if (el) keep[k] = el.scrollLeft; });

      /* header */
      const temps = infos.map(i => i.temp).filter(v => v != null);
      const lightsOn = infos.reduce((a, i) => a + i.lightsOn, 0), lightsTotal = infos.reduce((a, i) => a + i.lightsTotal, 0);
      const livePower = this._watts(c.power_entity);
      const greet = c.title || t(hr < 12 ? "good_morning" : hr < 18 ? "good_afternoon" : "good_evening");
      let dateLabel;
      try { dateLabel = now.toLocaleDateString(this._lang, { weekday: "long", day: "numeric", month: "long" }); } catch (e) { dateLabel = now.toDateString(); }
      const stats = [];
      if (temps.length) stats.push(`<div class="stat"><div class="l">${esc(t("inside"))}</div><div class="v mono">${this._tempStr(temps.reduce((a, b) => a + b, 0) / temps.length)}</div></div>`);
      if (lightsTotal) stats.push(`<div class="stat"><div class="l">${esc(t("lights_on"))}</div><div class="v mono">${lightsOn}<small> ${esc(t("of"))} ${lightsTotal}</small></div></div>`);
      if (livePower != null) stats.push(`<div class="stat"><div class="l">${esc(t("using_now"))}</div><div class="v a mono">${this._fmt(livePower / 1000, 2)}<small> kW</small></div></div>`);
      const header = `
        <div class="hdr">
          <div class="col" style="gap:4px"><div class="greet">${esc(greet)}</div><div class="sub">${esc(dateLabel)} · ${esc(this._time(now, { hour: "2-digit", minute: "2-digit" }))}</div></div>
          <div class="hdr-r" style="${narrow ? "" : "flex:0 1 auto"}">
            ${stats.length ? `<div class="stats">${stats.join("")}</div>` : ""}
            ${lightsTotal ? `<div class="btn wide" data-act="alloff">${esc(t("all_lights_off"))}</div>` : ""}
          </div>
        </div>`;

      /* scenes */
      let scenesHtml = "";
      if (c.scenes.length) {
        let activeId = null, best = 0;
        for (const s of c.scenes) {
          const st = this._st(s.entity); if (!st) continue;
          const ts = Date.parse(domainOf(s.entity) === "scene" || domainOf(s.entity).endsWith("button") ? st.state : st.attributes.last_triggered) || 0;
          if (ts > best) { best = ts; activeId = s.entity; }
        }
        if (this._lastScene && this._lastSceneAt > best) activeId = this._lastScene;
        if (Date.now() - Math.max(best, this._lastSceneAt || 0) > (c.scene_active_hours ?? 12) * 3600e3) activeId = null;
        scenesHtml = `<div class="sec"><div class="h2">${esc(t("quick_scenes"))}</div><div class="scenes">${c.scenes.map(s => {
          const on = s.entity === activeId;
          return `<div class="scene${on ? " on" : ""}" data-act="scene" data-id="${esc(s.entity)}" data-more="${esc(s.entity)}">
            <div class="top"><div class="n">${esc(this._name(s.entity, s.name))}</div><div class="b">${on ? esc(t("active")) : ""}</div></div>
            ${s.description ? `<div class="d">${esc(s.description)}</div>` : ""}</div>`;
        }).join("")}</div></div>`;
      }

      /* plan */
      const layerLbl = { lights: "layer_lights", temp: "layer_temp", floor: "layer_floor", power: "layer_power" };
      const seg = layers.length > 1 ? `<div class="seg">${layers.map(l => `<div class="${l === this._layer ? "on" : ""}" data-act="layer" data-l="${l}">${esc(t(layerLbl[l]))}</div>`).join("")}</div>` : "";
      const roomInner = (r, i, fill) => {
        const bright = luminance(fill) > 140;
        const badges = [i.lightsOn ? AMBER : null, i.acOn ? COOL : null, i.floorOn ? WARM : null].filter(Boolean);
        return `<div class="n" style="color:${bright ? "#14171c" : "#f2f4f7"}">${esc(names[rooms.indexOf(r)])}</div>
          <div class="m mono" style="color:${bright ? "#2a2f38" : "#c2cad6"}">${esc(this._metric(r, i))}</div>
          <div class="dots">${badges.map(b => `<div class="dot" style="background:${b}"></div>`).join("")}</div>`;
      };
      const hasPlan = rooms.some(r => r.plan);
      let planBody;
      if (hasPlan) {
        let s = `<div class="plan" style="padding-top:${(c.plan_height / c.plan_width * 100).toFixed(3)}%">`;
        rooms.forEach((r, k) => {
          if (!r.annex || !r.plan) return;
          const f = this._fill(r, infos[k], maxP);
          s += `<div class="rm" data-act="room" data-i="${k}" style="${this._roomStyle(f, k === selIdx, r.annex)}"></div>`;
        });
        c.walls.forEach(w => { s += `<div class="wall" style="${this._rect({ x: w[0], y: w[1], w: w[2], h: w[3] })}"></div>`; });
        rooms.forEach((r, k) => {
          if (!r.plan) return;
          const f = this._fill(r, infos[k], maxP);
          s += `<div class="rm" data-act="room" data-i="${k}" style="${this._roomStyle(f, k === selIdx, r.plan)}">${roomInner(r, infos[k], f)}</div>`;
        });
        planBody = s + "</div>";
      } else {
        planBody = `<div class="tiles">${rooms.map((r, k) => {
          const f = this._fill(r, infos[k], maxP);
          return `<div class="rm" data-act="room" data-i="${k}" style="background:${f};${k === selIdx ? `box-shadow:inset 0 0 0 3px ${AMBER};` : ""}">${roomInner(r, infos[k], f)}</div>`;
        }).join("")}</div>`;
      }
      const legend = {
        lights: [t("lg_off"), t("lg_bright"), `linear-gradient(90deg,${BASE},${AMBER})`],
        temp: [`${t("lg_cool")} ${this._fmt(c.temp_range[0])}°`, `${t("lg_warm")} ${this._fmt(c.temp_range[1])}°`, "linear-gradient(90deg,#3d6a92,#8a4a35)"],
        floor: [t("lg_off"), `${this._fmt(c.floor_range[1])}°`, `linear-gradient(90deg,#221c19,${WARM})`],
        power: [t("lg_low"), t("lg_high"), `linear-gradient(90deg,${BASE},#4f7a63)`]
      }[this._layer];
      const lgItems = [];
      if (lightsTotal) lgItems.push([AMBER, t("lg_lights")]);
      if (rooms.some(r => r.climate)) lgItems.push([COOL, t("lg_ac")]);
      if (rooms.some(r => r.floor_heating)) lgItems.push([WARM, t("lg_floor")]);
      const planCard = `
        <div class="card" style="grid-area:plan">
          <div class="cardhead">
            <div class="col" style="gap:3px"><div class="t17">${esc(t("your_home"))}</div><div class="m13">${esc(t("tap_room"))}</div></div>
            ${seg}
          </div>
          ${planBody}
          <div class="legend">
            <div class="lg">${lgItems.map(([col, l]) => `<div><i style="background:${col}"></i>${esc(l)}</div>`).join("")}</div>
            <div class="grad"><div>${esc(legend[0])}</div><b style="background:${legend[2]}"></b><div>${esc(legend[1])}</div></div>
          </div>
        </div>`;

      /* energy */
      const hasEnergy = !!(c.energy_entity || c.power_entity || c.circuits.length);
      let energyCard = "";
      if (hasEnergy) {
        const S = this._stats;
        let chart = "", bigs = "", peakTxt = "";
        if (S && S.bars) {
          const minutes = now.getMinutes() + now.getSeconds() / 60;
          const bars = S.bars.slice();
          let cur = livePower;
          if (cur == null && S.isEnergy) cur = S.curWh / Math.max(minutes / 60, 1 / 60);
          bars[hr] = cur ?? bars[hr];
          for (let k = hr + 1; k < 24; k++) bars[k] = null;
          const maxBar = Math.max(1, ...bars.filter(v => v != null));
          peakTxt = `${esc(t("busiest_hour"))} ${this._fmt(Math.max(...bars.map(v => v || 0)))} W`;
          let kwh = this._kwh(c.energy_today_entity);
          if (kwh == null) {
            const past = S.bars.slice(0, hr).reduce((a, v) => a + (v || 0), 0) / 1000;
            kwh = past + (S.isEnergy ? S.curWh / 1000 : (cur || 0) * minutes / 60 / 1000);
          }
          let cost = this._num(c.cost_entity);
          if (cost == null && c.price != null) cost = kwh * c.price;
          bigs = `<div class="big">
            <div><div class="v mono">${this._fmt(kwh, 1)}<small> kWh</small></div><div class="l">${esc(t("used_so_far"))}</div></div>
            ${cost != null ? `<div><div class="v mono">${esc(this._money(cost))}</div><div class="l">${esc(t("est_cost"))}</div></div>` : ""}
          </div>`;
          chart = `<div class="chart"><div class="grid3"><div></div><div></div><div></div></div><div class="bars">${bars.map((v, k) => {
            const tip = (k === hr ? t("now") : this._hourLabel(k)) + (v != null ? ` · ${this._fmt(v)} W` : "");
            const col = k === hr ? AMBER : "rgba(230,180,92,.35)";
            return `<div class="bar" title="${esc(tip)}"><i style="height:${v != null ? Math.max(1, Math.round(v / maxBar * 100)) : 0}%;background:${col}"></i></div>`;
          }).join("")}</div></div>
          <div class="axis">${[0, 6, 12, 18].map(k => `<span style="left:${(k / 24 * 100).toFixed(2)}%">${esc(this._hourLabel(k))}</span>`).join("")}
            <span style="right:0">${esc(t("now"))} ${esc(this._hourLabel(hr))}</span></div>`;
        } else if (c.energy_entity || c.power_entity) {
          chart = `<div class="empty">${esc(t("no_energy"))}</div>`;
        }
        let circs = "";
        if (c.circuits.length) {
          const vals = c.circuits.map((x, k) => ({ name: this._name(x.entity, x.name), w: this._watts(x.entity), color: x.color || CIRCUIT_COLORS[k % CIRCUIT_COLORS.length], id: x.entity }));
          const cm = Math.max(1, ...vals.map(v => v.w || 0));
          circs = `<div class="h2" style="font-size:13px;padding-top:18px;padding-bottom:10px">${esc(t("using_power"))}</div>
            <div class="col" style="gap:10px">${vals.map(v => `
              <div class="circ tap" data-more="${esc(v.id)}"><div class="n">${esc(v.name)}</div>
                <div class="track"><i style="width:${((v.w || 0) / cm * 100).toFixed(1)}%;background:${v.color}"></i></div>
                <div class="w mono">${v.w == null ? "—" : this._fmt(v.w) + " W"}</div></div>`).join("")}</div>`;
        }
        energyCard = `
          <div class="card" style="grid-area:energy">
            <div class="row" style="flex-wrap:wrap;align-items:baseline"><div class="t17">${esc(t("energy_today"))}</div><div class="m13">${peakTxt}</div></div>
            ${bigs}${chart}${circs}
          </div>`;
      }

      /* selected room */
      const r = rooms[selIdx], inf = infos[selIdx], rn = names[selIdx];
      const statusParts = [];
      if (inf.lightsTotal) statusParts.push(inf.lightsOn ? t("n_of_m_lights", { n: inf.lightsOn, m: inf.lightsTotal }) : t("lights_off"));
      if (inf.hum != null) statusParts.push(`${t("humidity")} ${this._fmt(inf.hum)}%`);
      if (inf.power != null) statusParts.push(`${this._fmt(inf.power)} W`);
      const tabs = `<div class="rtabs">${rooms.map((x, k) => `<div class="rtab${k === selIdx ? " on" : ""}" data-act="rtab" data-i="${k}"><i style="background:${this._dot(infos[k])}"></i><div>${esc(names[k])}</div></div>`).join("")}</div>`;

      const lightsHtml = r.lights.length ? r.lights.map(l => {
        const s = this._st(l.entity), avail = this._avail(s), on = avail && s.state === "on", bri = this._bri(l.entity);
        const sub = !s ? t("not_found") : !avail ? t("st_unavail") : on ? (this._dimmable(l.entity) ? `${t("st_on")} · ${bri}%` : t("st_on")) : t("st_off");
        return `<div class="lt">
          <div class="row tap" data-act="light" data-id="${esc(l.entity)}" data-more="${esc(l.entity)}">
            <div class="col"><div class="n">${esc(this._name(l.entity, l.name, rn))}</div><div class="s" style="color:${on ? AMBER : "#7d8697"}">${esc(sub)}</div></div>
            ${this._switch(on, AMBER, avail)}
          </div>
          ${this._dimmable(l.entity) ? `<div class="dim"><span>${esc(t("dim"))}</span><input type="range" min="1" max="100" value="${on ? bri : (s.attributes.brightness ? Math.round(s.attributes.brightness / 2.55) : 50)}" data-bri="${esc(l.entity)}" aria-label="${esc(this._name(l.entity, l.name, rn))}"><span>${esc(t("bright_lbl"))}</span></div>` : ""}
        </div>`;
      }).join("") : `<div class="muted">${esc(t("no_lights"))}</div>`;

      const climateBlock = (kind, id) => {
        const title = t(kind === "ac" ? "ac" : "floor");
        if (!id) return `<div class="blk"><div class="t17">${esc(title)}</div><div class="muted">${esc(t(kind === "ac" ? "no_ac" : "no_floor"))}</div></div>`;
        const s = this._st(id), color = kind === "ac" ? COOL : WARM;
        if (!s) return `<div class="blk"><div class="t17">${esc(title)}</div><div class="muted">${esc(t("not_found"))}: ${esc(id)}</div></div>`;
        const avail = this._avail(s), on = this._climOn(s), isClim = domainOf(id) === "climate";
        const target = isClim ? this._target(s) : null;
        const tStr = this._tempStr(target, target != null && target % 1 ? 1 : 0);
        let cap;
        if (!avail) cap = t("st_unavail");
        else if (kind === "ac") {
          if (!on) cap = t("st_off");
          else { const k = "m_" + s.state; cap = t(k, { t: tStr }); if (cap === k) cap = this._modeLabel(s, s.state); }
        } else {
          const ft = this._tempStr(inf.floorTemp);
          cap = on ? (inf.floorTemp != null ? t("floor_is", { t: ft }) + (target != null ? " · " + t("heating_to", { t: tStr }) : "") : (target != null ? t("heating_to", { t: tStr }) : t("st_on")))
            : (inf.floorTemp != null ? t("off_floor_is", { t: ft }) : t("st_off"));
        }
        let body = "";
        if (isClim && avail && target != null) {
          const modes = kind === "ac" ? (s.attributes.hvac_modes || []).filter(m => m !== "off") : [];
          body = `<div class="body${on ? "" : " off"}">
            <div class="stepper">
              <div class="round" data-act="clim-step" data-d="-1" data-k="${kind}" data-id="${esc(id)}" aria-label="${esc(t("cooler"))}">−</div>
              <div class="setv"><div class="v mono">${esc(tStr)}</div><div class="l">${esc(t(kind === "ac" ? "target" : "floor_target"))}</div></div>
              <div class="round" data-act="clim-step" data-d="1" data-k="${kind}" data-id="${esc(id)}" aria-label="${esc(t("warmer"))}">+</div>
            </div>
            ${modes.length > 1 ? `<div class="modes" style="grid-template-columns:repeat(${Math.min(modes.length, narrow ? 3 : 5)},minmax(0,1fr))">${modes.map(m =>
              `<div class="${on && s.state === m ? "on" : ""}" data-act="clim-mode" data-m="${esc(m)}" data-id="${esc(id)}">${esc(this._modeLabel(s, m))}</div>`).join("")}</div>` : ""}
          </div>`;
        }
        return `<div class="blk">
          <div class="row tap" data-act="clim-toggle" data-k="${kind}" data-id="${esc(id)}" data-more="${esc(id)}">
            <div class="col"><div class="t17">${esc(title)}</div><div class="m13">${esc(cap)}</div></div>
            ${this._switch(on, color, avail)}
          </div>${body}</div>`;
      };

      const roomCard = `
        <div class="card roomcard">
          ${tabs}
          <div class="rhead">
            <div class="col" style="gap:4px"><div class="rname">${esc(rn)}</div><div class="sub">${esc(statusParts.join(" · "))}</div></div>
            ${inf.temp != null ? `<div class="rtemp mono">${this._tempStr(inf.temp)}</div>` : ""}
          </div>
          <div class="blk">
            <div class="row"><div class="t17">${esc(t("lights"))}</div>
              ${r.lights.length ? `<div class="btn sm" data-act="roomlights">${esc(t(inf.lightsOn ? "turn_all_off" : "turn_all_on"))}</div>` : ""}</div>
            ${lightsHtml}
          </div>
          ${climateBlock("ac", r.climate)}
          ${climateBlock("floor", r.floor_heating)}
        </div>`;

      this._wrap.innerHTML = `<div class="${narrow ? "narrow" : ""}"><div class="root">
        ${header}${scenesHtml}
        <div class="main${hasEnergy ? "" : " noenergy"}">${planCard}${energyCard}${roomCard}</div>
      </div></div>`;

      for (const k in keep) { const el = this._wrap.querySelector("." + k); if (el) el.scrollLeft = keep[k]; }
    }
  }

  /* ---------------------------------------------------------------- editor */
  async function loadHaComponents() {
    if (customElements.get("ha-form") && customElements.get("ha-entity-picker")) return;
    try {
      const helpers = await window.loadCardHelpers();
      const card = await helpers.createCardElement({ type: "entities", entities: [] });
      if (card && card.constructor && card.constructor.getConfigElement) await card.constructor.getConfigElement();
    } catch (e) { /* editor will still try to render */ }
  }

  class HomeDashboardCardEditor extends HTMLElement {
    setConfig(config) {
      this._config = JSON.parse(JSON.stringify(config || {}));
      if (!Array.isArray(this._config.rooms)) this._config.rooms = [];
      this._sync();
    }
    set hass(hass) {
      this._hass = hass;
      this._t = makeT(langOf(hass, this._config));
      if (!this._built) this._build();
      else this.querySelectorAll("ha-form").forEach(f => { f.hass = hass; });
    }
    connectedCallback() { loadHaComponents().then(() => { this._built = false; this._build(); }); }

    _label(s) { return this._t ? this._t("e_" + s.name) : s.name; }
    _generalSchema() {
      const t = this._t;
      return [
        { name: "title", selector: { text: {} } },
        { name: "language", selector: { select: { mode: "dropdown", options: [{ value: "auto", label: t("e_auto") }, ...Object.entries(LANG_NAMES).map(([value, label]) => ({ value, label }))] } } },
        { name: "power_entity", selector: { entity: { filter: { domain: "sensor", device_class: "power" } } } },
        { name: "energy_entity", selector: { entity: { filter: { domain: "sensor", device_class: "energy" } } } },
        { name: "energy_today_entity", selector: { entity: { filter: { domain: "sensor", device_class: "energy" } } } },
        { name: "cost_entity", selector: { entity: { filter: { domain: "sensor" } } } },
        { name: "price", selector: { number: { min: 0, max: 10, step: 0.001, mode: "box" } } },
        { name: "scenes", selector: { entity: { multiple: true, filter: [{ domain: "scene" }, { domain: "script" }, { domain: "button" }, { domain: "input_button" }] } } },
        { name: "circuits", selector: { entity: { multiple: true, filter: { domain: "sensor", device_class: "power" } } } },
        { type: "grid", name: "", schema: [
          { name: "plan_width", selector: { number: { min: 50, max: 5000, mode: "box" } } },
          { name: "plan_height", selector: { number: { min: 50, max: 5000, mode: "box" } } }
        ] }
      ];
    }
    _roomSchema() {
      const t = this._t, temp = { entity: { filter: { domain: "sensor", device_class: "temperature" } } };
      const box = name => ({ type: "expandable", name, title: t("e_" + name), schema: [{ type: "grid", name: "", schema: ["x", "y", "w", "h"].map(k => ({ name: k, selector: { number: { min: 0, max: 5000, mode: "box" } } })) }] });
      return [
        { type: "grid", name: "", schema: [{ name: "name", selector: { text: {} } }, { name: "area", selector: { area: {} } }] },
        { name: "lights", selector: { entity: { multiple: true, filter: [{ domain: "light" }, { domain: "switch" }] } } },
        { type: "grid", name: "", schema: [
          { name: "temperature", selector: temp },
          { name: "humidity", selector: { entity: { filter: { domain: "sensor", device_class: "humidity" } } } }
        ] },
        { name: "climate", selector: { entity: { filter: { domain: "climate" } } } },
        { type: "grid", name: "", schema: [
          { name: "floor_heating", selector: { entity: { filter: [{ domain: "climate" }, { domain: "switch" }, { domain: "input_boolean" }] } } },
          { name: "floor_temperature", selector: temp }
        ] },
        { name: "power", selector: { entity: { filter: { domain: "sensor", device_class: "power" } } } },
        box("plan"), box("annex")
      ];
    }
    _ids(list) { return (list || []).map(x => typeof x === "string" ? x : x && x.entity).filter(Boolean); }
    _keepObjs(oldList, ids) {
      const map = {};
      (oldList || []).forEach(x => { if (x && typeof x === "object" && x.entity) map[x.entity] = x; });
      return (ids || []).map(id => map[id] || id);
    }
    _generalData() {
      const c = this._config;
      return { title: c.title, language: c.language || "auto", power_entity: c.power_entity, energy_entity: c.energy_entity,
        energy_today_entity: c.energy_today_entity, cost_entity: c.cost_entity, price: c.price,
        scenes: this._ids(c.scenes), circuits: this._ids(c.circuits), plan_width: c.plan_width ?? 600, plan_height: c.plan_height ?? 500 };
    }
    _roomData(r) { return { ...r, lights: this._ids(r.lights) }; }

    _build() {
      if (!this._hass || !this._config || !customElements.get("ha-form")) return;
      this._built = true;
      const t = this._t;
      this.innerHTML = `<style>
        .hdce{display:flex;flex-direction:column;gap:16px}
        .hdce h3{margin:8px 0 0;font-size:16px;font-weight:500}
        .hdce .rooms{display:flex;flex-direction:column;gap:8px}
        .hdce .rm-actions{display:flex;justify-content:flex-end;padding:8px 0 4px}
        .hdce button{font:inherit;font-size:14px;padding:8px 14px;border-radius:8px;cursor:pointer;border:1px solid var(--divider-color,#555);
          background:transparent;color:var(--primary-text-color)}
        .hdce button.add{border-color:var(--primary-color);color:var(--primary-color)}
        .hdce button.del{color:var(--error-color,#db4437);border-color:var(--error-color,#db4437)}
        .hdce .hint{font-size:12px;color:var(--secondary-text-color)}
        .hdce ha-expansion-panel{--expansion-panel-content-padding:0 12px 8px}
      </style><div class="hdce">
        <h3>${esc(t("e_general"))}</h3><div class="general"></div>
        <h3>${esc(t("e_rooms"))}</h3><div class="rooms"></div>
        <div><button class="add">+ ${esc(t("e_add_room"))}</button></div>
        <div class="hint">${esc(t("e_yaml_hint"))}</div></div>`;
      const g = document.createElement("ha-form");
      g.hass = this._hass; g.schema = this._generalSchema(); g.data = this._generalData();
      g.computeLabel = s => this._label(s);
      g.addEventListener("value-changed", e => this._generalChanged(e.detail.value));
      this.querySelector(".general").appendChild(g);
      this._gForm = g;
      this.querySelector(".add").addEventListener("click", () => {
        this._config.rooms.push({ name: t("e_new_room") + " " + (this._config.rooms.length + 1), lights: [] });
        this._emit(); this._buildRooms();
      });
      this._buildRooms();
    }
    _buildRooms() {
      const host = this.querySelector(".rooms");
      if (!host) return;
      host.innerHTML = "";
      this._rForms = [];
      this._config.rooms.forEach((r, i) => {
        const p = document.createElement("ha-expansion-panel");
        p.outlined = true; p.header = r.name || `#${i + 1}`;
        const f = document.createElement("ha-form");
        f.hass = this._hass; f.schema = this._roomSchema(); f.data = this._roomData(r);
        f.computeLabel = s => this._label(s);
        f.addEventListener("value-changed", e => this._roomChanged(i, e.detail.value, f, p));
        const act = document.createElement("div");
        act.className = "rm-actions";
        act.innerHTML = `<button class="del">${esc(this._t("e_remove"))}</button>`;
        act.querySelector("button").addEventListener("click", () => { this._config.rooms.splice(i, 1); this._emit(); this._buildRooms(); });
        p.appendChild(f); p.appendChild(act); host.appendChild(p);
        this._rForms.push({ f, p });
      });
    }
    _sync() {
      if (!this._built) return;
      if (this._gForm) this._gForm.data = this._generalData();
      if (!this._rForms || this._rForms.length !== this._config.rooms.length) return this._buildRooms();
      this._config.rooms.forEach((r, i) => { this._rForms[i].f.data = this._roomData(r); this._rForms[i].p.header = r.name || `#${i + 1}`; });
    }
    _generalChanged(v) {
      const c = this._config;
      for (const k of ["title", "power_entity", "energy_entity", "energy_today_entity", "cost_entity", "price", "plan_width", "plan_height"]) c[k] = v[k];
      c.language = v.language && v.language !== "auto" ? v.language : undefined;
      c.scenes = this._keepObjs(c.scenes, v.scenes);
      c.circuits = this._keepObjs(c.circuits, v.circuits);
      if (c.language !== this._lastLang) { this._lastLang = c.language; this._t = makeT(langOf(this._hass, c)); this._emit(); this._built = false; return this._build(); }
      this._emit();
    }
    _roomChanged(i, v, form, panel) {
      const old = this._config.rooms[i] || {};
      const r = { ...old, ...v, lights: this._keepObjs(old.lights, v.lights) };
      for (const k of ["plan", "annex"]) {
        if (r[k] && ["x", "y", "w", "h"].every(q => r[k][q] == null || r[k][q] === "")) delete r[k];
      }
      if (v.area && v.area !== old.area) {
        const empty = !(old.lights && old.lights.length) && !old.climate && !old.floor_heating && !old.temperature;
        if (empty) Object.assign(r, areaEntities(this._hass, v.area));
        const a = this._hass.areas && this._hass.areas[v.area];
        if (a && (!old.name || /^(.*\s)?\d+$/.test(old.name))) r.name = a.name;
        form.data = this._roomData(r);
      }
      this._config.rooms[i] = r;
      panel.header = r.name || `#${i + 1}`;
      this._emit();
    }
    _clean(obj) {
      if (Array.isArray(obj)) return obj.map(x => this._clean(x));
      if (obj && typeof obj === "object") {
        const o = {};
        for (const [k, v] of Object.entries(obj)) {
          if (v === undefined || v === null || v === "") continue;
          if (Array.isArray(v) && !v.length && k !== "rooms" && k !== "lights") continue;
          o[k] = this._clean(v);
        }
        return o;
      }
      return obj;
    }
    _emit() { fire(this, "config-changed", { config: this._clean(this._config) }); }
  }

  if (!customElements.get("home-dashboard-card")) customElements.define("home-dashboard-card", HomeDashboardCard);
  if (!customElements.get("home-dashboard-card-editor")) customElements.define("home-dashboard-card-editor", HomeDashboardCardEditor);
  window.customCards = window.customCards || [];
  if (!window.customCards.some(c => c.type === "home-dashboard-card")) {
    window.customCards.push({ type: "home-dashboard-card", name: "Home Dashboard Card", preview: true,
      description: "Floor-plan home dashboard: lights, AC, floor heating, energy and scenes." });
  }
  console.info(`%c HOME-DASHBOARD-CARD %c v${VERSION} `, "background:#e6b45c;color:#0e1013;font-weight:700", "background:#14171c;color:#e9ecf1");
})();

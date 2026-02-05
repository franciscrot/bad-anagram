const ALLOWED_REUSE = new Set([
  "a", "the", "of", "by", "it", "in", "as", "for", "are", "if", "them", "he", "she", "his", "her",
]);

function parseWordPool(raw, splitter = /\s+/) {
  return raw
    .split(splitter)
    .map((word) => word.trim().toLowerCase())
    .map((word) => word.normalize("NFD").replace(/[̀-ͯ]/g, ""))
    .map((word) => word.replace(/^[^a-z]+|[^a-z'-]+$/g, ""))
    .filter((word) => /^[a-z][a-z'-]*$/.test(word));
}

const BASE_WORD_POOL_RAW = String.raw`
a ash alarm arm alm aleph able about above act actor acute adapt admit after again agent agree ahead air alert alpha also amber among angle ankle apple apron arena arise around aside atom attic audio aura avoid awake axis badge baker basic basin beach beacon beaker beard begin being berry beyond black blade blaze blend balm blood bead brief bough bale balefire bloom blush bloom bonus bound brave brick bridge brisk bronze cabin cable camel candy canon carve cause cedar chain chair chalk charm chase check chest chief choir chore civic claim class clean clear clerk clock close cloud coast cocoa comet camber candle candlelit candelabra crow caul coral couch count craft crane crest crowd crown cycle daily dance datum dawn dealer delta denim depth devil deer dart delta devise dweomer dale dandle diary diner drift drive eager eagle early earth easier elbow elder elect elite ember enjoy enter epoch eel elm elk equal error essay ether ethic event every exact exile extra faun fawn fey fire fretted fen faith fancy favor fiber field fiery final flame flash fleet flora focus force forge frame fresh front frost fruit gamma garden gather giant given glass globe glory grace grain grand grant graph green grove ghee glam ghoul garden guard guide habit happy harbor haven heart hedge hello hence honor house human humor ideal image index inner input ivory jelly judge juice knife known labor laser later layer learn lemon level light limit linear logic lucky lunar magic maker manor maple march marina marker matter meadow metal meter micro might minor model money month moral motor mount movie music narrow native nectar nerve never noble noise north novel ocean often olive opera orbit other panel paper party peace pearl pedal phase phone purl pixel pixie pale painterly poise petite piano piece pilot pine pitch plain planet plaza poet point polar power press prime prior prize pulse queen quick quiet radio raise rapid raven reach ready realm relay renew rider river robin robust roman route royal rural scale scene scope score scout sense serve shade shadow shape share shelf shift shine shore short signal silver simple skill slate sleep slice smart smile smoke solid sound spark spice spirit split spell spellcaster seed soften sweetness sauna staple stent skink sport spring square stable stage stair stand steam steel stone storm story strand stream style sugar sunny table teach tempo thank theme thorn throw tiger token tone torch total tower trace track trail trend trial tribe trust union unity urban value vapor verse vital vivid vocal voice wagon watch water wheat wider window world worth woven writer yellow young youth zesty
`.trim();

const BASE_WORD_POOL_EXPANSION_RAW_1 = String.raw`
bramble bran branch Brandenburg branding brandishing bras brass brat brats bravado bravo bravoure brawl brawn brawn brawny Braxton bray braying Brazen brazier brazier bread breakdown breaker breakwater breastplate breastwork breech breeder breezy Bremen brescia Bret Brett breviary brew brewed brewer brewery Brewmaster bri briar Briarheart bric-a-brac bridesmaid briefs brier brigadier brigand Brigand brigantine brightens Brightsteel brimstone Brimstone brine brink Brit Britannia Britannica broach broaden broadest broadsword brogue broil broken-down bromide bronchitis brooch brooch broods brook broom broomstick brothel brownie brownish browse browser bruges bruising bruit brunette brusque brutish buccaneer buckle buckler Buckler buckskin buckwheat budge buff buffer buffet buffeted buffoon bugbear bulbous bulge bulkhead bulldog bullying bum bump bumper bun bunsen bunting buoy buoyancy burdensome burdett bureaucracy Burgess burgher burglar burglary burgomaster Burma burman Burmese burner burrow burrows Bursley bus Bushel businesses businesslike busted busts butch butcher's butchers butte buttermilk buttocks buttonhole buxom buzzard bygones bystander byte cabal cabaret cabriolet Cacao cache cacique cactus cad cadaverous Caeli Caelum cairn caitiff cajole calabash Calabria calamitous calcium calculus calibre caller callow Caltrop calvary calvinist calyx cam Cambrian cameo cameras camp follower Campania campfire campus canaller canary cancel cancelled candelabra candidacy candied canine canister cannibal cannibalism canning cannonade cannonading cannoneer canny canon Canon canonical canteen canter canticle canticles canto cantor Cantref Cantref canvassing caoutchouc capa capabilities capability caparisoned Caped hoods caper capillary capitalism capitol capitulate capriciously capsized capstan capsule Captain caption captious captivate captor capuchin caracalla Caracas carbine carbolic carboniferous cardinal Cardinal Virtues caretaker careworn Caribbean caribou Carinthia carmine carnation carnival carnivorous carouse carp carrion carrot Cart-load cartel cartilage cartoon cartoon cartridge cartwright carucate carver cascade cashed cashier cashmere casing casino casque Cassandra cassock castaway castle castor casualty casuistry casuistry cataclysm Catacomb catacombs catalogues Catalonia Catapult catarrh cate catechism caterpillar catgut Cathay Cathedral Church Cathedral Close cattleman caucasian Caucasus caucus cauldron Cauldron cauliflower causal causation Cave cavernous cavil cede celerity celibacy celibate Cellarer cellular celt Celts censor censorship centaur centralization centurion cereal cerebral ceres certify certitude cession Cesspit chafe chaldea chaldean chalice Chalice chalked challenging Chamber Chamberlain chamois champerty champing Champion championship Chancellor chancery chandelier chandelle chandler changeable Chantry Chapel chantry priest Chaos chaotic chaparral chaplain chaplet chapman
`.trim();

const BASE_WORD_POOL_EXPANSION_1 = parseWordPool(BASE_WORD_POOL_EXPANSION_RAW_1);




const BASE_WORD_POOL_EXPANSION_RAW_2 = String.raw`
hilltop Himalayas hinge hinged Hinterlands hinting hippopotamus historically histrionic HIV hives hoar hoarfrost Hoard hoarding hoax Hobart hobble hobo hock hodge hoes hogshead holier holler Hollow holly holster Holy Homage home-made homesickness homespun homicide homily hominem homo homogeneous Honduras honeycomb honeysuckle honneur Honolulu Honor Honor Honor Honorguard hood Hoods hook Hook or Crook Hook or Crook hoops hoot hoover hopper hopping hops Horn horny Horologist Horology horoscope horreurs horse trainer horsehair horseshoe horus Hosea hosiery hostage hostel hostelry hostler hôte hottentot houseboat householder houseless housework housing Housteads how's Howden howitzer howls hu hub huddle Hue and Cry Hue and Cry huh hulk humanitarian humanities humans humdrum humid humidity humiliate humorously hump humped hun hunch Hundred hundredweight Hundredweight Hunter hunter Huntington Huntress hunts huntsman Hurd hurrah hurries husbandman husk hussar hussy hustle hw hyacinth hybrid hydra Hydralith Overcast overcrowded overdo overdone overdue overhaul overhear overlaid overlap overlay overloaded Overlord overpower overran overrated override overruling overrunning overseas overshadow oversight overt overtakes overthrew overtime overture Overture overturn overweening overworked ovum Ow oxfordshire Oxgang oxidation oyendo Oyer et terminer oynter oyster raker oysterer pacify pact paddling paddock padlock paganism pagoda painstaking painter paired pajamas pakistan Paladin palanquin palatable palatial Palatinate palaver Palermo palette pali palisade palisades pallet palliate palliation palma palmer palmy palomino palpitation palsy panacea Panacea pandemonium pander panegyric Pangea Pannage panoply pansies pant pantheism pantheon Pantheon pap papacy papered paprika papyrus paraffin paragon Paragon Paraguay parallelogram paralyze paramour paraphernalia paraphrase parasite parasitic Parchment pard pardoner pare parenthesis Pariah parish priest parity parked parker parlance parochial parody parry parsimonious parsimony partaken partakes participating participle parvenu pasha passable Passage passageway passer passer-by passim passively passover pasty patchwork pate pater paternity pathological pathology patio patois patrimony patriot's patrol patronize patter paucity Pauldron paulo paunch pave pavia pawnbroker Payage pc PCB pe pea peacemaker peaked peanuts pearl pease pease peat péché Peck pecking pedagogue pedal pedant pedantic pedantry peddler peddler pedestrian peeps peer peerage pegasus peine Peleus pelf pell-mell pellucid pelt pelvis pendulous penguin penis penitentiary penknife penmanship pennant pennon pennons pent-up Pentateuch Pentecost Penumbral Penumbramancer Penumbramancy penury peppermint perambulator perceptive percer percussion pere perforated perfunctory Perilous periodically perishable perishes perjury permissible peroration perpetrator perplex pers persephone persona personification personnel perspicacity perspicuity pert pertain Perth pertinacious pertinacity pertinent Perugia peruse perusing pervade perversion pervert pesos pessimist pessimistic pest pestilent pestle pests petal peterborough petiole petit petite petrograd petrol pets petting petulant pewter Ph.D. phaeton phalanx phantasm Phantasmal phantasy pheasant phenomenal phial philanthropist Philemon Philistines phillip philology philosopher philosophiques phlegm phlegmatic Phoenicia phoenix phonetic phonograph phosphate phosphorescence
`.trim();

const BASE_WORD_POOL_EXPANSION_0 = parseWordPool(BASE_WORD_POOL_RAW);

const BASE_WORD_POOL_EXPANSION_2 = parseWordPool(BASE_WORD_POOL_EXPANSION_RAW_2);


const BASE_WORD_POOL_EXPANSION_RAW_3 = String.raw`
abaft abandons abase abased abasement abatement abating abbess abbeys abbot abbots abbreviated abbreviation abbreviations abby abdicate abdicated abdication abdominal abduction abdul abdullah abed abelard abélard aberration aberrations abetted abeyance abhorrent abhors abides abigail abjectly abjure abjured ablaze able-bodied abler ablution ablutions abnegation abnormally abolishing abolitionist abolitionists abominably abominate aborigines abortion abortive abridge abridged abridgment abrogated abruptness abscess absences absent-minded absented absentee absinthe absolutism absolve absolved absorbs abstaining abstemious abstention abstractedly abstractions abstruse abusive abysmal abyss abyssinia abyssinian acacia academical academies acater accede acceded accelerate accelerated acceleration accented accentuated acceptation access accessions accessory acclaim acclaimed acclamation accommodating accomplishes accordant accorde accords accost accountant accoutred accoutrements accredited accrue accrued accruing accumulates accuses accustom ace acetic achieves acidity ackerman acknowledgement acme acolyte acorn acquaintanceship acquirement acquittal acrid acrimonious acrimony acropolis actuality acumen adage adamant adamantine adder additionally adduce adele aden adept adherent adhesion adhesive adjourn adjournment adjunct adjuration adjutant administrator administrators admiralty admissible admittedly admixture admonish adobe adolescence adolescent adolf adolph adorer adores adown adroitly adulation adulterous adventitious adventuress adverb adverbs advert adverted advertise advisability advises advocacy advocating
`.trim();

const BASE_WORD_POOL_EXPANSION_3 = parseWordPool(BASE_WORD_POOL_EXPANSION_RAW_3);

const WORD_POOL = Array.from(new Set([
  ...BASE_WORD_POOL_EXPANSION_0,
  ...BASE_WORD_POOL_EXPANSION_1,
  ...BASE_WORD_POOL_EXPANSION_2,
  ...BASE_WORD_POOL_EXPANSION_3,
]));

const sourceInput = document.getElementById("source");
const output = document.getElementById("output");
const solveBtn = document.getElementById("solve");
const rerollBtn = document.getElementById("reroll");
const statusIndicator = document.getElementById("status-indicator");

let lastChunks = [];

function showWorkingIndicator() {
  statusIndicator?.classList.add("visible");
}

function hideWorkingIndicator() {
  statusIndicator?.classList.remove("visible");
}

function waitForPaint() {
  return new Promise((resolve) => requestAnimationFrame(() => resolve()));
}

function tokenizeParagraph(text) {
  return (text.toLowerCase().match(/[a-z']+/g) || []).filter(Boolean);
}

function buildChunks(text) {
  const words = tokenizeParagraph(text);
  const chunks = [];

  for (let i = 0; i < words.length;) {
    const chunk = [];
    let letters = 0;

    while (i < words.length && chunk.length < 6) {
      const next = words[i];
      chunk.push(next);
      letters += next.replace(/[^a-z]/g, "").length;
      i += 1;

      if (chunk.length >= 4) {
        if (letters >= 20) break;
        if (letters >= 10 && (letters >= 14 || chunk.length >= 5)) break;
        if (chunk.length === 6) break;
      }
    }

    if (chunk.length > 0) chunks.push(chunk);
  }

  if (chunks.length > 1 && chunks[chunks.length - 1].length < 4) {
    const tail = chunks[chunks.length - 1];
    const prev = chunks[chunks.length - 2];

    while (tail.length < 4 && prev.length > 4) {
      tail.unshift(prev.pop());
    }

    if (tail.length < 4) {
      prev.push(...tail);
      chunks.pop();
    }
  }

  return chunks;
}

function letterBag(words) {
  const bag = new Map();
  for (const ch of words.join("").replace(/[^a-z]/g, "")) {
    bag.set(ch, (bag.get(ch) || 0) + 1);
  }
  return bag;
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickCandidateWord(bag, availableWords) {
  const sampleSize = Math.min(180, availableWords.length);
  const shortlist = [];

  for (let i = 0; i < sampleSize; i += 1) {
    const w = availableWords[Math.floor(Math.random() * availableWords.length)];
    let overlap = 0;
    let subCost = 0;

    for (const ch of w) {
      if ((bag.get(ch) || 0) > 0) overlap += 1;
      else subCost += 1;
    }

    if (overlap === 0 && subCost > 1) continue;
    const score = (overlap * 2) - subCost;

    shortlist.push({ w, score, subCost });
  }

  if (shortlist.length === 0) return null;

  shortlist.sort((a, b) => (b.score - a.score) || (a.subCost - b.subCost));
  return randomChoice(shortlist.slice(0, 10)).w;
}

function splitIntoRandomWords(letters) {
  const pieces = [];
  let i = 0;

  while (i < letters.length) {
    const size = Math.min(letters.length - i, 3 + Math.floor(Math.random() * 3));
    pieces.push(letters.slice(i, i + size));
    i += size;
  }

  return pieces;
}

function fallbackRandomAnagram(chunk) {
  const letters = chunk.join("").replace(/[^a-z]/g, "").split("");

  for (let i = letters.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }

  return `${splitIntoRandomWords(letters.join("")).join(" ")} (??)`;
}

function generateApproxAnagram(chunk) {
  const forbidden = new Set(
    chunk.filter((word) => !ALLOWED_REUSE.has(word))
  );
  const sourceBag = letterBag(chunk);
  const targetLength = Math.min(6, Math.max(4, chunk.length));
  const availableWords = WORD_POOL.filter((w) => !forbidden.has(w) || ALLOWED_REUSE.has(w));

  let best = null;

  for (let attempt = 0; attempt < 320; attempt += 1) {
    const bag = new Map(sourceBag);
    const phrase = [];
    let substitutions = 0;

    for (let i = 0; i < targetLength; i += 1) {
      const pick = pickCandidateWord(bag, availableWords);
      if (!pick) break;

      phrase.push(pick);

      for (const ch of pick) {
        const current = bag.get(ch) || 0;
        if (current > 0) bag.set(ch, current - 1);
        else substitutions += 1;
      }

      if (substitutions > 5) break;
    }

    if (phrase.length < 4) continue;
    const omissions = Array.from(bag.values()).reduce((sum, n) => sum + n, 0);
    const edits = omissions + substitutions;

    if (!best || edits < best.edits) best = { phrase: phrase.join(" "), edits };
    if (edits <= 5) return { phrase: phrase.join(" "), edits, fallback: false };
  }

  if (!best || best.edits > 5) {
    return { phrase: fallbackRandomAnagram(chunk), edits: "??", fallback: true };
  }

  return { phrase: best.phrase, edits: best.edits, fallback: false };
}

function renderInterleaved(chunks) {
  if (chunks.length === 0) {
    output.innerHTML = '<div class="empty">No chunks generated yet.</div>';
    return;
  }

  const rows = chunks.map((chunk) => {
    const original = chunk.join(" ");
    const result = generateApproxAnagram(chunk);
    const editReadout = result.fallback ? "??" : `~${result.edits}`;

    return `
      <tr>
        <td>
          <div>${original}</div>
          <div><strong>${result.phrase}</strong></div>
        </td>
        <td class="edits-col">${editReadout}</td>
      </tr>
    `;
  }).join("");

  output.innerHTML = `
    <table>
      <thead>
        <tr><th>Chunk + Approximate Anagram</th><th class="edits-col">Approx. edits</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

async function solveFromInput() {
  const text = sourceInput.value.trim();
  if (!text) {
    output.innerHTML = '<div class="empty">Please paste some text first.</div>';
    hideWorkingIndicator();
    return;
  }

  showWorkingIndicator();
  await waitForPaint();
  lastChunks = buildChunks(text);
  renderInterleaved(lastChunks);
  hideWorkingIndicator();
}

solveBtn.addEventListener("click", solveFromInput);

rerollBtn.addEventListener("click", async () => {
  if (lastChunks.length === 0) {
    await solveFromInput();
    return;
  }

  showWorkingIndicator();
  await waitForPaint();
  renderInterleaved(lastChunks);
  hideWorkingIndicator();
});

sourceInput.value = "I have visited him again and found him sitting in a corner brooding. When I came in he threw himself on his knees before me and implored me to let him have a cat; that his salvation depended upon it.";

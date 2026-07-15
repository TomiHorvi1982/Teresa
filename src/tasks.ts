import { Task } from './types';

export const TASKS: Task[] = [
  // Fáze 1: Teplo domova (Nostalgie & Vděčnost)
  {
    id: 'f1_1',
    phaseId: 1,
    type: 'question',
    target: 'partnerA',
    text: '{A}, jaký byl moment, kdy jsi poprvé věděl/a, že jste s {B} víc než jen kamarádi? Poděl se o ty pocity a detaily.',
    description: 'Vzpomeň si na vůni vzduchu, na to, co měl partner na sobě, nebo na první zrychlený tlukot srdce.'
  },
  {
    id: 'f1_2',
    phaseId: 1,
    type: 'question',
    target: 'partnerB',
    text: '{B}, vzpomeň si na nejbláznivější nebo nejvtipnější zážitek, který jste spolu zažili na cestách nebo v začátcích. Popiš, co tě na něm dodnes rozesměje.',
    description: 'Smích byl vždy vaším pojítkem. Oživte tu lehkost, kterou v sobě stále máte.'
  },
  {
    id: 'f1_3',
    phaseId: 1,
    type: 'ritual',
    target: 'both',
    text: 'Dívejte se jeden druhému do očí a střídavě si řekněte tři věci, za které jste ve společném životě nejvíc vděční.',
    description: 'Nechte slova plynout pomalu. Bez ohledu na to, kam jdete, toto nikdo nevymaže.'
  },
  {
    id: 'f1_4',
    phaseId: 1,
    type: 'question',
    target: 'partnerA',
    text: '{A}, která společná píseň, film, nebo vůně ti navždy bude připomínat ty nejkrásnější společné chvíle s {B}? Proč právě tato?',
    description: 'Pokud máte možnost a chuť, můžete si tuto skladbu pustit jako podkres pro zbytek večera.'
  },
  {
    id: 'f1_5',
    phaseId: 1,
    type: 'question',
    target: 'partnerB',
    text: '{B}, jaký společný drobný zvyk nebo rituál jsi měl/a nejraději? (Např. ranní káva v posteli, líné neděle, tajné stisky rukou...)',
    description: 'Zvyky tvoří mapu našeho společného světa. Oslavte ty malé momenty.'
  },
  {
    id: 'f1_6',
    phaseId: 1,
    type: 'question',
    target: 'partnerA',
    text: '{A}, vzpomeň si na chvíli, kdy tě {B} nejvíce podpořil/a nebo ti dodal/a odvahu, když ti bylo těžko. Poděkuj mu/jí za ten konkrétní okamžik.',
    description: 'Dotkněte se jeho/její ruky a nechte vděčnost zahřát prostor mezi vámi.'
  },
  {
    id: 'f1_7',
    phaseId: 1,
    type: 'question',
    target: 'partnerB',
    text: '{B}, který kout vašeho domova nebo společného světa pro tebe měl největší kouzlo a proč? Jaké vzpomínky tam zůstanou uložené?',
    description: 'Zdi slyšely váš smích i šepot. Vzdejte úctu místu, které vás chránilo.'
  },
  {
    id: 'f1_8',
    phaseId: 1,
    type: 'question',
    target: 'partnerA',
    text: '{A}, kdyby tvé dnešní já mohlo poslat krátký vzkaz tvému mladšímu já v den, kdy jste se s {B} poprvé potkali, co bys mu o vaší společné cestě s láskou vzkázal/a?',
    description: 'Bez výčitek, jen s moudrostí času, který jste spolu prožili.'
  },
  {
    id: 'f1_9',
    phaseId: 1,
    type: 'touch',
    target: 'partnerB',
    text: '{B}, jemně pohlaď {A} po tváři a řekni mu/jí, v čem se za ty společné roky podle tebe nejvíce posunul/a do krásy, zralosti a vnitřní síly.',
    description: 'Vnímej teplo pokožky pod svými prsty, když tato upřímná slova vyslovuješ.'
  },
  {
    id: 'f1_10',
    phaseId: 1,
    type: 'question',
    target: 'both',
    text: 'Který dárek – ať už koupený, vlastnoručně vyrobený, nebo darovaný v podobě nečekaného gesta – vám od toho druhého udělal největší radost a nosíte ho v srdci?',
    description: 'Podělte se oba o své odpovědi. Připomeňte si štěstí z dávání.'
  },

  // Fáze 2: Jiskření (Hry & Doteky)
  {
    id: 'f2_1',
    phaseId: 2,
    type: 'touch',
    target: 'partnerA',
    text: '{A}, zavři oči. Po dobu 1 minuty jemně přejížděj bříšky prstů po krku, klíčních kostech a ramenou {B}. Vnímej každé zachvění. Pak se {B} vystřídá.',
    description: 'Žádný spěch. Doteky jsou teď vaším jazykem. Soustřeďte se pouze na přítomný vjem.'
  },
  {
    id: 'f2_2',
    phaseId: 2,
    type: 'ritual',
    target: 'both',
    text: 'Pohledová meditace: Dívejte se jeden druhému do očí po dobu 1 minuty bez mluvení. Pokuste se očima a mírným úsměvem vyjádřit beze slov: „Děkuji ti za všechno, co jsi pro mě.“',
    description: 'Oči jsou oknem do duše. Nechte napětí opadnout a dovolte si být zranitelní a blízcí.'
  },
  {
    id: 'f2_3',
    phaseId: 2,
    type: 'touch',
    target: 'partnerB',
    text: '{B}, jemně rozpusť {A} vlasy (pokud je má sepnuté) nebo mu/jí pomalu pročínej vlasy prsty a masíruj pokožku hlavy. Dělej to s plnou pozorností.',
    description: 'Masáž hlavy uvolňuje napětí z celého dne. Nechte partnera vydechnout a zavřít oči.'
  },
  {
    id: 'f2_4',
    phaseId: 2,
    type: 'touch',
    target: 'partnerA',
    text: '{A}, vezmi ruku {B} do svých dlaní. Pomalu masíruj každý prst, klouby, zápěstí a střed dlaně. Můžeš u toho použít kapku krému nebo oleje.',
    description: 'Ruce, které spolu stavěly domov, si zaslouží tu nejjemnější péči. Vnímej texturu a teplo.'
  },
  {
    id: 'f2_5',
    phaseId: 2,
    type: 'question',
    target: 'partnerB',
    text: '{B}, zašeptej {A} do ucha tři věci, které tě na něm/ní fyzicky nejvíce přitahovaly, když jste se poprvé viděli – a které tě přitahují dodnes.',
    description: 'Šepot má neuvěřitelnou sílu. Přibliž se těsně k uchu, tvůj dech by měl polechtat kůži.'
  },
  {
    id: 'f2_6',
    phaseId: 2,
    type: 'ritual',
    target: 'both',
    text: 'Lehněte si k sobě na bok tak blízko, aby se vaše čela jemně dotýkala. Zavřete oči a synchronizujte svůj dech – nadechujte se a vydechujte společně po dobu 10 klidných dechů.',
    description: 'Vaše těla se dokonale znají. Nechte je splynout v jednom klidném rytmu.'
  },
  {
    id: 'f2_7',
    phaseId: 2,
    type: 'touch',
    target: 'partnerA',
    text: '{A}, polož svou dlan na srdce {B}. Zavři oči a vnímej jeho tlukot pod svými prsty. Popiš jedním slovem pocit, který to v tobě právě teď vyvolává.',
    description: 'Tlukot srdce je nejupřímnější rytmus života. Pak si role vyměňte.'
  },
  {
    id: 'f2_8',
    phaseId: 2,
    type: 'touch',
    target: 'partnerB',
    text: '{B}, lehce kousni {A} do ušního lalůčku a pak mu/jí teplým dechem zašeptej něco hravého nebo jemně provokativního, co jsi mu/jí už velmi dlouho neřekl/a.',
    description: 'Zažehněte jiskru zvědavosti a touhy. Nechte mrazení projít po celé páteři.'
  },
  {
    id: 'f2_9',
    phaseId: 2,
    type: 'ritual',
    target: 'both',
    text: 'Přejíždějte si navzájem dlaněmi po pažích – od konečků prstů až k ramenům. Nejprve velmi jemně, jen lehkým chmýřím, a pak s pevnějším a vřelejším stiskem.',
    description: 'Vnímejte kontrast mezi lehkým lechtáním a hlubokým, uklidňujícím tlakem dlaní.'
  },
  {
    id: 'f2_10',
    phaseId: 2,
    type: 'touch',
    target: 'partnerA',
    text: '{A}, polib {B} na pět různých míst na těle, ale tvoje rty se nesmí dotknout úst. Každý polibek doprovoď velmi pomalým pohlazením.',
    description: 'Dovol si objevovat kůži s něhou a úctou. {B} jen leží a přijímá tvé rty.'
  },

  // Fáze 3: Splynutí (Vášeň & Erotika)
  {
    id: 'f3_1',
    phaseId: 3,
    type: 'sensual',
    target: 'partnerB',
    text: '{B}, zašepej {A} do ucha svou vůbec nejoblíbenější erotickou vzpomínku, kterou s ním/ní máš, a pak ji dlouhým, hlubokým polibkem proměň v přítomnou realitu.',
    description: 'Nechte minulost ožít v naprosté vášni tady a teď. Polibek by měl být dlouhý a nespěchající.'
  },
  {
    id: 'f3_2',
    phaseId: 3,
    type: 'sensual',
    target: 'partnerA',
    text: '{A}, pomalu svleč z {B} jeden kousek oblečení. Použij u toho pouze své zuby nebo rty, nebo to udělej tak pomalu, jak je to fyzicky možné, s polibky na každé odhalené místo.',
    description: 'Udělejte ze svlékání rituál uctívání těla. Každý centimetr kůže si zaslouží pozornost.'
  },
  {
    id: 'f3_3',
    phaseId: 3,
    type: 'sensual',
    target: 'both',
    text: 'Lehněte si do těsného objetí a líbejte se tak, jako by to bylo poprvé – s objevováním, jemným napětím a postupnou gradací touhy. Nechte rty spojené alespoň 2 minuty.',
    description: 'Zapomeňte na okolní svět. Existuje jen chuť vašich rtů a teplo dechu.'
  },
  {
    id: 'f3_4',
    phaseId: 3,
    type: 'sensual',
    target: 'partnerB',
    text: 'Smyslná masáž: {A} si lehne na břicho. {B} mu/jí bude masírovat záda, boky a hýždě, přičemž bude svými rty a teplým dechem provokovat citlivá místa na krku a podél páteře.',
    description: 'Použijte hřejivý tlak dlaní a střídejte ho s jemnými doteky úst a dechu.'
  },
  {
    id: 'f3_5',
    phaseId: 3,
    type: 'sensual',
    target: 'partnerA',
    text: '{A}, sdílej s {B} jednu tajnou erotickou fantazii, kterou jsi s ním/ní vždy chtěl/a zažít, nebo kterou máš nejraději. Pokud je to možné, zrealizujte z ní malý kousek právě teď.',
    description: 'Otevřenost a pravda v této komnatě vytvářejí to nejhlubší magnetické pole.'
  },
  {
    id: 'f3_6',
    phaseId: 3,
    type: 'sensual',
    target: 'partnerB',
    text: 'Úplné odevzdání: {A} zavře oči a nechá se {B} líbat, hladit a dráždit kdekoli na těle po dobu 2 minut. Úkolem {A} je pouze dýchat a plně se poddat těmto vjemům.',
    description: 'Odevzdejte kontrolu s absolutní důvěrou. Vnímejte každý dotek jako dar na rozloučenou.'
  },
  {
    id: 'f3_7',
    phaseId: 3,
    type: 'sensual',
    target: 'both',
    text: 'Horká olejová masáž: Vezměte voňavý olej nebo krém. Společně ho rozetřete po těle toho druhého. Zaměřte se na vysoce citlivá místa – vnitřní stranu stehen, břicho, hruď a boky.',
    description: 'Kluzká, lesklá kůže a omamná vůně zvýší vaši smyslnost na maximum.'
  },
  {
    id: 'f3_8',
    phaseId: 3,
    type: 'sensual',
    target: 'both',
    text: 'Vyměňte si role dominujícího a podvolujícího se. Nechte jednoho z vás převzít naprostou kontrolu nad tempem doteků, polibků a pohybů po dobu následujících 5 minut.',
    description: 'Jeden vede s vášnivým odhodláním, druhý přijímá a dává najevo rozkoš tichým sténáním.'
  },
  {
    id: 'f3_9',
    phaseId: 3,
    type: 'ritual',
    target: 'both',
    text: 'Spojení kůže na kůži: Obejměte se pevně celým tělem, bez jakýchkoliv zábran. Vnímejte tlukot srdce toho druhého, vůni pokožky a absolutní přítomnost. Nechte toto hluboké spojení přejít v milování plné úcty, touhy a vášně.',
    description: 'Ať je vaše fyzické spojení oslavou všeho krásného, co jste spolu prožili. Splyňte v jedno.'
  },
  {
    id: 'f3_10',
    phaseId: 3,
    type: 'sensual',
    target: 'both',
    text: 'Šepot rozkoše: Během milování nebo bezprostředně po něm se podívejte partnerovi zblízka do očí a řekněte mu, jak moc je jeho tělo a přítomnost pro vás v tuto chvíli krásná a nezapomenutelná.',
    description: 'Uložte si tento obraz, tuto chuť a tento hluboký pocit bezpečí a vášně do své nejniternější paměti.'
  }
];

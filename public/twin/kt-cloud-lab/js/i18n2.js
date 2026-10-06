// operations, systems and story texts, merged into the main dictionary
import { T, LANGS } from './i18n.js';

const EXTRA = {
  en: {
    kpi2: { pue: 'PUE', pueS: 'calculated, live', inside: 'Hall inlet', outside: 'Outside air', uptime: 'Uptime', uptimeS: 'no power or cooling loss', racks: 'Racks', racksS: 'active · standby' },
    tabs2: { systems: 'Systems', ops: 'Operations' },
    systems: {
      title: 'Systems on site', hint: 'Choose a system to see it in the model',
      list: [['grid', 'Power grid', 'Two 10 kV feeders, №20 and №17'], ['tp', 'Transformer substation', '2 × 1600 kVA, oil transformers'], ['dgu', 'Diesel generator', 'Cummins C1000D5, 833 kW, 24 h on its tank'], ['ups', 'UPS', 'Eaton 9395, 4 modules, N+1, 10 min on batteries'], ['chillers', 'Chillers', '2 × HiRef LSE658FS, 633 kW cooling each'], ['coolers', 'In-row cooling', '14 units between racks, 2 in the electrical room'], ['racks', 'Server hall', '84 racks in 7 rows, hot aisles contained'], ['fiber', 'Fibre channels', 'Line 1 and line 2 on diverse routes'], ['fire', 'Gas suppression', 'HFC-227ea, hall and electrical room'], ['people', 'Personnel', 'Duty shift, hall engineer, site technician, security']],
    },
    ops: {
      title: 'Monitoring pipeline', stages: ['Alerts', 'Analytics', 'Prediction', 'Prescription'], live: 'Live', newAlert: 'New alert',
      analytics: { fans: (n, list) => `${n} in-row coolers above 95 % fan speed (${list}). Heat load in the hall is rising with the evening IT peak.`, net: (n) => `${n} network alerts on zone switches, all at client-port level; uplinks healthy.`, calm: 'All systems inside their normal bands.' },
      predict: { fans: (h, t) => `At the current trend the busiest cooler reaches 100 % fan speed in about ${h} h; rack inlet peaks near ${t} °C, inside the ASHRAE band.`, ups: (p) => `UPS load stays under ${p} % of capacity for the next 24 h. Battery autonomy unaffected.`, pue: (v) => `PUE drifts to ${v} by mid-afternoon as outside air warms.` },
      prescribe: { fans: (id) => `Inspect filters and coil of ${id}; move two loaded racks from its row to row 7, which has spare cooling.`, net: 'Open a ticket with the client for the flapping port; no action on the core.', calm: 'No action needed. Next planned check: generator test run on Saturday.' },
    },
    kinds2: { person: 'On-site staff', fiber: 'Fibre channel', grid: 'Power grid' },
    roles: { duty: 'Duty engineer, control room', hall: 'Hall engineer on rounds', security: 'Security officer, entrance', tech: 'Site technician, plant yard' },
    fiber: ['Fibre line 1', 'Fibre line 2'],
    grid: 'Grid 10 kV · feeders №20, №17',
    story: {
      btn: 'Story', close: 'Close story', scroll: 'Scroll to move through the building',
      ch: [['Alatau, under the Trans-Ili range', 'The data centre stands in the Park of Innovative Technologies at 780 m, with the mountains 30 km to the south.'], ['The building', 'One storey, 44.85 × 18 m. Siding and profiled steel outside, a sealed server hall inside on its own steel frame.'], ['Power from two feeders', 'Two 10 kV lines feed a 2 × 1600 kVA substation. A Cummins generator takes over through the changeover; Eaton UPS modules hold the load for the seconds in between.'], ['Cold water, then cold air', 'Two HiRef chillers send water under the raised floor to fourteen in-row coolers. Hot aisles are closed in behind the racks.'], ['84 racks in seven rows', 'Each client rack gets two 16 A feeds, A and B. Twenty-four sensors watch inlet temperature and humidity.'], ['Two fibre lines', 'Line 1 and line 2 leave the building on separate routes, so one cut never takes the site offline.'], ['From alert to action', 'Zabbix raises the alert, the twin correlates it, predicts where it goes and recommends the next step.']],
    },
  },
  ru: {
    kpi2: { pue: 'PUE', pueS: 'расчёт, онлайн', inside: 'В машзале', outside: 'Снаружи', uptime: 'Аптайм', uptimeS: 'без потерь питания и холода', racks: 'Стойки', racksS: 'активные · резерв' },
    tabs2: { systems: 'Системы', ops: 'Мониторинг' },
    systems: {
      title: 'Системы объекта', hint: 'Выберите систему, чтобы увидеть её в модели',
      list: [['grid', 'Электросеть', 'Два фидера 10 кВ, №20 и №17'], ['tp', 'Трансформаторная подстанция', '2 × 1600 кВА, масляные трансформаторы'], ['dgu', 'Дизель-генератор', 'Cummins C1000D5, 833 кВт, 24 ч на своём баке'], ['ups', 'ИБП', 'Eaton 9395, 4 модуля, N+1, 10 мин на батареях'], ['chillers', 'Чиллеры', '2 × HiRef LSE658FS, по 633 кВт холода'], ['coolers', 'Межрядное охлаждение', '14 блоков между стойками, 2 в электрощитовой'], ['racks', 'Машинный зал', '84 стойки в 7 рядах, горячие коридоры закрыты'], ['fiber', 'Оптические каналы', 'Линия 1 и линия 2 по разным трассам'], ['fire', 'Газовое тушение', 'Хладон 227еа, зал и электрощитовая'], ['people', 'Персонал', 'Дежурная смена, инженер зала, техник, охрана']],
    },
    ops: {
      title: 'Конвейер мониторинга', stages: ['Тревоги', 'Аналитика', 'Прогноз', 'Рекомендация'], live: 'Онлайн', newAlert: 'Новая тревога',
      analytics: { fans: (n, list) => `${n} межрядных кондиционеров выше 95 % оборотов (${list}). Тепловая нагрузка в зале растёт вместе с вечерним пиком ИТ.`, net: (n) => `${n} сетевых тревог на зональных коммутаторах, все на клиентских портах; аплинки в норме.`, calm: 'Все системы в пределах нормы.' },
      predict: { fans: (h, t) => `При текущем тренде самый загруженный кондиционер выйдет на 100 % примерно через ${h} ч; на входе стоек — до ${t} °C, в пределах ASHRAE.`, ups: (p) => `Нагрузка ИБП в ближайшие 24 ч не превысит ${p} % мощности. Автономия батарей не меняется.`, pue: (v) => `К середине дня PUE поднимется до ${v}: снаружи теплеет.` },
      prescribe: { fans: (id) => `Проверить фильтры и теплообменник ${id}; перенести две нагруженные стойки из его ряда в ряд 7, где есть запас холода.`, net: 'Открыть заявку клиенту по нестабильному порту; ядро сети не трогать.', calm: 'Действий не требуется. Следующая плановая проверка — тестовый пуск ДГУ в субботу.' },
    },
    kinds2: { person: 'Персонал', fiber: 'Оптический канал', grid: 'Электросеть' },
    roles: { duty: 'Дежурный инженер, диспетчерская', hall: 'Инженер зала на обходе', security: 'Охрана, вход', tech: 'Техник, площадка оборудования' },
    fiber: ['Оптика, линия 1', 'Оптика, линия 2'],
    grid: 'Сеть 10 кВ · фидеры №20, №17',
    story: {
      btn: 'История', close: 'Закрыть историю', scroll: 'Прокручивайте, чтобы пройти по зданию',
      ch: [['Алатау, у подножия Заилийского Алатау', 'ЦОД стоит в Парке инновационных технологий на высоте 780 м, горы — в 30 км к югу.'], ['Здание', 'Один этаж, 44,85 × 18 м. Снаружи сайдинг и профлист, внутри — герметичный машинный зал на собственном каркасе.'], ['Питание от двух фидеров', 'Две линии 10 кВ питают подстанцию 2 × 1600 кВА. Генератор Cummins подхватывает нагрузку через АВР, ИБП Eaton держат её в эти секунды.'], ['Холодная вода, затем холодный воздух', 'Два чиллера HiRef подают воду под фальшпол к четырнадцати межрядным кондиционерам. Горячие коридоры закрыты за стойками.'], ['84 стойки в семи рядах', 'Каждая клиентская стойка получает два ввода 16 А, A и B. Двадцать четыре датчика следят за температурой и влажностью.'], ['Две оптические линии', 'Линия 1 и линия 2 выходят из здания разными трассами: один обрыв не отключает объект.'], ['От тревоги к действию', 'Zabbix поднимает тревогу, двойник связывает её с другими, прогнозирует развитие и предлагает следующий шаг.']],
    },
  },
  kk: {
    kpi2: { pue: 'PUE', pueS: 'есептеу, онлайн', inside: 'Машзалда', outside: 'Сыртта', uptime: 'Аптайм', uptimeS: 'қуат пен салқын жоғалмады', racks: 'Сөрелер', racksS: 'белсенді · резерв' },
    tabs2: { systems: 'Жүйелер', ops: 'Мониторинг' },
    systems: {
      title: 'Нысан жүйелері', hint: 'Модельде көру үшін жүйені таңдаңыз',
      list: [['grid', 'Электр желісі', 'Екі 10 кВ фидер, №20 және №17'], ['tp', 'Трансформаторлық қосалқы станция', '2 × 1600 кВА, майлы трансформаторлар'], ['dgu', 'Дизель-генератор', 'Cummins C1000D5, 833 кВт, өз багында 24 сағ'], ['ups', 'ҮҚК', 'Eaton 9395, 4 модуль, N+1, батареяда 10 мин'], ['chillers', 'Чиллерлер', '2 × HiRef LSE658FS, әрқайсысы 633 кВт'], ['coolers', 'Қатараралық салқындату', 'Сөрелер арасында 14 блок, электр бөлмесінде 2'], ['racks', 'Машина залы', '7 қатарда 84 сөре, ыстық дәліздер жабық'], ['fiber', 'Оптикалық арналар', '1-желі және 2-желі әртүрлі трассамен'], ['fire', 'Газбен сөндіру', 'HFC-227ea, зал және электр бөлмесі'], ['people', 'Қызметкерлер', 'Кезекші ауысым, зал инженері, техник, күзет']],
    },
    ops: {
      title: 'Мониторинг конвейері', stages: ['Дабылдар', 'Талдау', 'Болжам', 'Ұсыныс'], live: 'Онлайн', newAlert: 'Жаңа дабыл',
      analytics: { fans: (n, list) => `${n} қатараралық кондиционер 95 %-дан жоғары айналымда (${list}). Залдағы жылу жүктемесі кешкі IT шыңымен бірге өсуде.`, net: (n) => `Аймақтық коммутаторларда ${n} желі дабылы, бәрі клиент порттарында; аплинктер қалыпты.`, calm: 'Барлық жүйелер қалыпты шекте.' },
      predict: { fans: (h, t) => `Қазіргі трендпен ең жүктелген кондиционер шамамен ${h} сағатта 100 %-ға жетеді; сөре кірісі ${t} °C дейін, ASHRAE шегінде.`, ups: (p) => `Алдағы 24 сағатта ҮҚК жүктемесі қуаттың ${p} %-нан аспайды. Батарея автономиясы өзгермейді.`, pue: (v) => `Күн ортасына қарай сыртқы ауа жылынып, PUE ${v} дейін көтеріледі.` },
      prescribe: { fans: (id) => `${id} сүзгілері мен жылу алмастырғышын тексеру; оның қатарынан екі жүктелген сөрені салқын қоры бар 7-қатарға ауыстыру.`, net: 'Тұрақсыз порт бойынша клиентке өтінім ашу; желі ядросына әрекет қажет емес.', calm: 'Әрекет қажет емес. Келесі жоспарлы тексеру — сенбіде ДГҚ сынақ іске қосылуы.' },
    },
    kinds2: { person: 'Қызметкерлер', fiber: 'Оптикалық арна', grid: 'Электр желісі' },
    roles: { duty: 'Кезекші инженер, диспетчерлік', hall: 'Аралап жүрген зал инженері', security: 'Күзет, кіреберіс', tech: 'Техник, жабдық алаңы' },
    fiber: ['Оптика, 1-желі', 'Оптика, 2-желі'],
    grid: '10 кВ желі · №20, №17 фидерлер',
    story: {
      btn: 'Тарих', close: 'Тарихты жабу', scroll: 'Ғимарат бойымен өту үшін айналдырыңыз',
      ch: [['Алатау, Іле Алатауының етегі', 'ДӨО Инновациялық технологиялар паркінде 780 м биіктікте тұр, таулар оңтүстікке қарай 30 км жерде.'], ['Ғимарат', 'Бір қабат, 44,85 × 18 м. Сыртында сайдинг пен профнастил, ішінде өз қаңқасындағы герметикалық машина залы.'], ['Екі фидерден қуат', 'Екі 10 кВ желі 2 × 1600 кВА қосалқы станцияны қоректендіреді. Cummins генераторы АВҚ арқылы жүктемені алады, Eaton ҮҚК сол секундтарда ұстап тұрады.'], ['Алдымен суық су, сосын суық ауа', 'Екі HiRef чиллері суды жалған еден астымен он төрт қатараралық кондиционерге береді. Ыстық дәліздер сөрелер артында жабық.'], ['Жеті қатарда 84 сөре', 'Әр клиент сөресі екі 16 А кіріс алады, A және B. Жиырма төрт датчик температура мен ылғалдылықты бақылайды.'], ['Екі оптикалық желі', '1-желі мен 2-желі ғимараттан бөлек трассамен шығады: бір үзіліс нысанды өшірмейді.'], ['Дабылдан әрекетке', 'Zabbix дабыл көтереді, егіз оны басқалармен байланыстырады, дамуын болжайды және келесі қадамды ұсынады.']],
    },
  },
};
for (const k of LANGS) Object.assign(T[k], EXTRA[k]);

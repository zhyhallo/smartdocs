import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export type Language = 'uk' | 'pl' | 'ru'

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  uk: {
    // Header & Navigation
    'nav.home': 'Головна',
    'nav.product': 'Продукт',
    'nav.features': 'Переваги',
    'nav.pricing': 'Тарифи',
    'nav.faq': 'FAQ',
    'nav.contacts': 'Контакти',
    'nav.call': 'Зв’язатися',

    // Hero Section
    'hero.title': 'Автоматичне завантаження накладних у 1С та BAS',
    'hero.subtitle': 'Розпізнавання прихідних документів і миттєве підвантаження в інформаційну базу без ручного вводу.',
    'hero.description': 'Наш сервіс автоматично розпізнає прихідні накладні та завантажує їх у 1С чи BAS. Більше не потрібно вручну вводити дані документів — програма сама знаходить контрагентів, номенклатуру і ставки ПДВ.',
    'hero.cta.order': 'Спробувати безкоштовно',
    'hero.badge': 'Автоматизація для бухгалтерії',

    // Проблема та рішення
    'problem.title': 'Забудьте про ручний ввід накладних',
    'problem.text': 'Бухгалтери витрачають години на внесення документів у 1С чи BAS. Ручна робота = помилки, втрата часу і ресурсів. Наш модуль автоматизує цей процес: ви завантажуєте файл — система сама визначає контрагента, номенклатуру і ставки ПДВ.',

    // Як працює рішення
    'howitworks.title': 'Від скану до документа в базі за 1 хвилину',
    'howitworks.step1': 'Завантажте PDF або скан прихідної накладної.',
    'howitworks.step2': 'Система розпізнає дані (OCR).',
    'howitworks.step3': 'Автоматично підтягуються: контрагенти, товари/послуги, ставки ПДВ.',
    'howitworks.step4': 'Документ одразу потрапляє у вашу інформаційну базу 1С або BAS.',

    // Features / SEO-блок
    'features.title': 'Чому обирають наш продукт для 1С та BAS',
    'features.subtitle': 'Автоматичне розпізнавання прихідних накладних для 1С та BAS. Завантаження документів у BAS ERP і 1С:Підприємство без ручного вводу. Економія часу бухгалтера до 80%. Мінімізація помилок при введенні даних. Інтеграція з будь-якою конфігурацією BAS і 1С. Підтримка ПДВ та українських стандартів обліку. Просте впровадження без складних налаштувань.',
    'features.sales.title': 'Автоматичне розпізнавання накладних',
    'features.sales.desc': 'OCR для бухгалтерських документів (накладні, акти, рахунки).',
    'features.reports.title': 'Імпорт у BAS та 1С',
    'features.reports.desc': 'Імпорт накладних у BAS/1С за кілька кліків.',
    'features.status.title': 'Автоматичне підвантаження',
    'features.status.desc': 'Контрагенти і номенклатура з вашої бази.',
    'features.errors.title': 'Мінімізація помилок',
    'features.errors.desc': 'Розпізнавання і перевірка даних.',
    'features.config.title': 'Інтеграція з 1С/BAS',
    'features.config.desc': 'Працює з усіма популярними конфігураціями.',
    'features.backup.title': 'Підтримка ПДВ',
    'features.backup.desc': 'Автоматичне визначення ставок ПДВ.',

    // Для кого продукт
    'forwhom.title': 'Ідеальне рішення для:',
    'forwhom.buh': 'бухгалтерів та фінансових відділів',
    'forwhom.trade': 'торгових та дистриб’юторських компаній',
    'forwhom.prod': 'виробничих підприємств',
    'forwhom.docs': 'компаній з великим документообігом',

    // Демонстрація
    'demo.title': 'Подивіться, як це працює',
    'demo.text': 'Демонстрація процесу завантаження накладної і появи документа в BAS/1С.',

    // Pricing
    'pricing.title': 'Доступно для будь-якого бізнесу',
    'pricing.subtitle': 'Старт — для малого бізнесу. Бізнес — для компаній з активним документообігом. Преміум — для корпоративних клієнтів з інтеграціями.',
    'pricing.price': 'від 990 грн/міс',
    'pricing.currency': 'або індивідуально',
    'pricing.symbol': '₴',
    'pricing.features.license': 'Безстрокова ліцензія',
    'pricing.features.documentation': 'Підтримка інтеграції',
    'pricing.features.examples': 'Детальна документація',
    'pricing.features.installation': 'Швидкий старт',
    'pricing.cta': 'Отримати демо',
    'pricing.activation': 'Підключення за 1 день',

    // FAQ
    'faq.title': 'Часті запитання (FAQ)',
    'faq.subtitle': 'Відповіді на найпопулярніші питання про автоматизацію накладних для BAS/1С',
    'faq.q1': 'Як автоматично завантажити накладні у BAS?',
    'faq.a1': 'Наш модуль дозволяє завантажити PDF чи скан накладної, система розпізнає дані (OCR) та автоматично створює документ у BAS з правильними контрагентами, номенклатурою та ставками ПДВ.',
    'faq.q2': 'Чи працює рішення з 1С:Підприємство?',
    'faq.a2': 'Так, ми підтримуємо популярні конфігурації 1С:Підприємство, включно з бухгалтерськими модулями. Документи завантажуються без ручного введення.',
    'faq.q3': 'Які документи можна розпізнавати?',
    'faq.a3': 'Сервіс працює з прихідними накладними, актами, рахунками-фактурами та іншими первинними бухгалтерськими документами.',
    'faq.q4': 'Чи підбирає система контрагентів і товари автоматично?',
    'faq.a4': 'Так, при завантаженні документа програма шукає відповідних контрагентів і номенклатуру у вашій базі та підтягує їх у документ.',
    'faq.q5': 'Як система працює з ПДВ?',
    'faq.a5': 'Модуль автоматично визначає ставки ПДВ у накладних і враховує їх відповідно до українського законодавства.',
    'faq.q6': 'Чи можна завантажувати скановані документи?',
    'faq.a6': 'Так, рішення підтримує як PDF, так і відскановані накладні та фото документів.',
    'faq.q7': 'Чи складно інтегрувати модуль у мою базу?',
    'faq.a7': 'Інтеграція займає мінімум часу. Продукт легко підключається до ваших існуючих конфігурацій BAS чи 1С без складних налаштувань.',
    'faq.q8': 'Для кого найкраще підходить продукт?',
    'faq.a8': 'Рішення створене для бухгалтерів, фінансових відділів, торгових компаній, дистриб’юторів та підприємств з великим документообігом.',

    // CTA
    'cta.title': 'Автоматизуйте бухгалтерію вже сьогодні',
    'cta.subtitle': 'Спробуйте сервіс для автоматичного розпізнавання та завантаження накладних у BAS/1С',
    'cta.button': 'Отримати демо',
    'cta.features.implementation': 'Легке впровадження',
    'cta.features.support': 'Підтримка інтеграції',
    'cta.features.quality': 'Гарантія якості',

    // Product
    'product.title': 'Опис рішення',
    'product.subtitle': 'Детальний опис функціональності та переваг автоматизації',

    // Social Proof  
    'social.title': 'Довіряють професіонали',
    'social.subtitle': 'Наші клієнти економлять час та збільшують точність обліку',
    'social.experience': 'років досвіду',
    'social.projects': 'проектів',
    'social.specialists': 'спеціалістів',

    // Meta SEO
    'meta.title': 'Автоматичне розпізнавання накладних | Завантаження у 1С та BAS',
    'meta.description': 'Модуль для BAS і 1С: автоматичне розпізнавання накладних, актів, рахунків. Завантаження документів у базу з підбором контрагентів та ПДВ.',
    'meta.keywords': 'автоматичне розпізнавання накладних, OCR для бухгалтерських документів, завантаження документів у 1С, BAS ERP, автоматизація бухгалтерії, імпорт накладних BAS, інтеграція 1С, автоматичне підвантаження контрагентів, автоматизація документообігу, сканування накладних, розпізнавання ПДВ, BAS бухгалтерія',
    'meta.og.title': 'Автоматичне розпізнавання накладних | Завантаження у 1С та BAS',
    'meta.og.description': 'Автоматичне розпізнавання та завантаження накладних, актів, рахунків у BAS і 1С. OCR для бухгалтерських документів. Інтеграція з обліковою системою.',

    // Google Ads Headlines & Descriptions
    'ads.short1': 'Автоматичні накладні BAS',
    'ads.short2': 'Завантаження документів у 1С',
    'ads.short3': 'OCR для бухгалтерії',
    'ads.short4': 'Розпізнавання PDF у BAS',
    'ads.short5': 'Первинка без ручного вводу',
    'ads.short6': 'Автоматизація документів',
    'ads.short7': 'Швидке завантаження накладних',
    'ads.short8': 'BAS/1С без рутинної роботи',
    'ads.long1': 'Автоматичне розпізнавання накладних та актів у BAS і 1С',
    'ads.long2': 'Завантажуйте PDF та скани накладних у базу без ручного вводу',
    'ads.long3': 'OCR для бухгалтерських документів: швидко, точно, автоматично',
    'ads.long4': 'Автоматичне створення документів у BAS ERP та 1С:Підприємство',
    'ads.long5': 'Підбір контрагентів і ПДВ при завантаженні накладних у 1С',
    'ads.desc1': 'Економія до 80% часу бухгалтера.',
    'ads.desc2': 'Мінімум помилок у первинних документах.',
    'ads.desc3': 'Інтеграція з BAS та 1С за кілька хвилин.',
    'ads.desc4': 'Завантаження PDF і сканів одним кліком.',
    'ads.desc5': 'Рішення для бухгалтерів та бізнесу.',
    'ads.desc6': 'Автоматизація документообігу без зайвих зусиль.'
  },
  
  pl: {
    // Header & Navigation
    'nav.home': 'Strona główna',
    'nav.product': 'Produkt',
    'nav.features': 'Zalety',
    'nav.pricing': 'Cennik',
    'nav.faq': 'FAQ',
    'nav.contacts': 'Kontakt',
    'nav.call': 'Skontaktuj się',

    // Hero Section
    'hero.title': 'Automatyczne ładowanie faktur przychodzących do 1С i BAS',
    'hero.subtitle': 'Rozpoznawanie dokumentów i natychmiastowe ładowanie do bazy bez ręcznego wprowadzania.',
    'hero.description': 'Nasz serwis automatycznie rozpoznaje faktury przychodzące i ładuje je do 1С lub BAS. Nie musisz już ręcznie wprowadzać danych — program sam znajduje kontrahentów, asortyment i stawki VAT.',
    'hero.cta.order': 'Wypróbuj za darmo',
    'hero.badge': 'Automatyzacja dla księgowości',

    // Problem & Solution
    'problem.title': 'Zapomnij o ręcznym wprowadzaniu faktur',
    'problem.text': 'Księgowi tracą godziny na wprowadzanie dokumentów do 1С lub BAS. Praca ręczna = błędy, strata czasu i zasobów. Nasz moduł automatyzuje ten proces: ładujesz plik — system sam określa kontrahenta, asortyment i stawki VAT.',

    // How it works
    'howitworks.title': 'Od skanu do dokumentu w bazie w 1 minutę',
    'howitworks.step1': 'Załaduj PDF lub skan faktury przychodzącej.',
    'howitworks.step2': 'System rozpoznaje dane (OCR).',
    'howitworks.step3': 'Automatycznie pobierani są: kontrahenci, towary/usługi, stawki VAT.',
    'howitworks.step4': 'Dokument trafia bezpośrednio do Twojej bazy 1С lub BAS.',

    // Features / SEO
    'features.title': 'Dlaczego wybierają nasz produkt do 1С i BAS',
    'features.subtitle': 'Automatyczne rozpoznawanie faktur przychodzących do 1С i BAS. Ładowanie dokumentów do BAS ERP i 1С:Przedsiębiorstwo bez ręcznego wprowadzania. Oszczędność czasu księgowego do 80%. Minimalizacja błędów przy wprowadzaniu danych. Integracja z dowolną konfiguracją BAS i 1С. Obsługa VAT i polskich/ukraińskich standardów księgowości. Proste wdrożenie bez skomplikowanych ustawień.',
    'features.sales.title': 'Automatyczne rozpoznawanie faktur',
    'features.sales.desc': 'OCR dla dokumentów księgowych (faktury, akty, rachunki).',
    'features.reports.title': 'Import do BAS i 1С',
    'features.reports.desc': 'Import faktur do BAS/1С w kilka kliknięć.',
    'features.status.title': 'Automatyczne pobieranie',
    'features.status.desc': 'Kontrahenci i asortyment z Twojej bazy.',
    'features.errors.title': 'Minimalizacja błędów',
    'features.errors.desc': 'Rozpoznawanie i weryfikacja danych.',
    'features.config.title': 'Integracja z 1С/BAS',
    'features.config.desc': 'Działa ze wszystkimi popularnymi konfiguracjami.',
    'features.backup.title': 'Obsługa VAT',
    'features.backup.desc': 'Automatyczne określanie stawek VAT.',

    // For whom
    'forwhom.title': 'Idealne rozwiązanie dla:',
    'forwhom.buh': 'księgowych i działów finansowych',
    'forwhom.trade': 'firm handlowych i dystrybucyjnych',
    'forwhom.prod': 'przedsiębiorstw produkcyjnych',
    'forwhom.docs': 'firm z dużym obiegiem dokumentów',

    // Demo
    'demo.title': 'Zobacz jak to działa',
    'demo.text': 'Demonstracja procesu ładowania faktury i pojawienia się dokumentu w BAS/1С.',

    // Pricing
    'pricing.title': 'Dostępne dla każdej firmy',
    'pricing.subtitle': 'Start — dla małych firm. Biznes — dla firm z aktywnym obiegiem dokumentów. Premium — dla klientów korporacyjnych z integracjami.',
    'pricing.price': 'od 120 zł/mies.',
    'pricing.currency': 'lub indywidualnie',
    'pricing.symbol': 'zł',
    'pricing.features.license': 'Licencja bezterminowa',
    'pricing.features.documentation': 'Wsparcie integracji',
    'pricing.features.examples': 'Szczegółowa dokumentacja',
    'pricing.features.installation': 'Szybki start',
    'pricing.cta': 'Uzyskaj demo',
    'pricing.activation': 'Wdrożenie w 1 dzień',

    // FAQ
    'faq.title': 'Najczęstsze pytania (FAQ)',
    'faq.subtitle': 'Odpowiedzi na najpopularniejsze pytania o automatyzację faktur dla BAS/1С',
    'faq.q1': 'Jak automatycznie załadować faktury do BAS?',
    'faq.a1': 'Nasz moduł pozwala załadować PDF lub skan faktury, system rozpoznaje dane (OCR) i automatycznie tworzy dokument w BAS z odpowiednimi kontrahentami, asortymentem i stawkami VAT.',
    'faq.q2': 'Czy rozwiązanie działa z 1С:Przedsiębiorstwo?',
    'faq.a2': 'Tak, obsługujemy popularne konfiguracje 1С:Przedsiębiorstwo, w tym moduły księgowe. Dokumenty są ładowane bez ręcznego wprowadzania.',
    'faq.q3': 'Jakie dokumenty można rozpoznawać?',
    'faq.a3': 'Serwis obsługuje faktury przychodzące, akty, rachunki oraz inne dokumenty księgowe.',
    'faq.q4': 'Czy system automatycznie dobiera kontrahentów i towary?',
    'faq.a4': 'Tak, podczas ładowania dokumentu program wyszukuje odpowiednich kontrahentów i asortyment w Twojej bazie i pobiera je do dokumentu.',
    'faq.q5': 'Jak system obsługuje VAT?',
    'faq.a5': 'Moduł automatycznie określa stawki VAT w fakturach i uwzględnia je zgodnie z przepisami.',
    'faq.q6': 'Czy można ładować zeskanowane dokumenty?',
    'faq.a6': 'Tak, rozwiązanie obsługuje zarówno PDF, jak i zeskanowane faktury oraz zdjęcia dokumentów.',
    'faq.q7': 'Czy integracja jest trudna?',
    'faq.a7': 'Integracja zajmuje minimum czasu. Produkt łatwo podłączyć do istniejących konfiguracji BAS lub 1С bez skomplikowanych ustawień.',
    'faq.q8': 'Dla kogo jest to rozwiązanie?',
    'faq.a8': 'Rozwiązanie stworzone dla księgowych, działów finansowych, firm handlowych, dystrybutorów i przedsiębiorstw z dużym obiegiem dokumentów.',

    // CTA
    'cta.title': 'Zautomatyzuj księgowość już dziś',
    'cta.subtitle': 'Wypróbuj usługę automatycznego rozpoznawania i ładowania faktur do BAS/1С',
    'cta.button': 'Uzyskaj demo',
    'cta.features.implementation': 'Łatwe wdrożenie',
    'cta.features.support': 'Wsparcie integracji',
    'cta.features.quality': 'Gwarancja jakości',

    // Product
    'product.title': 'Opis rozwiązania',
    'product.subtitle': 'Szczegółowy opis funkcjonalności i korzyści automatyzacji',

    // Social Proof  
    'social.title': 'Zaufali nam profesjonaliści',
    'social.subtitle': 'Nasi klienci oszczędzają czas i zwiększają dokładność księgowości',
    'social.experience': 'lat doświadczenia',
    'social.projects': 'projektów',
    'social.specialists': 'specjalistów',

    // Meta SEO
    'meta.title': 'Automatyczne rozpoznawanie faktur | Ładowanie do 1С i BAS',
    'meta.description': 'Moduł dla BAS i 1С: automatyczne rozpoznawanie faktur, aktów, rachunków. Ładowanie dokumentów do bazy z doborem kontrahentów i VAT.',
    'meta.keywords': 'automatyczne rozpoznawanie faktur, OCR dla dokumentów księgowych, ładowanie dokumentów do 1С, BAS ERP, automatyzacja księgowości, import faktur BAS, integracja 1С, automatyczne pobieranie kontrahentów, automatyzacja obiegu dokumentów, skanowanie faktur, rozpoznawanie VAT, BAS księgowość',
    'meta.og.title': 'Automatyczne rozpoznawanie faktur | Ładowanie do 1С i BAS',
    'meta.og.description': 'Automatyczne rozpoznawanie i ładowanie faktur, aktów, rachunków do BAS i 1С. OCR dla dokumentów księgowych. Integracja z systemem księgowym.',
  },
  
  ru: {
    // Header & Navigation
    'nav.home': 'Главная',
    'nav.product': 'Продукт',
    'nav.features': 'Преимущества',
    'nav.pricing': 'Тарифы',
    'nav.faq': 'FAQ',
    'nav.contacts': 'Контакты',
    'nav.call': 'Связаться',

    // Hero Section
    'hero.title': 'Автоматическая загрузка приходных накладных в 1С и BAS',
    'hero.subtitle': 'Распознавание входящих документов и мгновенная загрузка в базу без ручного ввода.',
    'hero.description': 'Наш сервис автоматически распознаёт приходные накладные и загружает их в 1С или BAS. Больше не нужно вручную вводить данные — программа сама находит контрагентов, номенклатуру и ставки НДС.',
    'hero.cta.order': 'Попробовать бесплатно',
    'hero.badge': 'Автоматизация для бухгалтерии',

    // Проблема и решение
    'problem.title': 'Забудьте о ручном вводе накладных',
    'problem.text': 'Бухгалтеры тратят часы на внесение документов в 1С или BAS. Ручная работа = ошибки, потеря времени и ресурсов. Наш модуль автоматизирует этот процесс: вы загружаете файл — система сама определяет контрагента, номенклатуру и ставки НДС.',

    // Как работает
    'howitworks.title': 'От скана до документа в базе за 1 минуту',
    'howitworks.step1': 'Загрузите PDF или скан приходной накладной.',
    'howitworks.step2': 'Система распознаёт данные (OCR).',
    'howitworks.step3': 'Автоматически подтягиваются: контрагенты, товары/услуги, ставки НДС.',
    'howitworks.step4': 'Документ сразу попадает в вашу базу 1С или BAS.',

    // Features / SEO
    'features.title': 'Почему выбирают наш продукт для 1С и BAS',
    'features.subtitle': 'Автоматическое распознавание приходных накладных для 1С и BAS. Загрузка документов в BAS ERP и 1С:Предприятие без ручного ввода. Экономия времени бухгалтера до 80%. Минимизация ошибок при вводе данных. Интеграция с любой конфигурацией BAS и 1С. Поддержка НДС и украинских стандартов учёта. Простое внедрение без сложных настроек.',
    'features.sales.title': 'Автоматическое распознавание накладных',
    'features.sales.desc': 'OCR для бухгалтерских документов (накладные, акты, счета).',
    'features.reports.title': 'Импорт в BAS и 1С',
    'features.reports.desc': 'Импорт накладных в BAS/1С в несколько кликов.',
    'features.status.title': 'Автоматическая подгрузка',
    'features.status.desc': 'Контрагенты и номенклатура из вашей базы.',
    'features.errors.title': 'Минимизация ошибок',
    'features.errors.desc': 'Распознавание и проверка данных.',
    'features.config.title': 'Интеграция с 1С/BAS',
    'features.config.desc': 'Работает со всеми популярными конфигурациями.',
    'features.backup.title': 'Поддержка НДС',
    'features.backup.desc': 'Автоматическое определение ставок НДС.',

    // Для кого продукт
    'forwhom.title': 'Идеальное решение для:',
    'forwhom.buh': 'бухгалтеров и финансовых отделов',
    'forwhom.trade': 'торговых и дистрибьюторских компаний',
    'forwhom.prod': 'производственных предприятий',
    'forwhom.docs': 'компаний с большим документооборотом',

    // Демонстрация
    'demo.title': 'Посмотрите, как это работает',
    'demo.text': 'Демонстрация процесса загрузки накладной и появления документа в BAS/1С.',

    // Pricing
    'pricing.title': 'Доступно для любого бизнеса',
    'pricing.subtitle': 'Старт — для малого бизнеса. Бизнес — для компаний с активным документооборотом. Премиум — для корпоративных клиентов с интеграциями.',
    'pricing.price': 'от 2500 руб/мес',
    'pricing.currency': 'или индивидуально',
    'pricing.symbol': '₽',
    'pricing.features.license': 'Бессрочная лицензия',
    'pricing.features.documentation': 'Поддержка интеграции',
    'pricing.features.examples': 'Подробная документация',
    'pricing.features.installation': 'Быстрый старт',
    'pricing.cta': 'Получить демо',
    'pricing.activation': 'Подключение за 1 день',

    // FAQ
    'faq.title': 'Частые вопросы (FAQ)',
    'faq.subtitle': 'Ответы на самые популярные вопросы об автоматизации накладных для BAS/1С',
    'faq.q1': 'Как автоматически загрузить накладные в BAS?',
    'faq.a1': 'Наш модуль позволяет загрузить PDF или скан накладной, система распознаёт данные (OCR) и автоматически создаёт документ в BAS с правильными контрагентами, номенклатурой и ставками НДС.',
    'faq.q2': 'Работает ли решение с 1С:Предприятие?',
    'faq.a2': 'Да, мы поддерживаем популярные конфигурации 1С:Предприятие, включая бухгалтерские модули. Документы загружаются без ручного ввода.',
    'faq.q3': 'Какие документы можно распознавать?',
    'faq.a3': 'Сервис работает с приходными накладными, актами, счетами-фактурами и другими бухгалтерскими документами.',
    'faq.q4': 'Система автоматически подбирает контрагентов и товары?',
    'faq.a4': 'Да, при загрузке документа программа ищет соответствующих контрагентов и номенклатуру в вашей базе и подтягивает их в документ.',
    'faq.q5': 'Как система работает с НДС?',
    'faq.a5': 'Модуль автоматически определяет ставки НДС в накладных и учитывает их в соответствии с законодательством.',
    'faq.q6': 'Можно ли загружать сканированные документы?',
    'faq.a6': 'Да, решение поддерживает как PDF, так и сканированные накладные и фото документов.',
    'faq.q7': 'Сложно ли интегрировать модуль в мою базу?',
    'faq.a7': 'Интеграция занимает минимум времени. Продукт легко подключается к вашим существующим конфигурациям BAS или 1С без сложных настроек.',
    'faq.q8': 'Для кого лучше всего подходит продукт?',
    'faq.a8': 'Решение создано для бухгалтеров, финансовых отделов, торговых компаний, дистрибьюторов и предприятий с большим документооборотом.',

    // CTA
    'cta.title': 'Автоматизируйте бухгалтерию уже сегодня',
    'cta.subtitle': 'Попробуйте сервис для автоматического распознавания и загрузки накладных в BAS/1С',
    'cta.button': 'Получить демо',
    'cta.features.implementation': 'Лёгкое внедрение',
    'cta.features.support': 'Поддержка интеграции',
    'cta.features.quality': 'Гарантия качества',

    // Product
    'product.title': 'Описание решения',
    'product.subtitle': 'Подробное описание функциональности и преимуществ автоматизации',

    // Social Proof  
    'social.title': 'Нам доверяют профессионалы',
    'social.subtitle': 'Наши клиенты экономят время и увеличивают точность учёта',
    'social.experience': 'лет опыта',
    'social.projects': 'проектов',
    'social.specialists': 'специалистов',

    // Meta SEO
    'meta.title': 'Автоматическое распознавание накладных | Загрузка в 1С и BAS',
    'meta.description': 'Модуль для BAS и 1С: автоматическое распознавание накладных, актов, счетов. Загрузка документов в базу с подбором контрагентов и НДС.',
    'meta.keywords': 'автоматическое распознавание накладных, OCR для бухгалтерских документов, загрузка документов в 1С, BAS ERP, автоматизация бухгалтерии, импорт накладных BAS, интеграция 1С, автоматическая подгрузка контрагентов, автоматизация документооборота, сканирование накладных, распознавание НДС, BAS бухгалтерия',
    'meta.og.title': 'Автоматическое распознавание накладных | Загрузка в 1С и BAS',
    'meta.og.description': 'Автоматическое распознавание и загрузка накладных, актов, счетов в BAS и 1С. OCR для бухгалтерских документов. Интеграция с учётной системой.',
  },
}

const TranslationContext = createContext<TranslationContextType | null>(null)

interface TranslationProviderProps {
  children: ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useLocalStorage<Language>('preferred-language', 'uk')

  const t = (key: string): string => {
    const langTranslations = translations[language || 'uk']
    if (!langTranslations) return key
    return langTranslations[key as keyof typeof langTranslations] || key
  }

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    // Update HTML lang attribute for SEO
    document.documentElement.lang = lang
  }

  useEffect(() => {
    // Set initial HTML lang attribute
    const currentLang = language || 'uk'
    document.documentElement.lang = currentLang
    
    // Update meta tags for SEO
    const titleElement = document.querySelector('title')
    const descriptionElement = document.querySelector('meta[name="description"]')
    const keywordsElement = document.querySelector('meta[name="keywords"]')
    
    if (titleElement) {
      titleElement.textContent = t('meta.title')
    }
    
    if (descriptionElement) {
      descriptionElement.setAttribute('content', t('meta.description'))
    }

    // Update keywords based on language
    if (keywordsElement) {
      const keywords = currentLang === 'uk' 
        ? "POSNET, 1С Enterprise, фіскальний реєстратор, драйвер, компонента, касове обладнання, ModulSoft"
        : currentLang === 'pl'
        ? "POSNET, 1С Enterprise, drukarka fiskalna, sterownik, komponent, urządzenie kasowe, ModulSoft"
        : "POSNET, 1С Enterprise, фискальный регистратор, драйвер, компонента, кассовое оборудование, ModulSoft"
      keywordsElement.setAttribute('content', keywords)
    }

    // Update HTML lang attribute in <html> tag for accessibility
    document.documentElement.setAttribute('lang', currentLang)
  }, [language, t])

  return (
    <TranslationContext.Provider value={{ language: language || 'uk', setLanguage: handleSetLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}
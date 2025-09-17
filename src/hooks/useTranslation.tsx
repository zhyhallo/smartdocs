import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'

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
    'nav.features': 'Функції',
    'nav.pricing': 'Ціна',
    'nav.faq': 'FAQ',
    'nav.contacts': 'Контакти',
    'nav.call': 'Зателефонувати',
    
    // Hero Section
    'hero.title': 'Driver POSNET / Thermal',
    'hero.subtitle': 'для 1С:Enterprise',
    'hero.description': 'Готова зовнішня компонента для інтеграції з фіскальними реєстраторами POSNET / Thermal. Надійність, стабільність та професійна техпідтримка.',
    'hero.experience': '16+ років досвіду',
    'hero.projects': '200+ успішних проектів',
    'hero.specialists': '40+ сертифікованих спеціалістів',
    'hero.cta.order': 'Замовити зараз',
    'hero.cta.demo': 'Отримати консультацію',
    
    // Product Description
    'product.title': 'Що це таке?',
    'product.subtitle': 'Професійне рішення для інтеграції',
    'product.description': 'Наша компонента забезпечує повну інтеграцію фіскальних реєстраторів POSNET та Thermal з системою 1С:Enterprise. Рішення розроблено з урахуванням всіх вимог українського та польського законодавства.',
    'product.benefits.reliability': 'Надійність',
    'product.benefits.reliability.desc': 'Стабільна робота навіть при високих навантаженнях',
    'product.benefits.support': 'Підтримка',
    'product.benefits.support.desc': 'Професійна технічна підтримка 24/7',
    'product.benefits.integration': 'Інтеграція',
    'product.benefits.integration.desc': 'Швидке впровадження без зупинки роботи',
    'product.benefits.compliance': 'Відповідність',
    'product.benefits.compliance.desc': 'Повна відповідність законодавству',
    
    // Features
    'features.title': 'Функціональні можливості',
    'features.subtitle': 'Все необхідне для роботи з фіскальними реєстраторами',
    'features.sales.title': 'Продаж і чеки',
    'features.sales.desc': 'Видача фіскальних і нефіскальних чеків, робота зі знижками та різними типами оплати',
    'features.reports.title': 'Звіти',
    'features.reports.desc': 'X та Z звіти, звіти за періоди, детальна аналітика продажів',
    'features.status.title': 'Статус реєстратора',
    'features.status.desc': 'Моніторинг стану устрою, залишку паперу, помилок та технічних параметрів',
    'features.errors.title': 'Обробка помилок',
    'features.errors.desc': 'Детальне логування, діагностика проблем та автоматичне відновлення',
    'features.config.title': 'Налаштування',
    'features.config.desc': 'Гнучке налаштування параметрів реєстратора під ваші потреби',
    'features.backup.title': 'Резервування',
    'features.backup.desc': 'Автоматичне створення резервних копій та відновлення даних',
    
    // Pricing
    'pricing.title': 'Ціна та умови',
    'pricing.subtitle': 'Прозора ціна без прихованих платежів',
    'pricing.price': '1500 ₴',
    'pricing.currency': 'українських гривень',
    'pricing.features.license': 'Безстрокова ліцензія',
    'pricing.features.updates': 'Безкоштовні оновлення протягом року',
    'pricing.features.support': 'Технічна підтримка 6 місяців',
    'pricing.features.documentation': 'Повна документація',
    'pricing.features.examples': 'Приклади використання',
    'pricing.features.installation': 'Допомога з встановленням',
    'pricing.cta': 'Замовити зараз',
    
    // Social Proof
    'social.title': 'Довіра клієнтів',
    'social.subtitle': 'Понад 200 успішних впроваджень',
    'social.experience': 'років досвіду',
    'social.projects': 'проектів',
    'social.clients': 'задоволених клієнтів',
    'social.specialists': 'спеціалістів',
    
    // FAQ
    'faq.title': 'Часто задавані питання',
    'faq.q1': 'Чи підходить для всіх версій 1С:Enterprise?',
    'faq.a1': 'Так, компонента сумісна з версіями 1С:Enterprise 8.2 та новішими.',
    'faq.q2': 'Як відбувається оновлення компоненти?',
    'faq.a2': 'Оновлення надсилаються автоматично протягом року безкоштовно.',
    'faq.q3': 'Що робити, якщо реєстратор іншої моделі?',
    'faq.a3': 'Ми можемо адаптувати компоненту під ваш реєстратор за додаткову плату.',
    'faq.q4': 'Які способи оплати доступні?',
    'faq.a4': 'Приймаємо оплату банківським переказом та електронними платежами.',
    'faq.q5': 'Чи є демо-версія?',
    'faq.a5': 'Так, надаємо тестовий період на 14 днів для ознайомлення.',
    'faq.q6': 'Скільки часу займає впровадження?',
    'faq.a6': 'Зазвичай впровадження займає від 1 до 3 робочих днів.',
    
    // CTA
    'cta.title': 'Готові почати?',
    'cta.subtitle': 'Отримайте професійну консультацію та замовте рішення',
    'cta.button': 'Отримати консультацію',
    
    // Footer
    'footer.navigation': 'Навігація',
    'footer.contacts': 'Наші контакти',
    'footer.phone': 'Телефон',
    'footer.schedule': 'Пн. - Пт.: з 8:00 до 17:00',
    'footer.weekend': 'Сб. - Нд.: вихідні',
    'footer.address': 'м. Луцьк, вул. Святовасилівська 4/3',
    'footer.rights': '© 2025 ModulSoft. Всі права захищені.',
    'footer.privacy': 'Політика приватності',
    
    // Contact Modal
    'contact.title': 'Замовити консультацію',
    'contact.description': 'Заповніть форму, і ми зв\'яжемося з вами для обговорення ваших потреб',
    'contact.phone': 'Телефон',
    'contact.email': 'Email',
    'contact.name': 'ПІБ',
    'contact.company': 'Назва компанії',
    'contact.submit': 'Відправити заявку',
    'contact.cancel': 'Скасувати',
    'contact.required': 'обов\'язкові поля для заповнення',
    'contact.privacy.text': 'Я погоджуюсь на обробку персональних даних згідно з',
    'contact.privacy.link': 'Політикою конфіденційності',
    'contact.success.title': 'Заявку отримано!',
    'contact.success.description': 'Ми зв\'яжемося з вами протягом години для обговорення деталей.',
    'contact.submitting': 'Відправляємо...',
    'contact.error.required': 'Будь ласка, заповніть обов\'язкові поля (телефон та email)',
    'contact.error.privacy': 'Необхідно підтвердити згоду на обробку персональних даних',
    'contact.error.submit': 'Помилка відправки заявки. Спробуйте ще раз.',
    'contact.success.toast': 'Заявку успішно відправлено! Ми зв\'яжемося з вами найближчим часом.',
    
    // Contacts Page
    'contacts.title': 'Контакти',
    'contacts.address.title': 'Адреса',
    'contacts.address.value': 'м. Луцьк, вул. Святовасилівська 4, 3',
    'contacts.sales.title': 'Відділ продаж',
    'contacts.support.title': 'Технічна підтримка (Service Desk)',
    'contacts.accounting.title': 'Бухгалтерія',
    'contacts.portal.title': 'Портал для подачі звернень',
    'contacts.schedule.title': 'Режим роботи',
    'contacts.schedule.weekdays': 'Пн. - Пт.: з 8:00 до 17:00',
    'contacts.schedule.weekend': 'Сб. - Нд.: вихідні',
    'contacts.back': 'Назад',
    
    // Privacy Policy
    'privacy.title': 'Політика конфіденційності',
    'privacy.back': 'Назад',
    
    // Cookie Consent
    'cookies.message': 'Цей сайт використовує cookies для зручності користувача. Продовжуючи користування сайтом, ви погоджуєтесь з нашою Політикою конфіденційності.',
    'cookies.accept': 'Погоджуюсь',
    'cookies.learn': 'Детальніше',
    
    // Meta
    'meta.title': 'Driver POSNET / Thermal для 1С:Enterprise – купити / ціна / функції',
    'meta.description': 'Готова зовнішня компонента для інтеграції з POSNET / Thermal реєстраторами в 1С:Enterprise. Надійність, стабільність, техпідтримка. Ціна 1500 ₴.',
  },
  
  pl: {
    // Header & Navigation
    'nav.home': 'Główna',
    'nav.product': 'Produkt',
    'nav.features': 'Funkcje',
    'nav.pricing': 'Cena',
    'nav.faq': 'FAQ',
    'nav.contacts': 'Kontakt',
    'nav.call': 'Zadzwoń',
    
    // Hero Section
    'hero.title': 'Driver POSNET / Thermal',
    'hero.subtitle': 'dla 1С:Enterprise',
    'hero.description': 'Gotowy komponent zewnętrzny do integracji z drukarkami fiskalnymi POSNET / Thermal. Niezawodność, stabilność i profesjonalne wsparcie techniczne.',
    'hero.experience': '16+ lat doświadczenia',
    'hero.projects': '200+ udanych projektów',
    'hero.specialists': '40+ certyfikowanych specjalistów',
    'hero.cta.order': 'Zamów teraz',
    'hero.cta.demo': 'Uzyskaj konsultację',
    
    // Product Description
    'product.title': 'Co to jest?',
    'product.subtitle': 'Profesjonalne rozwiązanie do integracji',
    'product.description': 'Nasz komponent zapewnia pełną integrację drukarek fiskalnych POSNET i Thermal z systemem 1С:Enterprise. Rozwiązanie zostało opracowane z uwzględnieniem wszystkich wymagań ukraińskiego i polskiego prawa.',
    'product.benefits.reliability': 'Niezawodność',
    'product.benefits.reliability.desc': 'Stabilna praca nawet przy wysokich obciążeniach',
    'product.benefits.support': 'Wsparcie',
    'product.benefits.support.desc': 'Profesjonalne wsparcie techniczne 24/7',
    'product.benefits.integration': 'Integracja',
    'product.benefits.integration.desc': 'Szybkie wdrożenie bez przerywania pracy',
    'product.benefits.compliance': 'Zgodność',
    'product.benefits.compliance.desc': 'Pełna zgodność z prawem',
    
    // Features
    'features.title': 'Funkcjonalności',
    'features.subtitle': 'Wszystko co potrzebne do pracy z drukarkami fiskalnymi',
    'features.sales.title': 'Sprzedaż i paragony',
    'features.sales.desc': 'Wystawianie paragonów fiskalnych i niefiskalnych, praca ze zniżkami i różnymi typami płatności',
    'features.reports.title': 'Raporty',
    'features.reports.desc': 'Raporty X i Z, raporty za okresy, szczegółowa analityka sprzedaży',
    'features.status.title': 'Status drukarki',
    'features.status.desc': 'Monitorowanie stanu urządzenia, zapasu papieru, błędów i parametrów technicznych',
    'features.errors.title': 'Obsługa błędów',
    'features.errors.desc': 'Szczegółowe logowanie, diagnostyka problemów i automatyczne odzyskiwanie',
    'features.config.title': 'Konfiguracja',
    'features.config.desc': 'Elastyczna konfiguracja parametrów drukarki według Twoich potrzeb',
    'features.backup.title': 'Kopia zapasowa',
    'features.backup.desc': 'Automatyczne tworzenie kopii zapasowych i odzyskiwanie danych',
    
    // Pricing
    'pricing.title': 'Cena i warunki',
    'pricing.subtitle': 'Przejrzysta cena bez ukrytych opłat',
    'pricing.price': '1500 zł',
    'pricing.currency': 'złotych polskich',
    'pricing.features.license': 'Bezterminowa licencja',
    'pricing.features.updates': 'Bezpłatne aktualizacje przez rok',
    'pricing.features.support': 'Wsparcie techniczne 6 miesięcy',
    'pricing.features.documentation': 'Pełna dokumentacja',
    'pricing.features.examples': 'Przykłady użycia',
    'pricing.features.installation': 'Pomoc w instalacji',
    'pricing.cta': 'Zamów teraz',
    
    // Social Proof
    'social.title': 'Zaufanie klientów',
    'social.subtitle': 'Ponad 200 udanych wdrożeń',
    'social.experience': 'lat doświadczenia',
    'social.projects': 'projektów',
    'social.clients': 'zadowolonych klientów',
    'social.specialists': 'specjalistów',
    
    // FAQ
    'faq.title': 'Często zadawane pytania',
    'faq.q1': 'Czy pasuje do wszystkich wersji 1С:Enterprise?',
    'faq.a1': 'Tak, komponent jest kompatybilny z wersjami 1С:Enterprise 8.2 i nowszymi.',
    'faq.q2': 'Jak przebiega aktualizacja komponentu?',
    'faq.a2': 'Aktualizacje są wysyłane automatycznie przez rok bezpłatnie.',
    'faq.q3': 'Co robić, jeśli drukarka to inny model?',
    'faq.a3': 'Możemy dostosować komponent do Twojej drukarki za dodatkową opłatą.',
    'faq.q4': 'Jakie sposoby płatności są dostępne?',
    'faq.a4': 'Przyjmujemy płatności przelewem bankowym i płatności elektroniczne.',
    'faq.q5': 'Czy jest wersja demo?',
    'faq.a5': 'Tak, zapewniamy okres testowy 14 dni na zapoznanie.',
    'faq.q6': 'Ile czasu zajmuje wdrożenie?',
    'faq.a6': 'Zazwyczaj wdrożenie zajmuje od 1 do 3 dni roboczych.',
    
    // CTA
    'cta.title': 'Gotowy do rozpoczęcia?',
    'cta.subtitle': 'Uzyskaj profesjonalną konsultację i zamów rozwiązanie',
    'cta.button': 'Uzyskaj konsultację',
    
    // Footer
    'footer.navigation': 'Nawigacja',
    'footer.contacts': 'Nasze kontakty',
    'footer.phone': 'Telefon',
    'footer.schedule': 'Pon. - Pt.: 8:00 do 17:00',
    'footer.weekend': 'So. - Nd.: weekendy',
    'footer.address': 'Łuck, ul. Świętowasylijska 4/3',
    'footer.rights': '© 2025 ModulSoft. Wszystkie prawa zastrzeżone.',
    'footer.privacy': 'Polityka prywatności',
    
    // Contact Modal
    'contact.title': 'Zamów konsultację',
    'contact.description': 'Wypełnij formularz, a skontaktujemy się z Tobą, aby omówić Twoje potrzeby',
    'contact.phone': 'Telefon',
    'contact.email': 'Email',
    'contact.name': 'Imię i nazwisko',
    'contact.company': 'Nazwa firmy',
    'contact.submit': 'Wyślij zapytanie',
    'contact.cancel': 'Anuluj',
    'contact.required': 'pola wymagane do wypełnienia',
    'contact.privacy.text': 'Zgadzam się na przetwarzanie danych osobowych zgodnie z',
    'contact.privacy.link': 'Polityką prywatności',
    'contact.success.title': 'Zapytanie otrzymane!',
    'contact.success.description': 'Skontaktujemy się z Tobą w ciągu godziny, aby omówić szczegóły.',
    'contact.submitting': 'Wysyłamy...',
    'contact.error.required': 'Proszę wypełnić wymagane pola (telefon i email)',
    'contact.error.privacy': 'Konieczne jest potwierdzenie zgody na przetwarzanie danych osobowych',
    'contact.error.submit': 'Błąd wysyłania zapytania. Spróbuj ponownie.',
    'contact.success.toast': 'Zapytanie wysłane pomyślnie! Skontaktujemy się z Tobą wkrótce.',
    
    // Contacts Page
    'contacts.title': 'Kontakt',
    'contacts.address.title': 'Adres',
    'contacts.address.value': 'Łuck, ul. Świętowasylijska 4, 3',
    'contacts.sales.title': 'Dział sprzedaży',
    'contacts.support.title': 'Wsparcie techniczne (Service Desk)',
    'contacts.accounting.title': 'Księgowość',
    'contacts.portal.title': 'Portal do składania zapytań',
    'contacts.schedule.title': 'Godziny pracy',
    'contacts.schedule.weekdays': 'Pon. - Pt.: 8:00 do 17:00',
    'contacts.schedule.weekend': 'So. - Nd.: weekendy',
    'contacts.back': 'Wstecz',
    
    // Privacy Policy
    'privacy.title': 'Polityka prywatności',
    'privacy.back': 'Wstecz',
    
    // Cookie Consent
    'cookies.message': 'Ta strona używa plików cookies dla wygody użytkownika. Kontynuując korzystanie ze strony, zgadzasz się na naszą Politykę prywatności.',
    'cookies.accept': 'Zgadzam się',
    'cookies.learn': 'Dowiedz się więcej',
    
    // Meta
    'meta.title': 'Driver POSNET / Thermal dla 1С:Enterprise – kup / cena / funkcje',
    'meta.description': 'Gotowy komponent zewnętrzny do integracji z drukarkami POSNET / Thermal w 1С:Enterprise. Niezawodność, stabilność, wsparcie techniczne. Cena 1500 zł.',
  },
  
  ru: {
    // Header & Navigation
    'nav.home': 'Главная',
    'nav.product': 'Продукт',
    'nav.features': 'Функции',
    'nav.pricing': 'Цена',
    'nav.faq': 'FAQ',
    'nav.contacts': 'Контакты',
    'nav.call': 'Позвонить',
    
    // Hero Section
    'hero.title': 'Driver POSNET / Thermal',
    'hero.subtitle': 'для 1С:Enterprise',
    'hero.description': 'Готовая внешняя компонента для интеграции с фискальными регистраторами POSNET / Thermal. Надежность, стабильность и профессиональная техподдержка.',
    'hero.experience': '16+ лет опыта',
    'hero.projects': '200+ успешных проектов',
    'hero.specialists': '40+ сертифицированных специалистов',
    'hero.cta.order': 'Заказать сейчас',
    'hero.cta.demo': 'Получить консультацию',
    
    // Product Description
    'product.title': 'Что это такое?',
    'product.subtitle': 'Профессиональное решение для интеграции',
    'product.description': 'Наша компонента обеспечивает полную интеграцию фискальных регистраторов POSNET и Thermal с системой 1С:Enterprise. Решение разработано с учетом всех требований украинского и польского законодательства.',
    'product.benefits.reliability': 'Надежность',
    'product.benefits.reliability.desc': 'Стабильная работа даже при высоких нагрузках',
    'product.benefits.support': 'Поддержка',
    'product.benefits.support.desc': 'Профессиональная техническая поддержка 24/7',
    'product.benefits.integration': 'Интеграция',
    'product.benefits.integration.desc': 'Быстрое внедрение без остановки работы',
    'product.benefits.compliance': 'Соответствие',
    'product.benefits.compliance.desc': 'Полное соответствие законодательству',
    
    // Features
    'features.title': 'Функциональные возможности',
    'features.subtitle': 'Все необходимое для работы с фискальными регистраторами',
    'features.sales.title': 'Продажи и чеки',
    'features.sales.desc': 'Выдача фискальных и нефискальных чеков, работа со скидками и различными типами оплаты',
    'features.reports.title': 'Отчеты',
    'features.reports.desc': 'X и Z отчеты, отчеты за периоды, детальная аналитика продаж',
    'features.status.title': 'Статус регистратора',
    'features.status.desc': 'Мониторинг состояния устройства, остатка бумаги, ошибок и технических параметров',
    'features.errors.title': 'Обработка ошибок',
    'features.errors.desc': 'Детальное логирование, диагностика проблем и автоматическое восстановление',
    'features.config.title': 'Настройки',
    'features.config.desc': 'Гибкая настройка параметров регистратора под ваши нужды',
    'features.backup.title': 'Резервирование',
    'features.backup.desc': 'Автоматическое создание резервных копий и восстановление данных',
    
    // Pricing
    'pricing.title': 'Цена и условия',
    'pricing.subtitle': 'Прозрачная цена без скрытых платежей',
    'pricing.price': '1500 ₽',
    'pricing.currency': 'российских рублей',
    'pricing.features.license': 'Бессрочная лицензия',
    'pricing.features.updates': 'Бесплатные обновления в течение года',
    'pricing.features.support': 'Техническая поддержка 6 месяцев',
    'pricing.features.documentation': 'Полная документация',
    'pricing.features.examples': 'Примеры использования',
    'pricing.features.installation': 'Помощь с установкой',
    'pricing.cta': 'Заказать сейчас',
    
    // Social Proof
    'social.title': 'Доверие клиентов',
    'social.subtitle': 'Более 200 успешных внедрений',
    'social.experience': 'лет опыта',
    'social.projects': 'проектов',
    'social.clients': 'довольных клиентов',
    'social.specialists': 'специалистов',
    
    // FAQ
    'faq.title': 'Часто задаваемые вопросы',
    'faq.q1': 'Подходит ли для всех версий 1С:Enterprise?',
    'faq.a1': 'Да, компонента совместима с версиями 1С:Enterprise 8.2 и новее.',
    'faq.q2': 'Как происходит обновление компоненты?',
    'faq.a2': 'Обновления отправляются автоматически в течение года бесплатно.',
    'faq.q3': 'Что делать, если регистратор другой модели?',
    'faq.a3': 'Мы можем адаптировать компоненту под ваш регистратор за дополнительную плату.',
    'faq.q4': 'Какие способы оплаты доступны?',
    'faq.a4': 'Принимаем оплату банковским переводом и электронными платежами.',
    'faq.q5': 'Есть ли демо-версия?',
    'faq.a5': 'Да, предоставляем тестовый период на 14 дней для ознакомления.',
    'faq.q6': 'Сколько времени занимает внедрение?',
    'faq.a6': 'Обычно внедрение занимает от 1 до 3 рабочих дней.',
    
    // CTA
    'cta.title': 'Готовы начать?',
    'cta.subtitle': 'Получите профессиональную консультацию и закажите решение',
    'cta.button': 'Получить консультацию',
    
    // Footer
    'footer.navigation': 'Навигация',
    'footer.contacts': 'Наши контакты',
    'footer.phone': 'Телефон',
    'footer.schedule': 'Пн. - Пт.: с 8:00 до 17:00',
    'footer.weekend': 'Сб. - Вс.: выходные',
    'footer.address': 'г. Луцк, ул. Святовасильевская 4/3',
    'footer.rights': '© 2025 ModulSoft. Все права защищены.',
    'footer.privacy': 'Политика конфиденциальности',
    
    // Contact Modal
    'contact.title': 'Заказать консультацию',
    'contact.description': 'Заполните форму, и мы свяжемся с вами для обсуждения ваших потребностей',
    'contact.phone': 'Телефон',
    'contact.email': 'Email',
    'contact.name': 'ФИО',
    'contact.company': 'Название компании',
    'contact.submit': 'Отправить заявку',
    'contact.cancel': 'Отменить',
    'contact.required': 'обязательные поля для заполнения',
    'contact.privacy.text': 'Я согласен на обработку персональных данных согласно',
    'contact.privacy.link': 'Политике конфиденциальности',
    'contact.success.title': 'Заявка получена!',
    'contact.success.description': 'Мы свяжемся с вами в течение часа для обсуждения деталей.',
    'contact.submitting': 'Отправляем...',
    'contact.error.required': 'Пожалуйста, заполните обязательные поля (телефон и email)',
    'contact.error.privacy': 'Необходимо подтвердить согласие на обработку персональных данных',
    'contact.error.submit': 'Ошибка отправки заявки. Попробуйте еще раз.',
    'contact.success.toast': 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
    
    // Contacts Page
    'contacts.title': 'Контакты',
    'contacts.address.title': 'Адрес',
    'contacts.address.value': 'г. Луцк, ул. Святовасильевская 4, 3',
    'contacts.sales.title': 'Отдел продаж',
    'contacts.support.title': 'Техническая поддержка (Service Desk)',
    'contacts.accounting.title': 'Бухгалтерия',
    'contacts.portal.title': 'Портал для подачи обращений',
    'contacts.schedule.title': 'Режим работы',
    'contacts.schedule.weekdays': 'Пн. - Пт.: с 8:00 до 17:00',
    'contacts.schedule.weekend': 'Сб. - Вс.: выходные',
    'contacts.back': 'Назад',
    
    // Privacy Policy
    'privacy.title': 'Политика конфиденциальности',
    'privacy.back': 'Назад',
    
    // Cookie Consent
    'cookies.message': 'Этот сайт использует cookies для удобства пользователя. Продолжая пользование сайтом, вы соглашаетесь с нашей Политикой конфиденциальности.',
    'cookies.accept': 'Согласен',
    'cookies.learn': 'Подробнее',
    
    // Meta
    'meta.title': 'Driver POSNET / Thermal для 1С:Enterprise – купить / цена / функции',
    'meta.description': 'Готовая внешняя компонента для интеграции с POSNET / Thermal регистраторами в 1С:Enterprise. Надежность, стабильность, техподдержка. Цена 1500 ₽.',
  }
}

const TranslationContext = createContext<TranslationContextType | null>(null)

interface TranslationProviderProps {
  children: ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const [language, setLanguage] = useKV<Language>('preferred-language', 'uk')

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
    
    if (titleElement) {
      titleElement.textContent = t('meta.title')
    }
    
    if (descriptionElement) {
      descriptionElement.setAttribute('content', t('meta.description'))
    }
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
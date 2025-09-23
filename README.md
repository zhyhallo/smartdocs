# 🦉 POSNET Driver Landing Page

[![Performance](https://img.shields.io/badge/Performance-Optimized-green.svg)](https://pagespeed.web.dev/)
[![Responsive](https://img.shields.io/badge/Responsive-Yes-blue.svg)](https://www.responsivedesignchecker.com/)
[![SEO](https://img.shields.io/badge/SEO-Optimized-yellow.svg)](https://developers.google.com/speed/pagespeed/insights/)
[![Multilingual](https://img.shields.io/badge/Languages-3-red.svg)](https://github.com/modulsoft-eu/posnet-driver-landing)

> 🇺🇦 **Професійний лендінг для Driver POSNET у системі 1С:Enterprise**  
> 🇵🇱 **Profesjonalna strona dla Driver POSNET w systemie 1С:Enterprise**  
> 🇷🇺 **Профессиональный лендинг для Driver POSNET в системе 1С:Enterprise**

Високопродуктивний, адаптивний лендінг для продажу компоненти Driver POSNET / Thermal для 1С:Enterprise. Створений з використанням сучасних технологій веб-розробки та оптимізований для максимальної продуктивності.

## 🚀 **Швидкий Старт**

### Вимоги
- **Node.js**: версія 18+ 
- **npm**: версія 8+
- **Git**: останья версія

### Клонування та встановлення

```bash
# 1. Клонувати репозиторій
git clone https://github.com/modulsoft-eu/posnet-driver-landing.git
cd posnet-driver-landing

# 2. Встановити залежності
npm install

# 3. Запустити проект локально
npm run dev

# 4. Відкрити в браузері
# http://localhost:5173
```

### Інші команди

```bash
# Збільшення (production build)
npm run build

# Попередній перегляд production збірки
npm run preview

# Лінтування коду
npm run lint

# Перевірка типів TypeScript
npm run type-check
```

## 📁 **Структура Проекту**

```
posnet-driver-landing/
├── 📄 index.html              # Основний HTML файл (SEO оптимізовано)
├── 📦 package.json            # Залежності проекту
├── ⚙️  vite.config.ts         # Конфігурація Vite
├── 🎨 tailwind.config.js      # Конфігурація Tailwind CSS
├── 📝 tsconfig.json           # Конфігурація TypeScript
├── 🎯 src/
│   ├── 📄 main.tsx            # Точка входу React додатку
│   ├── 🔧 App.tsx             # Головний компонент додатку
│   ├── 🎨 index.css           # Глобальні стилі та змінні теми
│   ├── 📱 components/         # React компоненти
│   │   ├── 🎯 Hero.tsx           # Головна секція
│   │   ├── 📋 Features.tsx       # Функціональні можливості
│   │   ├── 💰 Pricing.tsx        # Ціни та тарифи
│   │   ├── ❓ FAQ.tsx            # Часто задавані питання
│   │   ├── 📞 ContactModal.tsx   # Модальне вікно контактів
│   │   ├── 🦉 OwlMascot.tsx      # Анімовані сови-талісмани
│   │   ├── 🌍 LanguageSwitcher.tsx # Перемикач мов
│   │   └── 🎨 ui/               # UI компоненти (shadcn/ui)
│   ├── 🎣 hooks/               # React хуки
│   │   ├── 🌐 useTranslation.ts  # Багатомовність
│   │   ├── 👀 useInView.ts       # Відстеження видимості елементів
│   │   └── 🖱️  useSmoothScroll.ts # Плавний скрол
│   ├── 🛠️  utils/              # Утиліти та допоміжні функції
│   │   ├── ⚡ optimization.ts   # Оптимізації продуктивності
│   │   └── 🎯 seo.ts            # SEO утиліти
│   └── 🎨 assets/             # Статичні файли (зображення, іконки)
├── 📄 public/                 # Публічні файли
│   ├── 🎨 favicon.svg          # Іконка сайту
│   ├── 🗺️ sitemap.xml          # Карта сайту для пошуковиків
│   └── 🤖 robots.txt           # Правила для пошукових ботів
└── 📝 README.md              # Цей файл
```

## 🌟 **Основні Функції**

### 🎨 **Дизайн та UI/UX**
- ✅ **Адаптивний дизайн** - ідеально працює на всіх пристроях
- ✅ **Мінімалістичний стиль** - чиста та сучасна естетика
- ✅ **Анімовані елементи** - плавні переходи та мікроінтеракції
- ✅ **Корпоративна тематика** - брендовані сови як талісмани
- ✅ **Кольорова схема** - синьо-блакитна гама у стилі ModulSoft

### 🌍 **Багатомовність**
- 🇺🇦 **Українська** - основна мова
- 🇵🇱 **Польська** - для польського ринку
- 🇷🇺 **Російська** - додаткова підтримка

### ⚡ **Продуктивність**
- 🚀 **Optimized Bundle** - мінімальний розмір збірки
- 🖼️ **Image Optimization** - WebP підтримка та ледача загрузка
- 📱 **Mobile-First** - пріоритет мобільних пристроїв
- ⚡ **Fast Loading** - оптимізована швидкість завантаження
- 🎯 **Core Web Vitals** - відповідність стандартам Google

### 🔍 **SEO Оптимізація**
- 🏷️ **Meta Tags** - повноцінні мета-теги для всіх мов
- 🌐 **Structured Data** - розмітка Schema.org
- 📍 **Local SEO** - локальна оптимізація для України/Польщі
- 🗺️ **Sitemap** - автоматично згенерована карта сайту
- 🤖 **robots.txt** - правила для пошукових систем

### 📞 **Інтеграції**
- 📲 **Zadarma Widget** - віджет зворотного дзвінка
- 📊 **Google Analytics** - відстеження відвідувачів
- 🎯 **Microsoft Clarity** - аналіз поведінки користувачів
- 🔥 **Hotjar** - тепловий аналіз

## 🛠️ **Технології**

### Frontend Framework
- **React 18** - сучасна бібліотека для UI
- **TypeScript** - типізований JavaScript
- **Vite** - швидкий збирач і dev сервер

### Стилізація
- **Tailwind CSS** - utility-first CSS фреймворк
- **shadcn/ui** - сучасні UI компоненти
- **Framer Motion** - анімації та інтеракції

### Іконки та Графіка
- **Phosphor Icons** - мінімалістичні SVG іконки
- **Custom SVG Animation** - авторські анімовані сови

### Оптимізація
- **Bundle Splitting** - розділення коду
- **Tree Shaking** - видалення невикористаного коду
- **Image Compression** - оптимізація зображень
- **Critical CSS** - критичні стилі inline

## 🎯 **Ключові Компоненти**

### 🦉 **OwlMascot** - Анімовані Талісмани
```tsx
<OwlMascot 
  variant="analyst"    // analyst | loader | simple
  size="lg"           // xs | sm | md | lg | xl | 2xl
  animated={true}     // вмикає анімації
  className="custom"  // додаткові стилі
/>
```

### 🌍 **LanguageSwitcher** - Перемикач Мов
```tsx
<LanguageSwitcher 
  position="header"   // header | footer | floating
  variant="dropdown"  // dropdown | buttons
/>
```

### 📞 **ContactModal** - Форма Зворотного Зв'язку
```tsx
<ContactModal 
  open={isOpen}
  onOpenChange={setIsOpen}
  defaultService="Консультація"
  onPrivacyClick={handlePrivacy}
/>
```

## 📱 **Адаптивність**

### Брейкпоінти
- 📱 **Mobile**: 320px - 768px
- 📟 **Tablet**: 769px - 1024px  
- 💻 **Desktop**: 1025px+

### Оптимізація для пристроїв
- ✅ **Touch-friendly** - зручні тач-таргети (мінімум 44px)
- ✅ **Readable fonts** - адаптивні розміри шрифтів
- ✅ **Centered layouts** - досконале центрування на всіх пристроях
- ✅ **Modal optimization** - мобільно-оптимізовані модальні вікна

## 🔧 **Конфігурація**

### Змінні середовища (.env)
```env
# Analytics
VITE_GA_MEASUREMENT_ID=GA_MEASUREMENT_ID
VITE_CLARITY_PROJECT_ID=CLARITY_PROJECT_ID
VITE_HOTJAR_ID=HOTJAR_ID

# Zadarma Widget
VITE_ZADARMA_WIDGET_ID=edec1cbf8a1f75508f534464a2b4fa55

# API URLs
VITE_API_BASE_URL=https://api.modulsoft.eu
VITE_CONTACT_ENDPOINT=/contact/submit
```

### Кольорова схема (CSS змінні)
```css
:root {
  /* Основні кольори */
  --background: oklch(0.98 0.02 240);      /* Білий фон */
  --foreground: oklch(0.15 0.08 240);      /* Темний текст */
  --primary: oklch(0.55 0.22 240);         /* Основний синій */
  --accent: oklch(0.65 0.18 220);          /* Блакитний акцент */
  
  /* Радіус елементів */
  --radius: 0.5rem;
}
```

## 📊 **Метрики Продуктивності**

### Цільові показники
- 🎯 **First Contentful Paint**: < 1.5s
- 🎯 **Largest Contentful Paint**: < 2.5s
- 🎯 **Total Blocking Time**: < 200ms
- 🎯 **Cumulative Layout Shift**: < 0.1
- 🎯 **Speed Index**: < 3.5s

### Оптимізації
- ⚡ **Code Splitting** - розділення на чанки
- 🖼️ **Image Optimization** - WebP + lazy loading  
- 📱 **Mobile-first** - мобільна оптимізація
- 🎯 **Resource Hints** - preload, prefetch, preconnect
- 📦 **Bundle Optimization** - tree shaking, minification

## 🔍 **SEO Оптимізації**

### Structured Data (Schema.org)
- 🏢 **Organization** - інформація про ModulSoft
- 💻 **SoftwareApplication** - дані про Driver POSNET
- 📍 **LocalBusiness** - локальний бізнес профіль
- ❓ **FAQPage** - структуровані FAQ
- 🌐 **WebPage** - метадані сторінки

### Мета-теги для кожної мови
```html
<!-- Українська -->
<meta name="description" content="✅ Готова зовнішня компонента...">
<meta name="keywords" content="POSNET драйвер 1С, фіскальний...">

<!-- Польська -->  
<meta name="description" content="✅ Gotowy komponent zewnętrzny...">
<meta name="keywords" content="sterownik POSNET 1С, kasa fiskalna...">
```

## 🚀 **Деплой та Хостинг**

### Рекомендовані платформи
1. **Vercel** - оптимально для React додатків
2. **Netlify** - відмінна підтримка форм та редиректів
3. **GitHub Pages** - безкоштовний хостинг для статичних сайтів
4. **ModulSoft Server** - власний сервер компанії

### Команди деплою
```bash
# Збірка для продакшену
npm run build

# Попередній перегляд збірки
npm run preview

# Deploy на Vercel
npm install -g vercel
vercel --prod

# Deploy на Netlify
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Налаштування домену
```
Основний домен: https://posnet.modulsoft.eu
Альтернативи:
- https://driver-posnet.modulsoft.eu  
- https://posnet-driver.modulsoft.eu
```

## 👥 **Команда розробників**

### ModulSoft Development Team
- 🎨 **UI/UX Design** - Дизайн та користувацький досвід
- 💻 **Frontend Development** - React, TypeScript, Tailwind
- 🔧 **Backend Integration** - API та форми зворотного зв'язку
- 📊 **Analytics & SEO** - Оптимізація та аналітика
- 🧪 **Quality Assurance** - Тестування на всіх пристроях

### Контакти
- 📧 **Email**: info@modulsoft.eu
- 📞 **Телефон**: +38 (093) 177-65-04
- 🌐 **Веб-сайт**: https://modulsoft.eu
- 📍 **Адреса**: 43025, м. Луцьк, вул. Святовасилівська 4/3

## 📝 **Ліцензія**

© 2025 ModulSoft. Всі права захищені.

Цей проект є власністю компанії ModulSoft та призначений для комерційного використання. Несанкціонована копіювання, розповсюдження або модифікація заборонені.

## 🐛 **Звіти про Баги**

Знайшли помилку? Маєте пропозицію?

1. 📧 **Email**: support@modulsoft.eu
2. 📞 **Гаряча лінія**: +38 (093) 177-65-02  
3. 🎯 **Service Desk**: https://24.modulsoft.eu

---

<div align="center">

**🦉 Створено з ❤️ командою ModulSoft**

[![ModulSoft](https://img.shields.io/badge/ModulSoft-16%2B%20years-blue.svg)](https://modulsoft.eu)
[![Ukraine](https://img.shields.io/badge/Made_in-Ukraine-yellow.svg?labelColor=blue)](https://ukraine.ua/)

</div>
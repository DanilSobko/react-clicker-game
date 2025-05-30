🎮 Clicker Game
Clicker Game — це повнофункціональна браузерна гра у жанрі клікер, створена з використанням сучасного JavaScript-стеку (React + Vite). Гравець натискає на кнопку, щоб заробляти кредити, витрачати їх на апгрейди, відкривати кейси з ефектами, крутити колесо фортуни, відкривати досягнення, змінювати зовнішній вигляд гри та скидувати прогрес задля престижу.

🔥 Основні особливості
💰 Натискання — головне джерело кредитів у грі.

⬆️ Апгрейди:

Click Power — підвищує силу одного кліку.

Auto Clicker — автоматичне натискання.

Passive Income — дає кредити щосекунди.

Combo Click — дає бонуси за серії кліків.

Critical Click — шанс на потужніші кліки.

🎁 Кейси:

Бронзовий, Срібний, Золотий та Таємний.

Містять випадкові бонуси чи антибонуси.

Анімація трясіння при відкритті.

🎡 Колесо фортуни:

Дає унікальні ефекти: множники, заморозка апгрейдів, кредити тощо.

Прокручується раз на 2 хвилини.

🧥 Магазин скінів:

Купівля скінів за кредити.

Зміна стилю інтерфейсу гри.

🏆 Досягнення:

Відображають прогрес гравця.

Активуються при досягненні цілей.

♻️ Престиж:

Скидає прогрес за duiktcoins.

Відкриває нові можливості.

🎵 Музичний плеєр:

Відтворення кількох треків.

Кнопки "Пауза", "Наступний трек".

Керування гучністю.

💾 Збереження прогресу:

Автоматичне через localStorage.

Працює навіть після перезавантаження.

🧠 Стан гри через React Context.

🧑‍💻 Технології
⚛️ React

⚡ Vite

🎨 CSS Modules + SCSS

🧠 React Context API

💾 localStorage

🗃️ IndexedDB (незабаром)

☁️ GitHub Pages

🚀 Інструкція з розгортання
🔁 Клонування проєкту
Встанови Git, якщо ще не встановлено: https://git-scm.com/downloads

Відкрий термінал (або PowerShell).

Клонуй репозиторій:

bash
Копіювати
Редагувати
git clone https://github.com/DanilSobko/react-clicker-game1.git
cd react-clicker-game1
❗ Якщо репозиторій уже додано, і з’являється remote origin already exists, можеш видалити старий origin:

bash
Копіювати
Редагувати
git remote remove origin
git remote add origin https://github.com/DanilSobko/react-clicker-game1.git
🧩 Встановлення залежностей
Перед запуском переконайся, що встановлено:

Node.js (версія ≥ 16): https://nodejs.org/

Після цього:

bash
Копіювати
Редагувати
npm install
▶️ Запуск проєкту локально
bash
Копіювати
Редагувати
npm run dev
Гра відкриється зазвичай на: http://localhost:5173

🌍 Деплой на GitHub Pages (опціонально)
Встанови gh-pages, якщо ще не встановлено:

bash
Копіювати
Редагувати
npm install gh-pages --save-dev
У package.json додай:

json
Копіювати
Редагувати
"homepage": "https://your-username.github.io/react-clicker-game1",
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "gh-pages -d dist"
}
Деплой:

bash
Копіювати
Редагувати
npm run build
npm run deploy
📁 Структура проєкту
csharp
Копіювати
Редагувати
react-clicker-game1/
│
├── public/
│   └── [музичні треки, favicon тощо]
│
├── src/
│   ├── assets/        # Зображення, стилі
│   ├── components/    # Компоненти гри
│   ├── context/       # GameContext
│   ├── styles/        # SCSS / CSS-модулі
│   ├── App.jsx        # Головний компонент
│   └── main.jsx       # Точка входу
│
├── package.json
└── vite.config.js
🤝 Внесок
Хочеш допомогти? Форкни репозиторій, створи гілку (git checkout -b feature), внеси зміни та створи pull request!

📷 Скриншоти
(Можна вставити зображення з гри для наочності)

📜 Ліцензія
MIT License © 2025 DanilSobko

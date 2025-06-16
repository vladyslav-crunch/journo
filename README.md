## 🧑‍💻 Autor

Vladyslav Tretiak
IO 6.3

# 📓 Journo

Aplikacja typu dziennik, która pozwala użytkownikom tworzyć, edytować i usuwać wpisy tekstowe. Projekt został zbudowany jako pełnoprawna aplikacja full-stack z autoryzacją JWT oraz przechowywaniem danych w MongoDB.

---

## 🧩 Opis projektu

Celem projektu jest umożliwienie użytkownikom prowadzenia osobistego dziennika online. Każdy wpis zawiera tytuł, treść, datę i godzinę utworzenia. Dane są przechowywane w bazie MongoDB, a użytkownicy mają możliwość rejestracji i logowania z bezpieczną autoryzacją.

---

## ✨ Kluczowe funkcje

- 🔐 Rejestracja i logowanie z JWT
- 🧾 Tworzenie, edytowanie i usuwanie wpisów
- 🕓 Wybór dokładnej daty i godziny utworzenia wpisu 
- 🔎 Wyszukiwanie i filtrowanie wpisów
- 📋 Walidacja danych (frontend: Zod, backend: Zod + Mongoose)
- 📦 API RESTowe zbudowane w Express
- 💾 Dane przechowywane w MongoDB
- 🎨 Przyjazny interfejs użytkownika zbudowany z Tailwind CSS

---

## 🖼️ Zrzuty ekranu

### 📌 Dashboard – przegląd wpisów

![Dashboard](https://res.cloudinary.com/dxuwyrdbv/image/upload/v1750109380/dashboard_qjvm1y.png)

### 📌 Widok pojedynczego wpisu
![Entry View](https://res.cloudinary.com/dxuwyrdbv/image/upload/v1750109380/entry_view_sjp5ef.png)

### ✏️ Edycja wpisu
![Entry Edit](https://res.cloudinary.com/dxuwyrdbv/image/upload/v1750109380/Enrty_edit_dqrpnp.png)

---

## 🛠️ Technologie

### Frontend
- [React](https://reactjs.org/) — rozwijanie interfejsu użytkownika w oparciu o komponenty
- [Zod](https://github.com/colinhacks/zod) – walidacja formularzy
- [Tailwind CSS](https://tailwindcss.com/) – stylowanie interfejsu
- [React Toastify](https://fkhadra.github.io/react-toastify/) – powiadomienia

### Backend
- [Node.js](https://nodejs.org/) 
- [Express.js](https://expressjs.com/) 
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Zod](https://github.com/colinhacks/zod) – walidacja danych wejściowych
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) – obsługa tokenów JWT
- [dotenv](https://www.npmjs.com/package/dotenv) – zmienne środowiskowe

---

## 🔧 Konfiguracja środowiska

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/vladyslav-crunch/journo
   cd journal-app
   ```

2. Skonfiguruj `.env` w folderze `backend`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/journal-app
   JWT_SECRET=twoj_tajny_klucz
   JWT_EXPIRES_IN=1d
   ```

3. Uruchom backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. Uruchom frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

---




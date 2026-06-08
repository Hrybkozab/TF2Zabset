# Деплой на https://tf2zabset.netlify.app/

Пошаговый чеклист: что включить, куда вставить значения, какие файлы трогать.

---

## Схема (что уже в коде)

| Что | Где работает |
|-----|----------------|
| Сайт | Netlify → `dist/` после `npm run build` |
| Вход Steam | `auth-steam-start` → Steam → `auth-callback` → cookie |
| Профиль | `auth-session` + `steam-profile` |
| Гайды | `/api/guides` → Neon PostgreSQL |
| Локально | `npm run dev` → **http://localhost:8888** |

**Express (`server/`) не нужен**, если не задаёшь `VITE_API_BASE`.

---

## 1. Neon (база данных) — один раз

1. https://neon.tech → проект **TF2ZabseT**
2. **Postgres 16 или 18**, **Neon Auth — выключен**
3. SQL Editor → вставь весь файл:

   `server/src/database/schema.sql`

4. Скопируй connection string с **-pooler** в host, например:

   `postgresql://...@ep-xxx-pooler....neon.tech/neondb?sslmode=require`

---

## 2. Steam Web API Key — один раз

https://steamcommunity.com/dev/apikey

| Поле | Значение |
|------|----------|
| Domain | **`tf2zabset.netlify.app`** (без `https://`) |

Для локальной разработки создай **второй ключ** с доменом **`localhost`** и используй его только в локальном `.env`.

---

## 3. Секрет для сессий — один раз

В PowerShell:

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])
```

Или любая длинная случайная строка (32+ символа). Это **SESSION_SECRET** — не путать со Steam API Key.

---

## 4. Netlify → Environment variables

**Site configuration → Environment variables → Add variable**

Добавь **для Production** (и при желании Deploy previews):

| Key | Value | Откуда |
|-----|--------|--------|
| `STEAM_API_KEY` | `XXXXXXXX` | Steam dev portal (ключ для домена **tf2zabset.netlify.app**) |
| `SESSION_SECRET` | длинная случайная строка | шаг 3 |
| `DATABASE_URL` | `postgresql://...-pooler...?sslmode=require` | Neon, **pooler** |

Опционально (если используешь Loadouts / weapons proxy):

| Key | Назначение |
|-----|------------|
| `EXTERNAL_WEAPONS_API_BASE_URL` | URL внешнего API оружия |
| `WEAPONS_ENDPOINT_TEMPLATE` | шаблон пути, по умолчанию `/classes/{classId}/weapons` |
| `LOADOUT_TOKEN` | токен API |
| `LOADOUT_TOKEN_HEADER` | имя заголовка |
| `LOADOUT_AUTH_TYPE` | `header` / `bearer` / `query` |

**Не добавляй** `VITE_API_BASE` — иначе фронт полезет на Express вместо Netlify.

**Не нужно** дублировать ключи под другими именами — только три имени выше.

---

## 5. Файлы в репозитории (уже настроено)

| Файл | Роль |
|------|------|
| `netlify.toml` | build, functions, `/api/guides` → functions |
| `public/_redirects` | SPA на production (`/*` → `index.html`) |
| `netlify/functions/auth-steam-start.ts` | старт входа Steam |
| `netlify/functions/auth-callback.ts` | возврат после Steam |
| `netlify/functions/auth-session.ts` | кто залогинен |
| `netlify/functions/guides.ts` | гайды в Neon |
| `index.html` | уже `https://tf2zabset.netlify.app/` в meta |

Менять домен в коде **не обязательно** — `auth-steam-start` берёт origin из запроса (на Netlify будет твой домен автоматически).

---

## 6. Локальный `.env` (только на твоём ПК)

Файл: **`C:\Users\user\Desktop\ZabsEt\.env`** (не коммитится в git)

```env
STEAM_API_KEY=ключ_для_localhost
SESSION_SECRET=та_же_или_другая_строка
DATABASE_URL=postgresql://...-pooler...?sslmode=require
VITE_LOADOUTS_API_URL=/.netlify/functions/weapons
```

Потом:

```powershell
npm install
npm run db:migrate
npm run dev
```

Открыть: **http://localhost:8888**

---

## 7. Деплой на Netlify

1. Push в GitHub  
2. Netlify → **Deploys** → **Trigger deploy** → **Clear cache and deploy site**  
3. После деплоя открой https://tf2zabset.netlify.app/profile  
4. **Sign in with Steam**

---

## 8. Проверка production

- [ ] https://tf2zabset.netlify.app/ — главная открывается  
- [ ] Profile → Steam login → редирект обратно, виден аватар  
- [ ] DevTools → Application → Cookies → `zabset_session`  
- [ ] Guides → Create Guide → гайд виден в списке (нужен `DATABASE_URL`)  
- [ ] https://tf2zabset.netlify.app/.netlify/functions/auth-session — JSON с `user` или 401  

---

## 9. Типичные ошибки

| Симптом | Решение |
|---------|---------|
| `unknown option '--https'` | Уже убрано — просто `npm run dev` |
| Белый экран на 8888 | Перезапусти `npm run dev` после обновления `netlify.toml` |
| Access Denied на Steam | VPN/AdBlock off; не открывай длинный URL Steam вручную — только кнопка на сайте |
| Гайды не создаются | `DATABASE_URL` в Netlify + redeploy + `npm run db:migrate` на Neon |
| 503 Database not configured | Нет `DATABASE_URL` в Netlify env |
| Steam login на prod не работает | В API Key домен **tf2zabset.netlify.app**, redeploy |

---

## 10. Что пока не подключено (не блокирует вход)

- Twitter/X OAuth  
- TF2Center / logs.tf (только в папке `server/`, не в Netlify)  
- Публичная страница `/users/:steamId`  

Вход, профиль Steam и community guides на **tf2zabset.netlify.app** работают при шагах 1–7.

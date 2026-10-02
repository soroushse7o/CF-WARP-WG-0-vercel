# WARP WireGuard on Vercel

ساخت کانفیگ **Cloudflare WARP** (به‌صورت **WireGuard** و **AmneziaWG**) روی **Vercel** با رابط گرافیکی فارسی.

نگهدارنده و به‌روزرسانی: [soroushse7o](https://github.com/soroushse7o)

ایده و کد اصلی: Peyman — <https://github.com/Ptechgithub>

---

## امکانات

- رابط گرافیکی ساده (فارسی، راست‌به‌چپ، سازگار با موبایل و حالت تاریک)
- ساخت کانفیگ جدید با هر بار کلیک (اکانت و کلید تازه)
- دو صفحه‌ی جدا: **WireGuard** (مسیر `/`) و **AmneziaWG** (مسیر `/amnezia`)
- نام‌گذاری کانفیگ‌ها: پیش‌فرض `sevo-wg` (در AmneziaWG: `sevo-awg`) و در حالت چند Endpoint به‌صورت `sevo-wg-1` ، `sevo-wg-2` ، ... (نام قابل تغییر است)
- خروجی WireGuard در چهار فرمت: لینک `wireguard://`، فایل `.conf`، JSON خلاصه، JSON کامل
- منابع Endpoint: لیست عمومی (انتخاب تصادفی)، **IPv4 پیشنهادی**، **IPv6 پیشنهادی** و **لیست من**
- افزودن Endpointهای شخصی (نتیجه‌ی اسکنر خودتان) و ساخت یک کانفیگ برای **هر** Endpoint
- دانلود چند کانفیگ `.conf` به‌صورت یک فایل ZIP
- AmneziaWG: پیش‌تنظیم Junk سبک و سنگین، مقادیر دلخواه یا تصادفی، و پارامترهای Amnezia 1.5 (`I1` تا `I5`)
- بدون نیاز به کتابخانه‌ی خارجی برای کلیدها (X25519 با WebCrypto ساخته می‌شود)
- ورودی‌ها اعتبارسنجی می‌شوند، پاسخ‌ها `no-store` هستند و صفحه‌ها با CSP سخت‌گیرانه ارائه می‌شوند

---

## ساختار پروژه

```
├─ app/
│  ├─ [[...path]]/
│  │  └─ route.js    ← همه‌ی درخواست‌ها را به ورکر می‌دهد (Edge Runtime)
│  └─ layout.js      ← متادیتا و تنظیمات صفحه
├─ src/
│  ├─ index.js       ← منطق اصلی و مسیرها (ساخت کلید، ثبت دستگاه WARP، API)
│  ├─ ui.js          ← صفحه‌ی WireGuard (HTML)
│  └─ amnezia.js     ← صفحه‌ی AmneziaWG (HTML)
├─ vercel.json       ← تنظیمات Vercel (فریم‌ورک و ریجن)
├─ package.json
└─ README.md
```


## آموزش دیپلوی روی Vercel

### روش ۱: اتصال به GitHub (پیشنهادی)

1. پروژه را در یک مخزن GitHub بارگذاری کنید.
2. وارد <https://vercel.com> شوید و **Add New → Project** را بزنید.
3. مخزن را انتخاب و **Import** کنید.
4. Vercel فریم‌ورک را خودکار **Next.js** تشخیص می‌دهد. تنظیمات پیش‌فرض را نگه دارید و **Deploy** را بزنید.
5. بعد از چند دقیقه آدرس پروژه (مثلاً `https://your-project.vercel.app`) را باز کنید.

از این به بعد با هر `git push` ، نسخه‌ی جدید خودکار دیپلوی می‌شود.

### روش ۲: خط فرمان (Vercel CLI)

پیش‌نیاز: [Node.js](https://nodejs.org) نسخه‌ی 20.9 یا بالاتر.

```bash
npm install
npx vercel login        # ورود به حساب Vercel (یک بار)
npm run deploy          # دیپلوی در حالت production
```

### تست محلی

```bash
npm install
npm run dev             # معمولاً روی http://localhost:3000
```

### دامنه‌ی دلخواه (اختیاری)

در داشبورد Vercel: پروژه ← **Settings** ← **Domains** ← **Add**.

### ریجن اجرا

در فایل `vercel.json` مقدار `regions` روی `iad1` (آمریکا، شرق) تنظیم شده است. اگر ثبت اکانت WARP با خطای `403` یا `429` مواجه شد، می‌توانید ریجن دیگری انتخاب کنید.

---

## طرز استفاده

### صفحه‌ی WireGuard (مسیر `/`)

1. آدرس پروژه را در مرورگر باز کنید.
2. منبع Endpoint و فرمت خروجی را انتخاب کنید.
3. **ساخت کانفیگ جدید** را بزنید.
4. خروجی را **کپی** یا **دانلود** کنید و در کلاینت خود وارد کنید:
   - لینک `wireguard://` ← v2rayNG، NekoBox، Hiddify و مشابه
   - فایل `.conf` ← برنامه‌ی رسمی WireGuard

### صفحه‌ی AmneziaWG (مسیر `/amnezia`)

این کانفیگ فقط با کلاینت **AmneziaWG** کار می‌کند، نه برنامه‌ی WireGuard معمولی.

1. صفحه‌ی `/amnezia` را باز کنید (یا از تب بالای صفحه‌ی اصلی بروید).
2. Endpoint را وارد کنید. اگر خالی بماند، یک Endpoint تصادفی از لیست عمومی انتخاب می‌شود. برای ساخت چند کانفیگ، منبع را روی «همه Endpointهای ذخیره‌شده» بگذارید.
3. پارامترهای Junk را انتخاب کنید:

   | حالت | Jc / Jmin / Jmax |
   |------|------------------|
   | سبک | 3 / 1 / 3 |
   | سنگین | 5 / 10 / 40 |
   | دلخواه | هر مقدار دلخواه، یا دکمه‌ی **مقادیر تصادفی** |

4. اگر کلاینت شما از Amnezia 1.5 پشتیبانی می‌کند، گزینه‌ی **I1–I5** را فعال کنید (مقدار پیش‌فرض `I1` از قبل پر شده است).
5. **ساخت کانفیگ AmneziaWG** را بزنید و خروجی را کپی یا دانلود کنید.

مقدارهای ثابت در این صفحه: `S1 = 0` ، `S2 = 0` ، `H1..H4 = 1..4` و MTU پیش‌فرض `1280`. اگر چند کانفیگ بسازید، خروجی به‌صورت ZIP دانلود می‌شود.

> صفحه‌ی AmneziaWG کانفیگ پایه را از همین پروژه (مسیر `/conf`) می‌گیرد و پارامترهای مبهم‌سازی را در مرورگر شما به آن اضافه می‌کند.

### Endpointهای شخصی (اسکنر)

1. با اسکنر دلخواه خود، IP:PORTهای سالم شبکه‌ی خودتان را پیدا کنید.
2. در بخش **Endpointهای من** خروجی را paste کنید، هر خط به شکل:
   ```
   162.159.192.1:2408
   188.114.97.5:864 ping 45ms
   [2606:4700:d0::1]:2408
   ```
   متن اضافه (مثل پینگ) نادیده گرفته می‌شود و Endpointهای تکراری حذف می‌شوند.
3. **افزودن و ذخیره** را بزنید.
4. در بخش ساخت کانفیگ، منبع را روی **لیست من** بگذارید و **ساخت کانفیگ** را بزنید.
   برای **هر** Endpoint یک کانفیگ ساخته می‌شود و نام‌ها شماره‌گذاری می‌شوند:
   `sevo-wg-1` ، `sevo-wg-2` ، `sevo-wg-3` ، ...
5. خروجی:
   - فرمت لینک: هر کانفیگ در یک خط (و نام آن بعد از `#` در انتهای لینک است)
   - فرمت `.conf`: دکمه‌ی **دانلود** همه را در یک ZIP (`sevo-wg-1.conf` ، `sevo-wg-2.conf` ، ...) می‌دهد
   - فرمت‌های JSON مستقل از Endpoint هستند و یک اکانت تکی می‌سازند

نکته‌ها:
- در حالت چند Endpoint، همه‌ی کانفیگ‌های یک دفعه با **یک اکانت WARP** ساخته می‌شوند (فقط Endpoint آن‌ها فرق دارد). این کار از محدودیت (429) جلوگیری می‌کند.
- حداکثر ۲۰۰ Endpoint در هر بار ساخت.
- نام کانفیگ را از کادر «نام کانفیگ» می‌توانید عوض کنید (حرف انگلیسی، عدد، `-` و `_`؛ حداکثر ۳۲ کاراکتر).
- لیست فقط در مرورگر خودتان (localStorage) ذخیره می‌شود، نه روی سرور. صفحه‌ی WireGuard و صفحه‌ی AmneziaWG از یک لیست مشترک استفاده می‌کنند.
- کادر همیشه لیست فعلی را نشان می‌دهد. برای اضافه کردن، خروجی جدید را زیر خطوط قبلی paste کنید. حذف یک خط از کادر و ذخیره‌ی دوباره، آن را از لیست پاک می‌کند.

برای پیدا کردن Endpoint مناسب اینترنت خودتان می‌توانید از [اسکنر Endpoint وارپ](https://github.com/soroushse7o/warp-endpoint-scanner) استفاده کنید.

---

## مسیرهای API

| مسیر | روش | توضیح |
|------|-----|-------|
| `/` | GET | رابط گرافیکی WireGuard |
| `/amnezia` | GET | رابط گرافیکی AmneziaWG |
| `/v2ray` | GET | لینک `wireguard://...` |
| `/conf` | GET | فایل کانفیگ استاندارد WireGuard |
| `/raw` | GET | JSON خلاصه (کلید خصوصی، کلید عمومی، Reserved، IPv6) |
| `/full` | GET | پاسخ کامل و خام کلودفلیر |
| `/batch` | **POST** | بدنه‌ی `{"endpoints":["ip:port",...],"name":"sevo-wg"}` ← یک کانفیگ برای هر Endpoint (`sevo-wg-1` ، `sevo-wg-2` ، ...) |
| `/help` | GET | راهنمای متنی (انگلیسی و فارسی) |

برای استفاده از Endpoint دلخواه، به هر مسیر کانفیگ پارامتر `endpoint` و برای تعیین نام، پارامتر `name` (پیش‌فرض `sevo-wg`) را اضافه کنید:

```
/v2ray?endpoint=162.159.192.1:2408
/conf?endpoint=[2606:4700:d0::1]:2408&name=my-config
```

مثال `/batch`:

```bash
curl -X POST https://YOUR-PROJECT.vercel.app/batch \
  -H 'Content-Type: application/json' \
  -d '{"endpoints":["162.159.192.1:2408","188.114.97.5:864"]}'
```

مقدار نامعتبر برای `endpoint` یا `name` خطای `400` برمی‌گرداند. مسیر یا متد ناشناخته نیز قبل از هر درخواست به کلودفلیر رد می‌شود (`404` یا `405`).

---

## عیب‌یابی

اگر خطای `502 Bad Gateway` دیدید، متن بعد از آن علت را نشان می‌دهد:

| پیام | علت و راه‌حل |
|------|--------------|
| `Key generation failed` | WebCrypto در محیط اجرا X25519 را پشتیبانی نمی‌کند. می‌توانید خط `export const runtime = 'edge'` را از `app/[[...path]]/route.js` حذف کنید تا روی Node.js اجرا شود. |
| `WARP registration failed: HTTP 403` یا `429` | محدودیت یا رد درخواست از سمت کلودفلیر. چند دقیقه صبر کنید، یا ریجن را در `vercel.json` عوض کنید. |
| `WARP registration failed: HTTP 404` | نسخه‌ی API قدیمی شده. ثابت `WARP_REG_URL` را در `src/index.js` به‌روز کنید. |
| `TimeoutError` / `aborted` | پاسخ API کند بوده. مقدار `UPSTREAM_TIMEOUT_MS` را در `src/index.js` بیشتر کنید. |

مشاهده‌ی لاگ: در داشبورد Vercel از بخش **Logs** پروژه، یا با خط فرمان:

```bash
npx vercel logs
```

اگر Endpoint تصادفی عمومی در شبکه‌ی شما کار نمی‌کند، با اسکنر خودتان Endpoint سالم پیدا کنید و از بخش **Endpointهای من** استفاده کنید.

---

## به‌روزرسانی

- اگر پروژه را با GitHub وصل کرده‌اید: تغییرات را `push` کنید تا خودکار دیپلوی شود.
- اگر از خط فرمان استفاده می‌کنید: دوباره `npm run deploy` بزنید.

---

## English (short)

A Vercel (Next.js, Edge Runtime) app that generates Cloudflare WARP configs for WireGuard and AmneziaWG, with a Persian web UI.
Deploy by importing the repo into Vercel, or with `npm install && npx vercel login && npm run deploy`. Local dev: `npm run dev`.
Use `?endpoint=IP:PORT` on any config route to supply your own endpoint. Routes: `/`, `/amnezia`, `/v2ray`, `/conf`, `/raw`, `/full`, `/batch` (POST), `/help`.
Configs are named `sevo-wg` (or `sevo-wg-1`, `sevo-wg-2`, ... in batch mode); change with `?name=`.
`dist/worker.js` is a single-file build for Cloudflare Workers and is not used on Vercel.

Maintained by [soroushse7o](https://github.com/soroushse7o). Original idea and code: [Peyman (Ptechgithub)](https://github.com/Ptechgithub).

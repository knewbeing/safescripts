// ==UserScript==
// @name        Telegram Media Downloader (Optimized)
// @name:ar     أداة تنزيل وسائط تيليغرام (محسّنة)
// @name:be     Загрузчык медыя Telegram (аптымізаваны)
// @name:bg     Изтегляне на медии от Telegram (оптимизирано)
// @name:ckb    داگرتنی میدیای Telegram (باشکراو)
// @name:cs     Stahovač médií pro Telegram (optimalizovaný)
// @name:da     Telegram medie-downloader (optimeret)
// @name:de     Telegram Media Downloader (Optimiert)
// @name:el     Λήψη πολυμέσων Telegram (βελτιστοποιημένο)
// @name:en     Telegram Media Downloader (Optimized)
// @name:eo     Telegrama amaskomunikila elŝutilo (optimumigita)
// @name:es     Descargador de medios de Telegram (optimizado)
// @name:es-419 Descargador de medios de Telegram (optimizado)
// @name:fi     Telegram-mediatiedostojen lataaja (optimoitu)
// @name:fr     Téléchargeur de médias Telegram (optimisé)
// @name:fr-CA  Téléchargeur de médias Telegram (optimisé)
// @name:he     מוריד מדיה לטלגרם (ממוטב)
// @name:hr     Telegram preuzimač medija (optimiziran)
// @name:hu     Telegram média letöltő (optimalizált)
// @name:id     Pengunduh media Telegram (dioptimalkan)
// @name:it     Downloader media Telegram (ottimizzato)
// @name:ja     Telegram メディアダウンローダー（最適化版）
// @name:ka     Telegram მედიის ჩამომტვირთველი (ოპტიმიზებული)
// @name:ko     텔레그램 미디어 다운로더 (최적화판)
// @name:mr     Telegram मीडिया डाउनलोडर (ऑप्टिमाइझ केलेले)
// @name:nb     Telegram medienedlaster (optimalisert)
// @name:nl     Telegram-mediadownloader (geoptimaliseerd)
// @name:pl     Pobieracz multimediów Telegram (zoptymalizowany)
// @name:pt-BR  Downloader de mídia do Telegram (otimizado)
// @name:ro     Descărcător media Telegram (optimizat)
// @name:ru     Загрузчик медиа Telegram (оптимизированный)
// @name:sk     Sťahovač médií z Telegramu (optimalizovaný)
// @name:sr     Преузимач медија са Telegram-а (оптимизован)
// @name:sv     Telegram media-nedladdare (optimerad)
// @name:th     เครื่องมือดาวน์โหลดสื่อ Telegram (เวอร์ชันปรับแต่ง)
// @name:tr     Telegram Medya İndirici (optimize)
// @name:uk     Завантажувач медіа Telegram (оптимізований)
// @name:ug     Telegram مېدىيا چۈشۈرگۈچ (ئەلالاشتۇرۇلغان نەشرى)
// @name:vi     Trình tải media Telegram (bản tối ưu)
// @name:zh-CN  Telegram 图片视频下载器（优化版）
// @name:zh-TW  Telegram 圖片影片下載器（優化版）
// @description        Supports downloading images, videos, and voice messages from Telegram channels with download restrictions, featuring an interface that closely matches Telegram’s native design style.
// @description:ar     يدعم تنزيل الصور ومقاطع الفيديو والرسائل الصوتية من قنوات Telegram المقيّدة التنزيل، مع واجهة تتوافق بشكل كبير مع أسلوب تصميم Telegram الأصلي.
// @description:be     Падтрымлівае спампоўванне выяў, відэа і галасавых паведамленняў з каналаў Telegram з абмежаваннямі на спампоўванне, з інтэрфейсам, які блізка адпавядае ўласнаму стылю дызайну Telegram.
// @description:bg     Поддържа изтегляне на изображения, видеоклипове и гласови съобщения от Telegram канали с ограничения за изтегляне, с интерфейс, който е близък до оригиналния стил на Telegram.
// @description:ckb    پاڵپشتی داگرتنی وێنە، ڤیدیۆ و پەیامی دەنگی لە کەناڵەکانی Telegram دەکات کە سنووری داگرتنیان هەیە، لەگەڵ ڕووکارێک کە زۆر نزیکە لە شێوازی دیزاینی ڕەسەنی Telegram.
// @description:cs     Podporuje stahování obrázků, videí a hlasových zpráv z Telegram kanálů s omezeným stahováním a nabízí rozhraní, které se velmi podobá nativnímu stylu Telegramu.
// @description:da     Understøtter download af billeder, videoer og talebeskeder fra Telegram-kanaler med downloadbegrænsninger, med en grænseflade der ligger tæt op ad Telegrams oprindelige designstil.
// @description:de     Unterstützt das Herunterladen von Bildern, Videos und Sprachnachrichten aus Telegram-Kanälen mit Download-Beschränkungen und bietet eine Oberfläche, die dem nativen Telegram-Designstil sehr nahekommt.
// @description:el     Υποστηρίζει λήψη εικόνων, βίντεο και φωνητικών μηνυμάτων από κανάλια Telegram με περιορισμούς λήψης, με διεπαφή που ταιριάζει πολύ με το εγγενές στυλ σχεδίασης του Telegram.
// @description:en     Supports downloading images, videos, and voice messages from Telegram channels with download restrictions, featuring an interface that closely matches Telegram’s native design style.
// @description:eo     Subtenas elŝuti bildojn, filmetojn kaj voĉmesaĝojn el Telegram-kanaloj kun elŝutaj limigoj, kun interfaco kiu proksime kongruas kun la denaska dezajnstilo de Telegram.
// @description:es     Admite la descarga de imágenes, videos y mensajes de voz desde canales de Telegram con restricciones de descarga, con una interfaz que coincide de cerca con el estilo de diseño nativo de Telegram.
// @description:es-419 Permite descargar imágenes, videos y mensajes de voz desde canales de Telegram con restricciones de descarga, con una interfaz que se adapta al estilo nativo de Telegram.
// @description:fi     Tukee kuvien, videoiden ja ääniviestien lataamista Telegram-kanavista, joissa on latausrajoituksia. Käyttöliittymä vastaa läheisesti Telegramin natiivia ulkoasua.
// @description:fr     Prend en charge le téléchargement d’images, de vidéos et de messages vocaux depuis des canaux Telegram avec restrictions de téléchargement, avec une interface proche du style natif de Telegram.
// @description:fr-CA  Prend en charge le téléchargement d’images, de vidéos et de messages vocaux depuis des canaux Telegram avec restrictions de téléchargement, avec une interface très proche du style natif de Telegram.
// @description:he     תומך בהורדת תמונות, סרטונים והודעות קוליות מערוצי Telegram עם הגבלות הורדה, עם ממשק שתואם באופן הדוק לסגנון העיצוב המקורי של Telegram.
// @description:hr     Podržava preuzimanje slika, videozapisa i glasovnih poruka iz Telegram kanala s ograničenjima preuzimanja, uz sučelje koje je usklađeno s izvornim Telegram dizajnom.
// @description:hu     Támogatja képek, videók és hangüzenetek letöltését letöltési korlátozással rendelkező Telegram-csatornákról, a Telegram natív stílusához igazodó felülettel.
// @description:id     Mendukung pengunduhan gambar, video, dan pesan suara dari channel Telegram dengan pembatasan unduhan, dengan antarmuka yang selaras dengan gaya desain bawaan Telegram.
// @description:it     Supporta il download di immagini, video e messaggi vocali da canali Telegram con restrizioni di download, con un’interfaccia in linea con lo stile nativo di Telegram.
// @description:ja     ダウンロード制限のあるTelegramチャンネルから画像・動画・音声メッセージを保存でき、Telegram標準デザインに近いインターフェースを提供します。
// @description:ka     მხარს უჭერს სურათების, ვიდეოებისა და ხმოვანი შეტყობინებების ჩამოტვირთვას Telegram-ის იმ არხებიდან, სადაც ჩამოტვირთვა შეზღუდულია, და უზრუნველყოფს Telegram-ის მშობლიურ სტილთან ახლოს მყოფ ინტერფეისს.
// @description:ko     다운로드 제한이 있는 Telegram 채널에서 이미지, 동영상, 음성 메시지 다운로드를 지원하며, Telegram 기본 디자인 스타일과 유사한 인터페이스를 제공합니다.
// @description:mr     डाउनलोड निर्बंध असलेल्या Telegram चॅनेलमधून प्रतिमा, व्हिडिओ आणि व्हॉइस संदेश डाउनलोड करण्यास समर्थन देते, तसेच Telegram च्या मूळ डिझाइन शैलीशी जवळीक राखणारा इंटरफेस देते.
// @description:nb     Støtter nedlasting av bilder, videoer og talemeldinger fra Telegram-kanaler med nedlastingsbegrensninger, med et grensesnitt som ligger tett opptil Telegrams opprinnelige designstil.
// @description:nl     Ondersteunt het downloaden van afbeeldingen, video's en spraakberichten uit Telegram-kanalen met downloadbeperkingen, met een interface die nauw aansluit bij de native ontwerpstijl van Telegram.
// @description:pl     Obsługuje pobieranie obrazów, wideo i wiadomości głosowych z kanałów Telegram z ograniczeniami pobierania, oferując interfejs zbliżony do natywnego stylu Telegrama.
// @description:pt-BR  Suporta o download de imagens, vídeos e mensagens de voz de canais do Telegram com restrições de download, com uma interface próxima ao estilo nativo do Telegram.
// @description:ro     Permite descărcarea imaginilor, videoclipurilor și mesajelor vocale din canale Telegram cu restricții de descărcare, având o interfață apropiată de stilul nativ Telegram.
// @description:ru     Поддерживает скачивание изображений, видео и голосовых сообщений из каналов Telegram с ограничениями на загрузку, предлагая интерфейс, близкий к нативному стилю Telegram.
// @description:sk     Podporuje sťahovanie obrázkov, videí a hlasových správ z kanálov Telegram s obmedzeniami sťahovania a ponúka rozhranie, ktoré sa veľmi podobá natívnemu štýlu Telegramu.
// @description:sr     Подржава преузимање слика, видео записа и гласовних порука са Telegram канала са ограничењима преузимања, уз интерфејс који је веома близак изворном стилу дизајна Telegram-а.
// @description:sv     Stöder nedladdning av bilder, videor och röstmeddelanden från Telegram-kanaler med nedladdningsbegränsningar, med ett gränssnitt som ligger nära Telegrams ursprungliga designstil.
// @description:th     รองรับการดาวน์โหลดรูปภาพ วิดีโอ และข้อความเสียงจากช่อง Telegram ที่มีข้อจำกัดการดาวน์โหลด พร้อมอินเทอร์เฟซที่ใกล้เคียงกับดีไซน์ดั้งเดิมของ Telegram
// @description:tr     İndirme kısıtlaması olan Telegram kanallarından görsel, video ve sesli mesaj indirmeyi destekler; arayüzü Telegram’ın yerel tasarım stiline yakın şekilde sunar.
// @description:uk     Підтримує завантаження зображень, відео та голосових повідомлень із Telegram-каналів із обмеженнями на завантаження, з інтерфейсом, що наближений до нативного стилю Telegram.
// @description:ug     چۈشۈرۈش چەكلىمىسى بار Telegram قاناللىرىدىن رەسىم، ۋىدىئو ۋە ئاۋازلىق ئۇچۇرلارنى چۈشۈرۈشنى قوللايدۇ، ھەمدە Telegram نىڭ ئەسلى لايىھە ئۇسلۇبىغا يېقىن كۆرۈنمە يۈزىنى تەمىنلەيدۇ.
// @description:vi     Hỗ trợ tải xuống hình ảnh, video và tin nhắn thoại từ các kênh Telegram bị giới hạn tải xuống, với giao diện bám sát phong cách thiết kế gốc của Telegram.
// @description:zh-CN  支持从限制下载的 Telegram 频道中获取图片、视频及语音消息，界面设计与 Telegram 原生风格高度统一
// @description:zh-TW  支援從限制下載的 Telegram 頻道中下載圖片、影片與語音訊息，介面設計與 Telegram 原生風格高度一致
// @namespace yoshiko-wisoky-media-downloader-optimized
// @version   1.0.2
// @author    Nestor Qin, yoshiko.wisoky
// @license   GNU GPLv3
// @include   https://web.telegram.org/*
// @include   https://webk.telegram.org/*
// @include   https://webz.telegram.org/*
// @icon      https://img.icons8.com/color/452/telegram-app--v5.png
// @noframes
// @grant     GM_registerMenuCommand
// @grant     GM_openInTab
// @grant     GM.openInTab
// @grant     GM_addStyle
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_xmlhttpRequest
// @grant     GM_download
// @grant     unsafeWindow
// @grant     GM_setClipboard
// @downloadURL https://update.greasyfork.org/scripts/595163/Telegram%20Media%20Downloader%20%28Optimized%29.user.js
// @updateURL https://update.greasyfork.org/scripts/595163/Telegram%20Media%20Downloader%20%28Optimized%29.meta.js
// ==/UserScript==
(function () {
  'use strict';

  
  /*!
  * Copyright (c) 2026 - 2026, Nestor Qin, yoshiko.wisoky. All rights reserved.
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in
  * all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  *
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  *
  * The code is adapted from an open-source project. 
  * The code structure has been optimized and bugs have been fixed. 
  * Copyright belongs to the original author.
  * https://github.com/Neet-Nestor/Telegram-Media-Downloader
  */


  const CONFIG = {
    downloadIcons: ["", "", "", "", ""],
    forwardIcons: ["", "", "", ""],
    observerDebounce: 200,
    fallbackRefreshDelay: 1500,
    maxActiveDownloads: 2,
    contentRangeRegex: /^bytes (\d+)-(\d+)\/(\d+)$/,
    startFlag: "__TELEGRAM_MEDIA_DOWNLOADER_STARTED__",
    progressContainerId: "tel-downloader-progress-bar-container",
    progressCardPrefix: "tel-downloader-progress-"
  };

  const STYLE_ID = "tel-download-icon-style";
  function renderDownloadIcon(size = 26) {
    return `<svg class="tel-download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v6"/><path d="M9 11l3 3 3-3"/></svg>`;
  }
  function renderDownloadIconWrap(size = 26, className = "button-icon tel-download-icon-wrap") {
    return `<span class="${className}">${renderDownloadIcon(size)}</span>`;
  }
  function ensureDownloadIconStyles() {
    if (document.getElementById(STYLE_ID))
      return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
    .tel-download svg.tel-download-icon {
      display: block;
      pointer-events: none;
    }
    .tel-download .tel-download-icon-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
    }
  `;
    document.head.appendChild(style);
  }

  const logger = {
    info: () => {
    },
    error: (...args) => console.error("[Tel Download]", ...args)
  };

  const utils = {
    getRootWindow() {
      try {
        if (typeof unsafeWindow !== "undefined")
          return unsafeWindow;
      } catch {
      }
      return window;
    },
    hashCode(text) {
      let hash = 0;
      for (let i = 0; i < text.length; i += 1) {
        hash = (hash << 5) - hash + text.charCodeAt(i) | 0;
      }
      return hash >>> 0;
    },
    randomId() {
      return `${Math.random().toString(36).slice(2)}_${Date.now()}`;
    },
    triggerBlobDownload(blob, fileName) {
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = blobUrl;
      a.download = fileName;
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    },
    parseMediaFileName(url, fallbackFileName) {
      try {
        const encoded = url.split("/").at(-1);
        const metadata = JSON.parse(decodeURIComponent(encoded));
        return metadata.fileName || fallbackFileName;
      } catch {
        return fallbackFileName;
      }
    },
    replaceExtension(fileName, extension) {
      if (!fileName)
        return `file.${extension}`;
      const trimmed = String(extension || "").replace(/^\./, "");
      if (!trimmed)
        return fileName;
      const index = fileName.lastIndexOf(".");
      const base = index > 0 ? fileName.slice(0, index) : fileName;
      return `${base}.${trimmed}`;
    },
    guessImageExtension(url) {
      try {
        const path = decodeURIComponent(String(url).split("?")[0]);
        const match = path.match(/\.(jpe?g|png|gif|webp|bmp)$/i);
        if (!match)
          return "jpeg";
        const ext = match[1].toLowerCase();
        return ext === "jpg" ? "jpeg" : ext;
      } catch {
        return "jpeg";
      }
    },
    getMediaSrc(el) {
      if (!el)
        return "";
      return el.currentSrc || el.src || el.querySelector?.("source")?.src || "";
    },
    isAllowedMime(mime, prefix) {
      if (!mime)
        return true;
      if (mime.startsWith(prefix))
        return true;
      return mime === "application/octet-stream";
    },
    canUseFileSystemApi() {
      try {
        const rootWindow = this.getRootWindow();
        return "showSaveFilePicker" in rootWindow && rootWindow.self === rootWindow.top;
      } catch {
        return false;
      }
    }
  };

  class DownloadService {
    constructor(progress) {
      this.progress = progress;
      this.controllers = /* @__PURE__ */ new Map();
      this.writers = /* @__PURE__ */ new Map();
    }
    cancel(taskId) {
      if (!taskId)
        return;
      const controller = this.controllers.get(taskId);
      this.controllers.delete(taskId);
      controller?.abort();
      const writer = this.writers.get(taskId);
      this.writers.delete(taskId);
      if (writer && typeof writer.abort === "function") {
        Promise.resolve(writer.abort()).catch(() => {
        });
      }
    }
    downloadImage(url) {
      if (!url)
        return;
      const fileName = `${Math.random().toString(36).slice(2, 10)}.${utils.guessImageExtension(url)}`;
      const triggerAnchor = () => {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = fileName;
        a.click();
        document.body.removeChild(a);
      };
      if (url.startsWith("blob:")) {
        triggerAnchor();
        return;
      }
      fetch(url, { credentials: "include" }).then((res) => {
        if (!res.ok)
          throw new Error(`Unexpected response: ${res.status}`);
        return res.blob();
      }).then((blob) => utils.triggerBlobDownload(blob, fileName)).catch((error) => {
        logger.error("Image fetch failed, falling back to anchor download:", error);
        triggerAnchor();
      });
    }
    downloadAudio(url, taskId = utils.randomId(), options = {}) {
      this.downloadMedia({
        url,
        taskId,
        kind: "audio",
        mimePrefix: "audio/",
        extension: "ogg",
        fallbackType: "audio/ogg",
        skipFilePicker: options.skipFilePicker
      });
    }
    downloadVideo(url, taskId = utils.randomId(), options = {}) {
      this.downloadMedia({
        url,
        taskId,
        kind: "video",
        mimePrefix: "video/",
        extension: "mp4",
        fallbackType: "video/mp4",
        skipFilePicker: options.skipFilePicker
      });
    }
    downloadMedia({
      url,
      taskId,
      kind,
      mimePrefix,
      extension,
      fallbackType,
      skipFilePicker = false
    }) {
      if (!url)
        return;
      const context = {
        nextOffset: 0,
        totalSize: null,
        chunks: [],
        extension,
        fileName: utils.parseMediaFileName(
          url,
          `${utils.hashCode(url).toString(36)}.${extension}`
        )
      };
      this.downloadStream({
        url,
        taskId,
        kind,
        mimePrefix,
        fileName: context.fileName,
        fallbackType,
        context,
        skipFilePicker
      });
    }
    downloadStream({
      url,
      taskId,
      kind,
      mimePrefix,
      fileName,
      fallbackType,
      context,
      skipFilePicker = false
    }) {
      const cleanup = () => {
        if (!taskId)
          return;
        this.controllers.delete(taskId);
        this.writers.delete(taskId);
      };
      const readNext = (writer) => {
        const controller = taskId ? this.controllers.get(taskId) : null;
        const isCurrent = () => !taskId || this.controllers.get(taskId) === controller;
        fetch(url, {
          method: "GET",
          headers: { Range: `bytes=${context.nextOffset}-` },
          credentials: "include",
          signal: controller?.signal
        }).then(async (res) => {
          if (!isCurrent())
            return null;
          if (![200, 206].includes(res.status)) {
            throw new Error(`Unexpected response: ${res.status}`);
          }
          const mime = (res.headers.get("Content-Type") || "").split(";")[0].trim();
          if (!utils.isAllowedMime(mime, mimePrefix)) {
            throw new Error(`Unexpected MIME: ${mime}`);
          }
          const blob = await res.blob();
          const range = res.headers.get("Content-Range");
          const match = range && range.match(CONFIG.contentRangeRegex);
          if (match) {
            const start = Number.parseInt(match[1], 10);
            const end = Number.parseInt(match[2], 10);
            const total = Number.parseInt(match[3], 10);
            if (start !== context.nextOffset)
              throw new Error("Chunk offset mismatch");
            if (context.totalSize && total !== context.totalSize) {
              throw new Error("File size changed");
            }
            context.nextOffset = end + 1;
            context.totalSize = total;
          } else if (res.status === 200) {
            context.nextOffset = blob.size;
            context.totalSize = blob.size;
          } else {
            throw new Error("Invalid Content-Range header");
          }
          const subtype = (mime.split("/")[1] || "").split("+")[0];
          if (subtype && subtype !== "octet-stream") {
            context.extension = subtype;
            context.fileName = utils.replaceExtension(
              context.fileName || fileName,
              subtype
            );
          }
          const percent = context.totalSize ? Math.round(context.nextOffset * 100 / context.totalSize) : 0;
          this.progress.update(taskId, context.fileName, percent, url);
          return blob;
        }).then((blob) => {
          if (!blob || !isCurrent())
            return null;
          return writer ? writer.write(blob) : context.chunks.push(blob);
        }).then(() => {
          if (!isCurrent())
            return;
          if (!context.totalSize)
            throw new Error("Missing total size");
          if (context.nextOffset < context.totalSize) {
            readNext(writer);
            return;
          }
          const finalName = context.fileName || fileName;
          const finalType = mimePrefix === "video/" ? `video/${context.extension || "mp4"}` : fallbackType;
          if (writer) {
            return writer.close();
          }
          utils.triggerBlobDownload(
            new Blob(context.chunks, { type: finalType }),
            finalName
          );
        }).then(() => {
          if (!isCurrent())
            return;
          if (context.nextOffset < context.totalSize)
            return;
          cleanup();
          this.progress.complete(taskId);
        }).catch((error) => {
          if (error?.name === "AbortError")
            return;
          logger.error("Download failed:", error);
          cleanup();
          this.progress.abort(taskId);
        });
      };
      const attachAndMaybeStart = (writer) => {
        if (taskId && writer)
          this.writers.set(taskId, writer);
        const card = this.progress.ensure(taskId, context.fileName || fileName, {
          url,
          kind
        });
        const start = () => {
          if (taskId) {
            const previous = this.controllers.get(taskId);
            if (previous)
              previous.abort();
            this.controllers.set(taskId, new AbortController());
          }
          readNext(writer);
        };
        if (card?.classList.contains("queued")) {
          card.resume = start;
          return;
        }
        start();
      };
      if (!skipFilePicker && utils.canUseFileSystemApi()) {
        const rootWindow = utils.getRootWindow();
        rootWindow.showSaveFilePicker({ suggestedName: fileName }).then((handle) => handle.createWritable()).then((writer) => attachAndMaybeStart(writer)).catch((err) => {
          if (err?.name === "AbortError")
            return;
          logger.error("Save picker failed, falling back to blob download:", err);
          attachAndMaybeStart(null);
        });
        return;
      }
      attachAndMaybeStart(null);
    }
  }

  class ProgressManager {
    constructor({ onRetry, onCancel } = {}) {
      this.onRetry = onRetry;
      this.onCancel = onCancel;
    }
    setupContainer() {
      if (this.getContainer())
        return;
      const container = document.createElement("div");
      container.id = CONFIG.progressContainerId;
      container.style.position = "fixed";
      container.style.right = "0";
      container.style.bottom = "16px";
      container.style.maxHeight = "calc(100vh - 80px)";
      container.style.overflow = "auto";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.alignItems = "flex-end";
      container.style.pointerEvents = "none";
      container.style.zIndex = location.pathname.startsWith("/k/") ? "4" : "1600";
      document.body.appendChild(container);
    }
    getContainer() {
      return document.getElementById(CONFIG.progressContainerId);
    }
    getCard(taskId) {
      return document.getElementById(`${CONFIG.progressCardPrefix}${taskId}`);
    }
    getActiveCount() {
      const container = this.getContainer();
      if (!container)
        return 0;
      return Array.from(
        container.querySelectorAll(
          ".tel-downloader-progress:not(.queued):not(.aborted):not(.completed)"
        )
      ).length;
    }
    clearCardTimers(card) {
      if (!card)
        return;
      if (card._telRetryTimer) {
        window.clearTimeout(card._telRetryTimer);
        card._telRetryTimer = null;
      }
      if (card._telCompleteTimer) {
        window.clearTimeout(card._telCompleteTimer);
        card._telCompleteTimer = null;
      }
    }
    ensure(taskId, fileName, meta = {}) {
      const container = this.getContainer();
      if (!container || !taskId)
        return null;
      let card = this.getCard(taskId);
      if (!card) {
        card = this.createCard(taskId, fileName);
        container.appendChild(card);
      }
      if (meta.url) {
        card.querySelector("div.progress")?.setAttribute("data-tel-media-url", meta.url);
      }
      if (meta.kind) {
        card.setAttribute("data-tel-media-kind", meta.kind);
      }
      this.setQueued(taskId, this.getActiveCount() > CONFIG.maxActiveDownloads);
      return card;
    }
    createCard(taskId, fileName) {
      const isDarkMode = document.documentElement.classList.contains("night") || document.documentElement.classList.contains("theme-dark");
      const card = document.createElement("div");
      card.id = `${CONFIG.progressCardPrefix}${taskId}`;
      card.className = "tel-downloader-progress";
      card.setAttribute("data-tel-task-id", taskId);
      card.style.position = "relative";
      card.style.pointerEvents = "auto";
      card.style.width = "20rem";
      card.style.marginTop = "0.4rem";
      card.style.padding = "0.6rem";
      card.style.backgroundColor = isDarkMode ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.6)";
      const top = document.createElement("div");
      top.style.display = "flex";
      top.style.justifyContent = "space-between";
      const title = document.createElement("p");
      title.className = "filename";
      title.style.margin = "0";
      title.style.color = "white";
      title.innerText = fileName;
      const closeButton = document.createElement("div");
      closeButton.style.cursor = "pointer";
      closeButton.style.fontSize = "1.2rem";
      closeButton.style.color = isDarkMode ? "#8a8a8a" : "white";
      closeButton.style.position = "absolute";
      closeButton.style.right = "4px";
      closeButton.innerHTML = "&times;";
      closeButton.onclick = () => {
        this.clearCardTimers(card);
        if (typeof this.onCancel === "function")
          this.onCancel(taskId);
        card.remove();
        this.resumeNext();
      };
      const progressBar = document.createElement("div");
      progressBar.className = "progress";
      progressBar.style.backgroundColor = "#e2e2e2";
      progressBar.style.position = "relative";
      progressBar.style.width = "100%";
      progressBar.style.height = "1.6rem";
      progressBar.style.borderRadius = "2rem";
      progressBar.style.overflow = "hidden";
      const counter = document.createElement("p");
      counter.style.position = "absolute";
      counter.style.zIndex = "5";
      counter.style.left = "50%";
      counter.style.top = "50%";
      counter.style.transform = "translate(-50%, -50%)";
      counter.style.margin = "0";
      counter.style.color = "black";
      const progress = document.createElement("div");
      progress.style.position = "absolute";
      progress.style.height = "100%";
      progress.style.width = "0%";
      progress.style.backgroundColor = "#6093B5";
      progressBar.append(counter, progress);
      top.append(title, closeButton);
      card.append(top, progressBar);
      return card;
    }
    setQueued(taskId, queued) {
      const card = this.getCard(taskId);
      if (!card)
        return;
      card.classList.toggle("queued", queued);
      const progress = card.querySelector(".progress div");
      const text = card.querySelector(".progress p");
      if (!progress)
        return;
      progress.style.backgroundColor = queued ? "lightgray" : "#6093B5";
      progress.style.width = queued ? "100%" : progress.style.width || "0%";
      if (queued) {
        progress.style.width = "100%";
        if (text)
          text.innerText = "Queued";
      } else if (text?.innerText === "Queued") {
        text.innerText = "";
        progress.style.width = "0%";
      }
    }
    update(taskId, fileName, percent, mediaUrl) {
      const card = this.getCard(taskId);
      if (!card)
        return;
      const title = card.querySelector("p.filename");
      const progressBar = card.querySelector("div.progress");
      if (!title || !progressBar)
        return;
      title.innerText = fileName;
      progressBar.querySelector("p").innerText = `${percent}%`;
      progressBar.querySelector("div").style.width = `${percent}%`;
      if (mediaUrl)
        progressBar.setAttribute("data-tel-media-url", mediaUrl);
    }
    complete(taskId) {
      const card = this.getCard(taskId);
      if (!card)
        return;
      this.clearCardTimers(card);
      card.classList.remove("queued", "aborted");
      card.classList.add("completed");
      const text = card.querySelector(".progress p");
      const bar = card.querySelector(".progress div");
      if (text)
        text.innerText = "Completed";
      if (bar) {
        bar.style.backgroundColor = "#B6C649";
        bar.style.width = "100%";
      }
      card._telCompleteTimer = window.setTimeout(() => card.remove(), 1e4);
      this.resumeNext();
    }
    abort(taskId) {
      const card = this.getCard(taskId);
      if (!card)
        return;
      this.clearCardTimers(card);
      card.classList.remove("queued");
      card.classList.add("aborted");
      const progress = card.querySelector(".progress");
      if (!progress)
        return;
      const text = progress.querySelector("p");
      const bar = progress.querySelector("div");
      if (text)
        text.innerText = "Aborted";
      if (bar) {
        bar.style.backgroundColor = "#D16666";
        bar.style.width = "100%";
      }
      progress.querySelectorAll("a[data-tel-retry]").forEach((node) => node.remove());
      const retryLink = document.createElement("a");
      retryLink.innerText = "retry";
      retryLink.dataset.telRetry = "1";
      retryLink.style.marginLeft = "5px";
      retryLink.href = "javascript:void(0);";
      retryLink.onclick = (event) => {
        event.preventDefault();
        this.retry(taskId, { auto: false });
      };
      text?.appendChild(retryLink);
      card._telRetryTimer = window.setTimeout(
        () => this.retry(taskId, { auto: true }),
        3e4
      );
      this.resumeNext();
    }
    retry(taskId, { auto = false } = {}) {
      const card = this.getCard(taskId);
      if (!card || !card.classList.contains("aborted"))
        return;
      this.clearCardTimers(card);
      card.classList.remove("aborted");
      card.querySelectorAll("a[data-tel-retry]").forEach((node) => node.remove());
      const bar = card.querySelector("div.progress div");
      if (bar)
        bar.style.backgroundColor = "#6093B5";
      const text = card.querySelector(".progress p");
      if (text)
        text.innerText = "";
      const url = card.querySelector("div.progress")?.getAttribute("data-tel-media-url");
      const kind = card.getAttribute("data-tel-media-kind") || "video";
      if (url && typeof this.onRetry === "function") {
        this.onRetry(url, taskId, kind, { skipFilePicker: auto });
      }
    }
    resumeNext() {
      const container = this.getContainer();
      if (!container)
        return;
      if (this.getActiveCount() >= CONFIG.maxActiveDownloads)
        return;
      const next = container.querySelector(".tel-downloader-progress.queued");
      if (!next || typeof next.resume !== "function")
        return;
      const taskId = next.getAttribute("data-tel-task-id") || next.getAttribute("videoId");
      this.setQueued(taskId, false);
      const resume = next.resume;
      delete next.resume;
      resume();
    }
  }

  class TelegramUiMount {
    constructor(downloadService) {
      this.downloadService = downloadService;
    }
    tick() {
      this.safeMount("webz", () => this.mountWebZ());
      this.safeMount("webk", () => this.mountWebK());
    }
    safeMount(label, fn) {
      try {
        fn();
      } catch (error) {
        logger.error(`UI mount failed (${label}):`, error);
      }
    }
    bindButton(button, url, onClick) {
      if (!button || !url)
        return;
      button.setAttribute("data-tel-download-url", url);
      button.onclick = onClick;
    }
    mountWebZ() {
      this.mountWebZStories();
      this.mountWebZMediaViewer();
    }
    mountWebK() {
      this.mountWebKStories();
      this.mountWebKMediaViewer();
      this.mountPinnedAudio();
    }
    mountWebZStories() {
      const stories = document.getElementById("StoryViewer");
      if (!stories)
        return;
      const header = stories.querySelector(".GrsJNw3y") || stories.querySelector(".DropdownMenu")?.parentNode;
      if (!header || header.querySelector(".tel-download"))
        return;
      const btn = document.createElement("button");
      btn.className = "Button TkphaPyQ tiny translucent-white round tel-download";
      btn.innerHTML = renderDownloadIconWrap(22, "tel-download-icon-wrap");
      btn.type = "button";
      btn.title = "Download";
      btn.ariaLabel = "Download";
      btn.onclick = () => {
        const videoSrc = utils.getMediaSrc(stories.querySelector("video"));
        if (videoSrc) {
          this.downloadService.downloadVideo(videoSrc);
          return;
        }
        const images = Array.from(stories.querySelectorAll("img.PVZ8TOWS"));
        const fallbackImages = images.length ? images : Array.from(stories.querySelectorAll("img.media-photo, .media-photo img"));
        const imageSrc = (fallbackImages[fallbackImages.length - 1] || images[images.length - 1])?.src;
        if (imageSrc)
          this.downloadService.downloadImage(imageSrc);
      };
      header.insertBefore(btn, header.querySelector("button"));
    }
    getNativeDownloadButtons(actions) {
      return Array.from(actions.querySelectorAll("button")).filter(
        (btn) => !btn.classList.contains("tel-download") && Boolean(btn.querySelector(".icon-download"))
      );
    }
    mountWebZMediaViewer() {
      const container = document.querySelector("#MediaViewer .MediaViewerSlide--active");
      const actions = document.querySelector("#MediaViewer .MediaViewerActions");
      if (!container || !actions)
        return;
      const ensureActionButton = (url, onClick) => {
        const nativeDownloadButtons = this.getNativeDownloadButtons(actions);
        let button = actions.querySelector("button.tel-download");
        if (nativeDownloadButtons.length > 0) {
          button?.remove();
          return;
        }
        if (button) {
          this.bindButton(button, url, onClick);
          return;
        }
        button = document.createElement("button");
        button.className = "Button smaller translucent-white round tel-download";
        button.type = "button";
        button.title = "Download";
        button.ariaLabel = "Download";
        button.innerHTML = renderDownloadIconWrap(22, "tel-download-icon-wrap");
        this.bindButton(button, url, onClick);
        actions.prepend(button);
      };
      const videoPlayer = container.querySelector(".MediaViewerContent > .VideoPlayer");
      if (videoPlayer) {
        const videoElement = videoPlayer.querySelector("video");
        const videoUrl = utils.getMediaSrc(videoElement);
        if (!videoUrl)
          return;
        const onVideoClick = () => {
          const src = utils.getMediaSrc(videoElement);
          if (src)
            this.downloadService.downloadVideo(src);
        };
        ensureActionButton(videoUrl, onVideoClick);
        const controls = videoPlayer.querySelector(".VideoPlayerControls .buttons");
        if (controls) {
          let btn = controls.querySelector("button.tel-download");
          if (!btn) {
            btn = document.createElement("button");
            btn.className = "Button smaller translucent-white round tel-download";
            btn.type = "button";
            btn.title = "Download";
            btn.ariaLabel = "Download";
            btn.innerHTML = renderDownloadIconWrap(22, "tel-download-icon-wrap");
            const spacer = controls.querySelector(".spacer");
            if (spacer)
              spacer.after(btn);
            else
              controls.append(btn);
          }
          this.bindButton(btn, videoUrl, onVideoClick);
        }
        return;
      }
      const image = container.querySelector(".MediaViewerContent > div > img");
      if (image?.src) {
        ensureActionButton(
          image.src,
          () => this.downloadService.downloadImage(image.src)
        );
      }
    }
    mountWebKStories() {
      const stories = document.getElementById("stories-viewer");
      if (!stories)
        return;
      const createBtn = () => {
        const btn = document.createElement("button");
        btn.className = "btn-icon rp tel-download";
        btn.innerHTML = `${renderDownloadIconWrap(26, "tel-download-icon-wrap")}<div class="c-ripple"></div>`;
        btn.type = "button";
        btn.title = "Download";
        btn.ariaLabel = "Download";
        btn.onclick = () => {
          const videoSrc = utils.getMediaSrc(stories.querySelector("video.media-video"));
          if (videoSrc) {
            this.downloadService.downloadVideo(videoSrc);
            return;
          }
          const imageSrc = stories.querySelector("img.media-photo")?.src;
          if (imageSrc)
            this.downloadService.downloadImage(imageSrc);
        };
        return btn;
      };
      const header = stories.querySelector("[class^='_ViewerStoryHeaderRight']");
      const footer = stories.querySelector("[class^='_ViewerStoryFooterRight']");
      if (header && !header.querySelector(".tel-download"))
        header.prepend(createBtn());
      if (footer && !footer.querySelector(".tel-download"))
        footer.prepend(createBtn());
    }
    createKButton(className = "btn-icon tgico-download tel-download") {
      const btn = document.createElement("button");
      btn.className = className;
      btn.innerHTML = renderDownloadIconWrap();
      btn.type = "button";
      btn.title = "Download";
      btn.ariaLabel = "Download";
      return btn;
    }
    ensureKButton(parent, url, onClick, className) {
      if (!parent)
        return null;
      let button = parent.querySelector("button.tel-download");
      if (!url) {
        button?.remove();
        return null;
      }
      if (!button) {
        button = this.createKButton(className);
        parent.prepend(button);
      }
      this.bindButton(button, url, onClick);
      return button;
    }
    mountWebKMediaViewer() {
      const mediaContainer = document.querySelector(".media-viewer-whole");
      if (!mediaContainer)
        return;
      const aspecter = mediaContainer.querySelector(
        ".media-viewer-movers .media-viewer-aspecter"
      );
      const buttons = mediaContainer.querySelector(
        ".media-viewer-topbar .media-viewer-buttons"
      );
      if (!aspecter || !buttons)
        return;
      let officialDownload = null;
      Array.from(buttons.querySelectorAll("button.btn-icon.hide")).forEach((btn) => {
        const text = btn.textContent;
        const isDownload = CONFIG.downloadIcons.includes(text);
        const isForward = CONFIG.forwardIcons.includes(text);
        if (!isDownload && !isForward)
          return;
        btn.classList.remove("hide");
        if (isForward)
          btn.classList.add("tgico-forward");
        if (isDownload) {
          btn.classList.add("tgico-download");
          officialDownload = () => btn.click();
        }
      });
      const video = aspecter.querySelector("video");
      const videoUrl = utils.getMediaSrc(video);
      const image = aspecter.querySelector("img.thumbnail");
      const imageUrl = image?.src || "";
      const mediaUrl = videoUrl || imageUrl;
      const onCustomClick = () => {
        const latestVideo = utils.getMediaSrc(aspecter.querySelector("video"));
        if (latestVideo) {
          this.downloadService.downloadVideo(latestVideo);
          return;
        }
        const latestImage = aspecter.querySelector("img.thumbnail")?.src;
        if (latestImage)
          this.downloadService.downloadImage(latestImage);
      };
      const onClick = officialDownload || onCustomClick;
      if (aspecter.querySelector(".ckin__player")) {
        const controls = aspecter.querySelector(
          ".default__controls.ckin__controls .bottom-controls .right-controls"
        );
        this.ensureKButton(
          controls,
          mediaUrl,
          onClick,
          "btn-icon default__button tgico-download tel-download"
        );
      }
      const officialBtn = buttons.querySelector(
        "button.btn-icon.tgico-download:not(.tel-download)"
      );
      if (officialBtn && officialDownload) {
        buttons.querySelector("button.tel-download")?.remove();
        return;
      }
      this.ensureKButton(buttons, mediaUrl, onClick);
    }
    mountPinnedAudio() {
      const pinnedAudio = document.querySelector(".pinned-audio");
      if (!pinnedAudio)
        return;
      const dataMid = pinnedAudio.getAttribute("data-mid");
      if (!dataMid)
        return;
      const existing = document.querySelector("._tel_download_button_pinned_container");
      const button = existing || document.createElement("button");
      if (!existing) {
        button.className = "btn-icon tgico-download _tel_download_button_pinned_container";
        button.innerHTML = renderDownloadIconWrap();
        button.type = "button";
        button.title = "Download";
        button.ariaLabel = "Download";
      }
      Array.from(document.querySelectorAll("audio-element")).forEach((voice) => {
        const bubble = voice.closest(".bubble");
        if (bubble?.querySelector("._tel_download_button_pinned_container"))
          return;
        if (voice.getAttribute("data-mid") !== dataMid)
          return;
        const link = voice.audio?.getAttribute("src") || utils.getMediaSrc(voice.audio);
        if (!link)
          return;
        const isAudio = voice.audio instanceof HTMLAudioElement;
        button.onclick = (e) => {
          e.stopPropagation();
          if (isAudio)
            this.downloadService.downloadAudio(link);
          else
            this.downloadService.downloadVideo(link);
        };
        if (button.getAttribute("data-mid") !== dataMid) {
          button.setAttribute("data-mid", dataMid);
          pinnedAudio.querySelector(".pinned-container-wrapper-utils")?.appendChild(button);
        }
      });
    }
  }

  class TelegramDownloaderApp {
    constructor() {
      this.downloadService = null;
      this.progress = new ProgressManager({
        onRetry: (url, taskId, kind, options) => {
          if (kind === "audio") {
            this.downloadService.downloadAudio(url, taskId, options);
            return;
          }
          this.downloadService.downloadVideo(url, taskId, options);
        },
        onCancel: (taskId) => this.downloadService.cancel(taskId)
      });
      this.downloadService = new DownloadService(this.progress);
      this.ui = new TelegramUiMount(this.downloadService);
      this.timer = null;
      this.observer = null;
      this._tickTimer = null;
    }
    start() {
      if (window[CONFIG.startFlag])
        return;
      window[CONFIG.startFlag] = true;
      ensureDownloadIconStyles();
      this.progress.setupContainer();
      this.ui.tick();
      this.observe();
    }
    scheduleTick() {
      if (this._tickTimer)
        return;
      this._tickTimer = window.setTimeout(() => {
        this._tickTimer = null;
        this.ui.tick();
      }, CONFIG.observerDebounce);
    }
    observe() {
      const root = document.body || document.documentElement;
      if (root && typeof MutationObserver === "function") {
        this.observer = new MutationObserver(() => this.scheduleTick());
        this.observer.observe(root, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["src", "class", "hidden"]
        });
      }
      this.timer = window.setInterval(() => this.ui.tick(), CONFIG.fallbackRefreshDelay);
      if (!document.body) {
        document.addEventListener(
          "DOMContentLoaded",
          () => {
            if (this.observer || !document.body)
              return;
            this.observer = new MutationObserver(() => this.scheduleTick());
            this.observer.observe(document.body, {
              childList: true,
              subtree: true,
              attributes: true,
              attributeFilter: ["src", "class", "hidden"]
            });
          },
          { once: true }
        );
      }
    }
    stop() {
      if (this.timer) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
      if (this._tickTimer) {
        window.clearTimeout(this._tickTimer);
        this._tickTimer = null;
      }
      this.observer?.disconnect();
      this.observer = null;
      window[CONFIG.startFlag] = false;
    }
  }

  const bootstrap = () => {
    try {
      const forceStart = Boolean(window.__TELEGRAM_MEDIA_DOWNLOADER_FORCE_START__);
      if (forceStart || String(window.location.host).includes("telegram.org")) {
        const app = new TelegramDownloaderApp();
        app.start();
        window.__TELEGRAM_MEDIA_DOWNLOADER_APP__ = app;
      }
    } catch (error) {
      console.error("[Tel Download] bootstrap failed:", error);
    }
  };
  bootstrap();

}());

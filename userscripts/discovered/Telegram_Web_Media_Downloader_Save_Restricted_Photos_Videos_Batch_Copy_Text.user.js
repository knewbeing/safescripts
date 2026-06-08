// ==UserScript==
// @name         Telegram Web Media Downloader — Save Restricted Photos & Videos (Batch) + Copy Text
// @name:ru      Telegram Web: медиа-загрузчик — фото/видео из защищённых чатов (пакетно) + копирование текста
// @name:de      Telegram Web Medien-Downloader — geschützte Fotos & Videos speichern (Batch) + Text
// @name:es      Telegram Web: descargar fotos y vídeos restringidos (por lotes) + copiar texto
// @name:fr      Telegram Web: téléchargeur de médias — photos & vidéos restreintes (lot) + copier le texte
// @name:it      Telegram Web: download media — foto e video con restrizioni (batch) + copia testo
// @name:pl      Telegram Web: pobieranie mediów — z zastrzeżonych czatów (zbiorowo) + kopiowanie tekstu
// @name:pt-BR   Telegram Web: baixar mídia — salvar fotos e vídeos restritos (em lote) + copiar texto
// @name:tr      Telegram Web medya indirici — kısıtlı fotoğraf ve videoları kaydet (toplu) ve metni kopyala
// @name:id      Pengunduh media Telegram Web — simpan foto & video terbatas (massal) + salin teks
// @name:zh-CN   Telegram 网页版媒体下载器 — 保存受限聊天的图片和视频（单个 + 批量）并复制文字
// @name:zh-TW   Telegram 網頁版媒體下載器 — 儲存受限聊天的相片與影片（單一 + 批次）並複製文字
// @name:ja      Telegram Web メディアダウンローダー — 制限付きチャットの写真・動画を保存（単体＋一括）＆テキストコピー
// @name:ko      Telegram 웹 미디어 다운로더 — 제한된 채팅의 사진·동영상 저장(개별 + 일괄) 및 텍스트 복사
// @name:vi      Trình tải media Telegram Web — lưu ảnh & video bị hạn chế (hàng loạt) + sao chép văn bản
// @name:th      ตัวดาวน์โหลดสื่อ Telegram เว็บ — บันทึกรูปและวิดีโอจากแชทที่จำกัด (เป็นชุด) + คัดลอกข้อความ
// @namespace    c0d3r
// @license      MIT
// @version      1.0
// @description       Download photos and videos from Telegram Web, one by one or in batches — even in restricted "no-forwards" chats. Also re-enables copying text from protected messages.
// @description:ru    Скачивайте фото и видео из Telegram Web — по одному или пакетно — даже в защищённых чатах с запретом пересылки. Также возвращает копирование текста из защищённых сообщений.
// @description:de    Lade Fotos und Videos aus Telegram Web herunter – einzeln oder als ganze Auswahl – auch in eingeschränkten Chats ohne Weiterleitung. Aktiviert außerdem das Kopieren von Text aus geschützten Nachrichten.
// @description:es    Descarga fotos y vídeos de Telegram Web, de uno en uno o por lotes, incluso en chats restringidos sin reenvío. También vuelve a habilitar copiar texto de mensajes protegidos.
// @description:fr    Téléchargez les photos et vidéos de Telegram Web, une par une ou par lots entiers, même dans les conversations restreintes sans transfert. Réactive aussi la copie du texte des messages protégés.
// @description:it    Scarica foto e video da Telegram Web, uno alla volta o in blocco, anche nelle chat con restrizioni e inoltro disabilitato. Riabilita anche la copia del testo dai messaggi protetti.
// @description:pl    Pobieraj zdjęcia i filmy z Telegram Web — pojedynczo lub całymi zaznaczeniami — nawet na zastrzeżonych czatach z blokadą przesyłania dalej. Przywraca też kopiowanie tekstu z chronionych wiadomości.
// @description:pt-BR Baixe fotos e vídeos do Telegram Web, um a um ou em lotes inteiros, mesmo em conversas restritas sem encaminhamento. Também reativa a cópia de texto de mensagens protegidas.
// @description:tr    Telegram Web'den fotoğraf ve videoları tek tek veya toplu olarak indirin; iletime kapalı kısıtlı sohbetlerde bile. Ayrıca korumalı mesajlardaki metni kopyalamayı yeniden etkinleştirir.
// @description:id    Unduh foto dan video dari Telegram Web, satu per satu atau sekaligus, bahkan di obrolan terbatas tanpa teruskan. Juga mengaktifkan kembali penyalinan teks dari pesan yang dilindungi.
// @description:zh-CN 从 Telegram 网页版下载图片和视频，可单个或整批保存，即使在禁止转发的受限聊天中也能使用。同时恢复复制受保护消息中的文字。
// @description:zh-TW 從 Telegram 網頁版下載相片與影片，可單一或整批儲存，即使在禁止轉發的受限聊天中也能使用。同時恢復複製受保護訊息中的文字。
// @description:ja    Telegram Web の写真や動画を1件ずつ、または選択範囲ごと一括でダウンロード。転送禁止の制限付きチャットでも保存できます。保護されたメッセージのテキストコピーも復活させます。
// @description:ko    Telegram 웹에서 사진과 동영상을 하나씩 또는 선택 항목 전체를 한 번에 다운로드하세요. 전달 금지된 제한 채팅에서도 저장할 수 있습니다. 보호된 메시지의 텍스트 복사도 다시 활성화합니다.
// @description:vi    Tải ảnh và video từ Telegram Web, từng tệp hoặc cả nhóm đã chọn, ngay cả trong cuộc trò chuyện bị hạn chế cấm chuyển tiếp. Đồng thời bật lại việc sao chép văn bản từ tin nhắn được bảo vệ.
// @description:th    ดาวน์โหลดรูปภาพและวิดีโอจาก Telegram เว็บ ทีละไฟล์หรือทั้งชุดที่เลือก แม้ในแชทที่จำกัดและห้ามส่งต่อ อีกทั้งยังเปิดให้คัดลอกข้อความจากข้อความที่ป้องกันไว้ได้อีกครั้ง
// @author       copyMister
// @match        https://web.telegram.org/*
// @match        https://webk.telegram.org/*
// @match        https://webz.telegram.org/*
// @icon         https://web.telegram.org/k/assets/img/favicon.ico
// @grant        none
// @run-at       document-start
// @downloadURL https://update.greasyfork.org/scripts/477900/Telegram%20Web%20Media%20Downloader%20%E2%80%94%20Save%20Restricted%20Photos%20%20Videos%20%28Batch%29%20%2B%20Copy%20Text.user.js
// @updateURL https://update.greasyfork.org/scripts/477900/Telegram%20Web%20Media%20Downloader%20%E2%80%94%20Save%20Restricted%20Photos%20%20Videos%20%28Batch%29%20%2B%20Copy%20Text.meta.js
// ==/UserScript==

/*
 * Strategy (WebK only — see redirect below):
 * "Restrict saving / no-forwards" is a cosmetic UI flag: the media is already decrypted
 * and present in the page, and the app's own download routine is still callable. We hand
 * the in-memory media object to appDownloadManager.downloadToDisc() — the exact call the
 * native download button makes — so files stream through the Service Worker (large files
 * included) with correct names, and the restriction is bypassed.
 */

(function () {
    'use strict';

    // --- Client gate ---------------------------------------------------------
    // We depend on WebK's page-global managers, which the WebA client (/a/, /z/, webz.*)
    // does not expose in production. Send everyone to WebK, preserving the open-chat hash.
    // Running at document-start means WebA never finishes booting before we redirect.
    const onWebK = location.hostname === 'webk.telegram.org' || location.pathname.startsWith('/k/');
    if (!onWebK) {
        location.replace('https://web.telegram.org/k/' + location.hash);
        return;
    }

    // With @grant none the script shares the page realm, so the app's managers live on
    // `window` directly — no unsafeWindow needed. (If a sandboxed @grant is ever added,
    // unsafeWindow still bridges to the page.)
    const page = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

    const ICON = '📥';   // 📥 — emoji on purpose: Telegram's tgico codepoints churn between builds
    const BATCH_GAP_MS = 1000;     // breather between batch items, so the SW/server isn't hammered

    // Promise sleep — lets us write a plain awaited loop instead of chained setTimeouts.
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // tweb stores every saveable media as a Document (video/gif/audio/voice/round/sticker/file)
    // or a Photo, so this single check covers *all* downloadable media types — no class list.
    const mediaOf = (msg) => msg && msg.media && (msg.media.document || msg.media.photo);

    // Synchronous in-memory lookup of a message by peer + id (mid coerced to a number).
    const lookup = (peerId, mid) => page.mtprotoMessagePort?.getMessageByPeer(peerId, +mid);

    // --- Download core -------------------------------------------------------
    // Hand the media object to the app's downloader. Only `media` is read by tweb
    // (DownloadMediaOptions); a `message` key — as seen in some forks — is silently ignored.
    async function download(msg) {
        const media = mediaOf(msg);
        const dm = page.appDownloadManager;
        if (!dm) { console.warn('[tg-save] appDownloadManager missing — WebK internals changed?'); return; }
        if (media) await dm.downloadToDisc({ media });
    }

    // --- Single download: a "Download" item in the bubble context menu -------
    // Captured on right-click, consumed when the menu node appears.
    let pending = null;

    document.addEventListener('mouseup', (e) => {
        pending = null;
        if (e.button !== 2) return;                       // right click only
        const bubble = e.target.closest('[data-mid]');
        // Only act in restricted chats; normal chats already have a native Download item.
        if (!bubble || !bubble.closest('.no-forwards')) return;
        if (mediaOf(lookup(bubble.dataset.peerId, bubble.dataset.mid))) {
            pending = { peerId: bubble.dataset.peerId, mid: bubble.dataset.mid };
        }
    });

    function addDownloadItem(menu) {
        const first = menu.querySelector('.btn-menu-item');
        if (!pending || !first || menu.querySelector('#nk-tg-down')) return;
        const { peerId, mid } = pending;
        first.insertAdjacentHTML('beforebegin',
            '<div class="btn-menu-item rp-overflow" id="nk-tg-down">' +
            '<span class="btn-menu-item-icon" style="font-size:1rem">' + ICON + '</span>' +
            '<span class="btn-menu-item-text">Download</span></div>');
        menu.querySelector('#nk-tg-down').addEventListener('click',
            () => download(lookup(peerId, mid)).catch((err) => console.warn('[tg-save] download failed', err)));
    }

    // --- Batch download: a button in the selection bar -----------------------
    function addBatchButton(wrapper) {
        const bar = wrapper.querySelector('.selection-container');   // .selection-container-left was removed by tweb
        if (!bar || bar.querySelector('#nk-tg-batch')) return;
        bar.insertAdjacentHTML('beforeend',
            '<button id="nk-tg-batch" class="btn-primary btn-transparent text-bold" title="Download selected media" style="cursor:pointer;width:auto;">' +
            '<span style="font-size:1rem;margin:0 .4rem .2rem 0;">' + ICON + '</span> <span class="nk-txt">D/L</span></button>');
        bar.querySelector('#nk-tg-batch').addEventListener('click', downloadSelected);
    }

    async function downloadSelected() {
        const sel = page.appImManager?.chat?.selection;
        const txt = document.querySelector('#nk-tg-batch .nk-txt');
        const media = ((await sel?.getSelectedMessages()) || []).filter(mediaOf);   // skip text/service messages
        if (!media.length) { txt.textContent = 'N/A'; await delay(1500); txt.textContent = 'D/L'; return; }

        const btn = document.getElementById('nk-tg-batch');
        btn.disabled = true; btn.style.opacity = 0.6;
        // Await each download fully before the next: this is what keeps large files reliable —
        // it stops many concurrent Service-Worker hand-offs from racing and falling back to the
        // in-memory blob path (which is what fails for 500 MB+). The counter doubles as progress.
        for (let i = 0; i < media.length; i++) {
            txt.textContent = (i + 1) + '/' + media.length;
            try { await download(media[i]); } catch (err) { console.warn('[tg-save] batch item failed', err); }
            if (i < media.length - 1) await delay(BATCH_GAP_MS);
        }
        btn.disabled = false; btn.style.opacity = 1; txt.textContent = 'D/L';
        sel?.cancelSelection();   // correct method (forks calling clearSelection() throw)
    }

    // --- Wiring --------------------------------------------------------------
    // Re-allow Ctrl+C in restricted chats. Telegram blocks it with one bubble-phase 'copy'
    // listener on document that calls preventDefault(); we run first (capture phase) and stop
    // that listener — but only for selections inside a .no-forwards bubble, so rich copy in
    // normal chats is untouched.
    document.addEventListener('copy', (e) => {
        const node = getSelection()?.anchorNode;
        const el = node && (node.nodeType === 1 ? node : node.parentElement);
        if (el?.closest('.no-forwards')) e.stopImmediatePropagation();
    }, true);

    // Make text inside restricted (.no-forwards) bubbles selectable, so there is something
    // to copy once the blocker above is out of the way. Scoped to those bubbles only.
    const style = document.createElement('style');
    style.textContent = '.bubble.no-forwards,.bubble.no-forwards *' +
        '{-webkit-user-select:text!important;user-select:text!important}';
    (document.head || document.documentElement).appendChild(style);

    // One observer for both UIs. The context menu is now appended to <body> (it used to live
    // under #column-center — that move is exactly why the old script stopped adding the button),
    // and the selection bar is added inside the chat; watching body covers both.
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            for (const node of m.addedNodes) {
                if (node.nodeType !== 1) continue;
                if (node.id === 'bubble-contextmenu') addDownloadItem(node);
                else if (node.classList.contains('selection-wrapper')) addBatchButton(node);
            }
        }
    });
    const start = () => observer.observe(document.body, { childList: true, subtree: true });
    if (document.body) start();
    else document.addEventListener('DOMContentLoaded', start, { once: true });
})();

// ==UserScript==
// @name         🔥 [2026] All-in-One Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @namespace    https://tenzaa.com/
// @version      2026.09.29
// @description  [2026 Latest] Direct API Video Downloader! Download ANY video from YouTube, TikTok, X(Twitter), Instagram, Facebook. In-page parsing without redirects. Support 4K, 1080P, MP3, MP4, no watermark.
// @author       classccai
// @icon         https://tenzaa.com/favicon.ico
// @match        *://*.youtube.com/*
// @match        *://youtube.com/*
// @match        *://youtu.be/*
// @match        *://x.com/*
// @match        *://twitter.com/*
// @match        *://*.tiktok.com/*
// @match        *://tiktok.com/*
// @match        *://*.instagram.com/*
// @match        *://instagram.com/*
// @match        *://*.facebook.com/*
// @match        *://facebook.com/*
// @match        *://tenzaa.com/*
// @match        https://tenzaa.com/*
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @connect      api.snapwc.com
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/3.3.2/jsencrypt.min.js
// @run-at       document-end
// @license      MIT

// @name:af      🔥 Alles-in-een Video Aflaaier | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:af Laai enige video van YouTube, TikTok, X(Twitter), Instagram, Facebook af.
// @name:am      🔥 ሁሉንም በአንድ ቪዲዮ አውራጅ | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:am ማንኛውንም ቪዲዮ ከ YouTube, TikTok, X(Twitter), Instagram, Facebook ያውርዱ።
// @name:ar      🔥 محمل الفيديو الكل في واحد | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ar تنزيل أي فيديو من YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:as      🔥 অল-ইন-ৱান ভিডিঅ' ডাউনলোডাৰ | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:as যিকোনো ভিডিঅ' ডাউনলোড কৰক YouTube, TikTok, X(Twitter), Instagram, Facebook পৰা।
// @name:az      🔥 Hər Şey Bir Arada Video Yükləyici | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:az YouTube, TikTok, X(Twitter), Instagram, Facebook-dan videoları endirin.
// @name:be      🔥 Універсальны загрузнік відэа | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:be Спампоўвайце відэа з YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:bg      🔥 Всичко-в-едно изтегляне на відэа | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:bg Изтеглете видео ад YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:bn      🔥 অল-ইন-ওয়ান ভিডিও ডাউনলোডার | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:bn YouTube, TikTok, X(Twitter), Instagram, Facebook থেকে ভিডিও ডাউনলোড করুন।
// @name:bs      🔥 Sve-u-jednom Video Preuzimač | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:bs Preuzmite videozapise sa YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:ca      🔥 Descarregador de vídeos Tot en Un | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ca Baixeu vídeos de YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:cs      🔥 All-in-One Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:cs Stáhněte si videa z YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:da      🔥 Alt-i-en Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:da Download videoer fra YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:de      🔥 All-in-One Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:de Laden Sie Videos von YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:dz      🔥 ཆ་ཚང་བརྙན་འཁོར་ཕབ་ལེན། | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:dz YouTube, TikTok, X(Twitter), Instagram, Facebook ལས་བརྙན་འཁོར་ཕབ་ལེན།
// @name:el      🔥 Λήψη βίντεο Όλα σε Ένα | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:el Λήψη βίντεο από YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:en      🔥 All-in-One Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:en Download videos from YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:en-GB   🔥 All-in-One Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:en-GB Download videos from YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:en-US   🔥 All-in-One Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:en-US Download videos from YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:eo      🔥 Ĉio-en-unu Video Elŝutilo | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:eo Elŝutu videojn de YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:es      🔥 Descargador de vídeos Todo en Uno | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:es Descarga vídeos de YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:es-419  🔥 Descargador de vídeos Todo en Uno | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:es-419 Descarga vídeos de YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:es-US   🔥 Descargador de vídeos Todo en Uno | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:es-US Descarga vídeos de YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:et      🔥 Kõik-ühes video allalaadija | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:et Laadige alla videoid YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:eu      🔥 Dena-batean Bideo Deskargatzailea | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:eu Deskargatu bideoak YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:fa      🔥 دانلودر ویدیوی همه‌کاره | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:fa ویدیوها را از YouTube, TikTok, X(Twitter), Instagram, Facebook دانلود کنید.
// @name:fi      🔥 Kaikki yhdessä -videolataaja | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:fi Lataa videoita YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:fil     🔥 All-in-One Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:fil I-download ang mga video mula sa YouTube, TikTok, X(Twitter), Instagram.
// @name:fr      🔥 Téléchargeur de vidéos Tout-en-un | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:fr Téléchargez des vidéos de YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:fr-CA   🔥 Téléchargeur de vidéos Tout-en-un | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:fr-CA Téléchargez des vidéos de YouTube, TikTok, X(Twitter), Instagram.
// @name:ga      🔥 Íoslódálaí Físeáin Uile-i-Aon | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ga Íoslódáil físeáin ó YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:gl      🔥 Descargador de vídeos Todo en Un | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:gl Descarga vídeos de YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:gn      🔥 Ta'anga Mýi Mboguejyha | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:gn Emboguejy ta'anga mýi YouTube, TikTok, X(Twitter), Instagram, Facebook-gui.
// @name:gu      🔥 ઑલ-ઇન-વન વિડિઓ ડાઉનલોડર | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:gu YouTube, TikTok, X(Twitter), Instagram, Facebook પરથી વિડિઓઝ ડાઉનલોડ કરો.
// @name:ha      🔥 All-in-One Bidiyo Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ha Zazzage bidiyon YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:hi      🔥 ऑल-इन-वन वीडियो डाउनलोडर | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:hi YouTube, TikTok, X(Twitter), Instagram, Facebook से वीडियो डाउनलोड करें।
// @name:hr      🔥 Sve-u-jednom Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:hr Preuzmite videozapise s YouTubea, TikToka, X(Twitter), Instagrama.
// @name:hu      🔥 Minden-az-egyben Videó Letöltő | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:hu Töltsön le videókat a YouTube, TikTok, X(Twitter), Instagram oldalakról.
// @name:hy      🔥 Համապարփակ Վիդեո Ներբեռնիչ | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:hy Ներբեռնեք տեսանյութեր YouTube, TikTok, X(Twitter), Instagram, Facebook-ից:
// @name:id      🔥 Pengunduh Video All-in-One | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:id Unduh video dari YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:ig      🔥 Ihe Nbudata Vidiyo Niile | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ig Budata vidiyo na YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:is      🔥 Allt-í-einu Myndbanda Niðurhalari | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:is Sæktu myndbönd frá YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:it      🔥 Scarica Video Tutto-in-Uno | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:it Scarica video da YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:iw      🔥 מוריד וידאו הכל באחד | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:iw הורד סרטונים מ-YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:ja      🔥 オールインワン動画ダウンローダー | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ja YouTube、TikTok、X(Twitter)、Instagram、Facebookから動画をダウンロード。
// @name:jv      🔥 Pengunduh Video All-in-One | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:jv Unduh video saka YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:ka      🔥 All-in-One ვიდეო ჩამომტვირთავი | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ka ჩამოტვირთეთ ვიდეოები YouTube, TikTok, X(Twitter), Instagram-დან.
// @name:kk      🔥 Универсалды Видео Жүктеуші | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:kk YouTube, TikTok, X(Twitter), Instagram, Facebook-тен бейнелерді жүктеңіз.
// @name:km      🔥 កម្មវិធីទាញយកវីដេអូទាំងអស់ក្នុងតែមួយ | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:km ទាញយកវីដេអូពី YouTube, TikTok, X(Twitter), Instagram, Facebook។
// @name:kn      🔥 ಆಲ್-ಇನ್-ಒನ್ ವೀಡಿಯೊ ಡೌನ್‌ಲೋಡರ್ | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:kn YouTube, TikTok, X(Twitter), Instagram, Facebook ನಿಂದ ವೀಡಿಯೊಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.
// @name:ko      🔥 올인원 비디오 다운로더 | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ko YouTube, TikTok, X(Twitter), Instagram, Facebook에서 영상을 다운로드하세요.
// @name:ky      🔥 Бардыгы бир жерде Видео Жүктөөчү | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ky YouTube, TikTok, X(Twitter), Instagram, Facebook'тан видеолорду жүктөп алыңыз.
// @name:lo      🔥 ດາວໂຫລດວິດີໂອທັງໝົດក្នុងໜຶ່ງດຽວ | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:lo ດາວໂຫລດວິດີໂອຈາກ YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:lt      🔥 Viskas viename vaizdo įrašų atsisiuntėjas | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:lt Atsisiųskite vaizdo įrašus iš YouTube, TikTok, X(Twitter), Instagram.
// @name:lv      🔥 Viss vienā Video Lejupielādētājs | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:lv Lejupielādējiet videoklipus no YouTube, TikTok, X(Twitter), Instagram.
// @name:mg      🔥 Mpisintona Video Feno | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:mg Sintomy ny video avy amin'ny YouTube, TikTok, X(Twitter), Instagram.
// @name:mk      🔥 Сè-во-едно Преземач на видео | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:mk Преземете видеа од YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:ml      🔥 ഓൾ-ইন-വൺ വീഡിയോ ഡൗൺലോഡർ | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ml YouTube, TikTok, X(Twitter), Instagram, Facebook എന്നിവയിൽ നിന്ന് വീഡിയോകൾ.
// @name:mn      🔥 Бүх видеог нэг дор татагч | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:mn YouTube, TikTok, X(Twitter), Instagram, Facebook-аас видео татах.
// @name:mr      🔥 ऑल-इन-वन व्हिडिओ डाउनलोडर | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:mr YouTube, TikTok, X(Twitter), Instagram, Facebook वरून व्हिडिओ डाउनलोड करा.
// @name:ms      🔥 Pemuat Turun Video Semua-dalam-Satu | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ms Muat turun video dari YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:mt      🔥 Tniżżil tal-Vidjo Kollox f'Wieħed | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:mt Niżżel vidjows minn YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:my      🔥 All-in-One ဗီဒီယို ডေါင်းလုဒ် | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:my YouTube, TikTok, X(Twitter), Instagram, Facebook တို့မှ ဗီဒီယိုများကို ဒေါင်းလုဒ်လုပ်ပါ။
// @name:ne      🔥 अल-ইন-वन भिडियो डाउनलोडर | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ne YouTube, TikTok, X(Twitter), Instagram, Facebook बाट भिडियोहरू डाउनलोड गर्नुहोस्।
// @name:nl      🔥 Alles-in-één Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:nl Download video's van YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:no      🔥 Alt-i-ett Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:no Last ned videoer fra YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:om      🔥 Buufataa Viidiyoo Hunda | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:om Viidiyoo YouTube, TikTok, X(Twitter), Instagram, Facebook irraa buufadhu.
// @name:or      🔥 ଅଲ୍-ଇନ୍-ୱାନ୍ ଭିଡିଓ ଡାଉନଲୋଡର୍ | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:or YouTube, TikTok, X(Twitter), Instagram, Facebook ରୁ ଭିଡିଓ ଡାଉନଲୋଡ୍ କରନ୍ତু |
// @name:pa      🔥 ਆਲ-ਇਨ-ਵਨ ਵੀਡੀਓ ਡਾਊਨਲੋਡর | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:pa YouTube, TikTok, X(Twitter), Instagram, Facebook ਤੋਂ ਵੀਡੀਓ ਡਾਊਨਲੋড করো।
// @name:pl      🔥 Pobieracz Wideo Wszystko-w-Jednym | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:pl Pobieraj filmy z YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:ps      🔥 د ټولو په یو کې ویډیو ډاونلوډر | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ps د YouTube, TikTok, X(Twitter), Instagram, Facebook څخه ویډیوګانې ډاونلوډ کړئ।
// @name:pt      🔥 Baixador de Vídeos Tudo-em-Um | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:pt Baixe vídeos do YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:pt-BR   🔥 Baixador de Vídeos Tudo-em-Um | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:pt-BR Baixe vídeos do YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:pt-PT   🔥 Transferidor de Vídeos Tudo-em-Um | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:pt-PT Transfira vídeos do YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:ro      🔥 Descărcător Video Tot-în-Unul | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ro Descărcați videoclipuri de pe YouTube, TikTok, X(Twitter), Instagram.
// @name:ru      🔥 Универсальный загрузчик видео | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ru Скачивайте видео с YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:rw      🔥 All-in-One Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:rw Kuramo vidiyo kuri YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:si      🔥 සියල්ල-එකම වීඩියෝ බාගන්නා | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:si YouTube, TikTok, X(Twitter), Instagram, Facebook වෙතින් වීඩියෝ බාගන්න.
// @name:sk      🔥 Všetko-v-jednom Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:sk Sťahujte videá z YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:sl      🔥 Prenosnik Videa Vse-v-enem | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:sl Prenesite videoposnetke iz YouTube, TikTok, X(Twitter), Instagram.
// @name:sn      🔥 Yese-mu-Imwe Vhidhiyo Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:sn Dhawunirodha mavhidhiyo kubva kuYouTube, TikTok, X(Twitter), Instagram.
// @name:so      🔥 Soo Degsade Video Dhammaan-Mid ah | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:so Soo degso fiidiyowyada YouTube, TikTok, X(Twitter), Instagram.
// @name:sq      🔥 Shkarkues Video Gjithçka-në-Një | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:sq Shkarkoni video nga YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:sr      🔥 Sve-u-jednom Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:sr Preuzmite video zapise sa YouTube, TikTok, X(Twitter), Instagram.
// @name:sr-Latn 🔥 Sve-u-jednom Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:sr-Latn Preuzmite video zapise sa YouTube, TikTok, X(Twitter), Instagram.
// @name:st      🔥 Khoasolla Livideo Tsohle ho e 'Ngoe | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:st Khoasolla livideo ho tsoa ho YouTube, TikTok, X(Twitter), Instagram.
// @name:sv      🔥 Allt-i-ett Video Downloader | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:sv Ladda ner videor från YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:sw      🔥 Kipakuzi cha Video Zote-kwa-Moja | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:sw Pakua video kutoka YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:ta      🔥 ஆல்-ইন-ஒன் வீடியோ டவுன்லோடர் | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ta YouTube, TikTok, X(Twitter), Instagram, Facebook ஆகியவற்றிலிருந்து வீடியோக்கள்.
// @name:te      🔥 ఆల్-ইন-వన్ వీడియో డౌన్‌లోడర్ | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:te YouTube, TikTok, X(Twitter), Instagram, Facebook నుండి వీడియోలు.
// @name:tg      🔥 Зеркашӣкунандаи Видеои Ҳамагир | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:tg Видеоҳоро аз YouTube, TikTok, X(Twitter), Instagram, Facebook зеркашӣ кунед.
// @name:th      🔥 ดาวน์โหลดวิดีโอแบบออลอินวัน | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:th ดาวน์โหลดวิดีโอจาก YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:ti      🔥 ኩሉ ኣብ ሓደ ቪድዮ መውረዲ | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ti ካብ YouTube, TikTok, X(Twitter), Instagram, Facebook ቪድዮታት ኣውርድ።
// @name:tk      🔥 Ählisi Bir ýerde Wideo Ýükleýji | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:tk YouTube, TikTok, X(Twitter), Instagram, Facebook-dan wideolary göçürip alyň.
// @name:tr      🔥 Hepsi Bir Arada Video İndirici | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:tr YouTube, TikTok, X(Twitter), Instagram, Facebook'tan videolar indirin.
// @name:ug      🔥 ھەممىباب سىن چۈشۈرگۈچ | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ug YouTube, TikTok, X(Twitter), Instagram, Facebook تىن سىن چۈشۈرۈڭ।
// @name:uk      🔥 Універсальний завантажувач відео | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:uk Завантажуйте відео з YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:ur      🔥 آل ان ون ویڈیو ڈاؤنلوڈر | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:ur YouTube, TikTok, X(Twitter), Instagram, Facebook سے ویڈیوز ڈاؤن لوڈ کریں۔
// @name:uz      🔥 Hammasi bitta Video Yuklab Oluvchi | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:uz YouTube, TikTok, X(Twitter), Instagram, Facebook-dan videolarni yuklab oling.
// @name:vi      🔥 Trình tải xuống video Tất cả trong Một | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:vi Tải xuống video từ YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:yo      🔥 Ohun Nkan Gbigbasilẹ Fidio Gbogbo-ni-Ẹkan | YouTube, TikTok, X(Twitter), Instagram
// @description:yo Gba awọn fidio lati YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @name:zh-CN   🔥 多合一视频下载器【2026最新】- 支持 YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:zh-CN 【2026最新】一键下载 YouTube, TikTok, X(Twitter), Instagram, Facebook 视频。支持 4K, 1080P, MP3, MP4，无水印，极速稳定。
// @name:zh-HK   🔥 多合一影片下載器【2026最新】- 支援 YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:zh-HK 【2026最新】一鍵下載 YouTube, TikTok, X(Twitter), Instagram, Facebook 影片。支援 4K, 1080P, MP3, MP4，無浮水印，極速穩定。
// @name:zh-TW   🔥 多合一影片下載器【2026最新】- 支援 YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:zh-TW 【2026最新】一鍵下載 YouTube, TikTok, X(Twitter), Instagram, Facebook 影片。支援 4K, 1080P, MP3, MP4，無浮水印，極速穩定。
// @name:zu      🔥 Konke-ku-Kunye Isilandi se-Video | YouTube, TikTok, X(Twitter), Instagram, Facebook
// @description:zu Landa amavidiyo kusuka ku-YouTube, TikTok, X(Twitter), Instagram, Facebook.
// @downloadURL https://update.greasyfork.org/scripts/574417/%F0%9F%94%A5%20%5B2026%5D%20All-in-One%20Video%20Downloader%20%7C%20YouTube%2C%20TikTok%2C%20X%28Twitter%29%2C%20Instagram%2C%20Facebook.user.js
// @updateURL https://update.greasyfork.org/scripts/574417/%F0%9F%94%A5%20%5B2026%5D%20All-in-One%20Video%20Downloader%20%7C%20YouTube%2C%20TikTok%2C%20X%28Twitter%29%2C%20Instagram%2C%20Facebook.meta.js
// ==/UserScript==

(function () {
    "use strict";

    // ============================================================
    // All-in-One Video Downloader (2026 Edition)
    // Direct in-page video parsing via SnapWC API (RSA+AES Encrypted)
    // Supported: YouTube, TikTok, X(Twitter), Instagram, Facebook
    // ============================================================

    var host = window.location.hostname;
    var platform = "youtube";

    if (/x\.com|twitter\.com/i.test(host)) platform = "twitter";
    if (/tiktok\.com/i.test(host)) platform = "tiktok";
    if (/instagram\.com/i.test(host)) platform = "instagram";
    if (/facebook\.com/i.test(host)) platform = "facebook";

    if (/tenzaa\.com|snapwc\.com/i.test(host)) return;

    // ------------------------------------------------------------
    // 1. STYLES (Floating Button + Modern Glassmorphism Modal)
    // ------------------------------------------------------------
    var styles = `
        #tenzaa-aio-btn {
            position: fixed;
            z-index: 2147483640 !important;
            background: rgba(20, 20, 20, 0.88);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.22);
            width: 42px;
            height: 42px;
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background .2s, transform .15s, box-shadow .2s;
            pointer-events: none !important;
            box-shadow: 0 4px 16px rgba(0, 0, 0, .55);
            font-size: 16px;
        }
        #tenzaa-aio-btn.tenzaa-hover {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            transform: scale(1.1);
            border-color: rgba(255, 255, 255, 0.5);
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.6);
        }
        #tenzaa-aio-btn svg { fill: currentColor; width: 22px; height: 22px; pointer-events: none; }

        #tenzaa-tip {
            position: fixed;
            z-index: 2147483639 !important;
            background: rgba(15, 23, 42, 0.95);
            color: #fff;
            padding: 6px 12px;
            border-radius: 8px;
            font: 12px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            pointer-events: none;
            display: none;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.1);
        }

        /* SnapWC Downloader Modal */
        #snapwc-overlay {
            position: fixed;
            top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            z-index: 2147483645 !important;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.25s ease;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        #snapwc-overlay.active {
            opacity: 1;
            pointer-events: auto;
        }
        #snapwc-modal {
            background: #0f172a;
            color: #f1f5f9;
            width: 92%;
            max-width: 520px;
            max-height: 85vh;
            border-radius: 18px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: scale(0.95) translateY(10px);
            transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #snapwc-overlay.active #snapwc-modal {
            transform: scale(1) translateY(0);
        }
        .snapwc-header {
            padding: 16px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(15, 23, 42, 0.8);
        }
        .snapwc-brand {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 15px;
            font-weight: 700;
            color: #fff;
        }
        .snapwc-close-btn {
            background: rgba(255, 255, 255, 0.08);
            border: none;
            color: #94a3b8;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: background 0.2s, color 0.2s;
        }
        .snapwc-close-btn:hover {
            background: rgba(239, 68, 68, 0.2);
            color: #ef4444;
        }
        .snapwc-body {
            padding: 20px;
            overflow-y: auto;
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .snapwc-body::-webkit-scrollbar { width: 5px; }
        .snapwc-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }

        /* Status Spinner */
        .snapwc-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
            gap: 16px;
            text-align: center;
        }
        .snapwc-spinner {
            width: 44px;
            height: 44px;
            border: 3px solid rgba(59, 130, 246, 0.2);
            border-top-color: #3b82f6;
            border-radius: 50%;
            animation: snapwc-spin 0.8s linear infinite;
        }
        @keyframes snapwc-spin { to { transform: rotate(360deg); } }
        .snapwc-loading-text { font-size: 14px; color: #94a3b8; }

        /* Video Info Header */
        .snapwc-video-info {
            display: flex;
            gap: 14px;
            background: rgba(30, 41, 59, 0.5);
            padding: 12px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .snapwc-thumb {
            width: 120px;
            height: 68px;
            object-fit: cover;
            border-radius: 8px;
            background: #020617;
            flex-shrink: 0;
        }
        .snapwc-meta {
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
        }
        .snapwc-title {
            font-size: 13px;
            font-weight: 600;
            color: #f8fafc;
            line-height: 1.4;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        /* Section Lists */
        .snapwc-section-title {
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #94a3b8;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .snapwc-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .snapwc-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            background: rgba(30, 41, 59, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 10px;
            transition: background 0.2s, border-color 0.2s;
        }
        .snapwc-item:hover {
            background: rgba(51, 65, 85, 0.8);
            border-color: rgba(59, 130, 246, 0.4);
        }
        .snapwc-item-info {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .snapwc-badge {
            font-size: 11px;
            font-weight: 700;
            padding: 2px 7px;
            border-radius: 5px;
            background: rgba(59, 130, 246, 0.2);
            color: #60a5fa;
            border: 1px solid rgba(59, 130, 246, 0.3);
        }
        .snapwc-badge.green {
            background: rgba(16, 185, 129, 0.2);
            color: #34d399;
            border-color: rgba(16, 185, 129, 0.3);
        }
        .snapwc-badge.orange {
            background: rgba(245, 158, 11, 0.2);
            color: #fbbf24;
            border-color: rgba(245, 158, 11, 0.3);
        }
        .snapwc-size { font-size: 12px; color: #64748b; }
        .snapwc-actions {
            display: flex;
            gap: 8px;
        }
        .snapwc-btn-dl {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: #fff;
            border: none;
            padding: 6px 14px;
            border-radius: 7px;
            font-size: 12px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            transition: opacity 0.2s, transform 0.1s;
        }
        .snapwc-btn-dl:hover {
            opacity: 0.92;
            transform: translateY(-1px);
        }
        .snapwc-btn-copy {
            background: rgba(255, 255, 255, 0.08);
            color: #cbd5e1;
            border: 1px solid rgba(255, 255, 255, 0.12);
            padding: 6px 10px;
            border-radius: 7px;
            font-size: 12px;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
        }
        .snapwc-btn-copy:hover {
            background: rgba(255, 255, 255, 0.15);
            color: #fff;
        }

        /* Captcha Card */
        .snapwc-captcha-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 14px;
            padding: 24px;
            background: rgba(30, 41, 59, 0.6);
            border-radius: 14px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-align: center;
        }
        .snapwc-captcha-title { font-size: 15px; font-weight: 700; color: #f8fafc; }
        .snapwc-captcha-desc { font-size: 12px; color: #94a3b8; }
        .snapwc-captcha-row {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .snapwc-captcha-img {
            height: 48px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            cursor: pointer;
        }
        .snapwc-captcha-input {
            width: 130px;
            height: 44px;
            background: rgba(15, 23, 42, 0.9);
            border: 1px solid rgba(59, 130, 246, 0.5);
            border-radius: 8px;
            color: #fff;
            font-size: 18px;
            font-weight: 700;
            text-align: center;
            letter-spacing: 4px;
            text-transform: uppercase;
            outline: none;
        }
        .snapwc-captcha-input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
        }
        .snapwc-captcha-btn {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: #fff;
            border: none;
            padding: 10px 24px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 700;
            cursor: pointer;
            transition: opacity 0.2s;
        }
        .snapwc-captcha-btn:hover { opacity: 0.9; }
        .snapwc-captcha-err { color: #f87171; font-size: 12px; min-height: 16px; }

        /* Error Box */
        .snapwc-err-box {
            padding: 24px;
            text-align: center;
            color: #f87171;
            font-size: 13px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
        }
    `;

    if (typeof GM_addStyle !== "undefined") {
        GM_addStyle(styles);
    } else {
        var s = document.createElement("style");
        s.textContent = styles;
        document.head.appendChild(s);
    }

    // ------------------------------------------------------------
    // 2. DOM ELEMENTS (Button, Tooltip, Overlay Modal)
    // ------------------------------------------------------------
    var btn = document.createElement("div");
    btn.id = "tenzaa-aio-btn";
    var svgNs = "http://www.w3.org/2000/svg";
    var svgIcon = document.createElementNS(svgNs, "svg");
    svgIcon.setAttribute("viewBox", "0 0 24 24");
    var path = document.createElementNS(svgNs, "path");
    path.setAttribute("d", "M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z");
    svgIcon.appendChild(path);
    btn.appendChild(svgIcon);
    document.body.appendChild(btn);

    var tip = document.createElement("div");
    tip.id = "tenzaa-tip";
    tip.textContent = "⚡ SnapWC 解析下载";
    document.body.appendChild(tip);

    // Modal Overlay
    var overlay = document.createElement("div");
    overlay.id = "snapwc-overlay";
    overlay.innerHTML = `
        <div id="snapwc-modal">
            <div class="snapwc-header">
                <div class="snapwc-brand">
                    <span>⚡</span>
                    <span>SnapWC 极速视频解析下载</span>
                </div>
                <button class="snapwc-close-btn" id="snapwc-close">&times;</button>
            </div>
            <div class="snapwc-body" id="snapwc-body"></div>
        </div>
    `;
    document.body.appendChild(overlay);

    var modalBody = document.getElementById("snapwc-body");
    var closeBtn = document.getElementById("snapwc-close");

    function closeModal() {
        overlay.classList.remove("active");
    }
    closeBtn.addEventListener("click", closeModal);
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeModal();
    });

    // ------------------------------------------------------------
    // 3. CRYPTO & API ENGINE (RSA-2048 + AES-256-CBC)
    // ------------------------------------------------------------
    var SERVER_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvDU+dR2bSews55172x4L
s/ja+Dxt9ViZcj/nY0YodYo7l4jEKtEiCNV28lpFj3CkP4HKRCjL/jYkQNKGPwVg
gUCGr/jBF1FpDLsqa0kg+dtfkm5Xm9QAyMBeG/jPdl5BEPOVh33A1UkPO/Xw6kSH
rfghOUwBMzRBtXeYuJiYs5sKrf+Wy5sv708TI6G4hAPJG/69W4NNFJi/ipBNxntG
dAoUHpEy4iYsvBgiccE7U0MBDnSHSqBBtIdMMFRHARn/tc+jXaadS0a4YmhTygiN
eAJU4QuqAE25CsvkzIYIVEmlRXVcC0afw76XcwDpKBMVR5bEPzd3tMEfA+R34L1D
fQIDAQAB
-----END PUBLIC KEY-----`;

    var clientPrivateKey = null;
    var clientPublicKey = null;

    function ensureClientKeyPair() {
        if (clientPrivateKey && clientPublicKey) return;
        var rsa = new JSEncrypt({ default_key_size: 512 });
        rsa.getKey();
        clientPrivateKey = rsa.getPrivateKey();
        clientPublicKey = rsa.getPublicKey();
    }

    function encryptRequest(data) {
        ensureClientKeyPair();
        var randomKeyStr = CryptoJS.lib.WordArray.random(16).toString();
        var aesKey = CryptoJS.SHA256(randomKeyStr);
        var iv = CryptoJS.lib.WordArray.random(16);
        var jsonStr = JSON.stringify(data);
        var encrypted = CryptoJS.AES.encrypt(jsonStr, aesKey, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var combined = iv.concat(encrypted.ciphertext);
        var encrypted_data = CryptoJS.enc.Base64.stringify(combined);

        var serverRsa = new JSEncrypt();
        serverRsa.setPublicKey(SERVER_PUBLIC_KEY);
        var encrypted_key = serverRsa.encrypt(randomKeyStr);

        return {
            encrypted_key: encrypted_key,
            encrypted_data: encrypted_data,
            client_public_key: clientPublicKey
        };
    }

    function decryptResponse(resp) {
        var clientRsa = new JSEncrypt();
        clientRsa.setPrivateKey(clientPrivateKey);
        var randomKeyStr = clientRsa.decrypt(resp.encrypted_key);
        if (!randomKeyStr) throw new Error("解密 AES 密钥失败");

        var aesKey = CryptoJS.SHA256(randomKeyStr);
        var parsed = CryptoJS.enc.Base64.parse(resp.encrypted_data);
        var iv = CryptoJS.lib.WordArray.create(parsed.words.slice(0, 4));
        var ciphertext = CryptoJS.lib.WordArray.create(parsed.words.slice(4));
        var decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, aesKey, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var utf8Str = decrypted.toString(CryptoJS.enc.Utf8);
        return JSON.parse(utf8Str);
    }

    // Session Cookie Persistence for Captcha & Authentication
    var savedSessionCookie = "";

    // Wrap GM_xmlhttpRequest into Promise
    function apiFetch(endpoint, data, skipEncryption) {
        return new Promise(function (resolve, reject) {
            var url = "https://api.snapwc.com" + endpoint;
            var bodyPayload = skipEncryption ? JSON.stringify(data) : JSON.stringify(encryptRequest(data));

            var reqHeaders = {
                "Content-Type": "application/json",
                "X-Locale": "zh-CN",
                "Origin": "https://snapwc.com",
                "Referer": "https://snapwc.com/"
            };
            if (savedSessionCookie) {
                reqHeaders["Cookie"] = savedSessionCookie;
            }

            GM_xmlhttpRequest({
                method: "POST",
                url: url,
                headers: reqHeaders,
                data: bodyPayload,
                withCredentials: true,
                timeout: 30000,
                onload: function (res) {
                    // Extract and persist session cookie from Set-Cookie header if present
                    if (res.responseHeaders) {
                        var cookieMatch = res.responseHeaders.match(/APP_SESSION_ID=([^;\r\n]+)/i);
                        if (cookieMatch) {
                            savedSessionCookie = "APP_SESSION_ID=" + cookieMatch[1].trim();
                        }
                    }

                    if (res.status >= 200 && res.status < 300) {
                        try {
                            var json = JSON.parse(res.responseText);
                            if (skipEncryption) {
                                resolve(json);
                            } else {
                                if (json.encrypted_key && json.encrypted_data) {
                                    resolve(decryptResponse(json));
                                } else {
                                    resolve(json);
                                }
                            }
                        } catch (e) {
                            reject(new Error("解析响应失败: " + e.message));
                        }
                    } else if (res.status === 422) {
                        reject(new Error("CAPTCHA_REQUIRED"));
                    } else {
                        reject(new Error("HTTP " + res.status + ": " + res.responseText));
                    }
                },
                onerror: function (err) {
                    reject(new Error("网络请求失败，请检查网络连接"));
                },
                ontimeout: function () {
                    reject(new Error("请求超时，请重试"));
                }
            });
        });
    }

    // ------------------------------------------------------------
    // 4. PARSE & CAPTCHA WORKFLOW
    // ------------------------------------------------------------
    function formatSize(bytes) {
        if (!bytes) return "";
        var mb = bytes / 1024 / 1024;
        return mb >= 1000 ? (mb / 1024).toFixed(1) + " GB" : mb.toFixed(1) + " MB";
    }

    function renderLoading(msg) {
        modalBody.innerHTML = `
            <div class="snapwc-loading">
                <div class="snapwc-spinner"></div>
                <div class="snapwc-loading-text">${msg || "正在通过 SnapWC 智能解析视频..."}</div>
            </div>
        `;
    }

    function renderError(errText, retryUrl) {
        modalBody.innerHTML = `
            <div class="snapwc-err-box">
                <div style="font-size: 32px;">⚠️</div>
                <div>${errText}</div>
                ${retryUrl ? '<button class="snapwc-captcha-btn" id="snapwc-retry-btn">重新解析</button>' : ''}
            </div>
        `;
        if (retryUrl) {
            document.getElementById("snapwc-retry-btn")?.addEventListener("click", function () {
                startParseFlow(retryUrl);
            });
        }
    }

    function renderCaptcha(targetUrl, captchaData) {
        modalBody.innerHTML = `
            <div class="snapwc-captcha-box">
                <div class="snapwc-captcha-title">🔒 安全人机验证</div>
                <div class="snapwc-captcha-desc">SnapWC 请求频率保护，请输入图形验证码后自动继续</div>
                <div class="snapwc-captcha-row">
                    <img class="snapwc-captcha-img" id="snapwc-cimg" src="${captchaData.captcha_image}" title="点击刷新验证码" alt="验证码" />
                    <input type="text" class="snapwc-captcha-input" id="snapwc-cinput" maxlength="6" autocomplete="off" placeholder="CODE" autofocus />
                </div>
                <div class="snapwc-captcha-err" id="snapwc-cerr"></div>
                <button class="snapwc-captcha-btn" id="snapwc-cbtn">验证并获取下载链接</button>
            </div>
        `;

        var cimg = document.getElementById("snapwc-cimg");
        var cinput = document.getElementById("snapwc-cinput");
        var cbtn = document.getElementById("snapwc-cbtn");
        var cerr = document.getElementById("snapwc-cerr");
        var currentToken = captchaData.captcha_token;

        setTimeout(function () { cinput.focus(); }, 100);

        async function refreshCaptcha() {
            cimg.style.opacity = "0.5";
            try {
                var fresh = await apiFetch("/api.captcha/generate", {}, true);
                if (fresh.captcha_image && fresh.captcha_token) {
                    cimg.src = fresh.captcha_image;
                    currentToken = fresh.captcha_token;
                    cinput.value = "";
                    cinput.focus();
                }
            } catch (e) {
                cerr.textContent = "刷新验证码失败: " + e.message;
            } finally {
                cimg.style.opacity = "1";
            }
        }

        cimg.addEventListener("click", refreshCaptcha);

        async function doVerify() {
            var code = cinput.value.trim().toUpperCase();
            if (!code) {
                cerr.textContent = "请输入验证码";
                cinput.focus();
                return;
            }
            cbtn.disabled = true;
            cbtn.textContent = "正在验证...";
            cerr.textContent = "";

            try {
                var verifyRes = await apiFetch("/api.captcha/verify", {
                    captcha_token: currentToken,
                    captcha_code: code,
                    scenario: "parser",
                    data: { url: targetUrl }
                }, true);

                // Verification OK! Continue parsing
                renderLoading("验证成功！正在生成高清下载链接...");
                var parseData = await apiFetch("/api.parser/parse", { url: targetUrl }, false);
                renderResults(parseData);
            } catch (err) {
                cerr.textContent = "验证码错误或失效，请重试";
                cbtn.disabled = false;
                cbtn.textContent = "验证并获取下载链接";
                refreshCaptcha();
            }
        }

        cbtn.addEventListener("click", doVerify);
        cinput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") doVerify();
        });
    }

    function renderResults(data) {
        if (!data) {
            renderError("未返回有效的媒体资源");
            return;
        }

        var title = data.title || "视频资源";
        var cover = data.cover || "";
        var videos = data.videos || [];
        var muxed = data.muxed || [];
        var audios = data.audios || [];

        // All video items: combine muxed (video+audio) and separate videos
        var allVideos = [];
        muxed.forEach(function (m) {
            allVideos.push({
                quality: m.quality_note || (m.quality ? m.quality + "p" : "HD"),
                ext: (m.ext || "MP4").toUpperCase(),
                size: formatSize(m.size),
                url: m.url,
                isMuxed: true
            });
        });
        videos.forEach(function (v) {
            allVideos.push({
                quality: v.quality_note || (v.quality ? v.quality + "p" : "Video"),
                ext: (v.ext || "MP4").toUpperCase(),
                size: formatSize(v.size),
                url: v.url,
                isMuxed: false
            });
        });

        var html = `
            <div class="snapwc-video-info">
                ${cover ? `<img class="snapwc-thumb" src="${cover}" referrerpolicy="no-referrer" alt="Thumbnail" />` : ''}
                <div class="snapwc-meta">
                    <div class="snapwc-title" title="${title}">${title}</div>
                    ${cover ? `<div style="margin-top: 8px;"><a href="${cover}" target="_blank" download class="snapwc-btn-copy" style="font-size: 11px; padding: 3px 8px; text-decoration: none;">🖼️ 下载封面</a></div>` : ''}
                </div>
            </div>
        `;

        if (allVideos.length > 0) {
            html += `
                <div>
                    <div class="snapwc-section-title">🎬 视频资源下载</div>
                    <div class="snapwc-list">
            `;
            allVideos.slice(0, 10).forEach(function (v) {
                html += `
                    <div class="snapwc-item">
                        <div class="snapwc-item-info">
                            <span class="snapwc-badge ${v.isMuxed ? 'green' : ''}">${v.quality}</span>
                            <span style="font-size: 13px; font-weight: 600;">${v.ext}</span>
                            ${v.size ? `<span class="snapwc-size">${v.size}</span>` : ''}
                            ${v.isMuxed ? `<span style="font-size: 10px; color: #34d399;">(含音频)</span>` : ''}
                        </div>
                        <div class="snapwc-actions">
                            <button class="snapwc-btn-copy" data-url="${v.url}" title="复制直链">📋 复制</button>
                            <a href="${v.url}" target="_blank" download rel="noreferrer noopener" class="snapwc-btn-dl">⬇ 下载</a>
                        </div>
                    </div>
                `;
            });
            html += `</div></div>`;
        }

        if (audios.length > 0) {
            html += `
                <div>
                    <div class="snapwc-section-title">🎵 纯音频提取</div>
                    <div class="snapwc-list">
            `;
            audios.slice(0, 5).forEach(function (a) {
                var q = a.quality_note || (a.quality ? a.quality + "kbps" : "Audio");
                var ext = (a.ext || "MP3").toUpperCase();
                var size = formatSize(a.size);
                html += `
                    <div class="snapwc-item">
                        <div class="snapwc-item-info">
                            <span class="snapwc-badge orange">${q}</span>
                            <span style="font-size: 13px; font-weight: 600;">${ext}</span>
                            ${size ? `<span class="snapwc-size">${size}</span>` : ''}
                        </div>
                        <div class="snapwc-actions">
                            <button class="snapwc-btn-copy" data-url="${a.url}" title="复制音频直链">📋 复制</button>
                            <a href="${a.url}" target="_blank" download rel="noreferrer noopener" class="snapwc-btn-dl">⬇ 下载</a>
                        </div>
                    </div>
                `;
            });
            html += `</div></div>`;
        }

        if (allVideos.length === 0 && audios.length === 0) {
            html += `<div style="text-align: center; color: #94a3b8; padding: 20px;">未找到可供下载的高清资源</div>`;
        }

        modalBody.innerHTML = html;

        // Copy button listeners
        modalBody.querySelectorAll(".snapwc-btn-copy").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var url = this.getAttribute("data-url");
                if (url) {
                    navigator.clipboard.writeText(url).then(function () {
                        btn.textContent = "✅ 已复制";
                        setTimeout(function () { btn.textContent = "📋 复制"; }, 1500);
                    });
                }
            });
        });
    }

    async function startParseFlow(targetUrl) {
        overlay.classList.add("active");
        renderLoading("正在连接 SnapWC 逆向接口...");

        try {
            // 1. Check if captcha is required
            var checkRes = await apiFetch("/api.captcha/is_required", {
                scenario: "parser",
                data: { url: targetUrl }
            }, true);

            if (checkRes && checkRes.status === true) {
                // Captcha is needed! Generate captcha image
                renderLoading("安全保护触发，正在加载人机验证码...");
                var genRes = await apiFetch("/api.captcha/generate", {}, true);
                if (genRes && genRes.captcha_image && genRes.captcha_token) {
                    renderCaptcha(targetUrl, genRes);
                    return;
                }
            }

            // 2. No captcha needed or session already active -> direct parse!
            renderLoading("正在解析高清音视频流与字幕...");
            var parseData = await apiFetch("/api.parser/parse", { url: targetUrl }, false);
            renderResults(parseData);

        } catch (err) {
            if (err.message === "CAPTCHA_REQUIRED") {
                // 422 trigger captcha
                renderLoading("触发验证保护，正在拉取验证码...");
                try {
                    var gen = await apiFetch("/api.captcha/generate", {}, true);
                    renderCaptcha(targetUrl, gen);
                } catch (e2) {
                    renderError("加载验证码失败: " + e2.message, targetUrl);
                }
            } else {
                renderError("解析失败: " + err.message, targetUrl);
            }
        }
    }

    // ------------------------------------------------------------
    // 5. URL NORMALIZATION & VIDEO ELEMENT DETECTION
    // ------------------------------------------------------------
    var activeVideo = null;
    var mouseX = -100;
    var mouseY = -100;

    function cleanUrl(raw) {
        if (!raw) return raw;
        try {
            var u = new URL(raw);
            ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "si", "spm", "share_source", "is_from_webapp", "is_copy_link", "sender_device", "web_id", "igshid"].forEach(function (k) { u.searchParams.delete(k); });
            if (platform === "youtube") {
                if (u.hostname === "youtu.be") return "https://www.youtube.com/watch?v=" + u.pathname.split("/").filter(Boolean)[0];
                if (u.pathname.startsWith("/shorts/")) {
                    var sid = u.pathname.split("/")[2];
                    if (sid) return "https://www.youtube.com/shorts/" + sid;
                }
                var v = u.searchParams.get("v");
                if (v) return "https://www.youtube.com/watch?v=" + v;
            }
            if (platform === "tiktok") {
                var m = u.pathname.match(/^\/(@[^/]+)\/video\/(\d+)/);
                if (m) return "https://www.tiktok.com/" + m[1] + "/video/" + m[2];
            }
            if (platform === "twitter") {
                var sm = u.pathname.match(/^\/([^/]+)\/status\/(\d+)/);
                if (sm) return "https://x.com/" + sm[1] + "/status/" + sm[2];
            }
            if (platform === "instagram") {
                var im = u.pathname.match(/^\/(?:p|reel|reels|tv)\/([^/]+)/);
                if (im) return "https://www.instagram.com/" + u.pathname.split("/")[1] + "/" + im[1] + "/";
            }
            if (platform === "facebook") {
                var fv = u.searchParams.get("v");
                if (fv) return "https://www.facebook.com/watch/?v=" + fv;
                var fm = u.pathname.match(/^\/(?:videos|reel|reels|watch)\/(\d+)/);
                if (fm) return "https://www.facebook.com/watch/?v=" + fm[1];
            }
            return u.origin + u.pathname;
        } catch (e) {
            return raw;
        }
    }

    function getTargetUrl(videoElement) {
        if (platform === "youtube") {
            var container = videoElement.closest("ytd-rich-item-renderer, ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2, ytd-reel-item-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, ytd-video-renderer, ytd-thumbnail");
            if (container) {
                var link = container.querySelector('a[href*="/shorts/"], a[href*="/watch?v="]');
                if (link && link.href) return cleanUrl(link.href);
            }
            var ytPlayer = document.querySelector("#movie_player");
            if (ytPlayer && ytPlayer.getVideoData) {
                var data = ytPlayer.getVideoData();
                if (data && data.video_id) return "https://www.youtube.com/watch?v=" + data.video_id;
            }
            if (location.pathname.startsWith("/shorts/")) {
                var id = location.pathname.split("/")[2];
                if (id) return "https://www.youtube.com/shorts/" + id;
            }
            var params = new URLSearchParams(location.search);
            var v = params.get("v");
            if (v) return "https://www.youtube.com/watch?v=" + v;
            return cleanUrl(location.href);
        }
        if (platform === "twitter") {
            var article = videoElement.closest("article");
            if (article) {
                var links = Array.from(article.querySelectorAll('a[href*="/status/"]'));
                var statusLink = links.find(function (l) { return /\/status\/\d+$/.test(l.href); });
                if (statusLink) return cleanUrl(statusLink.href);
                if (links.length) return cleanUrl(links[0].href);
            }
            return cleanUrl(location.href);
        }
        if (platform === "tiktok") {
            var cur = videoElement.parentElement;
            var videoId = "";
            var username = "";
            var depth = 0;
            while (cur && depth < 25) {
                if (!videoId && cur.id && cur.id.indexOf("xgwrapper") >= 0) {
                    var idMatch = cur.id.match(/\d{15,}/);
                    if (idMatch) videoId = idMatch[0];
                }
                if (!username) {
                    var userLink = cur.querySelector('a[href*="/@"]');
                    if (userLink) {
                        var userMatch = userLink.href.match(/\/(@[^/?]+)/);
                        if (userMatch) username = userMatch[1];
                    }
                }
                if (videoId && username) break;
                cur = cur.parentElement;
                depth++;
            }
            if (videoId && username) return "https://www.tiktok.com/" + username + "/video/" + videoId;
            if (videoId) return "https://www.tiktok.com/video/" + videoId;
            return cleanUrl(location.href);
        }
        if (platform === "instagram") {
            var igArticle = videoElement.closest("article");
            if (igArticle) {
                var a = igArticle.querySelector('a[href*="/p/"], a[href*="/reels/"], a[href*="/reel/"]');
                if (a) return cleanUrl(location.origin + a.getAttribute("href"));
            }
            return cleanUrl(location.href);
        }
        if (platform === "facebook") {
            var fm = location.href.match(/(?:v=|watch\/|reel\/|reels\/|videos\/)(\d+)/);
            if (fm) return "https://www.facebook.com/watch/?v=" + fm[1];
            var fbArticle = videoElement.closest('[role="article"], [data-pagelet]');
            if (fbArticle) {
                var flinks = Array.from(fbArticle.querySelectorAll('a[href*="/videos/"], a[href*="/watch/"], a[href*="/reel/"]'));
                if (flinks.length) return cleanUrl(flinks[0].href);
            }
            return cleanUrl(location.href);
        }
        return cleanUrl(location.href);
    }

    function updateBtnPos() {
        if (!activeVideo || btn.style.display === "none") return;
        var rect = activeVideo.getBoundingClientRect();
        var btnSize = 42;
        var top = rect.top + 15;
        var left = rect.left + (rect.width / 2) - (btnSize / 2);
        if (left < 5) left = 5;
        if (top < 5) top = 5;
        if (top > window.innerHeight - 45) top = window.innerHeight - 45;
        if (left > window.innerWidth - btnSize - 5) left = window.innerWidth - btnSize - 5;
        btn.style.top = top + "px";
        btn.style.left = left + "px";
        tip.style.top = (top + btnSize + 4) + "px";
        tip.style.left = Math.max(4, left - 25) + "px";
    }

    function checkHover() {
        if (mouseX < 0 || mouseY < 0) return;
        var btnRect = btn.getBoundingClientRect();
        var isHoveringBtn = (btn.style.display === "flex" &&
            mouseX >= btnRect.left && mouseX <= btnRect.right &&
            mouseY >= btnRect.top && mouseY <= btnRect.bottom);
        if (isHoveringBtn) {
            btn.classList.add("tenzaa-hover");
            tip.style.display = "block";
            return;
        }
        btn.classList.remove("tenzaa-hover");
        tip.style.display = "none";

        var found = null;
        var videos = document.querySelectorAll("video");
        for (var i = 0; i < videos.length; i++) {
            var v = videos[i];
            var rect = v.getBoundingClientRect();
            if (mouseX >= rect.left && mouseX <= rect.right &&
                mouseY >= rect.top && mouseY <= rect.bottom &&
                rect.width > 50 && rect.height > 50) {
                var st = window.getComputedStyle(v);
                if (st.display !== "none" && st.visibility !== "hidden") {
                    found = v;
                    break;
                }
            }
        }

        if (!found && platform === "youtube") {
            var wrappers = document.querySelectorAll("ytd-thumbnail, ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2, ytd-reel-item-renderer, ytd-rich-item-renderer, ytd-grid-video-renderer");
            for (var j = 0; j < wrappers.length; j++) {
                var w = wrappers[j];
                var wr = w.getBoundingClientRect();
                if (mouseX >= wr.left && mouseX <= wr.right && mouseY >= wr.top && mouseY <= wr.bottom) {
                    found = w;
                    break;
                }
            }
        }

        if (found) {
            var target = getTargetUrl(found);
            if (!target || target.indexOf("undefined") >= 0) {
                btn.style.display = "none";
                activeVideo = null;
                return;
            }
            activeVideo = found;
            btn.style.display = "flex";
            updateBtnPos();
        } else {
            btn.style.display = "none";
            activeVideo = null;
        }
    }

    window.addEventListener("mousemove", function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        checkHover();
    }, true);

    window.addEventListener("mousedown", function (e) {
        if (btn.style.display === "flex") {
            var rect = btn.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                e.preventDefault();
                e.stopPropagation();
                triggerParse();
            }
        }
    }, true);

    window.addEventListener("scroll", function () {
        if (activeVideo && btn.style.display === "flex") updateBtnPos();
    }, { passive: true, capture: true });

    setInterval(function () {
        if (mouseX >= 0 && mouseY >= 0) checkHover();
    }, 300);

    function triggerParse() {
        if (!activeVideo) return;
        var targetUrl = getTargetUrl(activeVideo);
        if (!targetUrl || targetUrl.indexOf("undefined") >= 0) return;

        btn.textContent = "…";
        btn.style.transform = "scale(0.95)";
        tip.style.display = "none";

        startParseFlow(targetUrl);

        setTimeout(function () {
            btn.textContent = "";
            btn.appendChild(svgIcon);
            btn.style.transform = "scale(1)";
        }, 800);
    }
})();

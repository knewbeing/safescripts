// ==UserScript==
// @name         All-in-One Video Downloader (YouTube, Twitter, TikTok, Instagram, Facebook) - Tenzaa
// @namespace    https://tenzaa.com/
// @version      1.0.1
// @description  [2026 Latest] Multi-platform Video Downloader for YouTube, Twitter, TikTok, Instagram, Facebook. Hover to download 4K, MP3, MP4 without watermark.
// @author       classccai
// @icon         https://tenzaa.com/favicon.ico
// @match        *://*.youtube.com/*
// @match        *://x.com/*
// @match        *://twitter.com/*
// @match        *://*.tiktok.com/*
// @match        *://*.instagram.com/*
// @match        *://*.facebook.com/*
// @grant        none
// @run-at       document-end
// @license      MIT

// @name:af      Alles-in-een Video Aflaaier 2026 - Laai YouTube, Twitter, TikTok, Instagram, Facebook af
// @description:af Laai video's en musiek af van YouTube, Twitter, TikTok, Instagram, Facebook. Ondersteun 4K, MP3, MP4. Geen watermerk nie.
// @name:am      ሁሉንም በአንድ ቪዲዮ አውራጅ 2026 - YouTube, Twitter, TikTok, Instagram, Facebook ያውርዱ
// @description:am ቪዲዮዎችን ከ YouTube, Twitter, TikTok, Instagram, Facebook ያውርዱ። 4K, MP3, MP4 ይደግፋል። ያለ የውሃ ምልክት።
// @name:ar      محمل الفيديو الكل في واحد 2026 - تنزيل من YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ar قم بتنزيل مقاطع الفيديو من YouTube و Twitter و TikTok و Instagram و Facebook. يدعم 4K وMP3 وMP4 بدون علامة مائية.
// @name:as      অল-ইন-ৱান ভিডিঅ' ডাউনলোডাৰ ২০২৬ - YouTube, Twitter, TikTok, Instagram, Facebook ডাউনলোড কৰক
// @description:as YouTube, Twitter, TikTok, Instagram, Facebook পৰা ভিডিঅ' ডাউনলোড কৰক। 4K, MP3, MP4 সমৰ্থন কৰে। ৱাটাৰমাৰ্ক অবিহনে।
// @name:az      Hər Şey Bir Arada Video Yükləyici 2026 - YouTube, Twitter, TikTok, Instagram, Facebook Endir
// @description:az YouTube, Twitter, TikTok, Instagram, Facebook-dan videoları endirin. 4K, MP3, MP4 dəstəkləyir. Su nişanı yoxdur.
// @name:be      Універсальны загрузнік відэа 2026 - Спампаваць з YouTube, Twitter, TikTok, Instagram, Facebook
// @description:be Спампоўвайце відэа з YouTube, Twitter, TikTok, Instagram, Facebook. Падтрымка 4K, MP3, MP4. Без вадзянога знака.
// @name:bg      Всичко-в-едно изтегляне на видео 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:bg Изтеглете видеоклипове от YouTube, Twitter, TikTok, Instagram, Facebook. Поддържа 4K, MP3, MP4. Без воден знак.
// @name:bn      অল-ইন-ওয়ান ভিডিও ডাউনলোডার ২০২৬ - YouTube, Twitter, TikTok, Instagram, Facebook ডাউনলোড করুন
// @description:bn YouTube, Twitter, TikTok, Instagram, Facebook থেকে ভিডিও ডাউনলোড করুন। 4K, MP3, MP4 সমর্থন করে। ওয়াটারমার্ক ছাড়া।
// @name:bs      Sve-u-jednom Video Preuzimač 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:bs Preuzmite videozapise sa YouTube, Twitter, TikTok, Instagram, Facebook. Podržava 4K, MP3, MP4. Bez vodenog žiga.
// @name:ca      Descarregador de vídeos Tot en Un 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ca Baixeu vídeos de YouTube, Twitter, TikTok, Instagram, Facebook. Admet 4K, MP3, MP4. Sense marca d'aigua.
// @name:cs      All-in-One Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:cs Stáhněte si videa z YouTube, Twitter, TikTok, Instagram, Facebook. Podpora 4K, MP3, MP4. Bez vodoznaku.
// @name:da      Alt-i-en Video Downloader 2026 - Download YouTube, Twitter, TikTok, Instagram, Facebook
// @description:da Download videoer fra YouTube, Twitter, TikTok, Instagram, Facebook. Understøtter 4K, MP3, MP4. Intet vandmærke.
// @name:de      All-in-One Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook herunterladen
// @description:de Laden Sie Videos von YouTube, Twitter, TikTok, Instagram, Facebook herunter. Unterstützt 4K, MP3, MP4. Ohne Wasserzeichen.
// @name:dz      ཆ་ཚང་བརྙན་འཁོར་ཕབ་ལེན། ༢༠༢༦ - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:dz YouTube, Twitter, TikTok, Instagram, Facebook ལས་བརྙན་འཁོར་ཕབ་ལེན་འབད། 4K, MP3, MP4 རྒྱབ་སྐྱོར་འབདཝ་ཨིན། ཆུ་རྟགས་མེདཔ།
// @name:el      Λήψη βίντεο Όλα σε Ένα 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:el Λήψη βίντεο από YouTube, Twitter, TikTok, Instagram, Facebook. Υποστηρίζει 4K, MP3, MP4. Χωρίς υδατογράφημα.
// @name:en      All-in-One Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:en Download videos from YouTube, Twitter, TikTok, Instagram, Facebook. Supports 4K, MP3, MP4. No watermark.
// @name:en-GB   All-in-One Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:en-GB Download videos from YouTube, Twitter, TikTok, Instagram, Facebook. Supports 4K, MP3, MP4. No watermark.
// @name:en-US   All-in-One Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:en-US Download videos from YouTube, Twitter, TikTok, Instagram, Facebook. Supports 4K, MP3, MP4. No watermark.
// @name:eo      Ĉio-en-unu Video Elŝutilo 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:eo Elŝutu videojn de YouTube, Twitter, TikTok, Instagram, Facebook. Subtenas 4K, MP3, MP4. Sen akvomarko.
// @name:es      Descargador de vídeos Todo en Uno 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:es Descarga vídeos de YouTube, Twitter, TikTok, Instagram, Facebook. Soporta 4K, MP3, MP4. Sin marca de agua.
// @name:es-419  Descargador de vídeos Todo en Uno 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:es-419 Descarga vídeos de YouTube, Twitter, TikTok, Instagram, Facebook. Soporta 4K, MP3, MP4. Sin marca de agua.
// @name:es-US   Descargador de vídeos Todo en Uno 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:es-US Descarga vídeos de YouTube, Twitter, TikTok, Instagram, Facebook. Soporta 4K, MP3, MP4. Sin marca de agua.
// @name:et      Kõik-ühes video allalaadija 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:et Laadige alla videoid YouTube'ist, Twitterist, TikTokist, Instagramist, Facebookist. Toetab 4K, MP3, MP4. Ilma vesimärgita.
// @name:eu      Dena-batean Bideo Deskargatzailea 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:eu Deskargatu bideoak YouTube, Twitter, TikTok, Instagram, Facebook-etik. 4K, MP3, MP4 onartzen ditu. Ur-markarik gabe.
// @name:fa      دانلودر ویدیوی همه‌کاره ۲۰۲۶ - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:fa ویدیوها را از YouTube، Twitter، TikTok، Instagram، Facebook دانلود کنید. پشتیبانی از 4K، MP3، MP4. بدون واترمارک.
// @name:fi      Kaikki yhdessä -videolataaja 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:fi Lataa videoita YouTubesta, Twitteristä, TikTokista, Instagramista, Facebookista. Tukee 4K, MP3, MP4. Ilman vesileimaa.
// @name:fil     All-in-One Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:fil I-download ang mga video mula sa YouTube, Twitter, TikTok, Instagram, Facebook. Sinusuportahan ang 4K, MP3, MP4. Walang watermark.
// @name:fr      Téléchargeur de vidéos Tout-en-un 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:fr Téléchargez des vidéos de YouTube, Twitter, TikTok, Instagram, Facebook. Prend en charge le 4K, MP3, MP4. Sans filigrane.
// @name:fr-CA   Téléchargeur de vidéos Tout-en-un 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:fr-CA Téléchargez des vidéos de YouTube, Twitter, TikTok, Instagram, Facebook. Prend en charge le 4K, MP3, MP4. Sans filigrane.
// @name:ga      Íoslódálaí Físeáin Uile-i-Aon 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ga Íoslódáil físeáin ó YouTube, Twitter, TikTok, Instagram, Facebook. Tacaíonn sé le 4K, MP3, MP4. Gan comhartha uisce.
// @name:gl      Descargador de vídeos Todo en Un 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:gl Descarga vídeos de YouTube, Twitter, TikTok, Instagram, Facebook. Soporta 4K, MP3, MP4. Sen marca de auga.
// @name:gn      Ta'anga Mýi Mboguejyha 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:gn Emboguejy ta'anga mýi YouTube, Twitter, TikTok, Instagram, Facebook-gui. 4K, MP3, MP4-pe guarã. Marandu'ỹre.
// @name:gu      ઑલ-ઇન-વન વિડિઓ ડાઉનલોડર ૨૦૨૬ - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:gu YouTube, Twitter, TikTok, Instagram, Facebook પરથી વિડિઓઝ ડાઉનલોડ કરો. 4K, MP3, MP4 સપોર્ટ કરે છે. વોટરમાર્ક વગર.
// @name:ha      All-in-One Bidiyo Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ha Zazzage bidiyon YouTube, Twitter, TikTok, Instagram, Facebook. Yana goyan bayan 4K, MP3, MP4. Ba tare da alamar ruwa ba.
// @name:hi      ऑल-इन-वन वीडियो डाउनलोडर 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:hi YouTube, Twitter, TikTok, Instagram, Facebook से वीडियो डाउनलोड करें। 4K, MP3, MP4 का समर्थन करता है। बिना वॉटरमार्क के।
// @name:hr      Sve-u-jednom Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:hr Preuzmite videozapise s YouTubea, Twittera, TikToka, Instagrama, Facebooka. Podržava 4K, MP3, MP4. Bez vodenog žiga.
// @name:hu      Minden-az-egyben Videó Letöltő 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:hu Töltsön le videókat a YouTube, Twitter, TikTok, Instagram, Facebook oldalakról. Támogatja a 4K, MP3, MP4 formátumokat. Vízjel nélkül.
// @name:hy      Համապարփակ Վիդեո Ներբեռնիչ 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:hy Ներբեռնեք տեսանյութեր YouTube-ից, Twitter-ից, TikTok-ից, Instagram-ից, Facebook-ից: Աջակցում է 4K, MP3, MP4: Առանց ջրային նշանի:
// @name:id      Pengunduh Video All-in-One 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:id Unduh video dari YouTube, Twitter, TikTok, Instagram, Facebook. Mendukung 4K, MP3, MP4. Tanpa tanda air.
// @name:ig      Ihe Nbudata Vidiyo Niile 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ig Budata vidiyo na YouTube, Twitter, TikTok, Instagram, Facebook. Na-akwado 4K, MP3, MP4. Enweghị akara mmiri.
// @name:is      Allt-í-einu Myndbanda Niðurhalari 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:is Sæktu myndbönd frá YouTube, Twitter, TikTok, Instagram, Facebook. Styður 4K, MP3, MP4. Án vatnsmerkis.
// @name:it      Scarica Video Tutto-in-Uno 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:it Scarica video da YouTube, Twitter, TikTok, Instagram, Facebook. Supporta 4K, MP3, MP4. Senza filigrana.
// @name:iw      מוריד וידאו הכל באחד 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:iw הורד סרטונים מ-YouTube, Twitter, TikTok, Instagram, Facebook. תומך ב-4K, MP3, MP4. ללא סימן מים.
// @name:ja      オールインワン動画ダウンローダー 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ja YouTube、Twitter、TikTok、Instagram、Facebookから動画をダウンロード。4K、MP3、MP4対応。ウォーターマークなし。
// @name:jv      Pengunduh Video All-in-One 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:jv Unduh video saka YouTube, Twitter, TikTok, Instagram, Facebook. Ndhukung 4K, MP3, MP4. Tanpa watermark.
// @name:ka      All-in-One ვიდეო ჩამომტვირთავი 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ka ჩამოტვირთეთ ვიდეოები YouTube, Twitter, TikTok, Instagram, Facebook-დან. მხარს უჭერს 4K, MP3, MP4. წყლის ნიშნის გარეშე.
// @name:kk      Универсалды Видео Жүктеуші 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:kk YouTube, Twitter, TikTok, Instagram, Facebook-тен бейнелерді жүктеңіз. 4K, MP3, MP4 қолдайды. Су таңбасыз.
// @name:km      កម្មវិធីទាញយកវីដេអូទាំងអស់ក្នុងតែមួយ ២០២៦ - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:km ទាញយកវីដេអូពី YouTube, Twitter, TikTok, Instagram, Facebook។ គាំទ្រ 4K, MP3, MP4។ គ្មានការសម្គាល់ទឹក។
// @name:kn      ಆಲ್-ಇನ್-ಒನ್ ವೀಡಿಯೊ ಡೌನ್‌ಲೋಡರ್ 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:kn YouTube, Twitter, TikTok, Instagram, Facebook ನಿಂದ ವೀಡಿಯೊಗಳನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ. 4K, MP3, MP4 ಬೆಂಬಲಿಸುತ್ತದೆ. ವಾಟರ್‌ಮಾರ್ಕ್ ಇಲ್ಲದೆ.
// @name:ko      올인원 비디오 다운로더 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ko YouTube, Twitter, TikTok, Instagram, Facebook에서 영상을 다운로드하세요. 4K, MP3, MP4 지원. 워터마크 없음.
// @name:ky      Бардыгы бир жерде Видео Жүктөөчү 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ky YouTube, Twitter, TikTok, Instagram, Facebook'тан видеолорду жүктөп алыңыз. 4K, MP3, MP4 колдойт. Суу белгиси жок.
// @name:lo      ດາວໂຫລດວິດີໂອທັງໝົດໃນໜຶ່ງດຽວ 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:lo ດາວໂຫລດວິດີໂອຈາກ YouTube, Twitter, TikTok, Instagram, Facebook. ຮອງຮັບ 4K, MP3, MP4. ບໍ່ມີລາຍນ້ຳ.
// @name:lt      Viskas viename vaizdo įrašų atsisiuntėjas 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:lt Atsisiųskite vaizdo įrašus iš YouTube, Twitter, TikTok, Instagram, Facebook. Palaiko 4K, MP3, MP4. Be vandens ženklo.
// @name:lv      Viss vienā Video Lejupielādētājs 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:lv Lejupielādējiet videoklipus no YouTube, Twitter, TikTok, Instagram, Facebook. Atbalsta 4K, MP3, MP4. Bez ūdenszīmes.
// @name:mg      Mpisintona Video Feno 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:mg Sintomy ny video avy amin'ny YouTube, Twitter, TikTok, Instagram, Facebook. Manohana 4K, MP3, MP4. Tsy misy marika.
// @name:mk      Сè-во-едно Преземач на видео 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:mk Преземете видеа од YouTube, Twitter, TikTok, Instagram, Facebook. Поддржува 4K, MP3, MP4. Без воден знак.
// @name:ml      ഓൾ-ഇൻ-വൺ വീഡിയോ ഡൗൺലോഡർ 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ml YouTube, Twitter, TikTok, Instagram, Facebook എന്നിവയിൽ നിന്ന് വീഡിയോകൾ ഡൗൺലോഡ് ചെയ്യുക. 4K, MP3, MP4 പിന്തുണയ്ക്കുന്നു. വാട്ടർമാർക്ക് ഇല്ലാതെ.
// @name:mn      Бүх видеог нэг дор татагч 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:mn YouTube, Twitter, TikTok, Instagram, Facebook-аас видео татах. 4K, MP3, MP4 дэмждэг. Усан тэмдэггүй.
// @name:mr      ऑल-इन-वन व्हिडिओ डाउनलोडर २०२६ - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:mr YouTube, Twitter, TikTok, Instagram, Facebook वरून व्हिडिओ डाउनलोड करा. 4K, MP3, MP4 चे समर्थन करते. वॉटरमार्कशिवाय.
// @name:ms      Pemuat Turun Video Semua-dalam-Satu 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ms Muat turun video dari YouTube, Twitter, TikTok, Instagram, Facebook. Menyokong 4K, MP3, MP4. Tiada tera air.
// @name:mt      Tniżżil tal-Vidjo Kollox f'Wieħed 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:mt Niżżel vidjows minn YouTube, Twitter, TikTok, Instagram, Facebook. Jappoġġja 4K, MP3, MP4. Mingħajr watermark.
// @name:my      All-in-One ဗီဒီယို ဒေါင်းလုဒ် ၂၀၂၆ - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:my YouTube, Twitter, TikTok, Instagram, Facebook တို့မှ ဗီဒီယိုများကို ဒေါင်းလုဒ်လုပ်ပါ။ 4K, MP3, MP4 တို့ကို ပံ့ပိုးပေးသည်။ ဝါးတားမတ်မပါပါ။
// @name:ne      अल-इन-वन भिडियो डाउनलोडर २०২৬ - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ne YouTube, Twitter, TikTok, Instagram, Facebook बाट भिडियोहरू डाउनलोड गर्नुहोस्। 4K, MP3, MP4 समर्थन गर्दछ। वाटरमार्क बिना।
// @name:nl      Alles-in-één Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:nl Download video's van YouTube, Twitter, TikTok, Instagram, Facebook. Ondersteunt 4K, MP3, MP4. Zonder watermerk.
// @name:no      Alt-i-ett Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:no Last ned videoer fra YouTube, Twitter, TikTok, Instagram, Facebook. Støtter 4K, MP3, MP4. Uten vannmerke.
// @name:om      Buufataa Viidiyoo Hunda 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:om Viidiyoo YouTube, Twitter, TikTok, Instagram, Facebook irraa buufadhu. 4K, MP3, MP4 deeggara. Bishaan malee.
// @name:or      ଅଲ୍-ଇନ୍-ୱାନ୍ ଭିଡିଓ ଡାଉନଲୋଡର୍ ୨୦guest - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:or YouTube, Twitter, TikTok, Instagram, Facebook ରୁ ଭିଡିଓ ଡାଉନଲୋଡ୍ କରନ୍ତୁ | 4K, MP3, MP4 ସମର୍ଥନ କରେ | ୱାଟରମାର୍କ ବିନା |
// @name:pa      ਆਲ-ਇਨ-ਵਨ ਵੀਡੀਓ ਡਾਊਨਲੋਡਰ 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:pa YouTube, Twitter, TikTok, Instagram, Facebook ਤੋਂ ਵੀਡੀਓ ਡਾਊਨਲੋਡ ਕਰੋ। 4K, MP3, MP4 ਦਾ ਸਮਰਥਨ ਕਰਦਾ ਹੈ। ਵਾਟਰਮਾਰਕ ਤੋਂ ਬਿਨਾਂ।
// @name:pl      Pobieracz Wideo Wszystko-w-Jednym 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:pl Pobieraj filmy z YouTube, Twitter, TikTok, Instagram, Facebook. Obsługuje 4K, MP3, MP4. Bez znaku wodnego.
// @name:ps      د ټولو په یو کې ویډیو ډاونلوډر ۲۰۲۶ - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ps د YouTube، Twitter، TikTok، Instagram، Facebook څخه ویډیوګانې ډاونلوډ کړئ. د 4K، MP3، MP4 ملاتړ کوي. پرته له واټرمارک څخه.
// @name:pt      Baixador de Vídeos Tudo-em-Um 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:pt Baixe vídeos do YouTube, Twitter, TikTok, Instagram, Facebook. Suporta 4K, MP3, MP4. Sem marca d'água.
// @name:pt-BR   Baixador de Vídeos Tudo-em-Um 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:pt-BR Baixe vídeos do YouTube, Twitter, TikTok, Instagram, Facebook. Suporta 4K, MP3, MP4. Sem marca d'água.
// @name:pt-PT   Transferidor de Vídeos Tudo-em-Um 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:pt-PT Transfira vídeos do YouTube, Twitter, TikTok, Instagram, Facebook. Suporta 4K, MP3, MP4. Sem marca d'água.
// @name:ro      Descărcător Video Tot-în-Unul 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ro Descărcați videoclipuri de pe YouTube, Twitter, TikTok, Instagram, Facebook. Suportă 4K, MP3, MP4. Fără filigran.
// @name:ru      Универсальный загрузчик видео 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ru Скачивайте видео с YouTube, Twitter, TikTok, Instagram, Facebook. Поддержка 4K, MP3, MP4. Без водяного знака.
// @name:rw      All-in-One Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:rw Kuramo vidiyo kuri YouTube, Twitter, TikTok, Instagram, Facebook. Ishyigikira 4K, MP3, MP4. Nta kimenyetso cy'amazi.
// @name:si      සියල්ල-එකම වීඩියෝ බාගන්නා 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:si YouTube, Twitter, TikTok, Instagram, Facebook වෙතින් වීඩියෝ බාගන්න. 4K, MP3, MP4 සහාය දක්වයි. වෝටර්මාර්ක් රහිතව.
// @name:sk      Všetko-v-jednom Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:sk Sťahujte videá z YouTube, Twitter, TikTok, Instagram, Facebook. Podporuje 4K, MP3, MP4. Bez vodoznaku.
// @name:sl      Prenosnik Videa Vse-v-enem 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:sl Prenesite videoposnetke iz YouTube, Twitter, TikTok, Instagram, Facebook. Podpira 4K, MP3, MP4. Brez vodnega znaka.
// @name:sn      Yese-mu-Imwe Vhidhiyo Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:sn Dhawunirodha mavhidhiyo kubva kuYouTube, Twitter, TikTok, Instagram, Facebook. Inotsigira 4K, MP3, MP4. Pasina watermark.
// @name:so      Soo Degsade Video Dhammaan-Mid ah 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:so Soo degso fiidiyowyada YouTube, Twitter, TikTok, Instagram, Facebook. Waxay taageertaa 4K, MP3, MP4. Ma jiro calaamad biyo.
// @name:sq      Shkarkues Video Gjithçka-në-Një 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:sq Shkarkoni video nga YouTube, Twitter, TikTok, Instagram, Facebook. Mbështet 4K, MP3, MP4. Pa watermark.
// @name:sr      Sve-u-jednom Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:sr Preuzmite video zapise sa YouTube-a, Twitter-a, TikTok-a, Instagram-a, Facebook-a. Podržava 4K, MP3, MP4. Bez vodenog žiga.
// @name:sr-Latn Sve-u-jednom Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:sr-Latn Preuzmite video zapise sa YouTube-a, Twitter-a, TikTok-a, Instagram-a, Facebook-a. Podržava 4K, MP3, MP4. Bez vodenog žiga.
// @name:st      Khoasolla Livideo Tsohle ho e 'Ngoe 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:st Khoasolla livideo ho tsoa ho YouTube, Twitter, TikTok, Instagram, Facebook. E tšehetsa 4K, MP3, MP4. Ntle le watermark.
// @name:sv      Allt-i-ett Video Downloader 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:sv Ladda ner videor från YouTube, Twitter, TikTok, Instagram, Facebook. Stöder 4K, MP3, MP4. Utan vattenstämpel.
// @name:sw      Kipakuzi cha Video Zote-kwa-Moja 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:sw Pakua video kutoka YouTube, Twitter, TikTok, Instagram, Facebook. Inasaidia 4K, MP3, MP4. Bila watermark.
// @name:ta      ஆல்-இன்-ஒன் வீடியோ டவுன்லோடர் 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ta YouTube, Twitter, TikTok, Instagram, Facebook ஆகியவற்றிலிருந்து வீடியோக்களைப் பதிவிறக்கவும். 4K, MP3, MP4 ஆதரிக்கிறது. வாட்டர்மார்க் இல்லாமல்.
// @name:te      ఆల్-ఇన్-వన్ వీడియో డౌన్‌లోడర్ 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:te YouTube, Twitter, TikTok, Instagram, Facebook నుండి వీడియోలను డౌన్‌లోడ్ చేయండి. 4K, MP3, MP4 కి మద్దతు ఇస్తుంది. వాటర్‌మార్క్ లేకుండా.
// @name:tg      Зеркашӣкунандаи Видеои Ҳамагир 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:tg Видеоҳоро аз YouTube, Twitter, TikTok, Instagram, Facebook зеркашӣ кунед. 4K, MP3, MP4-ро дастгирӣ мекунад. Бе нишони обӣ.
// @name:th      ดาวน์โหลดวิดีโอแบบออลอินวัน 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:th ดาวน์โหลดวิดีโอจาก YouTube, Twitter, TikTok, Instagram, Facebook รองรับ 4K, MP3, MP4 ไม่มีลายน้ำ
// @name:ti      ኩሉ ኣብ ሓደ ቪድዮ መውረዲ 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ti ካብ YouTube, Twitter, TikTok, Instagram, Facebook ቪድዮታት ኣውርድ። 4K, MP3, MP4 ይድግፍ። ብዘይ ዋተርማርክ።
// @name:tk      Ählisi Bir ýerde Wideo Ýükleýji 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:tk YouTube, Twitter, TikTok, Instagram, Facebook-dan wideolary göçürip alyň. 4K, MP3, MP4 goldayär. Suw belligisiz.
// @name:tr      Hepsi Bir Arada Video İndirici 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:tr YouTube, Twitter, TikTok, Instagram, Facebook'tan videolar indirin. 4K, MP3, MP4 destekler. Filigransız.
// @name:ug      ھەممىباب سىن چۈشۈرگۈچ 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ug YouTube, Twitter, TikTok, Instagram, Facebook تىن سىن چۈشۈرۈڭ. 4K, MP3, MP4 نى قوللايدۇ. سۇ بەلگىسى يوق.
// @name:uk      Універсальний завантажувач відео 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:uk Завантажуйте відео з YouTube, Twitter, TikTok, Instagram, Facebook. Підтримка 4K, MP3, MP4. Без водяного знака.
// @name:ur      آل ان ون ویڈیو ڈاؤنلوڈر 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:ur YouTube، Twitter، TikTok، Instagram، Facebook سے ویڈیوز ڈاؤن لوڈ کریں۔ 4K، MP3، MP4 سپورٹ کرتا ہے۔ بغیر واٹر مارک کے۔
// @name:uz      Hammasi bitta Video Yuklab Oluvchi 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:uz YouTube, Twitter, TikTok, Instagram, Facebook-dan videolarni yuklab oling. 4K, MP3, MP4-ni qo'llab-quvvatlaydi. Suv belgisiz.
// @name:vi      Trình tải xuống video Tất cả trong Một 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:vi Tải xuống video từ YouTube, Twitter, TikTok, Instagram, Facebook. Hỗ trợ 4K, MP3, MP4. Không có hình mờ.
// @name:yo      Ohun Nkan Gbigbasilẹ Fidio Gbogbo-ni-Ẹkan 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:yo Gba awọn fidio lati YouTube, Twitter, TikTok, Instagram, Facebook. Atilẹyin 4K, MP3, MP4. Ko si ami omi.
// @name:zh-CN   全能视频下载器 2026最新 - 支持 YouTube, Twitter, TikTok, Instagram, Facebook
// @description:zh-CN 一键下载 YouTube, Twitter, TikTok, Instagram, Facebook 视频。支持 4K, MP3, MP4, 无水印。
// @name:zh-HK   全能影片下載器 2026最新 - 支援 YouTube, Twitter, TikTok, Instagram, Facebook
// @description:zh-HK 一鍵下載 YouTube, Twitter, TikTok, Instagram, Facebook 影片。支援 4K, MP3, MP4, 無浮水印。
// @name:zh-TW   全能影片下載器 2026最新 - 支援 YouTube, Twitter, TikTok, Instagram, Facebook
// @description:zh-TW 一鍵下載 YouTube, Twitter, TikTok, Instagram, Facebook 影片。支援 4K, MP3, MP4, 無浮水印。
// @name:zu      Konke-ku-Kunye Isilandi se-Video 2026 - YouTube, Twitter, TikTok, Instagram, Facebook
// @description:zu Landa amavidiyo kusuka ku-YouTube, Twitter, TikTok, Instagram, Facebook. Sekela i-4K, MP3, MP4. Akukho watermark.
// @downloadURL https://update.greasyfork.org/scripts/574417/All-in-One%20Video%20Downloader%20%28YouTube%2C%20Twitter%2C%20TikTok%2C%20Instagram%2C%20Facebook%29%20-%20Tenzaa.user.js
// @updateURL https://update.greasyfork.org/scripts/574417/All-in-One%20Video%20Downloader%20%28YouTube%2C%20Twitter%2C%20TikTok%2C%20Instagram%2C%20Facebook%29%20-%20Tenzaa.meta.js
// ==/UserScript==

(function() {
    'use strict';

    const supportedLangs = {
        "af": "af", "am": "am", "ar": "ar", "as": "as", "az": "az",
        "be": "be", "bg": "bg", "bn": "bn", "bs": "bs", "ca": "ca",
        "cs": "cs", "da": "da", "de": "de", "dz": "dz", "el": "el",
        "en": "en", "en-GB": "en-GB", "en-US": "en-US", "eo": "eo", "es": "es",
        "es-419": "es-419", "es-US": "es-US", "et": "et", "eu": "eu", "fa": "fa",
        "fi": "fi", "fil": "fil", "fr": "fr", "fr-CA": "fr-CA", "ga": "ga",
        "gl": "gl", "gn": "gn", "gu": "gu", "ha": "ha", "hi": "hi",
        "hr": "hr", "hu": "hu", "hy": "hy", "id": "id", "ig": "ig",
        "is": "is", "it": "it", "iw": "iw", "ja": "ja", "jv": "jv",
        "ka": "ka", "kk": "kk", "km": "km", "kn": "kn", "ko": "ko",
        "ky": "ky", "lo": "lo", "lt": "lt", "lv": "lv", "mg": "mg",
        "mk": "mk", "ml": "ml", "mn": "mn", "mr": "mr", "ms": "ms",
        "mt": "mt", "my": "my", "ne": "ne", "nl": "nl", "no": "no",
        "om": "om", "or": "or", "pa": "pa", "pl": "pl", "ps": "ps",
        "pt": "pt", "pt-BR": "pt-BR", "pt-PT": "pt-PT", "ro": "ro", "ru": "ru",
        "rw": "rw", "si": "si", "sk": "sk", "sl": "sl", "sn": "sn",
        "so": "so", "sq": "sq", "sr": "sr", "sr-Latn": "sr-Latn", "st": "st",
        "sv": "sv", "sw": "sw", "ta": "ta", "te": "te", "tg": "tg",
        "th": "th", "ti": "ti", "tk": "tk", "tr": "tr", "ug": "ug",
        "uk": "uk", "ur": "ur", "uz": "uz", "vi": "vi", "yo": "yo",
        "zh": "zh-CN", "zh-CN": "zh-CN", "zh-HK": "zh-HK", "zh-TW": "zh-TW", "zu": "zu"
    };

    const userLang = navigator.language || 'en';
    const langCodeForUrl = supportedLangs[userLang] || supportedLangs[userLang.split('-')[0]] || 'en';
    const host = window.location.hostname;
    let platform = "youtube";

    if (host.includes('x.com') || host.includes('twitter.com')) platform = "twitter";
    if (host.includes('tiktok.com')) platform = "tiktok";
    if (host.includes('instagram.com')) platform = "instagram";
    if (host.includes('facebook.com')) platform = "facebook";

    const style = document.createElement('style');
    style.textContent = `
        #tenzaa-aio-btn {
            position: fixed;
            z-index: 2147483647 !important;
            background: rgba(20, 20, 20, 0.85);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.2);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.2s, transform 0.15s;
            pointer-events: none !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.5);
            font-size: 16px;
        }
        #tenzaa-aio-btn.tenzaa-hover {
            background: rgba(220, 38, 38, 1);
            transform: scale(1.1);
            border-color: rgba(255, 255, 255, 0.4);
        }
        #tenzaa-aio-btn svg {
            fill: currentColor;
            width: 20px;
            height: 20px;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    const btn = document.createElement('div');
    btn.id = 'tenzaa-aio-btn';
    const svgNs = "http://www.w3.org/2000/svg";
    const svgIcon = document.createElementNS(svgNs, "svg");
    svgIcon.setAttribute("viewBox", "0 0 24 24");
    const path = document.createElementNS(svgNs, "path");
    path.setAttribute("d", "M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z");
    svgIcon.appendChild(path);
    btn.appendChild(svgIcon);
    document.body.appendChild(btn);

    let activeVideo = null;
    let mouseX = -100;
    let mouseY = -100;

    function getTargetUrl(videoElement) {
        if (platform === "youtube") {
            let container = videoElement.closest('ytd-rich-item-renderer, ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2, ytd-reel-item-renderer, ytd-grid-video-renderer, ytd-compact-video-renderer, ytd-video-renderer, ytd-thumbnail');
            if (container) {
                const link = container.querySelector('a[href*="/shorts/"], a[href*="/watch?v="]');
                if (link && link.href) {
                    let url = link.href;
                    if (url.includes('/shorts/')) {
                        const sid = url.split('/shorts/')[1].split('?')[0].split('/').pop();
                        return 'https://www.youtube.com/shorts/' + sid;
                    }
                    return url;
                }
            }

            const ytPlayer = document.querySelector('#movie_player');
            if (ytPlayer && ytPlayer.getVideoData) {
                const data = ytPlayer.getVideoData();
                if (data && data.video_id) return 'https://www.youtube.com/watch?v=' + data.video_id;
            }

            if (window.location.pathname.startsWith('/shorts/')) {
                const id = window.location.pathname.split('/')[2];
                if (id) return 'https://www.youtube.com/shorts/' + id;
            }

            const params = new URLSearchParams(window.location.search);
            const v = params.get('v');
            if (v) return 'https://www.youtube.com/watch?v=' + v;

            let current = videoElement;
            while(current && current !== document.body) {
                if(current.tagName === 'A' && current.href) {
                     if(current.href.includes('/shorts/')) {
                         const sid = current.href.split('/shorts/')[1].split('?')[0].split('/').pop();
                         return 'https://www.youtube.com/shorts/' + sid;
                     }
                     if(current.href.includes('/watch?v=')) return current.href;
                }
                current = current.parentElement;
            }

            return window.location.href;
        }
        if (platform === "twitter") {
            let article = videoElement.closest('article');
            if (article) {
                let links = Array.from(article.querySelectorAll('a[href*="/status/"]'));
                if (links.length > 0) {
                    let statusLink = links.find(l => l.href.match(/\/status\/\d+$/));
                    if (statusLink) return statusLink.href;
                    return links[0].href;
                }
            }
            return window.location.href;
        }
        if (platform === "tiktok") {
            let current = videoElement.parentElement;
            let videoId = "", username = "";
            let depth = 0;
            while (current && depth < 25) {
                if (!videoId && current.id && current.id.includes('xgwrapper')) {
                    const idMatch = current.id.match(/\d{15,}/);
                    if (idMatch) videoId = idMatch[0];
                }
                if (!username) {
                    const userLink = current.querySelector('a[href*="/@"]');
                    if (userLink) {
                        const userMatch = userLink.href.match(/\/(@[^\/\?]+)/);
                        if (userMatch) username = userMatch[1];
                    }
                }
                if (videoId && username) break;
                current = current.parentElement;
                depth++;
            }
            if (videoId && username) return `https://www.tiktok.com/${username}/video/${videoId}`;
            if (videoId) return `https://www.tiktok.com/video/${videoId}`;
            return window.location.href.split('?')[0];
        }
        if (platform === "instagram") {
            let article = videoElement.closest('article');
            if (article) {
                let a = article.querySelector('a[href*="/p/"], a[href*="/reels/"], a[href*="/reel/"]');
                if (a) return window.location.origin + a.getAttribute('href').split('?')[0];
            }
            return window.location.href.split('?')[0];
        }
        if (platform === "facebook") {
            let href = window.location.href;
            let idMatch = href.match(/(?:v=|\/videos\/|\/reel\/|\/reels\/)(\d+)/);
            if (idMatch) return 'https://www.facebook.com/reel/' + idMatch[1];
            let article = videoElement.closest('[role="article"], [data-pagelet]');
            if (article) {
                let links = Array.from(article.querySelectorAll('a[href*="/videos/"], a[href*="/watch/"], a[href*="/reel/"]'));
                if (links.length > 0) {
                    let aHref = links[0].href;
                    let aMatch = aHref.match(/(?:v=|\/videos\/|\/reel\/|\/reels\/)(\d+)/);
                    if (aMatch) return 'https://www.facebook.com/reel/' + aMatch[1];
                    return aHref.split('&')[0];
                }
            }
            return href.split('&')[0];
        }
        return window.location.href;
    }

    function updateBtnPos() {
        if (!activeVideo || btn.style.display === 'none') return;
        const rect = activeVideo.getBoundingClientRect();
        const btnSize = 40;

        let top = rect.top + 15;
        let left = rect.left + (rect.width / 2) - (btnSize / 2);

        if(left < 5) left = 5;
        if(top < 5) top = 5;
        if(top > window.innerHeight - 45) top = window.innerHeight - 45;
        if(left > window.innerWidth - btnSize - 5) left = window.innerWidth - btnSize - 5;

        btn.style.top = top + 'px';
        btn.style.left = left + 'px';
    }

    function checkHover() {
        if(mouseX < 0 || mouseY < 0) return;

        const btnRect = btn.getBoundingClientRect();
        const isHoveringBtn = (btn.style.display === 'flex' &&
                               mouseX >= btnRect.left && mouseX <= btnRect.right &&
                               mouseY >= btnRect.top && mouseY <= btnRect.bottom);

        if (isHoveringBtn) {
            btn.classList.add('tenzaa-hover');
            return;
        } else {
            btn.classList.remove('tenzaa-hover');
        }

        let found = null;

        const videos = document.querySelectorAll('video');
        for (let v of videos) {
            const rect = v.getBoundingClientRect();
            if (mouseX >= rect.left && mouseX <= rect.right &&
                mouseY >= rect.top && mouseY <= rect.bottom &&
                rect.width > 50 && rect.height > 50) {
                const style = window.getComputedStyle(v);
                if(style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
                    found = v;
                    break;
                }
            }
        }

        if (!found && platform === "youtube") {
            const wrappers = document.querySelectorAll('ytd-thumbnail, ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2, ytd-reel-item-renderer, ytd-rich-item-renderer, ytd-grid-video-renderer');
            for (let w of wrappers) {
                const rect = w.getBoundingClientRect();
                if (mouseX >= rect.left && mouseX <= rect.right &&
                    mouseY >= rect.top && mouseY <= rect.bottom) {
                    found = w;
                    break;
                }
            }
        }

        if (found) {
            activeVideo = found;
            btn.style.display = 'flex';
            updateBtnPos();
        } else {
            btn.style.display = 'none';
            activeVideo = null;
        }
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        checkHover();
    }, true);

    window.addEventListener('mousedown', (e) => {
        if (btn.style.display === 'flex') {
            const rect = btn.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                e.preventDefault();
                e.stopPropagation();
                triggerDownload();
            }
        }
    }, true);

    window.addEventListener('scroll', () => {
        if(activeVideo && btn.style.display === 'flex') {
            updateBtnPos();
        }
    }, {passive: true, capture: true});

    setInterval(() => {
        if (mouseX >= 0 && mouseY >= 0) {
            checkHover();
        }
    }, 300);

    function triggerDownload() {
        if (!activeVideo) return;
        const targetUrl = getTargetUrl(activeVideo);
        if (!targetUrl || targetUrl.includes('undefined')) return;

        const langPath = langCodeForUrl === 'en' ? '' : langCodeForUrl + '/';
        const finalUrl = `https://tenzaa.com/${langPath}${platform}?url=${encodeURIComponent(targetUrl)}`;

        btn.textContent = "⏳";
        btn.style.transform = "scale(0.95)";

        window.open(finalUrl, "_blank");

        setTimeout(() => {
            btn.textContent = "";
            btn.appendChild(svgIcon);
            btn.style.transform = "scale(1)";
        }, 800);
    }
})();
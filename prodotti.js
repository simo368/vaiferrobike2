/* ═══════════════════════════════════════════════════════════
   VAI FERRO BIKE — prodotti.js
   Alimentato da Google Sheets (CSV pubblico, sola lettura)
   ═══════════════════════════════════════════════════════════

   CONFIGURAZIONE:
   1. Nel tuo Google Sheet: File → Condividi → "Chiunque con il link" → Visualizzatore
   2. Copia l'ID dal tuo URL (la parte lunga tra /d/ e /edit)
      es: https://docs.google.com/spreadsheets/d/[QUESTO_QUI]/edit
   3. Incollalo qui sotto al posto di YOUR_SHEET_ID_HERE
   4. Salva. Fine.
*/

const CONFIG = {
  SHEET_ID: '1egFO7xMvKZLGTcVI_OjDq5Fjf2DgAmgFQlYHBxshmoI',   // ← CAMBIA SOLO QUESTO
  WA_NUMBER: '393000000000',         // ← Numero WhatsApp senza + (es. 393331234567)
  WA_BASE_MSG: 'Ciao VAI FERRO BIKE, sono interessato a ',
};

/* ─── DATI DEMO (usati finché SHEET_ID non è configurato) ──── */
const DEMO_BIKES = [
  { Nome: 'Trek Marlin 5', Marca: 'Trek', Categoria: 'MTB', Descrizione_Breve: 'Hardtail versatile per sentieri e uso misto. Forcella ammortizzata, freni a disco.', Descrizione_Completa: 'La Trek Marlin 5 è la scelta ideale per chi vuole avvicinarsi al mountain bike senza compromessi. Forcella SR Suntour XCT da 100mm, freni idraulici Tektro, cambio Shimano Altus 21V. Ruote 29" per un rotolamento fluido e veloce.', Prezzo: 'da €799', Disponibile: 'SI', In_Evidenza: 'SI', Immagine: '', Caratteristiche: 'Forcella 100mm|Freni a disco idraulici|Cambio Shimano 21V|Ruote 29"', Note: '' },
  { Nome: 'Bianchi E-Omnia T', Marca: 'Bianchi', Categoria: 'E-Bike', Descrizione_Breve: 'E-bike da trekking con motore Bosch. Autonomia fino a 120km, display integrato.', Descrizione_Completa: 'La Bianchi E-Omnia T unisce il fascino del brand storico alla tecnologia moderna. Motore Bosch Active Line Plus, batteria 500Wh, display Purion. Perfetta per pendolari e appassionati di cicloturismo.', Prezzo: 'da €2.499', Disponibile: 'SI', In_Evidenza: 'SI', Immagine: '', Caratteristiche: 'Motore Bosch|Batteria 500Wh|Autonomia ~120km|Display Purion', Note: 'Disponibile in più taglie' },
  { Nome: 'Cube Nature', Marca: 'Cube', Categoria: 'Trekking', Descrizione_Breve: 'Bici da trekking polivalente, ideale per percorsi misti e lunghe uscite su strada e sterrato.', Descrizione_Completa: 'La Cube Nature è progettata per chi ama pedalare senza limiti. Telaio in alluminio leggero, forcella rigida, pneumatici 700x42c per aderenza su tutti i fondi.', Prezzo: 'da €699', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Telaio alluminio|Pneumatici 700x42c|Cambio Shimano 24V|Portapacchi incluso', Note: '' },
  { Nome: 'Cannondale Quick 4', Marca: 'Cannondale', Categoria: 'City Bike', Descrizione_Breve: 'Bici urbana veloce e leggera. Per commuter esigenti che non vogliono rinunciare alle prestazioni.', Descrizione_Completa: 'La Cannondale Quick 4 è la scelta dei professionisti urbani. Telaio SmartForm C3, manubrio flat bar, freni a disco meccanici. Agile nel traffico, veloce in rettilineo.', Prezzo: 'da €649', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Telaio SmartForm C3|Freni a disco meccanici|Ruote 700c|Peso 10.8kg', Note: '' },
  { Nome: 'Trek Checkpoint ALR 5', Marca: 'Trek', Categoria: 'Gravel', Descrizione_Breve: 'Gravel bike da avventura. Perfetta per lunghe uscite su strade bianche e percorsi misti.', Descrizione_Completa: 'La Trek Checkpoint ALR 5 è costruita per chi vuole esplorare. Telaio Alpha Platinum Aluminium, forcella IsoSpeed, compatibilità con pneumatici fino a 45mm. Portapacchi e borse laterali integrabili.', Prezzo: 'da €1.299', Disponibile: 'SI', In_Evidenza: 'SI', Immagine: '', Caratteristiche: 'Forcella IsoSpeed|Pneumatici 40mm|Cambio Shimano GRX|Attacchi borse', Note: '' },
  { Nome: 'Specialized Allez', Marca: 'Specialized', Categoria: 'Corsa', Descrizione_Breve: 'Bici da corsa entry-level con geometria aggressiva. Perfetta per iniziare a gareggiare.', Descrizione_Completa: 'La Specialized Allez è la porta di ingresso al mondo della corsa. Telaio E5 Premium Aluminum, forcella carbonio, cambio Shimano Claris 16V. Veloce, reattiva, precisa.', Prezzo: 'da €999', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Telaio E5 Aluminum|Forcella carbonio|Cambio Claris 16V|Peso 9.7kg', Note: '' },
  { Nome: 'Scott Scale 980', Marca: 'Scott', Categoria: 'MTB', Descrizione_Breve: 'MTB hardtail con geometria moderna. Ottima per trail tecnici e discese veloci.', Descrizione_Completa: 'La Scott Scale 980 porta sul sentiero una geometria moderna e aggressiva. Forcella SR Suntour XCR da 120mm, cambio Shimano Deore 12V, freni Shimano MT401 4 pistoni.', Prezzo: 'da €1.099', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Forcella 120mm|Cambio Deore 12V|Freni 4 pistoni|Geometria trail', Note: '' },
  { Nome: 'Atala E-Race', Marca: 'Atala', Categoria: 'E-Bike', Descrizione_Breve: 'E-bike da corsa con motore Shimano STEPS. Per chi vuole il piacere della road bike con l\'assistenza elettrica.', Descrizione_Completa: 'L\'Atala E-Race combina l\'estetica da corsa con la tecnologia Shimano STEPS EP8. Motore 250W, batteria integrata 504Wh, display SC-E6100. Cambio Shimano Ultegra.', Prezzo: 'da €3.299', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Motore Shimano EP8|Batteria 504Wh|Cambio Ultegra|Design road', Note: 'Su ordinazione' },
  { Nome: 'Bianchi Fretta', Marca: 'Bianchi', Categoria: 'City Bike', Descrizione_Breve: 'City bike classica con stile inconfondibile. 7 velocità, portapacchi, parafanghi. Pronta per la città.', Descrizione_Completa: 'La Bianchi Fretta è la bici urbana per eccellenza. Telaio acciaio Cro-Mo, cambio Shimano Tourney 7V, freni V-Brake, portapacchi posteriore e parafanghi inclusi. Disponibile in colore Celeste iconico.', Prezzo: 'da €599', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Telaio acciaio|Cambio 7V|Portapacchi incluso|Parafanghi inclusi', Note: 'Disponibile nel colore Celeste originale' },
  { Nome: 'KTM Macina Charm', Marca: 'KTM', Categoria: 'E-Bike', Descrizione_Breve: 'E-bike da città elegante, con motore Bosch e design premium. Per chi non rinuncia allo stile.', Descrizione_Completa: 'La KTM Macina Charm è la e-bike per chi vuole muoversi in città con classe. Motore Bosch Active Line Plus, batteria 400Wh integrata nel tubo obliquo, display Purion. Cambio Shimano Nexus 8 velocità.', Prezzo: 'da €2.199', Disponibile: 'SI', In_Evidenza: 'SI', Immagine: '', Caratteristiche: 'Motore Bosch|Batteria 400Wh|Cambio Nexus 8V|Design city', Note: '' },
  { Nome: 'Focus Raven 8.8', Marca: 'Focus', Categoria: 'MTB', Descrizione_Breve: 'Full-suspension trail bike per sentieri impegnativi. 130mm anteriore e posteriore.', Descrizione_Completa: 'La Focus Raven 8.8 è la full-suspension per chi non si accontenta. Forcella Fox Rhythm 34 da 130mm, ammortizzatore Fox Float DPS, cambio Shimano Deore 12V, freni Shimano MT520 4 pistoni.', Prezzo: 'da €2.499', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Full-suspension 130mm|Forcella Fox|Cambio Deore 12V|Freni 4 pistoni', Note: '' },
  { Nome: 'Raleigh Pioneer Low Step', Marca: 'Raleigh', Categoria: 'City Bike', Descrizione_Breve: 'Bici da città con telaio open frame, ideale per chi cerca praticità nel salire e scendere.', Descrizione_Completa: 'La Raleigh Pioneer Low Step è pensata per chi usa la bici ogni giorno. Telaio open frame, cambio Shimano Tourney 21V, freni V-Brake, sella comfort e manubrio alto ergonomico.', Prezzo: 'da €449', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Telaio open frame|Cambio 21V|Sella comfort|Parafanghi inclusi', Note: '' },
  { Nome: 'Trek FX 3 Disc', Marca: 'Trek', Categoria: 'City Bike', Descrizione_Breve: 'Bici da fitness/city ad alte prestazioni. Leggera, reattiva, freni a disco idraulici.', Descrizione_Completa: 'La Trek FX 3 Disc è la scelta di chi vuole prestazioni da fitness bike con la praticità di una city bike. Telaio Alpha Gold Aluminium, freni Shimano MT200, cambio Shimano Deore 20V.', Prezzo: 'da €999', Disponibile: 'SI', In_Evidenza: 'NO', Immagine: '', Caratteristiche: 'Freni idraulici|Cambio Deore 20V|Telaio leggero|Ruote 700c', Note: '' },
  { Nome: 'Bottecchia Arlecchino', Marca: 'Bottecchia', Categoria: 'Usato', Descrizione_Breve: 'Bici vintage anni \'80 restaurata. Cambio Campagnolo, telaio acciaio Columbus. Pezzo da collezione.', Descrizione_Completa: 'Un gioiello del ciclismo italiano degli anni \'80, restaurato con cura. Telaio acciaio Columbus SL, cambio Campagnolo Record 6V, cerchi Super Champion. Solo per veri appassionati.', Prezzo: '€380', Disponibile: 'SI', In_Evidenza: 'SI', Immagine: '', Caratteristiche: 'Telaio Columbus SL|Cambio Campagnolo|Restaurata|Pezzo da collezione', Note: 'Unico esemplare disponibile' },
];

/* ─── ICONE SVG PER CATEGORIA ─────────────────────────────── */
const CATEGORY_ICONS = {
  'MTB': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L26 22h10l14 22M26 22l9 22M36 22l-8 22"/><path d="M8 28l6-6M56 28l-6-6M20 16l16 0"/></svg>`,
  'E-Bike': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L26 22h10l14 22M26 22l9 22"/><path d="M33 10l-5 9h8l-5 9" stroke-width="2.5"/></svg>`,
  'City Bike': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L24 24h16l10 20"/><path d="M24 24l8 0M32 24l-6 20M30 20l-4 0M26 16h8"/><path d="M44 30h8M46 24v12"/></svg>`,
  'Gravel': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L26 20h12l12 24M26 20l8 24M40 20l-8 24"/><path d="M22 16h20M32 20V12"/></svg>`,
  'Trekking': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L28 22h8l14 22M28 22l6 22M36 22l-8 22"/><rect x="22" y="26" width="20" height="12" rx="2"/></svg>`,
  'Corsa': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L28 22h8l14 22M28 22l6 22M36 22l-8 22"/><path d="M26 22c0-4 4-8 8-8s8 4 8 8"/></svg>`,
  'Bambino': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="44" r="8"/><circle cx="46" cy="44" r="8"/><path d="M18 44L28 26h8l10 18M28 26l5 18M36 26l-8 18"/><circle cx="32" cy="14" r="4"/></svg>`,
  'Usato': `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="44" r="10"/><circle cx="50" cy="44" r="10"/><path d="M14 44L26 22h10l14 22M26 22l9 22"/><path d="M40 16c3 0 5 2 5 5s-2 5-5 5-5-2-5-5 2-5 5-5"/><path d="M44 26l4 4"/></svg>`,
};
const DEFAULT_ICON = CATEGORY_ICONS['MTB'];

/* ─── STATO APPLICAZIONE ──────────────────────────────────── */
let allBikes = [];
let activeCategory = 'Tutte';
let activeSort = 'evidenza';
let isFromSheet = false;

/* ─── DOM REFS ────────────────────────────────────────────── */
const gridEl = document.getElementById('prodottiGrid');
const countEl = document.getElementById('prodottiCount');
const filterContainer = document.getElementById('filterPills');
const sortSelect = document.getElementById('sortSelect');
const modal = document.getElementById('productModal');
const modalSheet = modal?.querySelector('.product-modal__sheet');

/* ─── FETCH DAL GOOGLE SHEET ──────────────────────────────── */
async function fetchFromSheet() {
  if (!CONFIG.SHEET_ID || CONFIG.SHEET_ID === 'YOUR_SHEET_ID_HERE') return null;
  const url = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/export?format=csv&gid=0`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

/* ─── PARSING CSV SEMPLICE ────────────────────────────────── */
function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = parseLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h.trim()] = (values[i] || '').trim(); });
    return obj;
  }).filter(b => b.Nome);
}

function parseLine(line) {
  const result = [];
  let cur = '';
  let inQ = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQ && line[i + 1] === '"') { cur += '"'; i++; }
      else { inQ = !inQ; }
    } else if (ch === ',' && !inQ) {
      result.push(cur); cur = '';
    } else {
      cur += ch;
    }
  }
  result.push(cur);
  return result;
}

/* ─── CARICAMENTO PRINCIPALE ──────────────────────────────── */
async function loadBikes() {
  showSkeleton();
  try {
    const csvText = await fetchFromSheet();
    if (csvText) {
      allBikes = parseCSV(csvText).filter(b => b.Disponibile?.toUpperCase() === 'SI');
      isFromSheet = true;
    } else {
      allBikes = DEMO_BIKES.filter(b => b.Disponibile === 'SI');
      showDemoBanner();
    }
  } catch (e) {
    console.warn('Impossibile caricare il foglio, uso dati demo:', e);
    allBikes = DEMO_BIKES.filter(b => b.Disponibile === 'SI');
    showDemoBanner();
  }
  buildFilters();
  render();
}

/* ─── FILTRI ──────────────────────────────────────────────── */
const CATEGORIES = ['Tutte', 'MTB', 'E-Bike', 'City Bike', 'Gravel', 'Trekking', 'Corsa', 'Bambino', 'Usato'];

function buildFilters() {
  if (!filterContainer) return;
  const counts = {};
  CATEGORIES.forEach(c => {
    counts[c] = c === 'Tutte'
      ? allBikes.length
      : allBikes.filter(b => b.Categoria === c).length;
  });

  filterContainer.innerHTML = CATEGORIES
    .filter(c => c === 'Tutte' || counts[c] > 0)
    .map(c => `
      <button class="filter-pill${c === activeCategory ? ' active' : ''}"
        data-cat="${c}" aria-pressed="${c === activeCategory}">
        ${c}
        <span class="pill-count">${counts[c]}</span>
      </button>`)
    .join('');

  filterContainer.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      filterContainer.querySelectorAll('.filter-pill').forEach(b => {
        b.classList.toggle('active', b.dataset.cat === activeCategory);
        b.setAttribute('aria-pressed', b.dataset.cat === activeCategory);
      });
      render();
    });
  });
}

/* ─── ORDINAMENTO ─────────────────────────────────────────── */
function getSorted(list) {
  const copy = [...list];
  if (activeSort === 'evidenza') {
    return copy.sort((a, b) => {
      const aFeat = a.In_Evidenza?.toUpperCase() === 'SI' ? 0 : 1;
      const bFeat = b.In_Evidenza?.toUpperCase() === 'SI' ? 0 : 1;
      return aFeat - bFeat || a.Nome.localeCompare(b.Nome, 'it');
    });
  }
  if (activeSort === 'az') return copy.sort((a, b) => a.Nome.localeCompare(b.Nome, 'it'));
  if (activeSort === 'za') return copy.sort((a, b) => b.Nome.localeCompare(a.Nome, 'it'));
  if (activeSort === 'marca') return copy.sort((a, b) => a.Marca.localeCompare(b.Marca, 'it') || a.Nome.localeCompare(b.Nome, 'it'));
  return copy;
}

/* ─── RENDER GRIGLIA ──────────────────────────────────────── */
function render() {
  if (!gridEl) return;
  const filtered = activeCategory === 'Tutte'
    ? allBikes
    : allBikes.filter(b => b.Categoria === activeCategory);
  const sorted = getSorted(filtered);

  if (countEl) {
    countEl.innerHTML = `<strong>${sorted.length}</strong> bici${activeCategory !== 'Tutte' ? ` in <em>${activeCategory}</em>` : ' in catalogo'}`;
  }

  if (sorted.length === 0) {
    gridEl.innerHTML = `
      <div class="products-empty">
        <div class="products-empty__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
        </div>
        <h3>Nessuna bici in questa categoria</h3>
        <p>Prova a selezionare un'altra categoria o scrivici: potremmo averla in arrivo.</p>
        <a class="btn btn-primary" href="https://wa.me/${CONFIG.WA_NUMBER}?text=Ciao%20VAI%20FERRO%20BIKE%2C%20cerco%20una%20bici%20in%20una%20categoria%20specifica." target="_blank" rel="noopener">Chiedi su WhatsApp</a>
      </div>`;
    return;
  }

  gridEl.innerHTML = sorted.map((bike, i) => renderCard(bike, i)).join('');
  gridEl.querySelectorAll('.product-card').forEach((card, i) => {
    card.addEventListener('click', () => openModal(sorted[i]));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openModal(sorted[i]); });
    // Prevent WhatsApp link from opening modal
    card.querySelector('.product-card__cta')?.addEventListener('click', e => e.stopPropagation());
  });
}

function renderCard(bike) {
  const icon = CATEGORY_ICONS[bike.Categoria] || DEFAULT_ICON;
  // Supporto multi-immagine: usa solo la prima come thumbnail della card
  const imgs = bike.Immagine ? bike.Immagine.split(/[|,]/).map(u => u.trim()).filter(u => u.startsWith('http')) : [];
  const firstImg = imgs[0] || '';
  const hasImg = !!firstImg;
  const isFeatured = bike.In_Evidenza?.toUpperCase() === 'SI';
  const waText = encodeURIComponent(`${CONFIG.WA_BASE_MSG}${bike.Nome} (${bike.Categoria}). Potete darmi informazioni?`);
  const photoCount = imgs.length;

  return `
    <article class="product-card" tabindex="0" aria-label="${bike.Nome}">
      <div class="product-card__visual">
        ${hasImg
      ? `<img src="${firstImg}" alt="${bike.Nome}" loading="lazy">`
      : `<div class="product-card__visual-fallback">${icon}</div>`}
        ${photoCount > 1 ? `<span class="product-card__photo-count"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> ${photoCount}</span>` : ''}
        <span class="product-card__badge">${bike.Categoria}</span>
        ${isFeatured ? `<span class="product-card__featured" aria-label="In evidenza">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </span>` : ''}
      </div>
      <div class="product-card__body">
        ${bike.Marca ? `<p class="product-card__brand">${bike.Marca}</p>` : ''}
        <h3 class="product-card__name">${bike.Nome}</h3>
        <p class="product-card__desc">${bike.Descrizione_Breve || ''}</p>
        <div class="product-card__footer">
          <span class="product-card__price">${bike.Prezzo || 'Su richiesta'}</span>
          <a class="product-card__cta"
            href="https://wa.me/${CONFIG.WA_NUMBER}?text=${waText}"
            target="_blank" rel="noopener noreferrer"
            aria-label="Chiedi info su ${bike.Nome} via WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.037.507 3.956 1.395 5.64L.057 23.943l6.303-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.662-.524-5.172-1.434l-.37-.22-3.74.982.999-3.648-.241-.374A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            Chiedi info
          </a>
        </div>
      </div>
    </article>`;
}

/* ─── SKELETON LOADER ─────────────────────────────────────── */
function showSkeleton() {
  if (!gridEl) return;
  gridEl.className = 'skeleton-grid';
  gridEl.innerHTML = Array(6).fill(`
    <div class="skeleton-card">
      <div class="skeleton-card__visual"></div>
      <div class="skeleton-card__body">
        <div class="skeleton-line short"></div>
        <div class="skeleton-line title"></div>
        <div class="skeleton-line long"></div>
        <div class="skeleton-line medium"></div>
      </div>
    </div>`).join('');
  setTimeout(() => { if (gridEl) gridEl.className = 'product-grid'; }, 100);
}

/* ─── BANNER DEMO ─────────────────────────────────────────── */
function showDemoBanner() {
  const banner = document.getElementById('demoBanner');
  if (banner) banner.hidden = false;
}

/* ─── CAROUSEL BUILDER ────────────────────────────────────── */
function buildCarousel(images, bikeName, icon) {
  if (images.length === 0) {
    return `<div class="product-modal__visual-fallback">${icon}</div>`;
  }
  const slides = images.map(url =>
    `<div class="carousel__slide"><img src="${url}" alt="${bikeName}" loading="lazy"></div>`
  ).join('');
  const dots = images.map((_, i) =>
    `<button class="carousel__dot${i === 0 ? ' active' : ''}" aria-label="Foto ${i + 1}"></button>`
  ).join('');
  return `
    <div class="carousel" data-count="${images.length}">
      <div class="carousel__track">${slides}</div>
      <button class="carousel__btn carousel__btn--prev" aria-label="Foto precedente">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="carousel__btn carousel__btn--next" aria-label="Foto successiva">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
      <div class="carousel__dots">${dots}</div>
    </div>`;
}

function initCarousel(el) {
  const count = parseInt(el.dataset.count) || 1;
  if (count <= 1) return;
  const track = el.querySelector('.carousel__track');
  const dots = el.querySelectorAll('.carousel__dot');
  const prevBtn = el.querySelector('.carousel__btn--prev');
  const nextBtn = el.querySelector('.carousel__btn--next');
  let cur = 0;

  function goTo(index) {
    cur = ((index % count) + count) % count;
    track.style.transform = `translateX(-${cur * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  prevBtn?.addEventListener('click', () => goTo(cur - 1));
  nextBtn?.addEventListener('click', () => goTo(cur + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Swipe touch mobile
  let tx = 0, ty = 0;
  el.addEventListener('touchstart', e => {
    tx = e.touches[0].clientX;
    ty = e.touches[0].clientY;
  }, { passive: true });
  el.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 44) {
      goTo(dx < 0 ? cur + 1 : cur - 1);
    }
  }, { passive: true });

  // Frecce tastiera quando il modal è aperto
  el._keyHandler = (e) => {
    if (e.key === 'ArrowLeft') goTo(cur - 1);
    if (e.key === 'ArrowRight') goTo(cur + 1);
  };
  document.addEventListener('keydown', el._keyHandler);
}

/* ─── MODAL DETTAGLIO ─────────────────────────────────────── */
function openModal(bike) {
  if (!modal) return;
  const icon = CATEGORY_ICONS[bike.Categoria] || DEFAULT_ICON;
  const images = bike.Immagine
    ? bike.Immagine.split(/[|,]/).map(u => u.trim()).filter(u => u.startsWith('http'))
    : [];
  const waText = encodeURIComponent(`${CONFIG.WA_BASE_MSG}${bike.Nome} (${bike.Categoria}). Vorrei sapere disponibilità e prezzo.`);
  const features = bike.Caratteristiche
    ? bike.Caratteristiche.split('|').map(f => f.trim()).filter(Boolean)
    : [];

  // Costruisce il carousel (o fallback se no immagini)
  const visualEl = modal.querySelector('.product-modal__visual');
  visualEl.innerHTML = buildCarousel(images, bike.Nome, icon);
  const carouselEl = visualEl.querySelector('.carousel');
  if (carouselEl && images.length > 1) initCarousel(carouselEl);

  modal.querySelector('.product-modal__meta').innerHTML = `
    <span class="product-card__badge" style="position:static">${bike.Categoria}</span>
    ${bike.In_Evidenza?.toUpperCase() === 'SI' ? '<span class="chip">⭐ In evidenza</span>' : ''}
    ${bike.Marca ? `<span class="chip">${bike.Marca}</span>` : ''}`;

  modal.querySelector('.product-modal__title').textContent = bike.Nome;
  modal.querySelector('.product-modal__price').textContent = bike.Prezzo || 'Prezzo su richiesta';
  modal.querySelector('.product-modal__desc').textContent = bike.Descrizione_Completa || bike.Descrizione_Breve || '';

  const featEl = modal.querySelector('.product-modal__features');
  featEl.innerHTML = features.length ? `
    <h4>Caratteristiche principali</h4>
    <div class="feature-tags-list">
      ${features.map(f => `
        <span class="feature-tag">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          ${f}
        </span>`).join('')}
    </div>` : '';

  const noteEl = modal.querySelector('.product-modal__note');
  noteEl.hidden = !bike.Note;
  if (bike.Note) noteEl.textContent = `📌 ${bike.Note}`;

  modal.querySelector('.modal-wa-btn').href = `https://wa.me/${CONFIG.WA_NUMBER}?text=${waText}`;
  modal.querySelector('.modal-call-btn').href = `tel:+${CONFIG.WA_NUMBER}`;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modal.querySelector('.product-modal__close')?.focus();
}

function closeModal() {
  if (!modal) return;
  // Rimuove il listener tastiera del carousel attivo
  const carouselEl = modal.querySelector('.carousel');
  if (carouselEl?._keyHandler) document.removeEventListener('keydown', carouselEl._keyHandler);
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── EVENT LISTENERS ─────────────────────────────────────── */
modal?.querySelector('.product-modal__close')?.addEventListener('click', closeModal);
modal?.querySelector('.product-modal__backdrop')?.addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

sortSelect?.addEventListener('change', e => {
  activeSort = e.target.value;
  render();
});

/* ─── AVVIO ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', loadBikes);

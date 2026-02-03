
const prices = {
    maya: {
        mattina: { '1h': 168, '1.5h': 218, '2h': 288, '2.5h': 368 },
        sera: { '1h': 238, '1.5h': 298, '2h': 388, '2.5h': 468 },
        notte: { '1h': 288, '1.5h': 388, '2h': 538, '2.5h': 658 }
    },
    moon: {
        mattina: { '1h': 138, '1.5h': 178, '2h': 238, '2.5h': 288 },
        sera: { '1h': 188, '1.5h': 238, '2h': 298, '2.5h': 378 },
        notte: { '1h': 228, '1.5h': 308, '2h': 418, '2.5h': 518 }
    },
    domus: {
        mattina: { '1h': 118, '1.5h': 148, '2h': 198, '2.5h': 238 },
        sera: { '1h': 148, '1.5h': 188, '2h': 248, '2.5h': 298 },
        notte: { '1h': 188, '1.5h': 278, '2h': 348, '2.5h': 428 }
    }
};

const extraPrices = {
    'pinse-prosecco': 60,
    'sushi-prosecco': 80,
    'pinsa-sushi-prosecco': 75,
    'prosecco-grande': 45,
    'prosecco-piccolo': 20,
    'champagne-grande': 110,
    'champagne-piccolo': 30,
    'frutta-piccoli': 20,
    'frutta-grandi': 30
};

const extraNames = {
    'pinse-prosecco': 'Pinse + Prosecco',
    'sushi-prosecco': 'Sushi + Prosecco',
    'pinsa-sushi-prosecco': 'Pinsa + Sushi + Prosecco',
    'prosecco-grande': 'Prosecco grande',
    'prosecco-piccolo': 'Prosecco piccolo',
    'champagne-grande': 'Champagne grande',
    'champagne-piccolo': 'Champagne piccolo',
    'frutta-piccoli': 'Spiedini frutta piccoli',
    'frutta-grandi': 'Spiedini frutta grandi'
};

const dinnerPrices = {
    '2piatti': 76,    '3piatti': 100,    '4piatti': 126};

const dinnerNames = {
    '2piatti': '2 Piatti',
    '3piatti': '3 Piatti',
    '4piatti': '4 Piatti con Dessert'
};

const spaInfo = {
    maya: { name: 'SPA Maya', size: '110 mq', image: 'assets/images/spa-maya.jpg' },
    moon: { name: 'SPA Moon', size: '100 mq', image: 'assets/images/spa-moon.jpg' },
    domus: { name: 'SPA Domus', size: '70 mq', image: 'assets/images/spa-domus.jpg' }
};

let selection = {
    date: null,
    spa: null,
    duration: null,
    time: null,
    extras: [],
    dinner: null,
    camera: null
};

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const valentineDates = [
    { day: 13, month: 1 },
    { day: 14, month: 1 },
    { day: 15, month: 1 }
];

function isValentineDate(year, month, day) {
    return valentineDates.some(d => d.month === month && d.day === day);
}

function showValentinePopup() {
    const existing = document.getElementById('valentine-popup');
    if (existing) existing.remove();

    const popup = document.createElement('div');
    popup.id = 'valentine-popup';
    popup.innerHTML = `
        <div class="valentine-popup-content">
            <button class="valentine-popup-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            <div class="valentine-popup-icon">❤️</div>
            <h3>Speciale San Valentino</h3>
            <p>Per questa data abbiamo preparato un'esperienza esclusiva dedicata agli innamorati.</p>
            <a href="https://sanvalentino.trilussapalace.com/" class="valentine-popup-btn" target="_blank">Scopri l'offerta</a>
        </div>
    `;
    document.body.appendChild(popup);
}

let currentLang = 'it';

const translations = {
    it: {
        heroHotelName: 'Trilussa Palace Hotel',
        heroSubtitle: 'Wellness & SPA',
        heroTitle: 'SPA Privata',
        heroDesc: "Un'esperienza esclusiva di benessere nel cuore di Trastevere",
        spaTitle: 'Le nostre SPA private ed esclusive',
        spaSubtitle: 'Tre ambienti per il tuo relax!',
        spaMayaDesc: "Grande vasca di 32 mq in mosaico verde, oro e nero con giochi d'acqua, cascate rigeneranti e idromassaggio. Piramide Maya al centro con colori personalizzabili, sauna finlandese con parete di sale e bagno turco.",
        spaMoonDesc: "Esperienza sensoriale con tecnologie multimediali avanzate. Proiezioni immersive, gestione scenari e luci personalizzabili per un'atmosfera unica.",
        spaDomusDesc: "Ambiente intimo e raffinato con piscina idromassaggio di 8 mq rivestita in mosaico, bagno turco in marmo e docce emozionali per un'esperienza esclusiva.",
        featureWater34: 'Acqua 34°',
        featurePool32: 'Piscina 32 mq',
        featurePool30: 'Piscina 30 mq',
        featurePool8: 'Piscina 8 mq',
        featureSauna: 'Sauna',
        featureSteam: 'Bagno turco',
        timeSlots: 'Fasce orarie',
        timeMorning: 'Mattina',
        timeAfternoon: 'Pomeriggio/Sera',
        timeNight: 'Notte',
        alwaysIncluded: 'Sempre incluso',
        kitBathrobe: 'Accappatoio',
        kitTowel: 'Telo',
        kitSlippers: 'Ciabattine',
        kitChocolates: 'Cioccolatini',
        configTitle: 'Configura la tua esperienza',
        configSubtitle: 'Scegli data, SPA e servizi per il tuo momento di relax',
        stepDate: 'Scegli la data',
        stepSpa: 'Scegli la SPA',
        stepDuration: 'Scegli la durata',
        stepTime: 'Scegli la fascia oraria',
        stepExtras: 'Aggiungi servizi extra',
        stepCamera: 'Vuoi aggiungere una camera?',
        stepDinner: 'Vuoi aggiungere la cena?',
        duration1h: '1 ora',
        duration1h30: '1h 30',
        duration2h: '2 ore',
        duration2h30: '2h 30',
        optMayaDesc: 'Piscina 32mq, sauna himalayiana, bagno turco',
        optMoonDesc: 'Piscina 34°C, idromassaggio, sauna, proiezioni',
        optDomusDesc: 'Docce emozionali, bagno turco marmo',
        continueBtn: 'Continua',
        skipExtras: 'Salta questo passaggio',
        extrasFood: '🍕 Cibo',
        extrasDrinks: '🥂 Bevande',
        cameraNo: 'No, solo SPA',
        cameraMatrimoniale: 'Matrimoniale',
        cameraRequest: 'Su richiesta',
        dinnerNo: 'No grazie',
        dinnerSubtitle: 'Percorsi Degustazione al Ramo Bistrot',
        dinner2Piatti: '2 Portate',
        dinner3Piatti: '3 Portate',
        dinner4Piatti: '4 Portate',
        dinnerDesc2: 'A scelta tra: 1 Antipasto, 1 Primo, 1 Secondo, 1 Dessert',
        dinnerDesc3: 'A scelta tra: 1 Antipasto, 1 Primo, 1 Secondo, 1 Dessert',
        dinnerDesc4: 'Menu completo: 1 Antipasto, 1 Primo, 1 Secondo, 1 Dessert',
        dinnerPerCouple: '(a persona)',
        resultLabel: 'Il tuo preventivo',
        resultNote: 'per 2 persone',
        btnReset: 'Ricomincia',
        modalTitle: 'Perfetto!',
        modalSubtitle: 'Ecco il riepilogo della tua esperienza SPA',
        modalEdit: 'Modifica selezione',
        footerCopy: '© 2026 Trilussa Palace Hotel. Tutti i diritti riservati.',
        months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        weekdays: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
        includedKit: 'Kit incluso: accappatoio, telo, ciabattine, prosecco, soft drink, garage',
        viewSummary: 'Vedi Riepilogo',
        viewFullMenu: 'Vedi Menu Completo',
        hideFullMenu: 'Nascondi Menu',
        configureSpa: 'Configura',
        backToCard: 'Torna alla card',
        priceMorning: 'Mattina',
        priceEvening: 'Sera',
        priceNight: 'Notte',
        dinnerTitle: 'Cena al Ramo Bistrot',
        menuWhyTitle: 'Perché Ramo?',
        menuWhyDesc: "Ramo è l'anagramma di ROMA e AMOR, due parole che racchiudono l'essenza di questo luogo: la bellezza eterna di Roma e il calore dell'amore.",
        menuDegTitle: 'Percorso Degustazione',
        menuDegDesc: 'Per scoprire la nostra cucina al meglio.',
        menuBevande: 'Bevande Incluse: Calice di vino, acqua, soft drink.',
        menuAntipasti: 'Antipasti',
        menuPrimiTrad: 'Primi della Tradizione',
        menuPrimiPiatti: 'Primi Piatti',
        menuSecondi: 'Secondi',
        menuContorni: 'Contorni',
        menuOneChoice: 'uno a scelta',
        extraFruitSmall: 'Spiedini frutta piccoli',
        extraFruitLarge: 'Spiedini frutta grandi',
        extraProseccoSmall: 'Prosecco piccolo',
        extraProseccoLarge: 'Prosecco grande',
        extraChampSmall: 'Champagne piccolo',
        extraChampLarge: 'Champagne grande',
        btnCall: 'Chiama'
    },
    en: {
        heroHotelName: 'Trilussa Palace Hotel',
        heroSubtitle: 'Wellness & SPA',
        heroTitle: 'Private SPA',
        heroDesc: 'An exclusive wellness experience in the heart of Trastevere',
        spaTitle: 'Our Private & Exclusive SPAs',
        spaSubtitle: 'Three settings for your relaxation!',
        spaMayaDesc: 'Large 32 sqm pool in green, gold and black mosaic with water features, regenerating waterfalls and hydromassage. Maya Pyramid in the center with customizable colors, Finnish sauna with salt wall and Turkish bath.',
        spaMoonDesc: 'Sensory experience with advanced multimedia technologies. Immersive projections, scenario management and customizable lights for a unique atmosphere.',
        spaDomusDesc: 'Intimate and refined atmosphere with 8 sqm hydromassage pool in mosaic, marble Turkish bath and emotional showers for an exclusive experience.',
        featureWater34: 'Water 34°',
        featurePool32: 'Pool 32 sqm',
        featurePool30: 'Pool 30 sqm',
        featurePool8: 'Pool 8 sqm',
        featureSauna: 'Sauna',
        featureSteam: 'Turkish bath',
        timeSlots: 'Time slots',
        timeMorning: 'Morning',
        timeAfternoon: 'Afternoon/Evening',
        timeNight: 'Night',
        alwaysIncluded: 'Always included',
        kitBathrobe: 'Bathrobe',
        kitTowel: 'Towel',
        kitSlippers: 'Slippers',
        kitChocolates: 'Chocolates',
        configTitle: 'Configure your experience',
        configSubtitle: 'Choose date, SPA and services for your relaxation moment',
        stepDate: 'Choose the date',
        stepSpa: 'Choose the SPA',
        stepDuration: 'Choose the duration',
        stepTime: 'Choose the time slot',
        stepExtras: 'Add extra services',
        stepCamera: 'Would you like to add a room?',
        stepDinner: 'Would you like to add dinner?',
        duration1h: '1 hour',
        duration1h30: '1h 30',
        duration2h: '2 hours',
        duration2h30: '2h 30',
        optMayaDesc: '32sqm pool, Himalayan sauna, Turkish bath',
        optMoonDesc: '34°C pool, hydromassage, sauna, projections',
        optDomusDesc: 'Emotional showers, marble Turkish bath',
        continueBtn: 'Continue',
        skipExtras: 'Skip this step',
        extrasFood: '🍕 Food',
        extrasDrinks: '🥂 Drinks',
        cameraNo: 'No, SPA only',
        cameraMatrimoniale: 'Double Room',
        cameraRequest: 'On request',
        dinnerNo: 'No thanks',
        dinnerSubtitle: 'Tasting Menus at Ramo Bistrot',
        dinner2Piatti: '2 Courses',
        dinner3Piatti: '3 Courses',
        dinner4Piatti: '4 Courses',
        dinnerDesc2: 'Choose from: 1 Starter, 1 First, 1 Main, 1 Dessert',
        dinnerDesc3: 'Choose from: 1 Starter, 1 First, 1 Main, 1 Dessert',
        dinnerDesc4: 'Full menu: 1 Starter, 1 First, 1 Main, 1 Dessert',
        dinnerPerCouple: '(per person)',
        resultLabel: 'Your quote',
        resultNote: 'for 2 people',
        btnReset: 'Start over',
        modalTitle: 'Perfect!',
        modalSubtitle: 'Here is the summary of your SPA experience',
        modalEdit: 'Edit selection',
        footerCopy: '© 2026 Trilussa Palace Hotel. All rights reserved.',
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        weekdays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        includedKit: 'Kit included: bathrobe, towel, slippers, prosecco, soft drink, garage',
        viewSummary: 'View Summary',
        viewFullMenu: 'View Full Menu',
        hideFullMenu: 'Hide Menu',
        configureSpa: 'Configure',
        backToCard: 'Back to card',
        priceMorning: 'Morning',
        priceEvening: 'Evening',
        priceNight: 'Night',
        dinnerTitle: 'Dinner at Ramo Bistrot',
        menuWhyTitle: 'Why Ramo?',
        menuWhyDesc: 'Ramo is an anagram of ROMA and AMOR, two words that capture the essence of this place: the eternal beauty of Rome and the warmth of love.',
        menuDegTitle: 'Tasting Experience',
        menuDegDesc: 'To discover our cuisine at its best.',
        menuBevande: 'Drinks Included: Glass of wine, water, soft drink.',
        menuAntipasti: 'Starters',
        menuPrimiTrad: 'Traditional First Courses',
        menuPrimiPiatti: 'First Courses',
        menuSecondi: 'Main Courses',
        menuContorni: 'Side Dishes',
        menuOneChoice: 'one to choose',
        extraFruitSmall: 'Fruit skewers small',
        extraFruitLarge: 'Fruit skewers large',
        extraProseccoSmall: 'Prosecco small',
        extraProseccoLarge: 'Prosecco large',
        extraChampSmall: 'Champagne small',
        extraChampLarge: 'Champagne large',
        btnCall: 'Call'
    }
};

function updateProgressBar(activeStep) {
    const stepMap = {
        'step-date': 1,
        'step-spa': 2,
        'step-duration': 3,
        'step-time': 4,
        'step-extras': 5,
        'step-dinner': 6,
        'step-camera': 7
    };

    const currentStep = stepMap[activeStep] || 1;
    const dots = document.querySelectorAll('.progress-dot');
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.setAttribute('aria-valuenow', String(currentStep));
    }

    dots.forEach((dot, index) => {
        const dotStep = index + 1;
        dot.classList.remove('active', 'completed');

        if (dotStep < currentStep) {
            dot.classList.add('completed');
        } else if (dotStep === currentStep) {
            dot.classList.add('active');
        }
    });
}

function updateStepAria(collapsingId, openingId) {
    const collapsing = document.getElementById(collapsingId);
    const opening = document.getElementById(openingId);
    if (collapsing) collapsing.setAttribute('aria-expanded', 'false');
    if (opening) opening.setAttribute('aria-expanded', 'true');
}

function focusStep(stepId) {
    const el = document.getElementById(stepId);
    if (el) el.focus({ preventScroll: true });
}

document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
    initScrollAnimations();
    updateTranslations();
    createFloatingStars();
    updateProgressBar('step-date');
    initCarousels();
    initFlipCards();
    renderPriceTables();

    document.querySelectorAll('.step').forEach(step => {
        step.setAttribute('tabindex', '-1');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const target = e.target;
        if (target.matches('.option, .extra-item, .calendar-day:not(.disabled):not(.empty), .step.collapsed')) {
            e.preventDefault();
            target.click();
        }
    });

    const continueBtn = document.getElementById('btn-continue-extras');
    const skipBtn = document.getElementById('btn-skip-extras');

    if (continueBtn) {
        continueBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            proceedFromExtras();
        });
    }

    if (skipBtn) {
        skipBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            skipExtras();
        });
    }
});

function createFloatingStars() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = document.getElementById('floating-stars');
    if (!container) return;

    const starSymbols = ['✦', '✧', '★', '☆', '✶', '✷'];

    for (let i = 0; i < 20; i++) {
        const star = document.createElement('span');
        star.className = 'star';
        star.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.fontSize = (8 + Math.random() * 12) + 'px';
        star.style.animationDuration = (8 + Math.random() * 12) + 's';
        star.style.animationDelay = Math.random() * 10 + 's';
        star.style.opacity = 0.3 + Math.random() * 0.5;
        container.appendChild(star);
    }

    for (let i = 0; i < 15; i++) {
        const star = document.createElement('span');
        star.className = 'star twinkle';
        star.textContent = '✦';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.fontSize = (6 + Math.random() * 8) + 'px';
        star.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(star);
    }
}

function createConfetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const modal = document.querySelector('.modal');
    if (!modal) return;

    const oldContainer = modal.querySelector('.confetti-container');
    if (oldContainer) oldContainer.remove();

    const container = document.createElement('div');
    container.className = 'confetti-container';

    const colors = ['#C8A88B', '#E8D4C4', '#D4C0B0', '#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = (5 + Math.random() * 10) + 'px';
        confetti.style.height = (5 + Math.random() * 10) + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        container.appendChild(confetti);
    }

    modal.insertBefore(container, modal.firstChild);
}

function initCalendar() {
    renderCalendar();
}

function renderCalendar() {
    const monthYearEl = document.getElementById('calendar-month-year');
    const daysEl = document.getElementById('calendar-days');

    if (!monthYearEl || !daysEl) return;

    const t = translations[currentLang];
    monthYearEl.textContent = `${t.months[currentMonth]} ${currentYear}`;

    const weekdayEls = document.querySelectorAll('.calendar-weekday');
    weekdayEls.forEach((el, i) => {
        el.textContent = t.weekdays[i];
    });

    daysEl.innerHTML = '';

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < adjustedFirstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        daysEl.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;
        dayEl.setAttribute('role', 'button');
        dayEl.setAttribute('tabindex', '0');

        const dateToCheck = new Date(currentYear, currentMonth, day);
        dateToCheck.setHours(0, 0, 0, 0);

        if (dateToCheck.getTime() === today.getTime()) {
            dayEl.classList.add('today');
        }

        if (dateToCheck < today) {
            dayEl.classList.add('disabled');
            dayEl.setAttribute('tabindex', '-1');
            dayEl.setAttribute('aria-disabled', 'true');
        } else if (isValentineDate(currentYear, currentMonth, day)) {
            dayEl.classList.add('valentine');
            const badge = document.createElement('span');
            badge.className = 'valentine-badge';
            badge.textContent = '❤️';
            dayEl.appendChild(badge);
            dayEl.addEventListener('click', () => showValentinePopup());
        } else {
            dayEl.addEventListener('click', () => selectDate(currentYear, currentMonth, day));
        }

        if (selection.date) {
            const selectedDate = new Date(selection.date);
            if (selectedDate.getFullYear() === currentYear &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getDate() === day) {
                dayEl.classList.add('selected');
            }
        }

        daysEl.appendChild(dayEl);
    }
}

function changeMonth(delta) {
    currentMonth += delta;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

function selectDate(year, month, day) {
    selection.date = new Date(year, month, day).toISOString();
    renderCalendar();

    document.getElementById('step-date').classList.add('collapsed');
    document.getElementById('step-date').classList.remove('active');
    document.getElementById('step-spa').classList.remove('hidden');
    document.getElementById('step-spa').classList.add('active');
    updateStepAria('step-date', 'step-spa');
    updateProgressBar('step-spa');

    setTimeout(() => {
        document.getElementById('step-spa').scrollIntoView({ behavior: 'smooth', block: 'center' });
        focusStep('step-spa');
    }, 100);
}

function selectSpa(spa) {
    selection.spa = spa;

    document.querySelectorAll('#step-spa .option').forEach(opt => {
        opt.classList.remove('selected');
        if (opt.dataset.spa === spa) {
            opt.classList.add('selected');
        }
    });

    setTimeout(() => {
        document.getElementById('step-spa').classList.add('collapsed');
        document.getElementById('step-spa').classList.remove('active');
        document.getElementById('step-duration').classList.remove('hidden');
        document.getElementById('step-duration').classList.add('active');
        updateStepAria('step-spa', 'step-duration');
        updateProgressBar('step-duration');

        setTimeout(() => {
            document.getElementById('step-duration').scrollIntoView({ behavior: 'smooth', block: 'center' });
            focusStep('step-duration');
        }, 100);
    }, 200);
}

function selectDuration(duration) {
    selection.duration = duration;

    document.querySelectorAll('#step-duration .option').forEach(opt => {
        opt.classList.remove('selected');
        if (opt.dataset.duration === duration) {
            opt.classList.add('selected');
        }
    });

    setTimeout(() => {
        document.getElementById('step-duration').classList.add('collapsed');
        document.getElementById('step-duration').classList.remove('active');
        document.getElementById('step-time').classList.remove('hidden');
        document.getElementById('step-time').classList.add('active');
        updateStepAria('step-duration', 'step-time');
        updateProgressBar('step-time');

        setTimeout(() => {
            document.getElementById('step-time').scrollIntoView({ behavior: 'smooth', block: 'center' });
            focusStep('step-time');
        }, 100);
    }, 200);
}

function selectTime(time) {
    selection.time = time;

    document.querySelectorAll('#step-time .option').forEach(opt => {
        opt.classList.remove('selected');
        if (opt.dataset.time === time) {
            opt.classList.add('selected');
        }
    });

    setTimeout(() => {
        document.getElementById('step-time').classList.add('collapsed');
        document.getElementById('step-time').classList.remove('active');
        document.getElementById('step-extras').classList.remove('hidden');
        document.getElementById('step-extras').classList.add('active');
        updateStepAria('step-time', 'step-extras');
        updateProgressBar('step-extras');

        setTimeout(() => {
            document.getElementById('step-extras').scrollIntoView({ behavior: 'smooth', block: 'center' });
            focusStep('step-extras');
        }, 100);
    }, 200);
}

function toggleExtra(element) {
    const extraId = element.dataset.extra;

    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        selection.extras = selection.extras.filter(e => e !== extraId);
    } else {
        element.classList.add('selected');
        selection.extras.push(extraId);
    }
}

function skipExtras() {
    proceedFromExtras();
}

function proceedFromExtras() {
    document.getElementById('step-extras').classList.add('collapsed');
    document.getElementById('step-extras').classList.remove('active');
    document.getElementById('step-dinner').classList.remove('hidden');
    document.getElementById('step-dinner').classList.add('active');
    updateStepAria('step-extras', 'step-dinner');
    updateProgressBar('step-dinner');

    setTimeout(() => {
        document.getElementById('step-dinner').scrollIntoView({ behavior: 'smooth', block: 'center' });
        focusStep('step-dinner');
    }, 100);
}

function selectCamera(choice) {
    selection.camera = choice === 'matrimoniale' ? 'matrimoniale' : null;

    document.querySelectorAll('#step-camera .option').forEach(opt => {
        opt.classList.remove('selected');
        if (opt.dataset.camera === choice) {
            opt.classList.add('selected');
        }
    });

    setTimeout(() => {
        document.getElementById('step-camera').classList.add('collapsed');
        document.getElementById('step-camera').classList.remove('active');
        document.getElementById('step-camera').setAttribute('aria-expanded', 'false');
        showResult();
    }, 200);
}

function selectDinner(choice) {
    selection.dinner = choice === 'no' ? null : choice;

    document.querySelectorAll('#step-dinner .option').forEach(opt => {
        opt.classList.remove('selected');
        if (opt.dataset.dinner === choice) {
            opt.classList.add('selected');
        }
    });

    setTimeout(() => {
        document.getElementById('step-dinner').classList.add('collapsed');
        document.getElementById('step-dinner').classList.remove('active');

        document.getElementById('step-camera').classList.remove('hidden');
        document.getElementById('step-camera').classList.add('active');
        updateStepAria('step-dinner', 'step-camera');
        updateProgressBar('step-camera');

        setTimeout(() => {
            document.getElementById('step-camera').scrollIntoView({ behavior: 'smooth', block: 'center' });
            focusStep('step-camera');
        }, 100);
    }, 200);
}

function calculateTotal() {
    if (!selection.spa || !selection.time || !selection.duration) return 0;

    let total = prices[selection.spa][selection.time][selection.duration];

    selection.extras.forEach(extra => {
        total += extraPrices[extra];
    });

    if (selection.dinner && dinnerPrices[selection.dinner]) {
        total += dinnerPrices[selection.dinner];
    }

    return total;
}

function showResult() {
    const total = calculateTotal();
    const resultEl = document.getElementById('result');
    const priceEl = document.getElementById('total-price');
    const includesEl = document.getElementById('includes');

    priceEl.textContent = `€${total}`;

    const t = translations[currentLang];
    const info = spaInfo[selection.spa];
    const dateFormatted = formatDate(selection.date);
    const durationText = getDurationText(selection.duration);
    const timeText = getTimeText(selection.time);

    let includesHtml = `<div class="includes-title">${t.resultLabel}</div><div class="includes-list">`;
    includesHtml += `<div class="includes-item"><b>Data:</b> ${dateFormatted}</div>`;
    includesHtml += `<div class="includes-item"><b>${info.name}</b> (${info.size})<span class="includes-detail">${durationText} - ${timeText}</span></div>`;

    if (selection.extras.length > 0) {
        const extrasText = selection.extras.map(e => extraNames[e]).join(', ');
        const extrasTotal = selection.extras.reduce((sum, e) => sum + extraPrices[e], 0);
        includesHtml += `<div class="includes-item"><b>Extra:</b> ${extrasText}<span class="includes-detail">+€${extrasTotal}</span></div>`;
    }

    if (selection.dinner && dinnerPrices[selection.dinner]) {
        const dinnerName = dinnerNames[selection.dinner];
        const dinnerCost = dinnerPrices[selection.dinner];
        includesHtml += `<div class="includes-item"><b>Cena (${dinnerName}):</b> +€${dinnerCost}</div>`;
    }

    if (selection.camera) {
        includesHtml += `<div class="includes-item"><b>Camera Matrimoniale:</b> ${t.cameraRequest}</div>`;
    }

    includesHtml += `<div class="includes-item">${t.includedKit}</div>`;
    includesHtml += '</div>';

    includesEl.innerHTML = includesHtml;

    updateContactLinks();

    resultEl.classList.remove('hidden');

    setTimeout(() => {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    setTimeout(() => {
        showModal();
    }, 800);
}

function formatDate(isoDate) {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString(currentLang === 'it' ? 'it-IT' : 'en-US', options);
}

function getDurationText(duration) {
    const t = translations[currentLang];
    const map = {
        '1h': t.duration1h,
        '1.5h': t.duration1h30,
        '2h': t.duration2h,
        '2.5h': t.duration2h30
    };
    return map[duration] || duration;
}

function getTimeText(time) {
    const t = translations[currentLang];
    const map = {
        'mattina': `${t.timeMorning} (07:00-16:00)`,
        'sera': `${t.timeAfternoon} (16:00-23:00)`,
        'notte': `${t.timeNight} (23:00-07:00)`
    };
    return map[time] || time;
}

function updateContactLinks() {
    const total = calculateTotal();
    const message = generateMessage();

    const waLink = `https://wa.me/3387979951?text=${encodeURIComponent(message)}`;
    document.getElementById('whatsapp-link').href = waLink;
    document.getElementById('modal-whatsapp').href = waLink;

    const subject = currentLang === 'it' ? 'Richiesta prenotazione SPA' : 'SPA booking request';
    const emailLink = `mailto:info@trilussapalacehotel.it?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    document.getElementById('email-link').href = emailLink;
    document.getElementById('modal-email').href = emailLink;
}

function generateMessage() {
    const total = calculateTotal();
    const info = spaInfo[selection.spa];
    const dateFormatted = formatDate(selection.date);
    const durationText = getDurationText(selection.duration);
    const timeText = getTimeText(selection.time);

    let msg = currentLang === 'it'
        ? `Salve, vorrei prenotare una SPA privata:\n\n`
        : `Hello, I would like to book a private SPA:\n\n`;

    msg += `${currentLang === 'it' ? 'Data' : 'Date'}: ${dateFormatted}\n`;
    msg += `SPA: ${info.name} (${info.size})\n`;
    msg += `${currentLang === 'it' ? 'Durata' : 'Duration'}: ${durationText}\n`;
    msg += `${currentLang === 'it' ? 'Fascia oraria' : 'Time slot'}: ${timeText}\n`;

    if (selection.extras.length > 0) {
        const extrasText = selection.extras.map(e => extraNames[e]).join(', ');
        msg += `Extra: ${extrasText}\n`;
    }

    if (selection.dinner && dinnerPrices[selection.dinner]) {
        const dinnerName = dinnerNames[selection.dinner];
        const dinnerCost = dinnerPrices[selection.dinner];
        msg += `${currentLang === 'it' ? `Cena: ${dinnerName} (+€${dinnerCost})` : `Dinner: ${dinnerName} (+€${dinnerCost})`}\n`;
    }

    if (selection.camera) {
        msg += `${currentLang === 'it' ? 'Camera Matrimoniale: Su richiesta' : 'Double Room: On request'}\n`;
    }

    msg += `\n${currentLang === 'it' ? 'Totale preventivo' : 'Total quote'}: €${total}\n`;
    msg += `\n${currentLang === 'it' ? 'Grazie!' : 'Thank you!'}`;

    return msg;
}

let modalFocusTrapHandler = null;

function showModal() {
    const modal = document.getElementById('modal');
    const modalPrice = document.getElementById('modal-price');
    const modalSummary = document.getElementById('modal-summary');

    const total = calculateTotal();
    const t = translations[currentLang];
    const info = spaInfo[selection.spa];
    const dateFormatted = formatDate(selection.date);
    const durationText = getDurationText(selection.duration);
    const timeText = getTimeText(selection.time);

    modalPrice.textContent = `€${total}`;

    let summaryHtml = '<div class="modal-includes-list">';
    summaryHtml += `<div class="modal-includes-item"><b>Data:</b> ${dateFormatted}</div>`;
    summaryHtml += `<div class="modal-includes-item"><b>${info.name}</b> (${info.size})<span class="includes-detail">${durationText} - ${timeText}</span></div>`;

    if (selection.extras.length > 0) {
        const extrasText = selection.extras.map(e => extraNames[e]).join(', ');
        const extrasTotal = selection.extras.reduce((sum, e) => sum + extraPrices[e], 0);
        summaryHtml += `<div class="modal-includes-item"><b>Extra:</b> ${extrasText}<span class="includes-detail">+€${extrasTotal}</span></div>`;
    }

    if (selection.dinner && dinnerPrices[selection.dinner]) {
        const dinnerName = dinnerNames[selection.dinner];
        const dinnerCost = dinnerPrices[selection.dinner];
        summaryHtml += `<div class="modal-includes-item"><b>Cena (${dinnerName}):</b> +€${dinnerCost}</div>`;
    }

    if (selection.camera) {
        summaryHtml += `<div class="modal-includes-item"><b>Camera Matrimoniale:</b> ${t.cameraRequest}</div>`;
    }

    summaryHtml += `<div class="modal-includes-item">${t.includedKit}</div>`;
    summaryHtml += '</div>';

    modalSummary.innerHTML = summaryHtml;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    createConfetti();

    const modalDialog = modal.querySelector('.modal');
    const focusableEls = modalDialog.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
    if (focusableEls.length > 0) {
        focusableEls[0].focus();
    }

    modalFocusTrapHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            return;
        }
        if (e.key !== 'Tab') return;
        const focusable = modalDialog.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    };
    document.addEventListener('keydown', modalFocusTrapHandler);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    if (modalFocusTrapHandler) {
        document.removeEventListener('keydown', modalFocusTrapHandler);
        modalFocusTrapHandler = null;
    }
}

function reset() {
    selection = {
        date: null,
        spa: null,
        duration: null,
        time: null,
        extras: [],
        dinner: null,
        camera: null
    };

    document.querySelectorAll('.step').forEach(step => {
        step.classList.add('hidden');
        step.classList.remove('active', 'collapsed');
        step.setAttribute('aria-expanded', 'false');
    });

    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });

    document.querySelectorAll('.extra-item').forEach(item => {
        item.classList.remove('selected');
    });

    document.getElementById('result').classList.add('hidden');

    document.getElementById('step-date').classList.remove('hidden');
    document.getElementById('step-date').classList.add('active');
    document.getElementById('step-date').setAttribute('aria-expanded', 'true');
    updateProgressBar('step-date');

    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();
    renderCalendar();

    closeModal();

    document.getElementById('configurator-section').scrollIntoView({ behavior: 'smooth' });
}

function setLanguage(lang) {
    currentLang = lang;

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    updateTranslations();
    renderPriceTables();

    renderCalendar();
}

function updateTranslations() {
    const t = translations[currentLang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) {
            el.textContent = t[key];
        }
    });
}

function toggleMenuFull() {
    var menuExtra = document.getElementById('menu-extra');
    var btn = document.getElementById('menu-toggle-btn');
    var t = translations[currentLang];
    if (menuExtra.style.display === 'block') {
        menuExtra.style.display = 'none';
        btn.textContent = t.viewFullMenu;
    } else {
        menuExtra.style.display = 'block';
        btn.textContent = t.hideFullMenu;
    }
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-fade-in').forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('.option') || e.target.closest('.extra-item') || e.target.closest('.calendar-day')) {
        return;
    }
    const step = e.target.closest('.step.collapsed');
    if (step) {
        reopenStep(step.id);
    }
});

function reopenStep(stepId) {
    const steps = ['step-date', 'step-spa', 'step-duration', 'step-time', 'step-extras', 'step-dinner', 'step-camera'];
    const index = steps.indexOf(stepId);

    if (index <= 0) {
        selection.date = null;
        selection.spa = null;
        selection.duration = null;
        selection.time = null;
        selection.extras = [];
        selection.dinner = null;
        selection.camera = null;
    } else if (index === 1) {
        selection.spa = null;
        selection.duration = null;
        selection.time = null;
        selection.extras = [];
        selection.dinner = null;
        selection.camera = null;
    } else if (index === 2) {
        selection.duration = null;
        selection.time = null;
        selection.extras = [];
        selection.dinner = null;
        selection.camera = null;
    } else if (index === 3) {
        selection.time = null;
        selection.extras = [];
        selection.dinner = null;
        selection.camera = null;
    } else if (index === 4) {
        selection.extras = [];
        selection.dinner = null;
        selection.camera = null;
    } else if (index === 5) {
        selection.dinner = null;
        selection.camera = null;
    } else if (index === 6) {
        selection.camera = null;
    }

    for (let i = index + 1; i < steps.length; i++) {
        const s = document.getElementById(steps[i]);
        if (s) {
            s.classList.add('hidden');
            s.classList.remove('active', 'collapsed');
            s.setAttribute('aria-expanded', 'false');
            s.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
        }
    }

    if (index <= 4) {
        document.querySelectorAll('.extra-item').forEach(item => {
            item.classList.remove('selected');
        });
    }

    document.getElementById('result').classList.add('hidden');

    const stepEl = document.getElementById(stepId);
    stepEl.classList.remove('collapsed', 'hidden');
    stepEl.classList.add('active');
    stepEl.setAttribute('aria-expanded', 'true');
    updateProgressBar(stepId);

    if (stepId === 'step-date') {
        renderCalendar();
    }

    setTimeout(() => {
        stepEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        focusStep(stepId);
    }, 100);
}

function initCarousels() {
    document.querySelectorAll('.spa-card-carousel').forEach(function(carousel) {
        var slides = carousel.querySelector('.spa-card-slides');
        var dots = carousel.querySelectorAll('.carousel-dot');
        var prev = carousel.querySelector('.carousel-prev');
        var next = carousel.querySelector('.carousel-next');
        var current = 0;
        var total = dots.length;

        function goTo(index) {
            current = (index + total) % total;
            slides.style.transform = 'translateX(-' + (current * 100) + '%)';
            dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
        }

        prev.addEventListener('click', function(e) { e.stopPropagation(); goTo(current - 1); });
        next.addEventListener('click', function(e) { e.stopPropagation(); goTo(current + 1); });
        dots.forEach(function(dot, i) {
            dot.addEventListener('click', function(e) { e.stopPropagation(); goTo(i); });
        });

        var startX = 0;
        carousel.addEventListener('pointerdown', function(e) { startX = e.clientX; });
        carousel.addEventListener('pointerup', function(e) {
            var diff = e.clientX - startX;
            if (Math.abs(diff) > 40) goTo(current + (diff < 0 ? 1 : -1));
        });
    });
}

function initFlipCards() {
    document.querySelectorAll('.flip-btn').forEach(function(btn) {
        if (btn.dataset.bound) return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var card = btn.closest('.spa-card');
            card.classList.add('flipped');
        });
    });

    document.querySelectorAll('.back-flip-btn').forEach(function(btn) {
        if (btn.dataset.bound) return;
        btn.dataset.bound = 'true';
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var card = btn.closest('.spa-card');
            card.classList.remove('flipped');
        });
    });
}

function renderPriceTables() {
    var t = translations[currentLang];
    var timeLabels = {
        mattina: t.priceMorning,
        sera: t.priceEvening,
        notte: t.priceNight
    };
    var durations = ['1h', '1.5h', '2h', '2.5h'];

    document.querySelectorAll('[data-price-table]').forEach(function(container) {
        var spa = container.dataset.priceTable;
        var spaName = spa.charAt(0).toUpperCase() + spa.slice(1);
        var data = prices[spa];

        var html = '<div class="price-table-title">SPA ' + spaName + '</div>';
        html += '<table class="price-table"><thead><tr><th></th>';
        durations.forEach(function(d) { html += '<th>' + d + '</th>'; });
        html += '</tr></thead><tbody>';
        Object.keys(timeLabels).forEach(function(key) {
            html += '<tr><td>' + timeLabels[key] + '</td>';
            durations.forEach(function(d) { html += '<td>&euro;' + data[key][d] + '</td>'; });
            html += '</tr>';
        });
        html += '</tbody></table>';
        html += '<button class="back-flip-btn" data-i18n="backToCard">' + t.backToCard + '</button>';
        container.innerHTML = html;
    });

    initFlipCards();
}

function quickSelectSpa(spaKey) {
    var configSection = document.querySelector('.configurator');
    configSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(function() {
        var spaOption = document.querySelector('#step-spa .option[data-spa="' + spaKey + '"]');
        if (spaOption) spaOption.click();
    }, 600);
}


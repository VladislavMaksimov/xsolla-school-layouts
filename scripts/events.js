const cities = document.getElementById('cities');
const months = document.getElementById('months');
const pathEvents = "/data/events.json";
const pathMonths = "/data/months.json";

// Берёт информацию о событиях
const getEvents = () => {
    return fetch(pathEvents)
        .then(response => response.json())
        .then(events => { return events; });
}

// Рендерит одну карточку
const renderCard = (event) => {
    const cards = document.getElementsByClassName('container')[0];
    const card = document.createElement('div');
    const dayBlock = document.createElement('div');
    const bookmark = document.createElement("i");
    const eventName = document.createElement('h2');

    card.className = 'card';
    card.style.backgroundImage = 'URL(' + event.image + ')';
    dayBlock.className = 'day-block';
    dayBlock.innerText = event.date.split('.')[0]; /// !!!!!!!!!!!!!
    bookmark.classList.add("far", "fa-bookmark", "white-bookmark");
    eventName.className = 'event-name';
    eventName.innerText = event.name;

    card.append(dayBlock, eventName, bookmark);
    cards.appendChild(card);
}

// Добавляет месяц в множество
function getMonth(months, date) {
    const month = parseInt(date.split('.')[1]); // !!!!!!!!!!!!!!!!!!!

    switch (month) {
        case 1: return months.set(1, "January");
        case 2: return months.set(2, "February");
        case 3: return months.set(3, "March");
        case 4: return months.set(4, "April");
        case 5: return months.set(5, "May");
        case 6: return months.set(6, "June");
        case 7: return months.set(7, "July");
        case 8: return months.set(8, "August");
        case 9: return months.set(9, "September");
        case 10: return months.set(10, "October");
        case 11: return months.set(11, "November");
        case 12: return months.set(12, "December");
    }
}

// Заполняет селектор с месяцами
const fillMonths = (events) => {
    const months = new Map();
    Object.values(events).map((event) => {
        getMonth(months, event.date);
    });
    
    // сортирует месяцы по порядку от января к декабрю
    const monthsSorted = Array.from(months).sort((a, b) => a[0] > b[0] ? 1 : -1);
    monthsSorted.map(([num, month]) => {
        const monthOption = document.createElement('option');
        monthOption.innerText = month;
        monthOption.value = num;
        const monthSelect = document.getElementById('months');
        monthSelect.append(monthOption);
    })
}

// Заполняет селектор с городами
const fillCities = (events) => {
    const cities = new Set();
    Object.values(events).map((event) => {
        cities.add(event.city);
    });
    const citiesSorted = Array.from(cities).sort();

    citiesSorted.map(city => {
        const cityOption = document.createElement('option');
        cityOption.innerText = city;
        cityOption.value = city;
        const citySelect = document.getElementById('cities');
        citySelect.append(cityOption);
    })
}

// Рендерит все карточки
const renderCards = (events) => {
    Object.values(events).map((event) => {
        renderCard(event);
    })
}

// При загрузке страницы создаёт карточки
window.addEventListener('load', () => {
    getEvents()
        .then(events => {
            fillMonths(events);
            fillCities(events);
            renderCards(events);
        });
})

// Фильтрует карточки
const filterCards = (events) => {
    Object.values(events).map((event) => {
        
    })
}

// При изменении значений в селектах берёт карточки и прогоняет их через фильтр
const filter = () => {
    getEvents()
        .then((events) => filterCards(events));
}

//cities.addEventListener('change', () => filter());
//months.addEventListener('change', () => filter());
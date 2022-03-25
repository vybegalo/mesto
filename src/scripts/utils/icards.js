const arkhyz = new URL('../../images/places/arkhyz.jpg', import.meta.url);
const chelyabinsk = new URL('../../images/places/chelyabinsk-oblast.jpg', import.meta.url);
const ivanovo = new URL('../../images/places/ivanovo.jpg', import.meta.url);
const kamchatka = new URL('../../images/places/kamchatka.jpg', import.meta.url);
const kholmogorsky = new URL('../../images/places/kholmogorsky-rayon.jpg', import.meta.url);
const baikal = new URL('../../images/places/baikal.jpg', import.meta.url);


export const initialCards = [
    {
        name: 'Архыз',
        link: arkhyz,
        alt: 'Зелёные горы с заснеженными проталинами'
    },
    {
        name: 'Челябинская область',
        link: chelyabinsk,
        alt: 'Река с заснеженными берегами'
    },
    {
        name: 'Иваново',
        link: ivanovo,
        alt: 'Светящиееся окна жилых многоэтажек в сумерках'
    },
    {
        name: 'Камчатка',
        link: kamchatka,
        alt: 'Весеннее поле и гора в далеке'
    },
    {
        name: 'Холмогорский район',
        link: kholmogorsky,
        alt: 'Вид сверху на железную дорогу и лес'
    },
    {
        name: 'Байкал',
        link: baikal,
        alt: 'Голубая вода озера и скала'
    }
];
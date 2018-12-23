'use strict';

var TITLE = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var AccomodationType = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALO: 'Бунгало',
};
var CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];
var CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var Price = {
  MIN: 1000,
  MAX: 1000000
};
var Rooms = {
  MIN: 1,
  MAX: 5
};
var Guests = {
  MIN: 1,
  MAX: 20
};
var PositionX = {
  MIN: 50,
  MAX: 1150
};
var PositionY = {
  MIN: 130,
  MAX: 630
};
var COUNT_ADVERTS = 8;
var MyPin = {
  WIDTH: 50,
  HEIGHT: 70
};
/**
 * Возвращает случайное число в заданном диапазоне.
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @return {number} случайное число
 */
var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};
/**
 * Возращает 1 случайный элемент из массива.
 * @param {Array} arr - исходный массив
 * @return {string} случайный элемент массива
 */
var getRandomElementFromArray = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
/**
 * Возвращает случайное количество элементов из массива.
 * @param {Array} arr - исходный массив
 * @return {Array} randomArray - массив случайного количества элементов
 */
var getRandomLengthOfArray = function (arr) {
  var randomIndex = Math.floor(Math.random() * arr.length);
  return arr.slice(randomIndex);
};
/**
 * Возращает 1 случайное значение ключа из объекта.
 * @param {Object} obj - исходный объект
 * @return {string} случайное значение ключа объекта
 */
var getRandomProperty = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[Math.floor(Math.random() * keys.length)]];
};
/**
 * Возращает объект.
 * @param {number} numberImg - номер изображения
 * @param {string} housingTitle - заголовок объявления
 * @param {number} minPrice - число, минимальная цена
 * @param {number} maxPrice - число, максимальная цена
 * @param {string} type - строка с одним из четырёх фиксированных значений
 * @param {number} minRooms - число, минимальное количество комнат
 * @param {number} maxRooms - число, максимальное количество комнат
 * @param {number} minGuests - число, минимальное количество гостей
 * @param {number} maxGuests - число, максимальное количество гостей
 * @param {string} checkin - строка с одним из трёх фиксированных значений
 * @param {string} checkout - строка с одним из трёх фиксированных значений
 * @param {Array} features - массив строк случайной длины
 * @param {string} discription - пустая строка
 * @param {Array} photos - массив из строк
 * @return {Object} объект объявления
 */
var generateObject = function (
    numberImg,
    housingTitle,
    minPrice,
    maxPrice,
    type,
    minRooms,
    maxRooms,
    minGuests,
    maxGuests,
    checkin,
    checkout,
    features,
    discription,
    photos
) {
  var x = getRandomInt(PositionX.MIN, PositionX.MAX);
  var y = getRandomInt(PositionY.MIN, PositionY.MAX);
  var pinObj = {
    'author': {
      'avatar': 'img/avatars/user0' + numberImg + '.png',
    },
    'offer': {
      'title': getRandomElementFromArray(housingTitle),
      'address': x + ', ' + y,
      'price': getRandomInt(minPrice, maxPrice),
      'type': getRandomProperty(type),
      'rooms': getRandomInt(minRooms, maxRooms),
      'guests': getRandomInt(minGuests, maxGuests),
      'checkin': getRandomElementFromArray(checkin),
      'checkout': getRandomElementFromArray(checkout),
      'features': getRandomLengthOfArray(features),
      'discription': discription,
      'photos': photos
    },
    'location': {
      'x': x,
      'y': y
    }
  };
  return pinObj;
};
/**
 * Возращает массив объектов.
 * @param {number} countAdverts - количество объявлений
 * @return {Object[]} массив объявлений
 */
var generateArrayOfAdverts = function (countAdverts) {
  var advertsArray = [];
  for (var i = 1; i <= countAdverts; i++) {
    advertsArray.push(generateObject(
        i,
        TITLE,
        Price.MIN, Price.MAX,
        AccomodationType,
        Rooms.MIN, Rooms.MAX,
        Guests.MIN, Guests.MAX,
        CHECKIN,
        CHECKOUT,
        FEATURES,
        '',
        PHOTOS
    ));
  }
  return advertsArray;
};

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
/**
 * Клонирует шаблон, заполняет данными и возврощает.
 * @param {Object} pin - данные из объекта
 * @return {DOMNode} pinElement - метка объявления
 */
var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.style =
  'left: ' + (pin.location.x - MyPin.WIDTH / 2) + 'px; ' +
  'top: ' + (pin.location.y - MyPin.HEIGHT) + 'px;';
  return pinElement;
};
/**
 * Добавляет на карту метки
 * @param {Array} pins - массив данных
 */
var renderPinsOnMap = function (pins) {
  var fragment = document.createDocumentFragment();
  pins.forEach(function (pin) {
    fragment.appendChild(renderPin(pin));
  });
  mapPins.appendChild(fragment);
};
var pinsData = generateArrayOfAdverts(COUNT_ADVERTS);
renderPinsOnMap(pinsData);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
/**
 * Клонирует шаблон, заполняет данными и возврощает.
 * @param {Object} card - данные из объекта
 * @return {DOMNode} cardElement - метка объявления
 */
var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  var fragmentPhotos = document.createDocumentFragment();
  var fragmentFeatures = document.createDocumentFragment();
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent =
  card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent =
  'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

  cardElement.querySelector('.popup__photos').innerHTML = '';
  card.offer.photos.forEach(function (element) {
    var photo = document.createElement('img');

    photo.className = 'popup__photo';
    photo.src = element;
    photo.style = 'width: 45px; height: 40px';
    fragmentPhotos.appendChild(photo);
  });
  cardElement.querySelector('.popup__photos').appendChild(fragmentPhotos);

  cardElement.querySelector('.popup__features').innerHTML = '';
  card.offer.features.forEach(function (element) {
    var feature = document.createElement('li');

    feature.className = 'popup__feature popup__feature--' + element;
    fragmentFeatures.appendChild(feature);
  });
  cardElement.querySelector('.popup__features').appendChild(fragmentFeatures);

  cardElement.querySelector('.popup__description').textContent = card.offer.discription;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
};
/**
 * Добавляет на карту метки
 * @param {Array} indexPinsData - массив данных
 */
var renderCardOnMap = function (indexPinsData) {
  var card = renderCard(pinsData[indexPinsData]);
  document.querySelector('.map__filters-container').insertAdjacentElement('beforebegin', card);
};
renderCardOnMap(0);

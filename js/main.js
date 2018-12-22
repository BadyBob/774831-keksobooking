'use strict';

// Создать генератор неповтроящюхся рандомных чисел от 1 до 8

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
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 20;
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
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
* @param {number} price - число, случайная цена
* @param {string} type - строка с одним из четырёх фиксированных значений
* @param {number} rooms - число, случайное количество комнат
* @param {number} guests - число, случайное количество гостей
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
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    discription,
    photos
) {
  var x = getRandomInt(MIN_X, MAX_X);
  var y = getRandomInt(MIN_Y, MAX_Y);
  var pinObj = {
    'author': {
      'avatar': 'img/avatars/user0' + numberImg + '.png',
    },
    'offer': {
      'title': housingTitle,
      'address': x + ', ' + y,
      'price': price,
      'type': type,
      'rooms': rooms,
      'guests': guests,
      'checkin': checkin,
      'checkout': checkout,
      'features': features,
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
        getRandomElementFromArray(TITLE),
        getRandomInt(MIN_PRICE, MAX_PRICE),
        getRandomProperty(AccomodationType),
        getRandomInt(MIN_ROOMS, MAX_ROOMS),
        getRandomInt(MIN_GUESTS, MAX_GUESTS),
        getRandomElementFromArray(CHECKIN),
        getRandomElementFromArray(CHECKOUT),
        getRandomLengthOfArray(FEATURES),
        '',
        PHOTOS
    ));
  }
  return advertsArray;
};
generateArrayOfAdverts(COUNT_ADVERTS);
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
/**
* Клонирует шаблон, заполняет данными и возврощает.
* @param {Object} pin - анные из объекта
* @return {DOMNode} pinElement - метка объявления
*/
var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  pinElement.style =
  'left: ' + (pin.location.x - MyPin.WIDTH / 2) +
  'px; top: ' + (pin.location.y - MyPin.HEIGHT) + 'px;';
  return pinElement;
};
/**
* Добавляет на карту метки
*/
var renderPinsOnMap = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 1; i <= COUNT_ADVERTS; i++) {
    fragment.appendChild(renderPin(generateObject(
        i,
        getRandomElementFromArray(TITLE),
        getRandomInt(MIN_PRICE, MAX_PRICE),
        getRandomProperty(AccomodationType),
        getRandomInt(MIN_ROOMS, MAX_ROOMS),
        getRandomInt(MIN_GUESTS, MAX_GUESTS),
        getRandomElementFromArray(CHECKIN),
        getRandomElementFromArray(CHECKOUT),
        getRandomLengthOfArray(FEATURES),
        '',
        PHOTOS)));
  }
  mapPins.appendChild(fragment);
};
renderPinsOnMap();

// пункт 4

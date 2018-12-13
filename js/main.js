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
// var TYPE = [
//   'palace',
//   'flat',
//   'house',
//   'bungalo'
// ];
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
* @return {Object} объект объявления
*/
var generateObject = function () {
  var x = getRandomInt(MIN_X, MAX_X);
  var y = getRandomInt(MIN_Y, MAX_Y);
  return {
    'author': {
      'avatar': 'img/avatars/user01.png'
    },
    'offer': {
      'title': getRandomElementFromArray(TITLE),
      'addres': x + ', ' + y,
      'price': getRandomInt(MIN_PRICE, MAX_PRICE),
      'type': getRandomProperty(AccomodationType),
      'rooms': getRandomInt(MIN_ROOMS, MAX_ROOMS),
      'guests': getRandomInt(MIN_GUESTS, MAX_GUESTS),
      'checkin': getRandomElementFromArray(CHECKIN),
      'checkout': getRandomElementFromArray(CHECKOUT),
      'features': getRandomLengthOfArray(FEATURES),
      'discription': '',
      'photos': PHOTOS
    },
    'location': {
      'x': x,
      'y': y
    }
  };
};
/**
* Возращает массив объектов.
* @param {number} count - количество объявлений
* @return {Object[]} массив объявлений
*/
var generateArrayOfAdverts = function (count) {
  var advertsArray = [];
  for (var i = 0; i < count; i++) {
    advertsArray.push(generateObject());
  }
  return advertsArray;
};
generateArrayOfAdverts(COUNT_ADVERTS);
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
map.classList.remove('map--faded');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinElement = pinTemplate.cloneNode(true);
pinElement.querySelector('img').src =

mapPins.appendChild(pinElement);
// var drawPin = function (pin) {
//   var pinElement = pinTemplate.cloneNode(true);
//   var image = pinElement.querySelector('img');
//   pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y
// }

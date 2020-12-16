import { enableTranslation } from './translate';
import {API_KEY} from "./vars";
import {hasIsTranslated, setIsTranslated} from "./services/dom";

let LANGUAGE = '';

/**
 * 1) Тип неделимой еденицы - предложение / текст внутри тега / текст вместе с тегом
 * @type {string}
 */
let TERM = 'sentence'; //sentence | text_inside_tag | text_along_with_tag

/**
 * 2) Способ инициации перевода - после открытия страницы / при наведении на неделимую еденицу / при нажатии на неделимую еденицу
 * @type {string}
 */
let INITIATION_METHOD = 'onload'; //onload | hover | click

/**
 * 3) Разделитель предложений - точка / начало или конец тега / и то и другое
 * @type {string}
 */
let TERM_DELIMITER = 'dot'; //dot | start_or_end_tag | both

chrome.storage.sync.get({
  lang: 'ru'
}, function(items) {
  LANGUAGE = items.lang;
  if (!API_KEY) {
    console.error('There is no API key in options for translation.');
  }
});


chrome.extension.onMessage.addListener(function(msg) {
  if (msg.action === 'rerun' && !hasIsTranslated()) {
    setIsTranslated();//TODO: translate is running
    Promise.all([enableTranslation(API_KEY, LANGUAGE)]).then(() => {
      setIsTranslated();
    });
  }
});

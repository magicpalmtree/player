import detect from 'browser-detect';
import sweetAlert from 'sweetalert2';
import isMobile from 'ismobilejs';

export const browser = detect();

export const alert = createAlertMixin();

/** adds $alert method in vue prototype . */
export function create$alertMethod(Vue) {
    Vue.prototype.$alert = alert;
}

/** Creates an alert with presets inside of config parameter */
function createAlertMixin(config) {
    if (isMobile.any) {
        config = {
            ...config,
            toast: true,
            position: 'top-start',
            showCloseButton: true,
            grow: true
        };
    }
    return sweetAlert.mixin(config);
}

export function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search)
    return params.get(name)
}

export function appendPlaceholderColorToDom(color, className) {
    // Sources
    // http://usefulangle.com/post/39/adding-css-to-stylesheet-with-javascript
    // https://www.npmjs.com/package/detect-browser

    const browser = detect();

    let styleNode = document.getElementById('_' + className);

    if (!styleNode) {
        styleNode = document.createElement('style');
        styleNode.setAttribute('id', '_' + className);
        document.head.appendChild(styleNode);
    }

    let rule = false;

    const browserRules = {
        webkit:
            '.' +
            className +
            '::-webkit-input-placeholder {color: ' +
            color +
            '}',
        firefox: '.' + className + '::-moz-placeholder {color: ' + color + '}',
        ie: '.' + className + ':-ms-input-placeholder {color: ' + color + '}'
    };

    switch (browser.name) {
        case 'chrome':
            rule = browserRules.webkit;
            break;

        case 'opera':
            rule = browserRules.webkit;
            break;

        case 'safari':
            rule = browserRules.webkit;
            break;

        case 'firefox':
            rule = browserRules.firefox;
            break;

        case 'ie':
            rule = browserRules.ie;
            break;

        case 'edge':
            rule = browserRules.ie;
            break;
    }

    if (rule) {
        // Delete previous rules before adding new
        if (styleNode.sheet.cssRules.length) {
            styleNode.sheet.deleteRule(0);
        }
        styleNode.sheet.insertRule(rule, 0);
    } else {
        //console.warn('Browser not found for placeholder color setting');
    }
}

/** Checks if cookie is present
 * @param cookie {String} 'cookieName=cookieValue' string to be checked for
 * @param shouldSetCookie {Boolean} if set to true it will set the cookie if not found
 */
export function handleCookieCheck(cookie, shouldSetCookie = false) {
    const cookieArray = document.cookie.split(';');
    const cookieIsPresent = !!cookieArray.find(value => value.includes(cookie));
    if (!cookieIsPresent && shouldSetCookie) document.cookie = cookie;
    return cookieIsPresent;
}

/** Returns the value of the item stored in localStorage if any, and sets it's value to 2nd argument if provided.
 * @param {String} item - item name in storage
 * @param {Any} [newValue] - set as the value of item in the storage
 * @return {Any} returns whatever value is stored in storage
 */
export function checkAndUpdateLocalStorage(item, newValue) {
    const storage = window.localStorage;
    const itemValue = storage.getItem(item);

    if (typeof newValue !== 'undefined') storage.setItem(item, newValue);
    return itemValue;
}

/** returns a random string
 * @param {Number} length length of returned string
 */
export function randomString(length) {
    // https://www.thepolyglotdeveloper.com/2015/03/create-a-random-nonce-string-using-javascript/
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

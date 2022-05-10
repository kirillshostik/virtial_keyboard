import './styles.scss'
import { KEYS, KEY_ID } from './keys'

let keys = [], lang = 'en';

const BODY = document.querySelector('body');
const WRAPPER = document.createElement("div");
const HEADER = document.createElement("h1");
const TEXTAREA = document.createElement("textarea");
const KEYBOARD_CONTAINER = document.createElement("div");
HEADER.classList.add('heading');
HEADER.innerHTML = "VIRTUAL KEYBOARD";
WRAPPER.appendChild(HEADER);
WRAPPER.classList.add('wrapper');
TEXTAREA.classList.add('textarea_input');
KEYBOARD_CONTAINER.classList.add('keyboard_container');
WRAPPER.appendChild(TEXTAREA);
WRAPPER.appendChild(KEYBOARD_CONTAINER);
BODY.appendChild(WRAPPER)

function createKeys() {
    let keyLayout = KEYS[lang];

    keyLayout.forEach((key, index) => {
        const keyButton = document.createElement('button');
        keyButton.classList.add('key');
        keyButton.setAttribute('type', 'button');
        keyButton.setAttribute('id', KEY_ID[index]);

        switch (key) {
            case 'leftctrl':
            case 'rightctrl':
                keyButton.innerHTML = 'ctrl';
                break;
            case 'leftalt':
            case 'rightalt':
                keyButton.innerHTML = 'alt';
                break;
            case 'backtick':
                keyButton.textContent = '`';
                break;
            case 'up':
                keyButton.innerHTML = '▲';
                break;
            case 'left':
                keyButton.innerHTML = '◄';
                break;
            case 'down':
                keyButton.innerHTML = '▼';
                break;
            case 'right':
                keyButton.innerHTML = '►';
                break;
            case 'spacebar':
                keyButton.classList.add('spacebar');
                keyButton.innerHTML = ' ';
                break;
            case 'leftshift':
            case 'rightshift':
                keyButton.classList.add('wide');
                keyButton.innerHTML = 'shift';
                break;
            case 'backspace':
            case 'capslock':
            case 'enter':
                keyButton.classList.add('wide');
                keyButton.innerHTML = key;
                break;
            default:
                keyButton.innerHTML = key;
                break;

        }
        keyButton.addEventListener('click', (event) => { buttonClick(event.target.id) });
        KEYBOARD_CONTAINER.appendChild(keyButton)

    }
    );
    TEXTAREA.addEventListener('keydown', (event) => keyboardClick(event));
    TEXTAREA.addEventListener('keyup', (event) => keyboardClick(event));
}

createKeys();


let buttonClick = (node) => {
    let cursor = TEXTAREA.selectionStart + 1;
    let value = node,
        start = TEXTAREA.selectionStart,
        end = TEXTAREA.selectionEnd;
    switch (value) {
        case 'Delete':
            value = '';
            end = (TEXTAREA.selectionStart === TEXTAREA.selectionEnd)
                ? TEXTAREA.selectionEnd + 1
                : TEXTAREA.selectionEnd;
            break;
        case 'Backspace':
            value = '';
            start = (TEXTAREA.selectionStart === TEXTAREA.selectionEnd)
                ? TEXTAREA.selectionEnd - 1
                : TEXTAREA.selectionEnd;
            break;
        case 'Tab':
            value = '\t';
            break;
            case 'Space':
            value = ' ';
            break;
        case 'ArrowUp':
            value = '∧';
            break;
        case 'ArrowDown':
            value = '∨';
            break;
        case 'ArrowLeft':
            value = '<';
            break;
        case 'ArrowRight':
            value = '>';
            break;
        case 'Enter':
            value = '\n';
            break;
        default:
            value = KEYS[lang][KEY_ID.indexOf(value)];
            break;
    }
    if (start >= 0) TEXTAREA.setRangeText(value, start, end);
    if (node === 'Delete' || node === 'Backspace') {
        cursor = TEXTAREA.selectionStart;
    }
    TEXTAREA.focus();
    TEXTAREA.selectionStart = cursor
}

let keyboardClick = (event) => {
    if (event.type === 'keydown') {
        event.preventDefault();
    }
    let code = event.code;
    let keyCode = document.querySelectorAll('.key');
    KEY_ID.forEach((id, index) => {
        if (id === code) {
            document.querySelector(`#${code}`).classList.add('hover');
        }
    })

    if (event.type === 'keyup') {
        document.querySelector(`#${code}`).classList.remove('hover');
        buttonClick(event.code);
    }
}
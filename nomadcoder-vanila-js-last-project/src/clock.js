const clock = document.querySelector('.clock');
const second = document.querySelector(".second");
const meridiem = document.querySelector('.meridiem');
const AM = 'AM';
const PM = 'PM';

function setClock() {
    const now = new Date();
    clock.innerHTML = `${formHour(now.getHours())}:${formNumber(now.getMinutes())}`;
    second.innerHTML = `${formNumber(now.getSeconds())}`;
}

function formNumber(number) {
    return (Number(number) < 10) ? `0${number}` : `${number}`;
}

function formHour(number) {
    meridiem.innerHTML = Number(number) > 12 ? PM : AM;
    return formNumber(Number(number) > 12 ? Number(number) - 12 : Number(number));
}

function init() {
    setClock();
    setInterval(setClock, 1000);
    
}

init();
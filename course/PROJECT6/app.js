const body = document.body;
const switchBtn = document.querySelector('.switch');
const switchPara = document.querySelector('.color');

switchBtn.addEventListener('click', function() {
    let color1 = getRandom();
    let color2 = getRandom();
    let color3 = getRandom();

    const colorString = `rgb(${color1}, ${color2}, ${color3})`;

    body.style.backgroundColor = colorString;
    switchPara.innerText = colorString;
});

function getRandom() {
    return Math.floor(Math.random() * 256);
}
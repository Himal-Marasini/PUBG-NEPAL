(() => {
    const moboPlayer = document.getElementById('registerBtn__first');
    const emuPlayer = document.getElementById('registerBtn__second');

    moboPlayer.addEventListener('click', (e) => {
        location.href = 'http://localhost:3000/register/moboplayer';
    });
    emuPlayer.addEventListener('click', (e) => {
        location.href = 'http://localhost:3000/register/emuplayer';
    });

})();
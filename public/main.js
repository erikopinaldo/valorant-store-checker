document.querySelector('#clickMe').addEventListener('click', makeReq)
document.querySelector('#goHome').addEventListener('click', goHome)

function makeReq() {
    window.location.href = 'https://valorant-store-checker-evo.herokuapp.com/api/result'
}

function goHome() {
    console.log('HOME')
    window.location.href = '/'
}

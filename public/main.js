document.querySelector('#clickMe').addEventListener('click', makeReq)
document.querySelector('#goHome').addEventListener('click', goHome)

function makeReq() {
    window.location.href = 'http://localhost:8000/api/result'
}

function goHome() {
    console.log('HOME')
    window.location.href = '/'
}

document.querySelector('#clickMe').addEventListener('click', makeReq)

function makeReq() {
    window.location.href = 'http://localhost:8000/api/result'
}

document.querySelector('#clickMe').addEventListener('click', makeReq)

function hideLogin() {
    document.querySelector(".login").classList.add('hidden')
}

function showSkins() {
    document.querySelector(".skins").classList.remove('hidden')
}

async function makeReq(){
    try {
        const res = await fetch(`/api/result`)
        const data = await res.json()
        console.log(data);
        hideLogin();
        showSkins();
        document.querySelector("#skin1").textContent = data.result[0]
        document.querySelector("#skin2").textContent = data.result[1]
        document.querySelector("#skin3").textContent = data.result[2]
        document.querySelector("#skin4").textContent = data.result[3]
    }
    catch(error) {
        console.log(error)
    }
}

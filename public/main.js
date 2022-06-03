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
        document.querySelector("#skin1").textContent = data.result[0].displayName
        document.querySelector("#skinImage1").src = data.result[0].displayIcon
        document.querySelector("#skin2").textContent = data.result[1].displayName
        document.querySelector("#skinImage2").src = data.result[1].displayIcon
        document.querySelector("#skin3").textContent = data.result[2].displayName
        document.querySelector("#skinImage3").src = data.result[2].displayIcon
        document.querySelector("#skin4").textContent = data.result[3].displayName
        document.querySelector("#skinImage4").src = data.result[3].displayIcon
    }
    catch(error) {
        console.log(error)
    }
}

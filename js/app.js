let name = document.querySelector('#subject');
let submit = document.querySelector('button');
let en = document.querySelector('#en');
let fr = document.querySelector('#fr');
const trumpLoader = document.querySelector('marquee');


const trumpBaseUrl = 'https://api.whatdoestrumpthink.com/api/'

submit.addEventListener('click', async ()=> {
    let trump = null;
    trumpLoaderOn();
    try
    {

        const res = await fetch(`${trumpBaseUrl}v1/quotes/personalized?q=${name.value}`);
        trump = await res.json();
    } catch (e) {
        console.log(e);
    }

    try
    {
        let translated = await fetch("https://translate.argosopentech.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: trump.message,
                source: "en",
                target: "fr"
            }),
            headers: { "Content-Type": "application/json" }
        });
        translated = await  translated.json();
        trumpLoaderOff(await translated);
        en.innerText = translated.translatedText;
        fr.innerText = trump.message;
    } catch (e) {
        console.log(e);
    }


})

function trumpLoaderOn(loadedFlag){
    trumpLoader.style.opacity = '100%';
    en.innerText = '';
    fr.innerText = '';
}

function trumpLoaderOff(flagd){
    trumpLoader.style.opacity = '0%';
}
const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis;
isSpeaking = true;

voices();
function voices()
{
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : ""; //selecting Google US English (en-US) as default
        //options by passing voice name and voice lang
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option); //inserting option tag
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text)
{
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices())
    {
        if(voice.name === voiceList.value)
        {
            utternance.voice = voice;
        }
    }
    speechSynthesis.speak(utternance); //to speak
}
speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking)
        {
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            /*to check if speech is in the process of speaking in every 100ms, if not then set the value of isSpeaking to true and change the button text to original state*/
            setInterval(() =>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert to speech";
                }
                else{
                }
            }, 500);
            /*if isSpeaking is true then change it's value to false and resume the speech; else change it's value to true and pause the speech*/
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }
            else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }
        else{
            speechBtn.innerText = "Convert to speech";
        }

    }
});
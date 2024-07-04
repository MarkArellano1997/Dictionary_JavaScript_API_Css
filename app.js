const inputWord = document.getElementById('inputWord')
const buttonSearch = document.getElementById('buttonSearch')
const result = document.getElementById('result')
const form = document.getElementById('form')


form.addEventListener('submit', (e) => {
    e.preventDefault()
    search()
})

const search = () => {

    const searchItem = inputWord.value

    if (searchItem === '') {
        alert('Please Enter a Word to Search')
    }

    fetchDictionaryData(searchItem)

}

const fetchDictionaryData = async (searchItem) => {

    try {

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchItem}`)

        if (!response.ok) {
            throw new Error('Failed to fetch the data')
        }

        const data = await response.json()

        displayResult(data)

    } catch (error) {
        console.log(error);
        alert('An error Occurred.')
    }

}


const displayResult = (data) => {

    result.classList.add('information')

    result.innerHTML = `
            <h3>${data[0].word}</h3>
            <p><strong>Part of Speech: </strong>${data[0].meanings[0].partOfSpeech}</p>
            <p><strong>Definition: </strong>${data[0].meanings[0].definitions[0].definition}</p>
            <p><strong>Part of Speech: </strong>${data[0].meanings[1].partOfSpeech}</p>
            <p><strong>Definition: </strong>${data[0].meanings[1].definitions[0].definition}</p>
            <div class="divButton">
                <button id="buttonAudio"><i class="fa-solid fa-volume-high"></i></button>
            </div>
    `

    const buttonAudio = document.getElementById('buttonAudio')

    buttonAudio.addEventListener('click', () => {
    
        speak(`${data[0].word}`)
    })

}



const speak = (word) => {
    const speech = new SpeechSynthesisUtterance(word);
    speech.lang = 'en-US';
    speech.volume = 2;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}
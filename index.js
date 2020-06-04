$(document).ready(function() {
  $('#text').emojioneArea({
    pickerPosition: 'bottom',
    inline: true,
    tonesStyle: 'checkbox',
    placeholder: 'Type text or select emoji by pressing tab or click here --->',
    events: {
      emojibtn_click: function() {
        const speech = new SpeechSynthesisUtterance();
        let voices = [];
        const voicesDropdown = document.querySelector('[name="voice"]');
        const options = document.querySelectorAll(
          '[type="range"], [name="text"]'
        );
        const translateButton = document.querySelector('#translate');
        const stopButton = document.querySelector('#stop');

        speech.text = this.getText();
        this.hidePicker();
        //-----------------------------------------------------------------------------
        function listVoices() {
          voices = this.getVoices();
          voicesDropdown.innerHTML = voices
            .map(
              voice =>
                `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
            )
            .join('');
        }

        function selectVoice() {
          speech.voice = voices.find(voice => voice.name === this.value);
          toggle();
        }

        function toggle(restartTranslation = true) {
          speechSynthesis.cancel();
          if (restartTranslation) {
            speechSynthesis.speak(speech);
          }
        }

        function setOption() {
          speech[this.name] = this.value;
          toggle();
        }
        //-----------------------------------------------------------------------------

        speechSynthesis.addEventListener('voiceschanged', listVoices);
        voicesDropdown.addEventListener('change', selectVoice);
        options.forEach(option => option.addEventListener('change', setOption));
        translateButton.addEventListener('click', toggle);
        stopButton.addEventListener('click', () => toggle(false));
      }
    }
  });
});

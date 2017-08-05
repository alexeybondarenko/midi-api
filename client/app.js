(function() {
  'use strict';

  console.log('App is running');

  var midiAccess = null;
  navigator.requestMIDIAccess().then(onMidiAccessSuccess, onMidiAccessFailure);

  function onMidiAccessSuccess(access) {
    midiAccess = access;

    var inputs = midiAccess.inputs;
    var inputIterators = inputs.values();

    var firstInput = inputIterators.next().value;

    if (!firstInput) return;
    firstInput.onmidimessage = handleMidiMessage;
  }

  function onMidiAccessFailure(error) {
    console.log('Oops. Something were wrong with requestMIDIAccess', error.code);
  }

  function handleMidiMessage(e) {
    console.log(e);
  }


})();

const Patches = require('Patches');

(async function() { // Enables async/await in JS [part 1]

    let state01, state02, state03, state04;
    let setState01, setState02, setState03, setState04;

    [
        state01,
        state02,
        state03,
        state04,
        setState01,
        setState02,
        setState03,
        setState04
    ] = await Promise.all([
        Patches.outputs.getString('STATE_TXT_01'),
        Patches.outputs.getString('STATE_TXT_02'),
        Patches.outputs.getString('STATE_TXT_03'),
        Patches.outputs.getString('STATE_TXT_04'),
        Patches.outputs.getPulse('SET_STATE_01'),
        Patches.outputs.getPulse('SET_STATE_02'),
        Patches.outputs.getPulse('SET_STATE_03'),
        Patches.outputs.getPulse('SET_STATE_04')
    ]);

    state01 = state01.pinLastValue();
    state02 = state02.pinLastValue();
    state03 = state03.pinLastValue();
    state04 = state04.pinLastValue();

    let states = [state01, state02, state03, state04];

    setState01.subscribe(() => { updateState(1) })
    setState02.subscribe(() => { updateState(2) })
    setState03.subscribe(() => { updateState(3) })
    setState04.subscribe(() => { updateState(4) })

    updateState(1); // default state

    function updateState(stateNumber) {

        Patches.inputs.setBoolean('STATE_01', stateNumber === 1);
        Patches.inputs.setBoolean('STATE_02', stateNumber === 2);
        Patches.inputs.setBoolean('STATE_03', stateNumber === 3);
        Patches.inputs.setBoolean('STATE_04', stateNumber === 4);

        Patches.inputs.setString('STATE', states[stateNumber - 1]);
    }

})();
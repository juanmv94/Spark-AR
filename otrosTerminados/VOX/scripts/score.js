const Diagnostics = require('Diagnostics');
const Patches = require('Patches');
const Persistence = require('Persistence');
const Reactive = require('Reactive');

export class Score {

    constructor() {
        this.initialize();
    }

    async initialize() {
        this.highScore = await this.getHighScore();

        // fetch add/lose point amounts
        this.score = await Patches.outputs.getScalar('SCORE');

        // listen to save high score pulse
        let saveScore = await Patches.outputs.getPulse('SAVE_SCORE');
        saveScore.subscribe(() => this.onSaveScore());

        this.updateScore();
    }

    onSaveScore() {
        this.saveHighScore(); // save the high score (if applicable)
    }

    async getHighScore() {
        let highScore = 0;

        // Store a reference to the userScope
        const userScope = Persistence.local;

        try {
            // Fetch saved data (if any)
            const result = await userScope.get('score');

            // Check if we have a previously saved high score
            if (result !== null &&
                typeof result.highScore !== 'undefined') {

                // found a saved high score
                highScore = result.highScore;
            }
        } catch (ex) {
            // Diagnostics.log(ex);
        }

        return highScore;
    }

    async saveHighScore() {
    	let score = this.score.pinLastValue();

    	this.updateScore();

        if (score < this.highScore) {
            return; // score wasnt a high score, bail
        }

        // This score is the new high score
        this.highScore = score;

        // Create a JavaScript object to store the data
        const data = { highScore: this.highScore };

        // Store a reference to the userScope
        const userScope = Persistence.local;


        try {
            // Store the data
            await userScope.set('score', data);
        } catch (ex) {
            // Diagnostics.log(ex);
        }
    }

    updateScore() {
    	let score = this.score.pinLastValue();

    	// show current high score
        let gameOverText = `Máxima puntuación: ${this.highScore}`;


        // check for new high score
        if(score > this.highScore) {

        	gameOverText = '¡Nuevo record! ¡Viva España!';
        	// Send pulse that we have a new high score
        	Patches.inputs.setPulse('NEW_HIGH_SCORE', Reactive.once());
        }

        // send game over text
        Patches.inputs.setString('GAME_OVER_TEXT', gameOverText);
    }
};

export const s = new Score();
const Diagnostics = require('Diagnostics');
const Patches = require('Patches');
const Reactive = require('Reactive');
const Scene = require('Scene');
const Time = require('Time');

export class Spawner {

    constructor() {

        this.initialize();
    }

    async initialize() {

        this.active = false; // default switched off

        // spawn item every N seconds
        this.spawnEvery = (await Patches.outputs.getScalar('SPAWNER_ITEM_EVERY')).pinLastValue();

        // spawns gradually get N times faster over time
        this.maxSpeed = (await Patches.outputs.getScalar('SPAWNER_MAX_SPEED')).pinLastValue();

        // time taken to reach max speed (seconds)
        this.timeToReachMaxSpeed = (await Patches.outputs.getScalar('SPAWNER_TIME_TO_MAX_SPEED')).pinLastValue();

        // number of kinds of items to spawn
        this.numItems = (await Patches.outputs.getScalar('SPAWNER_NUM_ITEMS')).pinLastValue();

        // list of possible items to spawn
        this.items = Array.from(Array(this.numItems).keys());

        this.spawned = []; // used to track which items were spawned

        // listen to despawn events
        await this.initDespawnItem(0);
        await this.initDespawnItem(1);
        await this.initDespawnItem(2);
        await this.initDespawnItem(3);
        await this.initDespawnItem(4);
        await this.initDespawnItem(5);
        await this.initDespawnItem(6);
        await this.initDespawnItem(7);

        // listen to start spawner pulse
        let startSpawner = await Patches.outputs.getPulse('SPAWNER_START');
        startSpawner.subscribe(() => this.onStartSpawner());

        // listen to stop spawner pulse
        let stopSpawner = await Patches.outputs.getPulse('SPAWNER_STOP');
        stopSpawner.subscribe(() => this.onStopSpawner());
    }

    async initDespawnItem(itemIndex) {

        try {

            // listen to stop spawner pulse
            let despawnItem = await Patches.outputs.getPulse(`SPAWNER_DESPAWN_ITEM_0${itemIndex + 1}`);
            despawnItem.subscribe(() => this.despawn(itemIndex));

        } catch (ex) {
            // despawn event not used, ignore and continue
        }
    }

    onStartSpawner() {

        this.start(); // start the spawner
    }

    onStopSpawner() {

        this.stop(); // stop the spawner
    }

    start() {

        if (this.active === true) {
            return; // dont start if already started
        }

        this.active = true;

        this.timeStarted = new Date().getTime(); // note the time started

        this.spawn(); // start spawning items
    }

    stop() {

        this.active = false;

        if (this.spawnTimer) {

            Time.clearTimeout(this.spawnTimer); // stop the spawn timer
        }
    }

    spawn() {

        // check if we have any available items to spawn
        if (this.items.length > 0) {

            let spawnItem = this.sample(this.items); // get random spawn item

            this.spawned.push(spawnItem); // flag item as spawned

            this.removeFromArray(spawnItem, this.items); // remove item until despawn

            // send pulse to spawn item
            Patches.inputs.setPulse(`SPAWNER_SPAWN_ITEM_0${spawnItem + 1}`, Reactive.once());

        } else {

            // No items available to spawn, wait for next iteration
        }

        // setup timer for spawning next item
        this.spawnTimer = Time.setTimeout(() => {
            this.spawn();
        }, this.getSpawnTime());
    }

    despawn(spawnItem) {

        if (this.items.indexOf(spawnItem) !== -1) {
            return; // already despawned this item
        }

        if (this.spawned.indexOf(spawnItem) === -1) {
            return; // item not yet spawned
        }

        this.items.push(spawnItem); // add item back to spawnable list
        this.removeFromArray(spawnItem, this.spawned); // remove item from spawned list
    }

    getSpawnTime() {

        // get duration spawner has been running 
        let spawnerDuration = (new Date().getTime()) - this.timeStarted;

        // get time to max speed as a percentage
        let maxSpeedLerp = Math.min(spawnerDuration / (this.timeToReachMaxSpeed * 1000), 1);

        // using linear interpolation, get new speed
        let spawnSpeed = this.lerp(1, this.maxSpeed, maxSpeedLerp);

        // calculate spawn time and convert to milliseconds
        let spawnDuration = (this.spawnEvery / spawnSpeed) * 1000;

        return spawnDuration;
    }

    // linear interpolation
    lerp(value1, value2, amount) {

        amount = amount < 0 ? 0 : amount;
        amount = amount > 1 ? 1 : amount;
        return value1 + (value2 - value1) * amount;
    }

    // take random item from array
    sample(items) {

        var itemIndex = Math.floor(Math.random() * items.length)
        return items[itemIndex];
    }

    // remove item from array
    removeFromArray(item, array) {

        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
        }
    }
};

export const s = new Spawner();
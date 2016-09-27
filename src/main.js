

var Main = (function () {

    var current = 'start',
    firstRun = true,
    lastTick = new Date(0),
    tickRate = 33,
    changeState = function (state) {

        current = state;
        firstRun = true;

    },

    // state machine states.
    state = {

        start : {

            firstRun : function (time) {

                console.log('start state: setting up lock.');

                Lock.setLevel(1);
                Render.setup('gamearea');

            },

            tick : function (time) {

                changeState('run');

            }

        },

        run : {

            firstRun : function (time) {

                console.log('run state: first run.');

            },

            tick : function (time) {

                Lock.tick();

            }

        }

    },

    loop = function () {

        var now = new Date(),
        time = now - lastTick;

        requestAnimationFrame(loop);

        if (time >= tickRate) {

            if (firstRun) {

                state[current].firstRun(time);

                firstRun = false;

            }

            state[current].tick(time);
            Render.draw(current);

            lastTick = now;

        }

    };

    loop();

    return {

        changeState : function (state) {

            changeState(state)

        },

        getState : function () {

            return current;

        }

    };

}
    ());

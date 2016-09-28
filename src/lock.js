var Lock = (function () {

    // half distance function
    var halfDistance = function (total, pos1, pos2) {

        var d1 = Math.abs(pos1 - pos2),
        d2 = total - d1;

        return d1 < d2 ? d1 : d2;

    };

    // a single lock "Tumbler"
    var Tumbler = function (maxClicks, pinClick, start, clockwise) {

        this.click = start;
        this.pinClick = pinClick;
        this.maxClicks = maxClicks;
        this.clockwise = clockwise;

    };

    Tumbler.prototype.tick = function () {

        var deltaClick = -1;

        if (this.clockwise) {

            deltaClick = 1;

        }

        this.click += deltaClick;

        if (this.click > this.maxClicks) {

            this.click = this.click - this.maxClicks;

        }

        if (this.click < 0) {

            this.click = this.maxClicks + this.click;

        }

    }

    var Plug = {

        // the collection of Tumblers in the current lock plug
        tumblers : [],
        activeTumb : 0,

        canFail : false, // the player can fail
        fail : false, // the player failed
        touch : false,
        win : false,

        level : 1,

        d : 0, // distance of current click from tumbler
        tolerance : 4,
        cx : 160,
        cy : 120,
        minR : 25,
        maxR : 100

    };

    var setupPlug = function () {

        this.tumblers = [];

        this.tumblers.push(new Tumbler(40, 20, 4, true));
        this.tumblers.push(new Tumbler(80, 30, 70, false));
        this.tumblers.push(new Tumbler(120, 40, 0, true));

    };

    return {

        Plug : Plug,

        setLevel : function (level) {

            setupPlug.call(Plug);

            Plug.activeTumb = Plug.tumblers.length - 1;

        },

        tick : function () {

            var tumb = Plug.tumblers[Plug.activeTumb];

            // distnace to the pin.
            Plug.d = halfDistance(tumb.maxClicks, tumb.click, tumb.pinClick);

            if (!Plug.fail && !Plug.win) {

                tumb.tick();

            }

            if (Plug.d < Plug.tolerance) {

                Plug.canFail = true;

            } else {

                if (Plug.canFail) {

                    Plug.fail = true;

                }

            }

        },

        onTouch : function () {

            var tumb = Plug.tumblers[Plug.activeTumb];

            // the game is over because of fail or win
            if (Plug.fail || Plug.win) {

                console.log('reset to level: ' + Plug.level);

                this.setLevel(Plug.level);

                // game is still live
            } else {

                // can win if touch, else may fail
                if (Plug.d < Plug.tolerance) {

                    if (Plug.activeTumb > 0) {

                        Plug.activeTumb -= 1;

                        Plug.canFail = false;

                        // assuming player reached tumbler 0
                    } else {

                        Plug.win = true;

                    }

                } else {

                    Plug.fail = true;

                }

            }

            console.log('current d = ' + Plug.d);

        }

    };

}
    ());

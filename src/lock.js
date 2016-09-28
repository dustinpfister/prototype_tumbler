var Lock = (function () {

    // half distance function
    var halfDistance = function (total, pos1, pos2) {

        var d1 = Math.abs(pos1 - pos2),
        d2 = total - d1;

        return d1 < d2 ? d1 : d2;

    };

    // a single lock "Tumbler"
    var Tumbler = function (maxClicks, pinClick, start) {

        this.click = start;
        this.pinClick = pinClick;
        this.maxClicks = maxClicks;
        this.clockwise = false;

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

        d : 0, // distance of current click from tumbler
        tolerance : 4,
        cx : 160,
        cy : 120,
        minR : 25,
        maxR : 100

    };

    var setupPlug = function () {

        this.tumblers = [];

        this.tumblers.push(new Tumbler(10, 5, 0));
        this.tumblers.push(new Tumbler(20, 10, 0));
        this.tumblers.push(new Tumbler(80, 15, 0));

    };

    return {

        Plug : Plug,

        setLevel : function (level) {

            setupPlug.call(Plug);

            Plug.activeTumb = Plug.tumblers.length - 1;

        },

        tick : function () {

            var tumb = Plug.tumblers[Plug.activeTumb];

            if (!Plug.fail) {

                tumb.tick();

            }

            // distnace to the pin.
            Plug.d = halfDistance(tumb.maxClicks, tumb.click, tumb.pinClick);

            // can win if touch, else may fail
            if (Plug.d < Plug.tolerance) {

                Plug.canFail = true;

                if (Plug.touch) {

                    if (Plug.activeTumb > 0) {

					console.log('hello??');
					
                        Plug.activeTumb -= 1;

                        Plug.touch = false;
                        Plug.canFail = false;

                    }

                }

            } else {

                if (Plug.canFail) {

                    Plug.fail = true;

                }

                if (Plug.touch) {

                    Plug.fail = true;

                }

            }

        },

        onTouch : function () {

            console.log('current d = ' + Plug.d);

            Plug.touch = true;

        }

    };

}
    ());

var Lock = (function () {

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

        cx : 160,
        cy : 120,
        minR : 25,
        maxR : 100

    };

    var setupPlug = function () {

        this.tumblers = [];

        this.tumblers.push(new Tumbler(40, 90, 0));
        this.tumblers.push(new Tumbler(80, 90, 0));
        this.tumblers.push(new Tumbler(120, 90, 0));

    };

    return {

        Plug : Plug,

        setLevel : function (level) {

            setupPlug.call(Plug);

            Plug.activeTumb = Plug.tumblers.length - 1;

        },

        tick : function () {

            var tumb = Plug.tumblers[Plug.activeTumb];

            tumb.tick();

        }

    };

}
    ());

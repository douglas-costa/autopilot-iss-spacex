class Controller {
    constructor(decreaseButton, increaseButton) {
        this.decreaseButton = decreaseButton
        this.decreasing     = false
        this.increaseButton = increaseButton
        this.increasing     = false
    }

    decrease() {
        this.decreasing = true
        this.decreaseButton.click()
    }

    increase() {
        this.increasing = true
        this.increaseButton.click()
    }

    stop() {
    }

    adjust() {
    }
}

class LeftController extends Controller {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }

    stop() {
        this.increasing = false
        this.decreasing = false
    }

    adjust(error) {
        if (error < 0) {
            if (this.increasing) {
                return
            }

            this.increase()
        }
        else if (error > 0) {
            if (this.decreasing) {
                return
            }

            this.decrease()
        }
        else {
            this.stop()
        }
    }
}

class RightController extends Controller {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }

    stop() {
        if (this.increasing) {
            this.decreaseButton.click()
        }
        else if (this.decreasing) {
            this.increaseButton.click()
        }

        this.increasing = false
        this.decreasing = false
    }

    adjust(error) {
        if (error < 0) {
            if (this.decreasing) {
                return
            }

            this.decrease()
        }
        else if (error > 0) {
            if (this.increasing) {
                return
            }

            this.increase()
        }
        else {
            this.stop()
        }
    }
}

class XController extends LeftController {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }
}

class YController extends LeftController {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }
}

class ZController extends LeftController {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }
}

class RollController extends RightController {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }
}

class YAWController extends RightController {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }
}

class PitchController extends RightController {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }
}

(function() {
    let rollController  = new RollController($('#roll-left-button'), $('#roll-right-button'))
    let yawController   = new YAWController($('#yaw-left-button'), $('#yaw-right-button'))
    let pitchController = new PitchController($('#pitch-up-button'), $('#pitch-down-button'))

    let xController = new XController($('#translate-backward-button'), $('#translate-forward-button'))
    let yController = new YController($('#translate-left-button'), $('#translate-right-button'))
    let zController = new ZController($('#translate-down-button'), $('#translate-up-button'))

    setInterval(() => {
        let rollError  = parseFloat($('#roll > .error').innerText.slice(0, -1))
        let yawError   = parseFloat($('#yaw > .error').innerText.slice(0, -1))
        let pitchError = parseFloat($('#pitch > .error').innerText.slice(0, -1))

        let xDistance  = parseFloat($('#x-range > .distance').innerText.slice(0, -1))
        let yDistance  = parseFloat($('#y-range > .distance').innerText.slice(0, -1))
        let zDistance  = parseFloat($('#z-range > .distance').innerText.slice(0, -1))

        rollController.adjust(rollError)
        yawController.adjust(yawError)
        pitchController.adjust(pitchError)

        xController.adjust(xDistance)
        yController.adjust(yDistance)
        zController.adjust(zDistance)
    }, 250)
})()

class Controller {
    constructor(decreaseButton, increaseButton) {
        this.error          = 0
        this.decreaseButton = decreaseButton
        this.decreasing     = false
        this.increaseButton = increaseButton
        this.increasing     = false
        this.stopped        = false
    }

    setError(error) {
        this.error = error

        return this
    }

    decrease() {
        if (this.decreasing) {
            return
        }

        this.decreasing = true
        this.increasing = false
        this.decreaseButton.click()
    }

    increase() {
        if (this.increasing) {
            return
        }

        this.increasing = true
        this.decreasing = false
        this.increaseButton.click()
    }

    stop() {
        if (this.stopped) {
            return
        }

        if (this.increasing) {
            this.decreaseButton.click()
        }
        else if (this.decreasing) {
            this.increaseButton.click()
        }

        this.decreasing = false
        this.increasing = false
        this.stopped    = true
    }

    adjust() {}
}

class RollController extends Controller {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }

    adjust() {
        if (this.error >= -0.1 && this.error <= 0.1) {
            this.stop()
        }
        else if (this.error < 0) {
            this.decrease()
        }
        else if (this.error > 0) {
            this.increase()
        }
    }
}

class YAWController extends Controller {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }

    adjust() {
        if (this.error >= -0.1 && this.error <= 0.1) {
            this.stop()
        }
        else if (this.error < 0) {
            this.decrease()
        }
        else if (this.error > 0) {
            this.increase()
        }
    }
}

class PitchController extends Controller {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }

    adjust() {
        if (this.error >= -0.1 && this.error <= 0.1) {
            this.stop()
        }
        else if (this.error < 0) {
            this.increase()
        }
        else if (this.error > 0) {
            this.decrease()
        }
    }
}

class YController extends Controller {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }

    adjust() {
        if (this.error >= -0.1 && this.error <= 0.1) {
            this.stop()
        }
        else if (this.error < 0) {
            this.increase()
        }
        else if (this.error > 0) {
            this.decrease()
        }
    }
}

class ZController extends Controller {
    constructor(decreaseButton, increaseButton) {
        super(decreaseButton, increaseButton)
    }

    adjust() {
        if (this.error >= -0.1 && this.error <= 0.1) {
            this.stop()
        }
        else if (this.error < 0) {
            this.increase()
        }
        else if (this.error > 0) {
            this.decrease()
        }
    }
}

(function() {
    let rollController  = new RollController($('#roll-left-button'), $('#roll-right-button'))
    let yawController   = new YAWController($('#yaw-left-button'), $('#yaw-right-button'))
    let pitchController = new PitchController($('#pitch-down-button'), $('#pitch-up-button'))

    let yController     = new YController($('#translate-left-button'), $('#translate-right-button'))
    let zController     = new ZController($('#translate-down-button'), $('#translate-up-button'))

    setInterval(() => {
        let rollError  = parseFloat($('#roll > .error').innerText.slice(0, -1))
        let yawError   = parseFloat($('#yaw > .error').innerText.slice(0, -1))
        let pitchError = parseFloat($('#pitch > .error').innerText.slice(0, -1))

        let yDistance  = parseFloat($('#y-range > .distance').innerText.slice(0, -1))
        let zDistance  = parseFloat($('#z-range > .distance').innerText.slice(0, -1))

        rollController.setError(rollError).adjust()
        yawController.setError(yawError).adjust()
        pitchController.setError(pitchError).adjust()

        yController.setError(yDistance).adjust()
        zController.setError(zDistance).adjust()
    }, 500)
})()

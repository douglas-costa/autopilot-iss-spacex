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

(function() {
    const get = (target) => document.querySelector(target)

    let rollController  = new RollController(get('#roll-left-button'), get('#roll-right-button'))
    let yawController   = new YAWController(get('#yaw-left-button'), get('#yaw-right-button'))
    let pitchController = new PitchController(get('#pitch-up-button'), get('#pitch-down-button'))

    let xController = new XController(get('#translate-backward-button'), get('#translate-forward-button'))
    let yController = new YController(get('#translate-left-button'), get('#translate-right-button'))
    let zController = new ZController(get('#translate-down-button'), get('#translate-up-button'))

    let rollErrorElement  = get('#roll > .error')
    let yawErrorElement   = get('#yaw > .error')
    let pitchErrorElement = get('#pitch > .error')

    let xDistanceElement = get('#x-range > .distance')
    let yDistanceElement = get('#y-range > .distance')
    let zDistanceElement = get('#z-range > .distance')

    setInterval(() => {
        let rollError  = parseFloat(rollErrorElement.textContent.slice(0, -1))
        let yawError   = parseFloat(yawErrorElement.textContent.slice(0, -1))
        let pitchError = parseFloat(pitchErrorElement.textContent.slice(0, -1))

        let xDistance = parseFloat(xDistanceElement.textContent.slice(0, -1))
        let yDistance = parseFloat(yDistanceElement.textContent.slice(0, -1))
        let zDistance = parseFloat(zDistanceElement.textContent.slice(0, -1))

        rollController.adjust(rollError)
        yawController.adjust(yawError)
        pitchController.adjust(pitchError)

        xController.adjust(xDistance)
        yController.adjust(yDistance)
        zController.adjust(zDistance)
    }, 250)
})()

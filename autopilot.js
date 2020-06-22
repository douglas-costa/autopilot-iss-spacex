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

    adjust(distance) {
        if (distance < 0) {
            if (this.increasing) {
                return
            }

            this.increase()
        }
        else if (distance > 0) {
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
    const get = (target) => document.querySelector(target)

    let xController = new XController(get('#translate-backward-button'), get('#translate-forward-button'))
    let yController = new YController(get('#translate-left-button'), get('#translate-right-button'))
    let zController = new ZController(get('#translate-down-button'), get('#translate-up-button'))

    let rollController  = new RollController(get('#roll-left-button'), get('#roll-right-button'))
    let yawController   = new YAWController(get('#yaw-left-button'), get('#yaw-right-button'))
    let pitchController = new PitchController(get('#pitch-up-button'), get('#pitch-down-button'))

    let xDistanceElement = get('#x-range > .distance')
    let yDistanceElement = get('#y-range > .distance')
    let zDistanceElement = get('#z-range > .distance')

    let rollErrorElement  = get('#roll > .error')
    let yawErrorElement   = get('#yaw > .error')
    let pitchErrorElement = get('#pitch > .error')

    setInterval(() => {
        let xDistance = parseFloat(xDistanceElement.textContent)
        let yDistance = parseFloat(yDistanceElement.textContent)
        let zDistance = parseFloat(zDistanceElement.textContent)

        let rollError  = parseFloat(rollErrorElement.textContent)
        let yawError   = parseFloat(yawErrorElement.textContent)
        let pitchError = parseFloat(pitchErrorElement.textContent)

        xController.adjust(xDistance)
        yController.adjust(yDistance)
        zController.adjust(zDistance)
        
        rollController.adjust(rollError)
        yawController.adjust(yawError)
        pitchController.adjust(pitchError)
    }, 250)
})()

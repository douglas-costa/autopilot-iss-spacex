class Controller {
    constructor(config = {}) {
        this.error          = 0
        this.decreaseButton = config.decreaseButton
        this.decreasing     = false
        this.increaseButton = config.increaseButton
        this.increasing     = false
        this.stopped        = false
    }

    setError(error) {
        this.error = error
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
    constructor(config = {}) {
        super(config)
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
    constructor(config = {}) {
        super(config)
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
    let rollController = new RollController({
        decreaseButton: $('#roll-left-button'),
        increaseButton: $('#roll-right-button')
    })

    let yawController = new YAWController({
        decreaseButton: $('#yaw-right-button'),
        increaseButton: $('#yaw-left-button')
    })

    setInterval(() => {
        let rollError = parseFloat($('#roll > .error').innerText.slice(0, -1))
        let yawError  = parseFloat($('#yaw > .error').innerText.slice(0, -1))

        rollController.setError(rollError)
        rollController.adjust()

        yawController.setError(yawError)
        yawController.adjust()
    }, 500)
})()

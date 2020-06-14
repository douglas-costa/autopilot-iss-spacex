(function() {
    class RollController {
        constructor() {
            this.error              = 0
            this.leftButton         = $('#roll-left-button')
            this.leftButtonClicked  = false
            this.rightButton        = $('#roll-right-button')
            this.rightButtonClicked = false
        }

        getError() {
            return this.error
        }

        setError(error) {
            this.error = error
        }

        isRotatingToLeft() {
            return this.leftButtonClicked
        }

        isRotatingToRight() {
            return this.rightButtonClicked
        }

        rollToLeft() {
            if (this.isRotatingToLeft()) {
                return
            }

            this.leftButtonClicked  = true
            this.rightButtonClicked = false
            this.leftButton.click()
        }

        rollToRight() {
            if (this.isRotatingToRight()) {
                return
            }

            this.rightButtonClicked = true
            this.leftButtonClicked  = false
            this.rightButton.click()
        }

        stopRotating() {
            if (this.isRotatingToLeft()) {
                this.rightButton.click()
            }
            else if (this.isRotatingToRight()) {
                this.leftButton.click()
            }

            this.leftButtonClicked  = false
            this.rightButtonClicked = false
        }
    }

    let rollController = new RollController()

    setInterval(() => {
        let rollError = parseFloat($('#roll > .error').innerText.slice(0, -1))

        rollController.setError(rollError)

        if (rollController.getError() >= -0.1 && rollController.getError() <= 0.1) {
            rollController.stopRotating()
        }
        else if (rollController.getError() < 0) {
            rollController.rollToLeft();
        }
        else if (rollController.getError() > 0) {
            rollController.rollToRight();
        }
    }, 500)
})()

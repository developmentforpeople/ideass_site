
export {
	Observable,
	Observer,
}


/**
 *  Example of use:
 * 
 *  1. Set some "Observable subject", like an event, user action or value change:
 *  const observableOnChange = new Observable({ amount, months_frequency })
 *  observableOnChange.setState({ months_frequency })
 *  
 *  2. Create an "Observer for that observable" and subcribe to it:
 *  const observer = new Observer(observableOnChange);
 *  observer.subscribe(() => {
 *      this._calculate()
 *  });
 * 
 */
class Observable {
	constructor(state) {
		this.state = state
		this.observers = []
	}
	getState() {
		return this.state
	}
	setState(state) {
		this.state = state
		this.notifyObservers(this.state)
	}
	registerObserver(observer) {
		this.observers.push(observer)
	}
	unregisterObserver(observer) {
		this.observers = this.observers.filter(item => item !== observer)
	}
	notifyObservers(data) {
		this.observers.forEach(observer => observer.notify(data))
	}
}


class Observer {
	constructor(observable) {
		observable.registerObserver(this)
		this.subscribers = []
	}
	subscribe(subscriber) {
		this.subscribers.push(subscriber)
	}
	notify(data) {
		this.subscribers.forEach(subscriber => subscriber(data))
	}
}

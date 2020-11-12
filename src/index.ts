import {
	brew, log,
	readInput
} from "~/api"
type TInput = [string, string]
// eslint-disable-next-line no-constant-condition
while (true) {
	const {
		actions,
		opponent,
		player
	} = readInput()
	actions.sort((a, b) => b.price - a.price)
	log(`brew: ${actions[0].actionId} - price: ${actions[0].price}`)
	brew(actions[0].actionId)
}
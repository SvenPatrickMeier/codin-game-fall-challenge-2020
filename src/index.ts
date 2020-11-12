import {
	 log,
	readInput
} from "~/api"
type TInput = [string, string]
// eslint-disable-next-line no-constant-condition
while (true) {
	const {
		brew,
		opponentCast,
		learn,
		cast,
		opponent,
		player
	} = readInput()
	log(cast)
	brew.sort((a, b) => b.price - a.price)
	// log(`brew: ${actions[0].actionId} - price: ${actions[0].price}`)
	log(brew[0].actionId)
}
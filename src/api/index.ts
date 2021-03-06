/* eslint-disable @typescript-eslint/no-magic-numbers */
import { EAction, EInventory } from "~/api/enum"
declare function readline(): string
type TActionType = "CAST" | "BREW" | "OPPONENT_CAST" | "LEARN"
interface IAction {
	actionId: number
	actionType: EAction
	deltas: TInventory
	isCastable: boolean
	isRepeatable: boolean
	price: number
	taxCount: number
	tomeIndex: number
}
interface IBrew extends IAction {
	actionType: EAction.brew
}
interface ICast extends IAction {
	actionType: EAction.cast
}
interface IOpponentCast extends IAction {
	actionType: EAction.opponentCast
}
interface ILearn extends IAction {
	actionType: EAction.learn
}
interface IPlayerInfo {
	inventory: TInventory
	score: number
}
type TInventory = {
	[key in EInventory]: number
}
interface IInput {
	brew: IBrew[]
	cast: ICast[]
	learn: ILearn[]
	opponent: IPlayerInfo
	opponentCast: IOpponentCast[]
	player: IPlayerInfo
}
export const readInput = (): IInput => {
	/* the number of spells and recipes in play */
	const actionCount: number = parseInt(readline())
	const input: Omit<IInput, "player" | "opponent"> = {
		brew: [],
		cast: [],
		learn: [],
		opponentCast: []
	}
	for (let i = 0; i < actionCount; i++) {
		const inputs: string[] = readline().split(" ")
		const action: IAction = {
			actionId: parseInt(inputs[0]),
			actionType: inputs[1] as EAction,
			deltas: {
				[EInventory.blue]: parseInt(inputs[2]),
				[EInventory.orange]: parseInt(inputs[3]),
				[EInventory.green]: parseInt(inputs[4]),
				[EInventory.yellow]: parseInt(inputs[5])
			},
			isCastable: inputs[9] !== "0",
			isRepeatable: inputs[10] !== "0",
			price: parseInt(inputs[6]),
			taxCount: parseInt(inputs[8]),
			tomeIndex: parseInt(inputs[7])
		}
		switch (action.actionType) {
			case EAction.brew:
				input.brew.push(action as IBrew)
				break
			case EAction.learn:
				input.learn.push(action as ILearn)
				break
			case EAction.opponentCast:
				input.opponentCast.push(action as IOpponentCast)
				break
			case EAction.cast:
				input.cast.push(action as ICast)
				break
		}
	}
	for (let i = 0; i < 2; i++) {
		const inputs: string[] = readline().split(" ")
		const playerInfo: IPlayerInfo = {
			inventory: {
				[EInventory.blue]: parseInt(inputs[0]),
				[EInventory.orange]: parseInt(inputs[1]),
				[EInventory.green]: parseInt(inputs[2]),
				[EInventory.yellow]: parseInt(inputs[3])
			},
			score: parseInt(inputs[4])
		}
		if (i === 0) {
			input.player = playerInfo
		}
		else {
			input.opponent = playerInfo
		}
	}
	return input as IInput
}
export const brew = (output: number) => {
	/* eslint-disable-next-line  */
	console.log(`${EAction.brew} ${output}`)
}
export const writeOutput = (output: EAction) => {
	/* eslint-disable-next-line  */
	console.log(output)
}
export const log = (...outputs: any): void => {
	for (const output of outputs) {
		/* eslint-disable-next-line  */
		console.error(JSON.stringify(output, null, 2))
	}
}
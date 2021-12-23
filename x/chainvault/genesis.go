package chainvault

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/prampey/chain-vault/x/chainvault/keeper"
	"github.com/prampey/chain-vault/x/chainvault/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the cards
	for _, elem := range genState.CardsList {
		k.SetCards(ctx, elem)
	}

	// Set cards count
	k.SetCardsCount(ctx, genState.CardsCount)
	// this line is used by starport scaffolding # genesis/module/init
	k.SetParams(ctx, genState.Params)
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()
	genesis.Params = k.GetParams(ctx)

	genesis.CardsList = k.GetAllCards(ctx)
	genesis.CardsCount = k.GetCardsCount(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}

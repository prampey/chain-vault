package chainvault_test

import (
	"testing"

	keepertest "github.com/prampey/chain-vault/testutil/keeper"
	"github.com/prampey/chain-vault/testutil/nullify"
	"github.com/prampey/chain-vault/x/chainvault"
	"github.com/prampey/chain-vault/x/chainvault/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		CardsList: []types.Cards{
			{
				Id: 0,
			},
			{
				Id: 1,
			},
		},
		CardsCount: 2,
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ChainvaultKeeper(t)
	chainvault.InitGenesis(ctx, *k, genesisState)
	got := chainvault.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	require.ElementsMatch(t, genesisState.CardsList, got.CardsList)
	require.Equal(t, genesisState.CardsCount, got.CardsCount)
	// this line is used by starport scaffolding # genesis/test/assert
}

package keeper_test

import (
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/prampey/chain-vault/testutil/keeper"
	"github.com/prampey/chain-vault/testutil/nullify"
	"github.com/prampey/chain-vault/x/chainvault/keeper"
	"github.com/prampey/chain-vault/x/chainvault/types"
	"github.com/stretchr/testify/require"
)

func createNCards(keeper *keeper.Keeper, ctx sdk.Context, n int) []types.Cards {
	items := make([]types.Cards, n)
	for i := range items {
		items[i].Id = keeper.AppendCards(ctx, items[i])
	}
	return items
}

func TestCardsGet(t *testing.T) {
	keeper, ctx := keepertest.ChainvaultKeeper(t)
	items := createNCards(keeper, ctx, 10)
	for _, item := range items {
		got, found := keeper.GetCards(ctx, item.Id)
		require.True(t, found)
		require.Equal(t,
			nullify.Fill(&item),
			nullify.Fill(&got),
		)
	}
}

func TestCardsRemove(t *testing.T) {
	keeper, ctx := keepertest.ChainvaultKeeper(t)
	items := createNCards(keeper, ctx, 10)
	for _, item := range items {
		keeper.RemoveCards(ctx, item.Id)
		_, found := keeper.GetCards(ctx, item.Id)
		require.False(t, found)
	}
}

func TestCardsGetAll(t *testing.T) {
	keeper, ctx := keepertest.ChainvaultKeeper(t)
	items := createNCards(keeper, ctx, 10)
	require.ElementsMatch(t,
		nullify.Fill(items),
		nullify.Fill(keeper.GetAllCards(ctx)),
	)
}

func TestCardsCount(t *testing.T) {
	keeper, ctx := keepertest.ChainvaultKeeper(t)
	items := createNCards(keeper, ctx, 10)
	count := uint64(len(items))
	require.Equal(t, count, keeper.GetCardsCount(ctx))
}

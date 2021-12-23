package keeper_test

import (
	"testing"

	testkeeper "github.com/prampey/chain-vault/testutil/keeper"
	"github.com/prampey/chain-vault/x/chainvault/types"
	"github.com/stretchr/testify/require"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.ChainvaultKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}

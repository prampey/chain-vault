package keeper_test

import (
	"context"
	"testing"

	sdk "github.com/cosmos/cosmos-sdk/types"
	keepertest "github.com/prampey/chain-vault/testutil/keeper"
	"github.com/prampey/chain-vault/x/chainvault/keeper"
	"github.com/prampey/chain-vault/x/chainvault/types"
)

func setupMsgServer(t testing.TB) (types.MsgServer, context.Context) {
	k, ctx := keepertest.ChainvaultKeeper(t)
	return keeper.NewMsgServerImpl(*k), sdk.WrapSDKContext(ctx)
}

package keeper

import (
	"context"

    "github.com/prampey/chain-vault/x/chainvault/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)


func (k msgServer) AddCard(goCtx context.Context,  msg *types.MsgAddCard) (*types.MsgAddCardResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

    // TODO: Handling the message
    _ = ctx

	return &types.MsgAddCardResponse{}, nil
}

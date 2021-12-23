package keeper

import (
	"context"
	"strconv"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/prampey/chain-vault/x/chainvault/types"
)

func (k msgServer) AddCard(goCtx context.Context, msg *types.MsgAddCard) (*types.MsgAddCardResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	newCard := types.Cards{
		CardNo: msg.CardNo,
	}
	numCards := k.Keeper.AppendCards(ctx, newCard)
	return &types.MsgAddCardResponse{
		IdValue: strconv.FormatUint(numCards-1, 10),
	}, nil
}

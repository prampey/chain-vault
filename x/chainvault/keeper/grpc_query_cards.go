package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/cosmos/cosmos-sdk/types/query"
	"github.com/prampey/chain-vault/x/chainvault/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) CardsAll(c context.Context, req *types.QueryAllCardsRequest) (*types.QueryAllCardsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	var cardss []types.Cards
	ctx := sdk.UnwrapSDKContext(c)

	store := ctx.KVStore(k.storeKey)
	cardsStore := prefix.NewStore(store, types.KeyPrefix(types.CardsKey))

	pageRes, err := query.Paginate(cardsStore, req.Pagination, func(key []byte, value []byte) error {
		var cards types.Cards
		if err := k.cdc.Unmarshal(value, &cards); err != nil {
			return err
		}

		cardss = append(cardss, cards)
		return nil
	})

	if err != nil {
		return nil, status.Error(codes.Internal, err.Error())
	}

	return &types.QueryAllCardsResponse{Cards: cardss, Pagination: pageRes}, nil
}

func (k Keeper) Cards(c context.Context, req *types.QueryGetCardsRequest) (*types.QueryGetCardsResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(c)
	cards, found := k.GetCards(ctx, req.Id)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryGetCardsResponse{Cards: cards}, nil
}

package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/prampey/chain-vault/x/chainvault/types"
)

// GetCardsCount get the total number of cards
func (k Keeper) GetCardsCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.CardsCountKey)
	bz := store.Get(byteKey)

	// Count doesn't exist: no element
	if bz == nil {
		return 0
	}

	// Parse bytes
	return binary.BigEndian.Uint64(bz)
}

// SetCardsCount set the total number of cards
func (k Keeper) SetCardsCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.CardsCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

// AppendCards appends a cards in the store with a new id and update the count
func (k Keeper) AppendCards(
	ctx sdk.Context,
	cards types.Cards,
) uint64 {
	// Create the cards
	count := k.GetCardsCount(ctx)

	// Set the ID of the appended value
	cards.Id = count

	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CardsKey))
	appendedValue := k.cdc.MustMarshal(&cards)
	store.Set(GetCardsIDBytes(cards.Id), appendedValue)

	// Update cards count
	k.SetCardsCount(ctx, count+1)

	return count
}

// SetCards set a specific cards in the store
func (k Keeper) SetCards(ctx sdk.Context, cards types.Cards) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CardsKey))
	b := k.cdc.MustMarshal(&cards)
	store.Set(GetCardsIDBytes(cards.Id), b)
}

// GetCards returns a cards from its id
func (k Keeper) GetCards(ctx sdk.Context, id uint64) (val types.Cards, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CardsKey))
	b := store.Get(GetCardsIDBytes(id))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

// RemoveCards removes a cards from the store
func (k Keeper) RemoveCards(ctx sdk.Context, id uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CardsKey))
	store.Delete(GetCardsIDBytes(id))
}

// GetAllCards returns all cards
func (k Keeper) GetAllCards(ctx sdk.Context) (list []types.Cards) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.CardsKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()

	for ; iterator.Valid(); iterator.Next() {
		var val types.Cards
		k.cdc.MustUnmarshal(iterator.Value(), &val)
		list = append(list, val)
	}

	return
}

// GetCardsIDBytes returns the byte representation of the ID
func GetCardsIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

// GetCardsIDFromBytes returns ID in uint64 format from a byte array
func GetCardsIDFromBytes(bz []byte) uint64 {
	return binary.BigEndian.Uint64(bz)
}

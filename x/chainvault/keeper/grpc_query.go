package keeper

import (
	"github.com/prampey/chain-vault/x/chainvault/types"
)

var _ types.QueryServer = Keeper{}

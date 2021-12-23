package simulation

import (
	"math/rand"

	"github.com/prampey/chain-vault/x/chainvault/keeper"
	"github.com/prampey/chain-vault/x/chainvault/types"
	"github.com/cosmos/cosmos-sdk/baseapp"
	sdk "github.com/cosmos/cosmos-sdk/types"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
)

func SimulateMsgAddCard(
	ak types.AccountKeeper,
	bk types.BankKeeper,
	k keeper.Keeper,
) simtypes.Operation {
	return func(r *rand.Rand, app *baseapp.BaseApp, ctx sdk.Context, accs []simtypes.Account, chainID string,
	) (simtypes.OperationMsg, []simtypes.FutureOperation, error) {
		simAccount, _ := simtypes.RandomAcc(r, accs)
		msg := &types.MsgAddCard{
			Creator: simAccount.Address.String(),
		}

		// TODO: Handling the AddCard simulation

		return simtypes.NoOpMsg(types.ModuleName, msg.Type(), "AddCard simulation not implemented"), nil, nil
	}
}

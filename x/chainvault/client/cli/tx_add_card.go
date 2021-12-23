package cli

import (
    "strconv"
	
	"github.com/spf13/cobra"
    "github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/prampey/chain-vault/x/chainvault/types"
)

var _ = strconv.Itoa(0)

func CmdAddCard() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "add-card [card-no] [doe] [cvv]",
		Short: "Broadcast message addCard",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
      		 argCardNo := args[0]
             argDoe := args[1]
             argCvv := args[2]
            
			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgAddCard(
				clientCtx.GetFromAddress().String(),
				argCardNo,
				argDoe,
				argCvv,
				
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

    return cmd
}
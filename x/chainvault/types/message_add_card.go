package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgAddCard = "add_card"

var _ sdk.Msg = &MsgAddCard{}

func NewMsgAddCard(creator string, cardNo string, doe string, cvv string) *MsgAddCard {
  return &MsgAddCard{
		Creator: creator,
    CardNo: cardNo,
    Doe: doe,
    Cvv: cvv,
	}
}

func (msg *MsgAddCard) Route() string {
  return RouterKey
}

func (msg *MsgAddCard) Type() string {
  return TypeMsgAddCard
}

func (msg *MsgAddCard) GetSigners() []sdk.AccAddress {
  creator, err := sdk.AccAddressFromBech32(msg.Creator)
  if err != nil {
    panic(err)
  }
  return []sdk.AccAddress{creator}
}

func (msg *MsgAddCard) GetSignBytes() []byte {
  bz := ModuleCdc.MustMarshalJSON(msg)
  return sdk.MustSortJSON(bz)
}

func (msg *MsgAddCard) ValidateBasic() error {
  _, err := sdk.AccAddressFromBech32(msg.Creator)
  	if err != nil {
  		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
  	}
  return nil
}


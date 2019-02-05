export interface TransferItem {
  body: {
    transferFrom: {
      cardNumber: string;
      senderName: string;
      activeMonth: number;
      activeYear: number;
    };
    transferTo: {
      cardNumber: string;
    };
    amount: number;
  };
  date: Date;
  id: number;
}

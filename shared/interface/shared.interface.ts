export interface IDialogConfig {
  data: any | null;
  headerDialog: string;
  dialogType: 'Add' | 'Edit' | 'ResetPassword';
}

export interface IDeletePayload {
  idList: number[];
}

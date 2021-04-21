export const PROFILE_PIC_UPLOAD_LOADING = 'PROFILE_PIC_UPLOAD_LOADING';
export const PROFILE_PIC_UPLOAD_SUCCESS = 'PROFILE_PIC_UPLOAD_SUCCESS';
export const PROFILE_PIC_UPLOAD_FAIL = 'PROFILE_PIC_UPLOAD_FAIL';

export interface ProfilePicUploadLoading {
  type: typeof PROFILE_PIC_UPLOAD_LOADING;
}

export interface ProfilePicUploadSuccess {
  type: typeof PROFILE_PIC_UPLOAD_SUCCESS;
}

export interface ProfilePicUploadFail {
  type: typeof PROFILE_PIC_UPLOAD_FAIL;
  payload: string;
}

export type ProfilePicUploadDispatchTypes =
  | ProfilePicUploadLoading
  | ProfilePicUploadSuccess
  | ProfilePicUploadFail;

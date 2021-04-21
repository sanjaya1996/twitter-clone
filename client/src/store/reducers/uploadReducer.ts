import {
  ProfilePicUploadDispatchTypes,
  PROFILE_PIC_UPLOAD_FAIL,
  PROFILE_PIC_UPLOAD_LOADING,
  PROFILE_PIC_UPLOAD_SUCCESS,
} from '../actions/upload/uploadActionTypes';

interface DefaultStateI {
  loading?: boolean;
  error?: string;
  success?: boolean;
}
export const profilePicUploadReducer = (
  state: DefaultStateI = {},
  action: ProfilePicUploadDispatchTypes
): DefaultStateI => {
  switch (action.type) {
    case PROFILE_PIC_UPLOAD_LOADING:
      return { loading: true };
    case PROFILE_PIC_UPLOAD_SUCCESS:
      return { loading: false, success: true };
    case PROFILE_PIC_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

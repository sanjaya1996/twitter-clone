import { Dispatch } from 'react';
import * as api from '../../../api/index';
import { getApiErrorMessage } from '../../../utils/errorMessage';
import {
  ProfilePicUploadDispatchTypes,
  PROFILE_PIC_UPLOAD_FAIL,
  PROFILE_PIC_UPLOAD_LOADING,
  PROFILE_PIC_UPLOAD_SUCCESS,
} from './uploadActionTypes';

export const uploadProfilePic = (formData: FormData) => {
  return async (dispatch: Dispatch<ProfilePicUploadDispatchTypes>) => {
    try {
      dispatch({ type: PROFILE_PIC_UPLOAD_LOADING });

      await api.uploadProfilePicture(formData);

      dispatch({ type: PROFILE_PIC_UPLOAD_SUCCESS });
    } catch (err) {
      dispatch({
        type: PROFILE_PIC_UPLOAD_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};

export const uploadCoverPhoto = (formData: FormData) => {
  return async (dispatch: Dispatch<ProfilePicUploadDispatchTypes>) => {
    try {
      dispatch({ type: PROFILE_PIC_UPLOAD_LOADING });

      await api.uploadCoverPhoto(formData);

      dispatch({ type: PROFILE_PIC_UPLOAD_SUCCESS });
    } catch (err) {
      dispatch({
        type: PROFILE_PIC_UPLOAD_FAIL,
        payload: getApiErrorMessage(err),
      });
    }
  };
};

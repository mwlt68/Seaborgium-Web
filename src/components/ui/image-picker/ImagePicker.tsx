import { Box, IconButton } from "@mui/material";
import { styles } from "./ImagePickerStyle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import PhotoIcon from "@mui/icons-material/Photo";

export type ImageUrlHandleFunction = () => string | null;
export type ImageChangeHandleFunction = (file: File | undefined) => void;
export type ImageOperationProps = {
  imageUrlHandle: ImageUrlHandleFunction;
  imageChangeHandle: ImageChangeHandleFunction;
};

export function ImagePicker(props: ImageOperationProps) {
  return (
    <Box sx={styles.imagePickerContainer}>
      {!props.imageUrlHandle() ? (
        <ImagePick imageChangeHandle={props.imageChangeHandle} />
      ) : (
        <ImageShow
          imageUrlHandle={props.imageUrlHandle}
          imageChangeHandle={props.imageChangeHandle}
        />
      )}
    </Box>
  );
}

function ImageShow(props: {
  imageUrlHandle: Function;
  imageChangeHandle: Function;
}) {
  return (
    <Box sx={styles.imagePickedBox}>
      <Box
        component="img"
        src={props.imageUrlHandle()}
        sx={styles.imagePickerImageBox}
      />
      <Box sx={styles.imagePickerOperationBox}>
        <IconButton onClick={() => props.imageChangeHandle(undefined)}>
          <RemoveCircleIcon fontSize="large" color="error" />
        </IconButton>
        <ImageInput imageChangeHandle={props.imageChangeHandle}>
          <IconButton component="span">
            <PhotoIcon fontSize="large" color="success" />
          </IconButton>
        </ImageInput>
      </Box>
    </Box>
  );
}

function ImagePick(props: { imageChangeHandle: Function }) {
  return (
    <>
      <ImageInput imageChangeHandle={props.imageChangeHandle}>
        <IconButton
          color="success"
          sx={styles.imagePickerIconButton}
          component="span"
        >
          <AddPhotoAlternateIcon fontSize="large" />
        </IconButton>
      </ImageInput>
    </>
  );
}

function ImageInput(props: { imageChangeHandle: Function; children: any }) {
  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="select-image"
        style={{ display: "none" }}
        onChange={(e) => props.imageChangeHandle(e.target.files?.item(0))}
      />
      <label htmlFor="select-image">{props.children}</label>
    </>
  );
}

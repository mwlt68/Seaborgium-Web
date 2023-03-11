import { Box, IconButton } from "@mui/material";
import { styles } from "./ImagePickerStyle";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import PhotoIcon from "@mui/icons-material/Photo";
import { useState } from "react";

export function ImagePicker(props: {
  image?: File;
  imageChangeHandle: Function;
}) {
  return (
    <Box sx={styles.imagePickerContainer}>
      {!props.image ? (
        <ImagePick
          image={props.image}
          imageChangeHandle={props.imageChangeHandle}
        />
      ) : (
        <ImageShow
          image={props.image}
          imageChangeHandle={props.imageChangeHandle}
        />
      )}
    </Box>
  );
}

function ImageShow(props: { image?: File; imageChangeHandle: Function }) {
  
  const [f,sf] =useState<string|undefined>(undefined)

  const getImageURL = () =>{
    debugger;
    var reader = new FileReader();
    reader.readAsDataURL(props.image!);
    reader.onload = function () {
      var a  =reader.result?.toString();
      sf(a) ;
    };
    //return   props.image != null ? URL.createObjectURL(props.image) : null;
  }
  getImageURL();
  return (
    <Box sx={styles.imagePickedBox}>
      <Box
        component="img"
        src={f}
        sx={styles.imagePickerImageBox}
      />
      <Box sx={styles.imagePickerOperationBox}>
        <IconButton onClick={()=>props.imageChangeHandle(null)}>
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

function ImagePick(props: {
  image?: File | undefined;
  imageChangeHandle: Function;
}) {
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

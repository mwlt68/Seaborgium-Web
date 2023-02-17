import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import {
  Alert,
  AlertColor,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdvancedSideBar } from "../../components/ui/side-bar/AdvancedSideBar";
import { ProductResultModel } from "../../datas/response-models/ProductResultModel";
import { ProductApiService } from "../../services/api-service/ProductApiService";
import { DefaultTextConst } from "../../utils/consts/DefaultTextConst";
import { NavigationConsts } from "../../utils/consts/NavigationConsts";
import { AuthManager } from "../../utils/helpers/AuthManager";
import { styles } from "./ProductPageStyle";

export default function ProductPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [isSaveButtonLoading, setSaveButtonLoading] = useState(false);
  const [alertText, setAlertText] = useState<null | string>(null);
  const [alertColor, setAlertColor] = useState<AlertColor>("error");
  const [product, setProduct] = useState<ProductResultModel>(
    new ProductResultModel()
  );
  const productAddingSuccessMessage =
    "Congratulations, your product addition was successful.";
  const productEditingSuccessMessage =
    "Congratulations, your product editing was successful.";
  const navigate = useNavigate();
  let { id } = useParams();

  const isEditingPage = (): boolean =>
    product?.id != null && product.id > 0;

  const isAddingPage = (): boolean => !isEditingPage();

  const getSaveSuccessMessage = (): string =>
    isAddingPage() ? productAddingSuccessMessage : productEditingSuccessMessage;

  function getProductsHandle() {
    if (id) {
      ProductApiService.GetProduct(id)
        .then((res) => {
          if (res?.result && !res.hasException) {
            setProduct(res.result);
          }
        })
        .catch((err: Error) => {
          console.log("Page loading error : " + err.message);
        })
        .finally(() => {
          if (AuthManager.hasNotToken()) {
            navigate(NavigationConsts.LoginPage);
          } else {
            setPageLoading(false);
          }
        });
    } else {
      setPageLoading(false);
    }
  }

  useEffect(() => {
    getProductsHandle();
  });

  function productSaveHandle() {
    setSaveButtonLoading(true);
    let productSave;
    if (isAddingPage()) productSave = ProductApiService.insert(product);
    else productSave = ProductApiService.update(product);
    productSave
      .then((productResult) => {
        if (productResult?.result && !productResult.hasException) {
          if (isAddingPage()) {
            const newUrl = [
              NavigationConsts.ProductAddPage,
              productResult.result.id,
            ].join("/");
            window.history.replaceState(null, DefaultTextConst.Empty, newUrl);
          }
          setProduct(productResult.result);
          setAlertText(getSaveSuccessMessage());
          setAlertColor("success");
        } else if (
          productResult.hasException &&
          productResult.exceptionContent != null
        ) {
          setAlertColor("error");
          setAlertText(productResult.exceptionContent!);
        }
      })
      .catch((err: Error) => {
        console.log("Page loading error : " + err.message);
      })
      .finally(() => {
        setSaveButtonLoading(false);
      });
  }

  function handleProductChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <AdvancedSideBar isLoading={pageLoading}>
      <>
        <PageContent
          productModel={product}
          handleChange={handleProductChange}
          isAddingPage={isAddingPage()}
          saveButtonHandle={productSaveHandle}
          isSaveButtonLoading={isSaveButtonLoading}
        />
        <AlertSnackBar
          alertText={alertText}
          closeHandle={() => setAlertText(null)}
          severity={alertColor}
        />
      </>
    </AdvancedSideBar>
  );
}

function AlertSnackBar(props: {
  alertText: string | null;
  closeHandle: Function;
  severity?: AlertColor;
  autoHideDuration?: number;
}) {
  return (
    <Snackbar
      open={props.alertText != null}
      autoHideDuration={props.autoHideDuration ?? 4000}
      onClose={(e) => props.closeHandle()}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        severity={props.severity ?? "error"}
        sx={{ width: "100%", whiteSpace: "pre-line" }}
      >
        {props.alertText}
      </Alert>
    </Snackbar>
  );
}

function PageContent(props: {
  productModel: ProductResultModel;
  handleChange: Function;
  saveButtonHandle: Function;
  isAddingPage: boolean;
  isSaveButtonLoading: boolean;
}) {
  return (
    <Box sx={styles.container}>
      <ProductCard
        productModel={props.productModel}
        handleChange={props.handleChange}
        isAddingPage={props.isAddingPage}
        saveButtonHandle={props.saveButtonHandle}
        isSaveButtonLoading={props.isSaveButtonLoading}
      />
    </Box>
  );
}
function ProductCard(props: {
  productModel: ProductResultModel;
  handleChange: Function;
  isAddingPage: boolean;
  saveButtonHandle: Function;
  isSaveButtonLoading: boolean;
}) {
  return (
    <Card sx={styles.productCard}>
      <ProductCardMedia />
      <ProductCardContent
        productModel={props.productModel}
        handleChange={props.handleChange}
        isAddingPage={props.isAddingPage}
      />
      <ProductCardActions
        isAddingPage={props.isAddingPage}
        saveButtonHandle={props.saveButtonHandle}
        isLoading={props.isSaveButtonLoading}
      />
    </Card>
  );
}

function ProductCardActions(props: {
  isAddingPage: boolean;
  saveButtonHandle: Function;
  isLoading: boolean;
}) {
  return (
    <CardActions sx={styles.cardActions}>
      <LoadingButton
        loading={props.isLoading}
        variant="contained"
        loadingPosition="start"
        onClick={(x) => props.saveButtonHandle()}
        style={styles.saveButton}
      >
        {props.isAddingPage ? "Create" : "Save"}
      </LoadingButton>
    </CardActions>
  );
}

function ProductCardMedia() {
  return (
    <CardMedia
      component="img"
      height="250"
      image="https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20222/6012505/v1/l_20222-w2cg02z8-rfh-96-81-93-190_a.jpg"
      sx={styles.productCardImage}
    />
  );
}

function ProductCardContent(props: {
  productModel: ProductResultModel;
  handleChange: Function;
  isAddingPage: boolean;
}) {
  return (
    <CardContent sx={styles.productCardContent}>
      <NameField
        productName={props.productModel.name}
        handleChange={props.handleChange}
      />
      <BrandField
        brand={props.productModel.brand}
        handleChange={props.handleChange}
      />
      <CategoryField
        category={props.productModel.category}
        handleChange={props.handleChange}
      />
      <PriceField
        price={props.productModel.price}
        handleChange={props.handleChange}
      />
      <StockQuantityField
        stockQuantity={props.productModel.stockQuantity}
        handleChange={props.handleChange}
        isAddingPage={props.isAddingPage}
      />
    </CardContent>
  );
}

function NameField(props: {
  productName: string | null;
  handleChange: Function;
}) {
  return (
    <TextField
      name="name"
      label="Name"
      type="search"
      value={props.productName ?? ""}
      onChange={(event) => props.handleChange(event)}
      variant="standard"
      multiline
      maxRows={2}
      inputProps={{ maxLength: 250 }}
      InputLabelProps={{ shrink: true }}
    />
  );
}

function BrandField(props: { brand: string | null; handleChange: Function }) {
  return (
    <TextField
      name="brand"
      label="Brand Name"
      type="search"
      variant="standard"
      value={props.brand ?? ""}
      onChange={(event) => props.handleChange(event)}
      inputProps={{ maxLength: 150 }}
      InputLabelProps={{ shrink: true }}
    />
  );
}

function CategoryField(props: {
  category: string | null;
  handleChange: Function;
}) {
  return (
    <TextField
      name="category"
      label="Category Name"
      type="search"
      variant="standard"
      value={props.category ?? ""}
      onChange={(event) => props.handleChange(event)}
      inputProps={{ maxLength: 150 }}
      InputLabelProps={{ shrink: true }}
    />
  );
}
function PriceField(props: { price: number; handleChange: Function }) {
  return (
    <TextField
      name="price"
      label="Price"
      variant="standard"
      type="number"
      value={props.price}
      onChange={(event) => {
        var val =
          parseFloat(event.target.value) < 0
            ? (event.target.value = "0")
            : event.target.value;
        event.target.value = val;
        props.handleChange(event);
      }}
    />
  );
}

function StockQuantityField(props: {
  isAddingPage: boolean;
  stockQuantity: number;
  handleChange: Function;
}) {
  if (props.isAddingPage) {
    return (
      <TextField
        name="stockQuantity"
        label="Stock Quantity"
        type="number"
        variant="standard"
        value={props.stockQuantity}
        onChange={(event) => {
          const val = event.target.value
            .replace(".", "")
            .replace("-", "")
            .replace("+", "");
          event.target.value = val;
          props.handleChange(event);
        }}
      />
    );
  } else return null;
}

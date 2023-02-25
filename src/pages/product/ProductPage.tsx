import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import {
  AlertColor,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AdvancedSideBar } from "../../components/ui/side-bar/AdvancedSideBar";
import { BaseResponseModel } from "../../datas/response-models/BaseResponseModel";
import { ProductResultModel } from "../../datas/response-models/ProductResultModel";
import ApiRequestCatchAndFinalize from "../../services/api-service/ApiRequestCatchAndFinalize";
import { ProductApiService } from "../../services/api-service/ProductApiService";
import { DefaultTextConst } from "../../utils/consts/DefaultTextConst";
import {
  NavigationConsts,
  QueryParameterConsts,
} from "../../utils/consts/NavigationConsts";
import { styles } from "./ProductPageStyle";

export default function ProductPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLoading, setPageLoading] = useState(true);
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [alertText, setAlertText] = useState<undefined | string>(undefined);
  const [alertColor, setAlertColor] = useState<AlertColor>("error");
  const [product, setProduct] = useState<ProductResultModel>(
    new ProductResultModel()
  );

  const navigate = useNavigate();

  const isEditingPage = (): boolean => product?.id != null && product.id > 0;

  const isAddingPage = (): boolean => !isEditingPage();

  const getSaveSuccessMessage = (): string =>
    isAddingPage() ? DefaultTextConst.ProductAddingSuccessMessage : DefaultTextConst.ProductEditingSuccessMessage;

  function getProductHandle() {
    const productId = searchParams.get(QueryParameterConsts.ProductPage.Id);
    if (productId) {
      ApiRequestCatchAndFinalize(
        ProductApiService.get(productId),
        getProductResponseHandle,
        setPageLoading,
        navigate
      );
    } else {
      setPageLoading(false);
    }
  }
  const getProductResponseHandle = (
    res: BaseResponseModel<ProductResultModel | null>
  ) => {
    if (res?.result && !res.hasException) {
      setProduct(res.result);
    }
  };
  useEffect(() => {
    getProductHandle();
  }, []);

  function productSaveHandle() {
    setButtonLoading(true);
    let productSave;
    if (isAddingPage()) productSave = ProductApiService.insert(product);
    else productSave = ProductApiService.update(product);
    ApiRequestCatchAndFinalize(
      productSave,
      productSaveResponseHandle,
      setButtonLoading,
      navigate
    );
  }

  const productSaveResponseHandle = (
    productResult: BaseResponseModel<ProductResultModel | null>
  ) => {
    if (productResult?.result && !productResult.hasException) {
      if (isAddingPage()) {
        searchParams.set(
          QueryParameterConsts.ProductPage.Id,
          productResult.result.id!.toString()
        );
        setSearchParams(searchParams);
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
  };

  function productDeleteHandle() {
    if (product.id) {
      setButtonLoading(true);
      ApiRequestCatchAndFinalize(
        ProductApiService.delete(product.id!.toString()),
        productDeleteResponseHandle,
        setButtonLoading,
        navigate
      );
    }
  }

  const productDeleteResponseHandle = async (
    productResult: BaseResponseModel<boolean | null>
  ) => {
    debugger;
    if (productResult?.result && !productResult.hasException) {
      debugger;
      setAlertText(DefaultTextConst.ProductDeleteSuccessMessage);
      setAlertColor("success");
      await new Promise((resolve) =>
        setTimeout(() => {
          navigate(NavigationConsts.HomePage);
        }, 2000)
      );
    } else if (
      productResult.hasException &&
      productResult.exceptionContent != null
    ) {
      setAlertColor("error");
      setAlertText(productResult.exceptionContent!);
    }
  };

  function handleProductChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  }
  debugger;
  return (
    <AdvancedSideBar
      isLoading={pageLoading}
      alertColor={alertColor}
      alertText={alertText}
      alertCloseHandler={() => setAlertText(undefined)}
    >
      <PageContent
        productModel={product}
        handleChange={handleProductChange}
        isAddingPage={isAddingPage()}
        saveButtonHandle={productSaveHandle}
        isSaveButtonLoading={isButtonLoading}
        deleteButtonHandle={productDeleteHandle}
      />
    </AdvancedSideBar>
  );
}

function PageContent(props: {
  productModel: ProductResultModel;
  handleChange: Function;
  saveButtonHandle: Function;
  deleteButtonHandle: Function;
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
        deleteButtonHandle={props.deleteButtonHandle}
      />
    </Box>
  );
}
function ProductCard(props: {
  productModel: ProductResultModel;
  handleChange: Function;
  isAddingPage: boolean;
  saveButtonHandle: Function;
  deleteButtonHandle: Function;
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
        deleteButtonHandle={props.deleteButtonHandle}
        isLoading={props.isSaveButtonLoading}
      />
    </Card>
  );
}

function ProductCardActions(props: {
  isAddingPage: boolean;
  saveButtonHandle: Function;
  deleteButtonHandle: Function;
  isLoading: boolean;
}) {
  return (
    <CardActions
      sx={
        props.isAddingPage
          ? styles.addingCardActions
          : styles.editingCardActions
      }
    >
      {!props.isAddingPage && (
        <LoadingButton
          loading={props.isLoading}
          variant="contained"
          loadingPosition="start"
          onClick={(x) => props.deleteButtonHandle()}
          style={styles.deleteButton}
        >
          Delete
        </LoadingButton>
      )}

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

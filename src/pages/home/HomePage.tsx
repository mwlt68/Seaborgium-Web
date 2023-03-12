import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { ProductResultModel } from "../../datas/response-models/ProductResultModel";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import { styles } from "./HomePageStyle";
import { useEffect, useState } from "react";
import { ProductApiService } from "../../services/api-service/ProductApiService";
import { AuthManager } from "../../utils/helpers/AuthManager";
import { useNavigate } from "react-router-dom";
import {
  NavigationConsts,
  QueryParameterConsts,
} from "../../utils/consts/NavigationConsts";
import { AdvancedSideBar } from "../../components/ui/side-bar/AdvancedSideBar";
import { UrlHelper } from "../../utils/helpers/UrlHelper";
import { ImageHelper } from "../../utils/helpers/ImageHelper";
import ImageNotPreview from "../../assets/lotties/image-not-preview.json"
import Lottie from "lottie-react";

export default function HomePage() {
  const navigate = useNavigate();
  const [pageLoading, setPageLoading] = useState(true);
  const [pageLoadingError, setPageLoadingError] = useState<null | string>(null);
  const [products, setProducts] = useState<ProductResultModel[]>([]);

  function getProducts() {
    ProductApiService.getAll()
      .then((res) => {
        if (res?.result && !res.hasException) {
          setProducts(res.result);
        } else {
          setPageLoadingError(res?.exceptionContent ?? null);
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
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <AdvancedSideBar errorMessage={pageLoadingError} isLoading={pageLoading}>
      <PageContent />
    </AdvancedSideBar>
  );

  function PageContent() {
    return (
      <Box sx={styles.container}>
        <Card sx={styles.headerCart}>
          <ProductAddingButton />
        </Card>
        <Box sx={styles.content}>
          {products.map((x) => (
            <ProductCart product={x} />
          ))}
        </Box>
      </Box>
    );
  }

  function ProductAddingButton() {
    return (
      <Button
        onClick={(event) => {
          navigate(NavigationConsts.ProductPage);
        }}
        style={styles.headerCartAddButton}
        variant="contained"
        startIcon={<AddCircleIcon />}
      >
        Product Add
      </Button>
    );
  }

  function productCardClickHandle(id: number) {
    const productDetailUrl = UrlHelper.Create(
      NavigationConsts.ProductPage,
      QueryParameterConsts.ProductPage.Id,
      id.toString()
    );
    navigate(productDetailUrl);
  }

  function ProductCart(props: { product: ProductResultModel }) {
    return (
      <CardActionArea
        key={props.product.id}
        sx={styles.productCard}
        onClick={(event) => {
          productCardClickHandle(props.product.id ?? -1);
        }}
      >
        <Card>
          <ProductCardMedia product={props.product} />
          <ProductCardContent product={props.product} />
          <ProductCardAction productPrice={props.product.price} />
        </Card>
      </CardActionArea>
    );
  }

  function ProductCardMedia(props: { product: ProductResultModel }) {
    const imageUrl = ImageHelper.Get(props.product.image,props.product.imageType);
    if(imageUrl != null )
    return (
      <CardMedia
      component="img"
      height={styles.productImage.height}
      image= {imageUrl}
      sx={styles.productCardImage}
      />
      );
    else 
    return(
      <Lottie style={{ height: styles.productImage.height }} animationData={ImageNotPreview} loop={true}/>
    )
  }

  function ProductCardContent(props: { product: ProductResultModel }) {
    return (
      <CardContent sx={styles.productCardContent}>
        <Typography
          noWrap
          gutterBottom
          variant="h5"
          component="div"
          sx={styles.contentTypography}
        >
          {props.product.category}
        </Typography>
        <Typography noWrap variant="subtitle1" sx={styles.contentTypography}>
          {props.product.brand}
        </Typography>
        <Typography
          noWrap
          variant="body2"
          color="text.secondary"
          sx={styles.contentTypography}
        >
          {props.product.name}
        </Typography>
      </CardContent>
    );
  }

  function ProductCardAction(props: { productPrice: number | undefined }) {
    return (
      <CardActions sx={styles.productCardAction}>
        <Typography variant="subtitle1" color="green">
          {props.productPrice} ₺
        </Typography>
        <EditIcon color="inherit" />
      </CardActions>
    );
  }
}

import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import SideBar from "../../components/ui/side-bar/SideBar";
import { ProductResultModel } from "../../datas/response-models/ProductResultModel";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { styles } from "./HomePageStyle";
import { useEffect, useState } from "react";
import { ProductApiService } from "../../services/api-service/ProductApiService";
import { AuthManager } from "../../utils/helpers/AuthManager";
import { useNavigate } from "react-router-dom";
import { NavigationConsts } from "../../utils/consts/NavigationConsts";
import PageLoading from "../../components/ui/page-loading/PageLoading";
import errorAnimation from "../../assets/lotties/error.json"
import Lottie from "lottie-react";


export default function HomePage() {
  
  const navigate = useNavigate();
  const [pageLoading,setPageLoading] = useState(true);
  const [pageLoadingError,setPageLoadingError] = useState<null|string>(null);
  const [products,setProducts] = useState<ProductResultModel[]>([]);
  
  function getProducts(){
    ProductApiService.GetProducts().then(res=>{
      if(res?.result && !res.hasException){
        setProducts(res.result);
      }
      else{
        setPageLoadingError(res?.exceptionContent ?? null);
      }
    }).catch((err:Error)=>{
      console.log("Page loading error : "+ err.message)
    }).finally(()=>{
      if(AuthManager.hasNotToken()){
        navigate(NavigationConsts.LoginPage);
      }
      else{
        setPageLoading(false);
      } 
    })
  }

  useEffect(() => {
    getProducts();
  },[])


  return (
    <SideBar>
      {
        pageLoading ? 
          <PageContentLoading/>
          : pageLoadingError ? 
            <ErrorPageContent/>
            : <PageContent/>
      }
    </SideBar>
  );
  
  function PageContentLoading(){
    return (
      <Box sx={styles.errorOrLoadingContainer}>
        <PageLoading/>
      </Box>
    );
  }
  function ErrorPageContent(){
    return (
      <Box sx={styles.errorOrLoadingContainer}>
        <Lottie animationData={errorAnimation} loop={true}/>
        <Alert variant="filled" severity="error" sx={styles.errorAlert} >
          {pageLoadingError}
        </Alert>
      </Box>
    );
  }
  function PageContent(){
    return (
      <Box sx={styles.container}>
        <Card sx={styles.headerCart}>
            <Button
                style={styles.headerCartAddButton}
                variant="contained"
                startIcon={<AddCircleIcon/>}
                >
                  Product Add
            </Button>
        </Card>
        <Box sx={styles.content}>
            {products.map((x) => ProductCart(x))}
        </Box>
      </Box>
    );
  }

  function ProductCart(product: ProductResultModel) {
    return (
      <Card sx={styles.productCard}>
        <CardActionArea>
          <ProductCardMedia/>
          <ProductCardContent/>
          <ProductCardAction/>
        </CardActionArea>
      </Card>
    );

    function ProductCardMedia() {
      return <CardMedia
        component="img"
        height="250"
        image="https://img-lcwaikiki.mncdn.com/mnresize/1024/-/pim/productimages/20222/6012505/v1/l_20222-w2cg02z8-rfh-96-81-93-190_a.jpg"
        sx={styles.productCardImage} />;
    }

    function ProductCardContent() {
      return <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.category}
        </Typography>
        <Typography variant="subtitle1">
          {product.brand}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.name}
        </Typography>
      </CardContent>;
    }

    function ProductCardAction() {
      return <CardActions sx={styles.productCardAction}>
        <Typography variant="subtitle1" color="green">
          {product.price} ₺
        </Typography>
        <EditIcon color="inherit" />
      </CardActions>;
    }
  }
}

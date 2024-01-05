// @ts-nocheck
import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

const importAll = (r) => r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});
const heroTextureImports =  importAll(require.context("../../assets", false, /\.(png|jpeg|svg)$/));

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler, hasPrev, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
            <NavigateBeforeIcon sx={{fontSize: 40}}/>
        </IconButton>
      )}
      renderArrowNext={(onClickHandler, hasNext, label) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
          }}
        >
            <NavigateNextIcon sx={{fontSize: 40}}/>
        </IconButton>
      )}

    >
        {Object.values(heroTextureImports).map((texture, index) => (
            <Box key={`carousel-image-${index}`}>
                <img src={texture}
                alt={`carousel-${index}`}
                style={{
                    width:"100%",
                    height:"700px",
                    objectFit: 'cover',
                    backgroundAttachment: "fixed"
                }}/>
                <Box color="white"
                padding="20px"
                borderRadius="1px"
                textAlign="left"
                backgroundColor="rgb(0, 0, 0, 0.4)"
                position="absolute"
                top="27%"
                borderRadius="3%"
                left={isNonMobile ? "10%" : "0"}
                right={isNonMobile ? "10%" : "0"}
                margin={isNonMobile ? "10%" : "0"}
                maxWidth={isNonMobile ? "17%" : "0"}>
                    <Typography color={shades.secondary[200]}>NEW ITEMS</Typography>
                    <Typography variant="h1">SUMMER SALE</Typography>
                    <Typography fontWeight="bold"
                    color={shades.secondary[500]}
                    sx={{textDecoration: "underline"}}
                    >DISCOVER MORE
                    </Typography>
                </Box>
            </Box>
        ))}
    </Carousel>
  );
};

export default MainCarousel;

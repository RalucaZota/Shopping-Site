// @ts-nocheck
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Link } from "react-scroll";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

const importAll = (r) =>
  r.keys().reduce((acc, item) => {
    acc[item.replace("./", "")] = r(item);
    return acc;
  }, {});
const heroTextureImports = importAll(
  require.context("../../assets", false, /\.(png|jpeg|svg|jpg)$/)
);

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      autoPlay={true}
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
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
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
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <Box key={`carousel-image-${index}`}>
          <img
            src={texture}
            alt={`carousel-${index}`}
            style={{
              width: "100%",
              height: "700px",
              objectFit: "cover",
              backgroundAttachment: "fixed",
            }}
          />
          <Box
            color="white"
            padding="20px"
            textAlign="left"
            backgroundColor="rgb(0, 0, 0, 0.4)"
            position="absolute"
            top={isNonMobile ? "5%" : "40%"}
            borderRadius="3%"
            left={isNonMobile ? "0%" : "10%"}
            right={isNonMobile ? "10%" : "0"}
            margin={isNonMobile ? "10%" : "0"}
            width="325px"
          >
            <Typography color={shades.secondary[200]}>NEW ITEMS</Typography>
            <Typography variant={isNonMobile ? "h1" : "h2"} sx={{ "&:hover": { cursor: "pointer" } }} fontSize={isNonMobile ? "65px" : "30px"}>
            <Link
                to="scrolledSection"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500} 
              >
                SUMMER SALE
              </Link>
            </Typography>
            <Typography
              sx={{ "&:hover": { cursor: "pointer" } }}
              fontWeight="bold"
              color={shades.secondary[500]}
            >
              <Link
                to="scrolledSection"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
              >
                DISCOVER MORE
              </Link>
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default MainCarousel;

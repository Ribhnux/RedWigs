import { Box, Image } from "@chakra-ui/core";

const Logo = () => (
  <Box
    size="xs"
    width="50px"
    height="50px"
    pointerEvents="none"
    userSelect="none"
  >
    <Image
      fallbackSrc="https://via.placeholder.com/150"
      src="/images/logo.png"
      alt="Redwigs"
      pointerEvents="none"
      userSelect="none"
    />
  </Box>
);

export default Logo;

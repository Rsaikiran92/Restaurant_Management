import { Box, Grid, GridItem ,Flex} from "@chakra-ui/react";

const WaiterDashboard = () => {
  return (
    <Box style={{ height: "100vh" }}>
      <Grid templateColumns="repeat(4, 1fr)" gap="3">
        <GridItem colSpan={1}>
          <Box h="20" style={{ backgroundColor: "red" }} />
        </GridItem>
        <GridItem colSpan={3}>
          <Flex h="20" justify={"space-evenly"}>
            <Box h="20" style={{ backgroundColor: "red" }} />
            <Box h="20" />
            <Box h="20" />
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};
export default WaiterDashboard;

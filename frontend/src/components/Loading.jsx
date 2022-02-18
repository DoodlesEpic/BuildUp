import { Center, Container, Loader } from "@mantine/core";

const Loading = () => {
  return (
    <Center style={{ height: "80%" }}>
      <Container>
        <Loader size="xl" />
      </Container>
    </Center>
  );
};

export default Loading;

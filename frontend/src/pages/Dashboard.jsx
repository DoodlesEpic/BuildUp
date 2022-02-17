import { Container, Title, Text, Center } from "@mantine/core";

const Dashboard = () => {
  return (
    <Center mt="xl" style={{ height: "80%" }}>
      <Container>
        <Title>BuildUp App</Title>
        <Text>
          A website to track notes, habits and become a better person.
        </Text>
      </Container>
    </Center>
  );
};

export default Dashboard;

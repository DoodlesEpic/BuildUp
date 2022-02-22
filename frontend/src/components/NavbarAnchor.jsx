import { Anchor, Group, Text } from "@mantine/core";
import { Link } from "react-router-dom";

const NavbarAnchor = ({ icon, name, to }) => {
  return (
    <Anchor component={Link} to={to} style={{ textDecoration: "none" }}>
      <Group position="center" spacing="xs" direction="column">
        {icon}
        <Text>{name}</Text>
      </Group>
    </Anchor>
  );
};

export default NavbarAnchor;

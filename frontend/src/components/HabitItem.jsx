import { Text } from "@mantine/core";

const HabitItem = ({ habit }) => {
  return <Text component="li">{habit.habitName}</Text>;
};

export default HabitItem;

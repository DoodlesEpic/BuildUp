interface Props {
  habit: {
    habitName: string;
  };
}

const HabitItem = ({ habit }: Props) => {
  return <li>{habit.habitName}</li>;
};

export default HabitItem;

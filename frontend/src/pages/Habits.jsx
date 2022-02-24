import { Container, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HabitItem from "../components/HabitItem";
import Loading from "../components/Loading";
import { getHabits } from "../features/habits/habitsSlice";

const Habits = () => {
  // Initialize hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Auth State
  const user = useSelector((state) => state.authentication.user);

  // Notes State
  const { habits, isLoading, isError, message } = useSelector(
    (state) => state.habits
  );

  useEffect(() => {
    dispatch(getHabits());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/");
    }
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <Container>
      <section>
        <Title>Habits</Title>
        <Text>
          Track your habits, mantain a consistent dailly streak for 90 days to
          form a habit
        </Text>
      </section>
      <section>
        <ul>
          {habits.map((habit) => (
            <HabitItem key={habit._id} habit={habit} />
          ))}
        </ul>
      </section>
    </Container>
  );
};

export default Habits;

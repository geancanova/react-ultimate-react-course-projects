import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import { useRecentBookings } from "../features/dashboard/useRecentBookings";
import { useRecentStays } from "../features/dashboard/useRecentStays";
import Heading from "../ui/Heading";
import Spinner from "../ui/Spinner";
import Row from "../ui/Row";

function Dashboard() {
  const { bookings, isLoading1 } = useRecentBookings();
  const { stays, confirmedStays, isLoading2 } = useRecentStays();

  console.log(bookings, confirmedStays, stays);

  if (isLoading1 || isLoading2) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter />
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;

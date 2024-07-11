import { getBooking, getCabin, getSettings } from "@/app/_lib/data-service";
import UpdateReservationForm from "@/app/_components/UpdateReservationForm";

export async function generateMetadata({ params }) {
  return {
    title: `Edit Reservation ${params.reservationId}`,
  };
}

export default async function Page({ params }) {
  const { reservationId } = params;
  const [booking, { breakfastPrice }] = await Promise.all([
    getBooking(reservationId),
    getSettings(),
  ]);
  const { maxCapacity } = await getCabin(booking.cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationId}
      </h2>

      <UpdateReservationForm
        booking={booking}
        maxCapacity={maxCapacity}
        reservationId={reservationId}
        breakfastPrice={breakfastPrice}
      />

    </div>
  );
}

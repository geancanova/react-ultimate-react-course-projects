'use client';

import SubmitButton from "@/app/_components/SubmitButton";
import ToggleButton from "@/app/_components/ToggleButton";
import { updateBooking } from "@/app/_lib/actions";
import { useState } from "react";

function UpdateReservationForm({ booking, maxCapacity, reservationId, breakfastPrice }) {
  const {
    numGuests: initialNumGuests,
    numNights,
    observations,
    cabinPrice,
    hasBreakfast: initialHasBreakfast
  } = booking;
  const [numGuests, setNumGuests] = useState(initialNumGuests);
  const [hasBreakfast, setHasBreakfast] = useState(initialHasBreakfast);

  const extrasPrice = hasBreakfast ? breakfastPrice * numGuests * numNights : 0;
  const totalPrice = cabinPrice + extrasPrice;

  const bookingData = {
    extrasPrice,
    totalPrice,
    hasBreakfast,
  };

  const updateBookingWithData = updateBooking.bind(null, bookingData);

  async function handleSubmit(formData) {
    await updateBookingWithData(formData);
  }

  return (
    <form action={handleSubmit} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
      <input type="hidden" name="bookingId" value={reservationId} />

      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={initialNumGuests}
          required
          onChange={(e) => setNumGuests(e.target.value)}
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          defaultValue={observations}
          name="observations"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className='space-y-2'>
        <p>Do you want to include breakfast?</p>
        <ToggleButton
          name="hasBreakfast"
          onChange={() => setHasBreakfast(!hasBreakfast)}
          defaultChecked={initialHasBreakfast}
        >
          Yes <span className="opacity-70">(+${breakfastPrice} per person for each day)</span>
        </ToggleButton>
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingText="Updating...">Update reservation</SubmitButton>
      </div>
    </form>
  )
}

export default UpdateReservationForm
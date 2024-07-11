'use client';

import { useReservation } from "@/app/_components/ReservationContext";
import SubmitButton from "@/app/_components/SubmitButton";
import ToggleButton from "@/app/_components/ToggleButton";
import { createBooking } from "@/app/_lib/actions";
import { differenceInDays } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

function ReservationForm({ cabin, user, settings }) {
  const [numGuests, setNumGuests] = useState(0);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const { range, resetRange, totalPrice, setTotalPrice } = useReservation();

  const { maxCapacity, regularPrice, discount, id } = cabin;
  const { breakfastPrice } = settings;

  const startDate = range?.from;
  const endDate = range?.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);
  const extrasPrice = hasBreakfast ? breakfastPrice * numGuests * numNights : 0;

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    hasBreakfast,
    extrasPrice,
    totalPrice,
    cabinId: id
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  async function handleSubmit(formData) {
    await createBookingWithData(formData);
    resetRange();
    setTotalPrice(0);
  }

  useEffect(() => {
    setTotalPrice(cabinPrice + extrasPrice);
  }, [cabinPrice, extrasPrice, setTotalPrice]);

  return (
    <div className='scale-[1.01]'>
      <div className='bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center'>
        <p>Logged in as</p>

        <div className='flex gap-4 items-center'>
          <Image
            referrerPolicy='no-referrer'
            className='h-8 rounded-full'
            src={user.image}
            alt={user.name}
            width={32}
            height={32}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        // action={createBookingWithData} 
        action={handleSubmit}
        className='bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col'
      >
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            required
            onChange={(e) => setNumGuests(e.target.value)}
          >
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            id='observations'
            className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
            placeholder='Any pets, allergies, special requirements, etc.?'
          />
        </div>

        <div className='space-y-2'>
          <p>Do you want to include breakfast?</p>
          <ToggleButton
            name="hasBreakfast"
            onChange={() => setHasBreakfast(!hasBreakfast)}
          >
            Yes <span className="opacity-70">(+${breakfastPrice} per person for each day)</span>
          </ToggleButton>
        </div>

        <div className='flex justify-end items-center gap-6'>
          <p className='text-primary-300 text-base'>Start by selecting dates</p>

          <SubmitButton
            pendingText='Reserving...'
            isDisabled={!(startDate && endDate)}
          >
            Reserve now
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
